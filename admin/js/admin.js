// ==========================================================
// KIMITEC — Admin Panel
// ==========================================================
//
// AYAR: Aşağıdaki iki değeri kendi Supabase projenden al.
// Project URL:  Supabase Dashboard > Project Settings > API > Project URL
// Publishable/anon key: aynı sayfada "Publishable key" veya "anon public" alanı
//
// ÖNEMLİ: Buraya SADECE publishable/anon key yapıştırılır.
// "sb_secret_..." ile başlayan Secret key ASLA bu dosyaya veya
// herhangi bir tarayıcı tarafı (frontend) dosyaya yazılmaz —
// o anahtar RLS'i tamamen bypass eder ve herkes tarafından görülebilir hale gelir.
// ==========================================================
const SUPABASE_URL = "https://xrzonxgaoanhoijloyag.supabase.co";
const SUPABASE_KEY = "sb_publishable_t_DLqABupEfr5goqtOW2JA_gwrFim-g";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const BUCKET = "product-images";

// ---------------- DOM refs ----------------
const loginView = document.getElementById("loginView");
const dashboardView = document.getElementById("dashboardView");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const loginBtn = document.getElementById("loginBtn");
const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

const productForm = document.getElementById("productForm");
const productId = document.getElementById("productId");
const fieldName = document.getElementById("fieldName");
const fieldBrand = document.getElementById("fieldBrand");
const fieldCategory = document.getElementById("fieldCategory");
const fieldDescription = document.getElementById("fieldDescription");
const fieldImageFile = document.getElementById("fieldImageFile");
const fieldActive = document.getElementById("fieldActive");
const fieldFormulation = document.getElementById("fieldFormulation");
const fieldCrops = document.getElementById("fieldCrops");
const fieldPests = document.getElementById("fieldPests");
const fieldPdfFile = document.getElementById("fieldPdfFile");
const fieldPdfUrl = document.getElementById("fieldPdfUrl");
const fieldImgUrl = document.getElementById("fieldImgUrl");
const imagePreview = document.getElementById("imagePreview");
const imagePreviewImg = document.getElementById("imagePreviewImg");
const imagePreviewName = document.getElementById("imagePreviewName");
const formTitle = document.getElementById("formTitle");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const productTable = document.getElementById("productTable");
const productTableBody = document.getElementById("productTableBody");
const productCount = document.getElementById("productCount");
const listLoading = document.getElementById("listLoading");
const listEmpty = document.getElementById("listEmpty");
const refreshBtn = document.getElementById("refreshBtn");

// ---------------- Auth ----------------
function showDashboard(session){
  loginView.hidden = true;
  dashboardView.hidden = false;
  userEmail.textContent = session?.user?.email || "";
  loadProducts();
  loadBlogPosts();
  loadSiteItems();
}
function showLogin(){
  loginView.hidden = false;
  dashboardView.hidden = true;
}

async function initAuth(){
  const { data } = await sb.auth.getSession();
  if(data.session){
    showDashboard(data.session);
  } else {
    showLogin();
  }
}

