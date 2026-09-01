import { ArrowRight } from 'lucide-react';
import type { TranslationContent } from '../types';
import { PageIntro } from './PageIntro';

interface BlogProps {
  t: TranslationContent;
}

export function Blog({ t }: BlogProps) {
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
    </>
  );
}
