-- ==========================================================
-- CSR BİO Tarım — 4. güncelleme: ürün açıklamaları (müşterinin Word dosyasından)
-- Supabase > SQL Editor > yapıştır > Run.
-- Her ürünün açıklamasını "Ürün Açıklaması" + "Özellikler" listesi olarak yazar.
-- En altta açıklaması boş kalan ürünler listelenir.
-- ==========================================================

-- Alamin Zn
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Yüksek çinko içeriği, organik madde ve serbest amino asitlerle bitkinin vejetatif gelişimini ve fizyolojik faaliyetlerini destekleyen bitki besleme ürünüdür.</p><h3>Özellikler</h3><ul><li>Sağlıklı sürgün ve yaprak gelişiminin sürdürülmesine katkı sağlar.</li><li>Boğum Arası Gelişimi, çinko yetersizliğiyle ilişkili kısa boğum arası ve küçük yaprak oluşumunun önlenmesine yardımcı olur.</li><li>Yeni gelişen dokularda normal büyüme ve gelişimin desteklenmesine katkı sağlar.</li></ul>'
  where name ilike '%alam%' and name ilike '%zn%';

-- Alamin Ca
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Kalsiyum, azot ve serbest amino asit içeriğiyle bitki gelişimini ve meyve kalitesini destekleyen, bor ile zenginleştirilmiş bitki besleme ürünüdür.</p><h3>Özellikler</h3><ul><li>Hücre duvarı oluşumuna ve doku sağlamlığına katkı sağlar.</li><li>Bitkisel gelişim ve protein sentezini destekler.</li><li>Bitkinin metabolik süreçlerine destek sunar.</li><li>Üreme gelişimi ve polen oluşumunda rol oynar.</li></ul>'
  where name ilike '%alam%' and name ilike '%ca%';

-- Agroleaf Power Calcium 11-5-19 + 2,5 MgO + 9 CaO + TE
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Kalsiyum ve potasyum ağırlıklı formülüyle meyve gelişimini, hücre yapısını ve kalite oluşumunu destekleyen, mikro elementlerle zenginleştirilmiş yaprak gübresidir.</p><h3>Özellikler</h3><ul><li>Kalsiyum ile meyve dokusunun sağlamlığını destekler.</li><li>Potasyum ile meyve gelişimine katkı sağlar.</li><li>Magnezyum ile klorofil oluşumunu destekler.</li><li>NPK ve mikro elementlerle besin takviyesi sağlar.</li></ul>'
  where name ilike '%agroleaf%' and (name ilike '%11%5%19%' or name ilike '%calc%');

-- Agroleaf Power High P 12-52-5 + TE
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Yüksek fosfor içeriğiyle kök gelişimini, enerji metabolizmasını ve çiçeklenme dönemindeki besin ihtiyacını destekleyen, mikro elementlerle zenginleştirilmiş yaprak gübresidir.</p><h3>Özellikler</h3><ul><li>Fosfor ile yeni kök oluşumunu destekler.</li><li>ATP sentezi ve enerji transferinde rol oynar.</li><li>Çiçek oluşumu dönemindeki fosfor beslenmesine katkı sağlar.</li><li>İz elementlerle dengeli bitki beslenmesini destekler.</li></ul>'
  where name ilike '%agroleaf%' and (name ilike '%12%52%' or name ilike '%high%');

-- CYTOKIN PLUS
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Dört farklı deniz yosunundan elde edilen doğal özütüyle kök gelişimini, bitkinin fizyolojik faaliyetlerini ve generatif gelişimini destekleyen bitki gelişim ürünüdür.</p><h3>Özellikler</h3><ul><li>Kılcal kök oluşumunu ve kök sisteminin gelişimini destekler.</li><li>Topraktan besin elementlerinin alımını ve bitki içinde taşınmasını destekler.</li><li>Çiçeklenme ve meyve tutumu süreçlerine katkı sağlar.</li><li>Meyvelerin gelişim ve irileşme süreçlerini desteklemeye yardımcı olur.</li></ul>'
  where name ilike '%cytok%';

