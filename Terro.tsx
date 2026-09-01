import { ArrowRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';
import { Stats } from './Stats';

interface TerroProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

export function Terro({ t, navigate }: TerroProps) {
  return (
    <>
      <PageIntro title={t.terroTitle} lead="" />
      <Stats t={t} navigate={navigate} />
      <section
        className="terro-banner"
        style={{ backgroundImage: `url('/images/sponsor/WhatsApp_Image_2026-08-28_at_20.00.57.webp')` }}
      >
        <h2>{t.terroTitle}</h2>
      </section>
      <section className="terro-sections">
        {t.terroSections.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
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
