import type { TranslationContent } from '../types';

interface HoldingProps {
  t: TranslationContent;
}

export function Holding({ t }: HoldingProps) {
  return (
    <section className="min-h-screen bg-[#111] flex items-center justify-center px-4 py-20">
      <img
        src="/images/hero/coming-soon-afbeelding.webp"
        alt="Project 15/70 — coming soon"
        className="w-full h-auto max-w-[85vw] md:max-w-2xl"
      />
    </section>
  );
}
