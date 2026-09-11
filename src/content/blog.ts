import type { BlogPost, Language } from '../types';

const files = import.meta.glob('./blog/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

// Minimalistische frontmatter-parser: ondersteunt `key: value` regels
// (waarden mogen tussen enkele of dubbele aanhalingstekens staan).
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw.trim() };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].trim().replace(/^['"](.*)['"]$/, '$1');
  }
  return { data, content: match[2].trim() };
}

function toPortableText(content: string): any[] {
  if (!content) return [];
  const normalized = content.replace(/\r\n/g, '\n');
  return normalized
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => ({
      _type: 'block',
      _key: `b-${i}`,
      style: 'normal',
      children: [{ _type: 'span', _key: `s-${i}`, text: p.replace(/\s+/g, ' '), marks: [] }],
      markDefs: [],
    }));
}

function emptyLocaleString(): Record<Language, string> {
  return { nl: '', en: '', es: '' };
}

function emptyLocaleBody(): Record<Language, any[]> {
  return { nl: [], en: [], es: [] };
}

// De drie vaste informatie-kaarten bovenaan het blogoverzicht.
const INFO_SLUGS = new Set([
  '/blog/de-officiele-aftrap',
  '/blog/de-rekensom-hoogtemeters',
  '/blog/waarom-save-the-children',
]);

const postsBySlug = new Map<string, BlogPost>();

for (const [path, raw] of Object.entries(files)) {
  const langMatch = path.match(/\/blog\/(nl|en|es)\//);
  if (!langMatch) continue;
  const language = langMatch[1] as Language;
  const { data, content } = parseFrontmatter(raw);
  const slug = data.slug ?? '';
  if (!slug) continue;

  let post = postsBySlug.get(slug);
  if (!post) {
    post = {
      date: data.date ?? '',
      slug,
      label: emptyLocaleString(),
      title: emptyLocaleString(),
      fullTitle: emptyLocaleString(),
      image: data.image || undefined,
      status: (data.status as BlogPost['status']) || 'published',
      expected: data.expected || undefined,
      inleiding: emptyLocaleBody(),
      body: emptyLocaleBody(),
    };
    postsBySlug.set(slug, post);
  }

  post.label[language] = data.category ?? data.label ?? '';
  post.title[language] = data.title ?? '';
  post.fullTitle[language] = data.fullTitle ?? data.title ?? '';

  const [intro, report] = content.split('<!--verslag-->').map((s) => s.trim());
  if (report) {
    post.inleiding![language] = toPortableText(intro);
    post.body![language] = toPortableText(report);
  } else {
    post.body![language] = toPortableText(intro);
  }
}

export const markdownBlogPosts: BlogPost[] = [...postsBySlug.values()];
export const featuredMarkdownPosts: BlogPost[] = markdownBlogPosts.filter((p) => INFO_SLUGS.has(p.slug));
