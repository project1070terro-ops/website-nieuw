import type { Page } from '../types';

interface PrivacyDisclaimerProps {
  navigate: (page: Page) => void;
}

// Vul deze placeholders eenvoudig hier in:
const PROJECT_NAME = '[PROJECT_NAME_PLACEHOLDER]';
const ORGANIZER_NAME = '[YOUR_NAME_PLACEHOLDER]';
const CONTACT_EMAIL = '[YOUR_EMAIL_PLACEHOLDER]';

export function PrivacyDisclaimer({ navigate }: PrivacyDisclaimerProps) {
  return (
    <section className="privacy-page">
      <div className="privacy-back">
        <button className="text-button" onClick={() => navigate('home')}>
          ← Terug naar home
        </button>
      </div>

      <h1>Privacy & Disclaimer</h1>

      <p className="privacy-lead">
        Dit is de officiële website van ons sportieve project voor het goede doel. Deze pagina legt uit hoe er met gegevens wordt omgegaan en wat de spelregels zijn rondom deze actie.
      </p>

      <div className="privacy-content">
        <h3>1. Het Goede Doel & Transparantie</h3>
        <ul>
          <li>
            <strong>100% naar het doel:</strong> Alle donaties die via deze website of de gekoppelde actiepagina worden gedaan, gaan volledig en rechtstreeks naar het gekozen goede doel voor kinderen in Spanje. Er blijft niets aan de strijkstok hangen.
          </li>
          <li>
            <strong>Sponsoring:</strong> Onze gewaardeerde kleding- en materiaalpartner ondersteunt deze prestatie uitsluitend materieel (met kleding en uitrusting). Er worden via deze website geen commerciële inkomsten gegenereerd.
          </li>
          <li>
            <strong>Externe betalingen:</strong> De financiële transacties verlopen niet via deze website, maar via het beveiligde platform van het goede doel zelf of een erkend donatieplatform. Wij hebben geen inzage in jouw bankgegevens.
          </li>
        </ul>

        <h3>2. Privacybeleid (Hoe we omgaan met je data)</h3>
        <p>
          Wij respecteren jouw privacy volgens de Europese privacywetgeving (AVG/GDPR).
        </p>
        <ul>
          <li>
            <strong>Contact:</strong> Als je ons een e-mail stuurt of het contactformulier invult, gebruiken we je naam en e-mailadres puur en alleen om je bericht te beantwoorden. We bewaren je gegevens niet langer dan nodig en verkopen ze nooit door.
          </li>
          <li>
            <strong>Cookies:</strong> Deze website gebruikt uitsluitend functionele en eventueel anonieme analytische cookies om te zorgen dat de website goed werkt en om bezoekersaantallen te tellen. Hier worden geen persoonsgegevens mee opgeslagen.
          </li>
        </ul>

        <h3>3. Disclaimer (Aansprakelijkheid & Medisch)</h3>
        <ul>
          <li>
            <strong>Eigen risico:</strong> Het volgen van deze sportprestatie, de voorbereidingen en eventuele trainingsupdates via deze website of sociale media zijn puur informatief en bedoeld ter inspiratie. Dit is geen medisch of professioneel sportadvies.
          </li>
          <li>
            <strong>Begeleiding of meerijden:</strong> Mocht je besluiten om (een deel van) de route mee te fietsen of ons langs de route te supporteren, dan is dit volledig op eigen risico. De organisatie en de fietser zijn niet aansprakelijk voor eventuele schade, ongevallen of blessures.
          </li>
        </ul>

        <h3>Contact</h3>
        <p>
          Heb je vragen over deze actie of over je privacy? Neem dan gerust contact op via:
        </p>
        <ul className="privacy-contact">
          <li>Naam initiatief / project: <strong>{PROJECT_NAME}</strong></li>
          <li>Organisator: <strong>{ORGANIZER_NAME}</strong></li>
          <li>
            E-mail:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email">
              <strong>{CONTACT_EMAIL}</strong>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
