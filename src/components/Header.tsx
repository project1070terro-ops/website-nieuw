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
  t: TranslationContent;
}

export function Header({ page, language, setLanguage, navigate, menuOpen, setMenuOpen, t }: HeaderProps) {
  return (
    <header className="site-header scrolled">
      <div className="brand">
        <span>FORZA FORTUNA</span>
        <em>Financial Group</em>
      </div>

      <button className="menu-toggle" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
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
