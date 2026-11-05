// ==========================================================
// Ana sayfa
// ==========================================================

// Slider, referans ve yorumlar admin panelinden (Slider / Referans / Yorum sekmesi) yönetilir.
// Panelde hiç kayıt yoksa 3 boş slayt ve 5 boş referans kutusu görünür.
const EMPTY_SLIDES = 3, EMPTY_REFS = 5;

const PAGE_SIZE = 10;

renderLayout("home");

// Logolar ve ikonlar
$("#aboutLogo").innerHTML = LOGO_HTML;
$("#reviewsLogo").innerHTML = LOGO_HTML;
$("#aboutEyebrow").insertAdjacentHTML("afterbegin", ICON.leaf);
$$("#aboutFeatures [data-i]").forEach(el => el.insertAdjacentHTML("afterbegin", ICON[el.dataset.i]));
$("#ctaBtn").insertAdjacentHTML("beforeend", ICON.arrowR);
$("#heroPrev").innerHTML = ICON.chevL;
$("#heroNext").innerHTML = ICON.chevR;
$("#revPrev").innerHTML = ICON.chevL;
$("#revNext").innerHTML = ICON.chevR;

// ---------------- Site içeriği (Supabase: site_item) ----------------
async function getSiteItems(){
  const c = sb();
  if(!c) return [];
  try{
    // Onaylanmamış ziyaretçi yorumları gelmesin (approved sütunu yoksa eski sorguya dön)
    let res = await c.from("site_item").select("*").eq("approved", true).order("sort_order").order("created_at");
    if(res.error) res = await c.from("site_item").select("*").order("sort_order").order("created_at");
    return res.error || !res.data ? [] : res.data;
  } catch(e){ return []; }
}

const wrapLink = (link, inner, cls) => link
  ? `<a class="${cls}" href="${esc(link)}"${/^https?:/i.test(link) ? ' target="_blank" rel="noopener"' : ""}>${inner}</a>`
  : `<div class="${cls}">${inner}</div>`;

// ---------------- Slider ----------------
let sliderTimer;
function renderSlider(slides){
  const list = slides.length ? slides : Array.from({ length: EMPTY_SLIDES }, () => ({}));
  const track = $("#heroTrack"), dots = $("#heroDots");
  track.innerHTML = list.map(s => s.img_url
    ? wrapLink(s.link, "", "hero__slide").replace('class="hero__slide"', `class="hero__slide hero__slide--img" style="--img:url('${esc(s.img_url)}')"`)
    : `<div class="hero__slide"></div>`).join("");
  dots.innerHTML = list.map((_, i) => `<button aria-label="Slayt ${i + 1}"></button>`).join("");
  const multi = list.length > 1;
  $("#heroPrev").classList.toggle("hidden", !multi);
  $("#heroNext").classList.toggle("hidden", !multi);
  dots.classList.toggle("hidden", !multi);
  let i = 0;
  const go = (n) => {
    i = (n + list.length) % list.length;
    track.style.transform = `translateX(-${i * 100}%)`;
    $$("button", dots).forEach((d, k) => d.classList.toggle("active", k === i));
  };
  const auto = () => { clearInterval(sliderTimer); if(multi) sliderTimer = setInterval(() => go(i + 1), 5000); };
  $("#heroPrev").onclick = () => { go(i - 1); auto(); };
  $("#heroNext").onclick = () => { go(i + 1); auto(); };
  $$("button", dots).forEach((d, k) => d.onclick = () => { go(k); auto(); });
  go(0); auto();
}

// ---------------- Referanslar ----------------
function renderRefs(refs){
  const list = refs.length ? refs : Array.from({ length: EMPTY_REFS }, () => ({}));
  // Logoya tıklanınca o markanın ürünleri filtrelenir (admin'de özel link verilmediyse)
  $("#refsTrack").innerHTML = list.map(r => wrapLink(r.link || (r.title ? brandUrl(r.title) : ""),
    r.img_url ? `<img src="${esc(r.img_url)}" alt="${esc(r.title || "Referans logosu")}" loading="lazy">` : "",
    r.img_url ? "refs__item" : "refs__item refs__item--empty")).join("");
}

// ---------------- Yorumlar ----------------
let reviewTimer;
function renderReviews(reviews){
  const card = $("#reviewCard");
  const multi = reviews.length > 1;
  $("#revPrev").classList.toggle("hidden", !multi);
  $("#revNext").classList.toggle("hidden", !multi);
  if(!reviews.length){ card.innerHTML = `<p>Henüz yorum eklenmedi.</p>`; return; }
  let i = 0;
  const show = () => {
    const r = reviews[i];
    card.innerHTML = `
      <div class="review__avatar">${esc((r.title || "?").charAt(0).toLocaleUpperCase("tr-TR"))}</div>
      <h4>${esc(r.title)}</h4>
      ${r.item_date ? `<time>${formatDate(r.item_date)}</time>` : ""}
      <div class="review__stars">${"★".repeat(r.stars || 5)}</div>
      <p>${esc(r.body)}</p>`;
  };
  $("#revPrev").onclick = () => { i = (i - 1 + reviews.length) % reviews.length; show(); };
  $("#revNext").onclick = () => { i = (i + 1) % reviews.length; show(); };
  show();
  clearInterval(reviewTimer);
  if(multi) reviewTimer = setInterval(() => $("#revNext").click(), 7000);
}

