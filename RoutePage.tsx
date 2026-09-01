import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { TranslationContent } from '../types';
import { PageIntro } from './PageIntro';
import { Stats } from './Stats';

interface RoutePageProps {
  t: TranslationContent;
}

export function RoutePage({ t }: RoutePageProps) {
  const [openStage, setOpenStage] = useState<number | null>(null);

  return (
    <>
      <PageIntro title={t.routeTitle} lead={t.routeLead} />
      <Stats t={t} navigate={() => {}} />
      <section className="route-list">
        {t.stages.map((stage, index) => (
          <article key={stage} className={openStage === index ? 'stage open' : 'stage'}>
            <button onClick={() => setOpenStage(openStage === index ? null : index)}>
              <span>
                <b>0{index + 1}</b>
                {stage}
              </span>
              <ChevronDown size={20} />
            </button>
            {openStage === index && (
              <div className="stage-detail">
                {index === 0 ? (
                  <iframe 
                    src="https://ridewithgps.com" 
                    title="Ride with GPS map"
                    style={{ width: '1px', minWidth: '100%', height: '700px', border: 'none' }}
                    scrolling="no"
                  />
                ) : index === 1 ? (
                  <iframe 
                    src="https://komoot.com" 
                    title="Komoot map"
                    style={{ width: '100%', height: '700px' }}
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                  />
                ) : (
                  <p>{t.routePlaceholder}</p>
                )}
              </div>
            )}
          </article>
        ))}
      </section>
    </>
  );
}
