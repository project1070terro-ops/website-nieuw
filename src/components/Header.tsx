import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { Language, Page } from '../types';
import type { TranslationContent } from '../types';

interface HeaderProps {
  page: Page;
  language: Language;
  setLanguage: (language: Language) => void;
  navigate: (page: Page) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  maintenance: boolean;
  t: TranslationContent;
}

export function Header({ page, language, setLanguage, navigate, menuOpen, setMenuOpen, maintenance, t }: HeaderProps) {
  const navItems: [Page, keyof typeof t.nav][] = [['home', 'home'], ['story', 'story'], ['cause', 'cause'], ['terro', 'terro'], ['route', 'route'], ['blog', 'blog'], ['sponsoring', 'sponsoring']];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHeaderScrolled = maintenance || (page === 'home' ? scrolled : true);

  return (
    <header className={`site-header ${isHeaderScrolled ? 'scrolled' : ''}`}>
      <div className="brand">
        <span>FORZA FORTUNA</span>
        <em>Financial Group</em>
      </div>

      <button className="menu-toggle" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
        {!maintenance && navItems.map(([key, label]) => (
          <button key={key} className={page === key ? 'active' : ''} onClick={() => { navigate(key); setMenuOpen(false); }}>
            {t.nav[label]}
          </button>
        ))}
        {!maintenance && (
          <button className={`nav-donate-btn ${page === 'donate' ? 'active' : ''}`} onClick={() => { navigate('donate'); setMenuOpen(false); }}>
            {t.nav.donate}
          </button>
        )}
        <div className="language-switcher nav-language-switcher">
          {(['nl', 'en', 'es'] as Language[]).map((item, index) => (
            <span key={item}>
              <button className={language === item ? 'selected' : ''} onClick={() => { setLanguage(item); setMenuOpen(false); }}>
                {item.toUpperCase()}
              </button>
              {index < 2 && <b>|</b>}
            </span>
          ))}
        </div>
      </nav>

      {!maintenance && (
        <button className={`donate-btn ${page === 'donate' ? 'active' : ''}`} onClick={() => navigate('donate')}>
          {t.nav.donate}
        </button>
      )}

      <div className="language-switcher header-language-switcher">
        {(['nl', 'en', 'es'] as Language[]).map((item, index) => (
          <span key={item}>
            <button className={language === item ? 'selected' : ''} onClick={() => setLanguage(item)}>
              {item.toUpperCase()}
            </button>
            {index < 2 && <b>|</b>}
          </span>
        ))}
      </div>
    </header>
  );
}
