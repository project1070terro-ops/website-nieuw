import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { BrandText } from './BrandText';
import { Stats } from './Stats';

interface TerroProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

const sectionImages: Record<number, { src: string; alt: string }> = {
  0: { src: '/images/hero/Cumbre-del-Sol-Calpe-Costa-Blanca-Forza-renner.webp', alt: 'Berglandschap Costa Blanca' },
  2: { src: '/images/hero/Cycling-calpe-and-costa-blanca-copyright-Sierras-Sports-Tours-3-1920x1080.webp', alt: 'Cyclist op Spaanse bergweg' },
};

export function Terro({ t, navigate }: TerroProps) {
  const [terroStart, terroEnd] = t.terroTitle.split('15/70');
  return (
    <div className="bg-black w-full overflow-x-hidden">
      <section className="page-intro story-intro">
        <p className="eyebrow">
          <BrandText text="PROJECT 15/70" />
        </p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4 mt-2 mb-8 md:whitespace-nowrap">
          {terroStart}<br className="md:hidden" />15<span className="text-[#c05a28]">/</span>70{terroEnd}
        </h2>
      </section>

      <section className="bg-black px-4 pb-8">
        <img
          src="/images/hero/project-terro.webp"
          alt="Terro"
          className="w-full max-w-4xl lg:max-w-5xl mx-auto block h-auto object-contain rounded-sm shadow-2xl"
        />
      </section>

      <article className="bg-black max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {t.terroSections.map(([title, text], index) => {
          const paragraphs = text.trim().split(/\r?\n\s*\r?\n/);
          const image = sectionImages[index];
          return (
            <Fragment key={title}>
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">{title}</h3>
                {paragraphs.map((para, i) => {
                  const lines = para.split('\n').filter(line => line.trim() !== '');
                  const isList = lines.length > 0 && lines.every(line => line.trim().startsWith('- '));
                  if (isList) {
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-2 mb-6">
                        {lines.map((line, li) => (
                          <li key={li} className="text-white/75 text-base leading-relaxed">
                            <BrandText text={line.trim().replace(/^- /, '')} />
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  const mobileBlocks = para.split('[MOBIELE WITREGEL]');
                  return (
                    <p key={i} className="text-white/75 text-base leading-relaxed mb-4">
                      {mobileBlocks.map((block, bi) => (
                        <Fragment key={bi}>
                          {bi > 0 && <span className="hidden md:inline">&nbsp;</span>}
                          <span className="block mb-4 last:mb-0 md:inline md:mb-0">
                            <BrandText text={block.trim()} />
                          </span>
                        </Fragment>
                      ))}
                    </p>
                  );
                })}
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

      <Stats t={t} />

      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          <img className="cta-stc" src="/images/sponsor/stc-embleem.png" alt="Save the Children" /> {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
