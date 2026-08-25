// ==========================================================
// KIMITEC — data & interactions
// ==========================================================

const STAGE_LABELS = {
  "vejetatif":     "Vejetatif Gelişim",
  "ciceklenme":    "Çiçeklenme",
  "meyve-tutumu":  "Meyve Tutumu",
  "irilesme":      "İrileşme & Kalite",
  "stres":         "Stres & Toparlanma"
};

let PRODUCTS = [];

// ---------------- Uygulama Takvimi referans verisi (ürün listesinden bağımsız) ----------------
// Bu liste sadece "hangi ürün hangi evrede" panelini beslemek için var;
// Ürünler bölümü (site üzerindeki asıl ürün kartları) tamamen Supabase'den geliyor.
const STAGE_REFERENCE = [
  { name: "GRENFORCE", teaser: "Bor, bakır, demir, mangan, molibden ve çinko içeren zengin mikro besin karışımı.", stages: ["vejetatif", "ciceklenme"] },
  { name: "FRUCTON", teaser: "Bor ve molibden kombinasyonu ile çiçek tozu canlılığını artırır, döllenmeyi destekler.", stages: ["ciceklenme", "meyve-tutumu", "irilesme"] },
  { name: "BOMBARDIER", teaser: "Bitkisel kaynaklı amino asitler ve organik maddeler ile stres koşullarına hızlı direnç.", stages: ["vejetatif", "ciceklenme", "meyve-tutumu", "stres"] },
  { name: "TOGGLE XL", teaser: "Sıvı deniz yosunu ve alginik asit ile kök gelişimi ve stres direnci.", stages: ["vejetatif", "ciceklenme", "meyve-tutumu", "irilesme", "stres"] },
  { name: "TERRA SORB FOLİAR", teaser: "%6 serbest amino asit ve %20 organik madde ile don, kuraklık ve sıcaklık stresine direnç.", stages: ["vejetatif", "ciceklenme", "meyve-tutumu", "stres"] },
  { name: "NUTRİMİN", teaser: "İkincil ve iz element katkılı organomineral yapı ile dengeli beslenme ve kök gelişimi.", stages: ["vejetatif", "ciceklenme", "irilesme"] },
  { name: "NUTRILOP ZnB", teaser: "Bor ve çinko içeriği ile çiçek tozu canlılığı, döllenme ve meyve tutumunda maksimum verim.", stages: ["ciceklenme", "meyve-tutumu"] },
  { name: "NUTRILOP Mg", teaser: "Yüksek magnezyum ve nitrat azotu ile klorofil sentezi ve fotosentez verimi.", stages: ["vejetatif", "irilesme"] },
  { name: "NUTRILOP BOR", teaser: "Bor etanol amin formülasyonu ile çiçek tozu canlılığı ve şekil bozukluklarının önlenmesi.", stages: ["ciceklenme", "meyve-tutumu"] },
  { name: "FERTİZYME -SP", teaser: "Zengin enzim ve organik bileşenlerle kök gelişimini tetikler, toprak biyolojisini canlandırır.", stages: ["vejetatif"] },
  { name: "CYTOKIN PLUS", teaser: "Alginik asit ve organik maddelerle hücre bölünmesi, meyve irileşmesi ve gelişim hızlanır.", stages: ["ciceklenme", "meyve-tutumu", "irilesme", "stres"] },
  { name: "BLACKJAK SC", teaser: "Yüksek hümik ve fulvik asit ile toprak yapısını düzenler, besin alımını maksimize eder.", stages: ["vejetatif", "stres"] },
  { name: "ALAMIN ZN", teaser: "Yüksek çinko ve serbest amino asit içeriği ile enzim aktivitesi ve köklenme desteği.", stages: ["vejetatif", "ciceklenme"] },
  { name: "ALAMIN CA", teaser: "Kalsiyum ve bor kombinasyonu ile hücre yapısı, meyve kalitesi ve raf ömrü artışı.", stages: ["meyve-tutumu", "irilesme"] },
  { name: "AGROLEAF POWER 20-20-20", teaser: "Dengeli NPK içeriği ile vejetatif gelişimi ve genel bitki sağlığını eş zamanlı destekler.", stages: ["vejetatif", "stres"] },
  { name: "AGROLEAF POWER 12-52-5", teaser: "Yüksek fosfor içeriğiyle kök gelişimini hızlandırır, çiçeklenme oranını artırır.", stages: ["vejetatif", "ciceklenme"] },
  { name: "AGROLEAF POWER 11-5-19+9(CaO)", teaser: "Yüksek kalsiyum, magnezyum ve potasyum ile hücre duvarını güçlendirir, raf ömrünü artırır.", stages: ["meyve-tutumu", "irilesme"] },
  { name: "CROP+EXTRA", teaser: "Zengin organik madde ve dengeli NPK içeriği ile döllenmeyi ve çiçek tutumunu düzenler.", stages: ["ciceklenme", "meyve-tutumu", "irilesme"] },
  { name: "ZN MN FOLİAR", teaser: "Yüksek çinko ve mangan ile enzim aktivitesini hızlandırır, sararmaları tedavi eder.", stages: ["vejetatif"] },
  { name: "MAX CUAJE", teaser: "Yüksek fosfor, bor ve molibden desteği ile çiçek dökümünü azaltır, meyve tutumunu artırır.", stages: ["ciceklenme", "meyve-tutumu"] },
  { name: "CALMAG", teaser: "Kalsiyum ve magnezyum ile hücre duvarını güçlendirir, fizyolojik bozuklukları önler.", stages: ["vejetatif", "meyve-tutumu", "irilesme"] },
  { name: "AMİNOQ", teaser: "Yüksek amino asit ve organik madde içeriği ile kök gelişimi ve bitki canlılığı desteği.", stages: ["vejetatif", "ciceklenme", "stres"] },
  { name: "CLEAN PRO", teaser: "pH regülatörü ve dezenfektan; ateş yanıklığı, dal kanseri gibi bakteriyel hastalıkları durdurur.", stages: ["vejetatif", "stres"] }
];

