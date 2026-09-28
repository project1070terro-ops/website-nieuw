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
      <h1 style={{ fontSize: '36px', fontWeight: 500, letterSpacing: '0.03em', lineHeight: '1.3', color: '#ffffff', marginBottom: '16px' }}>
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
