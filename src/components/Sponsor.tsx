import { CircleArrowOutUpRight } from 'lucide-react';
import type { TranslationContent } from '../types';

interface SponsorProps {
  t: TranslationContent;
}

export function Sponsor({ t }: SponsorProps) {
  return (
    <section className="sponsor">
      <div className="sponsor-copy">
        <div className="sponsor-logo">
          <span>FORTUNA</span>
          <small>FINANCIAL GROUP</small>
        </div>
        <p>{t.sponsorText}</p>
        <a href="https://fortunafg.com" target="_blank" rel="noreferrer">
          {t.sponsorLink} <CircleArrowOutUpRight size={15} />
        </a>
      </div>
      <div className="sponsor-cards">
        {t.sponsorCards.map(([title, text], index) => (
          <article key={title} className="h-full">
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
