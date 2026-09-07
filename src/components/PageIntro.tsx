import { BrandText } from './BrandText';

import type { ReactNode } from 'react';

interface PageIntroProps {
  title: string;
  lead: string;
  className?: string;
  children?: ReactNode;
}

export function PageIntro({ title, lead, className, children }: PageIntroProps) {
  return (
    <section className={`page-intro ${className || ''}`}>
      <p className="eyebrow">
        <BrandText text="PROJECT 15/70" />
      </p>
      <h1>
        <BrandText text={title} />
      </h1>
      {children}
      <div className="space-y-4">
        {lead.trim().split(/\n\s*\n/).map((part, i) =>
          part ? (
            <p key={i}>
              <BrandText text={part} />
            </p>
          ) : null
        )}
      </div>
    </section>
  );
}
