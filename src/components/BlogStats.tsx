import type { Language } from '../types';

interface BlogStatsProps {
  language: Language;
  stats: {
    strava_kilometers_ytd?: number;
    strava_elevation_ytd?: number;
    strength_training_hours?: number;
    intervals_ctl?: number;
    updated_at?: string | null;
  } | null | undefined;
  className?: string;
  title?: string;
}

const content: Record<Language, { title: string; km: string; elevation: string; strength: string; ctl: string }> = {
  nl: {
    title: 'Tellers & Grafieken',
    km: 'TRAININGSKILOMETERS',
    elevation: 'HOOGTEMETERS',
    strength: 'KRACHTTRAINING / HIIT',
    ctl: 'FITNESSSCORE (CTL)',
  },
  en: {
    title: 'Counters & Charts',
    km: 'TRAINING KILOMETERS',
    elevation: 'ELEVATION GAIN',
    strength: 'STRENGTH / HIIT',
    ctl: 'FITNESS SCORE (CTL)',
  },
  es: {
    title: 'Contadores y Gráficos',
    km: 'KILÓMETROS DE ENTRENAMIENTO',
    elevation: 'DESNIVEL',
    strength: 'ENTRENAMIENTO DE FUERZA / HIIT',
    ctl: 'NIVEL DE FORMA (CTL)',
  },
};

function fmt(value: number, lang: Language) {
  return value.toLocaleString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'nl-BE', {
    maximumFractionDigits: 0,
  });
}

export function BlogStats({ language, stats, className, title }: BlogStatsProps) {
  const kilometers = stats?.strava_kilometers_ytd ?? 0;
  const elevation = stats?.strava_elevation_ytd ?? 0;
  const strengthHours = stats?.strength_training_hours ?? 0;
  const ctl = stats?.intervals_ctl ?? 0;

  const t = content[language];

  return (
    <section className={`max-w-[1120px] mx-2 md:mx-auto p-5 bg-neutral-900 rounded-2xl ${className ?? '-mt-12 mb-6'}`}>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{title ?? t.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide whitespace-normal break-words mb-1 leading-tight">{t.km}</p>
          <p className="text-xl md:text-2xl font-bold text-[var(--orange)]">{fmt(kilometers, language)}</p>
        </div>
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide whitespace-normal break-words mb-1 leading-tight">{t.elevation}</p>
          <p className="text-xl md:text-2xl font-bold text-[var(--orange)]">{fmt(elevation, language)}</p>
        </div>
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide whitespace-normal break-words mb-1 leading-tight">{t.strength}</p>
          <p className="text-xl md:text-2xl font-bold text-[var(--orange)]">{strengthHours.toFixed(1)}</p>
        </div>
        <div className="px-2 md:px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--orange)] transition-colors">
          <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide whitespace-normal break-words mb-1 leading-tight">{t.ctl}</p>
          <p className="text-xl md:text-2xl font-bold text-[var(--orange)]">{ctl.toFixed(1)}</p>
        </div>
      </div>
    </section>
  );
}
