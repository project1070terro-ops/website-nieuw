import { Fragment, useEffect, useState } from 'react';
import { ArrowRight, ArrowUp, Lock } from 'lucide-react';
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
  nl: { stages: 'De Weg naar het Najaar 2029', challenge: 'De Uitdaging: 10 Dagen Verslagen', expected: 'Verwacht', loadMore: 'Laad meer berichten', categories: { all: 'Alles', preview: '🗺️ Ritten-Preview', training: '🚴‍♂️ Training', material: '🔧 Materiaal', progress: '📈 Progressie', partner: '🤝 Sponsors' } },
  en: { stages: 'The Road to Autumn 2029', challenge: 'The Challenge: 10 Days of Reports', expected: 'Expected', loadMore: 'Load more posts', categories: { all: 'All', preview: '🗺️ Route Preview', training: '🚴‍♂️ Training', material: '🔧 Material', progress: '📈 Progress', partner: '🤝 Sponsors' } },
  es: { stages: 'El Camino hacia el Otoño 2029', challenge: 'El Desafío: Crónicas de 10 Días', expected: 'Previsto', loadMore: 'Cargar más entradas', categories: { all: 'Todo', preview: '🗺️ Vista previa de ruta', training: '🚴‍♂️ Entrenamiento', material: '🔧 Material', progress: '📈 Progreso', partner: '🤝 Patrocinadores' } },
};

const isStage = (slug: string) => /\/(dag|day|d[ií]a)[-\s]?\d+/i.test(slug);

