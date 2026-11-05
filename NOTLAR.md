# CSR BİO Tarım — site notları

## Ayarlar (tek dosya)
js/config.js → telefon, e-posta, Instagram, yetkili, Selim Tarım adresi, harita konumu,
ürün kartındaki WhatsApp hazır mesajı.

## Sayfalar
- index.html: slider, referans logoları (tıklayınca o markanın ürünleri), hakkımızda,
  filtreli ürünler, dijital asistan, yorumlar (+ Yorum Yap), blog
- /urun/<urun-adi>/  ürün sayfası (eski urun.html?id=... adresleri de çalışır)
- /yazi/<baslik>/    blog yazısı
- blog.html, iletisim.html, 404.html
- admin/  (siteden link yok; adres çubuğuna csrbiotarim.com.tr/admin yazılarak girilir)

## SEO nasıl çalışıyor?
.github/workflows/site.yml her push'ta ve her saat başı çalışır:
tools/build.mjs Supabase'deki ürün ve yazılardan gerçek HTML sayfaları, sitemap.xml
ve ana sayfa/blog listesine linkleri üretir, GitHub Pages'e yükler.
Admin'den eklenen yeni ürün hemen sitede görünür; SEO sayfası en geç 1 saat içinde oluşur.
Hemen istersen: GitHub > Actions > "Siteyi yayinla" > Run workflow.

### Bir kerelik ayar (ZORUNLU)
GitHub repo > Settings > Pages > Build and deployment > Source: "GitHub Actions" seç.
Custom domain alanında csrbiotarim.com.tr yazdığını kontrol et.

## Supabase SQL (sırayla, bir kere)
1. supabase-kurulum.sql      (daha önce çalıştırıldı)
2. supabase-guncelleme-2.sql (ziyaretçi yorumları)
3. supabase-guncelleme-3-kategoriler.sql (müşterinin listesine göre içerik başlıkları + kategoriler;
   en altta eşleşmeyen ürünleri gösterir)

## Admin panel
- Ürün İçeriği / Ana Başlık: kartta marka altında görünür, aramada bulunur (ör. Kalsiyum - Magnezyum)
- Açıklama: Word'den kopyala-yapıştır ya da "Word (.docx) Yükle". Görseller aktarılmaz.
- Kategoriler: kutucuklardan birden fazla seçilebilir (liste js/config.js > CATEGORIES).
  Listede olmayanı alttaki kutuya yazabilirsin. Filtrede kategoriler buradan gelir.
- Slider / Referans / Yorum: Referansta "Firma Adı" ürünlerdeki marka adıyla aynı olmalı
  (logoya tıklayınca o markanın ürünleri listelenir). Ziyaretçi yorumları "Onay bekliyor"
  olarak gelir, "Onayla" deyince sitede görünür.

## Kodda kalanlar
- css/style.css sadece admin paneli için, silme.
- Sohbet botu: supabase/functions/chat/index.ts (bkz. KURULUM-ASISTAN.md)
