import { ArrowRight, ArrowDownRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { heroImages } from '../constants';
import { Stats } from './Stats';
import { Sponsor } from './Sponsor';

interface HomeProps {
  t: TranslationContent;
  activeSlide: number;
  navigate: (page: Page) => void;
}

export function Home({ t, activeSlide, navigate }: HomeProps) {
  return (
    <>
      <section className="hero">
        <div className="hero-images">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              className={index === activeSlide ? 'visible' : ''}
              alt="Costa Blanca cycling landscape"
            />
          ))}
        </div>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>
            PROJECT <i>10</i>
            <b>/</b>
            <i>70</i>
          </h1>
          <p className="hero-text">{t.heroText}</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => navigate('donate')}>
              {t.support} <ArrowRight size={17} />
            </button>
            <button className="text-button" onClick={() => navigate('story')}>
              {t.discover} <ArrowDownRight size={17} />
            </button>
          </div>
        </div>
        <div className="slide-dots">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={index === activeSlide ? 'current' : ''}
              aria-label={`Slide ${index + 1}`}
              onClick={() => {}}
            />
          ))}
        </div>
      </section>

      <section className="intro">
        <div className="intro-inner">
          <p>{t.introOfficial}</p>
        </div>
      </section>

      <Stats t={t} navigate={navigate} />
      <Sponsor t={t} />

      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
