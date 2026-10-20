import { getSupabase } from '../_lib/supabase.js';
import { checkRateLimits } from '../_lib/rateLimit.js';
import { sendEmail, getWelcomeTemplate } from '../_lib/email.js';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const payload = await request.json();

    // Honeypot: bots usually fill this field
    const honeypot = String(payload.website ?? '');
    if (honeypot !== '') {
      return jsonResponse({ error: 'Spam detected' }, 400);
    }

    const email = String(payload.email || '').trim().toLowerCase();
    const source = String(payload.source || 'footer');
    const language = ['nl', 'en', 'es'].includes(payload.language) ? payload.language : 'nl';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: 'Invalid email address' }, 400);
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
        return jsonResponse({ ok: true });
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
      // Log but do not fail the subscription: the user is saved and can be
      // reached later once Resend domain / from-address is fully verified.
      console.error('Welcome email failed:', mailError.message);
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ error: error.message || 'Internal server error' }, 500);
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
