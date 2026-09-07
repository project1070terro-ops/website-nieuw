import { Facebook, Instagram } from 'lucide-react';
import type { Page, TranslationContent } from '../types';

interface FooterProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
  className?: string;
}

const STC_URL = 'https://www.savethechildren.net/what-we-do/advocacy/save-children-europe';

export function Footer({ t, navigate, className }: FooterProps) {
  return (
    <footer className={className}>
      <div className="footer-container">
        <div className="footer-flex">
          <div className="footer-module footer-brand-module">
            <button className="brand" onClick={() => navigate('home')}>
              <span>FORZA FORTUNA</span>
              <em>Financial Group</em>
            </button>
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
            <a className="footer-email" href="#" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>
              info@project1570terro.com
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
          <button className="footer-privacy" onClick={() => navigate('privacy')}>
            Cookies
          </button>
          <div className="footer-copyright">
            © 2026 Forza Fortuna Financial Group. Alle rechten voorbehouden.
          </div>
        </div>
      </div>
    </footer>
  );
}
