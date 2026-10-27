// Content publishing uses Supabase. Run with the existing CMS environment loaded.
// prepare uploads optimized assets and stores drafts; publish changes only this batch's status.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
const mode = process.argv[2];
if (!['prepare','publish','verify'].includes(mode)) throw new Error('Use prepare, publish or verify');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (url !== 'https://crhzxvbubvyachauomlx.supabase.co') throw new Error('Wrong CMS project');
const db = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY, {auth:{persistSession:false}});
const category = '1a2aa552-ac78-4563-a5b1-6a895e6eeb74';
const records = readdirSync('content/blog').filter(p=>p.endsWith('.json')).map(p=>JSON.parse(readFileSync(`content/blog/${p}`,'utf8')));
const manifestPath='content/editorial/image-ownership.json';
const manifest=JSON.parse(readFileSync(manifestPath,'utf8'));
if(mode==='prepare') {
  const replacements=new Map();
  for(const article of manifest.articles) for(const image of article.images) {
    for(const variant of image.variants) {
      const local=variant.localPath || `public${variant.url}`;
      const key=`yanlong/${article.slug}/${local.split('/').at(-1)}`;
      const {error}=await db.storage.from('blog-images').upload(key,readFileSync(local),{contentType:'image/webp',cacheControl:'31536000',upsert:true});
      if(error) throw error;
      const publicUrl=db.storage.from('blog-images').getPublicUrl(key).data.publicUrl;
      replacements.set(variant.url,publicUrl);
      variant.localPath=local; variant.url=publicUrl;
    }
    image.localPath=image.localPath || `public${image.url}`;
    image.url=image.variants.at(-1).url;
  }
  for(const record of records) {
    // Longest paths first so replacing a base does not damage a responsive filename.
    for(const [before,after] of [...replacements].sort((a,b)=>b[0].length-a[0].length)) {
      record.content=record.content.replaceAll(before,after);
      record.featured_image=record.featured_image.replace(`https://yanlongphuket.com${before}`,after);
    }
    const {data:existing,error:lookupError}=await db.from('blog_posts').select('id,status,category_id').eq('slug',record.slug).maybeSingle();
    if(lookupError) throw lookupError;
    if(existing && (existing.category_id!==category || existing.status==='published')) throw new Error(`Refusing to overwrite existing published/unrelated post: ${record.slug}`);
    const row={...record,author:'Yan Long',published_at:null};
    const {error}=existing ? await db.from('blog_posts').update(row).eq('id',existing.id) : await db.from('blog_posts').insert(row);
    if(error) throw error;
    writeFileSync(`content/blog/${record.slug}.json`,JSON.stringify(record,null,2));
    writeFileSync(`content/blog/${record.slug}.html`,record.content);
    console.log('Draft prepared:',record.slug);
  }
  writeFileSync(manifestPath,JSON.stringify(manifest,null,2));
}
if(mode==='publish') {
  // Exact reviewed records only; future publishing takes place through the existing admin.
  for(const article of [...manifest.articles].reverse()) {
    const record=records.find(p=>p.slug===article.slug);
    const {data,error}=await db.from('blog_posts').select('id,status,content,featured_image,category_id').eq('slug',record.slug).single();
    if(error) throw error;
    if(data.category_id!==category || data.content!==record.content || data.featured_image!==record.featured_image) throw new Error(`CMS differs from reviewed snapshot: ${record.slug}`);
    if(data.status==='published') {console.log('Already published:',record.slug);continue;}
    const {error:updateError}=await db.from('blog_posts').update({status:'published',published_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq('id',data.id).eq('status','draft');
    if(updateError) throw updateError;
    console.log('Published:',record.slug);
  }
}
const {data,error}=await db.from('blog_posts').select('id,slug,status,word_count').eq('category_id',category);
if(error) throw error;
console.log(JSON.stringify(data,null,2));
