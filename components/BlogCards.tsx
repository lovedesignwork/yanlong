import Link from 'next/link';
import { articleCategory, type BlogPost } from '@/lib/blog';
import { BlogImage } from '@/components/BlogImage';

export function BlogCards({ posts }: { posts: BlogPost[] }) {
  return <div className="blog-grid">{posts.map(post => <article className="blog-card" key={post.id}>
    <Link href={`/blog/${post.slug}`} className="blog-card-image" tabIndex={-1} aria-hidden="true">
      <BlogImage src={post.featured_image} alt="" card />
    </Link>
    <p className="blog-category">{articleCategory(post)}</p>
    <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
    <p className="blog-excerpt">{post.excerpt}</p>
    <Link href={`/blog/${post.slug}`} className="blog-read" aria-label={`Read ${post.title}`}>Read the story <span aria-hidden="true">↗</span></Link>
  </article>)}</div>;
}
