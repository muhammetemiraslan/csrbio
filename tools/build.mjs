// ==========================================================
// CSR BİO Tarım — SEO sayfa üreticisi
// GitHub Actions tarafından çalıştırılır (bkz. .github/workflows/site.yml).
// Supabase'deki ürün ve blog yazılarından gerçek HTML sayfaları üretir:
//   /urun/<ad>/index.html, /yazi/<baslik>/index.html, sitemap.xml
// ve ana sayfa / blog listesine arama motorlarının okuyacağı linkleri yazar.
// Çıktı klasörü: _site
// ==========================================================
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "_site");
const SKIP = new Set([".git", ".github", "tools", "supabase", "_site", "node_modules"]);
const SKIP_EXT = new Set([".md", ".sql"]);

// ---------------- config.js + render.js'i yükle ----------------
const ctx = vm.createContext({ console, Date, Intl, URLSearchParams, encodeURIComponent, decodeURIComponent });
for (const f of ["js/config.js", "js/render.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
}
const R = (expr) => vm.runInContext(expr, ctx);
const SITE = R("SITE");
const esc = R("esc");
const { mapProduct, mapPost, assignSlugs, productDetailHTML, relatedProducts, productCardHTML, postCardHTML, articleHTML, productUrl, postUrl }
  = R("({ mapProduct, mapPost, assignSlugs, productDetailHTML, relatedProducts, productCardHTML, postCardHTML, articleHTML, productUrl, postUrl })");
const SUPABASE_URL = R("SUPABASE_URL");
const SUPABASE_KEY = R("SUPABASE_KEY");

// ---------------- Supabase ----------------
async function fetchTable(table) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
  return res.json();
}

// ---------------- Yardımcılar ----------------
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    if (SKIP.has(name) || SKIP_EXT.has(path.extname(name))) continue;
    const s = path.join(src, name), d = path.join(dst, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}
const write = (rel, content) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const clip = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1) + "…" : s; };

// Sayfalardaki sürüm numarasını (cache) urun.html'den al
const urunTpl = fs.readFileSync(path.join(ROOT, "urun.html"), "utf8");
const VERSION = (urunTpl.match(/render\.js\?v=([\w]+)/) || [])[1] || "1";

function page({ title, description, canonical, image, type = "website", bodyPage, main, scripts, ld = [] }) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<base href="/">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
${image ? `<meta property="og:image" content="${esc(image)}">` : `<meta property="og:image" content="${SITE.url}/img/og-image.jpg">`}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/main.css?v=${VERSION}">
${ld.map(jsonLd).join("\n")}
</head>
<body data-page="${bodyPage}">
${main}
<script src="js/vendor/supabase.js"></script>
<script src="js/config.js?v=${VERSION}"></script>
<script src="js/render.js?v=${VERSION}"></script>
<script src="js/common.js?v=${VERSION}"></script>
${scripts.map((s) => `<script src="js/${s}.js?v=${VERSION}"></script>`).join("\n")}
</body>
</html>
`;
}

// ---------------- Çalıştır ----------------
fs.rmSync(OUT, { recursive: true, force: true });
copyDir(ROOT, OUT);

let products = [], posts = [];
try {
  products = assignSlugs((await fetchTable("product")).map(mapProduct), "name");
  posts = assignSlugs((await fetchTable("blog_post")).map(mapPost), "title");
} catch (e) {
  // Supabase'e ulaşılamazsa site yine yayınlanır (sayfalar tarayıcıda açılır)
  console.error("UYARI: Supabase okunamadı, SEO sayfaları üretilmedi:", e.message);
}

const breadcrumb = (items) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: url })),
});

// Ürün sayfaları
for (const p of products) {
  const url = `${SITE.url}/${productUrl(p)}`;
  const title = `${p.name}${p.headline ? " – " + p.headline : ""} | ${SITE.name}`;
  const description = clip(`${p.headline ? p.headline + ". " : ""}${p.summary || p.name + " — " + SITE.name}`, 160);
  write(path.join("urun", p.slug, "index.html"), page({
    title, description, canonical: url, image: p.image, type: "product", bodyPage: "product",
    main: `<main id="productPage" data-prerendered="1">${productDetailHTML(p, relatedProducts(p, products), url)}</main>`,
    scripts: ["product"],
    ld: [
      {
        "@context": "https://schema.org", "@type": "Product", name: p.name, url,
        ...(p.image ? { image: [p.image] } : {}),
        description: clip(p.summary || p.headline || p.name, 500),
        ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
        ...(p.categories.length ? { category: p.categories.join(", ") } : {}),
      },
      breadcrumb([["Ana Sayfa", `${SITE.url}/`], ...(p.category ? [[p.category, `${SITE.url}/index.html?kategori=${encodeURIComponent(p.category)}`]] : []), [p.name, url]]),
    ],
  }));
}

// Blog yazıları
for (const post of posts) {
  const url = `${SITE.url}/${postUrl(post)}`;
  const more = posts.filter((x) => x.id !== post.id).slice(0, 3);
  write(path.join("yazi", post.slug, "index.html"), page({
    title: `${post.title} | ${SITE.name}`,
    description: clip(post.excerpt || post.title, 160),
    canonical: url, image: post.image, type: "article", bodyPage: "blog",
    main: `<main>
  <section class="page-head"><nav class="crumbs" id="postCrumbs"><a href="index.html">Anasayfa</a><span>/</span><a href="blog.html">Blog</a><span>/</span><b>${esc(post.title)}</b></nav></section>
  <article class="article" id="article" data-prerendered="1">${articleHTML(post)}</article>
  <section class="section" style="padding-top:0" id="morePosts"${more.length ? "" : " hidden"}>
    <div class="container">
      <h2 class="section-title" style="font-weight:400">Diğer Yazılar</h2>
      <div class="blog-grid" id="moreGrid">${more.map(postCardHTML).join("")}</div>
    </div>
  </section>
