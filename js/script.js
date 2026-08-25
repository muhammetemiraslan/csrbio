// ==========================================================
// KIMITEC — data & interactions
// ==========================================================

const STAGE_LABELS = {
  "vejetatif":     "Vejetatif Gelişim",
  "ciceklenme":    "Çiçeklenme",
  "meyve-tutumu":  "Meyve Tutumu",
  "irilesme":      "İrileşme & Kalite",
  "stres":         "Stres & Toparlanma"
};

const PRODUCTS = [
  // ---------------- KIMITEC ----------------
  {
    name: "GRENFORCE",
    brand: "KIMITEC",
    image: "img/products/grenforce.jpeg",
    teaser: "Bor, bakır, demir, mangan, molibden ve çinko içeren zengin mikro besin karışımı.",
    stages: ["vejetatif", "ciceklenme"],
    bullets: [
      "İçeriğindeki bor, bakır, demir, mangan, molibden ve çinko gibi zengin mikro besin elementleri karışımı sayesinde meyve ve sebzelerde eksikliklerin giderilmesini sağlayarak dengeli bir beslenme sunar.",
      "Çinko ve mangan gibi elementler bitkide enzim faaliyetlerini, protein sentezini ve azot metabolizmasını destekleyerek genel bitki sağlığını güçlendirir.",
      "Fotosentez kalitesini geliştirir, bitkinin besin elementlerinden daha etkin yararlanmasına imkan tanır ve verimlilik ile ürün kalitesini artırır.",
      "Meyve ağaçlarında vejetatif gelişimin yoğun olduğu dönemlerde ve özellikle %5-10 çiçek dönemi uygulandığında meyvenin genetik kodunun yazılmasında büyük rol oynar.",
      "Sebzelerde büyüme sezonu boyunca bitkinin iz element ihtiyaçlarını karşılamak ve genel gelişimini desteklemek amacıyla düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "FRUCTON",
    brand: "KIMITEC",
    image: "img/products/fructon.jpeg",
    teaser: "Bor ve molibden kombinasyonu ile çiçek tozu canlılığını artırır, döllenmeyi destekler.",
    stages: ["ciceklenme", "meyve-tutumu", "irilesme"],
    bullets: [
      "İçeriğindeki bor ve molibden kombinasyonu ile meyve ve sebzelerde çiçek tozunun canlılığını artırarak döllenmeyi ve meyve tutumunu güçlü bir şekilde destekler.",
      "Hücre bölünmesini ve polen tüpü gelişimini teşvik ederek meyve ve sebzelerde şekil bozukluklarını önler, irileşmeyi ve pazar kalitesini artırır.",
      "Özellikle hasattan 18-20 gün önce uygulandığında iç dolgunluğu yaptırarak rekoltede fark yaratır.",
      "Meyve ağaçlarında çiçeklenme öncesinde, çiçeklenme döneminde ve meyve tutum periyodunda uygulanabilir.",
      "Sebzelerde çiçeklenmeden hemen önceki dönemde, çiçeklenme başlangıcında ve meyve bağlama evresinde düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "BOMBARDIER",
    brand: "KIMITEC",
    image: null,
    teaser: "Bitkisel kaynaklı amino asitler ve organik maddeler ile stres koşullarına hızlı direnç.",
    stages: ["vejetatif", "ciceklenme", "meyve-tutumu", "stres"],
    bullets: [
      "İçeriğindeki zengin bitkisel kaynaklı amino asitler ve organik maddeler sayesinde meyve ve sebzelerde stres koşullarına karşı hızlı bir direnç ve toparlanma sağlar.",
      "Bitkinin metabolik faaliyetlerini ve protein sentezini hızlandırarak vejetatif gelişimi, köklenmeyi ve genel verimliliği güçlü bir şekilde destekler.",
      "Diğer tarım ilaçları ve gübrelerle birlikte kullanıldığında yapraktan emilimi artırarak (taşıyıcı etki) uygulanan besinlerin etkinliğini yükseltir.",
      "Meyve ağaçlarında vejetatif büyüme başlangıcında, çiçeklenme öncesinde, meyve tutumunda ve stres koşullarının görüldüğü periyotlarda uygulanabilir.",
      "Sebzelerde şaşırtma anında, gelişimi hızlandırmak ve büyüme sezonu boyunca bitkiyi desteklemek amacıyla düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "TOGGLE XL",
    brand: "ALTINTAR",
    image: null,
    teaser: "Sıvı deniz yosunu ve alginik asit ile kök gelişimi ve stres direnci.",
    stages: ["vejetatif", "ciceklenme", "meyve-tutumu", "irilesme", "stres"],
    bullets: [
      "İçeriğindeki yüksek kaliteli sıvı deniz yosunu ve alginik asit sayesinde meyve ve sebzelerde kök gelişimini teşvik eder ve stres koşullarına (sıcaklık, kuraklık vb.) karşı direnci artırır.",
      "Doğal bitki gelişim düzenleyicileri ile çiçeklenmeyi, meyve tutumunu ve kalitesini destekleyerek verim kaybını önler.",
      "İçerdiği suda çözünür potasyum ve organik maddelerle meyve ve sebzelerin irileşmesini, renk ve doku kalitesini iyileştirir.",
      "Meyve ağaçlarında vejetatif gelişimin başlangıcında, çiçeklenme öncesinde ve meyve irileşme sürecinde periyodik olarak uygulanabilir.",
      "Sebzelerde fide dikimi sonrasında köklenmeyi hızlandırmak, büyüme sezonu boyunca bitkiyi desteklemek ve stres dönemlerini atlatmak amacıyla düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "TERRA SORB FOLİAR",
    brand: "ALTINTAR",
    image: "img/products/terra-sorb-foliar.jpeg",
    teaser: "%6 serbest amino asit ve %20 organik madde ile don, kuraklık ve sıcaklık stresine direnç.",
    stages: ["vejetatif", "ciceklenme", "meyve-tutumu", "stres"],
    bullets: [
      "Bitkisel menşeli yüksek serbest amino asit (%6) ve organik madde (%20) içeriği sayesinde meyve ve sebzelerde stres koşullarına (don, kuraklık, sıcaklık stresi vb.) karşı hızlı bir direnç ve toparlanma sağlar.",
      "Bitki tarafından doğrudan bünyesine alınan serbest amino asitler, metabolik faaliyetleri ve protein sentezini hızlandırarak bitkinin gelişimini ve verimliliğini maksimum düzeyde destekler.",
      "Diğer tarım ilaçları ve gübrelerle birlikte kullanıldığında yapraktan emilimi ve taşınmayı artırarak (taşıyıcı/sticker etkisi) uygulanan diğer besinlerin etkinliğini yükseltir.",
      "Meyve ağaçlarında vejetatif büyüme başlangıcında, çiçeklenme döneminde, meyve tutumunda ve stres koşullarının görüldüğü kritik periyotlarda güvenle uygulanabilir.",
      "Sebzelerde köklenmeyi hızlandırmak, vejetatif gelişimi hızlandırmak ve meyve bağlama süreçlerinde düzenli aralıklarla yapraktan kullanılabilir."
    ]
  },
  {
    name: "NUTRİMİN",
    brand: "ALTINTAR",
    image: "img/products/nutrimin.jpeg",
    teaser: "İkincil ve iz element katkılı organomineral yapı ile dengeli beslenme ve kök gelişimi.",
    stages: ["vejetatif", "ciceklenme", "irilesme"],
    bullets: [
      "İçeriğindeki ikincil ve iz element katkılı katı organomineral yapısı sayesinde meyve ve sebzelerin dengeli beslenmesini sağlayarak kök gelişimini ve genel bitki direncini güçlendirir.",
      "Bitkinin enzim faaliyetlerini ve fotosentez kapasitesini artırarak ürünlerin kalite standartlarını, renk oluşumunu ve pazar değerini doğrudan destekler.",
      "Toprağın verimliliğini artırarak besin elementlerinin alımını kolaylaştırır ve olumsuz çevre koşullarına karşı bitkinin direncini yükseltir.",
      "Meyve ağaçlarında vejetatif büyüme başlangıcında, çiçeklenme öncesi dönemde ve meyve irileşme sürecinde periyodik olarak uygulanabilir.",
      "Sebzelerde fide dikimi ile birlikte, bitkinin gelişim sezonu boyunca iz element ihtiyacının karşılanması gereken kritik dönemlerde düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "NUTRILOP ZnB",
    brand: "ALTINTAR",
    image: "img/products/nutrilop-znb.jpeg",
    teaser: "Bor ve çinko içeriği ile çiçek tozu canlılığı, döllenme ve meyve tutumunda maksimum verim.",
    stages: ["ciceklenme", "meyve-tutumu"],
    bullets: [
      "Bor ve çinko içeriği sayesinde meyve ve sebzelerde çiçek tozunun canlılığını artırarak döllenmeyi ve meyve tutum oranını en üst seviyeye çıkarır.",
      "Hücre bölünmesini ve hormon sentezini destekleyerek bitkinin büyüme uçlarının sağlıklı gelişmesini sağlar, şekil bozukluklarını engeller.",
      "Bitkinin mikro element ihtiyaçlarını karşılayarak stres koşullarına karşı direncini yükseltir ve ürün kalitesini doğrudan iyileştirir.",
      "Meyve ağaçlarında çiçek tomurcuklarının belirginleştiği dönemde, çiçeklenme öncesinde ve meyve tutum periyodunda uygulanabilir.",
      "Sebzelerde çiçeklenmeden hemen önceki dönemde, çiçeklenme başlangıcında ve meyve bağlama evresinde düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "NUTRILOP Mg",
    brand: "ALTINTAR",
    image: "img/products/nutrilop-mg.jpeg",
    teaser: "Yüksek magnezyum ve nitrat azotu ile klorofil sentezi ve fotosentez verimi.",
    stages: ["vejetatif", "irilesme"],
    bullets: [
      "İçeriğindeki yüksek magnezyum ve nitrat azotu sayesinde klorofil sentezini maksimum düzeyde destekleyerek meyve ve sebzelerde yeşil aksamı ve fotosentez verimini artırır.",
      "Molibden katkısı ile bitkinin azot metabolizmasını optimize eder, yaşlı yapraklarda sararmaları önleyerek sağlıklı ve güçlü bir bitki gelişimi sağlar.",
      "Meyve ve sebzelerin besin maddelerinden etkin bir şekilde yararlanmasına imkan tanır, meyve kalitesini ve genel verimliliği doğrudan destekler.",
      "Meyve ağaçlarında yaprak gelişiminin yoğun olduğu dönemlerde, meyve irileşme sürecinde ve magnezyum noksanlığı gözlenen periyotlarda uygulanabilir.",
      "Sebzelerde hızlı büyüme evresinde, meyve tutumu sonrasında ve yapraklarda fotosentezi engelleyecek sararmalar meydana geldiğinde düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "NUTRILOP BOR",
    brand: "ALTINTAR",
    image: "img/products/nutrilop-bor.jpeg",
    teaser: "Bor etanol amin formülasyonu ile çiçek tozu canlılığı ve şekil bozukluklarının önlenmesi.",
    stages: ["ciceklenme", "meyve-tutumu"],
    bullets: [
      "İçeriğindeki bor etanol amin formülasyonu sayesinde meyve ve sebzelerde çiçek tozunun canlılığını artırarak döllenmeyi ve meyve tutumunu güçlü bir şekilde destekler.",
      "Hücre duvarı sentezinde ve şeker taşınımında kritik rol oynayarak meyve ve sebzelerde şekil bozukluklarını önler, ürün kalitesini ve pazar değerini yükseltir.",
      "Bitkinin büyüme uçlarının sağlıklı gelişmesini sağlayarak sürgün gelişimini optimize eder ve verim kayıplarının önüne geçer.",
      "Meyve ağaçlarında çiçek tomurcuklarının belirginleştiği dönemde, çiçeklenme döneminde ve hasat sonrası uygulanabilir.",
      "Sebzelerde çiçeklenmeden hemen önceki dönemde, çiçeklenme başlangıcında ve meyve tutumunu artırmak amacıyla düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "FERTİZYME -SP",
    brand: "ALTINTAR",
    image: "img/products/fertizyme-sp.jpeg",
    teaser: "Zengin enzim ve organik bileşenlerle kök gelişimini tetikler, toprak biyolojisini canlandırır.",
    stages: ["vejetatif"],
    bullets: [
      "İçeriğindeki zengin enzimler ve organik bileşenler sayesinde meyve ve sebzelerde kök gelişimini muazzam seviyede tetikleyerek bitkinin topraktaki besin elementlerini daha etkin kullanmasını sağlar.",
      "Toprak biyolojisini canlandırarak bitki kök bölgesindeki yararlı mikroorganizma faaliyetlerini artırır, böylece daha güçlü ve sağlıklı bir bitki yapısı oluşumuna destek olur.",
      "Çevresel ve toprak kaynaklı stres faktörlerine karşı bitkinin direncini yükselterek, köklerin besin emilim kapasitesini maksimize eder ve genel verimliliği artırır.",
      "Meyve fidanlarında güçlü kök yapısı oluşturmak için düzenli olarak kullanılabilir.",
      "Sebzelerde fide dikimi ile birlikte kök gelişimini teşvik etmek amacıyla, büyüme sezonu boyunca bitkide güçsüzlük görüldüğü dönemlerde düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "CYTOKIN PLUS",
    brand: "ALTINTAR",
    image: "img/products/cytokin-plus.jpeg",
    teaser: "Alginik asit ve organik maddelerle hücre bölünmesi, meyve irileşmesi ve gelişim hızlanır.",
    stages: ["ciceklenme", "meyve-tutumu", "irilesme", "stres"],
    bullets: [
      "İçeriğindeki alginik asit ve bitkisel kaynaklı organik maddeler sayesinde meyve ve sebzelerde hücre bölünmesini teşvik ederek meyve irileşmesini ve bitki gelişimini hızlandırır.",
      "Bitki hormonlarını dengeleyici etkisi ile meyve ve sebzelerin çiçeklenme sonrası meyve bağlama kapasitesini artırarak verim kaybını minimize eder.",
      "Stres koşullarına karşı bitkinin doğal direncini güçlendirir, meyve ve sebzelerde daha homojen, kaliteli ve pazar değeri yüksek ürünler oluşmasına yardımcı olur.",
      "Meyve ağaçlarında çiçeklenme sonrasında meyve tutumunu desteklemek amacıyla ve meyve irileşme dönemlerinde periyodik olarak uygulanabilir.",
      "Sebzelerde çiçeklenme başlangıcından itibaren meyve gelişimi süresince, bitkinin büyüme enerjisini korumak için düzenli aralıklarla kullanılabilir."
    ]
  },
  {
    name: "BLACKJAK SC",
    brand: "ALTINTAR",
    image: "img/products/blackjak-sc.jpeg",
    teaser: "Yüksek hümik ve fulvik asit ile toprak yapısını düzenler, besin alımını maksimize eder.",
    stages: ["vejetatif", "stres"],
    bullets: [
      "Yüksek oranda hümik ve fulvik asit içeren özel formülasyonu ile meyve ve sebzelerde toprağın yapısını düzenler, toprağa bağlanmış şekilde bulunan besin elementlerinin bitki tarafından alımını maksimum düzeye çıkarır.",
      "Kök gelişimini güçlü bir şekilde teşvik ederek meyve ve sebzelerin topraktan su ve besin elementi çekme kapasitesini artırır, bitkiyi daha dayanıklı hale getirir.",
      "Stres koşullarına (kuraklık, tuzluluk, pH dengesizliği vb.) karşı bitkinin direncini artırarak verim kaybını önler ve ürün kalitesinin iyileşmesine yardımcı olur.",
      "Meyve ve sebzelerde her periyotta düzenli aralıklar ile kullanılabilir. Düşük pH değeri ile diğer gübreler ile kullanıldığında hızlı alınım ve taşınma sağlar."
    ]
  },
  {
    name: "ALAMIN ZN",
    brand: "ALTINTAR",
    image: "img/products/alamin-zn.jpeg",
    teaser: "Yüksek çinko ve serbest amino asit içeriği ile enzim aktivitesi ve köklenme desteği.",
    stages: ["vejetatif", "ciceklenme"],
    bullets: [
      "Yüksek çinko ve serbest amino asit içeriği sayesinde meyve ve sebzelerde enzim aktivitesini hızlandırarak bitki gelişimini ve köklenmeyi güçlü bir şekilde destekler.",
      "Çinkonun bitki içi hormon sentezindeki rolüyle çiçeklenmeyi teşvik eder ve mikro element noksanlığından kaynaklanan yaprak küçülmeleri ile gelişim geriliklerini önler.",
      "Organik madde desteği ile besin elementlerinin alımını kolaylaştırarak meyve ve sebzelerin kalitesini, verimini ve hastalıklara karşı direncini artırır.",
      "Meyve ağaçlarında vejetatif büyümenin başladığı ilkbahar döneminde, çiçeklenme öncesinde ve sürgün gelişim periyotlarında uygulanabilir.",
      "Sebzelerde fide dikiminden hemen sonra şoku atlatmak, gelişimi hızlandırmak ve çiçeklenme öncesi dönemde düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "ALAMIN CA",
    brand: "ALTINTAR",
    image: "img/products/alamin-ca.jpeg",
    teaser: "Kalsiyum ve bor kombinasyonu ile hücre yapısı, meyve kalitesi ve raf ömrü artışı.",
    stages: ["meyve-tutumu", "irilesme"],
    bullets: [
      "İçeriğindeki kalsiyum ve bor kombinasyonu, meyve ve sebzelerde hücre yapısını güçlendirerek meyve kalitesini, dayanıklılığını ve raf ömrünü doğrudan artırır.",
      "Organik madde ve serbest amino asit desteği, kalsiyumun bitki bünyesinde hızlı taşınmasını sağlayarak meyve çatlamalarını ve fizyolojik bozuklukları minimize eder.",
      "Bitkinin çiçeklenme ve meyve bağlama dönemlerinde ihtiyaç duyduğu kalsiyumu sağlayarak, daha sağlıklı ve pazar değeri yüksek ürünler elde edilmesine yardımcı olur.",
      "Meyve ağaçlarında meyve tutumu sonrası gelişme döneminden hasat öncesine kadar kalsiyum ihtiyacının yüksek olduğu evrelerde periyodik olarak kullanılabilir.",
      "Sebzelerde bağlama döneminden itibaren sebze irileşme süreci boyunca ihtiyaç duyulan dönemlerde düzenli olarak uygulanabilir."
    ]
  },

  // ---------------- AGROLEAF POWER ----------------
  {
    name: "AGROLEAF POWER 20-20-20",
    brand: "ALTINTAR",
    image: "img/products/agroleaf-power-total.jpeg",
    teaser: "Dengeli NPK içeriği ile vejetatif gelişimi ve genel bitki sağlığını eş zamanlı destekler.",
    stages: ["vejetatif", "stres"],
    bullets: [
      "Dengeli NPK içeriği, meyve ve sebzelerde hem vejetatif gelişimi hem de genel bitki sağlığını eş zamanlı olarak destekleyerek dengeli bir beslenme sağlar.",
      "İçeriğindeki özel M-77 chelating ajanı ve iz element (TE) takviyesi, besin maddelerinin yapraktan hızlı ve etkin bir şekilde alınmasına olanak tanıyarak bitki metabolizmasını güçlendirir.",
      "Bitkinin her türlü gelişim döneminde ihtiyaç duyduğu ana besinleri karşılayarak, bitkinin stres koşullarına karşı toleransını artırır ve genel verimliliği yükseltir."
    ]
  },
  {
    name: "AGROLEAF POWER 12-52-5",
    brand: "ALTINTAR",
    image: "img/products/agroleaf-power-highp.jpeg",
    teaser: "Yüksek fosfor içeriğiyle kök gelişimini hızlandırır, çiçeklenme oranını artırır.",
    stages: ["vejetatif", "ciceklenme"],
    bullets: [
      "Yüksek fosfor içeriği sayesinde meyve ve sebzelerde kök sisteminin gelişimini hızlandırır, çiçeklenme oranını ve çiçek kalitesini artırır.",
      "İçeriğindeki özel M-77 formülasyonu ve dengeli iz element (TE) takviyesi, besin maddelerinin yapraktan en üst düzeyde alınmasını sağlayarak bitki direncini artırır.",
      "Çiçeklenme öncesi ve çiçek tutum döneminde bitkinin enerji ihtiyacını karşılayarak dökülmeleri azaltır ve sağlıklı meyve bağlamayı destekler.",
      "Meyve ağaçlarında ilkbaharda çiçek tomurcuklarının gelişim döneminde ve çiçeklenme periyotlarında uygulanabilir.",
      "Sebzelerde fide dikiminden hemen sonra köklenmeyi teşvik etmek amacıyla ve çiçeklenmeden hemen önceki dönemde düzenli olarak kullanılabilir."
    ]
  },
  {
    name: "AGROLEAF POWER 11-5-19+9(CaO)",
    brand: "ALTINTAR",
    image: "img/products/agroleaf-power-calcium.jpeg",
    teaser: "Yüksek kalsiyum, magnezyum ve potasyum ile hücre duvarını güçlendirir, raf ömrünü artırır.",
    stages: ["meyve-tutumu", "irilesme"],
    bullets: [
      "Yüksek kalsiyum (%9 CaO), magnezyum ve potasyum içeriğiyle meyve ve sebzelerde hücre duvarlarını güçlendirerek meyve kalitesini, sertliğini ve raf ömrünü artırır.",
      "Özel M-77 chelating ajanı ve iz element (TE) takviyesi sayesinde besin maddelerinin yapraktan hızlı ve kayıpsız bir şekilde emilmesini sağlayarak bitki metabolizmasını destekler.",
      "Çiçek burnu çürüklüğü ve acı benek gibi kalsiyum noksanlığından kaynaklanan fizyolojik bozuklukların önlenmesinde yüksek etki gösterir.",
      "Meyve ağaçlarında meyve tutumundan itibaren irileşme dönemi boyunca ve hasada kadar belirli aralıklarla uygulanabilir.",
      "Sebzelerde hızlı büyüme döneminden itibaren meyve oluşumu ve gelişimi sürecinde düzenli periyotlarla kullanılabilir."
    ]
  },

  // ---------------- AGRO ATP ----------------
  {
    name: "CROP+EXTRA",
    brand: "AGRO ATP",
    image: "img/products/crop-extra.jpeg",
    teaser: "Zengin organik madde ve dengeli NPK içeriği ile döllenmeyi ve çiçek tutumunu düzenler.",
    stages: ["ciceklenme", "meyve-tutumu", "irilesme"],
    bullets: [
      "Bitkisel menşeli zengin organik madde ve dengeli NPK içeriği sayesinde meyve ve sebzelerde döllenmeyi artırarak çiçek tutumunu ve genetik kodların oluşmasını düzenler.",
      "İçeriğindeki mikro elementler (demir, çinko, mangan, bakır vb.) bitkinin metabolik fonksiyonlarını optimize ederek daha sağlıklı, canlı ve hastalıklara dirençli bir yapı kazandırır.",
      "Bitki besin elementlerinin alımını kolaylaştırarak, meyve ve sebzelerin kalite standartlarını (renk, irilik, tat) üst seviyeye taşır."
    ]
  },
  {
    name: "ZN MN FOLİAR",
    brand: "AGRO ATP",
    image: "img/products/zn-mn-foliar.jpeg",
    teaser: "Yüksek çinko ve mangan ile enzim aktivitesini hızlandırır, sararmaları tedavi eder.",
    stages: ["vejetatif"],
    bullets: [
      "İçeriğindeki yüksek çinko ve mangan sayesinde sebzelerde enzim aktivitesini hızlandırarak fotosentez kapasitesini ve bitki büyüme hızını belirgin şekilde artırır.",
      "Bitkide çinko ve mangan eksikliğine bağlı olarak görülen yaprak sararmalarını, küçük yaprak oluşumunu ve gelişme geriliklerini hızla tedavi eder.",
      "Sebzelerin stres koşullarına karşı dayanıklılığını güçlendirir, meyve kalitesini artırarak daha homojen ve sağlıklı ürün gelişimi sağlar.",
      "Sebzelerde vejetatif gelişimin yoğun olduğu fide döneminden itibaren, büyüme süreci boyunca noksanlık belirtileri görülmeden önce önleyici olarak veya eksiklik hissedildiğinde uygulanabilir."
    ]
  },
  {
    name: "MAX CUAJE",
    brand: "AGRO ATP",
    image: "img/products/max-cuaje.jpeg",
    teaser: "Yüksek fosfor, bor ve molibden desteği ile çiçek dökümünü azaltır, meyve tutumunu artırır.",
    stages: ["ciceklenme", "meyve-tutumu"],
    bullets: [
      "Yüksek fosfor içeriği ve bor-molibden desteği ile sebzelerde çiçeklenmeyi teşvik eder, çiçek dökümlerini azaltarak meyve tutumunu maksimuma çıkarır.",
      "İçeriğindeki iz elementler (çinko, mangan), sebzelerin metabolik faaliyetlerini hızlandırarak döllenme kalitesini artırır ve daha sağlıklı meyve oluşumu sağlar.",
      "Bitkinin enerji transferini güçlendirerek sebzelerin erken dönem gelişimini destekler ve çiçekten meyveye geçiş sürecinde ihtiyaç duyulan besinleri doğrudan sağlar.",
      "Sebzelerde çiçeklenme başlangıcından tam çiçeklenme dönemine kadar ve meyve tutumunu garanti altına almak amacıyla kritik dönemlerde uygulanabilir."
    ]
  },
  {
    name: "CALMAG",
    brand: "AGRO ATP",
    image: "img/products/calmag.jpeg",
    teaser: "Kalsiyum ve magnezyum ile hücre duvarını güçlendirir, fizyolojik bozuklukları önler.",
    stages: ["vejetatif", "meyve-tutumu", "irilesme"],
    bullets: [
      "İçeriğindeki kalsiyum ve magnezyum sayesinde sebzelerde hücre duvarlarını güçlendirerek meyve sertliğini artırır ve fizyolojik bozuklukların (çiçek burnu çürüklüğü vb.) önüne geçer.",
      "Magnezyum desteği ile bitkide klorofil üretimini teşvik ederek fotosentez verimini artırır, böylece daha yeşil, canlı ve gelişmiş bir yaprak yapısı sağlar.",
      "Amino asitlerle şelatlı yapısı, besin elementlerinin sebzeler tarafından hızlı ve kolay bir şekilde alınıp taşınmasına olanak tanır.",
      "Sebzelerde hızlı büyüme döneminde, meyve tutumu ile birlikte meyve irileşme sürecinde ve kalsiyum ihtiyacının zirve yaptığı dönemlerde düzenli olarak uygulanabilir."
    ]
  },
  {
    name: "AMİNOQ",
    brand: "AGRO ATP",
    image: "img/products/aminoq.jpeg",
    teaser: "Yüksek amino asit ve organik madde içeriği ile kök gelişimi ve bitki canlılığı desteği.",
    stages: ["vejetatif", "ciceklenme", "stres"],
    bullets: [
      "Bitkisel menşeli yüksek amino asit ve organik madde içeriği sayesinde sebzelerde kök gelişimini ve bitki canlılığını güçlü bir şekilde destekler.",
      "Serbest amino asitler ve potasyum içeriği, sebzelerde çiçeklenme ve meyve bağlama oranını artırarak verim kayıplarını önler.",
      "Sıcaklık şoku, kuraklık ve dikim şoku gibi çevresel stres faktörlerine karşı sebzelerin direncini ve adaptasyon yeteneğini maksimum düzeyde yükseltir.",
      "Sebzelerde fide dikiminden hemen sonra, çiçeklenme öncesi dönemde ve stresli hava koşullarında düzenli olarak kullanılabilir."
    ]
  },
  // ---------------- CSR BIO ----------------
  {
    name: "CLEAN PRO",
    brand: "AGRO ATP",
    image: "img/products/clean-pro.jpeg",
    teaser: "pH regülatörü ve dezenfektan; ateş yanıklığı, dal kanseri gibi bakteriyel hastalıkları durdurur.",
    stages: ["vejetatif", "stres"],
    bullets: [
      "Ateş yanıklığı, dal kanseri, bakteriyel kanser gibi bakteriyel hastalıkları durdurarak ilerlemeyi keser.",
      "Seralarda veya açık arazilerde demir, tarım ekipmanları vb. yüzeylerde dezenfektan görevi görür."
    ]
  }
];

// ---------------- Count-up stats ----------------
function animateCount(el){
  const raw = el.textContent.trim();
  const match = raw.match(/(\d+)/);
  if(!match) return;
  const target = parseInt(match[1], 10);
  const prefix = raw.slice(0, match.index);
  const suffix = raw.slice(match.index + match[1].length);
  const duration = 1100;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.round(target * eased) + suffix;
    if(progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll(".hero__stats span").forEach(animateCount);

// ---------------- Scroll reveal ----------------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

function observeReveals(root = document){
  root.querySelectorAll(".reveal:not(.is-visible)").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
    revealObserver.observe(el);
  });
}
observeReveals();

// ---------------- Hero slider ----------------
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDots = Array.from(document.querySelectorAll(".hero-dot"));
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
let heroIndex = 0;
let heroTimer = null;

function goToHeroSlide(index){
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((s, i) => s.classList.toggle("is-active", i === heroIndex));
  heroDots.forEach((d, i) => d.classList.toggle("is-active", i === heroIndex));
}

function startHeroAutoplay(){
  stopHeroAutoplay();
  heroTimer = setInterval(() => goToHeroSlide(heroIndex + 1), 6000);
}
function stopHeroAutoplay(){
  if(heroTimer) clearInterval(heroTimer);
}

if(heroSlides.length){
  heroNext.addEventListener("click", () => { goToHeroSlide(heroIndex + 1); startHeroAutoplay(); });
  heroPrev.addEventListener("click", () => { goToHeroSlide(heroIndex - 1); startHeroAutoplay(); });
  heroDots.forEach(dot => dot.addEventListener("click", () => {
    goToHeroSlide(parseInt(dot.dataset.index, 10));
    startHeroAutoplay();
  }));
  const heroSection = document.getElementById("top");
  heroSection.addEventListener("mouseenter", stopHeroAutoplay);
  heroSection.addEventListener("mouseleave", startHeroAutoplay);
  startHeroAutoplay();
}

// ---------------- Nav toggle ----------------
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}));

// ---------------- Product grid ----------------
const productGrid = document.getElementById("productGrid");
const brandTabs = document.getElementById("brandTabs");
let activeBrand = "all";

function productCardHTML(p, i){
  const media = p.image
    ? `<div class="product-card__media"><img src="${p.image}" alt="${p.name}"></div>`
    : `<div class="product-card__media product-card__media--empty">🌿</div>`;
  return `
    <article class="product-card reveal" id="product-${i}">
      ${media}
      <button class="product-card__head" aria-expanded="false" data-index="${i}">
        <span>
          <p class="product-card__brand">${p.brand}${p.category ? ` <span class="product-card__category">· ${p.category}</span>` : ""}</p>
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__teaser">${p.teaser}</p>
        </span>
        <span class="product-card__toggle" aria-hidden="true">+</span>
      </button>
      <div class="product-card__body">
        <ul class="product-card__list">
          ${p.bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
      </div>
    </article>
  `;
}

function renderProducts(){
  const list = activeBrand === "all" ? PRODUCTS : PRODUCTS.filter(p => p.brand === activeBrand);
  productGrid.innerHTML = list.map((p, i) => productCardHTML(p, i)).join("");

  productGrid.querySelectorAll(".product-card__head").forEach(head => {
    head.addEventListener("click", () => {
      const card = head.closest(".product-card");
      const isOpen = card.classList.toggle("is-open");
      head.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  if(typeof observeReveals === "function") observeReveals(productGrid);
}
renderProducts();

brandTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".brand-tab");
  if(!btn) return;
  brandTabs.querySelectorAll(".brand-tab").forEach(t => t.classList.remove("is-active"));
  btn.classList.add("is-active");
  activeBrand = btn.dataset.brand;
  renderProducts();
});

// ---------------- Growth stage tabs ----------------
const stageTabs = document.getElementById("stageTabs");
const stagePanel = document.getElementById("stagePanel");

function renderStage(stageKey){
  const matches = PRODUCTS.filter(p => p.stages.includes(stageKey));
  stagePanel.innerHTML = matches.map(p => `
    <div class="stage-chip">
      <h4>${p.name}</h4>
      <p>${p.teaser}</p>
    </div>
  `).join("") || `<p style="color:rgba(255,255,255,.6)">Bu evre için ürün bulunamadı.</p>`;
}

stageTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".stage-tab");
  if(!btn) return;
  stageTabs.querySelectorAll(".stage-tab").forEach(t => {
    t.classList.remove("is-active");
    t.setAttribute("aria-selected", "false");
  });
  btn.classList.add("is-active");
  btn.setAttribute("aria-selected", "true");
  renderStage(btn.dataset.stage);
});

renderStage("vejetatif");

// ---------------- Misc ----------------
document.getElementById("year").textContent = new Date().getFullYear();

const newsletterForm = document.getElementById("newsletterForm");
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = newsletterForm.querySelector("input");
  input.value = "";
  input.placeholder = "Kaydınız alındı, teşekkürler!";
});

// ---------------- Admin panelinden eklenen ürünler (Supabase) ----------------
const SUPABASE_URL = "https://xrzonxgaoanhoijloyag.supabase.co";
const SUPABASE_KEY = "sb_publishable_t_DLqABupEfr5goqtOW2JA_gwrFim-g";

async function loadSupabaseProducts(){
  if(!window.supabase) return;
  try{
    const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data, error } = await sbClient.from("product").select("*").order("created_at", { ascending: false });
    if(error || !data || !data.length) return;

    const mapped = data.map(row => {
      const desc = (row.description || "").trim();
      const lines = desc.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const firstLine = lines[0] || "";
      return {
        name: row.name || "İsimsiz Ürün",
        brand: row.brand || "KIMITEC",
        category: row.category || "",
        image: row.img_url || null,
        teaser: firstLine.length > 120 ? firstLine.slice(0, 117) + "…" : firstLine,
        stages: [],
        bullets: lines.length ? lines : []
      };
    });

    PRODUCTS.push(...mapped);
    renderProducts();
  } catch(e){
    // Sessizce geç — statik ürün kataloğu zaten gösteriliyor
  }
}
loadSupabaseProducts();

// ---------------- Blog yazıları (Supabase) ----------------
const blogGrid = document.getElementById("blogGrid");
const blogLoading = document.getElementById("blogLoading");
const blogEmpty = document.getElementById("blogEmpty");
const BLOG_ICONS = ["leaf", "amber", "soil"];
const BLOG_EMOJIS = ["🌱", "🌾", "💧"];

function formatBlogDate(iso){
  try{
    const d = new Date(iso);
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
  } catch(e){
    return "";
  }
}

function blogCardHTML(post, i){
  const iconClass = BLOG_ICONS[i % BLOG_ICONS.length];
  const emoji = BLOG_EMOJIS[i % BLOG_EMOJIS.length];
  const media = post.image_url
    ? `<div class="blog-card__media"><img src="${post.image_url}" alt="${post.title || ""}"></div>`
    : `<div class="blog-card__icon blog-card__icon--${iconClass}" aria-hidden="true">${emoji}</div>`;

  const contentLines = (post.content || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  return `
    <article class="blog-card reveal" data-index="${i}">
      ${media}
      <p class="blog-card__meta">
        ${post.category ? `<span class="blog-card__tag">${post.category}</span>` : ""}
        <span class="blog-card__date">${formatBlogDate(post.created_at)}</span>
      </p>
      <h3>${post.title || "İsimsiz Yazı"}</h3>
      <p>${post.excerpt || ""}</p>
      ${contentLines.length ? `
        <button type="button" class="blog-card__link" data-blog-toggle="${i}">Devamını Oku →</button>
        <div class="blog-card__body">
          ${contentLines.map(l => `<p>${l}</p>`).join("")}
        </div>
      ` : ""}
    </article>
  `;
}

async function loadSupabaseBlogPosts(){
  if(!window.supabase){
    blogLoading.hidden = true;
    blogEmpty.hidden = false;
    return;
  }
  try{
    const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data, error } = await sbClient.from("blog_post").select("*").order("created_at", { ascending: false });

    blogLoading.hidden = true;

    if(error || !data || !data.length){
      blogEmpty.hidden = false;
      return;
    }

    blogGrid.innerHTML = data.map((post, i) => blogCardHTML(post, i)).join("");

    blogGrid.querySelectorAll("[data-blog-toggle]").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest(".blog-card").classList.toggle("is-open");
      });
    });

    if(typeof observeReveals === "function") observeReveals(blogGrid);
  } catch(e){
    blogLoading.hidden = true;
    blogEmpty.hidden = false;
  }
}
loadSupabaseBlogPosts();
