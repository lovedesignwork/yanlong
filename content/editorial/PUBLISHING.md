# Publishing Yan Long articles

Content and publication status live in the existing Royal Phuket City Supabase CMS, project `crhzxvbubvyachauomlx`. Images live in its `blog-images` Storage bucket. GitHub and Vercel deploy application code; editing or publishing an article requires no code deployment.

Open https://yanlongphuket.com/admin (redirects to the existing protected admin at https://royalphuketcity.com/admin/yanlong/blog). Sign in with an existing authorized admin account. Use **New article** or **Edit article**, keep category **Yan Long Blog**, and publish when ready. The homepage shows the latest three published articles; the archive and sitemap include all published articles. Refreshes may take approximately one minute. Draft and archived posts remain unavailable publicly.

For each article:

- Write 800–1,600 words, with H2 sections and H3 subsections. The title supplies the H1. Start with a short paragraph; this appears above the featured image.
- Add a unique description, meaningful slug and featured-image alt text. Use a display category as a tag (for example `Signature dishes`); keep `site:yanlong` if present.
- Use one featured image and 2–4 distinct supporting images. The editor uploader compresses images. Supply supporting-image `width`, `height`, accurate `alt`, and optional responsive `srcset`/`sizes` attributes. Place images inside `<figure>` with helpful `<figcaption>` text.
- Check `image-ownership.json` before selecting photos. No source may be reused between articles, including crops or renamed copies. The shared admin checks known source identities, variants, upload hashes and matching URLs. Editorial review is still needed to identify transformed copies of previously used images.
- Label AI-generated visuals as editorial illustrations. Future generated hero images need a visible disclosure in the opening paragraph or body because the CMS has no dedicated hero-caption field. The initial batch's hero captions are supplied by the ownership registry.
- Link to `/menu`, `/rooms`, `/reserve` and relevant `/blog/slug` pages. Verify actual policies with the restaurant. Do not add public dates or reading times.
- Preview desktop and mobile before publishing. Verify the live page, homepage ordering, archive and sitemap afterward.

The initial nine snapshots in `content/blog` are review/backup files, not the public data source. `YANLONG_BLOG_PREVIEW=1 npm run dev` enables these fixtures locally only. Production never falls back to them. Run `node --test scripts/blog-regression.cjs` to check the original batch and public reader behavior.

`node scripts/publish-blog.mjs prepare|publish|verify` is the initial-batch migration helper. It requires the existing CMS environment and refuses other Supabase hosts. Never commit a service-role key. `prepare` refuses to overwrite a published article; `publish` compares the stored draft with the reviewed snapshot before publishing. Future routine publishing uses the admin.

## Image provenance

The initial batch uses 18 supplied images and 10 Higgsfield editorial illustrations. `generation-record.json` stores prompts and provider results. Requests selected `nano_banana_pro`; completed-job metadata reported `nano_banana_2`. The user explicitly approved using those results. Do not describe them as verified Pro-model output. Optimized WebP originals and responsive variants are stored in Supabase; local copies are recovery assets. `image-ownership.json` records source hashes, dimensions, sizes, captions and article ownership.