-- Fertizyme-SP
update public.product set description = '<h3>Ürün Açıklaması</h3><p>%60 organik madde ve %20 serbest amino asit içeriğiyle toprak verimliliğini, kök bölgesindeki besin döngüsünü ve bitkinin besinlerden yararlanma kapasitesini destekleyen organik içerikli üründür.</p><h3>Özellikler</h3><ul><li>Bitkinin toprakta bulunan besin elementlerinden yararlanmasını destekler.</li><li>Organik içeriğiyle kök çevresindeki biyolojik ve kimyasal süreçlere katkı sağlar.</li><li>Bitkinin besin elementlerini alımını ve dengeli beslenmesini destekler.</li><li>Çiçeklenme ve meyve gelişimi dönemlerinde bitkinin beslenme süreçlerine katkı sağlar.</li></ul>'
  where name ilike '%fert_zyme%';

-- Agroleaf Power 20-20-20 +TE
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Dengeli NPK ve mikro element içeriğiyle bitkinin vejetatif gelişimini, fotosentez faaliyetlerini ve genel beslenme dengesini destekleyen yaprak gübresidir.</p><h3>Özellikler</h3><ul><li>Sağlıklı sürgün ve yaprak gelişimini destekler.</li><li>Kök ve toprak üstü aksamın dengeli gelişimine katkı sağlar.</li><li>Klorofil oluşumunu ve fotosentez faaliyetlerini destekler.</li><li>Aktif büyüme dönemlerinde bitkinin dengeli beslenmesine yardımcı olur.</li></ul>'
  where name ilike '%agroleaf%' and (name ilike '%20%20%20%' or name ilike '%total%');

-- Blackjak SC
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Leonardit kaynaklı %15 hümik ve fülvik asit içeren, kök gelişimini, toprak yapısını ve bitkinin besin elementlerinden yararlanmasını destekleyen süspansiyon formunda organik toprak düzenleyicidir.</p><h3>Özellikler</h3><ul><li>Kılcal kök oluşumunu ve kök sisteminin gelişimini destekler.</li><li>Topraktaki besin elementlerinin yarayışlılığını ve bitki tarafından alımını artırmaya yardımcı olur.</li><li>Toprağın su tutma kapasitesini, havalanmasını ve yapısal özelliklerini iyileştirmeye katkı sağlar.</li><li>Toprak mikroorganizmalarının faaliyetlerini ve kök bölgesindeki biyolojik aktiviteyi destekler.</li></ul>'
  where name ilike '%blackja%';

-- Nutrilop Bor
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Bitki tarafından alınabilir formdaki bor içeriğiyle büyüme noktalarının gelişimini, çiçeklenmeyi ve sağlıklı meyve oluşumunu destekleyen sıvı bor gübresidir.</p><h3>Özellikler</h3><ul><li>Çiçek tozu canlılığını ve polen tüpü gelişimini destekleyerek döllenmeye katkı sağlar.</li><li>Çiçek ve meyve tutumunun sağlıklı gerçekleşmesine yardımcı olur.</li><li>Büyüme uçlarında hücre bölünmesi ve uzamasını destekler.</li><li>Tohum oluşumunu ve özellikle ayçiçeğinde tabla dolumunu destekler.</li></ul>'
  where name ilike '%nutrilop%bor%';

-- Nutrilop Mg
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Magnezyum, nitrat azotu ve molibden içeren formülüyle klorofil oluşumunu, fotosentez faaliyetlerini ve bitkinin sağlıklı gelişimini destekleyen sıvı yaprak gübresidir.</p><h3>Özellikler</h3><ul><li>Yapraklarda klorofil oluşumunu destekleyerek fotosentez kapasitesinin korunmasına katkı sağlar.</li><li>Özellikle yaşlı yapraklarda görülen damar arası sararmaların giderilmesine yardımcı olur.</li><li>Protein sentezini ve bitkinin enerji metabolizmasını destekler.</li><li>Fotosentez ürünlerinin taşınmasına katkı sağlayarak meyve gelişimini ve kalite oluşumunu destekler.</li></ul>'
  where name ilike '%nutrilop%mg%';

