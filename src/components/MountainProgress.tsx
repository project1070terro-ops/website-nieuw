import React, { useEffect, useState } from 'react';
import type { Language } from '../types';

interface MountainProgressProps {
  percentage: number;
  language?: Language;
}

export const MountainProgress: React.FC<MountainProgressProps> = ({ percentage, language = 'nl' }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(Math.min(Math.max(percentage, 0), 100));
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  const svgWidth = 500;
  const pathLength = 550;
  const targetMeters = 17500;
  const currentMeters = Math.round((animatedPercentage / 100) * targetMeters);

  const getCoordinates = (pct: number) => {
    const x = (pct / 100) * svgWidth;
    const baseLine = 130;
    const steadyAscent = (x / svgWidth) * 90;
    const mountainWaves = Math.sin((x / svgWidth) * Math.PI * 3) * 15;
    const y = baseLine - (steadyAscent + mountainWaves + 15);
    return { x, y };
  };

  const bikerPos = getCoordinates(animatedPercentage);
  const strokeDashoffset = pathLength - (pathLength * animatedPercentage) / 100;

  const nlCurrent = currentMeters.toLocaleString('nl-NL');
  const nlTarget = targetMeters.toLocaleString('nl-NL');
  const enCurrent = currentMeters.toLocaleString('en-US');
  const enTarget = targetMeters.toLocaleString('en-US');
  const esCurrent = currentMeters.toLocaleString('es-ES');
  const esTarget = targetMeters.toLocaleString('es-ES');

  const content = {
    nl: {
      meters: <>Intussen <span className="text-orange-500">{nlCurrent}</span> van de <span className="text-orange-500">+{nlTarget}</span> hoogtemeters gedoneerd!</>,
      subtitle: 'Samen richting de piek',
      start: 'Start (Albir)',
      top: 'De Top 🏔️',
    },
    en: {
      meters: <>Currently <span className="text-orange-500">{enCurrent}</span> of <span className="text-orange-500">+{enTarget}</span> elevation meters donated!</>,
      subtitle: 'Together to the peak',
      start: 'Start (Albir)',
      top: 'The Summit 🏔️',
    },
    es: {
      meters: <>¡Ya <span className="text-orange-500">{esCurrent}</span> de los <span className="text-orange-500">+{esTarget}</span> metros de altitud donados!</>,
      subtitle: 'Juntos hacia la cima',
      start: 'Inicio (Albir)',
      top: 'La Cima 🏔️',
    },
  };

  const c = content[language] ?? content.nl;

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-6 bg-[#0c0c0c] border border-neutral-800 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-end mb-4 px-2 gap-4 flex-wrap">
        <div>
          <p className="text-sm font-semibold text-white mt-0.5">
            {c.meters}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-orange-500 font-bold">Save the Children</p>
          <p className="text-xs text-neutral-400 mt-0.5">{c.subtitle}</p>
        </div>
      </div>

      <div className="relative w-full overflow-visible h-44 bg-[#111111]/40 rounded-xl border border-neutral-900/60 p-2">
        <svg viewBox={`0 0 ${svgWidth} 150`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <line x1="0" y1="130" x2={svgWidth} y2="130" stroke="#262626" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 0 115 Q 100 85 180 80 T 350 45 T 500 25" fill="none" stroke="#262626" strokeWidth="4" strokeLinecap="round" />
          <path id="climbed-path" d="M 0 115 Q 100 85 180 80 T 350 45 T 500 25" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeDasharray={pathLength} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" style={{ filter: 'drop-shadow(0px 0px 6px rgba(249, 115, 22, 0.6))' }} />
          <g transform={`translate(${bikerPos.x - 8}, ${bikerPos.y - 22})`} className="transition-all duration-1000 ease-out">
            <circle cx="8" cy="18" r="5" fill="#f97316" className="animate-ping opacity-40" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="5.5" cy="17.5" r="2.5" fill="#f97316" stroke="#f97316" />
              <circle cx="18.5" cy="17.5" r="2.5" />
              <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 5.5L9 12H5M15 6l-3 5.5-2-3.5M12 11.5L16.5 13H20" />
            </svg>
          </g>
        </svg>
        <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold tracking-wider text-neutral-600">{c.start}</span>
        <span className="absolute bottom-2 right-3 text-[10px] uppercase font-bold tracking-wider text-neutral-600">{c.top}</span>
      </div>
    </div>
  );
};
