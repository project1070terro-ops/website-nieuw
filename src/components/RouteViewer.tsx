import { useEffect, useState } from 'react';
import type { Language, RouteDay, TranslationContent } from '../types';
import { loadRouteDays } from '../lib/sanityClient';
import { RouteDayInteractive } from './RouteDayInteractive';

export function RouteViewer({ t, language }: { t: TranslationContent; language: Language }) {
  const [days, setDays] = useState<RouteDay[] | null>(null);
  const [selected, setSelected] = useState(0);
  const r = t.routeViewer;

  useEffect(() => {
    let cancelled = false;
    setSelected(0);
    (async () => {
      try {
        const sanityDays = await loadRouteDays(language);
        if (sanityDays.length > 0) {
          if (!cancelled) setDays(sanityDays);
          return;
        }
      } catch (err) {
        console.error('Failed to load route days from Sanity:', err);
      }
      try {
        const res = await fetch('/route-days.json');
        const data: Record<Language, RouteDay[]> = await res.json();
        if (!cancelled) setDays(data[language]);
      } catch (err) {
        console.error('Failed to load route days:', err);
        if (!cancelled) setDays([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [language]);

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

      <RouteDayInteractive key={day.day} day={day} r={r} language={language} />
    </section>
  );
}
