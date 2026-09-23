import { useMemo } from 'react';
import type { Language, TrainingStats } from '../types';

interface BlogStatsProps {
  language: Language;
  stats: TrainingStats | null;
}

const content: Record<Language, { title: string; km: string; elevation: string; ctl: string; target: string; progress: string }> = {
  nl: {
    title: 'Tellers & Grafieken',
    km: 'Strava km YTD',
    elevation: 'Strava hoogtemeters YTD',
    ctl: 'Intervals.icu CTL',
    target: 'Doel Albir',
    progress: 'Vooruitgang',
  },
  en: {
    title: 'Counters & Charts',
    km: 'Strava km YTD',
    elevation: 'Strava elevation YTD',
    ctl: 'Intervals.icu CTL',
    target: 'Albir target',
    progress: 'Progress',
  },
  es: {
    title: 'Contadores y Gráficos',
    km: 'Strava km YTD',
    elevation: 'Strava desnivel YTD',
    ctl: 'Intervals.icu CTL',
    target: 'Objetivo Albir',
    progress: 'Progreso',
  },
};

function fmt(value: number, lang: Language) {
  return value.toLocaleString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'nl-BE', {
    maximumFractionDigits: 0,
  });
}

const TARGET = 17500;

export function BlogStats({ language, stats }: BlogStatsProps) {
  const data = stats ?? {
    stravaKilometersYTD: 0,
    stravaElevationYTD: 0,
    intervalsFitnessCTL: 0,
    targetAlbirElevation: 17500,
  };

  const percentage = useMemo(() => {
    const pct = (data.stravaElevationYTD / TARGET) * 100;
    return Math.min(100, Math.max(0, pct));
  }, [data]);

  const t = content[language];

  return (
    <section className="max-w-[1120px] mx-2 md:mx-auto p-5 -mt-12 mb-6 bg-neutral-900 rounded-2xl">
      <h2 className="text-xl md:text-2xl font-medium leading-snug tracking-wide text-white mb-3">{t.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[9px] md:text-xs text-white/60 uppercase tracking-wide whitespace-nowrap mb-1">{t.km}</p>
          <p className="text-xl md:text-2xl font-medium leading-snug tracking-wide text-[var(--orange)]">{fmt(data.stravaKilometersYTD, language)}</p>
        </div>
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[9px] md:text-xs text-white/60 uppercase tracking-wide whitespace-nowrap mb-1">{t.elevation}</p>
          <p className="text-xl md:text-2xl font-medium leading-snug tracking-wide text-[var(--orange)]">{fmt(data.stravaElevationYTD, language)}</p>
        </div>
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[9px] md:text-xs text-white/60 uppercase tracking-wide whitespace-nowrap mb-1">{t.ctl}</p>
          <p className="text-xl md:text-2xl font-medium leading-snug tracking-wide text-[var(--orange)]">{data.intervalsFitnessCTL.toFixed(1)}</p>
        </div>
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[9px] md:text-xs text-white/60 uppercase tracking-wide whitespace-nowrap mb-1">{t.target}</p>
          <p className="text-xl md:text-2xl font-medium leading-snug tracking-wide text-[var(--orange)]">{fmt(TARGET, language)}</p>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-white/80">
          <span className="text-[var(--orange)] font-medium">{t.progress}</span>
          <span className="font-medium leading-snug tracking-wide text-[var(--orange)]">{percentage.toFixed(1)}%</span>
        </div>
        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--orange)] rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}
