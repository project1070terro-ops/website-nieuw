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

const BASE_URL = 'https://project1570.org';
const PROJECT_NAME = 'Terro - Project 15/70';

const WRAPPER_COPY = {
  nl: {
    tagline: `${PROJECT_NAME} · Save the Children`,
    reason: `Je ontvangt deze e-mail omdat je je hebt aangemeld voor updates op <a href="${BASE_URL}" style="color:#c05a28; text-decoration:none;">project1570.org</a>.`,
    unsubscribe: 'Uitschrijven',
  },
  en: {
    tagline: `${PROJECT_NAME} · Save the Children`,
    reason: `You are receiving this email because you signed up for updates at <a href="${BASE_URL}" style="color:#c05a28; text-decoration:none;">project1570.org</a>.`,
    unsubscribe: 'Unsubscribe',
  },
  es: {
    tagline: `${PROJECT_NAME} · Save the Children`,
    reason: `Recibes este correo porque te suscribiste a actualizaciones en <a href="${BASE_URL}" style="color:#c05a28; text-decoration:none;">project1570.org</a>.`,
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
    subject: 'Welkom bij Project 15/70 — Samen op weg naar 2029',
    title: 'Welkom bij Project 15/70!',
    body: `Wat fijn dat je erbij bent! Vanaf vandaag volg je onze missie ten voordele van <strong>Save the Children</strong> op de voet.<br><br>Op weg naar september 2029 — 10 dagen fietsen en >17.500 hoogtemeters — nemen we je mee achter de schermen van de voorbereidingen, mijlpalen en dagelijkse verslagen.<br><br>Samen maken we van elke hoogtemeter een tastbaar verschil. Bedankt voor je steun!`,
    cta: 'Bezoek de website',
    signoff: 'Met warme en sportieve groet,<br><br>Raoul "Terro" Struyf & Team Project 15/70<br>Mede mogelijk gemaakt door Fortuna Financial Group',
  },
  en: {
    subject: 'Welcome to Project 15/70 — Together on the road to 2029',
    title: 'Welcome to Project 15/70!',
    body: `So great to have you on board! From today, you will be following our mission in support of <strong>Save the Children</strong>.<br><br>On the road to September 2029 — 10 days of cycling and >17,500 metres of elevation — we will take you behind the scenes of the preparations, milestones and daily reports.<br><br>Together, we turn every metre of elevation into a tangible difference. Thank you for your support!`,
    cta: 'Visit the website',
    signoff: 'With warm and sporty regards,<br><br>Raoul "Terro" Struyf & Team Project 15/70<br>Made possible by Fortuna Financial Group',
  },
  es: {
    subject: 'Bienvenido a Proyecto 15/70 — Juntos de camino a 2029',
    title: '¡Bienvenido a Proyecto 15/70!',
    body: `¡Qué alegría tenerte con nosotros! A partir de hoy sigues de cerca nuestra misión en apoyo de <strong>Save the Children</strong>.<br><br>De camino a septiembre de 2029 — 10 días de ciclismo y >17.500 metros de desnivel — te llevamos entre bambalinas de los preparativos, hitos e informes diarios.<br><br>Juntos convertimos cada metro de desnivel en una diferencia tangible. ¡Gracias por tu apoyo!`,
    cta: 'Visitar el sitio web',
    signoff: 'Un saludo cálido y deportivo,<br><br>Raoul "Terro" Struyf & Equipo Proyecto 15/70<br>Posible gracias a Fortuna Financial Group',
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
  const bodyText = lang.body.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?strong>/gi, '');
  const text = `${lang.title}\n\n${bodyText}\n\nVisit: ${BASE_URL}\n\n${lang.signoff.replace(/<br>/g, '\n')}\n\nUnsubscribe: ${unsubscribeUrl}`;
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
