import Link from 'next/link';
import { getPublishedPosts } from '@/lib/blog';
import { BlogCards } from '@/components/BlogCards';
export async function LatestArticles() {
  const posts = await getPublishedPosts(3).catch(error => { console.error("Blog unavailable:", error.message); return []; });
  if (!posts.length) return null;
  return <section className="latest-articles" aria-labelledby="latest-title"><div className="container-maison">
    <div className="blog-section-heading"><div><p className="kicker kicker-rule">The Yan Long Journal</p><h2 id="latest-title">More to <em>savour.</em></h2></div>
      <Link href="/blog" className="blog-read">Explore the blog <span aria-hidden="true">↗</span></Link></div>
    <BlogCards posts={posts} />
  </div></section>;
}
