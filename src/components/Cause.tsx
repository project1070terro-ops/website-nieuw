import { ArrowRight, CircleArrowOutUpRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { BrandText } from './BrandText';
import { PageIntro } from './PageIntro';
import { Stats } from './Stats';

const STC_URL = 'https://www.savethechildren.net/what-we-do/advocacy/save-children-europe';

interface CauseProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

export function Cause({ t, navigate }: CauseProps) {
  return (
    <>
      <PageIntro title={t.causeTitle} lead={t.causeLead} />
      <div className="cause-banner">
        <img
          src="/images/hero/stc-banner.webp"
          alt="Fietsende silhouetten en juichende kinderen bij zonsondergang in de Spaanse bergen"
        />
      </div>
      <article className="terro-sections no-reveal">
        {t.causeSections.map(([title, text]) => (
          <div className="terro-block" key={title}>
            <h2>{title}</h2>
            {text.trim().split(/\r?\n\s*\r?\n/).map((para, i) => (
              <p key={i}><BrandText text={para} /></p>
            ))}
          </div>
        ))}
      </article>
      <section className="cause-link-section">
        <a className="cause-link" href={STC_URL} target="_blank" rel="noreferrer">
          <img className="cta-stc" src="/images/sponsor/stc-embleem.png" alt="Save the Children" />
          {t.causeLinkLabel}
          <CircleArrowOutUpRight size={15} />
        </a>
      </section>
      <Stats t={t} navigate={navigate} />
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          <img className="cta-stc" src="/images/sponsor/stc-embleem.png" alt="Save the Children" /> {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