// ---------------- Count-up stats ----------------
function animateCount(el){
  const raw = el.textContent.trim();
  const match = raw.match(/(\d+)/);
  if(!match) return;
  const target = parseInt(match[1], 10);
  const prefix = raw.slice(0, match.index);
  const suffix = raw.slice(match.index + match[1].length);
  const duration = 1100;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.round(target * eased) + suffix;
    if(progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll(".hero__stats span").forEach(animateCount);

// ---------------- Scroll reveal ----------------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

function observeReveals(root = document){
  root.querySelectorAll(".reveal:not(.is-visible)").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
    revealObserver.observe(el);
  });
}
observeReveals();

// ---------------- Hero slider ----------------
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDots = Array.from(document.querySelectorAll(".hero-dot"));
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
let heroIndex = 0;
let heroTimer = null;

function goToHeroSlide(index){
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((s, i) => s.classList.toggle("is-active", i === heroIndex));
  heroDots.forEach((d, i) => d.classList.toggle("is-active", i === heroIndex));
}

function startHeroAutoplay(){
  stopHeroAutoplay();
  heroTimer = setInterval(() => goToHeroSlide(heroIndex + 1), 6000);
}
function stopHeroAutoplay(){
  if(heroTimer) clearInterval(heroTimer);
}

if(heroSlides.length){
  heroNext.addEventListener("click", () => { goToHeroSlide(heroIndex + 1); startHeroAutoplay(); });
  heroPrev.addEventListener("click", () => { goToHeroSlide(heroIndex - 1); startHeroAutoplay(); });
  heroDots.forEach(dot => dot.addEventListener("click", () => {
    goToHeroSlide(parseInt(dot.dataset.index, 10));
    startHeroAutoplay();
  }));
  const heroSection = document.getElementById("top");
  heroSection.addEventListener("mouseenter", stopHeroAutoplay);
  heroSection.addEventListener("mouseleave", startHeroAutoplay);
  startHeroAutoplay();
}

