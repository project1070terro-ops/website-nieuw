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
    return path.startsWith('/blog/') ? path.replace('/blog/', '') : null;
  };
  const getInitialBlogYear = () => {
    if (typeof window === 'undefined') return 2027;
    const value = new URLSearchParams(window.location.search).get('year');
    const parsed = value ? Number(value) : 2027;
    return [2027, 2028, 2029].includes(parsed) ? parsed : 2027;
  };

  const [language, setLanguage] = useState<Language>('nl');
  const [page, setPage] = useState<Page>(getInitialPage);
  const [blogSlug, setBlogSlug] = useState<string | null>(getInitialBlogSlug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogYear, setBlogYear] = useState(getInitialBlogYear);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as 'accepted' | 'declined' | null;
    if (stored === 'accepted' || stored === 'declined') {
      setCookieConsent(stored);
    }
  }, []);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const state = event.state as { page?: Page; slug?: string | null; year?: number } | null;
      if (state?.page) {
        setPage(state.page);
        setBlogSlug(state.slug ?? null);
        const year = state.year ?? getInitialBlogYear();
        setBlogYear(year);
      } else {
        const path = window.location.pathname;
        setPage(path.startsWith('/blog') ? 'blog' : 'home');
        setBlogSlug(path.startsWith('/blog/') ? path.replace('/blog/', '') : null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const t = copy[language];

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

  // Supabase keep-alive ping on every visit
  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('donations')
      .select('*', { count: 'exact', head: true })
      .catch(() => {});
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

  function navigate(nextPage: Page, state?: { slug?: string; year?: number; hash?: string; from?: string; day?: number }) {
    setPage(nextPage);
    setBlogSlug(state?.slug ?? null);
    setMenuOpen(false);
    if (state?.year !== undefined) setBlogYear(state.year);

    const params = new URLSearchParams();
    if (state?.year !== undefined) params.set('year', String(state.year));
    if (state?.from) params.set('from', state.from);
    if (state?.day !== undefined) params.set('day', String(state.day));
    const query = params.toString() ? `?${params.toString()}` : '';
    const hash = state?.hash ? `#${state.hash}` : '';

    let path = '/';
    if (state?.slug) {
      path = `/blog/${state.slug}${query}${hash}`;
    } else if (nextPage === 'blog') {
      path = `/blog${query}${hash}`;
    } else if (nextPage !== 'home') {
      path = `/${nextPage}${query}${hash}`;
    }
    window.history.pushState({ page: nextPage, slug: state?.slug ?? null, year: state?.year ?? null, hash: state?.hash ?? null, from: state?.from ?? null, day: state?.day ?? null }, '', path);
    if (!state?.hash) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToBlog(slug: string) {
    navigate('blog', { slug });
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
        {page === 'home' && <Home t={t} navigate={navigate} />}
        {page === 'story' && <Story t={t} language={language} navigate={navigate} />}
        {page === 'route' && <RoutePage t={t} language={language} navigate={navigate} />}
        {page === 'terro' && <Terro t={t} navigate={navigate} />}
        {page === 'blog' && blogSlug ? (
          <BlogDetail t={t} slug={blogSlug} language={language} blogCards={blogPosts} navigate={navigate} goToBlog={goToBlog} />
        ) : page === 'blog' ? (
          <Blog t={t} language={language} blogCards={blogPosts} navigate={navigate} goToBlog={goToBlog} initialYear={blogYear} />
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
