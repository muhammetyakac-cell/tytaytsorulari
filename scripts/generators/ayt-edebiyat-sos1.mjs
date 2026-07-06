import { randInt, pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

const r = (a, b) => randInt(a, b);

// ─── Edebiyat ─────────────────────────────────────────────────────────────────

function templateTanzimat() {
  const q = pick([
    { q: 'Tanzimat Edebiyat\\u0131n\\u0131n I. dönem sanatç\\u0131lar\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisinde do\\u011fru verilmi\\u015ftir?', a: 'Şinasi, Nam\\u0131k Kemal, Ziya Paşa', w: ['Tevfik Fikret, Cenap Şahabettin, Halit Ziya', 'Mehmet Akif, Yahya Kemal, Ahmet Haşim', 'Faz\\u0131l Hüsnü, Orhan Veli, Melih Cevdet', 'Ahmet Mithat, Nabizade Nâz\\u0131m, Samipaşazade Sezai'], e: 'Tanzimat I. dönem sanatç\\u0131lar\\u0131: Şinasi, Nam\\u0131k Kemal ve Ziya Paşa\'d\\u0131r.' },
    { q: 'Tanzimat Edebiyat\\u0131\'nda ilk tiyatro eseri a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Şair Evlenmesi - Şinasi', w: ['Vatan yahut Silistre - Nam\\u0131k Kemal', 'Gülnihal - Nam\\u0131k Kemal', 'Celaleddin Harzemşah - Ziya Paşa', 'Macera-y\\u0131 Aşk - Samipaşazade Sezai'], e: 'Şinasi\'nin \\u015eair Evlenmesi (1860), Türk edebiyat\\u0131n\\u0131n ilk tiyatro eseridir.' },
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi Tanzimat Edebiyat\\u0131\'nda roman türünün ilk örneklerinden biri de\\u011fildir?', a: 'Safahat', w: ['Taaşşuk-\\u0131 Talat ve Fitnat', '\\u0130ntibah', 'Cezmi', 'Sergüzeşt'], e: 'Safahat, Mehmet Akif Ersoy\'a ait bir şiir kitab\\u0131d\\u0131r, Tanzimat roman\\u0131 de\\u011fildir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateServetFunun() {
  const q = pick([
    { q: 'Servet-i Fünun Edebiyat\\u0131\'n\\u0131n kurucusu a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Tevfik Fikret', w: ['Cenap Şahabettin', 'Halit Ziya Uşakl\\u0131gil', 'Mehmet Rauf', 'Hüseyin Cahit Yalç\\u0131n'], e: 'Servet-i Fünun toplulu\\ğu, Tevfik Fikret\'in öncülü\\ğünde kurulmuştur.' },
    { q: 'A\\u015fa\\u011f\\u0131daki eserlerden hangisi Halit Ziya Uşakl\\u0131gil\'e aittir?', a: 'Aşk-\\u0131 Memnu', w: ['Eylül', 'K\\u0131r\\u0131k Hayatlar', 'Mai ve Siyah', 'H\\u00fcz\\u00fcn ve Tebessüm'], e: 'Aşk-\\u0131 Memnu, Halit Ziya\'n\\u0131n en önemli roman\\u0131d\\u0131r. Eylül Mehmet Rauf\'a aittir.' },
    { q: 'Servet-i Fünun döneminde "Sanat sanat içindir" anlay\\u0131ş\\u0131 benimsenmiştir. A\\u015fa\\u011f\\u0131dakilerden hangisi bu dönem özelliklerinden biri de\\u011fildir?', a: 'Toplumsal konular işlenmiştir', w: ['Arapça-Farsça sözcükler yo\\ğundur', 'Sembolizm ve empresyonizm etkisi vard\\u0131r', 'Mensur şiir türü gelişmiştir', '\\u015eiirde konu bütünlü\\ğü önemsenmiştir'], e: 'Servet-i Fünun\'da toplumsal konular de\\ğil, bireysel ve sanatsal konular işlenmiştir.' },
    { q: 'Servet-i Fünun roman\\u0131nda a\\u015fa\\u011f\\u0131daki ak\\u0131mlardan hangisinin etkisi güçlüdür?', a: 'Realizm', w: ['Romantizm', 'Klasisizm', 'Natüralizm', 'Sembolizm'], e: 'Servet-i Fünun roman\\u0131nda Realizm ak\\u0131m\\u0131n\\u0131n etkisi görülür.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateFecriAtiMilli() {
  const q = pick([
    { q: 'Fecr-i Ati toplulu\\ğu a\\u015fa\\u011f\\u0131dakilerden hangisiyle sona ermiştir?', a: 'Da\\ğ\\u0131lma ve Milli Edebiyat\'a kat\\u0131lma', w: ['Servet-i Fünun\'a dönüşme', 'Tanzimat\'a ba\\ğlanma', 'Cumhuriyet Dönemi\'ne geçiş', 'Tamamen kapanma'], e: 'Fecr-i Ati toplulu\\ğu 1912\'de da\\ğ\\u0131lm\\u0131ş, sanatç\\u0131lar\\u0131n ço\\ğu Milli Edebiyat ak\\u0131m\\u0131na kat\\u0131lm\\u0131şt\\u0131r.' },
    { q: 'Milli Edebiyat ak\\u0131m\\u0131n\\u0131n öncüsü a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Ömer Seyfettin', w: ['Ziya Gökalp', 'Mehmet Emin Yurdakul', 'Yahya Kemal Beyatl\\u0131', 'Ali Canip Yöntem'], e: 'Milli Edebiyat ak\\u0131m\\u0131n\\u0131n öncüsü Ömer Seyfettin\'dir. Ziya Gökalp ise fikir babas\\u0131d\\u0131r.' },
    { q: '"Memleket edebiyat\\u0131" olarak da bilinen edebi ak\\u0131m a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Milli Edebiyat', w: ['Servet-i Fünun', 'Tanzimat', 'Fecr-i Ati', 'Cumhuriyet Dönemi'], e: 'Milli Edebiyat ak\\u0131m\\u0131, Anadolu\'ya yönelerek memleket edebiyat\\u0131 anlay\\u0131ş\\u0131n\\u0131 benimsemiştir.' },
    { q: 'A\\u015fa\\u011f\\u0131daki yazarlardan hangisi Milli Edebiyat dönemi hikaye yazarlar\\u0131ndan biri de\\u011fildir?', a: 'Halit Ziya Uşakl\\u0131gil', w: ['Ömer Seyfettin', 'Refik Halit Karay', 'Yakup Kadri Karaosmano\\ğlu', 'Reşat Nuri Güntekin'], e: 'Halit Ziya Uşakl\\u0131gil Servet-i Fünun dönemi yazar\\u0131d\\u0131r.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateCumhuriyetEdebiyat() {
  const q = pick([
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi Cumhuriyet Dönemi Türk şiirinin önemli şairlerinden biri de\\u011fildir?', a: 'Recaizade Mahmut Ekrem', w: ['Orhan Veli Kan\\u0131k', 'Nâz\\u0131m Hikmet', 'Cahit S\\u0131tk\\u0131 Taranc\\u0131', 'Necip Faz\\u0131l K\\u0131sakürek'], e: 'Recaizade Mahmut Ekrem, Tanzimat dönemi sanatç\\u0131s\\u0131d\\u0131r.' },
    { q: 'Garip ak\\u0131m\\u0131n\\u0131n kurucular\\u0131 aras\\u0131nda a\\u015fa\\u011f\\u0131dakilerden hangisi yer al\\u0131r?', a: 'Orhan Veli, Melih Cevdet, Oktay Rifat', w: ['Nâz\\u0131m Hikmet, Faz\\u0131l Hüsnü, Cahit Külebi', 'Attila \\u0130lhan, Cemal Süreya, Edip Cansever', 'Necip Faz\\u0131l, Arif Nihat, Ziya Gökalp', 'Yahya Kemal, Ahmet Haşim, Tevfik Fikret'], e: 'Garip (Birinci Yeni) ak\\u0131m\\u0131n\\u0131 Orhan Veli Kan\\u0131k, Melih Cevdet Anday ve Oktay Rifat kurmuştur.' },
    { q: 'A\\u015fa\\u011f\\u0131daki eserlerden hangisi Reşat Nuri Güntekin\'e aittir?', a: 'Çal\\u0131kuşu', w: ['Yaban', 'Sinekli Bakkal', 'K\\u00fcçük Ağa', 'Ateşten Gömlek'], e: 'Çal\\u0131kuşu, Reşat Nuri Güntekin\'in en ünlü roman\\u0131d\\u0131r.' },
    { q: '"Saatleri Ayarlama Enstitüsü" adl\\u0131 eser a\\u015fa\\u011f\\u0131daki yazarlardan hangisine aittir?', a: 'Ahmet Hamdi Tanp\\u0131nar', w: ['Oğuz Atay', 'Yusuf At\\u0131lgan', 'Adalet A\\ğao\\ğlu', 'Orhan Pamuk'], e: 'Ahmet Hamdi Tanp\\u0131nar\'\\u0131n Saatleri Ayarlama Enstitüsü, modern Türk edebiyat\\u0131n\\u0131n başyap\\u0131tlar\\u0131ndan biridir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateYazarEser() {
  const eser = pick([
    { q: '"Sefiller" adl\\u0131 eser kime aittir?', a: 'Victor Hugo', w: ['Balzac', 'Dostoyevski', 'Tolstoy', 'Zola'], e: 'Sefiller (Les Misérables), Victor Hugo\'nun ünlü roman\\u0131d\\u0131r.' },
    { q: '"Sinekli Bakkal" adl\\u0131 roman\\u0131n yazar\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Halide Edip Ad\\u0131var', w: ['Yakup Kadri Karaosmano\\ğlu', 'Reşat Nuri Güntekin', 'Mithat Cemal Kuntay', 'Peyami Safa'], e: 'Sinekli Bakkal, Halide Edip Ad\\u0131var\'\\u0131n en önemli roman\\u0131d\\u0131r.' },
    { q: '"Kiral\\u0131k Konak" eseri a\\u015fa\\u011f\\u0131daki yazarlardan hangisine aittir?', a: 'Yakup Kadri Karaosmano\\ğlu', w: ['Ömer Seyfettin', 'Halit Ziya Uşakl\\u0131gil', 'Peyami Safa', 'Refik Halit Karay'], e: 'Yakup Kadri\'nin Kiral\\u0131k Konak\'\\u0131, Tanzimat\'tan Cumhuriyet\'e geçişi konu al\\u0131r.' },
    { q: '"Huzur" roman\\u0131n\\u0131n yazar\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Ahmet Hamdi Tanp\\u0131nar', w: ['Peyami Safa', 'Oğuz Atay', 'Orhan Pamuk', 'Adalet A\\ğao\\ğlu'], e: 'Huzur, Ahmet Hamdi Tanp\\u0131nar\'\\u0131n psikolojik roman türündeki eseridir.' },
  ]);
  const wrong = shuffle(eser.w).slice(0, 4);
  const all = shuffle([eser.a, ...wrong]);
  return makeQuestion('edebiyat', eser.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(eser.a), eser.e);
}

// ─── Tarih1 ───────────────────────────────────────────────────────────────────

function templateOsmanliKultur() {
  const q = pick([
    { q: 'Osmanl\\u0131 Devleti\'nde "Müsadere" uygulamas\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Devlet görevlilerinin mallar\\u0131na el konulmas\\u0131', w: ['Topraklar\\u0131n miras yoluyla devredilmesi', 'Vergilerin toplanmas\\u0131', 'Askerlik hizmeti', 'Ticaretin düzenlenmesi'], e: 'Müsadere, devlet görevlilerinin ölümü veya azlinde mallar\\u0131na devlet taraf\\u0131ndan el konulmas\\u0131d\\u0131r.' },
    { q: 'Osmanl\\u0131 Devleti\'nde "T\\u0131mar Sistemi"nin temel amac\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Asker yetiştirmek ve topra\\ğ\\u0131 işletmek', w: ['Merkezi otoriteyi güçlendirmek', 'Ticareti geliştirmek', 'Denizcilik faaliyetlerini art\\u0131rmak', 'Sanayileşmeyi sa\\ğlamak'], e: 'T\\u0131mar sistemi, topra\\ğ\\u0131 işleterek hem üretimi sa\\ğlar hem de sipahi ad\\u0131 verilen atl\\u0131 asker yetiştirirdi.' },
    { q: 'Osmanl\\u0131\'da Lonca Teşkilat\\u0131\'n\\u0131n işlevi a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Esnaf ve zanaatkarlar\\u0131 denetlemek', w: ['Askeri e\\ğitim vermek', 'Medreseleri yönetmek', 'Mahkemeleri düzenlemek', 'Vergi toplamak'], e: 'Lonca teşkilat\\u0131, esnaf ve zanaatkarlar\\u0131n üretim, kalite ve fiyat denetimini yapard\\u0131.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateIslahat() {
  const q = pick([
    { q: 'III. Selim döneminde yap\\u0131lan \\u0131slahat hareketlerine ne ad verilir?', a: 'Nizam-\\u0131 Cedid', w: ['Tanzimat Ferman\\u0131', 'Islahat Ferman\\u0131', 'Kanun-\\u0131 Esasi', 'Meşrutiyet'], e: 'III. Selim döneminde başlat\\u0131lan reformlar Nizam-\\u0131 Cedid (Yeni Düzen) olarak adland\\u0131r\\u0131l\\u0131r.' },
    { q: '1839 Tanzimat Ferman\\u0131 ile a\\u015fa\\u011f\\u0131dakilerden hangisi ilk kez güvence alt\\u0131na al\\u0131nm\\u0131şt\\u0131r?', a: 'Can, mal ve namus güvenli\\ği', w: ['Parlamenter sisteme geçiş', 'Saltanat\\u0131n kald\\u0131r\\u0131lmas\\u0131', 'Laiklik ilkesi', 'Cumhuriyetin ilan\\u0131'], e: 'Tanzimat Ferman\\u0131 ile ilk defa can, mal ve namus güvenli\\ği devlet güvencesi alt\\u0131na al\\u0131nm\\u0131şt\\u0131r.' },
    { q: '1876 Kanun-\\u0131 Esasi\'nin ilan\\u0131yla hangi yönetim biçimine geçilmiştir?', a: 'Meşrutiyet (Anayasal\\u0131 monarşi)', w: ['Cumhuriyet', 'Mutlak monarşi', 'Federal devlet', 'Teokrasi'], e: '1876\'da Kanun-\\u0131 Esasi ilan edilerek Meşrutiyet yönetimine geçilmiştir.' },
    { q: 'Islahat Ferman\\u0131 (1856) hangi padişah döneminde ilan edilmiştir?', a: 'Sultan Abdülmecid', w: ['II. Mahmud', 'Sultan Abdülaziz', 'III. Selim', 'II. Abdülhamid'], e: 'Islahat Ferman\\u0131, Sultan Abdülmecid döneminde 1856\'da ilan edilmiştir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateSavas1() {
  const q = pick([
    { q: 'I. Dünya Sava\\u015f\\u0131\'n\\u0131n başlama nedeni a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Avusturya-Macaristan Veliahd\\u0131\'n\\u0131n öldürülmesi', w: ['Almanya\'n\\u0131n Fransa\'y\\u0131 işgali', 'Rusya\'n\\u0131n savaş ilan\\u0131', '\\u0130ngiltere\'nin sömürge politikas\\u0131', 'Osmanl\\u0131\'n\\u0131n toprak kay\\u0131plar\\u0131'], e: '1914\'te Avusturya-Macaristan Veliahd\\u0131 Franz Ferdinand\'\\u0131n S\\u0131rbistan\'da öldürülmesi savaş\\u0131n tetikleyicisi olmuştur.' },
    { q: 'I. Dünya Sava\\u015f\\u0131\'nda Osmanl\\u0131 Devleti hangi cephede başar\\u0131 elde etmiştir?', a: 'Çanakkale Cephesi', w: ['Kafkas Cephesi', 'Sina-Filistin Cephesi', 'Irak Cephesi', 'Hicaz-Yemen Cephesi'], e: 'Çanakkale Cephesi, Osmanl\\u0131\'n\\u0131n I. Dünya Sava\\u015f\\u0131\'nda en büyük başar\\u0131s\\u0131d\\u0131r.' },
    { q: 'I. Dünya Sava\\u015f\\u0131\'ndan sonra imzalanan ve Osmanl\\u0131 Devleti\'ni sonland\\u0131ran antlaşma a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Sevr Antlaşmas\\u0131', w: ['Versay Antlaşmas\\u0131', 'Paris Bar\\u0131ş Konferans\\u0131', 'Lozan Antlaşmas\\u0131', 'Mondros Ateşkesi'], e: 'Sevr Antlaşmas\\u0131 (1920) Osmanl\\u0131\'y\\u0131 sonland\\u0131ran antlaşmad\\u0131r. Lozan ise Türkiye Cumhuriyeti\'nin kurucu antlaşmas\\u0131d\\u0131r.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Coğrafya1 ────────────────────────────────────────────────────────────────

function templateJeomorfoloji() {
  const q = pick([
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi i\\u00e7 kuvvetlerden biri de\\u011fildir?', a: 'Erozyon', w: ['Deprem', 'Volkanizma', 'Orojenez (da\\ğ oluşumu)', 'Epirojenez (k\\u013ta hareketi)'], e: 'Erozyon d\\u0131ş kuvvetlerdendir. Deprem, volkanizma, orojenez ve epirojenez i\\u00e7 kuvvetlerdir.' },
    { q: 'Türkiye\'de en yayg\\u0131n görülen kayaç türü a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Tortul (sedimanter) kayaçlar', w: ['Magmatik kayaçlar', 'Başkalaş\\u0131m kayaçlar\\u0131', 'Volkanik kayaçlar', 'Organik kayaçlar'], e: 'Türkiye\'de özellikle kireçtaş\\u0131 gibi tortul kayaçlar yayg\\u0131nd\\u0131r.' },
    { q: 'Türkiye\'nin bulundu\\ğu Alp-Himalaya k\\u0131vr\\u0131m sistemi hangi jeolojik zamanda oluşmuştur?', a: 'III. Jeolojik Zaman (Tersiyer)', w: ['I. Jeolojik Zaman (Paleozoik)', 'II. Jeolojik Zaman (Mezozoik)', 'IV. Jeolojik Zaman (Kuvaterner)', 'Prekambriyen'], e: 'Alp-Himalaya da\\ğ s\\u0131rada\\ğlar\\u0131 III. Jeolojik Zaman (Tersiyer)\'de oluşmuştur.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateDisKuvvetler() {
  const q = pick([
    { q: 'Akarsu aş\\u0131nd\\u0131rmas\\u0131 sonucu oluşan yer şekli a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Kanyon vadi', w: ['Moren', 'Hörgüç kaya', 'K\\u0131y\\u0131 ok\\u0131', 'Lapya'], e: 'Kanyon vadiler akarsu aş\\u0131nd\\u0131rmas\\u0131yla oluşur. Moren ve hörgüç kaya buzul aş\\u0131nd\\u0131rmas\\u0131na örnektir.' },
    { q: 'Karstik aş\\u0131nd\\u0131rma sonucu oluşan yer şekli a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Ma\\ğara', w: ['Kumul', 'Obruk', 'Peribacas\\u0131', 'Seki (taraça)'], e: 'Ma\\ğaralar, kalker gibi karstik arazilerde sular\\u0131n kayaçlar\\u0131 çözmesiyle oluşur.' },
    { q: 'Buzul aş\\u0131nd\\u0131rmas\\u0131 sonucu oluşan a\\u015fa\\u011f\\u0131daki yer şekillerinden hangisi yanl\\u0131ş eşleştirilmiştir?', a: 'Peribacas\\u0131 - Buzul', w: ['Sirk - Buzul', 'Moren - Buzul', 'Hörgüç kaya - Buzul', 'U şekilli vadi - Buzul'], e: 'Peribacas\\u0131, buzul de\\ğil, sel sular\\u0131n\\u0131n volkanik tüfleri aş\\u0131nd\\u0131rmas\\u0131yla oluşur.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateIklim() {
  const q = pick([
    { q: 'Türkiye\'de en fazla yağ\\u0131ş alan bölge a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Karadeniz Bölgesi', w: ['Akdeniz Bölgesi', 'Marmara Bölgesi', 'Ege Bölgesi', 'Do\\ğu Anadolu Bölgesi'], e: 'Karadeniz Bölgesi her mevsim yağ\\u0131\\u015f alarak en fazla yağ\\u0131\\u015f alan bölgedir.' },
    { q: 'A\\u015fa\\u011f\\u0131daki iklim tiplerinden hangisinde y\\u0131ll\\u0131k s\\u0131cakl\\u0131k fark\\u0131 en azd\\u0131r?', a: 'Ekvatoral iklim', w: ['Karasal iklim', 'Akdeniz iklimi', 'Sert karasal iklim', 'Muson iklimi'], e: 'Ekvatoral iklimde y\\u0131l boyunca s\\u0131cakl\\u0131k fazla de\\ğişmez, y\\u0131ll\\u0131k s\\u0131cakl\\u0131k fark\\u0131 en azd\\u0131r.' },
    { q: 'Türkiye\'de a\\u015fa\\u011f\\u0131daki iklim tiplerinden hangisi görülmez?', a: 'Ekvatoral iklim', w: ['Akdeniz iklimi', 'Karasal iklim', 'Karadeniz iklimi', 'Marmara (geçiş) iklimi'], e: 'Ekvatoral iklim Türkiye\'de görülmez. Türkiye\'de Akdeniz, Karadeniz, Karasal ve Marmara geçiş iklimi görülür.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateToprak() {
  const q = pick([
    { q: 'K\\u0131l\\u0131m\\u0131n nemli oldu\\ğu bölgelerde y\\u0131kanman\\u0131n fazla olmas\\u0131 sonucu oluşan toprak tipi a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Laterit topraklar', w: ['Çernezyom topraklar', 'Kahverengi step topraklar\\u0131', 'Podzol topraklar', 'Kestane renkli topraklar'], e: 'Laterit topraklar, s\\u0131cak ve nemli ekvatoral bölgelerde y\\u0131kanman\\u0131n fazla olmas\\u0131yla oluşur.' },
    { q: 'Türkiye\'deki toprak tiplerinden "Çernezyom" en çok nerede görülür?', a: 'Do\\ğu Anadolu (Erzurum-Kars)', w: ['Akdeniz k\\u0131y\\u0131lar\\u0131', 'Ege Bölgesi', 'G\\u00fcneydo\\ğu Anadolu', 'Marmara Bölgesi'], e: 'Çernezyom (kara) topraklar, Do\\ğu Anadolu Bölgesi\'nin Erzurum-Kars yöresinde yayg\\u0131nd\\u0131r.' },
    { q: 'Kireçli ana materyal üzerinde oluşan toprak tipi a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Terra rossa', w: ['Laterit', 'Podzol', 'Çernezyom', 'Alüvyal'], e: 'Terra rossa (k\\u0131rm\\u0131z\\u0131 Akdeniz topra\\ğ\\u0131), kireçtaş\\u0131 üzerinde oluşan karakteristik bir toprakt\\u0131r.' },
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
