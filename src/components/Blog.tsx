import { ArrowRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';

interface BlogProps {
  t: TranslationContent;
  navigate?: (page: Page) => void;
}

export function Blog({ t, navigate }: BlogProps) {
  return (
    <>
      <PageIntro title={t.blogTitle} lead={t.blogLead} />
      <section className="blog-grid">
        {t.blogCards.map(([tag, title], index) => (
          <article key={title}>
            <span className="tag">{tag}</span>
            <div>
              <p>0{index + 1} / 2026</p>
              <h2>{title}</h2>
              <ArrowRight size={20} />
            </div>
          </article>
        ))}
      </section>
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate?.('donate')}>
          {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
