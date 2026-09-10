import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Expand, X } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { BlogPost, Language, Page, TranslationContent } from '../types';
import { Format1570 } from './Format1570';

interface BlogDetailProps {
  t: TranslationContent;
  slug: string;
  language: Language;
  blogCards: BlogPost[];
  navigate: (page: Page) => void;
  goToBlog: (slug: string) => void;
}

function parseBlogDate(date: string) {
  const [month, year] = date.split('/').map((part) => part.trim());
  return new Date(Number(year), Number(month) - 1);
}

const navLabels: Record<Language, { prev: string; next: string }> = {
  nl: { prev: 'Vorig artikel', next: 'Volgend artikel' },
  en: { prev: 'Previous article', next: 'Next article' },
  es: { prev: 'Artículo anterior', next: 'Artículo siguiente' },
};

const stravaLabels: Record<Language, { eyebrow: string; cta: string }> = {
  nl: { eyebrow: 'Strava-activiteit', cta: 'Bekijk op Strava' },
  en: { eyebrow: 'Strava activity', cta: 'View on Strava' },
  es: { eyebrow: 'Actividad en Strava', cta: 'Ver en Strava' },
};

const readMoreLabels: Record<Language, { more: string; less: string }> = {
  nl: { more: 'Lees het volledige verslag ↓', less: 'Verslag inklappen ↑' },
  en: { more: 'Read the full report ↓', less: 'Collapse report ↑' },
  es: { more: 'Leer la crónica completa ↓', less: 'Contraer crónica ↑' },
};

