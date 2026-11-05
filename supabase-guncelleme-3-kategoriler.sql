-- ==========================================================
-- CSR BİO Tarım — 3. güncelleme: ürün içerik başlıkları + kategoriler
-- Müşterinin listesine göre her ürünün "Ürün İçeriği / Ana Başlık" ve
-- kategorilerini doldurur. Supabase > SQL Editor > yapıştır > Run.
-- Ürün adları büyük/küçük harf ve Türkçe karakter farkına göre esnek eşleşir.
-- En altta hangi ürünün eşleşmediği listelenir.
-- ==========================================================

update public.product set active_ingredient = 'Dezenfektan ve Antibakteriyel', category = ''
  where name ilike '%clean%pro%';

update public.product set active_ingredient = 'Aminoasit', category = 'Aminoasit'
  where name ilike '%noq%';                                   -- AMİNOQ

update public.product set active_ingredient = 'Kalsiyum + Magnezyum', category = 'Kalsiyum, Magnezyum'
  where name ilike '%calmag%';

update public.product set active_ingredient = 'Fosfor', category = 'Fosfor, Bor'
  where name ilike '%cuaje%';                                 -- MAX CUAJE

update public.product set active_ingredient = 'Çinko + Mangan', category = 'Çinko, Mangan'
  where name ilike '%zn%mn%';                                 -- ZN MN FOLİAR

update public.product set active_ingredient = 'Döllenme Artırma (Özel Formülasyon)', category = 'Mikroelement Karışımı'
  where name ilike '%crop%extra%';

update public.product set active_ingredient = 'Potasyum ve Kalsiyum', category = 'Potasyum, Kalsiyum'
  where name ilike '%agroleaf%' and (name ilike '%11%5%19%' or name ilike '%calc%');

update public.product set active_ingredient = 'Fosfor', category = 'Fosfor'
  where name ilike '%agroleaf%' and (name ilike '%12%52%' or name ilike '%high%');

update public.product set active_ingredient = 'Azot + Fosfor + Potasyum', category = 'Azot'
  where name ilike '%agroleaf%' and (name ilike '%20%20%20%' or name ilike '%total%');

update public.product set active_ingredient = 'Kalsiyum', category = 'Kalsiyum'
  where name ilike '%alam%' and name ilike '%ca%';            -- ALAMIN CA

update public.product set active_ingredient = 'Çinko', category = 'Çinko'
  where name ilike '%alam%' and name ilike '%zn%';            -- ALAMIN ZN

update public.product set active_ingredient = 'Çinko ve Bor', category = 'Çinko, Bor'
  where name ilike '%nutrilop%zn%';                           -- NUTRILOP ZnB

update public.product set active_ingredient = 'Bor', category = 'Bor'
  where name ilike '%nutrilop%bor%';

update public.product set active_ingredient = 'Magnezyum', category = 'Magnezyum'
  where name ilike '%nutrilop%mg%';

update public.product set active_ingredient = 'Mikroelementler', category = 'Bor, Mikroelement Karışımı'
  where name ilike '%nutr_m_n%';                              -- NUTRİMİN

update public.product set active_ingredient = 'Aminoasit', category = 'Aminoasit'
  where name ilike '%terra%sorb%';

update public.product set active_ingredient = 'Deniz Yosunu', category = 'Deniz Yosunu'
  where name ilike '%toggle%';

update public.product set active_ingredient = 'Aminoasit', category = 'Aminoasit'
  where name ilike '%bombard%';

update public.product set active_ingredient = 'Bor ve Molibden', category = 'Bor, Molibden'
  where name ilike '%fructon%';

update public.product set active_ingredient = 'Mikroelementler', category = 'Mikroelement Karışımı'
  where name ilike '%gre%nforce%';                            -- GRENFORCE / Greenforce

update public.product set active_ingredient = 'Hümik - Fulvik Asit', category = 'Hümik Asit'
  where name ilike '%blackja%';                               -- BLACKJAK / Blackjack

update public.product set active_ingredient = 'Deniz Yosunu', category = 'Deniz Yosunu'
  where name ilike '%cytok%';                                 -- CYTOKIN PLUS

update public.product set active_ingredient = 'Aminoasit - Köklendirici', category = 'Köklendirici, Aminoasit'
  where name ilike '%fert_zyme%';                             -- FERTİZYME -SP

-- Kontrol: içerik başlığı boş kalan (listede eşleşmeyen) ürünler
select id, name, brand, active_ingredient, category
from public.product
order by (coalesce(active_ingredient, '') = '') desc, name;
