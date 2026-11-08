import { Medal, Mountain, Sparkles } from 'lucide-react';
import type { TranslationContent } from '../types';

const statIcons = [Medal, Mountain, Sparkles];

interface StatsProps {
  t: TranslationContent;
}

export function Stats({ t }: StatsProps) {
  return (
    <section className="core-stats">
      <div className="core-stats-grid">
        {t.stats.map(([number, label], index) => {
          const Icon = statIcons[index];
          return (
            <div key={label} className="core-stat-card">
              <Icon size={22} className="core-stat-icon" />
              <strong className="core-stat-number">{number}</strong>
              <span className="core-stat-label">{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
