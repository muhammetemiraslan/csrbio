# CSR Asistan (yapay zekâ sohbet botu) — kurulum

Sağ alttaki butona tıklayınca açılan sohbet penceresi. Mesajlar Supabase'deki
"chat" fonksiyonuna gider; fonksiyon Gemini'ye sorar ve sadece senin ürünlerini önerir.
Gemini anahtarı sadece Supabase'de durur, sitede görünmez.

## 1) Gemini anahtarını Supabase'e koy
Supabase Dashboard > Edge Functions > Secrets > Add new secret
  Name:  GEMINI_API_KEY
  Value: AIza... ile başlayan anahtarın
Save.

## 2) Fonksiyonu oluştur
Edge Functions > Functions > "Deploy a new function" > "Via Editor"
- Editördeki örnek kodun hepsini sil.
- supabase/functions/chat/index.ts dosyasının içeriğini yapıştır.
- Sağ altta fonksiyon adını tam olarak:  chat   yaz (küçük harf).
- Deploy'a bas.

## 3) JWT doğrulamasını kapat (ÖNEMLİ)
Fonksiyonu açınca Details (ayarlar) sekmesinde "Verify JWT" / "Enforce JWT Verification"
seçeneğini KAPAT ve kaydet. Açık kalırsa site bota bağlanamaz ("bağlantı kuramadım" der).
Kötüye kullanıma karşı fonksiyonun içinde mesaj sınırı var (kişi başı 10 dakikada 20 mesaj).

## 4) Siteyi yükle ve dene
Zip'teki her şeyi repoya at, push'la, Ctrl + F5. Sağ alttaki butona tıkla, bir soru sor.

## Sorun olursa
- "Şu an bir sorun yaşıyorum" diyorsa: Edge Functions > chat > Logs'a bak, kırmızı satırı bana at.
- "bağlantı kuramadım" diyorsa: 3. adımı kontrol et, fonksiyon adı "chat" mi bak.
- Modeli değiştirmek istersen Secrets'a GEMINI_MODEL ekle (varsayılan: gemini-flash-latest).

## Botun davranışını değiştirmek
Talimatlar index.ts içindeki systemPrompt() kısmında. Değiştirdikten sonra
fonksiyonun Code sekmesinde yapıştırıp "Deploy updates" demen yeterli.
Pencere metinleri (karşılama, öneri butonları) js/common.js sonunda: CHAT_WELCOME, CHAT_SUGGESTIONS.
