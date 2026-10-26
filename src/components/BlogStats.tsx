import { useMemo } from 'react';
import type { Language } from '../types';

interface BlogStatsProps {
  language: Language;
  stats: {
    strava_kilometers_ytd?: number;
    intervals_ctl?: number;
    updated_at?: string | null;
  } | null | undefined;
  totalDonated: number;
  charityGoal: number;
}

const content: Record<
  Language,
  {
    title: string;
    km: string;
    ctl: string;
    challenge: string;
    challengeSub: string;
    goal: string;
    progress: string;
  }
> = {
  nl: {
    title: 'Tellers & Grafieken',
    km: 'TRAININGSKILOMETERS',
    ctl: 'FITNESSSCORE (CTL)',
    challenge: 'DE UITDAGING',
    challengeSub: '+17.500 Hoogtemeters in Albir',
    goal: 'VOORUITGANG DOEL',
    progress: 'Vooruitgang',
  },
  en: {
    title: 'Counters & Charts',
    km: 'TRAINING KILOMETERS',
    ctl: 'FITNESS SCORE (CTL)',
    challenge: 'THE CHALLENGE',
    challengeSub: '+17,500 Vertical Meters in Albir',
    goal: 'GOAL PROGRESS',
    progress: 'Progress',
  },
  es: {
    title: 'Contadores y Gráficos',
    km: 'KILÓMETROS DE ENTRENAMIENTO',
    ctl: 'NIVEL DE FORMA (CTL)',
    challenge: 'EL DESAFÍO',
    challengeSub: '+17.500 Metros Desnivel en Albir',
    goal: 'PROGRESO DEL OBJETIVO',
    progress: 'Progreso',
  },
};

function fmt(value: number, lang: Language) {
  return value.toLocaleString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'nl-BE', {
    maximumFractionDigits: 0,
  });
}

const CHALLENGE_ELEVATION = 17500;

export function BlogStats({ language, stats, totalDonated, charityGoal }: BlogStatsProps) {
  const kilometers = stats?.strava_kilometers_ytd ?? 0;
  const ctl = stats?.intervals_ctl ?? 0;

  const percentage = useMemo(() => {
    if (!charityGoal || charityGoal <= 0) return 0;
    const pct = (totalDonated / charityGoal) * 100;
    return Math.min(100, Math.max(0, pct));
  }, [totalDonated, charityGoal]);

  const t = content[language];

  return (
    <section className="max-w-[1120px] mx-2 md:mx-auto p-5 -mt-12 mb-6 bg-neutral-900 rounded-2xl">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{t.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide whitespace-normal break-words mb-1 leading-tight">{t.km}</p>
          <p className="text-xl md:text-2xl font-bold text-[var(--orange)]">{fmt(kilometers, language)}</p>
        </div>
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide whitespace-normal break-words mb-1 leading-tight">{t.ctl}</p>
          <p className="text-xl md:text-2xl font-bold text-[var(--orange)]">{ctl.toFixed(1)}</p>
        </div>
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide whitespace-normal break-words mb-1 leading-tight">{t.challenge}</p>
          <p className="text-xl md:text-2xl font-bold text-[var(--orange)]">{fmt(CHALLENGE_ELEVATION, language)}</p>
          <p className="text-[10px] text-white/50 mt-1 leading-tight">{t.challengeSub}</p>
        </div>
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide whitespace-normal break-words mb-1 leading-tight">{t.goal}</p>
          <p className="text-xl md:text-2xl font-bold text-[var(--orange)]">{fmt(totalDonated, language)}</p>
          <p className="text-[10px] text-white/50 mt-1 leading-tight">€ {fmt(totalDonated, language)} / € {fmt(charityGoal, language)}</p>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-white/80">
          <span className="text-[var(--orange)] font-medium">{t.progress}</span>
          <span className="font-bold text-[var(--orange)]">{percentage.toFixed(1)}%</span>
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
