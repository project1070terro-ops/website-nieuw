import { useState, useEffect } from 'react'; // 1. Geïmporteerd om scrollen bij te houden
import { ArrowRight, Menu, X } from 'lucide-react';
import type { Language, Page } from '../types';
import type { TranslationContent } from '../types';

interface HeaderProps {
  page: Page;
  language: Language;
  setLanguage: (language: Language) => void;
  navigate: (page: Page) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  t: TranslationContent;
}

export function Header({ page, language, setLanguage, navigate, menuOpen, setMenuOpen, t }: HeaderProps) {
  const navItems: [Page, keyof typeof t.nav][] = [['home', 'home'], ['story', 'story'], ['route', 'route'], ['terro', 'terro'], ['blog', 'blog']];

  // State om bij te houden of de gebruiker gescrold heeft
  const [scrolled, setScrolled] = useState(false);

  // Effect om te luisteren naar het scroll-gedrag
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

  // Bepaal of de header in scrolled-modus moet zijn
  // Op home-pagina: alleen bij scrollen
  // Op andere pagina's: altijd
  const isHeaderScrolled = page === 'home' ? scrolled : true;

  return (
    <header className={`site-header ${isHeaderScrolled ? 'scrolled' : ''}`}>
      <button className="brand" onClick={() => navigate('home')}>
        <span>FORZA FORTUNA</span>
        <em>vzw</em>
      </button>
      
      <button className="menu-toggle" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
        {navItems.map(([key, label]) => (
          <button key={key} className={page === key ? 'active' : ''} onClick={() => { navigate(key); setMenuOpen(false); }}>
            {t.nav[label]}
          </button>
        ))}
        <button className={`nav-donate-btn ${page === 'donate' ? 'active' : ''}`} onClick={() => { navigate('donate'); setMenuOpen(false); }}>
          {t.nav.donate}
        </button>
      </nav>

      <button className={`donate-btn ${page === 'donate' ? 'active' : ''}`} onClick={() => navigate('donate')}>
        {t.nav.donate}
      </button>
      
      <div className="language-switcher">
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
