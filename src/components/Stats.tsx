import { Medal, Mountain, Sparkles } from 'lucide-react';
import type { TranslationContent } from '../types';

const statIcons = [Medal, Mountain, Sparkles];

interface StatsProps {
  t: TranslationContent;
}

export function Stats({ t }: StatsProps) {
  return (
        <section className="stats" style={{ maxWidth: '1024px', margin: '0 auto', width: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
      {t.stats.map(([number, label], index) => {
        const Icon = statIcons[index];
        return (
          <div key={label} className="stat-card">
            <Icon size={26} className="stat-icon" />
            <strong>{number}</strong>
            <span>{label}</span>
          </div>
        );
      })}
    </section>
  );
}
