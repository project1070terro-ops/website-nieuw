import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';
import { Format1570 } from './Format1570';
import { stravaEmbeds } from '../blogContent';

interface BlogDetailProps {
  t: TranslationContent;
  slug: string;
  language: Language;
  navigate: (page: Page) => void;
  goToBlog: (slug: string) => void;
}

function parseBlogDate(date: string) {
  const [month, year] = date.split('/').map((part) => part.trim());
  return new Date(Number(year), Number(month) - 1);
}

const navLabels: Record<Language, { prev: string; next: string }> = {
  nl: { prev: 'Vorige', next: 'Volgende' },
  en: { prev: 'Previous', next: 'Next' },
  es: { prev: 'Anterior', next: 'Siguiente' },
};

export function BlogDetail({ t, slug, language, navigate, goToBlog }: BlogDetailProps) {
  const sortedCards = [...t.blogCards]
    .map((card, index) => ({ card, index }))
    .sort((a, b) => parseBlogDate(b.card.date).getTime() - parseBlogDate(a.card.date).getTime() || a.index - b.index)
    .map((item) => item.card);

  const postIndex = sortedCards.findIndex((card) => card.slug === slug);
  const post = sortedCards[postIndex];

  const embedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!post) navigate('blog');
  }, [post, navigate]);

  // <script>-tags die via innerHTML binnenkomen worden niet uitgevoerd;
  // ze opnieuw aanmaken zorgt dat externe embeds (bv. Strava) wel laden.
  useEffect(() => {
    const el = embedRef.current;
    if (!el) return;
    el.querySelectorAll('script').forEach((old) => {
      const script = document.createElement('script');
      Array.from(old.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value));
      old.replaceWith(script);
    });
  }, [post?.slug]);

  if (!post) return null;

  const prevPost = sortedCards[postIndex - 1];
  const nextPost = sortedCards[postIndex + 1];
  const labels = navLabels[language];
  const [prefix, suffix] = post.fullTitle.split(':', 2);

  return (
    <article className="blog-detail">

      <div className="blog-detail-content">
        <button className="blog-detail-back" onClick={() => navigate('blog')}>
          <ArrowLeft size={18} /> {t.nav.blog}
        </button>
        <p className="blog-detail-date">{post.date}</p>
        <h1 className="blog-detail-title">
          {suffix === undefined ? (
            <span className="title-prefix">
              <Format1570 text={post.fullTitle} />
            </span>
          ) : (
            <>
              <span className="title-prefix">
                <Format1570 text={`${prefix}:`} />
              </span>
              <span className="title-suffix">
                <Format1570 text={suffix} />
              </span>
            </>
          )}
        </h1>
        <div className="blog-detail-body">
          {post.body.split('\n\n').map((paragraph, index) => (
            <p key={index}>
              <Format1570 text={paragraph} />
            </p>
          ))}
        </div>
        {stravaEmbeds[post.slug] && (
          <div ref={embedRef} className="strava-embed" dangerouslySetInnerHTML={{ __html: stravaEmbeds[post.slug] }} />
        )}
        <nav className="blog-detail-nav" aria-label="Blog navigation">
          <div>
            {prevPost ? (
              <button className="blog-detail-nav-link prev" onClick={() => goToBlog(prevPost.slug)}>
                <span className="blog-detail-nav-label">{labels.prev}</span>
                <span className="blog-detail-nav-title">{prevPost.title}</span>
              </button>
            ) : (
              <span />
            )}
          </div>
          <div>
            {nextPost ? (
              <button className="blog-detail-nav-link next" onClick={() => goToBlog(nextPost.slug)}>
                <span className="blog-detail-nav-label">{labels.next}</span>
                <span className="blog-detail-nav-title">{nextPost.title}</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </div>
    </article>
  );
}
