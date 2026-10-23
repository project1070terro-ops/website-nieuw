import { getSupabase } from '../_lib/supabase.js';
import { toPlainText } from '../_lib/portableText.js';
import { getBlogTemplate } from '../_lib/email.js';

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function getClientIp(request) {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const allHeaders = Object.fromEntries([...request.headers]);
    console.log('[sanity-webhook] headers:', JSON.stringify(allHeaders));

    const secretHeader = request.headers.get('x-sanity-webhook-secret');
    const expectedSecret = env.SANITY_WEBHOOK_SECRET || env.VITE_SANITY_WEBHOOK_SECRET;
    const secretOk = !expectedSecret || secretHeader === expectedSecret;

    console.log('[sanity-webhook] secret check:', {
      ip: getClientIp(request),
      secretHeader,
      hasExpectedSecret: !!expectedSecret,
      secretOk,
    });

    if (!secretOk) {
      console.warn('[sanity-webhook] secret mismatch; continuing for testing');
    }

    if (env.RATE_LIMITS) {
      const ip = getClientIp(request);
      const key = `rate:webhook:${ip}`;
      const count = parseInt((await env.RATE_LIMITS.get(key)) || '0', 10);
      if (count >= 30) {
        return jsonResponse({ error: 'Webhook rate limit exceeded' }, 429);
      }
      await env.RATE_LIMITS.put(key, String(count + 1), { expirationTtl: 60 });
    }

    const body = await request.json();
    console.log('[sanity-webhook] raw body:', JSON.stringify(body, null, 2));

    const doc = body._type ? body : body.after || body.result || body;
    console.log('[sanity-webhook] selected doc:', JSON.stringify({ _id: doc._id, _type: doc._type, status: doc.status, slug: doc.slug, title: doc.title }, null, 2));

    if (doc._type !== 'post') {
      console.log('[sanity-webhook] skipped: _type is not post');
      return jsonResponse({ ok: true, skipped: true, reason: '_type is not post' });
    }

    if (doc.status !== 'published') {
      console.log('[sanity-webhook] skipped: status is not published');
      return jsonResponse({ ok: true, skipped: true, reason: 'status is not published' });
    }

    const slug = doc.slug?.current;
    if (!slug) {
      console.log('[sanity-webhook] skipped: missing slug');
      return jsonResponse({ ok: true, skipped: true, reason: 'missing slug' });
    }

    const supabase = getSupabase(env);
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email, language, unsubscribe_token')
      .eq('is_active', true)
      .is('unsubscribed_at', null);

    if (error) {
      console.error('[sanity-webhook] supabase select error:', error);
      throw error;
    }

    console.log('[sanity-webhook] active subscribers:', subscribers?.length || 0);

    if (!subscribers || subscribers.length === 0) {
      console.log('[sanity-webhook] no active subscribers, nothing to send');
      return jsonResponse({ ok: true, sent: [] });
    }

    const byLang = { nl: [], en: [], es: [] };
    for (const s of subscribers) {
      const lang = ['nl', 'en', 'es'].includes(s.language) ? s.language : 'nl';
      byLang[lang].push(s);
    }

    const postUrl = `https://project1570.org/blog/${slug}`;
    const results = [];
    let emailError = false;

    const apiKey = env.VITE_RESEND_API_KEY || env.RESEND_API_KEY;
    const from = env.VITE_RESEND_FROM || env.RESEND_FROM;

    if (!apiKey || !from) {
      console.error('[sanity-webhook] Resend not configured');
      return jsonResponse({ ok: true, sent: [], email_error: true, reason: 'Resend not configured' });
    }

    for (const lang of ['nl', 'en', 'es']) {
      const list = byLang[lang];
      if (list.length === 0) continue;

      const title = doc.title?.[lang] || doc.title?.nl || 'Project 15/70';
      const intro = toPlainText(doc.inleiding?.[lang] || []);

      for (let i = 0; i < list.length; i += 100) {
        const batch = list.slice(i, i + 100);

        const emails = batch.map((s) => {
          const unsubscribeUrl = `https://project1570.org/api/unsubscribe?token=${s.unsubscribe_token}`;
          const { subject, html, text } = getBlogTemplate(lang, { title, intro, postUrl, unsubscribeUrl });
          return {
            from,
            to: s.email,
            subject,
            html,
            text,
          };
        });

        console.log('[sanity-webhook] sending batch', { language: lang, count: emails.length });

        const response = await fetch('https://api.resend.com/emails/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(emails),
        });

        if (!response.ok) {
          const err = await response.text().catch(() => 'Unknown Resend error');
          console.error('[sanity-webhook] Resend batch failed:', response.status, err);
          emailError = true;
        } else {
          const resendData = await response.json().catch(() => ({}));
          console.log('[sanity-webhook] Resend batch ok:', resendData);
          results.push({ language: lang, sent: batch.length });
        }
      }
    }

    console.log('[sanity-webhook] done', { results, emailError });
    return jsonResponse({ ok: true, sent: results, email_error: emailError });
  } catch (error) {
    console.error('[sanity-webhook] unhandled error:', error);
    return jsonResponse({ ok: true, error: error.message || 'Internal server error', email_error: true }, 200);
  }
}
