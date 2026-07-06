import { randInt, pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

const r = (a, b) => randInt(a, b);

// ─── Edebiyat ─────────────────────────────────────────────────────────────────

function templateTanzimat() {
  const q = pick([
    { q: 'Tanzimat Edebiyatının I. dönem sanatçıları aşağıdakilerden hangisinde doğru verilmiştir?', a: 'Şinasi, Namık Kemal, Ziya Paşa', w: ['Tevfik Fikret, Cenap Şahabettin, Halit Ziya', 'Mehmet Akif, Yahya Kemal, Ahmet Haşim', 'Fazıl Hüsnü, Orhan Veli, Melih Cevdet', 'Ahmet Mithat, Nabizade Nâzım, Samipaşazade Sezai'], e: 'Tanzimat I. dönem sanatçıları: Şinasi, Namık Kemal ve Ziya Paşa\'dır.' },
    { q: 'Tanzimat Edebiyatı\'nda ilk tiyatro eseri aşağıdakilerden hangisidir?', a: 'Şair Evlenmesi - Şinasi', w: ['Vatan yahut Silistre - Namık Kemal', 'Gülnihal - Namık Kemal', 'Celaleddin Harzemşah - Ziya Paşa', 'Macera-yı Aşk - Samipaşazade Sezai'], e: 'Şinasi\'nin Şair Evlenmesi (1860), Türk edebiyatının ilk tiyatro eseridir.' },
    { q: 'Aşağıdakilerden hangisi Tanzimat Edebiyatı\'nda roman türünün ilk örneklerinden biri değildir?', a: 'Safahat', w: ['Taaşşuk-ı Talat ve Fitnat', 'İntibah', 'Cezmi', 'Sergüzeşt'], e: 'Safahat, Mehmet Akif Ersoy\'a ait bir şiir kitabıdır, Tanzimat romanı değildir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateServetFunun() {
  const q = pick([
    { q: 'Servet-i Fünun Edebiyatı\'nın kurucusu aşağıdakilerden hangisidir?', a: 'Tevfik Fikret', w: ['Cenap Şahabettin', 'Halit Ziya Uşaklıgil', 'Mehmet Rauf', 'Hüseyin Cahit Yalçın'], e: 'Servet-i Fünun toplulu\\ğu, Tevfik Fikret\'in öncülü\\ğünde kurulmuştur.' },
    { q: 'Aşağıdaki eserlerden hangisi Halit Ziya Uşaklıgil\'e aittir?', a: 'Aşk-ı Memnu', w: ['Eylül', 'Kırık Hayatlar', 'Mai ve Siyah', 'Hüzün ve Tebessüm'], e: 'Aşk-ı Memnu, Halit Ziya\'nın en önemli romanıdır. Eylül Mehmet Rauf\'a aittir.' },
    { q: 'Servet-i Fünun döneminde "Sanat sanat içindir" anlayışı benimsenmiştir. Aşağıdakilerden hangisi bu dönem özelliklerinden biri değildir?', a: 'Toplumsal konular işlenmiştir', w: ['Arapça-Farsça sözcükler yo\\ğundur', 'Sembolizm ve empresyonizm etkisi vardır', 'Mensur şiir türü gelişmiştir', 'Şiirde konu bütünlü\\ğü önemsenmiştir'], e: 'Servet-i Fünun\'da toplumsal konular de\\ğil, bireysel ve sanatsal konular işlenmiştir.' },
    { q: 'Servet-i Fünun romanında aşağıdaki akımlardan hangisinin etkisi güçlüdür?', a: 'Realizm', w: ['Romantizm', 'Klasisizm', 'Natüralizm', 'Sembolizm'], e: 'Servet-i Fünun romanında Realizm akımının etkisi görülür.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateFecriAtiMilli() {
  const q = pick([
    { q: 'Fecr-i Ati toplulu\\ğu aşağıdakilerden hangisiyle sona ermiştir?', a: 'Da\\ğılma ve Milli Edebiyat\'a katılma', w: ['Servet-i Fünun\'a dönüşme', 'Tanzimat\'a ba\\ğlanma', 'Cumhuriyet Dönemi\'ne geçiş', 'Tamamen kapanma'], e: 'Fecr-i Ati toplulu\\ğu 1912\'de da\\ğılmış, sanatçıların ço\\ğu Milli Edebiyat akımına katılmıştır.' },
    { q: 'Milli Edebiyat akımının öncüsü aşağıdakilerden hangisidir?', a: 'Ömer Seyfettin', w: ['Ziya Gökalp', 'Mehmet Emin Yurdakul', 'Yahya Kemal Beyatlı', 'Ali Canip Yöntem'], e: 'Milli Edebiyat akımının öncüsü Ömer Seyfettin\'dir. Ziya Gökalp ise fikir babasıdır.' },
    { q: '"Memleket edebiyatı" olarak da bilinen edebi akım aşağıdakilerden hangisidir?', a: 'Milli Edebiyat', w: ['Servet-i Fünun', 'Tanzimat', 'Fecr-i Ati', 'Cumhuriyet Dönemi'], e: 'Milli Edebiyat akımı, Anadolu\'ya yönelerek memleket edebiyatı anlayışını benimsemiştir.' },
    { q: 'Aşağıdaki yazarlardan hangisi Milli Edebiyat dönemi hikaye yazarlarından biri değildir?', a: 'Halit Ziya Uşaklıgil', w: ['Ömer Seyfettin', 'Refik Halit Karay', 'Yakup Kadri Karaosmano\\ğlu', 'Reşat Nuri Güntekin'], e: 'Halit Ziya Uşaklıgil Servet-i Fünun dönemi yazarıdır.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateCumhuriyetEdebiyat() {
  const q = pick([
    { q: 'Aşağıdakilerden hangisi Cumhuriyet Dönemi Türk şiirinin önemli şairlerinden biri değildir?', a: 'Recaizade Mahmut Ekrem', w: ['Orhan Veli Kanık', 'Nâzım Hikmet', 'Cahit Sıtkı Tarancı', 'Necip Fazıl Kısakürek'], e: 'Recaizade Mahmut Ekrem, Tanzimat dönemi sanatçısıdır.' },
    { q: 'Garip akımının kurucuları arasında aşağıdakilerden hangisi yer alır?', a: 'Orhan Veli, Melih Cevdet, Oktay Rifat', w: ['Nâzım Hikmet, Fazıl Hüsnü, Cahit Külebi', 'Attila İlhan, Cemal Süreya, Edip Cansever', 'Necip Fazıl, Arif Nihat, Ziya Gökalp', 'Yahya Kemal, Ahmet Haşim, Tevfik Fikret'], e: 'Garip (Birinci Yeni) akımını Orhan Veli Kanık, Melih Cevdet Anday ve Oktay Rifat kurmuştur.' },
    { q: 'Aşağıdaki eserlerden hangisi Reşat Nuri Güntekin\'e aittir?', a: 'Çalıkuşu', w: ['Yaban', 'Sinekli Bakkal', 'Küçük Ağa', 'Ateşten Gömlek'], e: 'Çalıkuşu, Reşat Nuri Güntekin\'in en ünlü romanıdır.' },
    { q: '"Saatleri Ayarlama Enstitüsü" adlı eser aşağıdaki yazarlardan hangisine aittir?', a: 'Ahmet Hamdi Tanpınar', w: ['Oğuz Atay', 'Yusuf Atılgan', 'Adalet A\\ğao\\ğlu', 'Orhan Pamuk'], e: 'Ahmet Hamdi Tanpınar\'ın Saatleri Ayarlama Enstitüsü, modern Türk edebiyatının başyapıtlarından biridir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateYazarEser() {
  const eser = pick([
    { q: '"Sefiller" adlı eser kime aittir?', a: 'Victor Hugo', w: ['Balzac', 'Dostoyevski', 'Tolstoy', 'Zola'], e: 'Sefiller (Les Misérables), Victor Hugo\'nun ünlü romanıdır.' },
    { q: '"Sinekli Bakkal" adlı romanın yazarı aşağıdakilerden hangisidir?', a: 'Halide Edip Adıvar', w: ['Yakup Kadri Karaosmano\\ğlu', 'Reşat Nuri Güntekin', 'Mithat Cemal Kuntay', 'Peyami Safa'], e: 'Sinekli Bakkal, Halide Edip Adıvar\'ın en önemli romanıdır.' },
    { q: '"Kiralık Konak" eseri aşağıdaki yazarlardan hangisine aittir?', a: 'Yakup Kadri Karaosmano\\ğlu', w: ['Ömer Seyfettin', 'Halit Ziya Uşaklıgil', 'Peyami Safa', 'Refik Halit Karay'], e: 'Yakup Kadri\'nin Kiralık Konak\'ı, Tanzimat\'tan Cumhuriyet\'e geçişi konu alır.' },
    { q: '"Huzur" romanının yazarı aşağıdakilerden hangisidir?', a: 'Ahmet Hamdi Tanpınar', w: ['Peyami Safa', 'Oğuz Atay', 'Orhan Pamuk', 'Adalet A\\ğao\\ğlu'], e: 'Huzur, Ahmet Hamdi Tanpınar\'ın psikolojik roman türündeki eseridir.' },
  ]);
  const wrong = shuffle(eser.w).slice(0, 4);
  const all = shuffle([eser.a, ...wrong]);
  return makeQuestion('edebiyat', eser.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(eser.a), eser.e);
}

// ─── Tarih1 ───────────────────────────────────────────────────────────────────

function templateOsmanliKultur() {
  const q = pick([
    { q: 'Osmanlı Devleti\'nde "Müsadere" uygulaması aşağıdakilerden hangisidir?', a: 'Devlet görevlilerinin mallarına el konulması', w: ['Toprakların miras yoluyla devredilmesi', 'Vergilerin toplanması', 'Askerlik hizmeti', 'Ticaretin düzenlenmesi'], e: 'Müsadere, devlet görevlilerinin ölümü veya azlinde mallarına devlet tarafından el konulmasıdır.' },
    { q: 'Osmanlı Devleti\'nde "Tımar Sistemi"nin temel amacı aşağıdakilerden hangisidir?', a: 'Asker yetiştirmek ve topra\\ğı işletmek', w: ['Merkezi otoriteyi güçlendirmek', 'Ticareti geliştirmek', 'Denizcilik faaliyetlerini artırmak', 'Sanayileşmeyi sa\\ğlamak'], e: 'Tımar sistemi, topra\\ğı işleterek hem üretimi sa\\ğlar hem de sipahi adı verilen atlı asker yetiştirirdi.' },
    { q: 'Osmanlı\'da Lonca Teşkilatı\'nın işlevi aşağıdakilerden hangisidir?', a: 'Esnaf ve zanaatkarları denetlemek', w: ['Askeri e\\ğitim vermek', 'Medreseleri yönetmek', 'Mahkemeleri düzenlemek', 'Vergi toplamak'], e: 'Lonca teşkilatı, esnaf ve zanaatkarların üretim, kalite ve fiyat denetimini yapardı.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateIslahat() {
  const q = pick([
    { q: 'III. Selim döneminde yapılan ıslahat hareketlerine ne ad verilir?', a: 'Nizam-ı Cedid', w: ['Tanzimat Fermanı', 'Islahat Fermanı', 'Kanun-ı Esasi', 'Meşrutiyet'], e: 'III. Selim döneminde başlatılan reformlar Nizam-ı Cedid (Yeni Düzen) olarak adlandırılır.' },
    { q: '1839 Tanzimat Fermanı ile aşağıdakilerden hangisi ilk kez güvence altına alınmıştır?', a: 'Can, mal ve namus güvenli\\ği', w: ['Parlamenter sisteme geçiş', 'Saltanatın kaldırılması', 'Laiklik ilkesi', 'Cumhuriyetin ilanı'], e: 'Tanzimat Fermanı ile ilk defa can, mal ve namus güvenli\\ği devlet güvencesi altına alınmıştır.' },
    { q: '1876 Kanun-ı Esasi\'nin ilanıyla hangi yönetim biçimine geçilmiştir?', a: 'Meşrutiyet (Anayasalı monarşi)', w: ['Cumhuriyet', 'Mutlak monarşi', 'Federal devlet', 'Teokrasi'], e: '1876\'da Kanun-ı Esasi ilan edilerek Meşrutiyet yönetimine geçilmiştir.' },
    { q: 'Islahat Fermanı (1856) hangi padişah döneminde ilan edilmiştir?', a: 'Sultan Abdülmecid', w: ['II. Mahmud', 'Sultan Abdülaziz', 'III. Selim', 'II. Abdülhamid'], e: 'Islahat Fermanı, Sultan Abdülmecid döneminde 1856\'da ilan edilmiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateSavas1() {
  const q = pick([
    { q: 'I. Dünya Savaşı\'nın başlama nedeni aşağıdakilerden hangisidir?', a: 'Avusturya-Macaristan Veliahdı\'nın öldürülmesi', w: ['Almanya\'nın Fransa\'yı işgali', 'Rusya\'nın savaş ilanı', 'İngiltere\'nin sömürge politikası', 'Osmanlı\'nın toprak kayıpları'], e: '1914\'te Avusturya-Macaristan Veliahdı Franz Ferdinand\'ın Sırbistan\'da öldürülmesi savaşın tetikleyicisi olmuştur.' },
    { q: 'I. Dünya Savaşı\'nda Osmanlı Devleti hangi cephede başarı elde etmiştir?', a: 'Çanakkale Cephesi', w: ['Kafkas Cephesi', 'Sina-Filistin Cephesi', 'Irak Cephesi', 'Hicaz-Yemen Cephesi'], e: 'Çanakkale Cephesi, Osmanlı\'nın I. Dünya Savaşı\'nda en büyük başarısıdır.' },
    { q: 'I. Dünya Savaşı\'ndan sonra imzalanan ve Osmanlı Devleti\'ni sonlandıran antlaşma aşağıdakilerden hangisidir?', a: 'Sevr Antlaşması', w: ['Versay Antlaşması', 'Paris Barış Konferansı', 'Lozan Antlaşması', 'Mondros Ateşkesi'], e: 'Sevr Antlaşması (1920) Osmanlı\'yı sonlandıran antlaşmadır. Lozan ise Türkiye Cumhuriyeti\'nin kurucu antlaşmasıdır.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Coğrafya1 ────────────────────────────────────────────────────────────────

function templateJeomorfoloji() {
  const q = pick([
    { q: 'Aşağıdakilerden hangisi iç kuvvetlerden biri değildir?', a: 'Erozyon', w: ['Deprem', 'Volkanizma', 'Orojenez (da\\ğ oluşumu)', 'Epirojenez (k\\u013ta hareketi)'], e: 'Erozyon dış kuvvetlerdendir. Deprem, volkanizma, orojenez ve epirojenez iç kuvvetlerdir.' },
    { q: 'Türkiye\'de en yaygın görülen kayaç türü aşağıdakilerden hangisidir?', a: 'Tortul (sedimanter) kayaçlar', w: ['Magmatik kayaçlar', 'Başkalaşım kayaçları', 'Volkanik kayaçlar', 'Organik kayaçlar'], e: 'Türkiye\'de özellikle kireçtaşı gibi tortul kayaçlar yaygındır.' },
    { q: 'Türkiye\'nin bulundu\\ğu Alp-Himalaya kıvrım sistemi hangi jeolojik zamanda oluşmuştur?', a: 'III. Jeolojik Zaman (Tersiyer)', w: ['I. Jeolojik Zaman (Paleozoik)', 'II. Jeolojik Zaman (Mezozoik)', 'IV. Jeolojik Zaman (Kuvaterner)', 'Prekambriyen'], e: 'Alp-Himalaya da\\ğ sırada\\ğları III. Jeolojik Zaman (Tersiyer)\'de oluşmuştur.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateDisKuvvetler() {
  const q = pick([
    { q: 'Akarsu aşındırması sonucu oluşan yer şekli aşağıdakilerden hangisidir?', a: 'Kanyon vadi', w: ['Moren', 'Hörgüç kaya', 'Kıyı okı', 'Lapya'], e: 'Kanyon vadiler akarsu aşındırmasıyla oluşur. Moren ve hörgüç kaya buzul aşındırmasına örnektir.' },
    { q: 'Karstik aşındırma sonucu oluşan yer şekli aşağıdakilerden hangisidir?', a: 'Ma\\ğara', w: ['Kumul', 'Obruk', 'Peribacası', 'Seki (taraça)'], e: 'Ma\\ğaralar, kalker gibi karstik arazilerde suların kayaçları çözmesiyle oluşur.' },
    { q: 'Buzul aşındırması sonucu oluşan aşağıdaki yer şekillerinden hangisi yanlış eşleştirilmiştir?', a: 'Peribacası - Buzul', w: ['Sirk - Buzul', 'Moren - Buzul', 'Hörgüç kaya - Buzul', 'U şekilli vadi - Buzul'], e: 'Peribacası, buzul de\\ğil, sel sularının volkanik tüfleri aşındırmasıyla oluşur.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateIklim() {
  const q = pick([
    { q: 'Türkiye\'de en fazla yağış alan bölge aşağıdakilerden hangisidir?', a: 'Karadeniz Bölgesi', w: ['Akdeniz Bölgesi', 'Marmara Bölgesi', 'Ege Bölgesi', 'Do\\ğu Anadolu Bölgesi'], e: 'Karadeniz Bölgesi her mevsim yağış alarak en fazla yağış alan bölgedir.' },
    { q: 'Aşağıdaki iklim tiplerinden hangisinde yıllık sıcaklık farkı en azdır?', a: 'Ekvatoral iklim', w: ['Karasal iklim', 'Akdeniz iklimi', 'Sert karasal iklim', 'Muson iklimi'], e: 'Ekvatoral iklimde yıl boyunca sıcaklık fazla de\\ğişmez, yıllık sıcaklık farkı en azdır.' },
    { q: 'Türkiye\'de aşağıdaki iklim tiplerinden hangisi görülmez?', a: 'Ekvatoral iklim', w: ['Akdeniz iklimi', 'Karasal iklim', 'Karadeniz iklimi', 'Marmara (geçiş) iklimi'], e: 'Ekvatoral iklim Türkiye\'de görülmez. Türkiye\'de Akdeniz, Karadeniz, Karasal ve Marmara geçiş iklimi görülür.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateToprak() {
  const q = pick([
    { q: 'Kılımın nemli oldu\\ğu bölgelerde yıkanmanın fazla olması sonucu oluşan toprak tipi aşağıdakilerden hangisidir?', a: 'Laterit topraklar', w: ['Çernezyom topraklar', 'Kahverengi step toprakları', 'Podzol topraklar', 'Kestane renkli topraklar'], e: 'Laterit topraklar, sıcak ve nemli ekvatoral bölgelerde yıkanmanın fazla olmasıyla oluşur.' },
    { q: 'Türkiye\'deki toprak tiplerinden "Çernezyom" en çok nerede görülür?', a: 'Do\\ğu Anadolu (Erzurum-Kars)', w: ['Akdeniz kıyıları', 'Ege Bölgesi', 'Güneydo\\ğu Anadolu', 'Marmara Bölgesi'], e: 'Çernezyom (kara) topraklar, Do\\ğu Anadolu Bölgesi\'nin Erzurum-Kars yöresinde yaygındır.' },
    { q: 'Kireçli ana materyal üzerinde oluşan toprak tipi aşağıdakilerden hangisidir?', a: 'Terra rossa', w: ['Laterit', 'Podzol', 'Çernezyom', 'Alüvyal'], e: 'Terra rossa (kırmızı Akdeniz topra\\ğı), kireçtaşı üzerinde oluşan karakteristik bir topraktır.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

const templates = [
  templateTanzimat, templateServetFunun, templateFecriAtiMilli, templateCumhuriyetEdebiyat, templateYazarEser,
  templateOsmanliKultur, templateIslahat, templateSavas1,
  templateJeomorfoloji, templateDisKuvvetler, templateIklim, templateToprak,
];

export function generate(count = 30) {
  return generateUnique(() => {
    const tpl = pick(templates);
    return tpl();
  }, count);
}