sb.auth.onAuthStateChange((event, session) => {
  if(event === "SIGNED_IN" && session){
    showDashboard(session);
  } else if(event === "SIGNED_OUT"){
    showLogin();
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.hidden = true;
  loginBtn.disabled = true;
  loginBtn.textContent = "Giriş yapılıyor...";

  const { error } = await sb.auth.signInWithPassword({
    email: loginEmail.value.trim(),
    password: loginPassword.value
  });

  loginBtn.disabled = false;
  loginBtn.textContent = "Giriş Yap";

  if(error){
    loginError.textContent = "Giriş başarısız: e-posta veya şifre hatalı.";
    loginError.hidden = false;
  }
});

logoutBtn.addEventListener("click", async () => {
  await sb.auth.signOut();
});

// ---------------- Image preview ----------------
fieldImageFile.addEventListener("change", () => {
  const file = fieldImageFile.files[0];
  if(!file){
    imagePreview.hidden = true;
    return;
  }
  imagePreviewImg.src = URL.createObjectURL(file);
  imagePreviewName.textContent = file.name;
  imagePreview.hidden = false;
});

// ---------------- Form reset / edit mode ----------------
function resetForm(){
  productForm.reset();
  productId.value = "";
  imagePreview.hidden = true;
  formTitle.textContent = "Yeni Ürün Ekle";
  submitBtn.textContent = "Ürünü Kaydet";
  cancelEditBtn.hidden = true;
  formError.hidden = true;
  formSuccess.hidden = true;
}

cancelEditBtn.addEventListener("click", resetForm);

function fillFormForEdit(product){
  productId.value = product.id;
  fieldName.value = product.name || "";
  fieldBrand.value = product.brand || "";
  fieldCategory.value = product.category || "";
  fieldDescription.value = product.description || "";
  fieldImgUrl.value = product.img_url || "";
  fieldImageFile.value = "";
  fieldActive.value = product.active_ingredient || "";
  fieldFormulation.value = product.formulation || "";
  fieldCrops.value = product.target_crops || "";
  fieldPests.value = product.target_pests || "";
  fieldPdfUrl.value = product.pdf_url || "";
  fieldPdfFile.value = "";
  if(product.img_url){
    imagePreviewImg.src = product.img_url;
    imagePreviewName.textContent = "Mevcut görsel";
    imagePreview.hidden = false;
  } else {
    imagePreview.hidden = true;
  }
  formTitle.textContent = "Ürünü Düzenle";
  submitBtn.textContent = "Değişiklikleri Kaydet";
  cancelEditBtn.hidden = false;
  formError.hidden = true;
  formSuccess.hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------------- Save (insert / update) ----------------
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formError.hidden = true;
  formSuccess.hidden = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "Kaydediliyor...";

  try {
    let imgUrl = fieldImgUrl.value.trim();

    const file = fieldImageFile.files[0];
    if(file){
      const path = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const { error: uploadError } = await sb.storage.from(BUCKET).upload(path, file);
      if(uploadError) throw uploadError;
      const { data: publicData } = sb.storage.from(BUCKET).getPublicUrl(path);
      imgUrl = publicData.publicUrl;
    }

    let pdfUrl = fieldPdfUrl.value.trim();
    const pdfFile = fieldPdfFile.files[0];
    if(pdfFile){
      const pdfPath = `pdf/${Date.now()}_${pdfFile.name.replace(/\s+/g, "_")}`;
      const { error: pdfError } = await sb.storage.from(BUCKET).upload(pdfPath, pdfFile, { contentType: "application/pdf" });
      if(pdfError) throw pdfError;
      pdfUrl = sb.storage.from(BUCKET).getPublicUrl(pdfPath).data.publicUrl;
    }

    const payload = {
      name: fieldName.value.trim(),
      brand: fieldBrand.value.trim(),
      category: fieldCategory.value.trim(),
      description: fieldDescription.value.trim(),
      img_url: imgUrl,
      active_ingredient: fieldActive.value.trim(),
      formulation: fieldFormulation.value.trim(),
      target_crops: fieldCrops.value.trim(),
      target_pests: fieldPests.value.trim(),
      pdf_url: pdfUrl
    };

    let error;
    if(productId.value){
      ({ error } = await sb.from("product").update(payload).eq("id", productId.value));
    } else {
      ({ error } = await sb.from("product").insert([payload]));
    }
    if(error) throw error;

    formSuccess.textContent = productId.value ? "Ürün güncellendi." : "Ürün eklendi.";
    formSuccess.hidden = false;
    resetFormKeepMessage();
    loadProducts();
  } catch(err){
    formError.textContent = "Hata: " + friendlyError(err);
    formError.hidden = false;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = productId.value ? "Değişiklikleri Kaydet" : "Ürünü Kaydet";
  }
});

function resetFormKeepMessage(){
  const msg = formSuccess.textContent;
  productForm.reset();
  productId.value = "";
  imagePreview.hidden = true;
  formTitle.textContent = "Yeni Ürün Ekle";
  submitBtn.textContent = "Ürünü Kaydet";
  cancelEditBtn.hidden = true;
  formSuccess.textContent = msg;
  formSuccess.hidden = false;
}

