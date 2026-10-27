import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedPosts, getPublishedPost, articleCategory, relatedPosts } from '@/lib/blog';
import { prepareArticleContent } from '@/lib/article-content';
import { BlogImage, imageDetails } from '@/components/BlogImage';
import { BlogCards } from '@/components/BlogCards';
import { JsonLd } from '@/components/JsonLd';
import { abs, breadcrumbSchema, SITE_URL } from '@/lib/seo';
export const revalidate = 60;
type Props = { params: Promise<{slug: string}> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return { title: 'Article not found', robots: { index: false, follow: false } };
  const url = abs(`/blog/${post.slug}`);
  return {
    title: { absolute: post.title }, description: post.meta_description, alternates: { canonical: url },
    openGraph: { title: post.title, description: post.meta_description, type: 'article', url, images: [{ url: post.featured_image, alt: post.featured_image_alt }] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.meta_description, images: [post.featured_image] },
  };
}
export default async function ArticlePage({ params }: Props) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  const { intro, html, headings } = prepareArticleContent(post.content);
  const hero = imageDetails(post.featured_image);
  const related = relatedPosts(post, await getPublishedPosts());
  const url = abs(`/blog/${post.slug}`);
  return <div className="blog-surface">
    <JsonLd data={[
      breadcrumbSchema([{name:'Home',path:'/'},{name:'Blog',path:'/blog'},{name:post.title,path:`/blog/${post.slug}`}]),
      { '@context':'https://schema.org', '@type':'BlogPosting', '@id':`${url}#article`, url, headline:post.title,
        description:post.meta_description, image:[post.featured_image], inLanguage:'en', mainEntityOfPage:{'@type':'WebPage','@id':url},
        author:{'@type':'Organization',name:'Yan Long',url:SITE_URL}, publisher:{'@id':`${SITE_URL}/#restaurant`}, articleSection:articleCategory(post) },
    ]} />
    <article>
      <header className="article-header">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link></nav>
        <p className="blog-category">{articleCategory(post)}</p><h1>{post.title}</h1>
        <div className="article-intro" dangerouslySetInnerHTML={{__html:intro}} />
      </header>
      <figure className="article-featured"><BlogImage src={post.featured_image} alt={post.featured_image_alt} priority />
        {hero?.caption && <figcaption>{hero.caption}</figcaption>}
      </figure>
      <div className="article-reading">
        <details className="article-toc"><summary>In this article <span aria-hidden="true">+</span></summary>
          <ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol>
        </details>
        <div className="article-prose" dangerouslySetInnerHTML={{__html:html}} />
        <aside className="article-booking"><p className="kicker">Bring your appetite</p><h2>A place at our table.</h2><p>Plan your next meal with Yan Long in Phuket Old Town.</p><Link href="/reserve" className="btn btn-p">Request a table</Link></aside>
      </div>
    </article>
    {related.length > 0 && <section className="blog-related container-maison" aria-labelledby="related-title"><div className="blog-section-heading"><h2 id="related-title">Keep <em>exploring.</em></h2><Link className="blog-read" href="/blog">All stories ↗</Link></div><BlogCards posts={related} /></section>}
  </div>;
}
