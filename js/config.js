// ==========================================================
// CSR BİO Tarım — AYARLAR (iletişim bilgilerini buradan değiştir)
// Bu dosya hem sitede hem SEO sayfası üreticisinde kullanılır.
// ==========================================================
var SITE = {
  name: "CSR BİO Tarım",
  url: "https://csrbiotarim.com.tr",
  phone: "0 535 625 87 00",
  phoneHref: "tel:05356258700",
  whatsapp: "905356258700",            // başında 90, boşluksuz
  email: "csrbiotarim@gmail.com",
  instagram: "https://www.instagram.com/selimtarimm/",   // Selim Tarım Instagram
  contactPerson: "Volkan Baki Cesur",
  contactRole: "Yetkili",
  partner: "Selim Tarım",              // "... iştirakidir" ibaresi
  address: "Selim Tarım Market, Taşevi Köyü Yolu, 32402 Taşevi/Yalvaç/Isparta",   // footer + iletişim sayfası
  map: "38.275738612414074,30.823646545411194"   // harita konumu (koordinat ya da adres)
};

// Filtredeki kategoriler bu sırayla görünür (admin panelde de bu liste seçilir).
// Bir ürün birden fazla kategoride olabilir.
var CATEGORIES = ["Azot", "Fosfor", "Potasyum", "Kalsiyum", "Çinko", "Bor", "Magnezyum", "Mangan",
  "Mikroelement Karışımı", "Molibden", "Hümik Asit", "Deniz Yosunu", "Köklendirici", "Aminoasit"];

// Ürün kartındaki ve detaydaki WhatsApp hazır mesajı ({urun} yerine ürün adı gelir)
var WA_PRODUCT_MSG = "Merhaba, {urun} ürününüzün fiyatı ve ürün bilgisi hakkında bilgi almak istiyorum.";

// CSR Asistan (sağ alttaki sohbet) — açılış metni ve hazır konu butonları
// **kalın** yazmak için iki yıldız kullan, alt satır için \n
var CHAT_WELCOME = "Merhaba! Ben **CSR Asistan** 🌱\nBitkinizde yaşadığınız sorunu işaretleyin, size uygun ürünlerimizi önereyim.";
var CHAT_SUGGESTIONS = [
  "Kök Gelişimi",
  "Sürgün ve Dal Gelişimi",
  "Çiçeklenme ve Döllenme",
  "Ürün İriliği ve Gelişimi",
  "Yapraklarda Sararma ve Kloroz",
  "Stres ve Olumsuz Hava Koşullarına Dayanıklılık",
  "Çatlama ve Şekil Bozuklukları"
];

var SUPABASE_URL = "https://xrzonxgaoanhoijloyag.supabase.co";
var SUPABASE_KEY = "sb_publishable_t_DLqABupEfr5goqtOW2JA_gwrFim-g";
var CHAT_URL = SUPABASE_URL + "/functions/v1/chat";   // CSR Asistan (Supabase Edge Function)