// ---------------- List / delete ----------------
async function loadProducts(){
  listLoading.hidden = false;
  listEmpty.hidden = true;
  productTable.hidden = true;

  const { data, error } = await sb.from("product").select("*").order("created_at", { ascending: false });

  listLoading.hidden = true;

  if(error){
    listEmpty.textContent = "Ürünler yüklenemedi: " + error.message;
    listEmpty.hidden = false;
    return;
  }

  productCount.textContent = data.length ? `(${data.length})` : "";

  if(!data.length){
    listEmpty.hidden = false;
    return;
  }

  productTableBody.innerHTML = data.map(p => `
    <tr>
      <td>${p.img_url
        ? `<img class="admin-table__thumb" src="${escapeHtml(p.img_url)}" alt="">`
        : `<span class="admin-table__thumb--empty">🌿</span>`}</td>
      <td>${escapeHtml(p.name || "")}</td>
      <td>${escapeHtml(p.brand || "")}</td>
      <td>${escapeHtml(p.category || "")}</td>
      <td>
        <div class="admin-table__actions">
          <button type="button" data-edit="${p.id}">Düzenle</button>
          <button type="button" data-delete="${p.id}" class="is-danger">Sil</button>
        </div>
      </td>
    </tr>
  `).join("");

  productTable.hidden = false;

  productTableBody.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = data.find(p => String(p.id) === btn.dataset.edit);
      if(product) fillFormForEdit(product);
    });
  });
  productTableBody.querySelectorAll("[data-delete]").forEach(btn => {
    btn.addEventListener("click", () => handleDelete(btn.dataset.delete));
  });
}

async function handleDelete(id){
  if(!confirm("Bu ürünü silmek istediğine emin misin?")) return;
  const { error } = await sb.from("product").delete().eq("id", id);
  if(error){
    alert("Silinemedi: " + error.message);
    return;
  }
  loadProducts();
}

refreshBtn.addEventListener("click", loadProducts);

// Eksik sütun / tablo hatalarını anlaşılır göster
function friendlyError(err){
  const m = (err && err.message) || "Bilinmeyen bir hata oluştu.";
  if(/column|schema cache|relation|does not exist|Could not find/i.test(m)){
    return m + " — Supabase'de supabase-kurulum.sql dosyasını çalıştırdın mı?";
  }
  return m;
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------------- Sekme geçişi (Ürünler / Blog) ----------------
const adminTabs = document.getElementById("adminTabs");
const tabProducts = document.getElementById("tabProducts");
const tabBlog = document.getElementById("tabBlog");

adminTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".admin-tab");
  if(!btn) return;
  adminTabs.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("is-active"));
  btn.classList.add("is-active");
  tabProducts.hidden = btn.dataset.tab !== "products";
  tabBlog.hidden = btn.dataset.tab !== "blog";
  document.getElementById("tabSite").hidden = btn.dataset.tab !== "site";
});

// ==========================================================
// BLOG YAZILARI
// ==========================================================
const BLOG_BUCKET = "product-images"; // aynı bucket, farklı dosya adlarıyla kullanılıyor

const blogForm = document.getElementById("blogForm");
const blogId = document.getElementById("blogId");
const blogFieldTitle = document.getElementById("blogFieldTitle");
const blogFieldCategory = document.getElementById("blogFieldCategory");
const blogFieldExcerpt = document.getElementById("blogFieldExcerpt");
const blogFieldContent = document.getElementById("blogFieldContent");
const blogFieldImageFile = document.getElementById("blogFieldImageFile");
const blogFieldImgUrl = document.getElementById("blogFieldImgUrl");
const blogImagePreview = document.getElementById("blogImagePreview");
const blogImagePreviewImg = document.getElementById("blogImagePreviewImg");
const blogImagePreviewName = document.getElementById("blogImagePreviewName");
const blogFormTitle = document.getElementById("blogFormTitle");
const blogFormError = document.getElementById("blogFormError");
const blogFormSuccess = document.getElementById("blogFormSuccess");
const blogSubmitBtn = document.getElementById("blogSubmitBtn");
const blogCancelEditBtn = document.getElementById("blogCancelEditBtn");

const blogTable = document.getElementById("blogTable");
const blogTableBody = document.getElementById("blogTableBody");
const blogCount = document.getElementById("blogCount");
const blogListLoading = document.getElementById("blogListLoading");
const blogListEmpty = document.getElementById("blogListEmpty");
const blogRefreshBtn = document.getElementById("blogRefreshBtn");

blogFieldImageFile.addEventListener("change", () => {
  const file = blogFieldImageFile.files[0];
  if(!file){
    blogImagePreview.hidden = true;
    return;
  }
  blogImagePreviewImg.src = URL.createObjectURL(file);
  blogImagePreviewName.textContent = file.name;
  blogImagePreview.hidden = false;
});

