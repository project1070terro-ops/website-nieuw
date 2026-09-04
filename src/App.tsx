import { useEffect, useMemo, useState } from 'react';
import type { Language, Page, Donation } from './types';
import { copy } from './constants';
import { supabase } from './supabaseClient';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Story } from './components/Story';
import { RoutePage } from './components/RoutePage';
import { Terro } from './components/Terro';
import { Blog } from './components/Blog';
import { Donate } from './components/Donate';
import { Contact } from './components/Contact';
import { PrivacyDisclaimer } from './components/PrivacyDisclaimer';
import { CookieBanner } from './components/CookieBanner';
import { Analytics } from './components/Analytics';

function App() {
  const [language, setLanguage] = useState<Language>('nl');
  const [page, setPage] = useState<Page>('home');
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as 'accepted' | 'declined' | null;
    if (stored === 'accepted' || stored === 'declined') {
      setCookieConsent(stored);
    }
  }, []);

  const t = copy[language];

  // Hero image carousel
  useEffect(() => {
    const heroImages = [
      '/images/hero/l_albir_d2ae8820d05f96bc7f7d33001aaf5564.webp',
      '/images/hero/Cumbre-del-Sol-Calpe-Costa-Blanca-3-1920x1080.webp',
      '/images/hero/Cycling-calpe-and-costa-blanca-copyright-Sierras-Sports-Tours-3-1920x1080.webp',
    ];
    const timer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % heroImages.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  // Load donations on mount
  useEffect(() => {
    void loadDonations();
  }, []);

  const totalDonated = useMemo(() => {
    return donations.reduce((sum, donation) => sum + Number(donation.amount_eur), 0);
  }, [donations]);

  async function loadDonations() {
    try {
      const { data } = await supabase
        .from('donations')
        .select('id, name, amount_eur, message, created_at')
        .order('created_at', { ascending: false })
        .limit(8);

      if (data) {
        setDonations(data as Donation[]);
      }
    } catch (error) {
      console.error('Failed to load donations:', error);
    }
  }

  function navigate(nextPage: Page) {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <Header
        page={page}
        language={language}
        setLanguage={setLanguage}
        navigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        t={t}
      />
      <main>
        {page === 'home' && <Home t={t} activeSlide={activeSlide} navigate={navigate} />}
        {page === 'story' && <Story t={t} navigate={navigate} />}
        {page === 'route' && <RoutePage t={t} navigate={navigate} />}
        {page === 'terro' && <Terro t={t} navigate={navigate} />}
        {page === 'blog' && <Blog t={t} navigate={navigate} />}
        {page === 'donate' && (
          <Donate t={t} donations={donations} totalDonated={totalDonated} onDonation={loadDonations} />
        )}
        {page === 'contact' && <Contact t={t} navigate={navigate} />}
        {page === 'privacy' && <PrivacyDisclaimer navigate={navigate} />}
      </main>
      <Footer t={t} navigate={navigate} className={page === 'privacy' ? 'footer-orange-top' : undefined} />
      {cookieConsent === null && (
        <CookieBanner
          navigate={navigate}
          onConsent={(consent) => {
            localStorage.setItem('cookie-consent', consent);
            setCookieConsent(consent);
          }}
        />
      )}
      <Analytics consent={cookieConsent} />
    </div>
  );
}

export default App;
