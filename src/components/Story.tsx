import { ArrowRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';
import { Stats } from './Stats';

interface StoryProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

export function Story({ t, navigate }: StoryProps) {
  return (
    <>
      <PageIntro title={t.storyTitle} lead={`${t.storyLead}\n\n${t.storyOutro}`} className="story-intro" />
      <blockquote className="story-quote" dangerouslySetInnerHTML={{ __html: t.storyQuote }} />
      <Stats t={t} navigate={navigate} />
      <section className="story-grid">
        {t.storySections.map(([title, text], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <div className="story-content-wrapper">
              <div className="story-line"></div>
              <div className="story-text">
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
