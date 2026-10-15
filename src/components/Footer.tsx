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
  nl: { privacy: 'Privacy & Disclaimer', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Website ontwikkeld door Terro.</>, contact: 'CONTACT', general: 'Algemeen:', sponsorship: 'Sponsoring & Diensten:', partners: 'PARTNERS', sponsorsGold: 'SPONSORS GOLD', sponsorsSilver: 'SPONSORS ZILVER', sponsorsBronze: 'SPONSORS BRONS' },
  en: { privacy: 'Privacy & Disclaimer', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Website developed by Terro.</>, contact: 'CONTACT', general: 'General:', sponsorship: 'Sponsorship & Services:', partners: 'PARTNERS', sponsorsGold: 'SPONSORS GOLD', sponsorsSilver: 'SPONSORS SILVER', sponsorsBronze: 'SPONSORS BRONZE' },
  es: { privacy: 'Privacidad y Aviso Legal', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Sitio web desarrollado por Terro.</>, contact: 'CONTACTO', general: 'General:', sponsorship: 'Patrocinio & Servicios:', partners: 'SOCIOS', sponsorsGold: 'SPONSORS GOLD', sponsorsSilver: 'PATROCINADORES PLATA', sponsorsBronze: 'PATROCINADORES BRONCE' },
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
              <a href="https://www.facebook.com/share/14zSqaMQPTN/" target="_blank" rel="noopener noreferrer" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/project15_70?dlrf=MWlwYzlwdHNvZGJ1cA==" target="_blank" rel="noopener noreferrer" title="Instagram">
                <Instagram size={20} />
              </a>
            </div>
            <a className="footer-stc" href={STC_URL} target="_blank" rel="noreferrer">
              <img src="/images/sponsor/stc-embleem.png" alt="Save the Children" />
              <span>SAVE THE CHILDREN</span>
            </a>
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
              <a
                className="text-xs text-[#99815e] hover:text-white transition-colors"
                href="mailto:info@project1570.org"
                style={{ display: 'block', textDecoration: 'underline' }}
              >
                info@project1570.org
              </a>
            </div>
            <div className="footer-contact-line" style={{ display: 'block' }}>
              <span
                className="text-xs footer-contact-label"
                style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                {footerLabels[language].sponsorship}
              </span>
              <a
                className="text-xs text-[#99815e] hover:text-white transition-colors"
                href="mailto:sponsoring@project1570.org"
                style={{ display: 'block', textDecoration: 'underline' }}
              >
                sponsoring@project1570.org
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            {footerLabels[language].copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
