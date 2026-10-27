import ownership from '@/content/editorial/image-ownership.json';

export function imageDetails(src: string) {
  const path = src.replace('https://yanlongphuket.com', '');
  return ownership.articles.flatMap(post => post.images).find(image => image.url === path);
}
export function BlogImage({ src, alt, priority = false, card = false }: { src: string; alt: string; priority?: boolean; card?: boolean }) {
  const details = imageDetails(src);
  // CMS uploads are compressed by the shared admin uploader. Initial assets have prebuilt variants.
  return <img src={src} alt={alt} width={details?.width || 1600} height={details?.height || 1067}
    srcSet={details?.variants.map(v => `${v.url} ${v.width}w`).join(', ')}
    sizes={card ? '(max-width: 700px) calc(100vw - 40px), (max-width: 1050px) 45vw, 400px' : '(max-width: 1100px) calc(100vw - 40px), 1080px'}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}
