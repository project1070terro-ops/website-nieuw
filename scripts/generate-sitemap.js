import { createClient } from '@sanity/client';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'of8587ti';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2024-02-23';
const token = process.env.VITE_SANITY_TOKEN;

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  ...(token ? { token } : {}),
});

const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))] | order(date desc) {
  "slug": slug.current,
  _updatedAt
}`;

const PAGES = ['', 'story', 'route', 'terro', 'blog', 'cause', 'donate', 'contact', 'sponsoring', 'privacy'];
const LANGUAGES = ['nl', 'en', 'es'];
const BASE_URL = 'https://project1570.org';

function toIsoDate(value) {
  if (!value) return new Date().toISOString().split('T')[0];
  try {
    return new Date(value).toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

async function fetchPosts() {
  try {
    const result = await sanityClient.fetch(POSTS_QUERY);
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('[sitemap] Failed to fetch posts:', error.message);
    return [];
  }
}

async function main() {
  const posts = await fetchPosts();
  const entries = [];

  for (const page of PAGES) {
    const path = page ? `/${page}` : '/';
    entries.push({ path, lastmod: toIsoDate() });
  }

  for (const post of posts) {
    if (!post.slug) continue;
    entries.push({ path: `/blog/${post.slug}`, lastmod: toIsoDate(post._updatedAt) });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    ({ path, lastmod }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    ${LANGUAGES.map(
      (lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${path}?lang=${lang}" />`
    ).join('\n    ')}
  </url>`
  )
  .join('\n')}
</urlset>`;

  const publicDir = join(__dirname, '..', 'public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }
  writeFileSync(join(publicDir, 'sitemap.xml'), xml);
  console.log(`[sitemap] Generated ${entries.length} URLs at public/sitemap.xml`);
}

main().catch((error) => {
  console.error('[sitemap] Error:', error);
  process.exitCode = 1;
});
