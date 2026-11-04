# CSR BİO Tarım — yeni tasarım notları

## Sayfalar
- index.html: slider, referanslar, hakkımızda, filtreli ürünler, yorumlar, iletişim butonu, blog
- urun.html?id=X: ürün detay (kartlara tıklayınca açılır)
- blog.html / yazi.html?id=X: blog listesi ve yazı
- iletisim.html: form, mesajı WhatsApp'a gönderir
- admin/: aynı kaldı

## İLK İŞ: Supabase kurulumu
Supabase Dashboard > SQL Editor > New query > supabase-kurulum.sql içeriğini yapıştır > Run.
Bunu yapmadan admin panelde ürün kaydetme hata verir (yeni alanlar tabloda yok diye).

## Admin panel
- Ürünler: Aktif Madde, Formulasyon, Hedef Ürünler, Hedef Zararlılar ve PDF eklendi (hepsi opsiyonel).
  Doldurulanlar ürün sayfasında yeşil kutu olur, hepsi boşsa Marka ve Kategori görünür.
- Slider / Referans / Yorum sekmesi: ana sayfadaki slider, referans logoları ve müşteri yorumları.
  "Sıra" alanı küçükten büyüğe dizilir.

## Kodda kalanlar
- İletişim bilgileri, Instagram, adres: js/common.js içindeki SITE
- Logo: js/common.js içindeki LOGO_MARK / LOGO_HTML
- css/style.css sadece admin paneli için duruyor, silme.
