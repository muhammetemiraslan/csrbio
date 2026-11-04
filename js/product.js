// ==========================================================
// Ürün detay sayfası — urun.html?id=...
// ==========================================================
renderLayout("products");

const BKU_URL = "https://bku.tarimorman.gov.tr/";

function notFound(){
  $("#productPage").innerHTML = `<div class="container empty" style="padding:120px 20px">
    <h1 style="font-size:28px;font-weight:500;margin-bottom:10px">Ürün bulunamadı</h1>
    <p style="margin-bottom:20px">Aradığınız ürün kaldırılmış ya da bağlantı hatalı olabilir.</p>
    <a href="index.html#urunler" class="btn btn--green">Tüm Ürünlere Dön</a></div>`;
}

getProducts().then(products => {
  const id = params.get("id");
  const p = products.find(x => String(x.id) === String(id));
  if(!p){ notFound(); return; }

  document.title = `${p.name} | ${SITE.name}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.content = (p.lines[0] || `${p.name} — ${SITE.name}`).slice(0, 160);

  // Görsel + büyütme
  $("#pdGallery").innerHTML = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.name)}"><button class="pd__zoom" aria-label="Büyüt">${ICON.expand}</button>`
    : `<span class="card__noimg" style="width:60%">Görsel yok</span>`;
  if(p.image){
    $("#pdGallery").onclick = () => {
      const lb = document.createElement("div");
      lb.className = "lightbox";
      lb.innerHTML = `<img src="${esc(p.image)}" alt="${esc(p.name)}">`;
      lb.onclick = () => lb.remove();
      document.body.appendChild(lb);
    };
  }

  // Breadcrumb + başlık
  $("#pdCrumbs").innerHTML = `<a href="index.html">Ana Sayfa</a><span>/</span>${p.category ? `<a href="${catUrl(p.category)}">${esc(p.category)}</a><span>/</span>` : ""}<b>${esc(p.name)}</b>`;
  $("#pdTitle").textContent = p.name;

  // Butonlar
  $("#pdActions").innerHTML = `
    <a class="btn btn--wa" href="${waLink(`Merhaba, ${p.name} ürünü hakkında bilgi almak istiyorum.\n${location.href}`)}" target="_blank" rel="noopener">${ICON.whatsapp} Whatsapp</a>
    <a class="btn btn--light" href="${BKU_URL}" target="_blank" rel="noopener">BKÜ SORGULA</a>`;

  // Bilgi kutuları: ek alanlar Supabase'de doluysa onlar, değilse marka/kategori
  const specs = [
    ["Aktif Madde:", p.activeIngredient],
    ["Formulasyon Tipi:", p.formulation],
    ["Hedef Ürünler:", p.targetCrops],
    ["Hedef Zararlılar:", p.targetPests]
  ].filter(s => s[1]);
  if(!specs.length){
    if(p.brand) specs.push(["Marka:", p.brand]);
    if(p.category) specs.push(["Kategori:", p.category]);
  }
  const specIcon = `<span class="spec__icon">${LOGO_MARK}</span>`;
  $("#pdBox").innerHTML = `
    ${specs.length ? `<div class="pd__specs">${specs.map(([k, v]) => `
      <div class="spec"><h4>${k}</h4><div>${specIcon}<p>${esc(v)}</p></div></div>`).join("")}</div>` : ""}
    ${p.pdf
      ? `<a class="pd__pdf" href="${esc(p.pdf)}" target="_blank" rel="noopener">${ICON.download} Döküman İndir (PDF)</a>`
      : `<a class="pd__pdf" href="${waLink(`Merhaba, ${p.name} ürününün teknik dökümanını alabilir miyim?`)}" target="_blank" rel="noopener">${ICON.whatsapp} Teknik Bilgi İste</a>`}`;

  // Kategori + paylaş
  const url = encodeURIComponent(location.href), text = encodeURIComponent(p.name);
  $("#pdMeta").innerHTML = `
    ${p.category ? `<p><b>Kategoriler:</b> <a href="${catUrl(p.category)}">${esc(p.category)}</a></p>` : ""}
    ${p.brand ? `<p><b>Marka:</b> ${esc(p.brand)}</p>` : ""}
    <p><b>Paylaş:</b><span class="share">
      <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.facebook}</a>
      <a href="https://x.com/intent/post?url=${url}&text=${text}" target="_blank" rel="noopener" aria-label="X">${ICON.x}</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICON.linkedin}</a>
      <a href="https://wa.me/?text=${text}%20${url}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>
    </span></p>`;

  // Açıklama
  $("#pdDesc").innerHTML = p.lines.length
    ? `<ul>${p.lines.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`
    : `<p style="color:#888">Bu ürün için açıklama eklenmedi.</p>`;

  // İlgili ürünler: önce aynı kategori, yetmezse aynı marka
  const others = products.filter(x => x.id !== p.id);
  const related = [
    ...others.filter(x => p.category && x.category === p.category),
    ...others.filter(x => !(p.category && x.category === p.category) && p.brand && x.brand === p.brand)
  ].slice(0, 4);
  if(related.length) $("#relatedGrid").innerHTML = related.map(productCardHTML).join("");
  else $("#related").classList.add("hidden");
});
