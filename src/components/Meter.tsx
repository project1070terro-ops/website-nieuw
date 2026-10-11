import type { TranslationContent } from '../types';

interface MeterProps {
  totalDonated: number;
  t: TranslationContent;
}

export function Meter({ totalDonated, t }: MeterProps) {
  const verticalMeters = Math.round(totalDonated);
  const progress = Math.min((verticalMeters / 17500) * 100, 100);
  const goalReached = verticalMeters >= 17500;

  return (
    <section className="meter-section" style={{ paddingBottom: '1rem' }}>
      <div className="meter-head">
        <div className="meter-head-left">
          <img
            className="stc-badge"
            src="/images/sponsor/stc-embleem.png"
            alt="Save the Children"
          />
          <h2>
            {t.donated} <strong>{verticalMeters.toLocaleString('nl-BE')}</strong> {t.sponsored}
          </h2>
        </div>
        <span className={goalReached ? 'goal-reached' : ''}>
          {goalReached
            ? `${t.goalReached} +${(verticalMeters - 17500).toLocaleString('nl-BE')} HM`
            : t.goal}
        </span>
      </div>
      <div className={`meter${goalReached ? ' meter-complete' : ''}`}>
        <div style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}
