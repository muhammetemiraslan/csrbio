// ==========================================================
// Ürün detay — /urun/<slug>/  (eski adres: urun.html?id=...)
// SEO için bu sayfa önceden HTML olarak üretilmiş olabilir; burada
// Supabase'den güncel veriyle yenilenir.
// ==========================================================
renderLayout("products");

function ensureProductRoot(){
  let root = $("#productPage");
  if(!root){
    $(".footer").insertAdjacentHTML("beforebegin", `<main id="productPage"><div class="container empty" style="padding:120px 20px">Yükleniyor...</div></main>`);
    root = $("#productPage");
  }
  return root;
}

function currentProductKey(){
  const m = location.pathname.match(/\/urun\/([^/]+)\/?$/);
  return { slug: m ? decodeURIComponent(m[1]) : "", id: params.get("id") };
}

function bindGallery(){
  const g = $("#pdGallery"), img = g && g.querySelector("img");
  if(!img) return;
  g.onclick = () => {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<img src="${esc(img.src)}" alt="${esc(img.alt)}">`;
    lb.onclick = () => lb.remove();
    document.body.appendChild(lb);
  };
}

function setMeta(p){
  document.title = `${p.name}${p.headline ? " – " + p.headline : ""} | ${SITE.name}`;
  const desc = (p.headline ? p.headline + ". " : "") + (p.summary || `${p.name} — ${SITE.name}`);
  let m = document.querySelector('meta[name="description"]');
  if(!m){ m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
  m.content = desc.slice(0, 160);
  let c = document.querySelector('link[rel="canonical"]');
  if(!c){ c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); }
  c.href = `${SITE.url}/${productUrl(p)}`;
}

const productRoot = ensureProductRoot();
bindGallery();   // önceden üretilmiş sayfada görsel hemen büyütülebilsin

getProducts().then(products => {
  // Supabase'e ulaşılamazsa önceden üretilmiş içerik ekranda kalsın
  if(!products.length && productRoot.dataset.prerendered) return;

  const { slug, id } = currentProductKey();
  const p = products.find(x => (slug && x.slug === slug) || (id && String(x.id) === String(id)));
  if(!p){
    document.title = `Ürün bulunamadı | ${SITE.name}`;
    productRoot.innerHTML = `<div class="container empty" style="padding:120px 20px">
      <h1 style="font-size:28px;font-weight:500;margin-bottom:10px">Ürün bulunamadı</h1>
      <p style="margin-bottom:20px">Aradığınız ürün kaldırılmış ya da bağlantı hatalı olabilir.</p>
      <a href="index.html#urunler" class="btn btn--green">Tüm Ürünlere Dön</a></div>`;
    return;
  }
  setMeta(p);
  productRoot.innerHTML = productDetailHTML(p, relatedProducts(p, products), `${SITE.url}/${productUrl(p)}`);
  bindGallery();
});
