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
      <section className="blog-grid">
        {sortedCards.map(({ date, slug, label, title }) => {
          const [prefix, suffix] = title.split(':', 2);
          return (
            <a
              key={title}
              href={slug}
              className="blog-card-link"
              onClick={(event) => {
                event.preventDefault();
                goToBlog?.(slug);
              }}
            >
              <article>
                <span className="tag">{label}</span>
                <div>
                  <p>{date}</p>
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
                  <ArrowRight size={20} />
                </div>
              </article>
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
