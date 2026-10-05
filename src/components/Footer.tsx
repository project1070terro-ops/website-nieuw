import { Facebook, Instagram } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';
import type { ReactNode } from 'react';

interface FooterProps {
  t: TranslationContent;
  language: Language;
  navigate: (page: Page) => void;
  className?: string;
}

const footerLabels: Record<Language, { privacy: string; copyright: ReactNode }> = {
  nl: { privacy: 'Privacy & Disclaimer', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Website ontwikkeld door Roel Terro.</> },
  en: { privacy: 'Privacy & Disclaimer', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Website created by Roel Terro.</> },
  es: { privacy: 'Privacidad y Aviso Legal', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Sitio web creado por Roel Terro.</> },
};

const STC_URL = 'https://www.savethechildren.org/';

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
            <div className="footer-contact-line" style={{ display: 'block', marginBottom: '12px' }}>
              <span
                className="text-xs footer-contact-label"
                style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                Algemeen:
              </span>
              <button
                className="text-xs text-[#99815e] hover:text-white transition-colors"
                onClick={() => navigate('contact')}
                style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
              >
                info@project1570.org
              </button>
            </div>
            <div className="footer-contact-line" style={{ display: 'block' }}>
              <span
                className="text-xs footer-contact-label"
                style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                Sponsoring & Diensten:
              </span>
              <button
                className="text-xs text-[#99815e] hover:text-white transition-colors"
                onClick={() => {
                  navigate('contact');
                  window.history.replaceState({ ...window.history.state, subject: 'sponsoring' }, '', window.location.href);
                }}
                style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
              >
                sponsoring@project1570.org
              </button>
            </div>
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

        <div className="footer-partners gap-4">
          <div className="footer-partners-row" aria-label="Hoofdsponsors">
            <a
              href="https://www.bikefit-vanstaeyen.com/"
              target="_blank"
              rel="noreferrer"
              className="footer-partner-placeholder !w-[112px] !h-[60px] !cursor-pointer"
              aria-label="BikeFit"
            >
              <img
                className="w-full h-full object-contain p-1 !grayscale-0 !opacity-100"
                src="/images/hero/Bikefit-logo.webp"
                alt="BikeFit"
              />
            </a>
            <div className="footer-partner-placeholder !w-[112px] !h-[60px]" aria-label="Partner placeholder" />
          </div>
          <div className="footer-partners-row" aria-label="Diensten placeholders">
            <a
              href="https://www.bikefit-vanstaeyen.com/"
              target="_blank"
              rel="noreferrer"
              className="footer-partner-placeholder !w-[75px] !h-[40px] !cursor-pointer"
              aria-label="BikeFit"
            >
              <img
                className="w-full h-full object-contain p-1 !grayscale-0 !opacity-100"
                src="/images/hero/Bikefit-logo.webp"
                alt="BikeFit"
              />
            </a>
            <div className="footer-partner-placeholder !w-[75px] !h-[40px]" aria-label="Partner placeholder" />
            <div className="footer-partner-placeholder !w-[75px] !h-[40px]" aria-label="Partner placeholder" />
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
