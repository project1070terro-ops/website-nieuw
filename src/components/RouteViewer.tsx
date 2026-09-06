import { useEffect, useState } from 'react';
import type { Language, TranslationContent } from '../types';
import { RouteDayInteractive } from './RouteDayInteractive';

export interface RouteDay {
  day: number;
  gpx: string;
  images: string[];
  title: string;
  text: string;
}

export function RouteViewer({ t, language }: { t: TranslationContent; language: Language }) {
  const [days, setDays] = useState<RouteDay[] | null>(null);
  const [selected, setSelected] = useState(0);
  const r = t.routeViewer;

  useEffect(() => {
    fetch('/route-days.json')
      .then((res) => res.json())
      .then((data: Record<Language, RouteDay[]>) => {
        setDays(data[language]);
      })
      .catch((err) => {
        console.error('Failed to load route days:', err);
        setDays([]);
      });
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

      <RouteDayInteractive key={day.day} day={day} r={r} />
    </section>
  );
}
