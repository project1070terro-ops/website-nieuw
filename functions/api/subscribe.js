import { getSupabase } from '../_lib/supabase.js';
import { checkRateLimits } from '../_lib/rateLimit.js';
import { sendEmail, getWelcomeTemplate } from '../_lib/email.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function okResponse(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function conflictResponse(body) {
  return new Response(JSON.stringify(body), {
    status: 409,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const payload = await request.json();

    // Honeypot: bots usually fill this field
    const honeypot = String(payload.website ?? '');
    if (honeypot !== '') {
      console.log('Honeypot triggered');
      return okResponse({ ok: true, subscription_saved: false, email_error: false });
    }

    const email = String(payload.email || '').trim().toLowerCase();
    const source = String(payload.source || 'footer');
    const language = ['nl', 'en', 'es'].includes(payload.language) ? payload.language : 'nl';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('Invalid email:', email);
      return okResponse({ ok: true, subscription_saved: false, email_error: false });
    }

    await checkRateLimits(env.RATE_LIMITS, request);

    const supabase = getSupabase(env);
    const unsubscribeToken = crypto.randomUUID();

    console.log('[subscribe] Looking up:', { email });

    const { data: existing, error: lookupError } = await supabase
      .from('subscribers')
      .select('id, is_active, unsubscribed_at, email')
      .eq('email', email)
      .limit(1);

    if (lookupError) {
      console.error('[subscribe] Supabase lookup error:', lookupError);
      return okResponse({ ok: true, subscription_saved: false, email_error: false });
    }

    const record = existing?.[0];

    if (record) {
      if (record.is_active) {
        console.log('[subscribe] Already active:', record.email);
        return conflictResponse({ error: 'Already subscribed', already_subscribed: true });
      }

      console.log('[subscribe] Reactivating:', { email, oldId: record.id });

      const { error: updateError } = await supabase
        .from('subscribers')
        .update({
          is_active: true,
          unsubscribed_at: null,
          source,
          language,
          unsubscribe_token: unsubscribeToken,
        })
        .eq('id', record.id);

      if (updateError) {
        console.error('[subscribe] Supabase reactivate error:', updateError);
        return okResponse({ ok: true, subscription_saved: false, email_error: false });
      }
    } else {
      console.log('[subscribe] Inserting:', { email, source, language, unsubscribeToken });

      const { error: insertError } = await supabase
        .from('subscribers')
        .insert({ email, source, language, unsubscribe_token: unsubscribeToken });

      if (insertError) {
        console.error('[subscribe] Supabase insert error:', {
          message: insertError.message,
          code: insertError.code,
          details: insertError.details,
          hint: insertError.hint,
        });

        if (insertError.code === '23505') {
          return conflictResponse({ error: 'Already subscribed', already_subscribed: true });
        }

        return okResponse({ ok: true, subscription_saved: false, email_error: false });
      }
    }

    const unsubscribeUrl = `https://project1570.org/api/unsubscribe?token=${unsubscribeToken}`;
    const { subject, html, text } = getWelcomeTemplate(language, unsubscribeUrl);

    try {
      await sendEmail({
        env,
        to: email,
        subject,
        html,
        text,
        replyTo: 'info@project1570.org',
      });
    } catch (mailError) {
      console.error('[subscribe] Welcome email failed:', mailError.message);
      return okResponse({ ok: true, subscription_saved: true, email_error: true, reactivated: !!record });
    }

    return okResponse({ ok: true, subscription_saved: true, email_error: false, reactivated: !!record });
  } catch (error) {
    console.error('[subscribe] Global worker error:', {
      message: error.message,
      stack: error.stack,
    });
    // Never crash the function: return 200 so the frontend UI turns green.
    return okResponse({ ok: true, subscription_saved: false, email_error: false });
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
