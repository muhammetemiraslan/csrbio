// ==========================================================
// CSR BİO Tarım — sayfa parçaları (saf fonksiyonlar)
// Hem tarayıcıda hem SEO sayfa üreticisinde (tools/build.mjs) çalışır.
// Burada DOM kullanılmaz; sadece metin (HTML) üretilir.
// ==========================================================

// ---------------- Küçük yardımcılar ----------------
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const trLower = (s) => String(s || "").toLocaleLowerCase("tr-TR").replace(/ı/g, "i");
// api.whatsapp.com adresi hazır mesajı her cihazda (masaüstü dahil) daha güvenilir taşır
const waLink = (text) => `https://api.whatsapp.com/send?phone=${SITE.whatsapp}&text=${encodeURIComponent(text)}`;
const waProductLink = (p) => waLink(WA_PRODUCT_MSG.replace("{urun}", p.name));

function formatDate(iso, opts = { day: "numeric", month: "long", year: "numeric" }){
  try { const d = new Date(iso); return isNaN(d) ? "" : d.toLocaleDateString("tr-TR", opts); } catch(e){ return ""; }
}

// "CALMAG Amino+" -> "calmag-amino"
function slugify(str){
  const map = { ç: "c", ğ: "g", ı: "i", i̇: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };
  return String(str || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşüâîû]/g, c => map[c] || c)
    .normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70) || "urun";
}

// Aynı isimli kayıtlar çakışmasın: ikinciye -id eklenir. Sıra: en eski kayıt sade adı alır.
function assignSlugs(list, field){
  const used = new Map();
  [...list].sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")) || String(a.id).localeCompare(String(b.id)))
    .forEach(item => {
      let s = slugify(item[field]);
      if(used.has(s)) s = `${s}-${item.id}`;
      used.set(s, true);
      item.slug = s;
    });
  return list;
}

// ---------------- Zengin metin (Word'den gelen açıklama) ----------------
const RICH_ALLOWED = {
  p: [], br: [], b: [], strong: [], i: [], em: [], u: [], sub: [], sup: [], span: [],
  h2: [], h3: [], h4: [], ul: [], ol: [], li: [], blockquote: [],
  table: [], thead: [], tbody: [], tr: [], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"],
  a: ["href"]
};
const RICH_RENAME = { h1: "h2", h5: "h4", h6: "h4", div: "p" };

function isRichText(s){ return /<\/?(p|ul|ol|li|h[1-6]|table|br|b|strong|em|div)\b/i.test(String(s || "")); }

// Sadece izin verilen etiketleri ve özellikleri bırakır; stil, script, Word çöpü temizlenir.
function sanitizeHtml(html){
  let s = String(html || "");
  s = s.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<(script|style|iframe|object|embed|noscript|template|svg|math|head|title|xml|meta|link)\b[\s\S]*?<\/\1\s*>/gi, "");
  s = s.replace(/<\/?[a-z]+:[^>]*>/gi, "");   // <o:p>, <w:...> gibi Word etiketleri
  s = s.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g, (m, close, tag, attrs) => {
    tag = tag.toLowerCase();
    tag = RICH_RENAME[tag] || tag;
    if(!(tag in RICH_ALLOWED)) return "";
    if(close) return `</${tag}>`;
    let out = "";
    for(const name of RICH_ALLOWED[tag]){
      const mm = attrs.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
      if(!mm) continue;
      const val = (mm[2] ?? mm[3] ?? mm[4] ?? "").replace(/&amp;/g, "&").trim();
      if(name === "href" && !/^(https?:|mailto:|tel:)/i.test(val)) continue;
      if((name === "colspan" || name === "rowspan") && !/^\d{1,2}$/.test(val)) continue;
      out += ` ${name}="${esc(val)}"`;
    }
    if(tag === "a") out += ' target="_blank" rel="noopener nofollow"';
    return `<${tag}${out}>`;
  });
  s = s.replace(/<span>([\s\S]*?)<\/span>/g, "$1");
  s = s.replace(/<(p|h2|h3|h4|li)>(\s|&nbsp;|<br>)*<\/\1>/g, "");   // boş paragraflar
  return s.trim();
}

