import { randInt, pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

const r = (a, b) => randInt(a, b);

// ─── Tarih2 ───────────────────────────────────────────────────────────────────

function templateCumhuriyetDonemi() {
  const q = pick([
    { q: 'Türkiye Cumhuriyeti\'nin ilk anayasası aşağıdakilerden hangisidir?', a: '1921 Teşkilat-ı Esasiye', w: ['1876 Kanun-i Esasi', '1924 Anayasası', '1961 Anayasası', '1982 Anayasası'], e: '1921 Teşkilat-ı Esasiye, Cumhuriyet\'in ilk anayasasıdır. 1924 Anayasası ise ilk cumhuriyet anayasasıdır.' },
    { q: 'Cumhuriyet\'in ilan edildi\\ği tarih aşağıdakilerden hangisidir?', a: '29 Ekim 1923', w: ['23 Nisan 1920', '19 Mayıs 1919', '9 Eylül 1922', '24 Temmuz 1923'], e: 'Cumhuriyet, 29 Ekim 1923\'te ilan edilmiştir. 23 Nisan 1920 TBMM\'nin açılışıdır.' },
    { q: 'Halifeli\\ğin kaldırıldı\\ğı tarih aşağıdakilerden hangisidir?', a: '3 Mart 1924', w: ['29 Ekim 1923', '20 Nisan 1924', '30 A\\ğustos 1925', '10 Kasım 1938'], e: 'Halifelik, 3 Mart 1924\'te çıkarılan kanunla kaldırılmıştır.' },
    { q: 'Türkiye\'de çok partili hayata ilk geçiş denemesi hangi partiyle yapılmıştır?', a: 'Terakkiperver Cumhuriyet Fırkası', w: ['Serbest Cumhuriyet Fırkası', 'Demokrat Parti', 'Millet Partisi', 'Adalet Partisi'], e: 'İlk çok partili geçiş denemesi 1924\'te kurulan Terakkiperver Cumhuriyet Fırkası ile yapılmıştır.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateAtaturkIlkeleri() {
  const q = pick([
    { q: 'Aşağıdaki Atatürk ilkelerinden hangisi di\\ğerlerine göre daha öncelikli ve kapsayıcıdır?', a: 'Cumhuriyetçilik', w: ['Laiklik', 'Milliyetçilik', 'Devletçilik', 'Halkçılık'], e: 'Cumhuriyetçilik, Atatürk ilkelerinin temelini oluşturur ve di\\ğer ilkelerin uygulanmasını sa\\ğlar.' },
    { q: 'Laiklik ilkesi aşağıdaki inkılaplardan hangisiyle do\\ğrudan ilişkilidir?', a: 'Halifeli\\ğin kaldırılması', w: ['Şapka Kanunu', 'Soyadı Kanunu', 'Medeni Kanun\'un kabulü', 'Kıyafet inkılabı'], e: 'Laiklik ilkesi do\\ğrultusunda 1924\'te halifelik kaldırılmış, din-devlet işleri ayrılmıştır.' },
    { q: 'Devletçilik ilkesinin Türkiye\'de uygulanmasının temel nedeni aşağıdakilerden hangisidir?', a: 'Özel sermayenin yetersiz olması', w: ['Liberal ekonominin başarısız olması', 'Dış borçların ödenmesi', 'Savaş tehlikesi', 'Nüfusun az olması'], e: '1930\'larda özel sermaye yetersiz oldu\\ğu için devlet öncülü\\ğünde sanayileşme politikası (devletçilik) uygulanmıştır.' },
    { q: '"Egemenlik kayıtsız şartsız milletindir" sözü aşağıdaki ilkelerden hangisiyle do\\ğrudan ilgilidir?', a: 'Cumhuriyetçilik', w: ['Milliyetçilik', 'Halkçılık', 'Laiklik', 'İnkılapçılık'], e: 'Bu söz, Cumhuriyetçilik ilkesinin özünü oluşturur. Egemenli\\ğin millete ait oldu\\ğunu ifade eder.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateCokPartiliSogukSavas() {
  const q = pick([
    { q: 'Türkiye\'de 1950 seçimlerini kazanarak iktidara gelen parti aşağıdakilerden hangisidir?', a: 'Demokrat Parti', w: ['Cumhuriyet Halk Partisi', 'Millet Partisi', 'Adalet Partisi', 'Terakkiperver Cumhuriyet Fırkası'], e: '1950 seçimlerini DP kazanmış, 27 yıllık CHP iktidarı sona ermiştir.' },
    { q: 'So\\ğuk Savaş döneminde Türkiye\'nin hangi örgüte üye olması batı blokuna dahil oldu\\ğunu göstermiştir?', a: 'NATO', w: ['Varşova Paktı', 'Birleşmiş Milletler', 'Avrupa Birli\\ği', 'Ba\\ğdat Paktı'], e: 'Türkiye, 1952\'de NATO\'ya üye olarak batı blokunda yerini almıştır.' },
    { q: '1961 Anayasası\'nın hazırlanmasına neden olan askeri müdahale aşağıdakilerden hangisidir?', a: '27 Mayıs 1960', w: ['12 Mart 1971', '12 Eylül 1980', '28 Şubat 1997', '15 Temmuz 2016'], e: '27 Mayıs 1960 askeri müdahalesi sonrası 1961 Anayasası hazırlanmış ve kabul edilmiştir.' },
    { q: 'So\\ğuk Savaş\'ın sona ermesine neden olan gelişme aşağıdakilerden hangisidir?', a: 'SSCB\'nin da\\ğılması', w: ['Berlin Duvarı\'nın yıkılması', 'ABD\'nin üstünlük kurması', 'Çin\'in yükselişi', 'Avrupa Birli\\ği\'nin kurulması'], e: '1991\'de SSCB\'nin da\\ğılması So\\ğuk Savaş\'ı sona erdirmiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Coğrafya2 ────────────────────────────────────────────────────────────────

function templateNufus() {
  const q = pick([
    { q: 'Türkiye\'de nüfus yo\\ğunlu\\ğu en fazla olan bölge aşağıdakilerden hangisidir?', a: 'Marmara Bölgesi', w: ['İç Anadolu Bölgesi', 'Ege Bölgesi', 'Akdeniz Bölgesi', 'Karadeniz Bölgesi'], e: 'Sanayi, ticaret ve ulaşım olanaklarının fazla oldu\\ğu Marmara Bölgesi en yo\\ğun nüfuslu bölgedir.' },
    { q: 'Aşağıdakilerden hangisi Türkiye\'de nüfusun da\\ğılışını etkileyen do\\ğal faktörlerden biri de\\ğildir?', a: 'Sanayi tesisleri', w: ['İklim', 'Yer şekilleri', 'Su kaynakları', 'Toprak verimlili\\ği'], e: 'Sanayi tesisleri beşeri faktördür. İklim, yer şekilleri, su kaynakları ve toprak verimlili\\ği do\\ğal faktörlerdir.' },
    { q: 'Türkiye\'de nüfus artış hızını düşürmek amacıyla uygulanan politikalar hangi dönemde başlamıştır?', a: '1960\'lı yıllar', w: ['1923\'te Cumhuriyet\'in ilanıyla', '1950\'lerde çok partili hayata geçişle', '1980\'lerde ekonomik liberalleşmeyle', '2000\'li yıllarda AB süreciyle'], e: '1960\'lı yıllardan itibaren nüfus artış hızını düşürmeye yönelik politikalar uygulanmaya başlanmıştır.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateSehirlesme() {
  const q = pick([
    { q: 'Türkiye\'de şehirleşme hızının en fazla oldu\\ğu dönem aşağıdakilerden hangisidir?', a: '1950\'lerden sonra sanayileşmeyle', w: ['Cumhuriyet\'in ilk yılları', 'Osmanlı\'nın son dönemi', '2000\'li yıllardan sonra', 'Kurtuluş Savaşı yıllarında'], e: '1950\'lerde sanayileşme ve kırdan kente gçle birlikte şehirleşme hızlanmıştır.' },
    { q: 'Aşağıdakilerden hangisi Türkiye\'de şehirlerin fonksiyonlarına göre sınıflandırılmasında kullanılan kategorilerden biri de\\ğildir?', a: 'Akdeniz şehirleri', w: ['Sanayi şehirleri', 'İdari şehirler', 'Liman şehirleri', 'Tarım şehirleri'], e: 'Şehirler fonksiyonlarına göre sanayi, idari, liman, tarım, turizm vb. şeklinde sınıflandırılır.' },
    { q: 'Türkiye\'de gecekondulaşma sorununun temel nedeni aşağıdakilerden hangisidir?', a: 'Hızlı nüfus artışı ve kente gç', w: ['Deprem riski', 'Sanayi tesislerinin azlı\\ğı', 'Tarım alanlarının verimsizli\\ği', 'E\\ğitim düzeyinin düşüklü\\ğü'], e: 'Kırdan kente hızlı gç ve nüfus artışı, konut ihtiyacını karşılayamamakta, gecekondulaşmaya neden olmaktadır.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateEkonomi() {
  const q = pick([
    { q: 'Türkiye\'de en fazla ekim alanına sahip tarım ürünü aşağıdakilerden hangisidir?', a: 'Bu\\ğday', w: ['Arpa', 'Mısır', 'Pamuk', 'Ayçiçe\\ği'], e: 'Bu\\ğday, Türkiye\'de en geniş ekim alanına sahip tarım ürünüdür. İç Anadolu başta olmak üzere yaygın olarak yetiştirilir.' },
    { q: 'Türkiye\'nin en önemli enerji kaynaklarından biri olan ve Do\\ğu Anadolu\'da yaygın olan maden aşağıdakilerden hangisidir?', a: 'Linyit', w: ['Taş kömürü', 'Petrol', 'Do\\ğal gaz', 'Bor'], e: 'Linyit yatakları Türkiye\'de yaygındır ve özellikle Do\\ğu Anadolu\'da (Elbistan) büyük rezervler bulunur.' },
    { q: 'Türkiye\'de turizm gelirlerinin en yüksek oldu\\ğu bölge aşağıdakilerden hangisidir?', a: 'Akdeniz Bölgesi', w: ['Ege Bölgesi', 'Marmara Bölgesi', 'Karadeniz Bölgesi', 'İç Anadolu Bölgesi'], e: 'Akdeniz Bölgesi, deniz turizmi ve tarihi zenginlikleriyle en fazla turist çeken bölgedir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Felsefe ──────────────────────────────────────────────────────────────────

function templateIslamFelsefesi() {
  const q = pick([
    { q: 'İslam felsefesinin öncüsü olarak kabul edilen ve "Kindî" olarak bilinen filozofun tam adı aşağıdakilerden hangisidir?', a: 'Eb\\u00fb Y\\u00fbsuf Ya\'k\\u00fbb el-Kindî', w: ['Eb\\u00fb Ali el-Üsincân\\u00ee', 'Muhammed bin M\\u00fbse el-H\\u00e2rizmî', 'Eb\\u00fb Nasr el-F\\u00e2r\\u00e2bî', 'Eb\\u00fb Ali ibn S\\u00een\\u00e2'], e: 'Kindî, İslam felsefesinin kurucusu kabul edilir ve 9. yüzyılda yaşamıştır.' },
    { q: '"El-Medinetü\'l-F\\u00e2zıla" (Erdemli Şehir) eseri aşağıdaki İslam filozoflarından hangisine aittir?', a: 'F\\u00e2r\\u00e2bî', w: ['İbn S\\u00een\\u00e2', 'İbn Rüşd', 'Gaz\\u00e2lî', 'Kindî'], e: 'F\\u00e2r\\u00e2bî, Erdemli Şehir (Medinetü\'l-F\\u00e2zıla) adlı eserinde ideal toplum düzenini anlatmıştır.' },
    { q: 'İbn S\\u00een\\u00e2\'nın tıp alanındaki ünlü eseri aşağıdakilerden hangisidir?', a: 'El-Kanun fi\'t-Tıb', w: ['Kit\\u00e2bü\'ş-Şif\\u00e2', 'Teh\\u00e2fütü\'l-Fel\\u00e2sife', 'F\\u00fbs\\u00fbsu\'l-Hikem', 'İhy\\u00e2-u Ul\\u00fbmi\'d-D\\u00een'], e: 'İbn S\\u00een\\u00e2\'nın El-Kanun fi\'t-Tıb adlı eseri, Avrupa\'da yüzyıllar boyunca tıp alanında temel kaynak olarak kullanılmıştır.' },
    { q: 'Gaz\\u00e2lî\'nin felsefeye yöneltti\\ği eleştirileri içeren eseri aşağıdakilerden hangisidir?', a: 'Teh\\u00e2fütü\'l-Fel\\u00e2sife (Filozofların Tutarsızlı\\ğı)', w: ['El-Medinetü\'l-F\\u00e2zıla', 'Kit\\u00e2bü\'n-Nec\\u00e2t', 'Tuhfetü\'l-Hikem', 'Mîz\\u00e2nü\'l-Hikem'], e: 'Gaz\\u00e2lî, Teh\\u00e2fütü\'l-Fel\\u00e2sife adlı eserinde filozofların görüşlerini eleştirmiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('felsefe', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateModernFelsefe() {
  const q = pick([
    { q: '"Düşünüyorum, öyleyse varım" (Cogito ergo sum) sözü aşağıdaki filozoflardan hangisine aittir?', a: 'Descartes', w: ['Spinoza', 'Leibniz', 'Locke', 'Hume'], e: 'Descartes, modern felsefenin kurucusu kabul edilir ve bu sözle bilginin temelini şüpheyle başlatır.' },
    { q: 'Aşağıdakilerden hangisi empirizm (deneycilik) akımının temsilcisidir?', a: 'John Locke', w: ['Descartes', 'Platon', 'Hegel', 'Kant'], e: 'Locke\'a göre zihin do\\ğuştan boş bir levha (tabula rasa) gibidir ve tüm bilgiler deneyimle kazanılır.' },
    { q: 'Kant\'ın ahlak felsefesinde "kategorik imperatif" (koşulsuz buyruk) aşağıdakilerden hangisini ifade eder?', a: 'Koşulsuz olarak uyulması gereken ahlak yasasını', w: ['Mutlulu\\ğa ulaşma yöntemini', 'Toplumsal sözleşmeyi', 'Tanrının varlı\\ğını', 'Do\\ğal yasaları'], e: 'Kategorik imperatif, Kant\'a göre koşulsuz, evrensel ve herkes için geçerli olan ahlak yasasıdır.' },
    { q: 'Varoluşçuluk (egzistansiyalizm) akımının öncüsü olan filozof aşağıdakilerden hangisidir?', a: 'Jean-Paul Sartre', w: ['Friedrich Nietzsche', 'Søren Kierkegaard', 'Martin Heidegger', 'Albert Camus'], e: 'Sartre, "Varoluş özden önce gelir" sözüyle varoluşçulu\\ğun temel ilkesini belirlemiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('felsefe', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateBilimFelsefesi() {
  const q = pick([
    { q: 'Bilim felsefesinde "yanlışlanabilirlik" (falsification) ilkesini ortaya atan düşünür aşağıdakilerden hangisidir?', a: 'Karl Popper', w: ['Thomas Kuhn', 'Francis Bacon', 'Auguste Comte', 'David Hume'], e: 'Popper\'a göre bilimsel bir teorinin bilimsel sayılması için yanlışlanabilir olması gerekir.' },
    { q: '"Paradigma" kavramını bilim felsefesine kazandıran düşünür aşağıdakilerden hangisidir?', a: 'Thomas Kuhn', w: ['Karl Popper', 'Paul Feyerabend', 'Imre Lakatos', 'Bertrand Russell'], e: 'Kuhn, "Bilimsel Devrimlerin Yapısı" adlı eserinde paradigma kavramını ortaya atmıştır.' },
    { q: 'Pozitivizm (olguculuk) akımının kurucusu aşağıdakilerden hangisidir?', a: 'Auguste Comte', w: ['Karl Marx', 'Friedrich Engels', 'Emile Durkheim', 'Herbert Spencer'], e: 'Comte, insanlı\\ğın teolojik, metafizik ve pozitif olmak üzere üç aşamadan geçti\\ğini savunmuştur.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('felsefe', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Din ──────────────────────────────────────────────────────────────────────

function templateIslamDusunce() {
  const q = pick([
    { q: 'İslam düşünce tarihinde \"Ehl-i Sünnet\" ekollerinden biri aşağıdakilerden hangisidir?', a: 'Maturidilik', w: ['Kaderilik', 'Cebrilik', 'Müşebbihe', 'Mülhidlik'], e: 'Maturidilik, Eb\\u00fb Mans\\u00fbr el-Maturîdî\'ye dayanan Ehl-i Sünnet akaid ekollerinden biridir.' },
    { q: 'Aşağıdakilerden hangisi İslam düşüncesindeki itikadi (inançla ilgili) mezheplerden biridir?', a: 'Mutezile', w: ['Hanefilik', 'Şafilik', 'Malikilik', 'Hanbelilik'], e: 'Mutezile itikadi bir mezhep iken Hanefi, Şafi, Maliki ve Hanbeli fıkhi (amel\\u00ee) mezheplerdir.' },
    { q: 'Cibril hadisi olarak bilinen rivayette aşağıdaki kavramlardan hangisi İslam\'ın temel esasları arasında sayılmamıştır?', a: 'Mezhep', w: ['İslam', 'İman', 'İhsan'], e: 'Cibril hadisinde İslam, iman ve ihsan kavramları sayılmıştır. Mezhep bu hadiste yer almamaktadır.' },
    { q: 'Tasavvufi düşüncede \"vahdet-i vüc\\u00fbd\" (varlı\\ğın birli\\ği) anlayışının en önemli temsilcisi aşağıdakilerden hangisidir?', a: 'Muhyiddin İbnü\'l-Arabî', w: ['Mevl\\u00e2n\\u00e2 Cel\\u00e2ledd\\u00een-i R\\u00fbmî', 'Y\\u00fbnus Emre', 'Hacı Bayr\\u00e2m-ı Velî', 'Hacı Bektaş-ı Velî'], e: 'İbnü\'l-Arabî, "vahdet-i vüc\\u00fbd" ö\\ğretisinin sistemleştiricisidir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('din', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateGuncelDin() {
  const q = pick([
    { q: 'Fetva kavramı aşağıdakilerden hangisini ifade eder?', a: 'Dini bir sorunun uzmanı tarafından cevaplandırılması', w: ['İbadetlerin yerine getirilmesi', 'Kur\'an okuma kuralları', 'Peygamberin sözleri', 'Dini hükümlerin tümü'], e: 'Fetva, dini bir konuda yetkili bir kişi veya kurum tarafından verilen dini görüştür.' },
    { q: 'Aşağıdakilerden hangisi güncel dini meselelerden biri olarak kabul edilmez?', a: 'Peygamberlerin sayısı', w: ['Organ nakli', 'Tüp bebek', 'Sigara içmenin hükmü', 'E-ticaret\'in dinili\\ği'], e: 'Peygamberlerin sayısı sabit bir inanç konusuyken organ nakli, tüp bebek, sigara ve e-ticaret güncel fıkhi meselelerdir.' },
    { q: 'Kur\'an-ı Kerim\'in ana konuları arasında aşağıdakilerden hangisi yer almaz?', a: 'Ekonomik sistem detayları', w: ['İnanç (akaid)', 'İbadetler', 'Ahlaki ilkeler', 'Kıssalar (geçmiş toplum hikayeleri)'], e: 'Kur\'an\'da inanç, ibadet, ahlak ve kıssalar temel konulardır. Detaylı ekonomik sistem yerine temel ilkeler (helal-haram, faiz yasa\\ğı vb.) belirtilmiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('din', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateAhlakFelsefesi() {
  const q = pick([
    { q: 'Ahlak felsefesinde \"faydacılık\" (utilitarianism) anlayışının temsilcisi aşağıdakilerden hangisidir?', a: 'Jeremy Bentham', w: ['Immanuel Kant', 'Aristoteles', 'Friedrich Nietzsche', 'John Rawls'], e: 'Bentham\'a göre bir eylemin ahlaki de\\ğeri, sa\\ğladı\\ğı fayda veya mutlulukla ölçülür.' },
    { q: 'İslam ahlak felsefesinde \"hüsn ve kubh\" (iyilik ve kötülük) kavramları aşağıdakilerden hangisiyle ilgilidir?', a: 'Fiillerin iyi veya kötü olmasının ölçütüyle', w: ['Namazın farz olmasıyla', 'Orucun vaktiyle', 'Zekatın miktarıyla', 'Haccın şartlarıyla'], e: 'Hüsn ve kubh, fiillerin akıl ve din açısından iyi veya kötü olarak nitelendirilmesini konu alır.' },
    { q: '"Altın Kural" olarak bilinen \"Kendine yapılmasını istemedi\\ğin şeyi başkasına yapma\" ilkesi aşağıdaki düşünürlerden hangisiyle özdeşleşmiştir?', a: 'Konfüyus', w: ['Sokrates', 'Aristoteles', 'Farabi', 'Gazali'], e: 'Altın Kural, Konfüyus\'un ö\\ğretilerinde merkezi bir yere sahiptir ve birçok kültürde benzer şekilde ifade edilmiştir.' },
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
