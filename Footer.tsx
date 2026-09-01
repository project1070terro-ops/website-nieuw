import { ArrowRight, Facebook, Instagram } from 'lucide-react';
import type { Page, TranslationContent } from '../types';

interface FooterProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

export function Footer({ t, navigate }: FooterProps) {
  return (
    <footer>
      <div className="footer-module footer-brand-module">
        <button className="brand" onClick={() => navigate('home')}>
          <span>FORZA FORTUNA</span>
          <em>vzw</em>
        </button>
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
            <Facebook size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
            <Instagram size={20} />
          </a>
        </div>
      </div>

      <div className="footer-module footer-contact-module">
        <div className="footer-center-links">
          <button className="footer-contact-link" onClick={() => navigate('contact')}>
            {t.nav.contact} <ArrowRight size={13} />
          </button>
          <a className="footer-email" href="mailto:info@project1070.be">
            info@project1070.be
          </a>
        </div>
      </div>

      <a className="footer-module footer-sponsor" href="https://fortunafg.com" target="_blank" rel="noreferrer">
        <div className="footer-sponsor-logo">
          <span>FORTUNA</span>
          <small>FINANCIAL GROUP</small>
        </div>
      </a>
    </footer>
  );
}
