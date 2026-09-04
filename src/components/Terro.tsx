import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';
import { Stats } from './Stats';

interface TerroProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

const sectionImages: Record<number, { src: string; alt: string }> = {
  0: { src: '/images/hero/Cumbre-del-Sol-Calpe-Costa-Blanca-3-1920x1080.webp', alt: 'Berglandschap Costa Blanca' },
  2: { src: '/images/hero/Cycling-calpe-and-costa-blanca-copyright-Sierras-Sports-Tours-3-1920x1080.webp', alt: 'Cyclist op Spaanse bergweg' },
};

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
      <article className="terro-sections relative z-10 -mt-12 pt-8">
        {t.terroSections.map(([title, text], index) => {
          const paragraphs = text.trim().split(/\n\n+/);
          const image = sectionImages[index];
          return (
            <Fragment key={title}>
              <div className="terro-block">
                <h2>{title}</h2>
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {image && (
                <img
                  className="terro-inline-img"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
              )}
            </Fragment>
          );
        })}
      </article>
      <Stats t={t} navigate={navigate} />
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
