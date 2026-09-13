import { useEffect, useState } from 'react';
import type { Language, RouteDay, TranslationContent } from '../types';
import { loadRouteDays } from '../lib/sanityClient';
import { RouteDayInteractive } from './RouteDayInteractive';

export function RouteViewer({ t, language }: { t: TranslationContent; language: Language }) {
  const [days, setDays] = useState<RouteDay[] | null>(null);
  const [selected, setSelected] = useState(3); // start op Dag 4
  const r = t.routeViewer;

  useEffect(() => {
    let cancelled = false;
    setDays(null);
    (async () => {
      try {
        const sanityDays = await loadRouteDays(language);
        const allDays: RouteDay[] = [];
        for (let dayNumber = 1; dayNumber <= 10; dayNumber++) {
          const doc = sanityDays.find((d) => d.day === dayNumber);
          allDays.push(
            doc ?? {
              day: dayNumber,
              title: t.stages[dayNumber - 1] ?? `Dag ${dayNumber}`,
              gpx: '',
            }
          );
        }
        if (!cancelled) setDays(allDays);
      } catch (err) {
        console.error('Failed to load route days from Sanity:', err);
        if (!cancelled) setDays([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [language, t.stages]);

  if (!days) return <p className="route-loading">{r.loadingRoute}</p>;
  if (days.length === 0) return <p className="route-loading">{r.noRouteData}</p>;

  const day = days[selected];

  return (
    <section className="route-viewer">
      <div className="route-tabs" role="tablist" aria-label={r.daysAria}>
        {days.map((d, i) => (
          <button
            key={d.day}
            role="tab"
            aria-selected={i === selected}
            className={`route-tab ${i === selected ? 'active' : ''}`}
            onClick={() => setSelected(i)}
          >
            {r.day} {d.day}
          </button>
        ))}
      </div>

      <RouteDayInteractive
        key={day.day}
        day={day}
        r={r}
        language={language}
        placeholder={t.routePlaceholder}
      />
    </section>
  );
}
