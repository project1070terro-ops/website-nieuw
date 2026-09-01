import { ArrowRight } from 'lucide-react';
import type { Page, TranslationContent } from '../types';

interface PageLinksProps {
  navigate: (page: Page) => void;
  pages: Page[];
  labels: string[];
}

export function PageLinks({ navigate, pages, labels }: PageLinksProps) {
  return (
    <div className="page-links">
      {pages.map((page, index) => (
        <button key={page} onClick={() => navigate(page)}>
          {labels[index]} <ArrowRight size={17} />
        </button>
      ))}
    </div>
  );
}
