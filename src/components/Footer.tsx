import { Facebook, Instagram } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';
import type { ReactNode } from 'react';

interface FooterProps {
  t: TranslationContent;
  language: Language;
  navigate: (page: Page) => void;
  className?: string;
}

const footerLabels: Record<Language, { privacy: string; copyright: ReactNode; contact: string; general: string; sponsorship: string; partners: string; sponsorsGold: string; sponsorsSilver: string; sponsorsBronze: string }> = {
  nl: { privacy: 'Privacy & Disclaimer', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Website ontwikkeld door Roel Terro.</>, contact: 'CONTACT', general: 'Algemeen:', sponsorship: 'Sponsoring & Diensten:', partners: 'PARTNERS', sponsorsGold: 'SPONSORS GOLD', sponsorsSilver: 'SPONSORS ZILVER', sponsorsBronze: 'SPONSORS BRONS' },
  en: { privacy: 'Privacy & Disclaimer', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Website created by Roel Terro.</>, contact: 'CONTACT', general: 'General:', sponsorship: 'Sponsorship & Services:', partners: 'PARTNERS', sponsorsGold: 'SPONSORS GOLD', sponsorsSilver: 'SPONSORS SILVER', sponsorsBronze: 'SPONSORS BRONZE' },
  es: { privacy: 'Privacidad y Aviso Legal', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Sitio web creado por Roel Terro.</>, contact: 'CONTACTO', general: 'General:', sponsorship: 'Patrocinio & Servicios:', partners: 'SOCIOS', sponsorsGold: 'SPONSORS GOLD', sponsorsSilver: 'PATROCINADORES PLATA', sponsorsBronze: 'PATROCINADORES BRONCE' },
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
            <h3 className="footer-title">{footerLabels[language].contact}</h3>
            <div className="footer-contact-line" style={{ display: 'block', marginBottom: '12px' }}>
              <span
                className="text-xs footer-contact-label"
                style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                {footerLabels[language].general}
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
                {footerLabels[language].sponsorship}
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
        </div>

        <div className="footer-partners gap-2 py-2">
          <div className="w-full max-w-4xl mx-auto flex items-center gap-4 mt-2">
            <div className="flex-1 h-[2px] bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--orange)' }}>{footerLabels[language].partners}</span>
            <div className="flex-1 h-[2px] bg-white/10" />
          </div>
          <div className="footer-partners-row flex-wrap justify-center gap-4" aria-label="Hoofdpartners">
            <a href="https://fortunafg.com" target="_blank" rel="noreferrer" className="footer-sponsor-link !w-[200px] !h-[100px]">
              <div className="footer-sponsor-logo">
                <span>FORTUNA</span>
                <small>FINANCIAL GROUP</small>
              </div>
            </a>
            <a href="https://forzafortuna.be" target="_blank" rel="noreferrer" className="footer-forza-link !mt-0 !w-[200px] !h-[100px]" title="Forza Fortuna">
              <img className="footer-forza-logo" src="/forza-fortuna-logo.webp" alt="Forza Fortuna" />
            </a>
          </div>

          <div className="w-full max-w-4xl mx-auto flex items-center gap-4 mt-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-gray-400 whitespace-nowrap">{footerLabels[language].sponsorsGold}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="footer-partners-row flex-wrap justify-center gap-2 md:gap-4" aria-label="Gold sponsors">
            <div className="footer-partner-placeholder !w-[160px] !h-[80px] bg-amber-600/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[160px] !h-[80px] bg-amber-600/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[160px] !h-[80px] bg-amber-600/20" aria-label="Sponsor placeholder" />
          </div>

          <div className="w-full max-w-4xl mx-auto flex items-center gap-4 mt-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-gray-400 whitespace-nowrap">{footerLabels[language].sponsorsSilver}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="footer-partners-row flex-wrap justify-center gap-2 md:gap-4" aria-label="Silver sponsors">
            <div className="footer-partner-placeholder !w-[130px] !h-[65px] bg-slate-500/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[130px] !h-[65px] bg-slate-500/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[130px] !h-[65px] bg-slate-500/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[130px] !h-[65px] bg-slate-500/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[130px] !h-[65px] bg-slate-500/20" aria-label="Sponsor placeholder" />
          </div>

          <div className="w-full max-w-4xl mx-auto flex items-center gap-4 mt-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-gray-400 whitespace-nowrap">{footerLabels[language].sponsorsBronze}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="footer-partners-row flex-wrap justify-center gap-2 md:gap-4" aria-label="Bronze sponsors">
            <div className="footer-partner-placeholder !w-[100px] !h-[50px] bg-orange-800/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[100px] !h-[50px] bg-orange-800/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[100px] !h-[50px] bg-orange-800/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[100px] !h-[50px] bg-orange-800/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[100px] !h-[50px] bg-orange-800/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[100px] !h-[50px] bg-orange-800/20" aria-label="Sponsor placeholder" />
            <div className="footer-partner-placeholder !w-[100px] !h-[50px] bg-orange-800/20" aria-label="Sponsor placeholder" />
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
