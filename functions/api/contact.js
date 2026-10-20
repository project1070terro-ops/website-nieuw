import { checkRateLimits } from '../_lib/rateLimit.js';

const SPONSOR_TEMPLATES = {
  nl: {
    subject: 'Bevestiging aanmelding sponsorpakket – Project 15/70',
    body: `Beste [Contact Person],

Hartelijk dank voor uw interesse in een van de zakelijke sponsorpakketten voor ons project ter ondersteuning van Save the Children. Geweldig dat uw bedrijf samen met ons grenzen wil verleggen voor kinderen wereldwijd!

Met deze e-mail bevestigen wij de ontvangst van uw aanmelding voor het [Selected Package].

Hoe verloopt het proces nu verder?
Aangezien dit een volledig non-profit initiatief is, ontvangen wij zelf geen gelden. Om uw sponsoring definitief te maken en uw logo op onze website te plaatsen, kunt u de gekozen investering rechtstreeks overmaken aan Save the Children via de officielle donatielink op onze homepage.

Zodra uw donatie is voldaan, kunt u reageren op deze e-mail met uw bedrijfslogo (als vector- of PNG-bestand) en de gewenste hyperlink voor de website. Wij zorgen er dan voor dat uw bedrijf de verdiende plek op onze pagina krijgt!

Heeft u in de tussentijd nog vragen? Reageer dan gerust op deze e-mail.

Met vriendelijke en sportieve groet,
Terro
Initiatiefnemer Project 15/70`,
  },
  en: {
    subject: 'Confirmation of sponsorship package application – Project 15/70',
    body: `Dear [Contact Person],

Thank you very much for your interest in one of our corporate sponsorship packages supporting Save the Children. It is wonderful that your company wants to join us in pushing boundaries for children worldwide!

With this email, we confirm the receipt of your application for the [Selected Package].

How does the process work from here?
As this is a fully non-profit initiative, we do not collect any funds ourselves. To finalize your sponsorship and feature your logo on our website, you can transfer your chosen investment directly to Save the Children using the official donation link on our homepage.

Once your donation is completed, please reply to this email with your company logo (as a vector or PNG file) and your preferred website hyperlink. We will then ensure your company receives its well-deserved spot on our page!

If you have any questions in the meantime, please feel free to reply to this email.

Kind and sporty regards,
Terro
Initiator of Project 15/70`,
  },
  es: {
    subject: 'Confirmación de solicitud de paquete de patrocinio – Project 15/70',
    body: `Estimado/a [Contact Person],

Muchas gracias por su interés en uno de nuestros paquetes de patrocinio corporativo para nuestro proyecto en apoyo a Save the Children. ¡Es fantástico que su empresa quiera unirse a nosotros para superar límites por los niños de todo el mundo!

Por medio de este correo electrónico, confirmamos la recepción de su solicitud para el [Selected Package].

¿Cómo continúa el proceso a partir de ahora?
Dado que se trata de una iniciativa totalmente sin fines de lucro, nosotros no recibimos ningún fondo. Para hacer efectivo su patrocinio y colocar su logotipo en nuestro sitio web, puede transferir la inversión elegida directamente a Save the Children a través del enlace oficial de donación en nuestra página de inicio.

Una vez realizada su donación, puede responder a este correo electrónico adjuntando el logotipo de su empresa (en formato vectorial o PNG) y el enlace web deseado. ¡Nos aseguraremos de que su empresa ocupe el lugar que se merece en nuestra página!

Si tiene alguna pregunta mientras tanto, no dude en responder a este correo electrónico.

Atentamente,
Terro
Promotor de Project 15/70`,
  },
};

const ADMIN_TEMPLATES = {
  nl: {
    subject: 'Nieuwe sponsoring aanvraag – Project 15/70',
  },
  en: {
    subject: 'New sponsorship application – Project 15/70',
  },
  es: {
    subject: 'Nueva solicitud de patrocinio – Project 15/70',
  },
};

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

async function sendEmail({ env, to, subject, text, replyTo, from }) {
  const apiKey = env.RESEND_API_KEY;
  const sender = env.RESEND_FROM;

  if (!apiKey || !sender) {
    throw new Error('Email service not configured');
  }

  const body = {
    from: sender,
    to,
    subject,
    text,
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

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const payload = await request.json();

    // Honeypot: bots usually fill this field
    const honeypot = String(payload.website ?? '');
    if (honeypot !== '') {
      return jsonResponse({ error: 'Spam detected' }, 400);
    }

    const senderEmail = payload.type === 'sponsoring' ? payload.email : payload.email;
    if (senderEmail) {
      await checkRateLimits(env.RATE_LIMITS, request, senderEmail);
    }

    if (payload.type === 'sponsoring') {
      const { language = 'nl', company, contact, email, phone, tier, message } = payload;

      if (!company || !contact || !email || !tier) {
        return jsonResponse({ error: 'Missing required fields' }, 400);
      }

      const lang = ['nl', 'en', 'es'].includes(language) ? language : 'nl';
      const template = SPONSOR_TEMPLATES[lang];

      const text = template.body
        .replace(/\[Contact Person\]/g, contact)
        .replace(/\[Selected Package\]/g, tier);

      await sendEmail({
        env,
        to: email,
        subject: template.subject,
        text,
        replyTo: 'sponsoring@project1570.org',
        from: env.RESEND_FROM,
      });

      const adminTemplate = ADMIN_TEMPLATES[lang];
      const adminText = [
        `Bedrijf: ${company}`,
        `Contactpersoon: ${contact}`,
        `E-mail: ${email}`,
        `Telefoon: ${phone || '-'}`,
        `Pakket: ${tier}`,
        `Bericht: ${message || '-'}`,
      ].join('\n');

      const adminEmail = env.SPONSORING_EMAIL || 'sponsoring@project1570.org';
      await sendEmail({
        env,
        to: adminEmail,
        subject: adminTemplate.subject,
        text: adminText,
        replyTo: email,
        from: env.RESEND_FROM,
      });

      return jsonResponse({ ok: true });
    }

    // Default contact form handling
    const { name, email, subject, message, to } = payload;

    if (!name || !email || !message || !to) {
      return jsonResponse({ error: 'Missing required fields' }, 400);
    }

    const text = [
      `Naam: ${name}`,
      `E-mail: ${email}`,
      `Onderwerp: ${subject || '-'}`,
      `Bericht:\n${message}`,
    ].join('\n');

    await sendEmail({
      env,
      to,
      subject: subject || 'Contact via website Project 15/70',
      text,
      replyTo: email,
      from: env.RESEND_FROM,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ error: error.message || 'Internal server error' }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