function stripHtml(html){
  return String(html || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed|noscript|template|svg|math|head|title|xml)\b[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<(br|\/p|\/li|\/h[1-6]|\/tr)\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();
}

// ---------------- Veri dönüşümü ----------------
function splitCategories(v){
  return [...new Set(String(v || "").split(/[,;\n]/).map(x => x.trim()).filter(Boolean))];
}

function mapProduct(row){
  const raw = String(row.description || "");
  const rich = isRichText(raw);
  const text = rich ? stripHtml(raw) : raw;
  const lines = text.split(/\r?\n/).map(l => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
  return {
    id: row.id,
    name: row.name || "İsimsiz Ürün",
    brand: (row.brand || "").trim(),
    // Birden fazla kategori virgülle ayrılır: "Kalsiyum, Magnezyum"
    categories: splitCategories(row.category),
    category: splitCategories(row.category)[0] || "",
    image: row.img_url || "",
    headline: (row.active_ingredient || "").trim(),   // "Ürün içeriği / ana başlık" (ör. Kalsiyum - Magnezyum)
    descriptionHtml: rich ? sanitizeHtml(raw) : "",
    lines,
    summary: lines.join(" ").slice(0, 300),
    formulation: row.formulation || "",
    targetCrops: row.target_crops || "",
    targetPests: row.target_pests || "",
    pdf: row.pdf_url || "",
    createdAt: row.created_at || ""
  };
}

function mapPost(row){
  const content = String(row.content || "");
  const rich = isRichText(content);
  const paras = (rich ? stripHtml(content) : content).split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  return {
    id: row.id,
    title: row.title || "İsimsiz Yazı",
    category: row.category || "",
    excerpt: row.excerpt || paras[0] || "",
    contentHtml: rich ? sanitizeHtml(content) : "",
    paras,
    image: row.image_url || "",
    createdAt: row.created_at || ""
  };
}

// Site bilgisayardan dosya olarak açıldıysa (file://) temiz adresler çalışmaz; eski adresleri kullan
const LOCAL_PREVIEW = typeof location !== "undefined" && location.protocol === "file:";
const productUrl = (p) => LOCAL_PREVIEW ? `urun.html?id=${encodeURIComponent(p.id)}` : `urun/${p.slug || slugify(p.name)}/`;
const postUrl = (p) => LOCAL_PREVIEW ? `yazi.html?id=${encodeURIComponent(p.id)}` : `yazi/${p.slug || slugify(p.title)}/`;
const catUrl = (name) => `index.html?kategori=${encodeURIComponent(name)}#urunler`;
const brandUrl = (name) => `index.html?marka=${encodeURIComponent(name)}#urunler`;

// Arama: ad, marka, kategori, içerik başlığı
function productMatches(p, q){
  q = trLower(q);
  return !q || [p.name, p.brand, p.headline, ...(p.categories || [])].some(v => trLower(v).includes(q));
}

// ---------------- İkonlar ----------------
const ICON = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" stroke-linejoin="round"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.5-2.3-1.8-2.8-2.8l.8-1-1-2z" stroke-linejoin="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-6.5 8-6.5s7 2 8 6.5"/></svg>',
  caret: '<svg class="caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 3.5l3 3 3-3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3.5 6l8.5 7 8.5-7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 5l-7 7 7 7"/></svg>',
  chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 5l7 7-7 7"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19l7-7"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
  expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5M4 4l6 6M20 4l-6 6M4 20l6-6M20 20l-6-6"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.5V11H7v4h3v9h4v-9h3l1-4h-4V8.7c0-.5.3-.7 1-.7z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.7 3h3.2l-7 8 8.2 10.9h-6.4l-5-6.6-5.8 6.6H1.7l7.5-8.6L1.3 3h6.6l4.5 6zm-1.1 17h1.8L7 4.8H5.1z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 6h3.8v1.7c.6-1 1.9-2 3.9-2 4 0 4.3 2.6 4.3 6V21h-4v-5.5c0-1.4 0-3.1-2-3.1s-2.2 1.5-2.2 3V21h-4z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>'
};

// Logo: eski CSR BIO sitesindeki yaprak işareti + "CSR BIO"
const LOGO_MARK = `<svg class="logo__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
  <path d="M20 4C20 4 8 12 8 23C8 30.2 13.4 36 20 36C26.6 36 32 30.2 32 23C32 12 20 4 20 4Z" stroke="currentColor" stroke-width="2"/>
  <path d="M20 12V32" stroke="currentColor" stroke-width="2"/>
  <path d="M20 18C20 18 14 19 14 24" stroke="currentColor" stroke-width="2"/>
  <path d="M20 24C20 24 26 25 26 29" stroke="currentColor" stroke-width="2"/>
</svg>`;
const LOGO_HTML = `${LOGO_MARK}<span class="logo__name">CSR <strong>BIO</strong></span>`;

// ---------------- Ürün kartı ----------------
function productCardHTML(p){
  const img = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`
    : `<span class="card__noimg">Görsel yok</span>`;
  return `<div class="card">
    <a class="card__link" href="${productUrl(p)}">
      <div class="card__img">${img}</div>
      <h3>${esc(p.name)}</h3>
      ${p.brand ? `<div class="card__brand">${esc(p.brand)}</div>` : ""}
      ${p.headline ? `<div class="card__headline">${esc(p.headline)}</div>` : ""}
    </a>
    <a class="card__wa" href="${waProductLink(p)}" target="_blank" rel="noopener" aria-label="${esc(p.name)} için WhatsApp'tan fiyat sor">${ICON.whatsapp}<span>Fiyat Sor</span></a>
  </div>`;
}

// ---------------- Ürün detay ----------------
function productDescriptionHTML(p){
  if(p.descriptionHtml) return `<div class="rich">${p.descriptionHtml}</div>`;
  if(p.lines.length) return `<ul>${p.lines.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`;
  return `<p style="color:#888">Bu ürün için açıklama eklenmedi.</p>`;
}

function productDetailHTML(p, related, pageUrl){
  const specs = [
    ["İçerik:", p.headline],
    ["Formulasyon Tipi:", p.formulation],
    ["Hedef Ürünler:", p.targetCrops],
    ["Hedef Zararlılar / Sorunlar:", p.targetPests]
  ].filter(s => s[1]);
  if(!specs.length){
    if(p.brand) specs.push(["Marka:", p.brand]);
    if(p.categories.length) specs.push([p.categories.length > 1 ? "Kategoriler:" : "Kategori:", p.categories.join(", ")]);
  }
  const specIcon = `<span class="spec__icon">${LOGO_MARK}</span>`;
  const url = encodeURIComponent(pageUrl || `${SITE.url}/${productUrl(p)}`);
  const text = encodeURIComponent(p.name);

  return `
  <section class="pd"><div class="container">
    <div class="pd__gallery" id="pdGallery">${p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.name)}"><button type="button" class="pd__zoom" aria-label="Büyüt">${ICON.expand}</button>`
      : `<span class="card__noimg" style="width:60%">Görsel yok</span>`}</div>
    <div>
      <nav class="crumbs" aria-label="Sayfa yolu"><a href="index.html">Ana Sayfa</a><span>/</span>${p.category ? `<a href="${catUrl(p.category)}">${esc(p.category)}</a><span>/</span>` : ""}<b>${esc(p.name)}</b></nav>
      <h1>${esc(p.name)}</h1>
      ${(p.brand || p.headline) ? `<p class="pd__sub">${p.brand ? `<a href="${brandUrl(p.brand)}" class="pd__brand">${esc(p.brand)}</a>` : ""}${p.headline ? `<span class="pd__headline">${esc(p.headline)}</span>` : ""}</p>` : ""}
      <div class="pd__actions">
        <a class="btn btn--wa" href="${waProductLink(p)}" target="_blank" rel="noopener">${ICON.whatsapp} WhatsApp'tan Fiyat Sor</a>
      </div>
      ${specs.length || p.pdf ? `<div class="pd__box">
        ${specs.length ? `<div class="pd__specs">${specs.map(([k, v]) => `
          <div class="spec"><h4>${k}</h4><div>${specIcon}<p>${esc(v)}</p></div></div>`).join("")}</div>` : ""}
        ${p.pdf ? `<a class="pd__pdf" href="${esc(p.pdf)}" target="_blank" rel="noopener">${ICON.download} Döküman İndir (PDF)</a>` : ""}
      </div>` : ""}
      <div class="pd__meta">
        ${p.categories.length ? `<p><b>${p.categories.length > 1 ? "Kategoriler" : "Kategori"}:</b> ${p.categories.map(c => `<a href="${catUrl(c)}">${esc(c)}</a>`).join(", ")}</p>` : ""}
        ${p.brand ? `<p><b>Marka:</b> <a href="${brandUrl(p.brand)}">${esc(p.brand)}</a></p>` : ""}
        <p><b>Paylaş:</b><span class="share">
          <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.facebook}</a>
          <a href="https://x.com/intent/post?url=${url}&amp;text=${text}" target="_blank" rel="noopener" aria-label="X">${ICON.x}</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICON.linkedin}</a>
          <a href="https://api.whatsapp.com/send?text=${text}%20${url}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>
        </span></p>
      </div>
    </div>
  </div></section>

  <div class="container">
    <div class="tabs"><h2>Açıklama</h2></div>
    <div class="pd__desc">${productDescriptionHTML(p)}</div>
    ${related.length ? `<section class="related">
      <h2>İlgili Ürünler</h2>
      <div class="grid">${related.map(productCardHTML).join("")}</div>
    </section>` : ""}
  </div>`;
}

function relatedProducts(p, all){
  const others = all.filter(x => x.id !== p.id);
  const shares = (x) => x.categories.some(c => p.categories.includes(c));
  return [
    ...others.filter(shares),
    ...others.filter(x => !shares(x) && p.brand && x.brand === p.brand)
  ].slice(0, 4);
}

// ---------------- Blog ----------------
function postCardHTML(post){
  const d = new Date(post.createdAt);
  const date = isNaN(d) ? "" : `<span class="post__date"><b>${d.getDate()}</b>${d.toLocaleDateString("tr-TR", { month: "short" })}</span>`;
  const img = post.image
    ? `<a href="${postUrl(post)}" class="post__img"><img src="${esc(post.image)}" alt="${esc(post.title)}" loading="lazy">${date}${post.category ? `<span class="post__tag">${esc(post.category)}</span>` : ""}</a>`
    : "";
  const ex = post.excerpt || "";
  return `<article class="post">
    ${img}
    <div class="post__body">
      <h3><a href="${postUrl(post)}">${esc(post.title)}</a></h3>
      <p>${esc(ex.length > 110 ? ex.slice(0, 107) + "…" : ex)}</p>
      <a href="${postUrl(post)}" class="post__more">Okumaya Devam Et</a>
    </div>
  </article>`;
}

function articleHTML(post){
  const body = post.contentHtml
    ? `<div class="rich">${post.contentHtml}</div>`
    : (post.paras.length ? post.paras : [post.excerpt]).map(t => `<p>${esc(t)}</p>`).join("");
  return `
    ${post.image ? `<div class="article__cover"><img src="${esc(post.image)}" alt="${esc(post.title)}"></div>` : ""}
    <div class="article__meta">${post.category ? `<span>${esc(post.category)}</span>` : ""}<time datetime="${esc(post.createdAt)}">${formatDate(post.createdAt)}</time></div>
    <h1>${esc(post.title)}</h1>
    <div class="article__body">${body}</div>
    <a class="btn btn--wa" style="margin-top:10px" href="${waLink(`Merhaba, "${post.title}" yazınızla ilgili bilgi almak istiyorum.`)}" target="_blank" rel="noopener">${ICON.whatsapp} Bu konuda bize sorun</a>`;
}
