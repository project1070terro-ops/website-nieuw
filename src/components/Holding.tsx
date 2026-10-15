import type { TranslationContent } from '../types';

interface HoldingProps {
  t: TranslationContent;
}

export function Holding({ t }: HoldingProps) {
  return (
    <section className="home-cta min-h-[85vh] flex items-center justify-center text-center px-6">
      <div className="max-w-3xl">
        <p className="text-sm md:text-base leading-relaxed text-white/90">
          {t.holding}
        </p>
      </div>
    </section>
  );
}
