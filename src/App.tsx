import { useEffect, useMemo, useState } from 'react';
import type { BlogPost, Donation, Language, Page } from './types';
import { copy } from './constants';
import { supabase } from './supabaseClient';
import { loadBlogPosts } from './lib/sanityClient';
import { featuredMarkdownPosts } from './content/blog';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Story } from './components/Story';
import { RoutePage } from './components/RoutePage';
import { Terro } from './components/Terro';
import { Blog } from './components/Blog';
import { BlogDetail } from './components/BlogDetail';
import { Cause } from './components/Cause';
import { Donate } from './components/Donate';
import { Contact } from './components/Contact';
import { PrivacyDisclaimer } from './components/PrivacyDisclaimer';
import { CookieBanner } from './components/CookieBanner';
import { Analytics } from './components/Analytics';

function App() {
  const getInitialPage = (): Page => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname;
    return path.startsWith('/blog') ? 'blog' : 'home';
  };
  const getInitialBlogSlug = () => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    return path.startsWith('/blog/') ? path : null;
  };

  const [language, setLanguage] = useState<Language>('nl');
  const [page, setPage] = useState<Page>(getInitialPage);
  const [blogSlug, setBlogSlug] = useState<string | null>(getInitialBlogSlug);
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as 'accepted' | 'declined' | null;
    if (stored === 'accepted' || stored === 'declined') {
      setCookieConsent(stored);
    }
  }, []);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const state = event.state as { page?: Page; slug?: string | null } | null;
      if (state?.page) {
        setPage(state.page);
        setBlogSlug(state.slug ?? null);
      } else {
        const path = window.location.pathname;
        setPage(path.startsWith('/blog') ? 'blog' : 'home');
        setBlogSlug(path.startsWith('/blog/') ? path : null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
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

  // Load blog posts from Sanity on mount and merge the static featured blocks.
  useEffect(() => {
    loadBlogPosts()
      .then((sanityPosts) => {
        const bySlug = new Map<string, BlogPost>();
        for (const post of featuredMarkdownPosts) bySlug.set(post.slug, post);
        for (const post of sanityPosts) bySlug.set(post.slug, post);
        setBlogPosts([...bySlug.values()]);
      })
      .catch((error) => {
        console.error('Failed to load blog posts:', error);
        setBlogPosts(featuredMarkdownPosts);
      });
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

  function navigate(nextPage: Page, slug?: string) {
    setPage(nextPage);
    setBlogSlug(slug ?? null);
    setMenuOpen(false);

    let path = '/';
    if (slug) {
      path = slug;
    } else if (nextPage === 'blog') {
      path = '/blog';
    } else if (nextPage !== 'home') {
      path = `/${nextPage}`;
    }
    window.history.pushState({ page: nextPage, slug: slug ?? null }, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToBlog(slug: string) {
    navigate('blog', slug);
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
        {page === 'route' && <RoutePage t={t} language={language} navigate={navigate} />}
        {page === 'terro' && <Terro t={t} navigate={navigate} />}
        {page === 'blog' && blogSlug ? (
          <BlogDetail t={t} slug={blogSlug} language={language} blogCards={blogPosts} navigate={navigate} goToBlog={goToBlog} />
        ) : page === 'blog' ? (
          <Blog t={t} language={language} blogCards={blogPosts} navigate={navigate} goToBlog={goToBlog} />
        ) : null}
        {page === 'cause' && <Cause t={t} navigate={navigate} />}
        {page === 'donate' && (
          <Donate t={t} navigate={navigate} donations={donations} totalDonated={totalDonated} onDonation={loadDonations} />
        )}
        {page === 'contact' && <Contact t={t} navigate={navigate} />}
        {page === 'privacy' && <PrivacyDisclaimer navigate={navigate} language={language} />}
      </main>
      <Footer t={t} language={language} navigate={navigate} className={page === 'privacy' ? 'footer-orange-top' : undefined} />
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
