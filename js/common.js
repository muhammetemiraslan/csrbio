// ==========================================================
// CSR BİO Tarım — ortak: ayarlar, header/footer, veri
// ==========================================================

// ---------------- AYARLAR (buradan değiştir) ----------------
const SITE = {
  name: "CSR BİO Tarım",
  phone: "0 535 625 87 00",
  phoneHref: "tel:05356258700",
  whatsapp: "905356258700",          // başında 90, boşluksuz
  email: "cesur2206@gmail.com",
  instagram: "#",                    // instagram linkini yaz
  address: "",                       // adres yazarsan footer ve iletişimde görünür
  contactPerson: "Volkan Baki Cesur"
};

const SUPABASE_URL = "https://xrzonxgaoanhoijloyag.supabase.co";
const SUPABASE_KEY = "sb_publishable_t_DLqABupEfr5goqtOW2JA_gwrFim-g";
const CHAT_URL = `${SUPABASE_URL}/functions/v1/chat`;   // CSR Asistan (Supabase Edge Function)

// ---------------- Yardımcılar ----------------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const waLink = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const params = new URLSearchParams(location.search);
const trLower = (s) => String(s || "").toLocaleLowerCase("tr-TR").replace(/ı/g, "i");

function toast(msg){
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

function formatDate(iso, opts = { day: "numeric", month: "long", year: "numeric" }){
  try { return new Date(iso).toLocaleDateString("tr-TR", opts); } catch(e){ return ""; }
}

// ---------------- İkonlar ----------------
const ICON = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" stroke-linejoin="round"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.5-2.3-1.8-2.8-2.8l.8-1-1-2z" stroke-linejoin="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-6.5 8-6.5s7 2 8 6.5"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
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
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 6h3.8v1.7c.6-1 1.9-2 3.9-2 4 0 4.3 2.6 4.3 6V21h-4v-5.5c0-1.4 0-3.1-2-3.1s-2.2 1.5-2.2 3V21H10z"/></svg>'
};

// Logo işareti (CSR BİO'ya özel yaprak işareti — gerçek logon gelince img ile değiştir)
const LOGO_MARK = `<svg class="logo__mark" viewBox="0 0 64 64" aria-hidden="true">
  <circle cx="32" cy="32" r="30" fill="#2f5226"/>
  <path d="M10 44c10-4 30-4 44 0" stroke="#a3c133" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M13 51c9-3 27-3 38 0" stroke="#a3c133" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M32 40V22" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M32 28c-1-7-6-11-14-11 0 8 5 12 14 11z" fill="#a3c133"/>
  <path d="M32 24c1-7 6-11 14-11 0 8-5 12-14 11z" fill="#fff"/>
</svg>`;
const LOGO_HTML = `${LOGO_MARK}<span class="logo__text"><b>CSR BİO</b><span>Tarım</span></span>`;