function resetBlogForm(){
  blogForm.reset();
  blogId.value = "";
  blogImagePreview.hidden = true;
  blogFormTitle.textContent = "Yeni Yazı Ekle";
  blogSubmitBtn.textContent = "Yazıyı Kaydet";
  blogCancelEditBtn.hidden = true;
  blogFormError.hidden = true;
  blogFormSuccess.hidden = true;
}
blogCancelEditBtn.addEventListener("click", resetBlogForm);

function fillBlogFormForEdit(post){
  blogId.value = post.id;
  blogFieldTitle.value = post.title || "";
  blogFieldCategory.value = post.category || "";
  blogFieldExcerpt.value = post.excerpt || "";
  blogFieldContent.value = post.content || "";
  blogFieldImgUrl.value = post.image_url || "";
  blogFieldImageFile.value = "";
  if(post.image_url){
    blogImagePreviewImg.src = post.image_url;
    blogImagePreviewName.textContent = "Mevcut görsel";
    blogImagePreview.hidden = false;
  } else {
    blogImagePreview.hidden = true;
  }
  blogFormTitle.textContent = "Yazıyı Düzenle";
  blogSubmitBtn.textContent = "Değişiklikleri Kaydet";
  blogCancelEditBtn.hidden = false;
  blogFormError.hidden = true;
  blogFormSuccess.hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  blogFormError.hidden = true;
  blogFormSuccess.hidden = true;
  blogSubmitBtn.disabled = true;
  blogSubmitBtn.textContent = "Kaydediliyor...";

  try {
    let imgUrl = blogFieldImgUrl.value.trim();

    const file = blogFieldImageFile.files[0];
    if(file){
      const path = `blog_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const { error: uploadError } = await sb.storage.from(BLOG_BUCKET).upload(path, file);
      if(uploadError) throw uploadError;
      const { data: publicData } = sb.storage.from(BLOG_BUCKET).getPublicUrl(path);
      imgUrl = publicData.publicUrl;
    }

    const payload = {
      title: blogFieldTitle.value.trim(),
      category: blogFieldCategory.value.trim(),
      excerpt: blogFieldExcerpt.value.trim(),
      content: blogFieldContent.value.trim(),
      image_url: imgUrl
    };

    let error;
    if(blogId.value){
      ({ error } = await sb.from("blog_post").update(payload).eq("id", blogId.value));
    } else {
      ({ error } = await sb.from("blog_post").insert([payload]));
    }
    if(error) throw error;

    blogFormSuccess.textContent = blogId.value ? "Yazı güncellendi." : "Yazı eklendi.";
    blogFormSuccess.hidden = false;
    resetBlogFormKeepMessage();
    loadBlogPosts();
  } catch(err){
    blogFormError.textContent = "Hata: " + (err.message || "Bilinmeyen bir hata oluştu.");
    blogFormError.hidden = false;
  } finally {
    blogSubmitBtn.disabled = false;
    blogSubmitBtn.textContent = blogId.value ? "Değişiklikleri Kaydet" : "Yazıyı Kaydet";
  }
});

function resetBlogFormKeepMessage(){
  const msg = blogFormSuccess.textContent;
  blogForm.reset();
  blogId.value = "";
  blogImagePreview.hidden = true;
  blogFormTitle.textContent = "Yeni Yazı Ekle";
  blogSubmitBtn.textContent = "Yazıyı Kaydet";
  blogCancelEditBtn.hidden = true;
  blogFormSuccess.textContent = msg;
  blogFormSuccess.hidden = false;
}

async function loadBlogPosts(){
  blogListLoading.hidden = false;
  blogListEmpty.hidden = true;
  blogTable.hidden = true;

  const { data, error } = await sb.from("blog_post").select("*").order("created_at", { ascending: false });

  blogListLoading.hidden = true;

  if(error){
    blogListEmpty.textContent = "Yazılar yüklenemedi: " + error.message;
    blogListEmpty.hidden = false;
    return;
  }

  blogCount.textContent = data.length ? `(${data.length})` : "";

  if(!data.length){
    blogListEmpty.hidden = false;
    return;
  }

  blogTableBody.innerHTML = data.map(p => `
    <tr>
      <td>${p.image_url
        ? `<img class="admin-table__thumb" src="${escapeHtml(p.image_url)}" alt="">`
        : `<span class="admin-table__thumb--empty">📝</span>`}</td>
      <td>${escapeHtml(p.title || "")}</td>
      <td>${escapeHtml(p.category || "")}</td>
      <td>
        <div class="admin-table__actions">
          <button type="button" data-blog-edit="${p.id}">Düzenle</button>
          <button type="button" data-blog-delete="${p.id}" class="is-danger">Sil</button>
        </div>
      </td>
    </tr>
  `).join("");

  blogTable.hidden = false;

  blogTableBody.querySelectorAll("[data-blog-edit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const post = data.find(p => String(p.id) === btn.dataset.blogEdit);
      if(post) fillBlogFormForEdit(post);
    });
  });
  blogTableBody.querySelectorAll("[data-blog-delete]").forEach(btn => {
    btn.addEventListener("click", () => handleBlogDelete(btn.dataset.blogDelete));
  });
}

async function handleBlogDelete(id){
  if(!confirm("Bu yazıyı silmek istediğine emin misin?")) return;
  const { error } = await sb.from("blog_post").delete().eq("id", id);
  if(error){
    alert("Silinemedi: " + error.message);
    return;
  }
  loadBlogPosts();
}

blogRefreshBtn.addEventListener("click", loadBlogPosts);

// ---------------- Boot ----------------
initAuth();

// ==========================================================
// SLIDER / REFERANS / YORUM  (tablo: site_item)
// ==========================================================
const SITE_KIND_LABEL = { slide: "Slider", reference: "Referans", review: "Yorum" };
const siteForm = document.getElementById("siteForm");
const siteEl = (id) => document.getElementById(id);
let SITE_ITEMS = [];

function siteToggleFields(){
  const kind = siteEl("siteKind").value;
  siteForm.querySelectorAll("[data-for]").forEach(box => {
    box.hidden = !box.dataset.for.split(" ").includes(kind);
  });
}
siteEl("siteKind").addEventListener("change", siteToggleFields);
siteToggleFields();

siteEl("siteImageFile").addEventListener("change", () => {
  const f = siteEl("siteImageFile").files[0];
  siteEl("siteImagePreview").hidden = !f;
  if(f) siteEl("siteImagePreviewImg").src = URL.createObjectURL(f);
});

function siteReset(){
  siteForm.reset();
  siteEl("siteId").value = "";
  siteEl("siteSort").value = "0";
  siteEl("siteImagePreview").hidden = true;
  siteEl("siteFormTitle").textContent = "Yeni İçerik Ekle";
  siteEl("siteSubmitBtn").textContent = "Kaydet";
  siteEl("siteCancelBtn").hidden = true;
  siteEl("siteKind").disabled = false;
  siteToggleFields();
}
siteEl("siteCancelBtn").addEventListener("click", () => {
  siteReset();
  siteEl("siteError").hidden = true;
  siteEl("siteSuccess").hidden = true;
});

function siteFill(item){
  siteReset();
  siteEl("siteId").value = item.id;
  siteEl("siteKind").value = item.kind;
  siteEl("siteKind").disabled = true;
  siteEl("siteName").value = item.kind === "review" ? (item.title || "") : "";
  siteEl("siteRefName").value = item.kind === "reference" ? (item.title || "") : "";
  siteEl("siteText").value = item.body || "";
  siteEl("siteStars").value = String(item.stars || 5);
  siteEl("siteDate").value = item.item_date || "";
  siteEl("siteLink").value = item.link || "";
  siteEl("siteImgUrl").value = item.img_url || "";
  siteEl("siteSort").value = item.sort_order ?? 0;
  if(item.img_url){
    siteEl("siteImagePreviewImg").src = item.img_url;
    siteEl("siteImagePreview").hidden = false;
  }
  siteEl("siteFormTitle").textContent = "İçeriği Düzenle";
  siteEl("siteSubmitBtn").textContent = "Değişiklikleri Kaydet";
  siteEl("siteCancelBtn").hidden = false;
  siteToggleFields();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

siteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const err = siteEl("siteError"), ok = siteEl("siteSuccess"), btn = siteEl("siteSubmitBtn");
  err.hidden = true; ok.hidden = true;
  const kind = siteEl("siteKind").value;
  const id = siteEl("siteId").value;

  try {
    btn.disabled = true;
    btn.textContent = "Kaydediliyor...";

    let imgUrl = siteEl("siteImgUrl").value.trim();
    const file = siteEl("siteImageFile").files[0];
    if(kind !== "review" && file){
      const path = `site/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const { error: upErr } = await sb.storage.from(BUCKET).upload(path, file);
      if(upErr) throw upErr;
      imgUrl = sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    }

    if(kind === "review" && (!siteEl("siteName").value.trim() || !siteEl("siteText").value.trim())){
      throw new Error("Müşteri adı ve yorum zorunlu.");
    }
    if(kind !== "review" && !imgUrl){
      throw new Error("Görsel seç ya da görsel URL'si yaz.");
    }

    const payload = {
      kind,
      title: kind === "review" ? siteEl("siteName").value.trim() : siteEl("siteRefName").value.trim(),
      body: kind === "review" ? siteEl("siteText").value.trim() : "",
      stars: kind === "review" ? Number(siteEl("siteStars").value) : null,
      item_date: kind === "review" && siteEl("siteDate").value ? siteEl("siteDate").value : null,
      link: kind === "review" ? "" : siteEl("siteLink").value.trim(),
      img_url: kind === "review" ? "" : imgUrl,
      sort_order: Number(siteEl("siteSort").value) || 0
    };

    const { error } = id
      ? await sb.from("site_item").update(payload).eq("id", id)
      : await sb.from("site_item").insert([payload]);
    if(error) throw error;

    ok.textContent = id ? "İçerik güncellendi." : "İçerik eklendi.";
    ok.hidden = false;
    const keepKind = kind;
    siteReset();
    siteEl("siteKind").value = keepKind;
    siteToggleFields();
    loadSiteItems();
  } catch(ex){
    err.textContent = "Hata: " + friendlyError(ex);
    err.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = siteEl("siteId").value ? "Değişiklikleri Kaydet" : "Kaydet";
  }
});

