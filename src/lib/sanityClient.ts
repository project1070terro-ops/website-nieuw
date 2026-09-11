import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { BlogPhoto, BlogPost, Language } from '../types';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2024-02-23';
const useCdn = import.meta.env.VITE_SANITY_USE_CDN === 'true';

export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);

const POSTS_QUERY = `*[_type == "post" && status != "upcoming" && status != "draft"] | order(date desc) {
  _id,
  "slug": slug.current,
  date,
  category,
  status,
  expected,
  title,
  fullTitle,
  inleiding,
  excerpt,
  strava {
    image { ..., alt },
    url
  },
  body,
  heroImage,
  "photos": photos[] {
    ...,
    caption
  }
}`;

function toLocaleString(value: unknown): Record<Language, string> {
  if (value && typeof value === 'object') {
    const obj = value as Record<string, string>;
    return {
      nl: obj.nl ?? '',
      en: obj.en ?? '',
      es: obj.es ?? '',
    };
  }
  return { nl: '', en: '', es: '' };
}

function toLocaleBody(value: unknown): Record<Language, any[]> | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const obj = value as Record<string, any[]>;
  const body = {
    nl: Array.isArray(obj.nl) ? obj.nl : [],
    en: Array.isArray(obj.en) ? obj.en : [],
    es: Array.isArray(obj.es) ? obj.es : [],
  };
  return body.nl.length || body.en.length || body.es.length ? body : undefined;
}

function toBlogPhotos(items: any[] | undefined): BlogPhoto[] | undefined {
  if (!Array.isArray(items) || items.length === 0) return undefined;
  return items
    .map((photo) => {
      const captionObj = photo?.caption as Record<string, string> | undefined;
      const src = photo?.asset ? urlFor(photo).width(1600).url() : '';
      return {
        src,
        alt: photo?.alt ?? '',
        caption: {
          nl: captionObj?.nl ?? '',
          en: captionObj?.en ?? '',
          es: captionObj?.es ?? '',
        },
      };
    })
    .filter((p) => p.src);
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  const result = await sanityClient.fetch(POSTS_QUERY);
  const posts = (result as any[]) ?? [];

  return posts.map((post) => ({
    date: post.date ?? '',
    slug: post.slug ? `/blog/${post.slug}` : '',
    label: toLocaleString(post.category ?? ''),
    title: toLocaleString(post.title),
    fullTitle: toLocaleString(post.fullTitle),
    image: post.heroImage?.asset ? urlFor(post.heroImage).width(1200).url() : undefined,
    status: post.status === 'upcoming' ? 'upcoming' : 'published',
    expected: post.expected ?? undefined,
    inleiding: toLocaleBody(post.inleiding) ?? toLocaleBody(post.excerpt),
    strava: post.strava?.image?.asset
      ? {
          image: urlFor(post.strava.image).width(1600).url(),
          url: post.strava.url ?? undefined,
          alt: post.strava.image.alt ?? '',
        }
      : undefined,
    body: toLocaleBody(post.body) ?? { nl: [], en: [], es: [] },
    photos: toBlogPhotos(post.photos),
  }));
}
