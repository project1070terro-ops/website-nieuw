import { Fragment } from 'react';
import { BrandText } from './BrandText';
import type { TranslationContent } from '../types';

interface HoldingProps {
  t: TranslationContent;
}

export function Holding({ t }: HoldingProps) {
  return (
    <section className="min-h-screen flex flex-col justify-between bg-[#111]">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-semibold uppercase tracking-wider text-white mb-6">
            <BrandText text="Project 15/70" />
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-white/80">
            {t.holding.split('\n').map((line, i, arr) => (
              <Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
      <div className="home-cta w-full" style={{ borderBottom: '1px solid rgba(192, 90, 40, .6) !important' }} aria-hidden="true" />
    </section>
  );
}
