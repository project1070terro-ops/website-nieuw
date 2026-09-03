import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';
import { Stats } from './Stats';

interface RoutePageProps {
  t: TranslationContent;
  navigate?: (page: Page) => void;
}

// Map etappes to their iframes and descriptions
const etappeDetails: Record<number, { title: string; html: string; description: string }> = {
  0: {
    title: 'Coll de Rates Lus',
    html: '<iframe src="https://ridewithgps.com" style="width: 1px; min-width: 100%; height: 400px; border: none;" scrolling="no"></iframe>',
    description: 'Een klassieke lus rond Coll de Rates. Deze bergpas biedt spectaculaire uitzichten over de Costa Blanca en is een favoriete training-route van het team.',
  },
  1: {
    title: 'La Vall d\'Ebo-pas & Coll de Rates',
    html: '<iframe src="https://komoot.com" width="100%" height="400" frameborder="0" scrolling="no" allow="fullscreen" allowfullscreen></iframe>',
    description: 'Een uitdagende combinatie van twee bergpassen. La Vall d\'Ebo-pas stelt je voor moeizame klims terwijl Coll de Rates afwisseling biedt met geweldige technische passages.',
  },
  2: {
    title: 'Altea — Guadalest',
    html: '',
    description: 'Een mooie bergrit van kuststadjes naar bergdorpen. Deze etappe combineert vroege hoogtemeters met panoramische uitzichten over het Mediterraanse landschap.',
  },
  3: {
    title: 'Cumbre del Sol',
    html: '',
    description: 'De Piek van de Zon: één van de meest legendarische beklimmingen van de regio. Deze rit biedt intense hoogtemeters en een finale sprint naar de top met 360°-uitzichten.',
  },
  4: {
    title: 'Vall de Gallinera',
    html: '',
    description: 'Een schilderachtige vallei-rit met rustieke dorpen en groene landschappen. Ideaal voor recovery, maar toch vol karaktervolle passeerpaarden.',
  },
  5: {
    title: 'Bernia — Xaló',
    html: '',
    description: 'Een technisch uitdagende route door de Serra de Bernia. Steile wegen en hairpins eisen concentratie, maar de beloningen zijn ongekend.',
  },
  6: {
    title: 'Sierra de Aitana',
    html: '',
    description: 'De hoogste berg van de provincie Alicante. Deze epische dag brengt je naar 1.558m met oneindige panorama\'s en dunne berglucht.',
  },
  7: {
    title: 'Parcent — Tarbena',
    html: '',
    description: 'Een klassieke bergpas-combinatie met veel traditionele Spaanse charme. Kleine bergdorpen en steile wegen maken dit een ultieme ervaring.',
  },
  8: {
    title: 'De laatste klim',
    html: '',
    description: 'De voorlaatste dag loopt naar een hoogtepunt toe. Met veel verzamelde ervaring en teamgeest bereid je jezelf voor op de finishrit.',
  },
  9: {
    title: 'De finishrit',
    html: '',
    description: 'Het moment van waarheid. Na 10 dagen, +17.000 hoogtemeters en ontelbare herinneringen bereik je de finish. Feest en reflecting op een episch avontuur.',
  },
};

export function RoutePage({ t, navigate }: RoutePageProps) {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  const toggleStage = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  return (
    <>
      <PageIntro title={t.routeTitle} lead={t.routeLead} />
      {navigate && <Stats t={t} navigate={navigate} />}
      
      <section className="route-accordion">
        <div className="accordion-stages">
          {t.stages.map((stage, i) => (
            <div key={i} className={`accordion-item ${expandedStage === i ? 'expanded' : ''}`}>
              <button
                className={`accordion-header ${expandedStage === i ? 'active' : ''}`}
                onClick={() => toggleStage(i)}
              >
                <div className="stage-header-content">
                  <span className="stage-number">Dag {i + 1}</span>
                  <span className="stage-name">{stage}</span>
                </div>
                <ChevronDown size={20} className="chevron-icon" />
              </button>
              {expandedStage === i && (
                <div className="accordion-content">
                  <div className="accordion-map">
                    {etappeDetails[i]?.html ? (
                      <div
                        className="iframe-container"
                        dangerouslySetInnerHTML={{ __html: etappeDetails[i].html }}
                      />
                    ) : (
                      <p className="placeholder-text">{t.routePlaceholder}</p>
                    )}
                  </div>
                  <div className="accordion-info">
                    <h3>{etappeDetails[i]?.title}</h3>
                    <p>{etappeDetails[i]?.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate?.('donate')}>
          {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
