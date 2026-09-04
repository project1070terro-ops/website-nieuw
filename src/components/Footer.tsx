import { Facebook, Instagram } from 'lucide-react';
import type { Page, TranslationContent } from '../types';

interface FooterProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

export function Footer({ t, navigate }: FooterProps) {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-flex">
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

          <div className="footer-module footer-nav-module">
            <h3 className="footer-title">NAVIGATIE</h3>
            <div className="footer-nav-links">
              {(['home', 'story', 'route', 'terro', 'blog'] as (keyof typeof t.nav)[]).map((key) => (
                <button key={key} onClick={() => navigate(key as Page)}>
                  {t.nav[key]}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-module footer-contact-module">
            <h3 className="footer-title">CONTACT</h3>
            <a className="footer-email" href="#" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>
              project1070terro@gmail.com
            </a>
          </div>

          <div className="footer-module footer-sponsor">
            <a href="https://fortunafg.com" target="_blank" rel="noreferrer" className="footer-sponsor-link">
              <div className="footer-sponsor-logo">
                <span>FORTUNA</span>
                <small>FINANCIAL GROUP</small>
              </div>
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <button className="footer-privacy" onClick={() => navigate('privacy')}>
            Privacy & Disclaimer
          </button>
          <div className="footer-copyright">
            © 2026 Forza Fortuna vzw. Alle rechten voorbehouden.
          </div>
        </div>
      </div>
    </footer>
  );
}