// ---------------- Nav toggle ----------------
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}));

// ---------------- Product grid ----------------
const productGrid = document.getElementById("productGrid");
const brandTabs = document.getElementById("brandTabs");
let activeBrand = "all";

function productCardHTML(p, i){
  const media = p.image
    ? `<div class="product-card__media"><img src="${p.image}" alt="${p.name}"></div>`
    : `<div class="product-card__media product-card__media--empty">🌿</div>`;
  return `
    <article class="product-card reveal" id="product-${i}">
      ${media}
      <button class="product-card__head" aria-expanded="false" data-index="${i}">
        <span>
          <p class="product-card__brand">${p.brand}${p.category ? ` <span class="product-card__category">· ${p.category}</span>` : ""}</p>
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__teaser">${p.teaser}</p>
        </span>
        <span class="product-card__toggle" aria-hidden="true">+</span>
      </button>
      <div class="product-card__body">
        <ul class="product-card__list">
          ${p.bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
      </div>
    </article>
  `;
}

function renderProducts(){
  const list = activeBrand === "all" ? PRODUCTS : PRODUCTS.filter(p => p.brand === activeBrand);
  productGrid.innerHTML = list.map((p, i) => productCardHTML(p, i)).join("");

  productGrid.querySelectorAll(".product-card__head").forEach(head => {
    head.addEventListener("click", () => {
      const card = head.closest(".product-card");
      const isOpen = card.classList.toggle("is-open");
      head.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  if(typeof observeReveals === "function") observeReveals(productGrid);
}
renderProducts();

brandTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".brand-tab");
  if(!btn) return;
  brandTabs.querySelectorAll(".brand-tab").forEach(t => t.classList.remove("is-active"));
  btn.classList.add("is-active");
  activeBrand = btn.dataset.brand;
  renderProducts();
});

// ---------------- Growth stage tabs ----------------
const stageTabs = document.getElementById("stageTabs");
const stagePanel = document.getElementById("stagePanel");

function renderStage(stageKey){
  const matches = STAGE_REFERENCE.filter(p => p.stages.includes(stageKey));
  stagePanel.innerHTML = matches.map(p => `
    <div class="stage-chip">
      <h4>${p.name}</h4>
      <p>${p.teaser}</p>
    </div>
  `).join("") || `<p style="color:rgba(255,255,255,.6)">Bu evre için ürün bulunamadı.</p>`;
}

stageTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".stage-tab");
  if(!btn) return;
  stageTabs.querySelectorAll(".stage-tab").forEach(t => {
    t.classList.remove("is-active");
    t.setAttribute("aria-selected", "false");
  });
  btn.classList.add("is-active");
  btn.setAttribute("aria-selected", "true");
  renderStage(btn.dataset.stage);
});

renderStage("vejetatif");

// ---------------- Misc ----------------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------- Ürünler (Supabase — tek kaynak) ----------------
const SUPABASE_URL = "https://xrzonxgaoanhoijloyag.supabase.co";
const SUPABASE_KEY = "sb_publishable_t_DLqABupEfr5goqtOW2JA_gwrFim-g";

const productsLoadingEl = document.getElementById("productsLoading");
const productsEmptyEl = document.getElementById("productsEmpty");
const statFormulasyon = document.getElementById("statFormulasyon");
const statMarka = document.getElementById("statMarka");

function updateProductStats(){
  if(!statFormulasyon || !statMarka) return;
  const brandCount = new Set(PRODUCTS.map(p => p.brand).filter(Boolean)).size;
  statFormulasyon.textContent = String(PRODUCTS.length);
  statMarka.textContent = String(brandCount);
  animateCount(statFormulasyon);
  animateCount(statMarka);
}

