import { CalendarDays, Mountain, Sparkles } from 'lucide-react';
import type { Page, TranslationContent } from '../types';

const statIcons = [CalendarDays, Mountain, Sparkles];

interface StatsProps {
  t: TranslationContent;
  navigate: (page: Page) => void;
}

export function Stats({ t, navigate }: StatsProps) {
  return (
    <section className="stats">
      {t.stats.map(([number, label, link], index) => {
        const Icon = statIcons[index];
        return (
          <button key={label} className="stat-card" onClick={() => navigate(link as Page)}>
            <Icon size={26} className="stat-icon" />
            <strong>{number}</strong>
            <span>{label}</span>
          </button>
        );
      })}
    </section>
  );
}
