import { ArrowRight } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';
import { RouteViewer } from './RouteViewer';

interface RoutePageProps {
  t: TranslationContent;
  language: Language;
  navigate?: (page: Page) => void;
}

export function RoutePage({ t, language, navigate }: RoutePageProps) {
  return (
    <>
      <PageIntro title={t.routeTitle} lead={t.routeLead} />
      <RouteViewer language={language} />
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate?.('donate')}>
          {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