-- Nutrilop Zn-B
update public.product set description = '<h3>Ürün Açıklaması</h3><p>%5 çinko ve %5 bor içeren formülüyle çiçek gelişimini, döllenme süreçlerini ve meyve tutumunu destekleyen sıvı bitki besleme gübresidir.</p><h3>Özellikler</h3><ul><li>Çiçek tomurcuklarının gelişimini ve sağlıklı çiçek oluşumunu destekler.</li><li>Polen canlılığı ve polen tüpü gelişimine katkı sağlayarak döllenmeyi destekler.</li><li>Çiçek dökümünün beslenme kaynaklı nedenlerini azaltmaya ve meyve tutumunu desteklemeye yardımcı olur.</li><li>Hasat sonrası uygulamalarda gelecek sezonun çiçek gözlerinin sağlıklı gelişimine katkı sağlar.</li></ul>'
  where name ilike '%nutrilop%zn%';

-- Nutrimin 534 Special
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Glisin şelatlı mikro elementler, magnezyum ve kükürt içeren formülüyle bitkinin besin dengesini, yaprak gelişimini ve fizyolojik faaliyetlerini destekleyen özel bir yaprak gübresidir.</p><h3>Özellikler</h3><ul><li>Yeni sürgün ve yaprakların sağlıklı gelişimini destekler.</li><li>Mikro element eksikliklerine bağlı gelişim geriliği ve yaprak belirtilerinin giderilmesine katkı sağlar.</li><li>Klorofil oluşumunu ve fotosentez faaliyetlerini destekler.</li><li>Çiçeklenme ve meyve gelişimi dönemlerinde bitkinin dengeli beslenmesine yardımcı olur.</li></ul>'
  where name ilike '%nutr_m_n%';

-- Terra-Sorb Foliar Plus
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Enzimatik hidroliz yöntemiyle elde edilen %6 serbest aminoasit içeriğiyle bitkinin stres koşullarına karşı dayanıklılığını, gelişimini ve çiçeklenme ile meyve tutumu dönemlerindeki fizyolojik faaliyetlerini destekleyen yaprak gübresidir.</p><h3>Özellikler</h3><ul><li>Kuraklık, aşırı sıcaklık ve soğuk gibi olumsuz koşullarda bitkinin toparlanma sürecine katkı sağlar.</li><li>Çiçeklenme ve meyve tutumu dönemlerinde bitkinin gelişimini ve üreme faaliyetlerini destekler.</li><li>Yapraklardan uygulanan besin elementleriyle birlikte kullanıldığında bitkinin beslenme süreçlerine katkı sağlayabilir.</li><li>Bitkinin metabolik faaliyetlerini ve gelişimini destekleyerek stres koşullarının olumsuz etkilerinin azaltılmasına yardımcı olur.</li></ul>'
  where name ilike '%terra%sorb%';

-- TOGGLE XL
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Sıvı deniz yosunu, alginik asit ve potasyum içeren formülüyle kök gelişimini, bitkinin stres koşullarına uyumunu ve meyve gelişimini destekleyen bitki gelişim ürünüdür.</p><h3>Özellikler</h3><ul><li>Kök gelişimini ve bitkinin büyüme dönemlerindeki gelişimini destekler.</li><li>Sıcaklık ve kuraklık gibi olumsuz koşulların bitki üzerindeki etkilerinin azaltılmasına yardımcı olur.</li><li>Çiçeklenme ve meyve tutumu süreçlerini destekleyerek verim potansiyeline katkı sağlar.</li><li>Meyvelerin irileşmesini, renk gelişimini ve doku kalitesini destekler.</li></ul>'
  where name ilike '%toggle%';

