import { Fragment } from 'react';

interface BrandTextProps {
  text: string;
  className?: string;
}

export function BrandText({ text, className }: BrandTextProps) {
  if (!text) return null;
  const parts = text.split(/(\d+\/\d+)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const match = part.match(/^(\d+)\/(\d+)$/);
        if (match) {
          return (
            <Fragment key={i}>
              {match[1]}
              <span className="brand-slash">/</span>
              {match[2]}
            </Fragment>
          );
        }
        return (
          <Fragment key={i}>
            {part.split(/(Forza Fortuna Financial Group|Forza Fortuna|Fortuna Financial Group)/g).map((chunk, j) =>
              chunk.startsWith('Forza Fortuna') || chunk === 'Fortuna Financial Group' ? (
                <em key={j} className="team-brand">&ldquo;{chunk}&rdquo;</em>
              ) : (
                <Fragment key={j}>{chunk}</Fragment>
              )
            )}
          </Fragment>
        );
      })}
    </span>
  );
}
