import { getSupabase } from '../_lib/supabase.js';
import { toPlainText } from '../_lib/portableText.js';
import { sendEmail, getBlogTemplate } from '../_lib/email.js';

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
  try {
    const { request, env } = context;

    const secret = request.headers.get('x-sanity-webhook-secret');
    if (secret !== env.SANITY_WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Basic rate limiting for the webhook itself per IP
    if (env.RATE_LIMITS) {
      const ip = getClientIp(request);
      const key = `rate:webhook:${ip}`;
      const count = parseInt((await env.RATE_LIMITS.get(key)) || '0', 10);
      if (count >= 30) {
        return jsonResponse({ error: 'Webhook rate limit exceeded' }, 429);
      }
      await env.RATE_LIMITS.put(key, String(count + 1), { expirationTtl: 60 });
    }

    const doc = await request.json();
    if (doc._type !== 'post' || doc.status !== 'published') {
      return jsonResponse({ ok: true, skipped: true });
    }

    const slug = doc.slug?.current;
    if (!slug) {
      return jsonResponse({ error: 'Missing slug' }, 400);
    }

    const supabase = getSupabase(env);
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email, language, unsubscribe_token')
      .eq('is_active', true)
      .is('unsubscribed_at', null);

    if (error) throw error;

    const byLang = { nl: [], en: [], es: [] };
    for (const s of subscribers) {
      const lang = ['nl', 'en', 'es'].includes(s.language) ? s.language : 'nl';
      byLang[lang].push(s);
    }

    const postUrl = `https://project1570.org/blog/${slug}`;
    const results = [];

    for (const lang of ['nl', 'en', 'es']) {
      const list = byLang[lang];
      if (list.length === 0) continue;

      const title = doc.title?.[lang] || doc.title?.nl || 'Project 15/70';
      const intro = toPlainText(doc.inleiding?.[lang] || []);

      // Resend batch API allows up to 100 emails per call
      for (let i = 0; i < list.length; i += 100) {
        const batch = list.slice(i, i + 100);

        const emails = batch.map((s) => {
          const unsubscribeUrl = `https://project1570.org/api/unsubscribe?token=${s.unsubscribe_token}`;
          const { subject, html, text } = getBlogTemplate(lang, { title, intro, postUrl, unsubscribeUrl });
          return {
            from: env.RESEND_FROM,
            to: s.email,
            subject,
            html,
            text,
          };
        });

        const response = await fetch('https://api.resend.com/emails/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({ emails }),
        });

        if (!response.ok) {
          const err = await response.text().catch(() => 'Unknown Resend error');
          throw new Error(`Resend batch failed: ${response.status} ${err}`);
        }

        results.push({ language: lang, sent: batch.length });
      }
    }

    return jsonResponse({ ok: true, sent: results });
  } catch (error) {
    return jsonResponse({ error: error.message || 'Internal server error' }, 500);
  }
}
