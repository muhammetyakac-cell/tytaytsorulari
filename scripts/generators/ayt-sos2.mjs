import { randInt, pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

const r = (a, b) => randInt(a, b);

// ─── Tarih2 ───────────────────────────────────────────────────────────────────

function templateCumhuriyetDonemi() {
  const q = pick([
    { q: 'Türkiye Cumhuriyeti\'nin ilk anayasas\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: '1921 Teşkilat-\\u0131 Esasiye', w: ['1876 Kanun-i Esasi', '1924 Anayasas\\u0131', '1961 Anayasas\\u0131', '1982 Anayasas\\u0131'], e: '1921 Teşkilat-\\u0131 Esasiye, Cumhuriyet\'in ilk anayasas\\u0131d\\u0131r. 1924 Anayasas\\u0131 ise ilk cumhuriyet anayasas\\u0131d\\u0131r.' },
    { q: 'Cumhuriyet\'in ilan edildi\\ği tarih a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: '29 Ekim 1923', w: ['23 Nisan 1920', '19 May\\u0131s 1919', '9 Eylül 1922', '24 Temmuz 1923'], e: 'Cumhuriyet, 29 Ekim 1923\'te ilan edilmiştir. 23 Nisan 1920 TBMM\'nin aç\\u0131l\\u0131ş\\u0131d\\u0131r.' },
    { q: 'Halifeli\\ğin kald\\u0131r\\u0131ld\\u0131\\ğ\\u0131 tarih a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: '3 Mart 1924', w: ['29 Ekim 1923', '20 Nisan 1924', '30 A\\ğustos 1925', '10 Kas\\u0131m 1938'], e: 'Halifelik, 3 Mart 1924\'te ç\\u0131kar\\u0131lan kanunla kald\\u0131r\\u0131lm\\u0131şt\\u0131r.' },
    { q: 'Türkiye\'de çok partili hayata ilk geçiş denemesi hangi partiyle yap\\u0131lm\\u0131şt\\u0131r?', a: 'Terakkiperver Cumhuriyet F\\u0131rkas\\u0131', w: ['Serbest Cumhuriyet F\\u0131rkas\\u0131', 'Demokrat Parti', 'Millet Partisi', 'Adalet Partisi'], e: '\\u0130lk çok partili geçiş denemesi 1924\'te kurulan Terakkiperver Cumhuriyet F\\u0131rkas\\u0131 ile yap\\u0131lm\\u0131şt\\u0131r.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateAtaturkIlkeleri() {
  const q = pick([
    { q: 'A\\u015fa\\u011f\\u0131daki Atatürk ilkelerinden hangisi di\\ğerlerine göre daha öncelikli ve kapsay\\u0131c\\u0131d\\u0131r?', a: 'Cumhuriyetçilik', w: ['Laiklik', 'Milliyetçilik', 'Devletçilik', 'Halkç\\u0131l\\u0131k'], e: 'Cumhuriyetçilik, Atatürk ilkelerinin temelini oluşturur ve di\\ğer ilkelerin uygulanmas\\u0131n\\u0131 sa\\ğlar.' },
    { q: 'Laiklik ilkesi a\\u015fa\\u011f\\u0131daki ink\\u0131laplardan hangisiyle do\\ğrudan ilişkilidir?', a: 'Halifeli\\ğin kald\\u0131r\\u0131lmas\\u0131', w: ['Şapka Kanunu', 'Soyad\\u0131 Kanunu', 'Medeni Kanun\'un kabulü', 'K\\u0131yafet ink\\u0131lab\\u0131'], e: 'Laiklik ilkesi do\\ğrultusunda 1924\'te halifelik kald\\u0131r\\u0131lm\\u0131ş, din-devlet işleri ayr\\u0131lm\\u0131şt\\u0131r.' },
    { q: 'Devletçilik ilkesinin Türkiye\'de uygulanmas\\u0131n\\u0131n temel nedeni a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Özel sermayenin yetersiz olmas\\u0131', w: ['Liberal ekonominin başar\\u0131s\\u0131z olmas\\u0131', 'D\\u0131ş borçlar\\u0131n ödenmesi', 'Savaş tehlikesi', 'Nüfusun az olmas\\u0131'], e: '1930\'larda özel sermaye yetersiz oldu\\ğu için devlet öncülü\\ğünde sanayileşme politikas\\u0131 (devletçilik) uygulanm\\u0131şt\\u0131r.' },
    { q: '"Egemenlik kay\\u0131ts\\u0131z şarts\\u0131z milletindir" sözü a\\u015fa\\u011f\\u0131daki ilkelerden hangisiyle do\\ğrudan ilgilidir?', a: 'Cumhuriyetçilik', w: ['Milliyetçilik', 'Halkç\\u0131l\\u0131k', 'Laiklik', '\\u0130nk\\u0131lapç\\u0131l\\u0131k'], e: 'Bu söz, Cumhuriyetçilik ilkesinin özünü oluşturur. Egemenli\\ğin millete ait oldu\\ğunu ifade eder.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateCokPartiliSogukSavas() {
  const q = pick([
    { q: 'Türkiye\'de 1950 seçimlerini kazanarak iktidara gelen parti a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Demokrat Parti', w: ['Cumhuriyet Halk Partisi', 'Millet Partisi', 'Adalet Partisi', 'Terakkiperver Cumhuriyet F\\u0131rkas\\u0131'], e: '1950 seçimlerini DP kazanm\\u0131ş, 27 y\\u0131ll\\u0131k CHP iktidar\\u0131 sona ermiştir.' },
    { q: 'So\\ğuk Savaş döneminde Türkiye\'nin hangi örgüte üye olmas\\u0131 bat\\u0131 blokuna dahil oldu\\ğunu göstermiştir?', a: 'NATO', w: ['Varşova Pakt\\u0131', 'Birleşmiş Milletler', 'Avrupa Birli\\ği', 'Ba\\ğdat Pakt\\u0131'], e: 'Türkiye, 1952\'de NATO\'ya üye olarak bat\\u0131 blokunda yerini alm\\u0131şt\\u0131r.' },
    { q: '1961 Anayasas\\u0131\'n\\u0131n haz\\u0131rlanmas\\u0131na neden olan askeri müdahale a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: '27 May\\u0131s 1960', w: ['12 Mart 1971', '12 Eylül 1980', '28 Şubat 1997', '15 Temmuz 2016'], e: '27 May\\u0131s 1960 askeri müdahalesi sonras\\u0131 1961 Anayasas\\u0131 haz\\u0131rlanm\\u0131ş ve kabul edilmiştir.' },
    { q: 'So\\ğuk Savaş\'\\u0131n sona ermesine neden olan gelişme a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'SSCB\'nin da\\ğ\\u0131lmas\\u0131', w: ['Berlin Duvar\\u0131\'n\\u0131n y\\u0131k\\u0131lmas\\u0131', 'ABD\'nin üstünlük kurmas\\u0131', 'Çin\'in yükselişi', 'Avrupa Birli\\ği\'nin kurulmas\\u0131'], e: '1991\'de SSCB\'nin da\\ğ\\u0131lmas\\u0131 So\\ğuk Savaş\'\\u0131 sona erdirmiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Coğrafya2 ────────────────────────────────────────────────────────────────

function templateNufus() {
  const q = pick([
    { q: 'Türkiye\'de nüfus yo\\ğunlu\\ğu en fazla olan bölge a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Marmara Bölgesi', w: ['\\u0130\\u00e7 Anadolu Bölgesi', 'Ege Bölgesi', 'Akdeniz Bölgesi', 'Karadeniz Bölgesi'], e: 'Sanayi, ticaret ve ulaş\\u0131m olanaklar\\u0131n\\u0131n fazla oldu\\ğu Marmara Bölgesi en yo\\ğun nüfuslu bölgedir.' },
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi Türkiye\'de nüfusun da\\ğ\\u0131l\\u0131ş\\u0131n\\u0131 etkileyen do\\ğal faktörlerden biri de\\ğildir?', a: 'Sanayi tesisleri', w: ['\\u0130klim', 'Yer şekilleri', 'Su kaynaklar\\u0131', 'Toprak verimlili\\ği'], e: 'Sanayi tesisleri beşeri faktördür. \\u0130klim, yer şekilleri, su kaynaklar\\u0131 ve toprak verimlili\\ği do\\ğal faktörlerdir.' },
    { q: 'Türkiye\'de nüfus art\\u0131ş h\\u0131z\\u0131n\\u0131 düşürmek amac\\u0131yla uygulanan politikalar hangi dönemde başlam\\u0131şt\\u0131r?', a: '1960\'l\\u0131 y\\u0131llar', w: ['1923\'te Cumhuriyet\'in ilan\\u0131yla', '1950\'lerde çok partili hayata geçişle', '1980\'lerde ekonomik liberalleşmeyle', '2000\'li y\\u0131llarda AB süreciyle'], e: '1960\'l\\u0131 y\\u0131llardan itibaren nüfus art\\u0131ş h\\u0131z\\u0131n\\u0131 düşürmeye yönelik politikalar uygulanmaya başlanm\\u0131şt\\u0131r.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateSehirlesme() {
  const q = pick([
    { q: 'Türkiye\'de şehirleşme h\\u0131z\\u0131n\\u0131n en fazla oldu\\ğu dönem a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: '1950\'lerden sonra sanayileşmeyle', w: ['Cumhuriyet\'in ilk y\\u0131llar\\u0131', 'Osmanl\\u0131\'n\\u0131n son dönemi', '2000\'li y\\u0131llardan sonra', 'Kurtuluş Savaş\\u0131 y\\u0131llar\\u0131nda'], e: '1950\'lerde sanayileşme ve k\\u0131rdan kente g\\u00e7le birlikte şehirleşme h\\u0131zlanm\\u0131şt\\u0131r.' },
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi Türkiye\'de şehirlerin fonksiyonlar\\u0131na göre s\\u0131n\\u0131fland\\u0131r\\u0131lmas\\u0131nda kullan\\u0131lan kategorilerden biri de\\ğildir?', a: 'Akdeniz şehirleri', w: ['Sanayi şehirleri', '\\u0130dari şehirler', 'Liman şehirleri', 'Tar\\u0131m şehirleri'], e: 'Şehirler fonksiyonlar\\u0131na göre sanayi, idari, liman, tar\\u0131m, turizm vb. şeklinde s\\u0131n\\u0131fland\\u0131r\\u0131l\\u0131r.' },
    { q: 'Türkiye\'de gecekondulaşma sorununun temel nedeni a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'H\\u0131zl\\u0131 nüfus art\\u0131ş\\u0131 ve kente g\\u00e7', w: ['Deprem riski', 'Sanayi tesislerinin azl\\u0131\\ğ\\u0131', 'Tar\\u0131m alanlar\\u0131n\\u0131n verimsizli\\ği', 'E\\ğitim düzeyinin düşüklü\\ğü'], e: 'K\\u0131rdan kente h\\u0131zl\\u0131 g\\u00e7 ve nüfus art\\u0131ş\\u0131, konut ihtiyac\\u0131n\\u0131 karş\\u0131layamamakta, gecekondulaşmaya neden olmaktad\\u0131r.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateEkonomi() {
  const q = pick([
    { q: 'Türkiye\'de en fazla ekim alan\\u0131na sahip tar\\u0131m ürünü a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Bu\\ğday', w: ['Arpa', 'M\\u0131s\\u0131r', 'Pamuk', 'Ayçiçe\\ği'], e: 'Bu\\ğday, Türkiye\'de en geniş ekim alan\\u0131na sahip tar\\u0131m ürünüdür. \\u0130ç Anadolu başta olmak üzere yayg\\u0131n olarak yetiştirilir.' },
    { q: 'Türkiye\'nin en önemli enerji kaynaklar\\u0131ndan biri olan ve Do\\ğu Anadolu\'da yayg\\u0131n olan maden a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Linyit', w: ['Taş kömürü', 'Petrol', 'Do\\ğal gaz', 'Bor'], e: 'Linyit yataklar\\u0131 Türkiye\'de yayg\\u0131nd\\u0131r ve özellikle Do\\ğu Anadolu\'da (Elbistan) büyük rezervler bulunur.' },
    { q: 'Türkiye\'de turizm gelirlerinin en yüksek oldu\\ğu bölge a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Akdeniz Bölgesi', w: ['Ege Bölgesi', 'Marmara Bölgesi', 'Karadeniz Bölgesi', '\\u0130\\u00e7 Anadolu Bölgesi'], e: 'Akdeniz Bölgesi, deniz turizmi ve tarihi zenginlikleriyle en fazla turist çeken bölgedir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Felsefe ──────────────────────────────────────────────────────────────────

function templateIslamFelsefesi() {
  const q = pick([
    { q: '\\u0130slam felsefesinin öncüsü olarak kabul edilen ve "Kindî" olarak bilinen filozofun tam ad\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Eb\\u00fb Y\\u00fbsuf Ya\'k\\u00fbb el-Kindî', w: ['Eb\\u00fb Ali el-\\u00dcsincân\\u00ee', 'Muhammed bin M\\u00fbse el-H\\u00e2rizmî', 'Eb\\u00fb Nasr el-F\\u00e2r\\u00e2bî', 'Eb\\u00fb Ali ibn S\\u00een\\u00e2'], e: 'Kindî, \\u0130slam felsefesinin kurucusu kabul edilir ve 9. yüzy\\u0131lda yaşam\\u0131şt\\u0131r.' },
    { q: '"El-Medinet\\u00fc\'l-F\\u00e2z\\u0131la" (Erdemli Şehir) eseri a\\u015fa\\u011f\\u0131daki İslam filozoflar\\u0131ndan hangisine aittir?', a: 'F\\u00e2r\\u00e2bî', w: ['\\u0130bn S\\u00een\\u00e2', '\\u0130bn Rüşd', 'Gaz\\u00e2lî', 'Kindî'], e: 'F\\u00e2r\\u00e2bî, Erdemli Şehir (Medinet\\u00fc\'l-F\\u00e2z\\u0131la) adl\\u0131 eserinde ideal toplum düzenini anlatm\\u0131şt\\u0131r.' },
    { q: '\\u0130bn S\\u00een\\u00e2\'n\\u0131n t\\u0131p alan\\u0131ndaki ünlü eseri a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'El-Kanun fi\'t-T\\u0131b', w: ['Kit\\u00e2b\\u00fc\'ş-Şif\\u00e2', 'Teh\\u00e2f\\u00fct\\u00fc\'l-Fel\\u00e2sife', 'F\\u00fbs\\u00fbsu\'l-Hikem', '\\u0130hy\\u00e2-u Ul\\u00fbmi\'d-D\\u00een'], e: '\\u0130bn S\\u00een\\u00e2\'n\\u0131n El-Kanun fi\'t-T\\u0131b adl\\u0131 eseri, Avrupa\'da y\\u00fczy\\u0131llar boyunca t\\u0131p alan\\u0131nda temel kaynak olarak kullan\\u0131lm\\u0131şt\\u0131r.' },
    { q: 'Gaz\\u00e2lî\'nin felsefeye yöneltti\\ği eleştirileri i\\u00e7eren eseri a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Teh\\u00e2f\\u00fct\\u00fc\'l-Fel\\u00e2sife (Filozoflar\\u0131n Tutars\\u0131zl\\u0131\\ğ\\u0131)', w: ['El-Medinet\\u00fc\'l-F\\u00e2z\\u0131la', 'Kit\\u00e2b\\u00fc\'n-Nec\\u00e2t', 'Tuhfet\\u00fc\'l-Hikem', 'Mîz\\u00e2n\\u00fc\'l-Hikem'], e: 'Gaz\\u00e2lî, Teh\\u00e2f\\u00fct\\u00fc\'l-Fel\\u00e2sife adl\\u0131 eserinde filozoflar\\u0131n görüşlerini eleştirmiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('felsefe', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateModernFelsefe() {
  const q = pick([
    { q: '"Düşünüyorum, öyleyse var\\u0131m" (Cogito ergo sum) sözü a\\u015fa\\u011f\\u0131daki filozoflardan hangisine aittir?', a: 'Descartes', w: ['Spinoza', 'Leibniz', 'Locke', 'Hume'], e: 'Descartes, modern felsefenin kurucusu kabul edilir ve bu sözle bilginin temelini şüpheyle başlat\\u0131r.' },
    { q: 'Aşa\\u011f\\u0131dakilerden hangisi empirizm (deneycilik) ak\\u0131m\\u0131n\\u0131n temsilcisidir?', a: 'John Locke', w: ['Descartes', 'Platon', 'Hegel', 'Kant'], e: 'Locke\'a göre zihin do\\ğuştan boş bir levha (tabula rasa) gibidir ve tüm bilgiler deneyimle kazan\\u0131l\\u0131r.' },
    { q: 'Kant\'\\u0131n ahlak felsefesinde "kategorik imperatif" (koşulsuz buyruk) a\\u015fa\\u011f\\u0131dakilerden hangisini ifade eder?', a: 'Koşulsuz olarak uyulmas\\u0131 gereken ahlak yasas\\u0131n\\u0131', w: ['Mutlulu\\ğa ulaşma yöntemini', 'Toplumsal sözleşmeyi', 'Tanr\\u0131n\\u0131n varl\\u0131\\ğ\\u0131n\\u0131', 'Do\\ğal yasalar\\u0131'], e: 'Kategorik imperatif, Kant\'a göre koşulsuz, evrensel ve herkes i\\u00e7in geçerli olan ahlak yasas\\u0131d\\u0131r.' },
    { q: 'Varoluşçuluk (egzistansiyalizm) ak\\u0131m\\u0131n\\u0131n öncüsü olan filozof a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Jean-Paul Sartre', w: ['Friedrich Nietzsche', 'Søren Kierkegaard', 'Martin Heidegger', 'Albert Camus'], e: 'Sartre, "Varoluş özden önce gelir" sözüyle varoluşçulu\\ğun temel ilkesini belirlemiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('felsefe', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateBilimFelsefesi() {
  const q = pick([
    { q: 'Bilim felsefesinde "yanl\\u0131şlanabilirlik" (falsification) ilkesini ortaya atan düşünür a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Karl Popper', w: ['Thomas Kuhn', 'Francis Bacon', 'Auguste Comte', 'David Hume'], e: 'Popper\'a göre bilimsel bir teorinin bilimsel say\\u0131lmas\\u0131 i\\u00e7in yanl\\u0131şlanabilir olmas\\u0131 gerekir.' },
    { q: '"Paradigma" kavram\\u0131n\\u0131 bilim felsefesine kazand\\u0131ran düşünür a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Thomas Kuhn', w: ['Karl Popper', 'Paul Feyerabend', 'Imre Lakatos', 'Bertrand Russell'], e: 'Kuhn, "Bilimsel Devrimlerin Yap\\u0131s\\u0131" adl\\u0131 eserinde paradigma kavram\\u0131n\\u0131 ortaya atm\\u0131şt\\u0131r.' },
    { q: 'Pozitivizm (olguculuk) ak\\u0131m\\u0131n\\u0131n kurucusu a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Auguste Comte', w: ['Karl Marx', 'Friedrich Engels', 'Emile Durkheim', 'Herbert Spencer'], e: 'Comte, insanl\\u0131\\ğ\\u0131n teolojik, metafizik ve pozitif olmak üzere üç aşamadan geçti\\ğini savunmuştur.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('felsefe', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Din ──────────────────────────────────────────────────────────────────────

function templateIslamDusunce() {
  const q = pick([
    { q: '\\u0130slam düşünce tarihinde \"Ehl-i Sünnet\" ekollerinden biri a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Maturidilik', w: ['Kaderilik', 'Cebrilik', 'Müşebbihe', 'Mülhidlik'], e: 'Maturidilik, Eb\\u00fb Mans\\u00fbr el-Maturîdî\'ye dayanan Ehl-i Sünnet akaid ekollerinden biridir.' },
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi \\u0130slam düşüncesindeki itikadi (inançla ilgili) mezheplerden biridir?', a: 'Mutezile', w: ['Hanefilik', 'Şafilik', 'Malikilik', 'Hanbelilik'], e: 'Mutezile itikadi bir mezhep iken Hanefi, Şafi, Maliki ve Hanbeli f\\u0131khi (amel\\u00ee) mezheplerdir.' },
    { q: 'Cibril hadisi olarak bilinen rivayette a\\u015fa\\u011f\\u0131daki kavramlardan hangisi \\u0130slam\'\\u0131n temel esaslar\\u0131 aras\\u0131nda say\\u0131lmam\\u0131şt\\u0131r?', a: 'Mezhep', w: ['\\u0130slam', '\\u0130man', '\\u0130hsan'], e: 'Cibril hadisinde \\u0130slam, iman ve ihsan kavramlar\\u0131 say\\u0131lm\\u0131şt\\u0131r. Mezhep bu hadiste yer almamaktad\\u0131r.' },
    { q: 'Tasavvufi düşüncede \"vahdet-i vüc\\u00fbd\" (varl\\u0131\\ğ\\u0131n birli\\ği) anlay\\u0131ş\\u0131n\\u0131n en önemli temsilcisi a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Muhyiddin \\u0130bn\\u00fc\'l-Arabî', w: ['Mevl\\u00e2n\\u00e2 Cel\\u00e2ledd\\u00een-i R\\u00fbmî', 'Y\\u00fbnus Emre', 'Hac\\u0131 Bayr\\u00e2m-\\u0131 Velî', 'Hac\\u0131 Bektaş-\\u0131 Velî'], e: '\\u0130bn\\u00fc\'l-Arabî, "vahdet-i vüc\\u00fbd" ö\\ğretisinin sistemleştiricisidir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('din', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateGuncelDin() {
  const q = pick([
    { q: 'Fetva kavram\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisini ifade eder?', a: 'Dini bir sorunun uzman\\u0131 taraf\\u0131ndan cevapland\\u0131r\\u0131lmas\\u0131', w: ['\\u0130badetlerin yerine getirilmesi', 'Kur\'an okuma kurallar\\u0131', 'Peygamberin sözleri', 'Dini hükümlerin tümü'], e: 'Fetva, dini bir konuda yetkili bir kişi veya kurum taraf\\u0131ndan verilen dini görüştür.' },
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi güncel dini meselelerden biri olarak kabul edilmez?', a: 'Peygamberlerin say\\u0131s\\u0131', w: ['Organ nakli', 'Tüp bebek', 'Sigara içmenin hükmü', 'E-ticaret\'in dinili\\ği'], e: 'Peygamberlerin say\\u0131s\\u0131 sabit bir inanç konusuyken organ nakli, tüp bebek, sigara ve e-ticaret güncel f\\u0131khi meselelerdir.' },
    { q: 'Kur\'an-\\u0131 Kerim\'in ana konular\\u0131 aras\\u0131nda a\\u015fa\\u011f\\u0131dakilerden hangisi yer almaz?', a: 'Ekonomik sistem detaylar\\u0131', w: ['\\u0130nanç (akaid)', '\\u0130badetler', 'Ahlaki ilkeler', 'K\\u0131ssalar (geçmiş toplum hikayeleri)'], e: 'Kur\'an\'da inanç, ibadet, ahlak ve k\\u0131ssalar temel konulard\\u0131r. Detayl\\u0131 ekonomik sistem yerine temel ilkeler (helal-haram, faiz yasa\\ğ\\u0131 vb.) belirtilmiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('din', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateAhlakFelsefesi() {
  const q = pick([
    { q: 'Ahlak felsefesinde \"faydac\\u0131l\\u0131k\" (utilitarianism) anlay\\u0131ş\\u0131n\\u0131n temsilcisi a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Jeremy Bentham', w: ['Immanuel Kant', 'Aristoteles', 'Friedrich Nietzsche', 'John Rawls'], e: 'Bentham\'a göre bir eylemin ahlaki de\\ğeri, sa\\ğlad\\u0131\\ğ\\u0131 fayda veya mutlulukla ölçülür.' },
    { q: '\\u0130slam ahlak felsefesinde \"h\\u00fcsn ve kubh\" (iyilik ve kötülük) kavramlar\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisiyle ilgilidir?', a: 'Fiillerin iyi veya kötü olmas\\u0131n\\u0131n ölçütüyle', w: ['Namaz\\u0131n farz olmas\\u0131yla', 'Orucun vaktiyle', 'Zekat\\u0131n miktar\\u0131yla', 'Hacc\\u0131n şartlar\\u0131yla'], e: 'H\\u00fcsn ve kubh, fiillerin ak\\u0131l ve din aç\\u0131s\\u0131ndan iyi veya kötü olarak nitelendirilmesini konu al\\u0131r.' },
    { q: '"Alt\\u0131n Kural" olarak bilinen \"Kendine yap\\u0131lmas\\u0131n\\u0131 istemedi\\ğin şeyi başkas\\u0131na yapma\" ilkesi a\\u015fa\\u011f\\u0131daki düşünürlerden hangisiyle özdeşleşmiştir?', a: 'Konf\\u00fcyus', w: ['Sokrates', 'Aristoteles', 'Farabi', 'Gazali'], e: 'Alt\\u0131n Kural, Konf\\u00fcyus\'un ö\\ğretilerinde merkezi bir yere sahiptir ve birçok kültürde benzer şekilde ifade edilmiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('din', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

const templates = [
  templateCumhuriyetDonemi, templateAtaturkIlkeleri, templateCokPartiliSogukSavas,
  templateNufus, templateSehirlesme, templateEkonomi,
  templateIslamFelsefesi, templateModernFelsefe, templateBilimFelsefesi,
  templateIslamDusunce, templateGuncelDin, templateAhlakFelsefesi,
];

export function generate(count = 30) {
  return generateUnique(() => {
    const tpl = pick(templates);
    return tpl();
  }, count);
}
