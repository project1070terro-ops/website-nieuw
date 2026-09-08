import { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';

interface BlogProps {
  t: TranslationContent;
  language: Language;
  navigate?: (page: Page) => void;
  goToBlog?: (slug: string) => void;
}

const overviewLabels: Record<Language, { stages: string; challenge: string; expected: string; more: string; less: string }> = {
  nl: { stages: 'De Weg naar het Najaar 2029', challenge: 'De Uitdaging: 10 Dagen Verslagen', expected: 'Verwacht', more: 'Toon meer', less: 'Toon minder' },
  en: { stages: 'The Road to Autumn 2029', challenge: 'The Challenge: 10 Days of Reports', expected: 'Expected', more: 'Show more', less: 'Show less' },
  es: { stages: 'El Camino hacia el Otoño 2029', challenge: 'El Desafío: Crónicas de 10 Días', expected: 'Previsto', more: 'Mostrar más', less: 'Mostrar menos' },
};

// Etappes herkennen we aan de categorie (DAG 1, DAY 2, DÍA 3, ...).
const isStage = (label: string) => /^(dag|day|d[ií]a)\s*\d+/i.test(label);

// De 3 vaste info-kaarten; alle overige posts vallen in de tijdlijn.
const INFO_SLUGS = new Set([
  '/blog/de-officiele-aftrap',
  '/blog/de-rekensom-hoogtemeters',
  '/blog/waarom-save-the-children',
]);

const YEARS = [2027, 2028, 2029];

function postYear(date: string) {
  const parts = date.split('/');
  return Number((parts[1] ?? parts[0]).trim());
}

function parseBlogDate(date: string) {
  const [month, year] = date.split('/').map((part) => part.trim());
  return new Date(Number(year), Number(month) - 1);
}

const PAGE_SIZE = 8;

export function Blog({ t, language, navigate, goToBlog }: BlogProps) {
  const [year, setYear] = useState(2027);
  const [showAll, setShowAll] = useState(false);
  const sortedCards = [...t.blogCards]
    .map((card, index) => ({ card, index }))
    .sort((a, b) => parseBlogDate(b.card.date).getTime() - parseBlogDate(a.card.date).getTime() || a.index - b.index)
    .map((item) => item.card);

  // Statische introductieblokken vs. tijdlijn-items (etappes, trainingen, updates)
  const infoCards = sortedCards.filter((c) => INFO_SLUGS.has(c.slug));
  const yearCards = sortedCards.filter((c) => !INFO_SLUGS.has(c.slug) && postYear(c.date) === year);
  // In 2029 splitsen we: reguliere updates boven, de 10 etappes onder een sub-kop.
  const updates = yearCards.filter((c) => !isStage(c.label));
  const stages = yearCards.filter((c) => isStage(c.label));
  const timelineCards = (year === 2029 ? updates : yearCards).slice(0, showAll ? undefined : PAGE_SIZE);
  const hasMore = (year === 2029 ? updates : yearCards).length > PAGE_SIZE;
  const labels = overviewLabels[language];

  const renderItem = ({ date, slug, label, title, image, status, expected }: (typeof yearCards)[number]) => {
    const [prefix, suffix] = title.split(':', 2);
    const titleNode = suffix === undefined ? (
      <span className="title-prefix">{title}</span>
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
            <div className="blog-list-meta">
              <span className="tag upcoming-tag">{label}</span>
              <span className="blog-expected">{expected ? `${labels.expected}: ${expected}` : date}</span>
              <Lock className="upcoming-lock" size={13} />
            </div>
            <h3>{titleNode}</h3>
          </div>
        </div>
      );
    }
    return (
      <a
        key={slug}
        href={slug}
        className="blog-card"
        onClick={(event) => {
          event.preventDefault();
          goToBlog?.(slug);
        }}
      >
        {image && <img className="blog-card-media" src={image} alt="" loading="lazy" />}
        <div className="blog-card-body">
          <div className="blog-list-meta">
            <span className="tag">{label}</span>
            <span className="blog-list-date">{date}</span>
          </div>
          <h3>{titleNode}</h3>
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
          const [prefix, suffix] = title.split(':', 2);
          return (
            <a
              key={slug}
              href={slug}
              className="blog-info-card"
              onClick={(event) => {
                event.preventDefault();
                goToBlog?.(slug);
              }}
            >
              {image && <img src={image} alt="" loading="lazy" />}
              <div className="blog-info-card-body">
                <span className="tag">{label}</span>
                <h2>
                  {suffix === undefined ? (
                    <span className="title-prefix">{title}</span>
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

      {/* Tussenkop */}
      <h2 className="blog-stages-heading">{labels.stages}</h2>

      {/* Jaartabs */}
      <div className="blog-year-tabs">
        {YEARS.map((y) => (
          <button key={y} className={year === y ? 'active' : ''} onClick={() => { setYear(y); setShowAll(false); }}>
            {y}
          </button>
        ))}
      </div>

      {/* Tijdlijn van updates & etappes */}
      <section className="blog-timeline">
        <div className="blog-card-grid">{timelineCards.map(renderItem)}</div>
        {hasMore && (
          <button className="read-more-btn blog-show-more" onClick={() => setShowAll((v) => !v)}>
            {showAll ? labels.less : labels.more}
          </button>
        )}
        {year === 2029 && stages.length > 0 && (
          <>
            <h3 className="blog-challenge-subheading">{labels.challenge}</h3>
            <div className="blog-card-grid">{stages.map(renderItem)}</div>
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
