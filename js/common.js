// ==========================================================
// CSR BİO Tarım — ortak: header/footer, veri, arama, asistan
// Ayarlar: js/config.js   ·   Sayfa parçaları: js/render.js
// ==========================================================

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const params = new URLSearchParams(location.search);

function toast(msg){
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

// ---------------- Header / Footer ----------------
function renderLayout(active){
  const mailLink = `mailto:${SITE.email}`;
  const header = `
  <div class="topbar"><div class="container">
    <div class="topbar__contact">
      <a class="tb-mail" href="${mailLink}">${esc(SITE.email)}</a><span class="sep"></span>
      <a href="${SITE.phoneHref}">${esc(SITE.phone)}</a>
    </div>
    <div class="topbar__right">
      ${SITE.partner ? `<span class="topbar__partner">Bir <b>${esc(SITE.partner)}</b> iştirakidir</span>` : ""}
      <div class="topbar__social">
        <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
        <a href="${mailLink}" aria-label="E-posta gönder">${ICON.mail}</a>
        <a href="${waLink("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>
      </div>
    </div>
  </div></div>

  <header class="header"><div class="container">
    <a href="index.html" class="logo" aria-label="${esc(SITE.name)} anasayfa">${LOGO_HTML}</a>
    <form class="search" id="searchForm" role="search" autocomplete="off">
      <input type="search" id="searchInput" placeholder="Ürün adı, marka ya da içerik ara (ör. kalsiyum)" aria-label="Ürünleri ara">
      <select id="searchCat" aria-label="Kategori seç"><option value="">Kategori Seç</option></select>
      <button type="submit" aria-label="Ara">${ICON.search}</button>
      <div class="search__results hidden" id="searchResults"></div>
    </form>
    <div class="header__icons">
      <div class="userbox">
        <button type="button" class="userbox__btn" id="userBtn" aria-label="Yetkili iletişim bilgileri" aria-expanded="false">${ICON.user}</button>
        <div class="userbox__pop hidden" id="userPop" role="dialog" aria-label="Yetkili bilgileri">
          <span class="userbox__avatar">${ICON.user}</span>
          <small>${esc(SITE.contactRole || "Yetkili")}</small>
          <b>${esc(SITE.contactPerson)}</b>
          <a href="${SITE.phoneHref}">${ICON.phone}${esc(SITE.phone)}</a>
          <a href="${mailLink}">${ICON.mail}${esc(SITE.email)}</a>
          <a class="userbox__wa" href="${waLink(`Merhaba ${SITE.contactPerson.split(" ")[0]} Bey, bilgi almak istiyorum.`)}" target="_blank" rel="noopener">${ICON.whatsapp} WhatsApp'tan Yaz</a>
        </div>
      </div>
      <a href="${waLink("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener" class="header__wa" aria-label="WhatsApp ile yazın">${ICON.whatsapp}<b>WhatsApp</b></a>
      <button class="menu-toggle" id="menuToggle" aria-label="Menü">${ICON.menu}</button>
    </div>
  </div></header>

  <nav class="nav" id="nav"><div class="container"><ul>
    <li><a href="index.html" class="${active === "home" ? "active" : ""}">Anasayfa</a></li>
    <li><a href="index.html#hakkimizda">Hakkımızda</a></li>
    <li><a href="index.html#urunler" class="${active === "products" ? "active" : ""}">Ürünlerimiz ${ICON.caret}</a>
      <ul class="dropdown" id="navCats"><li><a href="index.html#urunler">Tüm Ürünler</a></li></ul></li>
    <li><a href="blog.html" class="${active === "blog" ? "active" : ""}">Blog</a></li>
    <li><a href="iletisim.html" class="${active === "contact" ? "active" : ""}">İletişim</a></li>
  </ul></div></nav>`;

  const footer = `
  <footer class="footer"><div class="container">
    <div>
      <a href="index.html" class="footer__logo logo">${LOGO_HTML}</a>
      ${SITE.partner ? `<p class="footer__partner">${esc(SITE.name)}, bir <b>${esc(SITE.partner)}</b> iştirakidir.</p>` : ""}
    </div>
    <div>
      <h4>Kurumsal</h4>
      <ul>
        <li><a href="index.html#hakkimizda">Hakkımızda</a></li>
        <li><a href="index.html#urunler">Ürünlerimiz</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="index.html#yorumlar">Müşteri Yorumları</a></li>
      </ul>
    </div>
    <div class="footer__contact">
      <h4>İletişim Bilgilerimiz</h4>
      <ul>
        <li>${ICON.phone}<a href="${SITE.phoneHref}">${esc(SITE.phone)}</a></li>
        <li>${ICON.whatsapp}<a href="${waLink("Merhaba,")}" target="_blank" rel="noopener">Whatsapp Destek</a></li>
        <li>${ICON.mail}<a href="${mailLink}">${esc(SITE.email)}</a></li>
        ${SITE.address ? `<li>${ICON.pin}<a href="iletisim.html">${esc(SITE.address)}</a></li>` : ""}
      </ul>
    </div>
  </div></footer>
  <div class="footer__bar"><div class="container">
    <div class="social">
      <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
      <a href="${mailLink}" aria-label="E-posta">${ICON.mail}</a>
      <a href="${waLink("Merhaba,")}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>
    </div>
  </div></div>
  <div class="footer__copy">${new Date().getFullYear()} © <b>${esc(SITE.name)}</b>${SITE.partner ? ` | Bir ${esc(SITE.partner)} iştirakidir` : ""} | Tüm Hakları Saklıdır.</div>

  <button type="button" class="fab" id="chatFab" aria-label="CSR Asistan ile sohbet et" aria-expanded="false">
    <span class="fab__label">Hızlı İletişim</span>
    <span class="fab__btn">${LOGO_MARK}</span>
  </button>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Mobil menü
  $("#menuToggle").addEventListener("click", () => $("#nav").classList.toggle("open"));
  $$("#nav > .container > ul > li").forEach(li => {
    if(!li.querySelector(".dropdown")) return;
    li.firstElementChild.addEventListener("click", (e) => {
      if(window.innerWidth <= 992){ e.preventDefault(); li.classList.toggle("open"); }
    });
  });
  $$("#nav a").forEach(a => a.addEventListener("click", () => {
    if(!a.parentElement.querySelector(".dropdown")) $("#nav").classList.remove("open");
  }));

  // Kişi ikonu: yetkili bilgileri
  const userBtn = $("#userBtn"), userPop = $("#userPop");
  userBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = userPop.classList.toggle("hidden") === false;
    userBtn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (e) => {
    if(!userPop.contains(e.target)){ userPop.classList.add("hidden"); userBtn.setAttribute("aria-expanded", "false"); }
  });

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

let _productsPromise = null;
function getProducts(){
  if(_productsPromise) return _productsPromise;
  _productsPromise = (async () => {
    const c = sb();
    if(!c) return [];
    try{
      const { data, error } = await c.from("product").select("*").order("created_at", { ascending: false });
      if(error || !data) return [];
      return assignSlugs(data.map(mapProduct), "name");
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
      return error || !data ? [] : assignSlugs(data.map(mapPost), "title");
    } catch(e){ return []; }
  })();
  return _postsPromise;
}

function countBy(products, key, order = []){
  const map = new Map();
  products.forEach(p => [].concat(p[key] || []).forEach(v => { if(v) map.set(v, (map.get(v) || 0) + 1); }));
  const rank = (n) => { const i = order.findIndex(o => trLower(o) === trLower(n)); return i < 0 ? 999 : i; };
  return [...map.entries()]
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0], "tr"))
    .map(([name, count]) => ({ name, count }));
}
const categoriesOf = (products) => countBy(products, "categories", typeof CATEGORIES !== "undefined" ? CATEGORIES : []);
const brandsOf = (products) => countBy(products, "brand");

function fillCategoryMenus(products){
  const cats = categoriesOf(products);
  const sel = $("#searchCat");
  cats.forEach(c => sel.insertAdjacentHTML("beforeend", `<option value="${esc(c.name)}">${esc(c.name)}</option>`));
  if(params.get("kategori")) sel.value = params.get("kategori");
  $("#navCats").insertAdjacentHTML("beforeend", cats.map(c => `<li><a href="${catUrl(c.name)}">${esc(c.name)}</a></li>`).join(""));
}

// ---------------- Header arama ----------------
function initSearch(){
  const form = $("#searchForm"), input = $("#searchInput"), cat = $("#searchCat"), box = $("#searchResults");

  async function update(){
    const q = input.value.trim();
    if(q.length < 2){ box.classList.add("hidden"); return; }
    const list = (await getProducts()).filter(p => (!cat.value || p.categories.includes(cat.value)) && productMatches(p, q)).slice(0, 8);
    box.innerHTML = list.length
      ? list.map(p => `<a href="${productUrl(p)}">${p.image ? `<img src="${esc(p.image)}" alt="">` : ""}<span><b>${esc(p.name)}</b>${p.headline ? `<small>${esc(p.headline)}</small>` : ""}</span></a>`).join("")
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

// ==========================================================
// CSR Asistan — sağ alttaki sohbet penceresi
// ==========================================================
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
  const suggestEl = $("#chatSuggest");   // sohbet temizlenince DOM'dan çıksa da kaybolmasın
  let history = [];
  let busy = false;
  let rendering = null;
  try { history = JSON.parse(sessionStorage.getItem(CHAT_STORE) || "[]"); } catch(e){ history = []; }
  const save = () => { try { sessionStorage.setItem(CHAT_STORE, JSON.stringify(history.slice(-20))); } catch(e){} };

  async function productLinks(ids){
    if(!ids || !ids.length) return "";
    const all = await getProducts();
    const list = ids.map(id => all.find(p => String(p.id) === String(id))).filter(Boolean);
    return list.length ? `<div class="chat__products">${list.map(p => `
      <a href="${productUrl(p)}">${p.image ? `<img src="${esc(p.image)}" alt="">` : ""}<span><b>${esc(p.name)}</b><small>${esc(p.headline || p.brand)}</small></span></a>`).join("")}</div>` : "";
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
    body.appendChild(suggestEl);          // konu butonları açılış mesajının hemen altında
    for(const m of history) await bubble(m.role === "user" ? "user" : "bot", m.text, m.ids);
    suggestEl.classList.toggle("hidden", history.length > 0);
  }

  async function send(text){
    text = text.trim();
    if(!text || busy) return;
    busy = true;
    input.value = "";
    suggestEl.classList.add("hidden");
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
        body: JSON.stringify({ messages: history.map(m => ({ role: m.role, text: m.text })) }),
        signal: AbortSignal.timeout ? AbortSignal.timeout(45000) : undefined   // 45 sn'de cevap yoksa vazgeç
      });
      const data = await res.json();
      if(data.error) console.warn("CSR Asistan hata:", data.error);
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
    if(!rendering) rendering = body.children.length ? Promise.resolve() : renderAll();
    setTimeout(() => input.focus(), 50);
    return rendering;
  };
  const close = () => {
    box.classList.add("hidden");
    fab.classList.remove("is-open");
    fab.setAttribute("aria-expanded", "false");
  };

  fab.addEventListener("click", () => box.classList.contains("hidden") ? open() : close());
  $("#chatClose").addEventListener("click", close);
  $("#chatReset").addEventListener("click", () => { history = []; save(); rendering = renderAll(); });
  document.addEventListener("keydown", (e) => { if(e.key === "Escape" && !box.classList.contains("hidden")) close(); });
  form.addEventListener("submit", (e) => { e.preventDefault(); send(input.value); });
  suggestEl.addEventListener("click", (e) => { const b = e.target.closest("button"); if(b) send(b.textContent); });

  // Sayfadaki diğer yerlerden (ana sayfa asistan bölümü) kullanmak için
  window.csrChat = {
    open,
    ask: async (text) => {
      await open();
      send(text);
    }
  };
}
