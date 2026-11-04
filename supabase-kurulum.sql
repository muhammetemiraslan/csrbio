-- ==========================================================
-- CSR BİO Tarım — yeni site için Supabase kurulumu
-- Supabase Dashboard > SQL Editor > New query > bunu yapıştır > Run
-- Birden fazla çalıştırmak sorun çıkarmaz.
-- ==========================================================

-- 1) Ürün detay sayfası için yeni alanlar
alter table public.product
  add column if not exists active_ingredient text,
  add column if not exists formulation text,
  add column if not exists target_crops text,
  add column if not exists target_pests text,
  add column if not exists pdf_url text;

-- 2) Slider / referans / yorum tablosu
create table if not exists public.site_item (
  id          bigint generated always as identity primary key,
  kind        text not null check (kind in ('slide', 'reference', 'review')),
  title       text,          -- yorumda müşteri adı, referansta firma adı
  body        text,          -- yorum metni
  stars       smallint check (stars between 1 and 5),
  item_date   date,          -- yorum tarihi
  img_url     text,          -- slider / logo görseli
  link        text,          -- tıklanınca gidilecek adres
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- 3) Güvenlik: herkes okuyabilir, sadece giriş yapan (admin) yazabilir
alter table public.site_item enable row level security;

drop policy if exists "site_item herkes okur" on public.site_item;
create policy "site_item herkes okur"
  on public.site_item for select
  to anon, authenticated
  using (true);

drop policy if exists "site_item admin yazar" on public.site_item;
create policy "site_item admin yazar"
  on public.site_item for all
  to authenticated
  using (true)
  with check (true);
