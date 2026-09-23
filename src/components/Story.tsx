import { ArrowRight } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';
import { BrandText } from './BrandText';
import { Countdown } from './Countdown';
import { Stats } from './Stats';

interface StoryProps {
  t: TranslationContent;
  language: Language;
  navigate: (page: Page) => void;
}

export function Story({ t, language, navigate }: StoryProps) {
  const splitIndex = t.storyBlocks.findIndex(
    (b) =>
      b.type === 'paragraph' &&
      (b.text.includes('De teller loopt') ||
        b.text.includes('The timer is running') ||
        b.text.includes('El cronómetro corre'))
  );

  const preBlocks = splitIndex >= 0 ? t.storyBlocks.slice(0, splitIndex + 1) : t.storyBlocks;
  const postBlocks = splitIndex >= 0 ? t.storyBlocks.slice(splitIndex + 1) : [];

  const renderBlock = (block: (typeof t.storyBlocks)[number], index: number) =>
    block.type === 'subtitle' ? (
      <h3
        key={index}
        className="!mt-3 md:!mt-6 !mb-2 !w-full !max-w-[720px] !mx-auto !text-left !text-xl !font-medium !leading-snug !tracking-wide !text-white"
      >
        {block.text}
      </h3>
    ) : (
      <p
        key={index}
        className="!mb-6 !leading-relaxed !whitespace-normal"
        dangerouslySetInnerHTML={{ __html: block.text }}
      />
    );

  return (
    <div className="overflow-x-hidden max-w-full w-full">
      <section className="page-intro story-intro">
        <p className="eyebrow">
          <BrandText text="PROJECT 15/70" />
        </p>
        <h1>{t.storyTitle}</h1>
        <div className="story-banner">
          <img
            src="/images/hero/verhaal-banner.webp"
            alt="Groep fietsers klimt samen op een Spaanse bergweg bij zonsondergang"
          />
        </div>
        {preBlocks.map((block, i) => renderBlock(block, i))}
        <Countdown language={language} targetDate="2029-09-21T09:00:00" />
        {postBlocks.map((block, i) => renderBlock(block, splitIndex + 1 + i))}
      </section>

      <blockquote className="story-quote" dangerouslySetInnerHTML={{ __html: t.storyQuote }} />
      <section className="w-full bg-neutral-900 md:bg-neutral-950 py-6">
        <Stats t={t} />
      </section>
      <section className="story-grid">
        {t.storySections.map(([title, text], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <div className="story-content-wrapper">
              <div className="story-line"></div>
              <div className="story-text">
                <h2>{title}</h2>
                <p><BrandText text={text} /></p>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          <img className="cta-stc" src="/images/sponsor/stc-embleem.png" alt="Save the Children" /> {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
