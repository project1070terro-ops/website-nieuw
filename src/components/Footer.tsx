import { Facebook, Instagram, Shield } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';

interface FooterProps {
  t: TranslationContent;
  language: Language;
  navigate: (page: Page) => void;
  className?: string;
}

const footerLabels: Record<Language, { privacy: string; copyright: string }> = {
  nl: { privacy: 'Privacy & Disclaimer', copyright: '© 2026 – 2027 Project 15/70. Alle rechten voorbehouden.' },
  en: { privacy: 'Privacy & Disclaimer', copyright: '© 2026 – 2027 Project 15/70. All rights reserved.' },
  es: { privacy: 'Privacidad y Aviso Legal', copyright: '© 2026 – 2027 Project 15/70. Todos los derechos reservados.' },
};

const STC_URL = 'https://www.savethechildren.net/what-we-do/advocacy/save-children-europe';

export function Footer({ t, language, navigate, className }: FooterProps) {
  return (
    <footer className={className}>
      <div className="footer-container">
        <div className="footer-flex">
          <div className="footer-module footer-brand-module">
            <div className="brand">
              <span>FORZA FORTUNA</span>
              <em>Financial Group</em>
            </div>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
                <Instagram size={20} />
              </a>
            </div>
            <a className="footer-stc" href={STC_URL} target="_blank" rel="noreferrer">
              <img src="/images/sponsor/stc-embleem.png" alt="Save the Children" />
              <span>SAVE THE CHILDREN</span>
            </a>
          </div>

          <div className="footer-module footer-nav-module">
            <h3 className="footer-title">NAVIGATIE</h3>
            <div className="footer-nav-links">
              {(['home', 'story', 'route', 'terro', 'blog', 'cause'] as (keyof typeof t.nav)[]).map((key) => (
                <button key={key} onClick={() => navigate(key as Page)}>
                  {t.nav[key]}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-module footer-contact-module">
            <h3 className="footer-title">CONTACT</h3>
            <a className="footer-email" href="mailto:info@project1570.org">
              info@project1570.org
            </a>
          </div>

          <div className="footer-module footer-sponsor">
            <a href="https://fortunafg.com" target="_blank" rel="noreferrer" className="footer-sponsor-link">
              <div className="footer-sponsor-logo">
                <span>FORTUNA</span>
                <small>FINANCIAL GROUP</small>
              </div>
            </a>
            <a href="https://forzafortuna.be" target="_blank" rel="noreferrer" className="footer-forza-link" title="Forza Fortuna">
              <img className="footer-forza-logo" src="/forza-fortuna-logo.webp" alt="Forza Fortuna" />
            </a>
          </div>
        </div>

        <div className="footer-partners">
          <div className="footer-partners-row" aria-label="Productpartners placeholders">
            {[0, 1, 2].map((i) => (
              <div key={i} className="footer-partner-placeholder" aria-label="Partner placeholder">
                <Shield size={20} />
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <button className="footer-privacy" onClick={() => navigate('privacy')}>
              {footerLabels[language].privacy}
            </button>
          </div>
          <div className="footer-copyright">
            {footerLabels[language].copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