async function loadSiteItems(){
  const msg = siteEl("siteListMsg"), table = siteEl("siteTable");
  msg.textContent = "Yükleniyor..."; msg.hidden = false; table.hidden = true;

  const { data, error } = await sb.from("site_item").select("*")
    .order("kind").order("sort_order").order("created_at");
  if(error){
    msg.textContent = "İçerikler yüklenemedi: " + friendlyError(error);
    return;
  }
  SITE_ITEMS = data;
  siteEl("siteCount").textContent = data.length ? `(${data.length})` : "";
  if(!data.length){ msg.textContent = "Henüz içerik eklenmemiş."; return; }

  siteEl("siteTableBody").innerHTML = data.map(it => `
    <tr>
      <td>${it.img_url
        ? `<img class="admin-table__thumb" src="${escapeHtml(it.img_url)}" alt="">`
        : `<span class="admin-table__thumb--empty">${it.kind === "review" ? "★" : "🌿"}</span>`}</td>
      <td>${SITE_KIND_LABEL[it.kind] || escapeHtml(it.kind)}</td>
      <td class="admin-table__review">${escapeHtml(it.title || "")}${it.body ? `<br>${escapeHtml(it.body.slice(0, 80))}${it.body.length > 80 ? "…" : ""}` : ""}</td>
      <td>${it.sort_order ?? 0}</td>
      <td><div class="admin-table__actions">
        <button type="button" data-site-edit="${it.id}">Düzenle</button>
        <button type="button" data-site-delete="${it.id}" class="is-danger">Sil</button>
      </div></td>
    </tr>`).join("");
  msg.hidden = true;
  table.hidden = false;
}

siteEl("siteTableBody").addEventListener("click", async (e) => {
  const edit = e.target.closest("[data-site-edit]");
  const del = e.target.closest("[data-site-delete]");
  if(edit){
    const item = SITE_ITEMS.find(x => String(x.id) === edit.dataset.siteEdit);
    if(item) siteFill(item);
  }
  if(del){
    if(!confirm("Bu içeriği silmek istediğine emin misin?")) return;
    const { error } = await sb.from("site_item").delete().eq("id", del.dataset.siteDelete);
    if(error){ alert("Silinemedi: " + error.message); return; }
    loadSiteItems();
  }
});
siteEl("siteRefreshBtn").addEventListener("click", loadSiteItems);
