import { getSupabase } from '../_lib/supabase.js';

function htmlPage(message) {
  return `<!DOCTYPE html>
<html lang="nl" style="margin:0; padding:0; background-color:#0c0c0d;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project 15/70</title>
</head>
<body style="margin:0; padding:0; background-color:#0c0c0d; color:#f4f4f5; font-family:Roboto, Helvetica, Arial, sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh;">
  <div style="max-width:480px; padding:40px; background:#18181b; border:1px solid #2a2a2e; border-radius:12px; text-align:center;">
    <h1 style="margin:0 0 16px; font-size:24px; font-weight:700;">Project 15<span style="color:#c05a28;">/</span>70</h1>
    <p style="margin:0; font-size:16px; line-height:1.6; color:#d4d4d8;">${message}</p>
    <a href="https://project1570.pages.dev" style="display:inline-block; margin-top:24px; padding:12px 24px; background-color:#c05a28; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">Terug naar de website</a>
  </div>
</body>
</html>`;
}

export async function onRequestGet(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(htmlPage('Ongeldige uitschrijflink.'), {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const supabase = getSupabase(env);
    const { error } = await supabase
      .from('subscribers')
      .update({ unsubscribed_at: new Date().toISOString(), is_active: false })
      .eq('unsubscribe_token', token);

    if (error) {
      throw error;
    }

    return new Response(htmlPage('Je bent succesvol uitgeschreven. Bedankt voor je interesse!'), {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return new Response(htmlPage('Er is iets misgegaan. Probeer het later opnieuw.'), {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
