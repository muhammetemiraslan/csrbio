// İletişim sayfası — form mesajı WhatsApp'a gönderir
renderLayout("contact");

// HARİTA: adres, Google Maps'teki işletme adı ya da koordinat yaz.
// Örn: "Mahalle, İlçe, İl"  veya koordinat  "38.1234,31.5678"
const MAP_QUERY = "38.275738612414074,30.823646545411194";

(function map(){
  const q = (MAP_QUERY || SITE.address || "").trim();
  if(!q) return;
  const box = $("#contactMap");
  box.innerHTML = `<iframe src="https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed"
      title="Konum haritası" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}" target="_blank" rel="noopener">Yol tarifi al →</a>`;
  box.hidden = false;
})();

$("#contactCard").innerHTML = `
  <div class="contact__item"><i>${ICON.phone}</i><div><small>Telefon</small><b><a href="${SITE.phoneHref}">${SITE.phone}</a></b></div></div>
  <div class="contact__item"><i>${ICON.mail}</i><div><small>E-Posta</small><b><a href="mailto:${SITE.email}">${SITE.email}</a></b></div></div>
  ${SITE.address ? `<div class="contact__item"><i>${ICON.pin}</i><div><small>Adres</small><b>${esc(SITE.address)}</b></div></div>` : ""}
  ${SITE.contactPerson ? `<div class="contact__item"><i>${ICON.user}</i><div><small>Yetkili</small><b>${esc(SITE.contactPerson)}</b></div></div>` : ""}
  <div class="contact__social">
    <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
    <a href="${waLink("Merhaba,")}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>
  </div>`;

const form = $("#contactForm");
const msg = form.elements.message;
msg.addEventListener("input", () => $("#msgCount").textContent = `${msg.value.length} / 500`);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const email = form.elements.email.value.trim();
  const text = msg.value.trim();
  if(!name || !phone || !text){ toast("Lütfen zorunlu (*) alanları doldurun."); return; }
  const body = `Merhaba, web sitenizden yazıyorum.\n\nAd Soyad: ${name}\nTelefon: ${phone}${email ? `\nE-posta: ${email}` : ""}\n\n${text}`;
  window.open(waLink(body), "_blank", "noopener");
  form.reset();
  $("#msgCount").textContent = "0 / 500";
});