renderSlider([]); renderRefs([]); renderReviews([]);
getSiteItems().then(items => {
  renderSlider(items.filter(x => x.kind === "slide" && x.img_url));
  renderRefs(items.filter(x => x.kind === "reference"));
  renderReviews(items.filter(x => x.kind === "review" && x.body));
});

// ---------------- Ürünler + filtre ----------------
const state = { cats: new Set(), brands: new Set(), q: "", shown: PAGE_SIZE };
let ALL = [];

// Linkteki marka adı ürünlerdeki yazımla birebir olmayabilir (büyük/küçük harf, boşluk)
function matchName(name, list){
  const n = trLower(name).replace(/\s+/g, "");
  if(!n) return "";
  const hit = list.find(x => trLower(x).replace(/\s+/g, "") === n)
           || list.find(x => { const k = trLower(x).replace(/\s+/g, ""); return k.includes(n) || n.includes(k); });
  return hit || name;
}

function readUrl(){
  const sp = new URLSearchParams(location.search);
  const brands = [...new Set(ALL.map(p => p.brand).filter(Boolean))];
  const cats = [...new Set(ALL.flatMap(p => p.categories))];
  state.cats = new Set(sp.get("kategori") ? [matchName(sp.get("kategori"), cats)] : []);
  state.brands = new Set(sp.get("marka") ? [matchName(sp.get("marka"), brands)] : []);
  state.q = sp.get("q") || "";
  state.shown = PAGE_SIZE;
  $$("#filter input[data-cat]").forEach(cb => cb.checked = state.cats.has(cb.value));
  $$("#filter input[data-brand]").forEach(cb => cb.checked = state.brands.has(cb.value));
}

function filtered(){
  return ALL.filter(p =>
    (!state.cats.size || p.categories.some(c => state.cats.has(c))) &&
    (!state.brands.size || state.brands.has(p.brand)) &&
    productMatches(p, state.q)
  );
}

function renderGrid(){
  const list = filtered();
  const grid = $("#productGrid");
  grid.removeAttribute("data-prerendered");
  grid.innerHTML = list.length
    ? list.slice(0, state.shown).map(productCardHTML).join("")
    : `<div class="empty">${ALL.length ? "Seçtiğiniz filtrelere uygun ürün bulunamadı." : "Henüz ürün eklenmedi."}</div>`;
  $("#loadMore").classList.toggle("hidden", list.length <= state.shown);
  $("#resultCount").textContent = list.length ? `${Math.min(state.shown, list.length)} / ${list.length} ürün gösteriliyor` : "";

  const chips = [
    ...[...state.cats].map(c => ({ type: "cat", v: c })),
    ...[...state.brands].map(b => ({ type: "brand", v: b })),
    ...(state.q ? [{ type: "q", v: state.q }] : [])
  ];
  $("#chips").innerHTML = chips.map(c =>
    `<button type="button" class="chip" data-type="${c.type}" data-v="${esc(c.v)}">${c.type === "q" ? "Arama: " : ""}${esc(c.v)} ✕</button>`).join("");
}

function checkboxes(items, attr){
  return items.map(c => `<label><input type="checkbox" ${attr} value="${esc(c.name)}"> ${esc(c.name)} <small>${c.count}</small></label>`).join("");
}

getProducts().then(products => {
  // Supabase'e ulaşılamazsa önceden üretilmiş ürün listesi kalsın
  if(!products.length && $("#productGrid").dataset.prerendered) return;
  ALL = products;
  const cats = categoriesOf(products), brands = brandsOf(products);
  $("#filterCats").innerHTML = checkboxes(cats, "data-cat");
  $("#filterBrands").innerHTML = checkboxes(brands, "data-brand");
  // Ürünlerde kategori/marka girilmemişse o grup gizlenir
  $("#filterCats").closest(".filter__group").classList.toggle("hidden", !cats.length);
  $("#brandGroup").classList.toggle("hidden", !brands.length);
  readUrl();
  renderGrid();
});

$("#filter").addEventListener("change", (e) => {
  const cb = e.target;
  if(!cb.matches("input[type=checkbox]")) return;
  const set = cb.hasAttribute("data-cat") ? state.cats : state.brands;
  cb.checked ? set.add(cb.value) : set.delete(cb.value);
  state.shown = PAGE_SIZE;
  renderGrid();
});

$("#chips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if(!chip) return;
  const { type, v } = chip.dataset;
  if(type === "cat") state.cats.delete(v);
  if(type === "brand") state.brands.delete(v);
  if(type === "q"){ state.q = ""; $("#searchInput").value = ""; }
  $$("#filter input").forEach(cb => {
    if(cb.value === v && ((type === "cat" && cb.dataset.cat !== undefined) || (type === "brand" && cb.dataset.brand !== undefined))) cb.checked = false;
  });
  state.shown = PAGE_SIZE;
  renderGrid();
});

