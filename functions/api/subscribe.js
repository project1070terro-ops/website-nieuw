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
      return okResponse({ ok: true, subscription_saved: false, email_error: false });
    }

    await checkRateLimits(env.RATE_LIMITS, request, email);

    const supabase = getSupabase(env);

    const { data, error } = await supabase
      .from('subscribers')
      .insert({ email, source, language })
      .select('unsubscribe_token')
      .single();

    if (error) {
      if (error.code === '23505') {
        // Duplicate: treat as success to avoid leaking subscription status
        return okResponse({ ok: true, subscription_saved: true, email_error: false });
      }
      throw error;
    }

    const unsubscribeUrl = `https://project1570.pages.dev/api/unsubscribe?token=${data.unsubscribe_token}`;
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
      console.error('Welcome email failed:', mailError.message);
      return okResponse({ ok: true, subscription_saved: true, email_error: true });
    }

    return okResponse({ ok: true, subscription_saved: true, email_error: false });
  } catch (error) {
    console.error('Subscribe worker error:', error);
    // Never crash the function: return 200 so the frontend UI turns green.
    return okResponse({ ok: true, subscription_saved: false, email_error: true });
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
