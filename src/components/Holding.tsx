import type { TranslationContent } from '../types';

interface HoldingProps {
  t: TranslationContent;
}

export function Holding({ t }: HoldingProps) {
  return (
    <section
      className="min-h-[85vh] flex items-center justify-center text-center px-6 relative"
      style={{
        backgroundColor: 'var(--anthracite)',
        backgroundImage: "url('/images/hero/coming-soon-afbeelding.webp')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderBottom: '1px solid rgba(192, 90, 40, 0.6)',
      }}
    >
      <div className="max-w-3xl relative z-10 bg-black/40 p-6 rounded-lg">
        <p className="text-sm md:text-base leading-relaxed text-white/95 drop-shadow">
          {t.holding}
        </p>
      </div>
    </section>
  );
}