$("#filterClear").onclick = () => {
  state.cats.clear(); state.brands.clear(); state.q = ""; state.shown = PAGE_SIZE;
  $("#searchInput").value = "";
  $$("#filter input").forEach(cb => cb.checked = false);
  history.replaceState(null, "", "index.html#urunler");
  renderGrid();
};

$("#loadMore").onclick = () => { state.shown += PAGE_SIZE; renderGrid(); };
$("#filterToggle").onclick = () => $("#filter").classList.toggle("open");

// Menüdeki kategori linkleri ve header araması aynı sayfadayken
window.addEventListener("filters:url", () => { readUrl(); renderGrid(); });
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="index.html?kategori="], a[href^="index.html?marka="]');
  if(!a) return;
  e.preventDefault();
  history.replaceState(null, "", a.getAttribute("href"));
  readUrl(); renderGrid();
  $("#nav").classList.remove("open");
  $("#urunler").scrollIntoView({ behavior: "smooth" });
});

// ---------------- Yorum ekle (ziyaretçi) ----------------
// Gönderilen yorum admin panelde onaylanınca sitede görünür.
(function reviewForm(){
  const box = $("#yorumlar .reviews__box");
  if(!box) return;
  box.insertAdjacentHTML("afterend", `
    <div class="review-add">
      <button type="button" class="btn btn--green" id="reviewOpen">${ICON.star} Yorum Yap</button>
      <form class="review-form hidden" id="reviewForm" novalidate>
        <label>Adınız Soyadınız *<input type="text" name="name" maxlength="60" required placeholder="Örn. Ahmet Y."></label>
        <div class="review-form__stars" role="radiogroup" aria-label="Puanınız">
          ${[1, 2, 3, 4, 5].map(n => `<button type="button" data-star="${n}" aria-label="${n} yıldız">${ICON.star}</button>`).join("")}
        </div>
        <label>Yorumunuz *<textarea name="body" maxlength="600" required placeholder="Deneyiminizi paylaşın"></textarea></label>
        <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="review-form__actions">
          <button type="submit" class="btn btn--green">Gönder</button>
          <button type="button" class="btn btn--outline" id="reviewCancel">Vazgeç</button>
        </div>
        <p class="review-form__note">Yorumunuz onaylandıktan sonra yayınlanır.</p>
      </form>
    </div>`);

  const form = $("#reviewForm");
  let stars = 5;
  const paint = () => $$("[data-star]", form).forEach(b => b.classList.toggle("on", Number(b.dataset.star) <= stars));
  paint();
  $(".review-form__stars", form).addEventListener("click", (e) => {
    const b = e.target.closest("[data-star]");
    if(b){ stars = Number(b.dataset.star); paint(); }
  });
  $("#reviewOpen").onclick = () => { form.classList.remove("hidden"); $("#reviewOpen").classList.add("hidden"); form.elements.name.focus(); };
  $("#reviewCancel").onclick = () => { form.classList.add("hidden"); $("#reviewOpen").classList.remove("hidden"); };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if(form.elements.website.value) return;                       // bot tuzağı
    const name = form.elements.name.value.trim();
    const body = form.elements.body.value.trim();
    if(name.length < 2 || body.length < 5){ toast("Lütfen adınızı ve yorumunuzu yazın."); return; }
    let last = 0;
    try { last = Number(localStorage.getItem("csr_review_at") || 0); } catch(err){}
    if(Date.now() - last < 60 * 60e3){ toast("Kısa süre önce yorum gönderdiniz, teşekkürler!"); return; }

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    const c = sb();
    const { error } = c
      ? await c.from("site_item").insert([{ kind: "review", title: name, body, stars, item_date: new Date().toISOString().slice(0, 10), approved: false, sort_order: 0 }])
      : { error: true };
    btn.disabled = false;
    if(error){ toast("Yorum gönderilemedi, lütfen daha sonra tekrar deneyin."); return; }
    try { localStorage.setItem("csr_review_at", String(Date.now())); } catch(err){}
    form.reset(); stars = 5; paint();
    form.classList.add("hidden");
    $("#reviewOpen").classList.remove("hidden");
    toast("Teşekkürler! Yorumunuz onaylandıktan sonra yayınlanacak.");
  });
})();

// ---------------- Blog (son 3 yazı) ----------------
getPosts().then(posts => {
  $("#homeBlog").innerHTML = posts.length
    ? posts.slice(0, 3).map(postCardHTML).join("")
    : `<div class="empty">Henüz yazı eklenmedi.</div>`;
});

// ---------------- Dijital asistan bölümü ----------------
$("#assistBadge").innerHTML = LOGO_MARK;
// Hazır konular sohbet penceresiyle aynı (js/config.js > CHAT_SUGGESTIONS)
$("#assistChips").innerHTML = CHAT_SUGGESTIONS.map(t => `<button type="button">${esc(t)}</button>`).join("");
$("#assistForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = $("#assistInput").value.trim();
  if(!q){ window.csrChat.open(); return; }
  $("#assistInput").value = "";
  window.csrChat.ask(q);
});
$("#assistChips").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if(b) window.csrChat.ask(b.textContent);
});
