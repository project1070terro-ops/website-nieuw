export async function sendEmail({ env, to, subject, text, html, replyTo }) {
  const apiKey = env.VITE_RESEND_API_KEY || env.RESEND_API_KEY;
  const from = env.VITE_RESEND_FROM || env.RESEND_FROM;

  if (!apiKey || !from) {
    throw new Error('Email service not configured');
  }

  const body = {
    from,
    to,
    subject,
    text,
    html,
  };

  if (replyTo) {
    body.reply_to = replyTo;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown Resend error');
    throw new Error(`Email send failed: ${response.status} ${error}`);
  }

  return response.json();
}

const BASE_URL = 'https://project1570.pages.dev';
const PROJECT_NAME = 'Terro - Project 15/70';

const WRAPPER_COPY = {
  nl: {
    tagline: `${PROJECT_NAME} · Save the Children`,
    reason: `Je ontvangt deze e-mail omdat je je hebt aangemeld voor updates op <a href="${BASE_URL}" style="color:#c05a28; text-decoration:none;">project1570.pages.dev</a>.`,
    unsubscribe: 'Uitschrijven',
  },
  en: {
    tagline: `${PROJECT_NAME} · Save the Children`,
    reason: `You are receiving this email because you signed up for updates at <a href="${BASE_URL}" style="color:#c05a28; text-decoration:none;">project1570.pages.dev</a>.`,
    unsubscribe: 'Unsubscribe',
  },
  es: {
    tagline: `${PROJECT_NAME} · Save the Children`,
    reason: `Recibes este correo porque te suscribiste a actualizaciones en <a href="${BASE_URL}" style="color:#c05a28; text-decoration:none;">project1570.pages.dev</a>.`,
    unsubscribe: 'Darse de baja',
  },
};

function emailWrapper(content, unsubscribeUrl, language) {
  const lang = WRAPPER_COPY[language] || WRAPPER_COPY.nl;
  return `<!DOCTYPE html>
<html lang="${language}" style="margin:0; padding:0; background-color:#0c0c0d;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${PROJECT_NAME}</title>
</head>
<body style="margin:0; padding:0; background-color:#0c0c0d; color:#f4f4f5; font-family:Roboto, Helvetica, Arial, sans-serif; -webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0c0c0d;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%; background-color:#18181b; border:1px solid #2a2a2e; border-radius:12px; overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 24px; border-bottom:2px solid #c05a28;">
              <h1 style="margin:0; font-size:24px; font-weight:700; color:#f4f4f5;">Terro - Project 15<span style="color:#c05a28;">/</span>70</h1>
              <p style="margin:4px 0 0; font-size:12px; color:#a1a1aa; text-transform:uppercase; letter-spacing:0.1em;">${lang.tagline}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px; border-top:1px solid #2a2a2e; font-size:12px; color:#71717a; text-align:center;">
              <p style="margin:0 0 8px;">${lang.reason}</p>
              <p style="margin:0;"><a href="${unsubscribeUrl}" style="color:#71717a; text-decoration:underline;">${lang.unsubscribe}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const WELCOME_COPY = {
  nl: {
    subject: 'Welkom bij Terro - Project 15/70',
    title: 'Welkom, fietser!',
    body: 'Je bent nu aangemeld voor blog-updates, statistieken en live-verslagen vanuit Albir. We houden je op de hoogte van elke slopende meter.',
    cta: 'Bekijk de website',
    signoff: 'Met sportieve groet,<br>Het Terro - Project 15/70 Team',
  },
  en: {
    subject: 'Welcome to Terro - Project 15/70',
    title: 'Welcome, cyclist!',
    body: 'You are now subscribed to blog updates, statistics and live reports from Albir. We will keep you posted on every gruelling metre.',
    cta: 'Visit the website',
    signoff: 'Sporty regards,<br>The Terro - Project 15/70 Team',
  },
  es: {
    subject: 'Bienvenido a Terro - Project 15/70',
    title: '¡Bienvenido, ciclista!',
    body: 'Ya estás suscrito a actualizaciones del blog, estadísticas e informes en directo desde Albir. Te mantendremos informado de cada metro exigente.',
    cta: 'Visitar el sitio web',
    signoff: 'Saludos deportivos,<br>El equipo de Terro - Project 15/70',
  },
};

export function getWelcomeTemplate(language, unsubscribeUrl) {
  const lang = WELCOME_COPY[language] || WELCOME_COPY.nl;
  const html = emailWrapper(
    `<h2 style="margin:0 0 16px; font-size:20px; font-weight:600; color:#f4f4f5;">${lang.title}</h2>
     <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#d4d4d8;">${lang.body}</p>
     <a href="${BASE_URL}" style="display:inline-block; padding:12px 24px; background-color:#c05a28; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">${lang.cta}</a>
     <p style="margin:24px 0 0; font-size:14px; line-height:1.6; color:#a1a1aa;">${lang.signoff}</p>`,
    unsubscribeUrl,
    language
  );
  const text = `${lang.title}\n\n${lang.body}\n\nVisit: ${BASE_URL}\n\n${lang.signoff.replace(/<br>/g, '\n')}\n\nUnsubscribe: ${unsubscribeUrl}`;
  return { subject: lang.subject, html, text };
}

const BLOG_COPY = {
  nl: { subject: (title) => `Nieuw bericht: ${title}`, cta: 'Lees meer' },
  en: { subject: (title) => `New post: ${title}`, cta: 'Read more' },
  es: { subject: (title) => `Nueva entrada: ${title}`, cta: 'Leer más' },
};

export function getBlogTemplate(language, { title, intro, postUrl, unsubscribeUrl }) {
  const lang = BLOG_COPY[language] || BLOG_COPY.nl;
  const safeTitle = escapeHtml(title || 'Terro - Project 15/70');
  const safeIntro = escapeHtml(intro || '');
  const html = emailWrapper(
    `<h2 style="margin:0 0 12px; font-size:22px; font-weight:600; color:#f4f4f5;">${safeTitle}</h2>
     <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#d4d4d8;">${safeIntro}</p>
     <a href="${postUrl}" style="display:inline-block; padding:12px 24px; background-color:#c05a28; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">${lang.cta}</a>`,
    unsubscribeUrl,
    language
  );
  const text = `${title}\n\n${intro}\n\nRead more: ${postUrl}\n\nUnsubscribe: ${unsubscribeUrl}`;
  return { subject: lang.subject(title), html, text };
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
