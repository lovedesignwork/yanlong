import type { Metadata } from 'next';
import { getPublishedPosts } from '@/lib/blog';
import { BlogCards } from '@/components/BlogCards';
import { JsonLd } from '@/components/JsonLd';
import { abs, breadcrumbSchema } from '@/lib/seo';
export const revalidate = 60;
export const metadata: Metadata = {
  title: { absolute: 'The Yan Long Journal | Food, Dining & Gatherings' },
  description: 'Stories from the table: explore Chinese dishes, dim sum lunches, private dining and celebrations at Yan Long in Phuket Old Town.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'The Yan Long Journal', description: 'Chinese food, thoughtful gatherings and a little inspiration for your next meal.', url: abs('/blog'), type: 'website', images: [{ url: abs('/images/blog/peking-duck-phuket/signature-peking-duck.webp'), width: 1106, height: 1082 }] },
  twitter: { card: 'summary_large_image', title: 'The Yan Long Journal', description: 'Chinese food and thoughtful gatherings in Phuket Old Town.', images: [abs('/images/blog/peking-duck-phuket/signature-peking-duck.webp')] },
};
export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <div className="blog-surface">
    <JsonLd data={breadcrumbSchema([{name:'Home',path:'/'},{name:'Blog',path:'/blog'}])} />
    <header className="blog-index-header container-maison"><p className="kicker kicker-rule">Food well told</p>
      <h1>The Yan Long <em>Journal.</em></h1><p>Good food starts a conversation. Discover the dishes, traditions and thoughtful details that bring people to the table.</p>
    </header>
    <section className="blog-archive container-maison" aria-label="All published articles"><BlogCards posts={posts} />{!posts.length && <p>Stories from our table are on their way.</p>}</section>
  </div>;
}
