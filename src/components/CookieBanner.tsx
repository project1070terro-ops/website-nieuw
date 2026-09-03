import type { Page } from '../types';

interface CookieBannerProps {
  navigate: (page: Page) => void;
  onConsent: (consent: 'accepted' | 'declined') => void;
}

export function CookieBanner({ navigate, onConsent }: CookieBannerProps) {
  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookievoorkeuren">
      <p className="cookie-text">
        Om je de beste ervaring te bieden op onze website en onze fietsprestatie voor het goede doel te analyseren, gebruiken we een paar anonieme cookies. Fiets je met ons mee?{' '}
        <button
          className="cookie-privacy-link"
          onClick={() => navigate('privacy')}
        >
          Privacy & Disclaimer
        </button>
      </p>
      <div className="cookie-actions">
        <button className="cookie-accept" onClick={() => onConsent('accepted')}>
          Accepteren
        </button>
        <button className="cookie-decline" onClick={() => onConsent('declined')}>
          Weigeren
        </button>
      </div>
    </div>
  );
}
