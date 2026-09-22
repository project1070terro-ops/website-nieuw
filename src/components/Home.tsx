import { useEffect, useState } from 'react';
import { ArrowRight, ArrowDownRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { heroImages } from '../constants';
import { loadHeroSlider } from '../lib/sanityClient';
import { BrandText } from './BrandText';
import { Stats } from './Stats';
import { Sponsor } from './Sponsor';

interface HomeProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

export function Home({ t, navigate }: HomeProps) {
  const [sliderImages, setSliderImages] = useState(heroImages);
  const [activeSlide, setActiveSlide] = useState(0);
  const total = sliderImages.length;

  useEffect(() => {
    loadHeroSlider().then((images) => {
      if (images.length > 0) setSliderImages(images);
    });
  }, []);

  useEffect(() => {
    setActiveSlide(0);
  }, [sliderImages]);

  const nextSlide = () => setActiveSlide((s) => (s + 1) % total);
  const prevSlide = () => setActiveSlide((s) => (s - 1 + total) % total);

  return (
    <>
      <section className="hero flex items-center">
        <div className="hero-images">
          {sliderImages.map((image, index) => (
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
          <p className="eyebrow hero-eyebrow-split">
            <span className="eyebrow-date">{t.heroEyebrow[0]}</span>
            <span className="eyebrow-line2">{t.heroEyebrow[1]}</span>
          </p>
          <h1>
            <BrandText text="PROJECT" />
            <span className="hero-title-number">
              <BrandText text="15/70" />
            </span>
          </h1>
          <p className="hero-text">
            <BrandText text={t.heroText} />
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => navigate('donate')}>
              <img className="cta-stc" src="/images/sponsor/stc-embleem.png" alt="Save the Children" /> {t.support} <ArrowRight size={17} />
            </button>
            <button className="text-button" onClick={() => navigate('blog')}>
              {t.discover} <ArrowDownRight size={17} />
            </button>
          </div>
        </div>
        <div className="slide-dots">
          <button
            className="slide-arrow"
            aria-label="Vorige slide"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} />
          </button>
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={index === activeSlide ? 'slide-dot current' : 'slide-dot'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
          <button
            className="slide-arrow"
            aria-label="Volgende slide"
            onClick={nextSlide}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="intro">
        <div className="intro-inner">
          <p>
            <BrandText text={t.introOfficial} />
          </p>
        </div>
      </section>

      <Stats t={t} />
      <Sponsor t={t} />

      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          <img className="cta-stc" src="/images/sponsor/stc-embleem.png" alt="Save the Children" /> {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
