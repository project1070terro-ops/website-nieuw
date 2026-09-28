import { Medal, Mountain, Sparkles } from 'lucide-react';
import type { TranslationContent } from '../types';

const statIcons = [Medal, Mountain, Sparkles];

interface StatsProps {
  t: TranslationContent;
}

export function Stats({ t }: StatsProps) {
  return (
    <section className="stats" style={{ maxWidth: '768px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.5rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
      {t.stats.map(([number, label], index) => {
        const Icon = statIcons[index];
        return (
          <div key={label} className="stat-card" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', height: 'auto', minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Icon size={24} className="stat-icon" style={{ marginBottom: '0.5rem' }} />
            <strong style={{ fontSize: '2rem', lineHeight: '1', marginBottom: '0.25rem' }}>{number}</strong>
            <span style={{ fontSize: '0.75rem', textAlign: 'center', lineHeight: '1.3' }}>{label}</span>
          </div>
        );
      })}
    </section>
  );
}
