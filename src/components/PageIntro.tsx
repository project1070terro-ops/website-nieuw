import type { TranslationContent } from '../types';

interface PageIntroProps {
  title: string;
  lead: string;
}

export function PageIntro({ title, lead }: PageIntroProps) {
  return (
    <section className="page-intro">
      <p className="eyebrow">
        PROJECT 10<span>/</span>70
      </p>
      <h1>{title}</h1>
      <p>{lead}</p>
    </section>
  );
}
