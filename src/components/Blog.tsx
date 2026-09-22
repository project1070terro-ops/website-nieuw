import { useEffect, useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import type { BlogPost, Language, Page, TrainingStats, TranslationContent } from '../types';
import { loadTrainingStats } from '../lib/sanityClient';
import { PageIntro } from './PageIntro';
import { BlogStats } from './BlogStats';

interface BlogProps {
  t: TranslationContent;
  language: Language;
  blogCards: BlogPost[];
  navigate?: (page: Page) => void;
  goToBlog?: (slug: string) => void;
  initialYear?: number;
}

const overviewLabels: Record<Language, { stages: string; challenge: string; expected: string; loadMore: string; categories: Record<string, string> }> = {
  nl: { stages: 'De Weg naar het Najaar 2029', challenge: 'De Uitdaging: 10 Dagen Verslagen', expected: 'Verwacht', loadMore: 'Laad meer berichten', categories: { all: 'Alles', preview: '🗺️ Ritten-Preview', training: '🚴‍♂️ Training', material: '🔧 Materiaal', progress: '📈 Progressie', partner: '🤝 Partner / Sponsor' } },
  en: { stages: 'The Road to Autumn 2029', challenge: 'The Challenge: 10 Days of Reports', expected: 'Expected', loadMore: 'Load more posts', categories: { all: 'All', preview: '🗺️ Route Preview', training: '🚴‍♂️ Training', material: '🔧 Material', progress: '📈 Progress', partner: '🤝 Partner / Sponsor' } },
  es: { stages: 'El Camino hacia el Otoño 2029', challenge: 'El Desafío: Crónicas de 10 Días', expected: 'Previsto', loadMore: 'Cargar más entradas', categories: { all: 'Todo', preview: '🗺️ Vista previa de ruta', training: '🚴‍♂️ Entrenamiento', material: '🔧 Material', progress: '📈 Progreso', partner: '🤝 Socio / Patrocinador' } },
};

// Etappes herkennen we aan de slug (/blog/dag-1, /blog/day-2, /blog/dia-3, ...).
const isStage = (slug: string) => /\/(dag|day|d[ií]a)[-\s]?\d+/i.test(slug);

const CATEGORIES = ['all', 'preview', 'training', 'material', 'progress', 'partner'];

// De 3 vaste info-kaarten; alle overige posts vallen in de tijdlijn.
const INFO_SLUGS = new Set([
  '/blog/de-officiele-aftrap',
  '/blog/de-rekensom-hoogtemeters',
  '/blog/waarom-save-the-children',
]);

const YEARS = [2027, 2028, 2029];

function CategoryLabel({ label }: { label: string }) {
  const parts = label.split(' ');
  const emoji = parts[0];
  const text = parts.slice(1).join(' ');
  if (!text) {
    return <span className="text-xs font-normal text-zinc-300 flex items-center gap-1">{label}</span>;
  }
  return (
    <span className="text-xs font-normal text-zinc-300 flex items-center gap-1">
      <span>{emoji}</span>
      <span>{text}</span>
    </span>
  );
}

function postYear(date: string) {
  if (date.includes('/')) {
    const parts = date.split('/');
    return Number(parts[parts.length - 1].trim());
  }
  return new Date(date).getFullYear();
}

function parseBlogDate(date: string) {
  if (date.includes('/')) {
    const [month, year] = date.split('/').map((part) => part.trim());
    return new Date(Number(year), Number(month) - 1);
  }
  return new Date(date);
}

function toPlainText(blocks: any[] = []): string {
  return blocks
    .map((block) => {
      if (block?._type !== 'block' || !Array.isArray(block.children)) return '';
      return block.children
        .filter((child: any) => child?._type === 'span' && typeof child.text === 'string')
        .map((child: any) => child.text)
        .join('');
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateText(text: string, maxChars = 100): string {
  if (text.length <= maxChars) return text;
  const cut = text.lastIndexOf(' ', maxChars);
  const slice = cut > 0 ? text.slice(0, cut) : text.slice(0, maxChars);
  return slice.trim() + '...';
}

const INITIAL_COUNT = 9;
const LOAD_MORE = 6;

export function Blog({ t, language, blogCards, navigate, goToBlog, initialYear }: BlogProps) {
  const [year, setYear] = useState(initialYear ?? 2027);
  const [category, setCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [trainingStats, setTrainingStats] = useState<TrainingStats | null>(null);

  useEffect(() => {
    if (initialYear !== undefined && initialYear !== year) {
      setYear(initialYear);
    }
  }, [initialYear]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return;
    const el = document.getElementById(window.location.hash.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    loadTrainingStats().then(setTrainingStats).catch(() => setTrainingStats(null));
  }, []);

  const sortedCards = [...blogCards]
    .map((card, index) => ({ card, index }))
    .sort((a, b) => parseBlogDate(b.card.date).getTime() - parseBlogDate(a.card.date).getTime() || a.index - b.index)
    .map((item) => item.card);

  // Statische introductieblokken vs. tijdlijn-items (etappes, trainingen, updates)
  const infoCards = sortedCards.filter((c) => INFO_SLUGS.has(c.slug));
  const yearCards = sortedCards.filter((c) => !INFO_SLUGS.has(c.slug) && postYear(c.date) === year && (category === 'all' || c.category === category));
  // In 2029 splitsen we: reguliere updates boven, de 10 etappes onder een sub-kop.
  const updates = yearCards.filter((c) => !isStage(c.slug));
  const stages = yearCards.filter((c) => isStage(c.slug));
  const timelineSource = year === 2029 ? updates : yearCards;
  const topCards = timelineSource.slice(0, 3);
  const listCards = timelineSource.slice(3, visibleCount);
  const hasMore = timelineSource.length > visibleCount;
  const labels = overviewLabels[language];

  const renderItem = ({ date, slug, label, title, inleiding, image, status, expected, category: cat }: (typeof yearCards)[number]) => {
    const categoryLabel = labels.categories[cat || 'all'] || labels.categories.all;
    const excerptText = toPlainText(inleiding?.[language] || []);
    const truncated = excerptText ? truncateText(excerptText, 100) : '';
    const displayTitle = title[language];
    const [prefix, suffix] = displayTitle.split(':', 2);
    const titleNode = suffix === undefined ? (
      <span className="title-prefix">{displayTitle}</span>
    ) : (
      <>
        <span className="title-prefix">{prefix}:</span>
        <span className="title-suffix">{suffix}</span>
      </>
    );
    if (status === 'upcoming') {
      return (
        <div key={slug} className="blog-card upcoming">
          {image && <img className="blog-card-media" src={image} alt="" loading="lazy" />}
          <div className="blog-card-body">
            <div className="blog-list-meta w-full justify-between">
              <span className="tag upcoming-tag">{label[language]}</span>
              <div className="flex justify-between items-center w-full mb-3">
                <span className="text-xs text-zinc-400">{expected ? `${labels.expected}: ${expected}` : date}</span>
                <CategoryLabel label={categoryLabel} />
              </div>
              <Lock className="upcoming-lock" size={13} />
            </div>
            <h3>{titleNode}</h3>
            {truncated ? (
              <div className="blog-card-excerpt">
                <p>{truncated}</p>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    return (
      <a
        key={slug}
        href={`/blog/${slug}`}
        className="blog-card"
        onClick={(event) => {
          event.preventDefault();
          goToBlog?.(slug);
        }}
      >
        {image && <img className="blog-card-media" src={image} alt="" loading="lazy" />}
        <div className="blog-card-body">
          <div className="blog-list-meta w-full justify-between">
            <span className="tag">{label[language]}</span>
            <div className="flex justify-between items-center w-full mb-3">
              <span className="text-xs text-zinc-400">{date}</span>
              <CategoryLabel label={categoryLabel} />
            </div>
          </div>
          <h3>{titleNode}</h3>
          {truncated ? (
            <div className="blog-card-excerpt">
              <p>{truncated}</p>
            </div>
          ) : null}
        </div>
      </a>
    );
  };

  const renderMiniCard = ({ date, slug, title, image, status, expected, category: cat }: (typeof yearCards)[number]) => {
    const displayTitle = title[language];
    const categoryLabel = labels.categories[cat || 'all'] || labels.categories.all;
    if (status === 'upcoming') {
      return (
        <div key={slug} className="blog-card-mini upcoming">
          {image && <img src={image} alt="" loading="lazy" />}
          <div className="blog-mini-body">
            <span className="flex justify-between items-center w-full mb-3">
              <span className="text-xs text-zinc-400">{expected ? `${labels.expected}: ${expected}` : date}</span>
              <CategoryLabel label={categoryLabel} />
            </span>
            <span className="blog-mini-title">{displayTitle}</span>
          </div>
        </div>
      );
    }
    return (
      <a
        key={slug}
        href={`/blog/${slug}`}
        className="blog-card-mini"
        onClick={(event) => {
          event.preventDefault();
          goToBlog?.(slug);
        }}
      >
        {image && <img src={image} alt="" loading="lazy" />}
        <div className="blog-mini-body">
          <span className="flex justify-between items-center w-full mb-3">
            <span className="text-xs text-zinc-400">{date}</span>
            <CategoryLabel label={categoryLabel} />
          </span>
          <span className="blog-mini-title">{displayTitle}</span>
        </div>
      </a>
    );
  };

  return (
    <>
      <PageIntro title={t.blogTitle} lead={t.blogLead} />

      {/* Project-info: 3 statische kaarten */}
      <section className="blog-info-grid">
        {infoCards.map(({ slug, label, title, image }) => {
          const displayTitle = title[language];
          const [prefix, suffix] = displayTitle.split(':', 2);
          return (
            <a
              key={slug}
              href={`/blog/${slug}`}
              className="blog-info-card"
              onClick={(event) => {
                event.preventDefault();
                goToBlog?.(slug);
              }}
            >
              {image && <img src={image} alt="" loading="lazy" />}
              <div className="blog-info-card-body">
                <span className="tag">{label[language]}</span>
                <h2>
                  {suffix === undefined ? (
                    <span className="title-prefix">{displayTitle}</span>
                  ) : (
                    <>
                      <span className="title-prefix">{prefix}:</span>
                      <span className="title-suffix">{suffix}</span>
                    </>
                  )}
                </h2>
              </div>
            </a>
          );
        })}
      </section>

      <BlogStats language={language} stats={trainingStats} />

      {/* Tussenkop */}
      <h2 className="blog-stages-heading">{labels.stages}</h2>

      <div id="blog-content-section">
        {/* Jaartabs */}
        <div id="blog-timeline-section" className="blog-year-tabs">
          {YEARS.map((y) => (
            <button key={y} className={year === y ? 'active' : ''} onClick={() => { setYear(y); setVisibleCount(INITIAL_COUNT); }}>
              {y}
            </button>
          ))}
        </div>

        {/* Categorie-filters */}
        <div className="blog-category-bar grid grid-cols-2 gap-2 md:flex md:flex-row md:space-x-3 md:grid-cols-none" role="tablist" aria-label="Categorieën">
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                className={`blog-category-pill whitespace-normal md:whitespace-nowrap ${active ? 'active' : 'inactive'}`}
                onClick={() => { setCategory(cat); setVisibleCount(INITIAL_COUNT); }}
              >
                {labels.categories[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tijdlijn van updates & etappes */}
      <section className="blog-timeline blog-fade-in" key={`${year}-${category}`}>
        {topCards.length > 0 && (
          <div className="blog-top-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{topCards.map(renderItem)}</div>
        )}
        {listCards.length > 0 && (
          <div className="blog-mini-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{listCards.map(renderMiniCard)}</div>
        )}
        {hasMore && (
          <div className="blog-show-more-wrap mt-8 mb-8">
            <button className="read-more-btn blog-show-more" onClick={() => setVisibleCount((v) => v + LOAD_MORE)}>
              {labels.loadMore}
            </button>
          </div>
        )}
        {year === 2029 && stages.length > 0 && (
          <>
            <h3 className="blog-challenge-subheading">{labels.challenge}</h3>
            <div className="blog-mini-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{stages.map(renderMiniCard)}</div>
          </>
        )}
      </section>

      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate?.('donate')}>
          <img className="cta-stc" src="/images/sponsor/stc-embleem.png" alt="Save the Children" /> {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