-- CLEAN PRO
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Tarımsal üretimde bakteriyel hastalıklarla mücadele ve hijyen uygulamalarına yönelik kullanılan Clean Pro; ateş yanıklığı, dal kanseri ve bakteriyel kanser gibi hastalıklarla mücadele programlarında değerlendirilir. Aynı zamanda tarımsal ekipman ve metal yüzeylerin dezenfeksiyonunda kullanılır.</p><h3>Özellikler</h3><ul><li>Ateş yanıklığı, dal kanseri ve bakteriyel kanser gibi bakteriyel hastalıklara karşı mücadele programlarını destekler.</li><li>Hastalık etmenlerinin yayılma riskini azaltmaya yönelik hijyen uygulamalarında kullanılabilir.</li><li>Sera ve açık arazi koşullarında tarımsal ekipmanların ve metal yüzeylerin dezenfeksiyonunda kullanılabilir.</li><li>Üretim alanlarında genel hijyenin korunmasına yönelik uygulamalara katkı sağlar.</li></ul>'
  where name ilike '%clean%pro%';

-- AMINOQ
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Bitkisel menşeli %10 serbest aminoasit, %30 organik madde ve potasyum içeriğiyle bitkilerin kök gelişimini, büyüme faaliyetlerini ve çevresel stres koşullarına uyumunu destekleyen organik içerikli bitki besleme ürünüdür.</p><h3>Öne Çıkan Özellikler</h3><ul><li>Kök gelişimini ve bitkinin genel gelişim gücünü destekler.</li><li>Çiçeklenme ve meyve tutumu dönemlerinde bitkinin fizyolojik faaliyetlerine katkı sağlar.</li><li>Sıcaklık, kuraklık ve fide dikiminden kaynaklanan stres koşullarının olumsuz etkilerini azaltmaya yardımcı olur.</li><li>Meyve gelişimi boyunca bitkinin beslenmesini ve gelişim sürekliliğini destekler.</li></ul>'
  where name ilike '%noq%';

-- CALMAG AMINO PLUS
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Kalsiyum, magnezyum ve aminoasit içeren özel formülüyle bitkilerin dengeli gelişimini, yaprak faaliyetlerini ve meyvelerin sağlıklı gelişerek kalite özelliklerini korumasını destekleyen bitki besleme ürünüdür.</p><h3>Özellikler</h3><ul><li>Meyve dokusunun gelişimini ve sertliğini destekleyerek kalite kayıplarının azaltılmasına katkı sağlar.</li><li>Kalsiyum eksikliğine bağlı çiçek burnu çürüklüğü gibi fizyolojik bozuklukların önlenmesine yardımcı olur.</li><li>Yaprak gelişimini, klorofil oluşumunu ve fotosentez faaliyetlerini destekler.</li><li>Hızlı büyüme, meyve tutumu ve meyve irileşme dönemlerinde bitkinin kalsiyum ve magnezyum ihtiyacının karşılanmasına katkı sağlar.</li></ul>'
  where name ilike '%calmag%';

-- MAX CUAJE
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Yüksek fosfor içeriği ile bor, molibden, mangan ve çinko içeren formülü sayesinde bitkilerde çiçeklenme, döllenme ve meyve tutumu süreçlerini destekleyen özel bir bitki besleme ürünüdür.</p><h3>Özellikler</h3><ul><li>Çiçek oluşumunu ve çiçeklenme dönemindeki beslenme süreçlerini destekler.</li><li>Döllenme ve meyve tutumunun sağlıklı gerçekleşmesine katkı sağlar.</li><li>Bitkinin enerji metabolizmasını ve erken dönem gelişimini destekler.</li><li>Çiçeklenmeden meyve oluşumuna geçiş döneminde ihtiyaç duyulan besin elementlerinin karşılanmasına yardımcı olur.</li></ul>'
  where name ilike '%cuaje%';

