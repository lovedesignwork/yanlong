const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const crypto=require('node:crypto');
const manifest=require('../content/editorial/image-ownership.json');
const posts=manifest.articles.map(a=>require('../content/blog/'+a.slug+'.json'));
function load(file, overrides={}) {
 const module={exports:{}};
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 vm.runInNewContext(code,{module,exports:module.exports,process:{env:{NODE_ENV:'production'}},Date,require:n=>n in overrides?overrides[n]:require(n)});
 return module.exports;
}
const {prepareArticleContent}=load('lib/article-content.ts');
test('nine selected articles meet text, metadata and exclusive image requirements',()=>{
 assert.deepEqual(manifest.articles.map(a=>a.topic),[1,2,3,4,5,6,7,12,25]);
 const hashes=new Set(), outputs=new Set(), descriptions=new Set();
 for(const post of posts){
  const text=post.content.replace(/<figure\b[\s\S]*?<\/figure>/g,'').replace(/<[^>]+>/g,' ').trim();
  const words=text.split(/\s+/).length;
  assert(words>=800&&words<=1600,post.slug+' '+words);
  assert(!/<h1\b|<time\b|\d+\s+(?:min|minutes)\s+read/i.test(post.content));
  assert(!descriptions.has(post.meta_description)); descriptions.add(post.meta_description);
  assert(post.meta_description.length>=100&&post.meta_description.length<=170);
  const article=manifest.articles.find(a=>a.slug===post.slug);
  const srcs=[post.featured_image,...[...post.content.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(m=>m[1])];
  assert(srcs.length>=3&&srcs.length<=5);assert.equal(new Set(srcs).size,srcs.length);
  assert.deepEqual(srcs,article.images.map(i=>i.url));
  for(const image of article.images){
   assert(!hashes.has(image.sourceSha256),'Reused source: '+image.url);hashes.add(image.sourceSha256);
   assert(image.alt.length>12);assert(Math.max(image.width,image.height)<=1600);assert(image.bytes<=256000);
   const bytes=fs.readFileSync(image.localPath),hash=crypto.createHash('sha256').update(bytes).digest('hex');
   assert(!outputs.has(hash));outputs.add(hash);assert.equal(bytes.length,image.bytes);
   for(const v of image.variants)assert(fs.existsSync(v.localPath));
   if(image.generated)assert(image.caption.startsWith('AI-generated editorial illustration.'));
  }
  for(const [,href] of post.content.matchAll(/href="(\/[^"]+)"/g)){
   if(href.startsWith('/blog/'))assert(posts.some(p=>'/blog/'+p.slug===href),'Missing internal article: '+href);
   else assert(['/menu','/rooms','/reserve','/contact','/story','/blog','/'].includes(href),href);
  }
 }
 assert.equal(hashes.size,28);
});
test('CMS HTML is sanitized and every contents link resolves',()=>{
 const {html,intro,headings}=prepareArticleContent('<p>Intro<script>alert(1)</script></p><h2>First</h2><p onclick="bad()"><a href="javascript:bad()">Link</a></p><img src="https://example.test/photo.webp" onerror="bad()"><iframe src="https://evil.test"></iframe><h2>First</h2>');
 assert.equal(intro,'<p>Intro</p>');assert(!/onclick|onerror|javascript:|<script|<iframe/.test(html));
 assert.equal(headings.length,2);assert.notEqual(headings[0].id,headings[1].id);
 for(const heading of headings)assert(html.includes('id="'+heading.id+'"'));
});
function reader(rows){
 const queries=[];
 const db={from(){const q={filters:[]};queries.push(q);const chain={select(fields){q.fields=fields;return chain},eq(k,v){q.filters.push([k,v]);return chain},lte(k,v){q.cutoff=[k,v];return chain},order(k,{ascending}){(q.orders||=[]).push([k,ascending]);return chain},async range(a,b){let data=rows.filter(r=>q.filters.every(([k,v])=>r[k]===v)&&r[q.cutoff[0]]<=q.cutoff[1]);for(const [k,asc] of [...q.orders].reverse())data.sort((a,b)=>String(a[k]).localeCompare(String(b[k]))*(asc?1:-1));return {data:data.slice(a,b+1).map(r=>Object.fromEntries(q.fields.split(',').map(k=>[k,r[k]]))),error:null}}};return chain}};
 return {queries,...load('lib/blog.ts',{'react':{cache:f=>f},'@/lib/supabase':{getSupabaseClient:()=>db}})};
}
test('latest three, archive and detail exclude drafts, future posts and hotel articles without exposing dates',async()=>{
 const base={category_id:'1a2aa552-ac78-4563-a5b1-6a895e6eeb74',status:'published',published_at:'2026-01-01T00:00:00Z'};
 const rows=Array.from({length:5},(_,i)=>({...base,id:String(i),slug:'post-'+i,published_at:`2026-01-0${i+1}T00:00:00Z`}));
 rows.push({...base,id:'draft',slug:'draft',status:'draft'},{...base,id:'future',slug:'future',published_at:'2099-01-01T00:00:00Z'},{...base,id:'hotel',slug:'hotel',category_id:'other'});
 const api=reader(rows);const latest=await api.getPublishedPosts(3);
 assert.equal(latest.map(p=>p.slug).join(','),'post-4,post-3,post-2');assert.equal((await api.getPublishedPosts()).length,5);
 for(const slug of ['draft','future','hotel'])assert.equal(await api.getPublishedPost(slug),undefined);
 for(const post of latest)assert(!('published_at' in post));
});
