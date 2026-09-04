import { BrandText } from './BrandText';

interface PageIntroProps {
  title: string;
  lead: string;
  className?: string;
}

export function PageIntro({ title, lead, className }: PageIntroProps) {
  return (
    <section className={`page-intro ${className || ''}`}>
      <p className="eyebrow">
        <BrandText text="PROJECT 15/70" />
      </p>
      <h1>
        <BrandText text={title} />
      </h1>
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
