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
  const items: [Page, keyof typeof t.nav][] = [['home', 'home'], ['story', 'story'], ['route', 'route'], ['terro', 'terro'], ['blog', 'blog'], ['donate', 'donate']];

  // 2. State om bij te houden of de gebruiker gescrold heeft
  const [scrolled, setScrolled] = useState(false);

  // 3. Effect om te luisteren naar het scroll-gedrag
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

  return (
    /* 4. AANGEPAST: Voegt de 'scrolled' klasse dynamisch toe op basis van de state */
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <button className="brand" onClick={() => navigate('home')}>
        <span>FORZA FORTUNA</span>
        <em>vzw</em>
      </button>
      
      <button className="menu-toggle" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
        {items.map(([key, label]) => (
          <button key={key} className={page === key ? 'active' : ''} onClick={() => { navigate(key); setMenuOpen(false); }}>
            {t.nav[label]}
          </button>
        ))}
      </nav>
      
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