// ---------------- Header / Footer ----------------
function renderLayout(active){
  const header = `
  <div class="topbar"><div class="container">
    <div class="topbar__contact">
      <a class="tb-mail" href="mailto:${SITE.email}">${SITE.email}</a><span class="sep"></span>
      <a href="${SITE.phoneHref}">${SITE.phone}</a>
    </div>
    <div class="topbar__social">
      <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
      <a href="${waLink("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>
    </div>
  </div></div>

  <header class="header"><div class="container">
    <a href="index.html" class="logo" aria-label="${SITE.name} anasayfa">${LOGO_HTML}</a>
    <form class="search" id="searchForm" role="search" autocomplete="off">
      <input type="search" id="searchInput" placeholder="Ürünleri ara" aria-label="Ürünleri ara">
      <select id="searchCat" aria-label="Kategori seç"><option value="">Kategori Seç</option></select>
      <button type="submit" aria-label="Ara">${ICON.search}</button>
      <div class="search__results hidden" id="searchResults"></div>
    </form>
    <div class="header__icons">
      <a href="admin/" aria-label="Giriş">${ICON.user}</a>
      <a href="${waLink("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener" class="header__wa" aria-label="WhatsApp ile yazın">${ICON.whatsapp}<b>WhatsApp</b></a>
      <button class="menu-toggle" id="menuToggle" aria-label="Menü">${ICON.menu}</button>
    </div>
  </div></header>

  <nav class="nav" id="nav"><div class="container"><ul>
    <li><a href="index.html" class="${active === "home" ? "active" : ""}">Anasayfa</a></li>
    <li><a href="index.html#hakkimizda">Hakkımızda</a></li>
    <li><a href="index.html#urunler" class="${active === "products" ? "active" : ""}">Ürünlerimiz ${ICON.caret}</a>
      <ul class="dropdown" id="navCats"><li><a href="index.html#urunler">Tüm Ürünler</a></li></ul></li>
    <li><a href="index.html#hakkimizda">Kurumsal ${ICON.caret}</a>
      <ul class="dropdown">
        <li><a href="index.html#hakkimizda">Hakkımızda</a></li>
        <li><a href="index.html#referanslar">Referanslarımız</a></li>
        <li><a href="index.html#yorumlar">Müşteri Yorumları</a></li>
      </ul></li>
    <li><a href="blog.html" class="${active === "blog" ? "active" : ""}">Blog</a></li>
    <li><a href="iletisim.html" class="${active === "contact" ? "active" : ""}">İletişim</a></li>
  </ul></div></nav>`;

  const footer = `
  <footer class="footer"><div class="container">
    <a href="index.html" class="footer__logo logo">${LOGO_HTML}</a>
    <div>
      <h4>Kurumsal</h4>
      <ul>
        <li><a href="index.html#hakkimizda">Hakkımızda</a></li>
        <li><a href="index.html#urunler">Ürünlerimiz</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="iletisim.html">İletişim</a></li>
      </ul>
    </div>
    <div>
      <h4>Ürünlerimiz</h4>
      <ul id="footerCats"></ul>
    </div>
    <div class="footer__contact">
      <h4>İletişim Bilgilerimiz</h4>
      <ul>
        <li>${ICON.phone}<a href="${SITE.phoneHref}">${SITE.phone}</a></li>
        <li>${ICON.whatsapp}<a href="${waLink("Merhaba,")}" target="_blank" rel="noopener">Whatsapp Destek</a></li>
        <li>${ICON.mail}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
        ${SITE.address ? `<li>${ICON.pin}<span>${esc(SITE.address)}</span></li>` : ""}
      </ul>
    </div>
  </div></footer>
  <div class="footer__bar"><div class="container">
    <div class="social">
      <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
      <a href="${waLink("Merhaba,")}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>
    </div>
    <nav><a href="blog.html">Blog</a><a href="iletisim.html">İletişim</a></nav>
  </div></div>
  <div class="footer__copy">${new Date().getFullYear()} © <b>${SITE.name}</b> | Tüm Hakları Saklıdır.</div>

  <button type="button" class="fab" id="chatFab" aria-label="CSR Asistan ile sohbet et" aria-expanded="false">
    <span class="fab__label">Hızlı İletişim</span>
    <span class="fab__btn">${LOGO_MARK}</span>
  </button>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Mobil menü
  $("#menuToggle").addEventListener("click", () => $("#nav").classList.toggle("open"));
  $$("#nav > .container > ul > li").forEach(li => {
    const sub = li.querySelector(".dropdown");
    if(!sub) return;
    li.firstElementChild.addEventListener("click", (e) => {
      if(window.innerWidth <= 992){ e.preventDefault(); li.classList.toggle("open"); }
    });
  });
  $$("#nav a").forEach(a => a.addEventListener("click", () => {
    if(!a.parentElement.querySelector(".dropdown")) $("#nav").classList.remove("open");
  }));

  initSearch();
  initChat();
  getProducts().then(fillCategoryMenus);
}

// ---------------- Supabase veri ----------------
let _sb = null;
function sb(){
  if(_sb) return _sb;
  if(!window.supabase) return null;
  _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  return _sb;
}

function mapProduct(row){
  const lines = String(row.description || "").split(/\r?\n/).map(l => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
  return {
    id: row.id,
    name: row.name || "İsimsiz Ürün",
    brand: row.brand || "",
    category: (row.category || "").trim(),
    image: row.img_url || "",
    lines,
    // İsteğe bağlı sütunlar (Supabase'e eklenirse detay sayfasında görünür)
    activeIngredient: row.active_ingredient || "",
    formulation: row.formulation || "",
    targetCrops: row.target_crops || "",
    targetPests: row.target_pests || "",
    pdf: row.pdf_url || "",
    createdAt: row.created_at
  };
}

let _productsPromise = null;
function getProducts(){
  if(_productsPromise) return _productsPromise;
  _productsPromise = (async () => {
    const c = sb();
    if(!c) return [];
    try{
      const { data, error } = await c.from("product").select("*").order("created_at", { ascending: false });
      if(error || !data) return [];
      return data.map(mapProduct);
    } catch(e){ return []; }
  })();
  return _productsPromise;
}

let _postsPromise = null;
function getPosts(){
  if(_postsPromise) return _postsPromise;
  _postsPromise = (async () => {
    const c = sb();
    if(!c) return [];
    try{
      const { data, error } = await c.from("blog_post").select("*").order("created_at", { ascending: false });
      return error || !data ? [] : data;
    } catch(e){ return []; }
  })();
  return _postsPromise;
}

function categoriesOf(products){
  const map = new Map();
  products.forEach(p => { if(p.category) map.set(p.category, (map.get(p.category) || 0) + 1); });
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0], "tr")).map(([name, count]) => ({ name, count }));
}
function brandsOf(products){
  const map = new Map();
  products.forEach(p => { if(p.brand) map.set(p.brand, (map.get(p.brand) || 0) + 1); });
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0], "tr")).map(([name, count]) => ({ name, count }));
}

const productUrl = (p) => `urun.html?id=${encodeURIComponent(p.id)}`;
const postUrl = (p) => `yazi.html?id=${encodeURIComponent(p.id)}`;
const catUrl = (name) => `index.html?kategori=${encodeURIComponent(name)}#urunler`;

function fillCategoryMenus(products){
  const cats = categoriesOf(products);
  const sel = $("#searchCat");
  cats.forEach(c => sel.insertAdjacentHTML("beforeend", `<option value="${esc(c.name)}">${esc(c.name)}</option>`));
  if(params.get("kategori")) sel.value = params.get("kategori");
  $("#navCats").insertAdjacentHTML("beforeend", cats.map(c => `<li><a href="${catUrl(c.name)}">${esc(c.name)}</a></li>`).join(""));
  $("#footerCats").innerHTML = cats.slice(0, 6).map(c => `<li><a href="${catUrl(c.name)}">${esc(c.name)}</a></li>`).join("")
    || `<li><a href="index.html#urunler">Tüm Ürünler</a></li>`;
}

// ---------------- Ürün kartı ----------------
function productCardHTML(p){
  const img = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`
    : `<span class="card__noimg">Görsel yok</span>`;
  return `<a class="card" href="${productUrl(p)}">
    <div class="card__img">${img}</div>
    <h3>${esc(p.name)}</h3>
    <div class="card__meta">${p.category ? esc(p.category) + "<br>" : ""}${esc(p.brand)}</div>
  </a>`;
}

// ---------------- Header arama ----------------
function initSearch(){
  const form = $("#searchForm"), input = $("#searchInput"), cat = $("#searchCat"), box = $("#searchResults");

  async function update(){
    const q = trLower(input.value.trim());
    if(q.length < 2){ box.classList.add("hidden"); return; }
    const list = (await getProducts()).filter(p =>
      (!cat.value || p.category === cat.value) &&
      (trLower(p.name).includes(q) || trLower(p.brand).includes(q) || trLower(p.category).includes(q))
    ).slice(0, 8);
    box.innerHTML = list.length
      ? list.map(p => `<a href="${productUrl(p)}">${p.image ? `<img src="${esc(p.image)}" alt="">` : ""}<span>${esc(p.name)}</span></a>`).join("")
      : `<p>Sonuç bulunamadı.</p>`;
    box.classList.remove("hidden");
  }
  input.addEventListener("input", update);
  cat.addEventListener("change", update);
  document.addEventListener("click", (e) => { if(!form.contains(e.target)) box.classList.add("hidden"); });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    if(input.value.trim()) sp.set("q", input.value.trim());
    if(cat.value) sp.set("kategori", cat.value);
    const url = `index.html${sp.toString() ? "?" + sp : ""}#urunler`;
    if(document.body.dataset.page === "home"){
      history.replaceState(null, "", url);
      window.dispatchEvent(new Event("filters:url"));
      $("#urunler").scrollIntoView();
      box.classList.add("hidden");
    } else {
      location.href = url;
    }
  });

  if(params.get("q")) input.value = params.get("q");
}

