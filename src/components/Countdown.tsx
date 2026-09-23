import { useEffect, useMemo, useState } from 'react';
import type { Language } from '../types';

const labels: Record<Language, [string, string, string, string]> = {
  nl: ['Dagen', 'Uren', 'Minuten', 'Seconden'],
  en: ['Days', 'Hours', 'Minutes', 'Seconds'],
  es: ['Días', 'Horas', 'Minutos', 'Segundos'],
};

interface CountdownProps {
  language: Language;
  targetDate: string;
}

export function Countdown({ language, targetDate }: CountdownProps) {
  const [now, setNow] = useState(new Date());
  const target = useMemo(() => new Date(targetDate), [targetDate]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const values = [days, hours, minutes, seconds].map((value, i) =>
    i === 0 ? String(value) : String(value).padStart(2, '0')
  );
  const t = labels[language];

  return (
    <section className="max-w-[720px] w-full mx-auto mt-2 mb-8">
      <div className="grid grid-cols-4 gap-1 md:gap-3">
        {t.map((label, i) => (
          <div
            key={label}
            className="px-0.5 md:px-2 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center"
          >
            <p className="!text-[8px] md:!text-xs text-white/60 uppercase tracking-wide !whitespace-nowrap mb-1">
              {label}
            </p>
            <p className="text-xl md:text-2xl font-medium leading-snug tracking-wide whitespace-nowrap" style={{ color: 'var(--orange)' }}>
              {values[i]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
