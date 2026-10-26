import { useEffect } from 'react';
import type { BlogPost, Language, Page } from '../types';
import { getLocale, getSeo } from '../lib/seo';

interface SeoProps {
  language: Language;
  page: Page;
  blogSlug?: string | null;
  blogPosts?: BlogPost[];
}

function setMeta(property: string, content: string) {
  if (typeof document === 'undefined') return;
  let tag =
    document.querySelector(`meta[property="${property}"]`) ||
    document.querySelector(`meta[name="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    if (property.startsWith('og:') || property.startsWith('twitter:')) {
      tag.setAttribute('property', property);
    } else {
      tag.setAttribute('name', property);
    }
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function updateHreflang(currentLang: Language, path: string) {
  if (typeof document === 'undefined') return;

  document.querySelectorAll('link[data-seo="hreflang"], link[data-seo="canonical"]').forEach((el) => el.remove());

  const origin = 'https://project1570.org';
  const cleanPath = path === '/' ? '' : path;

  const addLink = (rel: string, href: string, hreflang?: string) => {
    const link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', href);
    link.setAttribute('data-seo', rel);
    if (hreflang) link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  };

  (['nl', 'en', 'es'] as Language[]).forEach((lang) => {
    const suffix = lang === currentLang ? '' : `?lang=${lang}`;
    addLink('alternate', `${origin}${cleanPath}${suffix}`, lang);
  });

  addLink('canonical', `${origin}${cleanPath}?lang=${currentLang}`);
}

export function Seo({ language, page, blogSlug, blogPosts }: SeoProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let customTitle: string | undefined;
    let customDescription: string | undefined;

    if (page === 'blog' && blogSlug && blogPosts) {
      const post = blogPosts.find((p) => p.slug === blogSlug);
      if (post) {
        customTitle = `${post.title[language] || post.title.nl} — Project 15/70`;
        if (post.inleiding?.[language]?.[0]?.children?.[0]?.text) {
          customDescription = post.inleiding[language][0].children[0].text.slice(0, 160);
        }
      }
    }

    const data = getSeo(language, page, customTitle, customDescription);

    document.title = data.title;
    document.documentElement.lang = language;

    setMeta('description', data.description);
    setMeta('og:title', data.title);
    setMeta('og:description', data.description);
    setMeta('og:image', data.ogImage ?? '');
    setMeta('og:url', `https://project1570.org${window.location.pathname}?lang=${language}`);
    setMeta('og:locale', getLocale(language));
    setMeta('og:type', 'website');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', data.title);
    setMeta('twitter:description', data.description);
    setMeta('twitter:image', data.ogImage ?? '');

    updateHreflang(language, window.location.pathname);
  }, [language, page, blogSlug, blogPosts]);

  return null;
}