// ---------------- Blog kartı ----------------
function postCardHTML(post){
  const d = new Date(post.created_at);
  const date = isNaN(d) ? "" : `<span class="post__date"><b>${d.getDate()}</b>${d.toLocaleDateString("tr-TR", { month: "short" })}</span>`;
  const img = post.image_url
    ? `<a href="${postUrl(post)}" class="post__img"><img src="${esc(post.image_url)}" alt="${esc(post.title)}" loading="lazy">${date}${post.category ? `<span class="post__tag">${esc(post.category)}</span>` : ""}</a>`
    : "";
  const excerpt = post.excerpt || String(post.content || "").split(/\r?\n/).find(Boolean) || "";
  return `<article class="post">
    ${img}
    <div class="post__body">
      <h3><a href="${postUrl(post)}">${esc(post.title || "İsimsiz Yazı")}</a></h3>
      <p>${esc(excerpt.length > 110 ? excerpt.slice(0, 107) + "…" : excerpt)}</p>
      <a href="${postUrl(post)}" class="post__more">Okumaya Devam Et</a>
    </div>
  </article>`;
}

// ==========================================================
// CSR Asistan — sağ alttaki sohbet penceresi
// ==========================================================
const CHAT_WELCOME = "Merhaba! Ben **CSR Asistan** 🌱\nBitkinizde yaşadığınız sorunu yazın (hangi bitki, hangi dönem, belirti ne), size uygun ürünlerimizi önereyim.";
const CHAT_SUGGESTIONS = ["Elmada çiçek dökümü var", "Domateste yapraklar sararıyor", "Kök gelişimi için ne önerirsiniz?"];
const CHAT_STORE = "csr_chat_v1";