</main>`,
    scripts: ["post"],
    ld: [{
      "@context": "https://schema.org", "@type": "BlogPosting", headline: clip(post.title, 110), url,
      ...(post.image ? { image: [post.image] } : {}),
      ...(post.createdAt ? { datePublished: post.createdAt } : {}),
      author: { "@type": "Organization", name: SITE.name },
      publisher: { "@type": "Organization", name: SITE.name },
    }],
  }));
}

// Ana sayfa ve blog listesine statik linkler (arama motorları için)
function inject(file, marker, html, attrTarget) {
  const f = path.join(OUT, file);
  let s = fs.readFileSync(f, "utf8");
  const re = new RegExp(`<!--${marker}-->[\\s\\S]*?<!--/${marker}-->`);
  if (!re.test(s)) { console.warn(`UYARI: ${file} içinde ${marker} işareti yok`); return; }
  s = s.replace(re, `<!--${marker}-->${html}<!--/${marker}-->`);
  if (attrTarget) s = s.replace(attrTarget, (m) => m.replace(/>$/, ' data-prerendered="1">'));
  fs.writeFileSync(f, s);
}
if (products.length) inject("index.html", "URUN-LISTESI", products.map(productCardHTML).join(""), /<div class="grid" id="productGrid">/);
if (posts.length) inject("blog.html", "YAZI-LISTESI", posts.map(postCardHTML).join(""), /<div class="blog-grid" id="blogGrid">/);

// Ana sayfaya kuruluş bilgisi
{
  const f = path.join(OUT, "index.html");
  const org = {
    "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url,
    logo: `${SITE.url}/favicon.svg`, email: SITE.email, telephone: SITE.phone.replace(/\s+/g, ""),
    ...(SITE.instagram && SITE.instagram !== "#" ? { sameAs: [SITE.instagram] } : {}),
    ...(SITE.partner ? { parentOrganization: { "@type": "Organization", name: SITE.partner } } : {}),
    ...(SITE.address ? { address: SITE.address } : {}),
  };
  fs.writeFileSync(f, fs.readFileSync(f, "utf8").replace("</head>", `${jsonLd(org)}\n</head>`));
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const day = (iso) => (iso ? String(iso).slice(0, 10) : today);
const urls = [
  [`${SITE.url}/`, today, "1.0"],
  [`${SITE.url}/blog.html`, today, "0.6"],
  [`${SITE.url}/iletisim.html`, today, "0.5"],
  ...products.map((p) => [`${SITE.url}/${productUrl(p)}`, day(p.createdAt), "0.8"]),
  ...posts.map((p) => [`${SITE.url}/${postUrl(p)}`, day(p.createdAt), "0.6"]),
];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, d, pr]) => `  <url><loc>${esc(u)}</loc><lastmod>${d}</lastmod><priority>${pr}</priority></url>`).join("\n")}
</urlset>
`);

console.log(`Tamam: ${products.length} ürün sayfası, ${posts.length} yazı sayfası, sitemap ${urls.length} adres.`);
