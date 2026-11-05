// İletişim sayfası — form mesajı WhatsApp'a gönderir
renderLayout("contact");

// Harita konumu ve adres js/config.js içinde (SITE.map, SITE.address)
(function map(){
  const q = String(SITE.map || SITE.address || "").trim();
  if(!q) return;
  const box = $("#contactMap");
  box.innerHTML = `<iframe src="https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed"
      title="${esc(SITE.partner || SITE.name)} konum haritası" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}" target="_blank" rel="noopener">${ICON.pin} Yol tarifi al →</a>`;
  box.hidden = false;
})();

$("#contactCard").innerHTML = `
  ${SITE.contactPerson ? `<div class="contact__item"><i>${ICON.user}</i><div><small>${esc(SITE.contactRole || "Yetkili")}</small><b>${esc(SITE.contactPerson)}</b></div></div>` : ""}
  <div class="contact__item"><i>${ICON.phone}</i><div><small>Telefon</small><b><a href="${SITE.phoneHref}">${esc(SITE.phone)}</a></b></div></div>
  <div class="contact__item"><i>${ICON.mail}</i><div><small>E-Posta</small><b><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></b></div></div>
  ${SITE.address ? `<div class="contact__item"><i>${ICON.pin}</i><div><small>Adres${SITE.partner ? ` (${esc(SITE.partner)})` : ""}</small><b>${esc(SITE.address)}</b></div></div>` : ""}
  <div class="contact__social">
    <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
    <a href="mailto:${SITE.email}" aria-label="E-posta">${ICON.mail}</a>
    <a href="${waLink("Merhaba,")}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>
  </div>
  ${SITE.partner ? `<p class="contact__partner">${esc(SITE.name)}, bir <b>${esc(SITE.partner)}</b> iştirakidir.</p>` : ""}`;

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
