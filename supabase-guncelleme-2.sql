-- ==========================================================
-- CSR BİO Tarım — 2. güncelleme (ziyaretçi yorumları)
-- Supabase Dashboard > SQL Editor > New query > yapıştır > Run
-- Birden fazla çalıştırmak sorun çıkarmaz.
-- ==========================================================

-- 1) Yorumların onay durumu (eski kayıtlar yayında kalır)
alter table public.site_item
  add column if not exists approved boolean not null default true;

-- 2) Ziyaretçiler sadece onaylı içerikleri görür, admin hepsini görür
drop policy if exists "site_item herkes okur" on public.site_item;
create policy "site_item herkes okur"
  on public.site_item for select
  to anon
  using (approved = true);

-- (admin için "site_item admin yazar" politikası zaten var: giriş yapan her şeyi görür/düzenler)

-- 3) Ziyaretçi sadece onaysız yorum ekleyebilir; slider/logo ekleyemez
drop policy if exists "site_item ziyaretci yorum ekler" on public.site_item;
create policy "site_item ziyaretci yorum ekler"
  on public.site_item for insert
  to anon
  with check (
    kind = 'review'
    and approved = false
    and char_length(coalesce(title, '')) between 2 and 60
    and char_length(coalesce(body, '')) between 5 and 600
    and coalesce(stars, 5) between 1 and 5
    and coalesce(img_url, '') = ''
    and coalesce(link, '') = ''
  );
