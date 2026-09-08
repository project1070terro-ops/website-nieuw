import type { Language } from '../types';

export interface BlogPost {
  date: string;
  slug: string;
  label: string;
  title: string;
  fullTitle: string;
  body: string;
  postBody?: string;
  image?: string;
  status?: 'published' | 'upcoming';
  expected?: string;
  stravaId?: string;
  stravaToken?: string;
}

// Laadt alle .md-bestanden in src/content/blog/{nl,en,es}/ als ruwe tekst.
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

function loadPosts(language: Language): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const [path, raw] of Object.entries(files)) {
    if (!path.includes(`/blog/${language}/`)) continue;
    const { data, content } = parseFrontmatter(raw);
    // `<!--verslag-->` scheidt het verslag (postBody) van de hoofdtekst.
    const [body, postBody] = content.split('<!--verslag-->').map((s) => s.trim());
    posts.push({
      date: data.date ?? '',
      slug: data.slug ?? '',
      label: data.category ?? data.label ?? '',
      title: data.title ?? '',
      fullTitle: data.fullTitle ?? data.title ?? '',
      image: data.image || undefined,
      status: (data.status as BlogPost['status']) || 'published',
      expected: data.expected || undefined,
      stravaId: data.stravaId || undefined,
      stravaToken: data.stravaToken || undefined,
      body,
      postBody: postBody || undefined,
    });
  }
  return posts;
}

export const blogPostsFromMarkdown: Record<Language, BlogPost[]> = {
  nl: loadPosts('nl'),
  en: loadPosts('en'),
  es: loadPosts('es'),
};
