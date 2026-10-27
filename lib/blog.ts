import { cache } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export const BLOG_CATEGORY_ID = '1a2aa552-ac78-4563-a5b1-6a895e6eeb74';
export type BlogPost = {
  id: string; slug: string; title: string; excerpt: string; content: string;
  featured_image: string; featured_image_alt: string; meta_description: string; tags: string[];
};
// Timestamps are used only in database filters/order, never selected or sent to visitors.
const fields = 'id,slug,title,excerpt,content,featured_image,featured_image_alt,meta_description,tags';
export const getPublishedPosts = cache(async (limit?: number): Promise<BlogPost[]> => {
  // Local-only review fixtures never run in production, including production previews.
  if (process.env.NODE_ENV === 'development' && process.env.YANLONG_BLOG_PREVIEW === '1') {
    const fs = await import('node:fs/promises');
    const names = (await fs.readdir('content/blog')).filter(name => name.endsWith('.json'));
    const fixtures = await Promise.all(names.map(async name => { const post = JSON.parse(await fs.readFile(`content/blog/${name}`, 'utf8')); return { ...post, id: post.slug }; }));
    return limit ? fixtures.slice(0, limit) : fixtures;
  }
  const sb = getSupabaseClient();
  if (!sb) throw new Error('Article database is not configured');
  const posts: BlogPost[] = [];
  const cutoff = new Date().toISOString();
  for (let start = 0; ; start += 1000) {
    const { data, error } = await sb.from('blog_posts').select(fields)
      .eq('category_id', BLOG_CATEGORY_ID).eq('status', 'published')
      .lte('published_at', cutoff)
      .order('published_at', { ascending: false }).order('id', { ascending: false })
      .range(start, limit ? Math.min(start + 999, limit - 1) : start + 999);
    if (error) throw new Error('Unable to load articles', { cause: error });
    posts.push(...(data || []) as BlogPost[]);
    if (!data || data.length < 1000 || (limit && posts.length >= limit)) return posts;
  }
});
export const getPublishedPost = cache(async (slug: string) => (await getPublishedPosts()).find(post => post.slug === slug));
export function articleCategory(post: BlogPost) {
  return post.tags?.find(tag => tag !== 'site:yanlong') || 'Food & gatherings';
}
export function relatedPosts(post: BlogPost, posts: BlogPost[]) {
  return posts.filter(item => item.id !== post.id).sort((a, b) =>
    Number(articleCategory(b) === articleCategory(post)) - Number(articleCategory(a) === articleCategory(post))
  ).slice(0, 3);
}