function chatFormat(text){
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/^- (.+)$/gm, "• $1")
    .replace(/\n/g, "<br>");
}

function initChat(){
  const fab = $("#chatFab");
  document.body.insertAdjacentHTML("beforeend", `
  <section class="chat hidden" id="chat" role="dialog" aria-label="CSR Asistan">
    <header class="chat__head">
      <span class="chat__avatar">${LOGO_MARK}</span>
      <div><b>CSR Asistan</b><small>Yapay zekâ destekli ürün asistanı</small></div>
      <button type="button" class="chat__reset" id="chatReset" title="Yeni sohbet" aria-label="Yeni sohbet">↺</button>
      <button type="button" class="chat__close" id="chatClose" aria-label="Kapat">✕</button>
    </header>
    <div class="chat__body" id="chatBody" aria-live="polite"></div>
    <div class="chat__suggest" id="chatSuggest">${CHAT_SUGGESTIONS.map(t => `<button type="button">${esc(t)}</button>`).join("")}</div>
    <form class="chat__form" id="chatForm" autocomplete="off">
      <input type="text" id="chatInput" maxlength="600" placeholder="Sorunuzu yazın..." aria-label="Mesajınız">
      <button type="submit" aria-label="Gönder">${ICON.arrowR}</button>
    </form>
    <div class="chat__foot">
      <a href="${waLink("Merhaba, bilgi almak istiyorum.")}" target="_blank" rel="noopener">${ICON.whatsapp} Uzmanla WhatsApp'tan konuş</a>
      <small>Asistan hata yapabilir; doz ve uygulama için ürün etiketine uyun. Kişisel bilgi paylaşmayın.</small>
    </div>
  </section>`);

  const box = $("#chat"), body = $("#chatBody"), form = $("#chatForm"), input = $("#chatInput");
  let history = [];
  let busy = false;
  try { history = JSON.parse(sessionStorage.getItem(CHAT_STORE) || "[]"); } catch(e){ history = []; }
  const save = () => { try { sessionStorage.setItem(CHAT_STORE, JSON.stringify(history.slice(-20))); } catch(e){} };

  async function productLinks(ids){
    if(!ids || !ids.length) return "";
    const all = await getProducts();
    const list = ids.map(id => all.find(p => String(p.id) === String(id))).filter(Boolean);
    return list.length ? `<div class="chat__products">${list.map(p => `
      <a href="${productUrl(p)}">${p.image ? `<img src="${esc(p.image)}" alt="">` : ""}<span><b>${esc(p.name)}</b><small>${esc(p.category || p.brand)}</small></span></a>`).join("")}</div>` : "";
  }

  async function bubble(role, text, ids){
    const div = document.createElement("div");
    div.className = `chat__msg chat__msg--${role}`;
    div.innerHTML = `<p>${chatFormat(text)}</p>`;
    body.appendChild(div);
    if(ids && ids.length) div.insertAdjacentHTML("beforeend", await productLinks(ids));
    body.scrollTop = body.scrollHeight;
  }

  async function renderAll(){
    body.innerHTML = "";
    await bubble("bot", CHAT_WELCOME);
    for(const m of history) await bubble(m.role === "user" ? "user" : "bot", m.text, m.ids);
    $("#chatSuggest").classList.toggle("hidden", history.length > 0);
  }

  async function send(text){
    text = text.trim();
    if(!text || busy) return;
    busy = true;
    input.value = "";
    $("#chatSuggest").classList.add("hidden");
    history.push({ role: "user", text });
    save();
    await bubble("user", text);

    const typing = document.createElement("div");
    typing.className = "chat__msg chat__msg--bot chat__typing";
    typing.innerHTML = "<p><i></i><i></i><i></i></p>";
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    let reply, ids = [];
    try{
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY },
        body: JSON.stringify({ messages: history.map(m => ({ role: m.role, text: m.text })) })
      });
      const data = await res.json();
      reply = data.reply;
      ids = data.product_ids || [];
      if(!reply) throw new Error(data.error || "boş cevap");
    } catch(e){
      reply = `Şu an bağlantı kuramadım. WhatsApp'tan yazarsanız hemen yardımcı olalım: ${SITE.phone}`;
      ids = [];
    }
    typing.remove();
    history.push({ role: "bot", text: reply, ids });
    save();
    await bubble("bot", reply, ids);
    busy = false;
    input.focus();
  }

  const open = () => {
    box.classList.remove("hidden");
    fab.classList.add("is-open");
    fab.setAttribute("aria-expanded", "true");
    if(!body.children.length) renderAll();
    setTimeout(() => input.focus(), 50);
  };
  const close = () => {
    box.classList.add("hidden");
    fab.classList.remove("is-open");
    fab.setAttribute("aria-expanded", "false");
  };

  fab.addEventListener("click", () => box.classList.contains("hidden") ? open() : close());
  $("#chatClose").addEventListener("click", close);
  $("#chatReset").addEventListener("click", () => { history = []; save(); renderAll(); });
  document.addEventListener("keydown", (e) => { if(e.key === "Escape" && !box.classList.contains("hidden")) close(); });
  form.addEventListener("submit", (e) => { e.preventDefault(); send(input.value); });
  $("#chatSuggest").addEventListener("click", (e) => { const b = e.target.closest("button"); if(b) send(b.textContent); });
}
