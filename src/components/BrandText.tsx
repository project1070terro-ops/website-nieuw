import { Fragment } from 'react';

function BrandName({ chunk }: { chunk: string }) {
  const isFull = chunk === 'Forza Fortuna Financial Group';
  const isForza = chunk.startsWith('Forza Fortuna');
  if (isFull) {
    return (
      <span className="team-brand" style={{ fontWeight: 400 }}>
        &ldquo;<span className="brand-name">FORZA FORTUNA</span>{' '}
        <em className="brand-italics" style={{ fontWeight: 400 }}>Financial Group</em>&rdquo;
      </span>
    );
  }
  if (isForza) {
    return (
      <span className="team-brand" style={{ fontWeight: 400 }}>
        &ldquo;<span className="brand-name">FORZA FORTUNA</span>&rdquo;
      </span>
    );
  }
  return (
    <span className="team-brand" style={{ fontWeight: 400 }}>
      &ldquo;Fortuna{' '}
      <em className="brand-italics" style={{ fontWeight: 400 }}>Financial Group</em>&rdquo;
    </span>
  );
}

interface BrandTextProps {
  text: string;
  className?: string;
}

export function BrandText({ text, className }: BrandTextProps) {
  if (!text) return null;
  const parts = text.split(/(15\/70)/g);
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
                <BrandName key={j} chunk={chunk} />
              ) : (
                <Fragment key={j}>
                  {chunk.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((sub, k) => {
                    const bold = sub.match(/^\*\*(.*)\*\*$/);
                    if (bold) return <strong key={k}>{bold[1]}</strong>;
                    const italic = sub.match(/^\*(.*)\*$/);
                    if (italic) return <em key={k}>{italic[1]}</em>;
                    return <Fragment key={k}>{sub}</Fragment>;
                  })}
                </Fragment>
              )
            )}
          </Fragment>
        );
      })}
    </span>
  );
}
