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

    const payload = {
      name: fieldName.value.trim(),
      brand: fieldBrand.value.trim(),
      category: fieldCategory.value.trim(),
      description: fieldDescription.value.trim(),
      img_url: imgUrl
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
    formError.textContent = "Hata: " + (err.message || "Bilinmeyen bir hata oluştu.");
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
  const isProducts = btn.dataset.tab === "products";
  tabProducts.hidden = !isProducts;
  tabBlog.hidden = isProducts;
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