export function BlogDetail({ t, slug, language, blogCards, navigate, goToBlog }: BlogDetailProps) {
  const sortedCards = [...blogCards]
    .map((card, index) => ({ card, index }))
    .sort((a, b) => parseBlogDate(b.card.date).getTime() - parseBlogDate(a.card.date).getTime() || a.index - b.index)
    .map((item) => item.card);

  const postIndex = sortedCards.findIndex((card) => card.slug === slug);
  const post = sortedCards[postIndex];

  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [slide, setSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!post) navigate('blog');
  }, [post, navigate]);

  // Laad het Strava-embedscript in; verwijder een eventueel oud script om duplicaten te voorkomen.
  useEffect(() => {
    const oldScript = document.querySelector('script[src="https://strava-embeds.com/embed.js"]');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.src = 'https://strava-embeds.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    setSlide(0);
    setExpanded(false);
    setLightbox(null);
  }, [post?.slug]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!post) return null;

  const prevPost = sortedCards[postIndex - 1];
  const nextPost = sortedCards[postIndex + 1];
  const labels = navLabels[language];
  const photos = post.photos ?? [];
  const photoCount = photos.length;
  const visible = isMobile ? 1 : 2;
  const maxSlide = Math.max(0, photoCount - visible);
  const safeSlide = Math.min(slide, maxSlide);
  const shortTitle = post.fullTitle[language].split('—')[0].trim();
  const [prefix, suffix] = shortTitle.split(':', 2);

  return (
    <article className="blog-detail">

      <div className="blog-detail-content">
        <button className="blog-detail-back" onClick={() => navigate('blog')}>
          <ArrowLeft size={18} /> {t.nav.blog}
        </button>
        <p className="blog-detail-date">{post.date}</p>
        <h1 className="blog-detail-title">
          {suffix === undefined ? (
            <span className="title-prefix">
              <Format1570 text={post.fullTitle[language]} />
            </span>
          ) : (
            <>
              <span className="title-prefix">
                <Format1570 text={`${prefix}:`} />
              </span>
              <span className="title-suffix">
                <Format1570 text={suffix} />
              </span>
            </>
          )}
        </h1>
        <div className="blog-detail-body">
          {post.excerpt?.[language]?.length ? (
            <PortableText value={post.excerpt[language]} />
          ) : (
            <PortableText value={post.body[language]} />
          )}
        </div>
        {post.stravaId && post.stravaToken && (
          <div className="strava-card">
            <p className="strava-card-eyebrow">{stravaLabels[language].eyebrow}</p>
            <div style={{ width: '465px', maxWidth: '100%', overflow: 'hidden', margin: '0 auto', borderRadius: '1rem', minHeight: '480px' }}>
              <div
                className="strava-embed-placeholder"
                data-embed-type="activity"
                data-embed-id={post.stravaId}
                data-style="standard"
                data-from-embed="false"
                data-token={post.stravaToken}
              ></div>
            </div>
          </div>
        )}
        {post.excerpt?.[language]?.length && post.body[language]?.length ? (
          <div className="blog-detail-body post-body">
            <div className={`read-more-text${expanded ? ' open' : ''}`}>
              <PortableText value={post.body[language]} />
            </div>
            <button className="read-more-btn" onClick={() => setExpanded((v) => !v)}>
              {expanded ? readMoreLabels[language].less : readMoreLabels[language].more}
            </button>
          </div>
        ) : null}
        {photoCount > 0 && (
          <div className="blog-slider">
            <div
              className="blog-slider-track"
              style={{ transform: `translateX(calc(-${safeSlide} * var(--slide-step)))` }}
            >
              {photos.map((img, i) => (
                <button
                  key={img.src}
                  className="blog-slider-slide"
                  onClick={() => setLightbox(i)}
                  aria-label={img.alt}
                >
                  <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} />
                  <span className="blog-photo-zoom"><Expand size={20} /></span>
                </button>
              ))}
            </div>
            {photoCount > 1 && (
              <>
                <button
                  className="blog-slider-arrow prev"
                  onClick={() => setSlide((s) => (s - 1 + maxSlide + 1) % (maxSlide + 1))}
                  aria-label="Vorige foto"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="blog-slider-arrow next"
                  onClick={() => setSlide((s) => (s + 1) % (maxSlide + 1))}
                  aria-label="Volgende foto"
                >
                  <ChevronRight size={22} />
                </button>
                <div className="blog-slider-dots">
                  {photos.slice(0, maxSlide + 1).map((_, i) => (
                    <button
                      key={i}
                      className={i === safeSlide ? 'active' : ''}
                      onClick={() => setSlide(i)}
                      aria-label={`Foto ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        <nav className="blog-detail-nav" aria-label="Blog navigation">
          {prevPost && (
            <button className="blog-detail-nav-card" onClick={() => goToBlog(prevPost.slug)}>
              <ChevronLeft size={18} />
              <span className="blog-detail-nav-text">
                <span className="blog-detail-nav-label">{labels.prev}</span>
                <span className="blog-detail-nav-title">{prevPost.title[language]}</span>
              </span>
            </button>
          )}
          {nextPost && (
            <button className="blog-detail-nav-card next" onClick={() => goToBlog(nextPost.slug)}>
              <span className="blog-detail-nav-text">
                <span className="blog-detail-nav-label">{labels.next}</span>
                <span className="blog-detail-nav-title">{nextPost.title[language]}</span>
              </span>
              <ChevronRight size={18} />
            </button>
          )}
        </nav>
      </div>
      {lightbox !== null && photoCount > 0 && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '24px',
            cursor: 'zoom-out',
          }}
          onClick={() => setLightbox(null)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 40) {
              setLightbox((cur) => cur === null ? null : (cur + (delta < 0 ? 1 : -1) + photoCount) % photoCount);
            }
            touchStartX.current = null;
          }}
        >
          {/* Topbalk: teller links, download + sluiten rechts — binnen gecentreerde container */}
          <div
            style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10000, display: 'flex', justifyContent: 'center', padding: '0 24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: '100%', maxWidth: '1024px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px' }}>
              <span style={{ fontSize: '16px', fontWeight: 500, letterSpacing: '0.1em', color: '#fff' }}>
                {lightbox + 1} / {photoCount}
              </span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href={photos[lightbox].src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open of download foto"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff' }}
                >
                  <Download size={22} />
                </a>
                <button
                  onClick={() => setLightbox(null)}
                  aria-label="Sluiten"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', border: 'none', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', cursor: 'pointer' }}
                >
                  <X size={26} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigatiepijlen: gecentreerde container, naast de foto */}
          <div
            style={{ position: 'fixed', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', zIndex: 10000, display: 'flex', justifyContent: 'center', padding: '0 24px', pointerEvents: 'none' }}
          >
            <div style={{ width: '100%', maxWidth: '1024px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photoCount) % photoCount); }}
                aria-label="Vorige foto"
                style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', border: 'none', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', cursor: 'pointer' }}
              >
                <ChevronLeft size={30} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photoCount); }}
                aria-label="Volgende foto"
                style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', border: 'none', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', cursor: 'pointer' }}
              >
                <ChevronRight size={30} />
              </button>
            </div>
          </div>

          {/* Foto + bijschrift */}
          <figure style={{ margin: 0, maxWidth: '92vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              key={photos[lightbox].src}
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              style={{ maxWidth: '92vw', maxHeight: '75vh', borderRadius: '12px', boxShadow: '0 24px 64px rgba(0,0,0,0.6)', cursor: 'zoom-out' }}
            />
            <figcaption style={{ marginTop: '16px', fontSize: '17px', fontWeight: 500, letterSpacing: '0.04em', color: '#fff', textAlign: 'center' }}>
              {photos[lightbox].caption[language] ?? photos[lightbox].caption.nl}
            </figcaption>
          </figure>
        </div>
      )}
    </article>
  );
}
