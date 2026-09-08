import type { Language, Page } from '../types';

interface PrivacyDisclaimerProps {
  navigate: (page: Page) => void;
  language: Language;
}

const PROJECT_NAME = 'Project 15/70';
const ORGANIZER_NAME = 'Roel (Terro)';
const CONTACT_EMAIL = 'info@project1570terro.com';

const COPY = {
  nl: {
    back: '← Terug naar home',
    title: 'Privacy & Disclaimer',
    lead: 'Dit is de officiële website van ons sportieve project voor het goede doel. Deze pagina legt uit hoe er met gegevens wordt omgegaan en wat de spelregels zijn rondom deze actie.',
    h1: '1. Het Goede Doel & Transparantie',
    l1a: 'Alle donaties die via deze website of de gekoppelde actiepagina worden gedaan, gaan volledig en rechtstreeks naar het gekozen goede doel voor kinderen in Spanje. Er blijft niets aan de strijkstok hangen.',
    l1aLabel: '100% naar het doel:',
    l1b: 'Onze gewaardeerde kleding- en materiaalpartner ondersteunt deze prestatie uitsluitend materieel (met kleding en uitrusting). Er worden via deze website geen commerciële inkomsten gegenereerd.',
    l1bLabel: 'Sponsoring:',
    l1c: 'De financiële transacties verlopen niet via deze website, maar via het beveiligde platform van het goede doel zelf of een erkend donatieplatform. Wij hebben geen inzage in jouw bankgegevens.',
    l1cLabel: 'Externe betalingen:',
    h2: '2. Privacybeleid (Hoe we omgaan met je data)',
    p2: 'Wij respecteren jouw privacy volgens de Europese privacywetgeving (AVG/GDPR).',
    l2a: 'Als je ons een e-mail stuurt of het contactformulier invult, gebruiken we je naam en e-mailadres puur en alleen om je bericht te beantwoorden. We bewaren je gegevens niet langer dan nodig en verkopen ze nooit door.',
    l2aLabel: 'Contact:',
    l2b: 'Deze website gebruikt uitsluitend functionele en eventueel anonieme analytische cookies om te zorgen dat de website goed werkt en om bezoekersaantallen te tellen. Hier worden geen persoonsgegevens mee opgeslagen.',
    l2bLabel: 'Cookies:',
    h3: '3. Disclaimer (Aansprakelijkheid & Medisch)',
    l3a: 'Het volgen van deze sportprestatie, de voorbereidingen en eventuele trainingsupdates via deze website of sociale media zijn puur informatief en bedoeld ter inspiratie. Dit is geen medisch of professioneel sportadvies.',
    l3aLabel: 'Eigen risico:',
    l3b: "Mocht je besluiten om (een deel van) de route mee te fietsen of ons langs de route te supporteren, dan is dit volledig op eigen risico. De organisatie en de fietser zijn niet aansprakelijk voor eventuele schade, ongevallen of blessures.",
    l3bLabel: 'Begeleiding of meerijden:',
    h4: '4. Beeldmateriaal & Auteursrecht',
    l4a: 'Alle foto\'s, video\'s en andere beelden op deze website zijn gemaakt door of in opdracht van Project 15/70, tenzij anders vermeld. Het auteursrecht op dit beeldmateriaal berust bij ',
    l4aLabel: 'Eigen beelden:',
    l4b: 'Het is niet toegestaan om beelden, teksten of ontwerpen van deze website zonder schriftelijke toestemming te kopiëren, te verspreiden of te gebruiken voor eigen (commerciële) doeleinden.',
    l4bLabel: 'Gebruik door anderen:',
    l4c: 'De namen en logo\'s van Save the Children en onze sponsors blijven eigendom van de respectievelijke organisaties en worden hier enkel getoond ter promotie van deze actie.',
    l4cLabel: 'Logo\'s en merken:',
    hContact: 'Contact',
    pContact: 'Heb je vragen over deze actie of over je privacy? Neem dan gerust contact op via:',
    liProject: 'Naam initiatief / project:',
    liOrganizer: 'Organisator:',
    liEmail: 'E-mail:',
  },
  en: {
    back: '← Back to home',
    title: 'Privacy & Disclaimer',
    lead: 'This is the official website of our sporting project for charity. This page explains how data is handled and what the ground rules are for this campaign.',
    h1: '1. The Good Cause & Transparency',
    l1a: 'All donations made through this website or the linked campaign page go entirely and directly to the chosen charity for children in Spain. Nothing is kept back.',
    l1aLabel: '100% to the cause:',
    l1b: 'Our valued clothing and equipment partner supports this achievement exclusively in kind (with clothing and gear). No commercial revenue is generated through this website.',
    l1bLabel: 'Sponsorship:',
    l1c: 'Financial transactions do not go through this website, but through the secure platform of the charity itself or a recognised donation platform. We have no access to your bank details.',
    l1cLabel: 'External payments:',
    h2: '2. Privacy Policy (How we handle your data)',
    p2: 'We respect your privacy in accordance with European privacy legislation (GDPR).',
    l2a: 'If you send us an email or fill in the contact form, we use your name and email address solely to reply to your message. We do not keep your data longer than necessary and we never sell it on.',
    l2aLabel: 'Contact:',
    l2b: 'This website only uses functional and possibly anonymous analytical cookies to keep the site working properly and to count visitor numbers. No personal data is stored through them.',
    l2bLabel: 'Cookies:',
    h3: '3. Disclaimer (Liability & Medical)',
    l3a: 'Following this sporting achievement, the preparations and any training updates via this website or social media is purely informative and intended as inspiration. This is not medical or professional sports advice.',
    l3aLabel: 'At your own risk:',
    l3b: 'Should you decide to ride (part of) the route along or support us along the route, this is entirely at your own risk. The organisation and the rider are not liable for any damage, accidents or injuries.',
    l3bLabel: 'Pacing or riding along:',
    h4: '4. Imagery & Copyright',
    l4a: 'All photos, videos and other imagery on this website were created by or on behalf of Project 15/70, unless stated otherwise. The copyright on this material rests with ',
    l4aLabel: 'Own imagery:',
    l4b: 'It is not permitted to copy, distribute or use imagery, texts or designs from this website for your own (commercial) purposes without written permission.',
    l4bLabel: 'Use by others:',
    l4c: 'The names and logos of Save the Children and our sponsors remain the property of the respective organisations and are shown here solely to promote this campaign.',
    l4cLabel: 'Logos and brands:',
    hContact: 'Contact',
    pContact: 'Do you have questions about this campaign or about your privacy? Feel free to get in touch via:',
    liProject: 'Initiative / project name:',
    liOrganizer: 'Organiser:',
    liEmail: 'Email:',
  },
  es: {
    back: '← Volver al inicio',
    title: 'Privacidad y Descargo de responsabilidad',
    lead: 'Este es el sitio web oficial de nuestro proyecto deportivo a beneficio de una buena causa. Esta página explica cómo se tratan los datos y cuáles son las reglas de esta acción.',
    h1: '1. La Buena Causa y Transparencia',
    l1a: 'Todas las donaciones realizadas a través de este sitio web o de la página de campaña vinculada van íntegramente y directamente a la causa elegida para los niños en España. No se retiene nada.',
    l1aLabel: '100% a la causa:',
    l1b: 'Nuestro valorado socio de ropa y material apoya este logro exclusivamente en especie (con ropa y equipamiento). No se generan ingresos comerciales a través de este sitio web.',
    l1bLabel: 'Patrocinio:',
    l1c: 'Las transacciones financieras no pasan por este sitio web, sino por la plataforma segura de la propia organización benéfica o por una plataforma de donaciones reconocida. No tenemos acceso a tus datos bancarios.',
    l1cLabel: 'Pagos externos:',
    h2: '2. Política de privacidad (Cómo tratamos tus datos)',
    p2: 'Respetamos tu privacidad conforme a la legislación europea de protección de datos (RGPD).',
    l2a: 'Si nos envías un correo electrónico o rellenas el formulario de contacto, usamos tu nombre y dirección de correo únicamente para responder a tu mensaje. No conservamos tus datos más tiempo del necesario y nunca los vendemos.',
    l2aLabel: 'Contacto:',
    l2b: 'Este sitio web utiliza únicamente cookies funcionales y, en su caso, cookies analíticas anónimas para que el sitio funcione correctamente y para contar el número de visitantes. No se almacenan datos personales a través de ellas.',
    l2bLabel: 'Cookies:',
    h3: '3. Descargo de responsabilidad (Responsabilidad y salud)',
    l3a: 'Seguir este logro deportivo, los preparativos y las posibles actualizaciones de entrenamiento a través de este sitio web o de las redes sociales es puramente informativo y tiene fines inspiradores. No constituye consejo médico ni deportivo profesional.',
    l3aLabel: 'Bajo tu propio riesgo:',
    l3b: 'Si decides acompañarnos en (parte de) la ruta en bicicleta o animarnos desde el borde de la carretera, lo haces enteramente bajo tu propio riesgo. La organización y el ciclista no se hacen responsables de posibles daños, accidentes o lesiones.',
    l3bLabel: 'Acompañar o animar en ruta:',
    h4: '4. Material gráfico y derechos de autor',
    l4a: 'Todas las fotos, vídeos y demás imágenes de este sitio web han sido realizados por Project 15/70 o por encargo suyo, salvo indicación en contrario. Los derechos de autor de este material pertenecen a ',
    l4aLabel: 'Imágenes propias:',
    l4b: 'No está permitido copiar, distribuir o utilizar imágenes, textos o diseños de este sitio web para fines propios (comerciales) sin autorización por escrito.',
    l4bLabel: 'Uso por terceros:',
    l4c: 'Los nombres y logotipos de Save the Children y de nuestros patrocinadores siguen siendo propiedad de las organizaciones correspondientes y se muestran aquí únicamente para promocionar esta acción.',
    l4cLabel: 'Logotipos y marcas:',
    hContact: 'Contacto',
    pContact: '¿Tienes preguntas sobre esta acción o sobre tu privacidad? No dudes en contactarnos a través de:',
    liProject: 'Nombre de la iniciativa / proyecto:',
    liOrganizer: 'Organizador:',
    liEmail: 'Correo electrónico:',
  },
};

