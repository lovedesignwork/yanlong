import sanitizeHtml from 'sanitize-html';

export function prepareArticleContent(raw: string) {
  const headings: { id: string; title: string }[] = [];
  let html = sanitizeHtml(raw, {
    allowedTags: ['p','h2','h3','h4','ul','ol','li','strong','em','a','blockquote','figure','figcaption','img','table','thead','tbody','tr','th','td','br'],
    allowedAttributes: { a: ['href','title','target','rel'], img: ['src','srcset','sizes','width','height','alt','loading','decoding'], th: ['scope'], td: ['colspan'] },
    allowedSchemes: ['https','http','mailto','tel'],
    allowedSchemesByTag: { img: ['https'] },
    allowProtocolRelative: false,
    transformTags: {
      a: (_tag, attrs) => ({ tagName: 'a', attribs: { ...attrs, ...(attrs.target === '_blank' ? { rel: 'noopener noreferrer' } : {}) } }),
      img: (_tag, attrs) => ({ tagName: 'img', attribs: { ...attrs, loading: 'lazy', decoding: 'async' } }),
    },
  });
  const intro = html.match(/^\s*(<p>[\s\S]*?<\/p>)/)?.[1] || '';
  html = html.replace(intro, '');
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_match, label: string) => {
    const id = `section-${headings.length + 1}`;
    headings.push({ id, title: label.replace(/<[^>]+>/g, '') });
    return `<h2 id="${id}">${label}</h2>`;
  });
  html = html.replace(/<table>/g, '<div class="article-table" role="region" aria-label="Comparison table" tabindex="0"><table>').replace(/<\/table>/g,'</table></div>');
  return { intro, html, headings };
}