const CATEGORIES = ['all', 'preview', 'training', 'material', 'progress', 'partner'];

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

  const infoCards = sortedCards.filter((c) => INFO_SLUGS.has(c.slug));
  const yearCards = sortedCards.filter((c) => !INFO_SLUGS.has(c.slug) && postYear(c.date) === year && (category === 'all' || c.category === category));
  const updates = yearCards.filter((c) => !isStage(c.slug));
  const stages = yearCards.filter((c) => isStage(c.slug));
  const timelineSource = year === 2029 ? updates : yearCards;
  const topCards = timelineSource.slice(0, 3);
  const listCards = timelineSource.slice(3, visibleCount);
  const hasMore = timelineSource.length > visibleCount;
  const labels = overviewLabels[language];
  const renderItem = (card: (typeof yearCards)[number], variant: 'default' | 'compact' | 'mini' = 'default') => {
    const { date, slug, label, title, inleiding, image, status, expected, category: cat } = card;
    if (!title || !title[language]) return null;
    const categoryLabel = labels.categories[cat || 'all'] || labels.categories.all;
    const mediaStyle = variant === 'compact' ? { aspectRatio: '16/7' } : variant === 'mini' ? { aspectRatio: '16/5' } : undefined;
    const bodyStyle = variant === 'compact' ? { padding: '18px 18px 24px' } : variant === 'mini' ? { padding: '14px 14px 18px' } : undefined;
    const titleSize = variant === 'mini' ? '14px' : '16px';
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
          {image && <img className="blog-card-media" src={image} alt="" loading="lazy" style={mediaStyle} />}
          <div className="blog-card-body" style={bodyStyle}>
            <div className="blog-list-meta w-full justify-between">
              <span className="tag upcoming-tag">{label[language]}</span>
              <div className="flex justify-between items-center w-full mb-3">
                <span className="text-xs text-zinc-400">{expected ? `${labels.expected}: ${expected}` : date}</span>
                <CategoryLabel label={categoryLabel} />
              </div>
              <Lock className="upcoming-lock" size={13} />
            </div>
            <h3 style={{ fontSize: titleSize, fontWeight: 500, letterSpacing: '0.03em', lineHeight: '1.4', color: '#f4f4f5' }}>{titleNode}</h3>
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
        {image && <img className="blog-card-media" src={image} alt="" loading="lazy" style={mediaStyle} />}
        <div className="blog-card-body" style={bodyStyle}>
          <div className="blog-list-meta w-full justify-between">
            <span className="tag">{label[language]}</span>
            <div className="flex justify-between items-center w-full mb-3">
              <span className="text-xs text-zinc-400">{date}</span>
              <CategoryLabel label={categoryLabel} />
            </div>
          </div>
          <h3 style={{ fontSize: titleSize, fontWeight: 500, letterSpacing: '0.03em', lineHeight: '1.4', color: '#f4f4f5' }}>{titleNode}</h3>
          {truncated ? (
            <div className="blog-card-excerpt">
              <p>{truncated}</p>
            </div>
          ) : null}
        </div>
      </a>
    );
  };

  return (
    <div className="blog-page max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-8">
      <PageIntro title={t.blogTitle} lead={t.blogLead} className="!pb-0" />
      
      <div className="info-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoCards.map((card) => {
          if (!card || !card.title?.[language]) return null;
          const excerptText = toPlainText(card.inleiding?.[language] || []);
          const truncated = excerptText ? truncateText(excerptText, 120) : '';
          return (
            <a
              key={card.slug}
              href={`/blog/${card.slug}`}
              className="blog-card featured-info-card"
              onClick={(e) => {
                e.preventDefault();
                goToBlog?.(card.slug);
              }}
            >
              {card.image && <img className="blog-card-media" src={card.image} alt="" loading="lazy" />}
              <div className="blog-card-body">
                <span className="tag mb-2 inline-block">{card.label[language]}</span>
                <h2 className="mt-2" style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '0.03em', lineHeight: '1.4', color: '#f4f4f5', marginBottom: '8px' }}>
                  {card.title[language]}
                </h2>
                {truncated && <p className="text-sm text-zinc-400 leading-relaxed">{truncated}</p>}
              </div>
            </a>
          );
        })}
      </div>

      <BlogStats language={language} stats={trainingStats} />

      <div className="timeline-section" id="timeline">
        <h2 className="section-title mb-8">{labels.stages}</h2>
        
        <div id="year-menu" className="year-selector mb-8 flex gap-4 border-b border-zinc-800 pb-4">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => { setYear(y); setVisibleCount(INITIAL_COUNT); }}
              className={`px-4 py-2 font-medium transition-all ${year === y ? 'text-orange-500 border-b-2 border-orange-500' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              {y}
            </button>
          ))}
        </div>

        <div className="category-filter mb-4 grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setVisibleCount(INITIAL_COUNT); }}
              className={`w-full h-auto px-2 py-1 text-[10px] sm:w-auto sm:px-3 sm:py-1.5 sm:text-xs rounded-full border transition-all whitespace-normal leading-tight ${category === cat ? 'bg-orange-500 text-white border-orange-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
            >
              {labels.categories[cat]}
            </button>
          ))}
        </div>

        {topCards.length > 0 && (
          <div className="featured-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {topCards.map((card) => renderItem(card, 'default'))}
          </div>
        )}

        {listCards.length > 0 && (
          <div className="blog-list-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {listCards.map((card, i) => (
              <Fragment key={card.slug}>
                {renderItem(card, i < 6 ? 'compact' : 'mini')}
                {(i + 1) % 6 === 0 && (
                  <button
                    key={`back-to-top-${i}`}
                    onClick={() => document.getElementById('year-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="col-span-1 md:col-span-3 mt-2 py-2 text-xs text-zinc-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
                  >
                    <ArrowUp size={14} /> {language === 'nl' ? 'Terug naar boven' : language === 'en' ? 'Back to top' : 'Volver arriba'}
                  </button>
                )}
              </Fragment>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + LOAD_MORE)}
              className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:bg-zinc-800 transition-all text-sm font-medium"
            >
              {labels.loadMore}
            </button>
          </div>
        )}

        {year === 2029 && stages.length > 0 && (
          <div className="stages-section mt-16 border-t border-zinc-800 pt-12">
            <h3 className="text-xl font-medium text-zinc-200 mb-8 flex items-center gap-2">
              <span>🏁</span> {labels.challenge}
            </h3>
            <div className="stages-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              {stages.map(renderItem)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
