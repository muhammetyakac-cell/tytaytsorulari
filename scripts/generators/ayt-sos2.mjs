import { pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

// ─── Tarih-2 ───────────────────────────────────────────────────────────────────

function templateCumhuriyetDonemi() {
  const q = pick([
    { q: 'Türkiye Cumhuriyeti\'nin ilk anayasası aşağıdakilerden hangisidir?', a: '1921 Teşkilat-ı Esasiye', w: ['1876 Kanun-i Esasi', '1924 Anayasası', '1961 Anayasası', '1982 Anayasası'], e: '1921 Teşkilat-ı Esasiye, TBMM\'nin kurduğu yeni devletin ilk anayasasıdır.' },
    { q: 'Cumhuriyet\'in ilan edildiği tarih aşağıdakilerden hangisidir?', a: '29 Ekim 1923', w: ['23 Nisan 1920', '19 Mayıs 1919', '9 Eylül 1922', '24 Temmuz 1923'], e: 'Cumhuriyet, 29 Ekim 1923\'te ilan edilerek devletin rejimi belirlenmiştir.' },
    { q: 'Halifeliğin kaldırıldığı tarih aşağıdakilerden hangisidir?', a: '3 Mart 1924', w: ['29 Ekim 1923', '20 Nisan 1924', '30 Ağustos 1925', '10 Kasım 1938'], e: 'Halifelik, 3 Mart 1924\'te çıkarılan kanunla (Tevhid-i Tedrisat vb. kanunlarla aynı gün) kaldırılmıştır.' },
    { q: 'Türkiye\'de çok partili hayata ilk geçiş denemesi hangi siyasi partiyle yapılmıştır?', a: 'Terakkiperver Cumhuriyet Fırkası', w: ['Serbest Cumhuriyet Fırkası', 'Demokrat Parti', 'Millet Partisi', 'Ahali Cumhuriyet Fırkası'], e: 'İlk çok partili geçiş denemesi 1924\'te kurulan Kazım Karabekir liderliğindeki Terakkiperver Cumhuriyet Fırkası ile yapılmıştır.' },
    { q: 'Cumhuriyet döneminde yapılan inkılaplara karşı çıkan ilk büyük isyan aşağıdakilerden hangisidir?', a: 'Şeyh Sait İsyanı', w: ['Menemen Olayı (Kubilay Vakası)', 'Koçgiri İsyanı', 'Demirci Mehmet Efe İsyanı', 'Çerkez Ethem İsyanı'], e: '1925\'te çıkan Şeyh Sait isyanı rejime karşı ilk büyük isyandır ve Terakkiperver Fırka\'nın kapatılmasına neden olmuştur.' },
    { q: 'Montrö Boğazlar Sözleşmesi (1936) ile Türkiye aşağıdakilerden hangisini başarmıştır?', a: 'Boğazlar Komisyonunu kaldırarak Boğazlarda tam egemenlik sağlamıştır', w: ['Hatay\'ı anavatana katmıştır', 'Musul sorununu çözmüştür', 'Yabancı okullar meselesini halletmiştir', 'Kapitülasyonları kaldırmıştır'], e: 'Lozan\'da kurulan Boğazlar Komisyonu Montrö ile kaldırılmış ve Türk askerinin Boğazlara girmesi sağlanmıştır.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateAtaturkIlkeleri() {
  const q = pick([
    { q: 'Aşağıdaki Atatürk ilkelerinden hangisi diğerlerine göre daha öncelikli ve siyasi rejimi belirleyici niteliktedir?', a: 'Cumhuriyetçilik', w: ['Laiklik', 'Milliyetçilik', 'Devletçilik', 'Halkçılık'], e: 'Cumhuriyetçilik, devletin yönetim şeklini belirler ve diğer ilkelerin uygulanmasına zemin hazırlar.' },
    { q: 'Laiklik ilkesi aşağıdaki inkılaplardan hangisiyle doğrudan ilişkilidir?', a: 'Halifeliğin kaldırılması', w: ['Şapka Kanunu', 'Soyadı Kanunu', 'Kabotaj Kanunu', 'Kıyafet inkılabı'], e: 'Halifeliğin kaldırılması, din ve devlet işlerinin ayrılması (laiklik) yolunda en büyük adımdır.' },
    { q: 'Devletçilik ilkesinin Türkiye\'de 1930\'larda uygulanmasının temel nedeni aşağıdakilerden hangisidir?', a: 'Özel sermayenin yetersiz olması ve 1929 Dünya Ekonomik Buhranı', w: ['Liberal ekonominin tamamen başarısız olması', 'Dış borçların ödenmesi gerekliliği', 'Komünizme geçiş hazırlığı', 'Siyasi partilerin baskısı'], e: 'Sermaye yetersizliği ve 1929 krizinin etkileri devleti ekonomiye doğrudan müdahaleye (devletçilik) itmiştir.' },
    { q: '"Egemenlik kayıtsız şartsız milletindir" sözü aşağıdaki ilkelerden hangisiyle doğrudan ilgilidir?', a: 'Cumhuriyetçilik', w: ['Milliyetçilik', 'Halkçılık', 'Laiklik', 'İnkılapçılık'], e: 'Bu söz, milli iradeyi ve egemenliğin millete ait olduğunu vurguladığı için Cumhuriyetçilikle ilgilidir.' },
    { q: 'Atatürk\'ün milliyetçilik anlayışı için aşağıdakilerden hangisi söylenemez?', a: 'Irk esasına dayanır.', w: ['Birleştirici ve bütünleştiricidir.', 'Barışçıldır.', 'Laik ve demokratiktir.', 'Sınıf çatışmasını reddeder.'], e: 'Atatürk milliyetçiliği ırkçı değildir; "Ne mutlu Türküm diyene" sözüyle kültürel birliği ve vatandaşlığı esas alır.' },
    { q: 'Medeni Kanun\'un kabulü (1926) ile kadın-erkek eşitliğinin sağlanması, en çok hangi Atatürk ilkesiyle ilişkilidir?', a: 'Halkçılık', w: ['Devletçilik', 'Cumhuriyetçilik', 'Milliyetçilik', 'Laiklik'], e: 'Halkçılık ilkesi eşitliği, sınıf ayrımı gözetmemeyi savunur; Medeni Kanun bu yönüyle halkçılıktır.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateCokPartiliSogukSavas() {
  const q = pick([
    { q: 'Türkiye\'de 1950 seçimlerini "Yeter söz milletindir" sloganıyla kazanarak 27 yıllık tek parti dönemini bitiren parti hangisidir?', a: 'Demokrat Parti', w: ['Cumhuriyet Halk Partisi', 'Millet Partisi', 'Adalet Partisi', 'Serbest Cumhuriyet Fırkası'], e: 'Celal Bayar ve Adnan Menderes öncülüğünde kurulan Demokrat Parti, 1950 seçimleriyle iktidara gelmiştir.' },
    { q: 'Soğuk Savaş döneminde Türkiye\'nin hangi örgüte üye olması Batı blokuna kesin olarak dahil olduğunu göstermiştir?', a: 'NATO', w: ['Varşova Paktı', 'Birleşmiş Milletler', 'Avrupa Konseyi', 'Bağdat Paktı'], e: 'Türkiye, Kore Savaşı\'na asker göndermesinin ardından 1952\'de NATO\'ya üye olmuştur.' },
    { q: '1961 Anayasası\'nın hazırlanmasına neden olan askeri müdahale aşağıdakilerden hangisidir?', a: '27 Mayıs 1960', w: ['12 Mart 1971', '12 Eylül 1980', '28 Şubat 1997', '15 Temmuz 2016'], e: '27 Mayıs 1960 darbesiyle DP iktidarı sonlandırılmış ve 1961 Anayasası yürürlüğe girmiştir.' },
    { q: 'Soğuk Savaş\'ın sona ermesine ve iki kutuplu dünyanın bitmesine neden olan temel gelişme aşağıdakilerden hangisidir?', a: 'SSCB\'nin dağılması (1991)', w: ['Berlin Duvarı\'nın yıkılması', 'Küba Füze Krizi', 'Vietnam Savaşı\'nın bitmesi', 'Çin\'in yükselişi'], e: '1991\'de SSCB\'nin resmen dağılmasıyla Soğuk Savaş bitmiş, ABD tek süper güç olarak kalmıştır.' },
    { q: 'ABD\'nin II. Dünya Savaşı sonrası Avrupa ülkelerine ekonomik yardım yaptığı ve Türkiye\'nin de yararlandığı planın adı nedir?', a: 'Marshall Planı', w: ['Truman Doktrini', 'Dawes Planı', 'Eisenhower Doktrini', 'Schuman Planı'], e: 'Marshall Planı (1947), yıkıma uğrayan Avrupa\'yı kalkındırmak ve Sovyet etkisini kırmak için yapılmış ekonomik yardımdır.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Coğrafya-2 ────────────────────────────────────────────────────────────────

function templateNufus() {
  const q = pick([
    { q: 'Türkiye\'de nüfus yoğunluğu en fazla olan bölge aşağıdakilerden hangisidir?', a: 'Marmara Bölgesi', w: ['İç Anadolu Bölgesi', 'Ege Bölgesi', 'Akdeniz Bölgesi', 'Karadeniz Bölgesi'], e: 'Sanayi, ticaret ve ulaşım olanaklarının gelişmiş olması nedeniyle Marmara Bölgesi en yoğun nüfusludur.' },
    { q: 'Aşağıdakilerden hangisi Türkiye\'de nüfusun dağılışını etkileyen doğal faktörlerden biri değildir?', a: 'Sanayi tesisleri', w: ['İklim', 'Yer şekilleri', 'Su kaynakları', 'Toprak verimliliği'], e: 'Sanayi tesisleri, tarım, ulaşım gibi faktörler beşeri; iklim ve yer şekilleri doğal faktördür.' },
    { q: 'Türkiye\'de nüfus artış hızını düşürmek amacıyla uygulanan (aile planlaması) politikalar hangi dönemde başlamıştır?', a: '1965 sonrası dönem', w: ['1923\'te Cumhuriyet\'in ilanıyla', '1950\'lerde çok partili hayata geçişle', '1980\'lerde ekonomik liberalleşmeyle', '2000\'li yıllarda'], e: '1923-1965 arası nüfus artırıcı, 1965\'ten itibaren ise nüfus artış hızını düşürücü politikalar uygulanmıştır.' },
    { q: 'Bir ülkede genç bağımlı nüfus oranının yüksek olması aşağıdakilerden hangisinin göstergesidir?', a: 'Doğum oranlarının yüksek olduğunun', w: ['Ortalama yaşam süresinin uzun olduğunun', 'Gelişmişlik düzeyinin çok yüksek olduğunun', 'Eğitim seviyesinin yüksek olduğunun', 'Kırsal nüfusun azaldığının'], e: 'Genç nüfusun (0-14 yaş) fazla olması, o ülkede doğum oranlarının yüksek olduğunu gösterir.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateSehirlesme() {
  const q = pick([
    { q: 'Türkiye\'de şehirleşme hızının sıçrama yaptığı ve kırdan kente göçün ivme kazandığı dönem hangisidir?', a: '1950\'ler sonrası', w: ['Cumhuriyet\'in ilk yılları', 'Osmanlı\'nın son dönemi', '2000\'li yıllar', 'Kurtuluş Savaşı yılları'], e: '1950\'lerde tarımda makineleşme ve sanayileşme çabaları kırdan kente göçü hızlandırmıştır.' },
    { q: 'Aşağıdakilerden hangisi Türkiye\'de şehirlerin fonksiyonlarına göre sınıflandırılmasında kullanılan bir kavram değildir?', a: 'İklim şehirleri', w: ['Sanayi şehirleri', 'İdari şehirler (Başkentler)', 'Liman şehirleri', 'Turizm şehirleri'], e: 'Şehirler işlevlerine göre sanayi, ticaret, liman, maden, turizm vb. olarak sınıflandırılır.' },
    { q: 'Türkiye\'de büyük şehirlerde yaşanan gecekondulaşma sorununun temel nedeni aşağıdakilerden hangisidir?', a: 'Hızlı kırdan kente göç ve konut yetersizliği', w: ['Deprem riski', 'Sanayi tesislerinin azlığı', 'Tarım alanlarının verimsizliği', 'Yabancı göçmen akını'], e: 'Hızlı nüfus artışı ve göç, şehirlerde planlı konut üretimini aşmış ve çarpık kentleşmeye (gecekondu) yol açmıştır.' },
    { q: 'Bir kentin etki alanının genişliğini belirleyen en önemli faktör aşağıdakilerden hangisidir?', a: 'Sahip olduğu fonksiyonların çeşitliliği ve büyüklüğü', w: ['Yüz ölçümünün büyüklüğü', 'Tarihi geçmişinin eski olması', 'İkliminin ılıman olması', 'Tarım alanlarının genişliği'], e: 'Küresel, bölgesel veya yerel etkiye sahip olmak, kentin (finans, sanayi, borsa gibi) fonksiyonlarına bağlıdır.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya2', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Felsefe Grubu ────────────────────────────────────────────────────────────

function templateİslamFelsefesi() {
  const q = pick([
    { q: 'İslam felsefesinin öncüsü (İlk İslam filozofu) olarak kabul edilen ve "Filozofların Arabı" olarak bilinen düşünür kimdir?', a: 'Kindî', w: ['İbn Sina', 'Farabi', 'Gazali', 'İbn Rüşd'], e: 'Kindî (El-Kindi), 9. yüzyılda Antik Yunan felsefesini İslam dünyasına taşıyan ilk filozoftur.' },
    { q: '"El-Medinetü\'l-Fâzıla" (Erdemli Şehir) adlı eseriyle ideal devlet düzenini anlatan filozof kimdir?', a: 'Farabi', w: ['İbn Sina', 'İbn Haldun', 'Gazali', 'İbn Rüşd'], e: 'Muallim-i Sani (İkinci Öğretmen) olarak bilinen Farabi, bu eserinde ahlaklı ve erdemli bir toplumu tarif eder.' },
    { q: 'Tıp alanında yüzyıllarca Avrupa\'da ders kitabı olarak okutulan "El-Kanun fi\'t-Tıb" (Tıbbın Kanunu) eseri kime aittir?', a: 'İbn Sina', w: ['El-Razi', 'Farabi', 'Biruni', 'Gazali'], e: 'Avrupa\'da Avicenna olarak bilinen İbn Sina, tıp ve felsefe alanında zirvedir.' },
    { q: '"Tehafütü\'l-Felasife" (Filozofların Tutarsızlığı) eseriyle felsefecileri dinden çıkmakla eleştiren düşünür kimdir?', a: 'Gazali', w: ['İbn Rüşd', 'Mevlana', 'İbn Arabi', 'Sühreverdi'], e: 'Gazali bu eserinde Farabi ve İbn Sina gibi filozofları bazı görüşlerinden dolayı şiddetle eleştirmiştir.' },
    { q: 'Gazali\'nin eleştirilerine karşılık felsefeyi savunan "Tehafütü\'t-Tehafüt" (Tutarsızlığın Tutarsızlığı) eserini yazan Endülüslü filozof kimdir?', a: 'İbn Rüşd', w: ['İbn Bacce', 'İbn Tufeyl', 'Farabi', 'Kindi'], e: 'Avrupa\'da Averroes olarak bilinen İbn Rüşd, akıl ile vahyin çatışmayacağını savunmuştur.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('felsefe', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateModernFelsefe() {
  const q = pick([
    { q: '"Düşünüyorum, öyleyse varım" (Cogito ergo sum) diyerek metodik şüpheyi kuran modern felsefenin öncüsü kimdir?', a: 'René Descartes', w: ['Baruch Spinoza', 'G.W. Leibniz', 'John Locke', 'David Hume'], e: 'Descartes, her şeyden şüphe ederek ulaştığı tek kesin gerçeğin "kendi şüphe eden zihni" olduğunu bulmuştur.' },
    { q: 'İnsan zihninin doğuştan "boş bir levha" (tabula rasa) olduğunu savunan empirist düşünür kimdir?', a: 'John Locke', w: ['Descartes', 'Kant', 'Hegel', 'Rousseau'], e: 'Locke\'a göre hiçbir bilgi doğuştan (apriori) gelmez, hepsi deneyimlerle edinilir.' },
    { q: 'Ahlak felsefesinde "Öyle hareket et ki, eyleminin kuralı herkes için geçerli evrensel bir yasa olsun" (Kategorik İmperatif) diyen filozof kimdir?', a: 'Immanuel Kant', w: ['Jeremy Bentham', 'J.S. Mill', 'Friedrich Nietzsche', 'Karl Marx'], e: 'Kant, ahlakın sonuca değil, niyete (ödeve) ve evrenselleştirilebilir kurallara dayanması gerektiğini savunur.' },
    { q: '"Varoluş özden önce gelir" diyerek insanın kendi değerini kendisinin yarattığını savunan Varoluşçuluk (Egzistansiyalizm) öncüsü kimdir?', a: 'Jean-Paul Sartre', w: ['Søren Kierkegaard', 'Martin Heidegger', 'Albert Camus', 'Karl Jaspers'], e: 'Sartre\'a göre insan önce var olur, sonra kendi seçimleriyle kendini tanımlar (özünü yaratır).' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('felsefe', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Din Kültürü ──────────────────────────────────────────────────────────────

function templateIslamDusunce() {
  const q = pick([
    { q: 'İslam düşünce tarihinde, "Ehl-i Sünnet" (Sünnilik) inanç sisteminin iki büyük itikadi (inanç) mezhebi hangileridir?', a: 'Maturidilik ve Eşarilik', w: ['Hanefilik ve Şafiilik', 'Mutezile ve Cebriye', 'Haricilik ve Şiilik', 'Kaderiye ve Mürcie'], e: 'Maturidilik (İmam Maturidi) ve Eşarilik (İmam Eşari) Sünniliğin inanç boyutundaki mezhepleridir.' },
    { q: 'İslam düşüncesinde "aklı" naklin (vahyin) önüne koyarak özgür iradeyi savunan ve "İslam\'ın Rasyonalistleri" olarak bilinen mezhep hangisidir?', a: 'Mutezile', w: ['Cebriye', 'Eşarilik', 'Zahirilik', 'Haricilik'], e: 'Mutezile, akla büyük önem verir ve büyük günah işleyenin dinden çıkmayıp arafta (el-Menzile) kalacağını savunur.' },
    { q: 'Tasavvuf düşüncesinde, varlığın tek olduğunu ve her şeyin Allah\'ın tecellisi (yansıması) olduğunu savunan "Vahdet-i Vücûd" anlayışının kurucusu kimdir?', a: 'Muhyiddin İbnü\'l-Arabî', w: ['Mevlânâ Celâleddîn-i Rûmî', 'Yûnus Emre', 'Hacı Bektaş Veli', 'Gazali'], e: 'İbnü\'l-Arabi (Şeyh-i Ekber), Vahdet-i Vücud (Varlığın Birliği) felsefesini sistemleştiren mutasavvıftır.' },
    { q: 'İnsan iradesini tamamen reddeden, insanın rüzgarın önündeki bir yaprak gibi Allah\'ın zorunlu kıldığı şeyleri yaptığını savunan mezhep hangisidir?', a: 'Cebriye', w: ['Kaderiye', 'Mutezile', 'Maturidilik', 'Şia'], e: 'Cebr (zorunluluk) kökünden gelen Cebriye, insanın hiçbir özgür iradesi olmadığını savunur.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('din', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

const templates = [
  templateCumhuriyetDonemi, templateAtaturkIlkeleri, templateCokPartiliSogukSavas,
  templateNufus, templateSehirlesme,
  templateİslamFelsefesi, templateModernFelsefe,
  templateIslamDusunce
];

export function generate(count = 30) {
  return generateUnique(() => {
    const tpl = pick(templates);
    return tpl();
  }, count);
}
