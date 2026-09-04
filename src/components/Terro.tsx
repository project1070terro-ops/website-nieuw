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
      <PageIntro title={t.terroTitle} lead="" className="terro-intro" />
      <div className="terro-image-wrapper w-full max-w-4xl mx-auto">
        <img
          src="/images/sponsor/WhatsApp_Image_2026-08-28_at_20.00.57.webp"
          alt="Terro"
          className="w-full h-[250px] md:h-[420px] object-cover object-[center_46%]"
        />
        <div className="absolute inset-0 bg-black/60 md:bg-black/75 pointer-events-none" />
        <div className="terro-image-vignette absolute inset-0 pointer-events-none" />
      </div>
      <section className="terro-sections relative z-10 -mt-12 pt-8">
        {t.terroSections.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            {text.trim().split(/\n\n+/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>
        ))}
      </section>
      <Stats t={t} navigate={navigate} />
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