-- CROP+EXTRA
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Bitkisel menşeli organik madde, dengeli NPK ve mikro element içeriğiyle bitkilerin besin dengesini, çiçeklenme süreçlerini ve meyve gelişimini destekleyen çok yönlü bitki besleme ürünüdür.</p><h3>Özellikler</h3><ul><li>Çiçeklenme, döllenme ve meyve tutumu dönemlerinde bitkinin beslenme ihtiyaçlarının karşılanmasına katkı sağlar.</li><li>Bitkinin metabolik faaliyetlerini ve sağlıklı vejetatif gelişimini destekler.</li><li>Besin elementlerinin dengeli alımına katkıda bulunarak yaprak ve meyve gelişimini destekler.</li><li>Meyvelerin renk, irilik ve kalite özelliklerinin gelişmesine yardımcı olur.</li></ul>'
  where name ilike '%crop%extra%';

-- BOMBARDIER
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Bitkisel kaynaklı aminoasitler ve organik madde içeriğiyle bitkilerin stres koşullarına uyumunu, metabolik faaliyetlerini ve sağlıklı gelişimini destekleyen özel bir bitki gelişim ürünüdür.</p><h3>Özellikler</h3><ul><li>Sıcaklık, kuraklık ve şaşırtma gibi stres koşullarının bitki üzerindeki olumsuz etkilerinin azaltılmasına yardımcı olur.</li><li>Köklenmeyi, vejetatif gelişimi ve bitkinin genel gelişim gücünü destekler.</li><li>Protein sentezi ve diğer metabolik faaliyetlerin sağlıklı sürdürülmesine katkı sağlar.</li><li>Yaprak ve kök gelişiminin yoğun olduğu dönemlerde, çiçeklenme öncesinde ve meyve tutumu sürecinde bitkinin gelişimini destekler.</li></ul>'
  where name ilike '%bombard%';

-- FRUCTON
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Bor ve molibden içeriğiyle çiçeklenme, döllenme ve meyve tutumunu destekleyen; bitki gelişim düzenleyici özelliğiyle meyve gelişimi, kalibre ve iç dolgunluğuna katkı sağlayan özel bir üründür.</p><h3>Özellikler</h3><ul><li>Çiçek tozu canlılığını, polen tüpü gelişimini ve döllenme süreçlerini destekler.</li><li>Çiçeklenme ve meyve tutumu dönemlerinde meyve oluşumunun sağlıklı ilerlemesine katkı sağlar.</li><li>Hücre bölünmesi ve meyve gelişimini destekleyerek meyve iriliği ve kalibre oluşumuna yardımcı olur.</li><li>Meyve gelişiminin ilerleyen dönemlerinde iç dolgunluğu ve ürün kalite özelliklerinin desteklenmesine katkı sağlar.</li></ul>'
  where name ilike '%fructon%';

-- GREENFORCE
update public.product set description = '<h3>Ürün Açıklaması</h3><p>Kükürt ve zengin mikro besin elementi içeriğiyle bitkilerin iz element ihtiyacını karşılamaya yardımcı olan GREENFORCE, dengeli beslenmeyi, vejetatif gelişimi ve bitkideki fizyolojik faaliyetleri destekler.</p><h3>Özellikler</h3><ul><li>Mikro besin elementi eksikliklerinin giderilmesine ve bitkide besin dengesinin korunmasına katkı sağlar.</li><li>Enzim faaliyetleri, protein sentezi ve azot metabolizmasını destekleyerek sağlıklı gelişime yardımcı olur.</li><li>Klorofil oluşumu ve fotosentez faaliyetlerini destekleyerek bitkinin besin elementlerinden etkin şekilde yararlanmasına katkıda bulunur.</li><li>Özellikle çiçeklenme öncesi ve erken çiçeklenme dönemlerinde bitkinin mikro element ihtiyacının karşılanmasına yardımcı olur.</li></ul>'
  where name ilike '%gre%nforce%';

-- Kontrol: açıklaması boş ya da eski (Word'den gelmemiş) kalan ürünler en üstte
select id, name, brand, left(regexp_replace(coalesce(description, ''), '<[^>]+>', ' ', 'g'), 80) as aciklama_baslangici
from public.product
order by (coalesce(description, '') not like '<h3>%') desc, name;
