import type { Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';
import { Stats } from './Stats';
import { PageLinks } from './PageLinks';

interface StoryProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

export function Story({ t, navigate }: StoryProps) {
  return (
    <>
      <PageIntro title={t.storyTitle} lead={t.storyLead} />
      <Stats t={t} navigate={navigate} />
      <section className="story-grid">
        {t.storySections.map(([title, text], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <PageLinks navigate={navigate} pages={['route', 'terro']} labels={[t.nav.route, t.nav.terro]} />
    </>
  );
}
