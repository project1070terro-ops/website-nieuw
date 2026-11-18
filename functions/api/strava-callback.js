import { exchangeStravaCode, getStravaAuthorizeUrl } from '../_lib/strava.js';

function htmlPage(message, isError = false) {
  return `<!DOCTYPE html>
<html lang="nl" style="margin:0; padding:0; background-color:#0c0c0d;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project 15/70 — Strava</title>
</head>
<body style="margin:0; padding:0; background-color:#0c0c0d; color:#f4f4f5; font-family:Roboto, Helvetica, Arial, sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh;">
  <div style="max-width:480px; width: calc(100% - 32px); padding:40px 24px; margin:0 16px; box-sizing:border-box; background:#18181b; border:1px solid #2a2a2e; border-radius:12px; text-align:center;">
    <h1 style="margin:0 0 16px; font-size:24px; font-weight:700;">Project 15<span style="color:#c05a28;">/</span>70</h1>
    <p style="margin:0; font-size:16px; line-height:1.6; color:${isError ? '#ef4444' : '#d4d4d8'};">${message}</p>
    <a href="https://project1570.org" style="display:inline-block; margin-top:24px; padding:12px 24px; background-color:#c05a28; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">Terug naar de website</a>
  </div>
</body>
</html>`;
}

export async function onRequestGet(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
      return new Response(htmlPage(`Strava-autorisatie geannuleerd of geweigerd: ${error}`, true), {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    if (!code) {
      return new Response(htmlPage('Geen autorisatiecode ontvangen. Start opnieuw via de OAuth-link.', true), {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const data = await exchangeStravaCode(env, code);

    return new Response(
      htmlPage(
        `Strava succesvol gekoppeld!` +
        `<br><br>` +
        `Scope: ${data.scope || 'activity:read_all'}<br>` +
        `Token verloopt op: ${new Date(data.expiresAt).toLocaleString('nl-BE')}`
      ),
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('[strava-callback] error:', error);
    const authUrl = getStravaAuthorizeUrl(context.env);
    return new Response(
      htmlPage(
        `${error.message}<br><br>` +
        `<a href="${authUrl}" style="color:#c05a28; text-decoration:underline;">Opnieuw autoriseren</a>`,
        true
      ),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
