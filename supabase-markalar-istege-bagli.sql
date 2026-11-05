-- ==========================================================
-- CSR BİO Tarım — İSTEĞE BAĞLI: marka düzeltmesi (müşterinin Word dosyasındaki gruplara göre)
-- Sadece sitedeki markalar yanlışsa çalıştır.
-- ==========================================================
update public.product set brand = 'ALTINTAR' where name ilike '%alam%' and name ilike '%zn%';   -- Alamin Zn
update public.product set brand = 'ALTINTAR' where name ilike '%alam%' and name ilike '%ca%';   -- Alamin Ca
update public.product set brand = 'ALTINTAR' where name ilike '%agroleaf%' and (name ilike '%11%5%19%' or name ilike '%calc%');   -- Agroleaf Power Calcium 11-5-19 + 2,5 MgO + 9 CaO + TE
update public.product set brand = 'ALTINTAR' where name ilike '%agroleaf%' and (name ilike '%12%52%' or name ilike '%high%');   -- Agroleaf Power High P 12-52-5 + TE
update public.product set brand = 'ALTINTAR' where name ilike '%cytok%';   -- CYTOKIN PLUS
update public.product set brand = 'ALTINTAR' where name ilike '%fert_zyme%';   -- Fertizyme-SP
update public.product set brand = 'ALTINTAR' where name ilike '%agroleaf%' and (name ilike '%20%20%20%' or name ilike '%total%');   -- Agroleaf Power 20-20-20 +TE
update public.product set brand = 'ALTINTAR' where name ilike '%blackja%';   -- Blackjak SC
update public.product set brand = 'ALTINTAR' where name ilike '%nutrilop%bor%';   -- Nutrilop Bor
update public.product set brand = 'ALTINTAR' where name ilike '%nutrilop%mg%';   -- Nutrilop Mg
update public.product set brand = 'ALTINTAR' where name ilike '%nutrilop%zn%';   -- Nutrilop Zn-B
update public.product set brand = 'ALTINTAR' where name ilike '%nutr_m_n%';   -- Nutrimin 534 Special
update public.product set brand = 'ALTINTAR' where name ilike '%terra%sorb%';   -- Terra-Sorb Foliar Plus
update public.product set brand = 'ALTINTAR' where name ilike '%toggle%';   -- TOGGLE XL
update public.product set brand = 'AGRO ATP' where name ilike '%clean%pro%';   -- CLEAN PRO
update public.product set brand = 'AGRO ATP' where name ilike '%noq%';   -- AMINOQ
update public.product set brand = 'AGRO ATP' where name ilike '%calmag%';   -- CALMAG AMINO PLUS
update public.product set brand = 'AGRO ATP' where name ilike '%cuaje%';   -- MAX CUAJE
update public.product set brand = 'AGRO ATP' where name ilike '%crop%extra%';   -- CROP+EXTRA
update public.product set brand = 'KIMITEC' where name ilike '%bombard%';   -- BOMBARDIER
update public.product set brand = 'KIMITEC' where name ilike '%fructon%';   -- FRUCTON
update public.product set brand = 'KIMITEC' where name ilike '%gre%nforce%';   -- GREENFORCE