export function PrivacyDisclaimer({ navigate, language }: PrivacyDisclaimerProps) {
  const c = COPY[language] ?? COPY.nl;
  return (
    <section className="privacy-page">
      <div className="privacy-back">
        <button className="text-button" onClick={() => navigate('home')}>
          {c.back}
        </button>
      </div>

      <h1>{c.title}</h1>

      <p className="privacy-lead">{c.lead}</p>

      <div className="privacy-content">
        <h3>{c.h1}</h3>
        <ul>
          <li><strong>{c.l1aLabel}</strong> {c.l1a}</li>
          <li><strong>{c.l1bLabel}</strong> {c.l1b}</li>
          <li><strong>{c.l1cLabel}</strong> {c.l1c}</li>
        </ul>

        <h3>{c.h2}</h3>
        <p>{c.p2}</p>
        <ul>
          <li><strong>{c.l2aLabel}</strong> {c.l2a}</li>
          <li><strong>{c.l2bLabel}</strong> {c.l2b}</li>
        </ul>

        <h3>{c.h3}</h3>
        <ul>
          <li><strong>{c.l3aLabel}</strong> {c.l3a}</li>
          <li><strong>{c.l3bLabel}</strong> {c.l3b}</li>
        </ul>

        <h3>{c.h4}</h3>
        <ul>
          <li><strong>{c.l4aLabel}</strong> {c.l4a}<strong>© Project 15/70</strong>.</li>
          <li><strong>{c.l4bLabel}</strong> {c.l4b}</li>
          <li><strong>{c.l4cLabel}</strong> {c.l4c}</li>
        </ul>

        <h3>{c.hContact}</h3>
        <p>{c.pContact}</p>
        <ul className="privacy-contact">
          <li>{c.liProject} <strong>{PROJECT_NAME}</strong></li>
          <li>{c.liOrganizer} <strong>{ORGANIZER_NAME}</strong></li>
          <li>
            {c.liEmail}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email">
              <strong>{CONTACT_EMAIL}</strong>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
