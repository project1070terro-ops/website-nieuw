import { ArrowRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';

interface BlogProps {
  t: TranslationContent;
  navigate?: (page: Page) => void;
  goToBlog?: (slug: string) => void;
}

function parseBlogDate(date: string) {
  const [month, year] = date.split('/').map((part) => part.trim());
  return new Date(Number(year), Number(month) - 1);
}

export function Blog({ t, navigate, goToBlog }: BlogProps) {
  const sortedCards = [...t.blogCards]
    .map((card, index) => ({ card, index }))
    .sort((a, b) => parseBlogDate(b.card.date).getTime() - parseBlogDate(a.card.date).getTime() || a.index - b.index)
    .map((item) => item.card);

  return (
    <>
      <PageIntro title={t.blogTitle} lead={t.blogLead} />
      <section className="blog-list">
        {sortedCards.map(({ date, slug, label, title, image }) => {
          const [prefix, suffix] = title.split(':', 2);
          return (
            <a
              key={title}
              href={slug}
              className="blog-list-item"
              onClick={(event) => {
                event.preventDefault();
                goToBlog?.(slug);
              }}
            >
              <img className="blog-list-thumb" src={image} alt="" loading="lazy" />
              <div className="blog-list-body">
                <div className="blog-list-meta">
                  <span className="tag">{label}</span>
                  <span className="blog-list-date">{date}</span>
                </div>
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
              <ArrowRight className="blog-list-arrow" size={20} />
            </a>
          );
        })}
      </section>
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate?.('donate')}>
          <img className="cta-stc" src="/images/sponsor/stc-embleem.png" alt="Save the Children" /> {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
