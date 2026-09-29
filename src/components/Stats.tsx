import { Medal, Mountain, Sparkles } from 'lucide-react';
import type { TranslationContent } from '../types';

const statIcons = [Medal, Mountain, Sparkles];

interface StatsProps {
  t: TranslationContent;
}

export function Stats({ t }: StatsProps) {
  return (
    <section className="stats" style={{ width: '100%', maxWidth: 'none', display: 'block', margin: 0, padding: 0, background: '#0a0a0a' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.stats.map(([number, label], index) => {
          const Icon = statIcons[index];
          return (
            <div key={label} className="stat-card" style={{ padding: '1.5rem 1rem', height: 'auto', minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Icon size={24} className="stat-icon" style={{ marginBottom: '0.5rem' }} />
              <strong style={{ fontSize: '2rem', lineHeight: '1', marginBottom: '0.25rem' }}>{number}</strong>
              <span style={{ fontSize: '0.75rem', textAlign: 'center', lineHeight: '1.3' }}>{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
