import { useEffect, useMemo, useState } from 'react';
import { Bike, Mountain, Dumbbell, Activity } from 'lucide-react';
import { supabase } from '../supabaseClient';
import type { TranslationContent } from '../types';

const icons = [Bike, Mountain, Dumbbell, Activity];

interface TrainingStatsProps {
  t: TranslationContent;
}

interface TrainingData {
  km: number;
  elevation: number;
  strength: number;
  ctl: number;
  loaded: boolean;
}

function generateTrend(value: number): number[] {
  const points = 7;
  return Array.from({ length: points }, (_, i) => value * (i / (points - 1)) ** 1.25);
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(0.001, ...data);
  const min = 0;
  const width = 100;
  const height = 24;
  const step = data.length > 1 ? width / (data.length - 1) : width;

  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / (max - min)) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-8 mt-4" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        opacity="0.7"
      />
    </svg>
  );
}

function formatValue(value: number, unit: string): string {
  if (!Number.isFinite(value)) return '0';

  if (unit === 'CTL') {
    return value.toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  if (unit === 'h') {
    return value.toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  if (unit === 'km' || unit === 'M' || unit === 'HM') {
    return value.toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  return value.toLocaleString('nl-NL');
}

export function TrainingStats({ t }: TrainingStatsProps) {
  const [data, setData] = useState<TrainingData>({
    km: 0,
    elevation: 0,
    strength: 0,
    ctl: 0,
    loaded: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!supabase) {
        setData((d) => ({ ...d, loaded: true }));
        return;
      }

      const { data: rows, error } = await supabase
        .from('training_stats')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (cancelled) return;

      if (error || !rows || rows.length === 0) {
        setData((d) => ({ ...d, loaded: true }));
        return;
      }

      const row = rows[0] as Record<string, number | string>;
      setData({
        km: Number(row.strava_kilometers_ytd ?? 0),
        elevation: Number(row.strava_elevation_ytd ?? 0),
        strength: Number(row.strength_training_hours ?? 0),
        ctl: Number(row.intervals_ctl ?? 0),
        loaded: true,
      });
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const values = useMemo(() => [data.km, data.elevation, data.strength, data.ctl], [data]);

  return (
    <section className="training-stats">
      <div className="training-stats-grid">
        {t.trainingStats.map(({ label, unit }, index) => {
          const value = values[index] ?? 0;
          const formatted = formatValue(value, unit);
          const Icon = icons[index];

          return (
            <div key={label} className="training-stat-card">
              <div className="training-stat-glow" aria-hidden="true" />
              <Icon className="training-stat-icon" strokeWidth={1.5} size={24} />
              <div className="training-stat-value-wrap">
                <span className="training-stat-value">{formatted}</span>
                <span className="training-stat-unit">{unit}</span>
              </div>
              <div className="training-stat-label">{label}</div>
              <Sparkline data={generateTrend(value)} color="#f97316" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
