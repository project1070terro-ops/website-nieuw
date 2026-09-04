import type { TranslationContent } from '../types';

interface PageIntroProps {
  title: string;
  lead: string;
  className?: string;
}

export function PageIntro({ title, lead, className }: PageIntroProps) {
  return (
    <section className={`page-intro ${className || ''}`}>
      <p className="eyebrow">
        PROJECT 10<span>/</span>70
      </p>
      <h1>{title}</h1>
      {lead.trim().split(/\n\s*\n/).map((part, i) => (
        <p key={i}>{part}</p>
      ))}
    </section>
  );
}
