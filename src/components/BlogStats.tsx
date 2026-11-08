import { TrainingStats } from './TrainingStats';
import type { Language, TranslationContent } from '../types';

interface BlogStatsProps {
  t: TranslationContent;
  language: Language;
  className?: string;
}

const content: Record<Language, { title: string }> = {
  nl: { title: 'Tellers & Grafieken' },
  en: { title: 'Counters & Charts' },
  es: { title: 'Contadores y Gráficos' },
};

export function BlogStats({ t, language, className }: BlogStatsProps) {
  const { title } = content[language];

  return (
    <section className={`max-w-[1120px] mx-2 md:mx-auto p-5 bg-neutral-900 rounded-2xl ${className ?? '-mt-12 mb-6'}`}>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h2>
      <TrainingStats t={t} />
    </section>
  );
}