async function loadSupabaseProducts(){
  if(!window.supabase){
    if(productsLoadingEl) productsLoadingEl.hidden = true;
    if(productsEmptyEl) productsEmptyEl.hidden = false;
    return;
  }
  try{
    const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data, error } = await sbClient.from("product").select("*").order("created_at", { ascending: false });

    if(productsLoadingEl) productsLoadingEl.hidden = true;

    if(error || !data || !data.length){
      if(productsEmptyEl) productsEmptyEl.hidden = false;
      updateProductStats();
      return;
    }

    const mapped = data.map(row => {
      const desc = (row.description || "").trim();
      const lines = desc.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const firstLine = lines[0] || "";
      return {
        name: row.name || "İsimsiz Ürün",
        brand: row.brand || "KIMITEC",
        category: row.category || "",
        image: row.img_url || null,
        teaser: firstLine.length > 120 ? firstLine.slice(0, 117) + "…" : firstLine,
        stages: [],
        bullets: lines.length ? lines : []
      };
    });

    PRODUCTS.push(...mapped);
    renderProducts();
    updateProductStats();
  } catch(e){
    if(productsLoadingEl) productsLoadingEl.hidden = true;
    if(productsEmptyEl) productsEmptyEl.hidden = false;
    updateProductStats();
  }
}
loadSupabaseProducts();

// ---------------- Blog yazıları (Supabase) ----------------
const blogGrid = document.getElementById("blogGrid");
const blogLoading = document.getElementById("blogLoading");
const blogEmpty = document.getElementById("blogEmpty");
const BLOG_ICONS = ["leaf", "amber", "soil"];
const BLOG_EMOJIS = ["🌱", "🌾", "💧"];

function formatBlogDate(iso){
  try{
    const d = new Date(iso);
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
  } catch(e){
    return "";
  }
}

function blogCardHTML(post, i){
  const iconClass = BLOG_ICONS[i % BLOG_ICONS.length];
  const emoji = BLOG_EMOJIS[i % BLOG_EMOJIS.length];
  const media = post.image_url
    ? `<div class="blog-card__media"><img src="${post.image_url}" alt="${post.title || ""}"></div>`
    : `<div class="blog-card__icon blog-card__icon--${iconClass}" aria-hidden="true">${emoji}</div>`;

  const contentLines = (post.content || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  return `
    <article class="blog-card reveal" data-index="${i}">
      ${media}
      <p class="blog-card__meta">
        ${post.category ? `<span class="blog-card__tag">${post.category}</span>` : ""}
        <span class="blog-card__date">${formatBlogDate(post.created_at)}</span>
      </p>
      <h3>${post.title || "İsimsiz Yazı"}</h3>
      <p>${post.excerpt || ""}</p>
      ${contentLines.length ? `
        <button type="button" class="blog-card__link" data-blog-toggle="${i}">Devamını Oku →</button>
        <div class="blog-card__body">
          ${contentLines.map(l => `<p>${l}</p>`).join("")}
        </div>
      ` : ""}
    </article>
  `;
}

async function loadSupabaseBlogPosts(){
  if(!window.supabase){
    blogLoading.hidden = true;
    blogEmpty.hidden = false;
    return;
  }
  try{
    const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data, error } = await sbClient.from("blog_post").select("*").order("created_at", { ascending: false });

    blogLoading.hidden = true;

    if(error || !data || !data.length){
      blogEmpty.hidden = false;
      return;
    }

    blogGrid.innerHTML = data.map((post, i) => blogCardHTML(post, i)).join("");

    blogGrid.querySelectorAll("[data-blog-toggle]").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest(".blog-card").classList.toggle("is-open");
      });
    });

    if(typeof observeReveals === "function") observeReveals(blogGrid);
  } catch(e){
    blogLoading.hidden = true;
    blogEmpty.hidden = false;
  }
}
loadSupabaseBlogPosts();
