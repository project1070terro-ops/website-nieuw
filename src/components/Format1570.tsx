import { BrandText } from './BrandText';

export function Format1570({ text }: { text: string }) {
  const parts = text.split(/(15\/70)/);

  return (
    <>
      {parts.map((part, index) =>
        part === '15/70' ? (
          <span key={index} className="project-15-70">
            15<span className="orange-slash">/</span>70
          </span>
        ) : (
          <span key={index}><BrandText text={part} /></span>
        )
      )}
    </>
  );
}
