/**
 * TYT Sosyal Bilimler Soru Üretici
 */
import { pick, shuffle, makeQuestion, makeOptions } from './shared.mjs';

// ─── Tarih ───────────────────────────────────────────────────────────────────

function islamiyetOncesiTurk() {
  const pool = [
    { q: 'İslamiyet öncesi Türk devletlerinde hükümdarın başkanlığında toplanan ve devlet işlerinin görüşüldüğü meclise ne ad verilirdi?', opts: ['Meclis-i Mebusan', 'Toy (Kurultay)', 'Divan-ı Hümayun', 'Ayan Meclisi', 'İltizam'], correct: 1, exp: 'İslamiyet öncesi Türk devletlerinde hükümdarın başkanlığında toplanan meclise "Toy" veya "Kurultay" adı verilirdi.' },
    { q: 'Orhun Abideleri hangi Türk devleti döneminde dikilmiştir?', opts: ['Asya Hun Devleti', 'Avrupa Hun Devleti', 'II. Göktürk (Kutluk) Devleti', 'Uygur Devleti', 'Hazar Kağanlığı'], correct: 2, exp: 'Orhun Abideleri, II. Göktürk (Kutluk) Devleti döneminde (8. yüzyıl) dikilmiştir.' },
    { q: 'İslamiyet öncesi Türklerde ölen kişinin ardından düzenlenen yas törenine ne ad verilirdi?', opts: ['Sığır', 'Şölen', 'Yuğ', 'Kurgan', 'Balbal'], correct: 2, exp: 'İslamiyet öncesi Türklerde ölen kişinin ardından düzenlenen törene "yuğ" adı verilirdi.' },
    { q: 'Tarihte bilinen ilk Türk devleti aşağıdakilerden hangisidir?', opts: ['Göktürkler', 'Asya Hun Devleti', 'Avrupa Hun Devleti', 'Uygurlar', 'Hazarlar'], correct: 1, exp: 'Tarihte bilinen ilk Türk devleti, Teoman tarafından MÖ 220\'de kurulan Asya Hun Devleti\'dir.' },
    { q: 'Uygurların yerleşik hayata geçmesinde etkili olan din aşağıdakilerden hangisidir?', opts: ['Göktanrı inancı', 'Budizm', 'Maniheizm', 'Hristiyanlık', 'Musevilik'], correct: 2, exp: 'Uygurlar Maniheizm\'i kabul ederek yerleşik hayata geçmişlerdir.' },
    { q: '"Kut" anlayışı aşağıdakilerden hangisini ifade eder?', opts: ['Hükümdarın yönetme yetkisini Tanrı\'dan alması', 'Ordunun düzenli toplanması', 'Ticaret yollarının denetimi', 'Vergilerin düzenli toplanması', 'Toprakların paylaşılması'], correct: 0, exp: '"Kut" anlayışı, hükümdarın yönetme yetkisini Tanrı\'dan aldığı inancına dayanır.' },
  ];
  const d = pick(pool);
  return makeQuestion('tarih', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function osmanliKurulus() {
  const pool = [
    { q: 'Osmanlı Devleti\'nde devşirme sistemi ilk kez hangi padişah döneminde uygulanmıştır?', opts: ['Osman Gazi', 'Orhan Gazi', 'I. Murat', 'Yıldırım Bayezid', 'Fatih Sultan Mehmet'], correct: 2, exp: 'Devşirme sistemi I. Murat döneminde uygulanmaya başlanmıştır.' },
    { q: 'Ankara Savaşı (1402) hangi iki devlet arasında gerçekleşmiştir?', opts: ['Osmanlı-Memlük', 'Osmanlı-Bizans', 'Osmanlı-Timur', 'Osmanlı-Akkoyunlu', 'Osmanlı-Karamanoğlu'], correct: 2, exp: 'Ankara Savaşı Yıldırım Bayezid ile Timur arasında gerçekleşmiştir.' },
    { q: 'Osmanlı Devleti\'nin kurucusu Osman Gazi hangi Oğuz boyuna mensuptur?', opts: ['Kayı Boyu', 'Kınık Boyu', 'Bayındır Boyu', 'Çepni Boyu', 'Yüreğir Boyu'], correct: 0, exp: 'Osman Gazi, Oğuzların Kayı Boyu\'na mensuptur.' },
    { q: 'I. Murat döneminde kurulan kapıkulu piyade birliği aşağıdakilerden hangisidir?', opts: ['Tımarlı Sipahi', 'Akıncılar', 'Yeniçeri Ocağı', 'Azaplar', 'Lağımcılar'], correct: 2, exp: 'Yeniçeri Ocağı I. Murat döneminde (1363) kurulmuştur.' },
    { q: 'Fetret Devri (1402-1413) hangi savaşın ardından yaşanmıştır?', opts: ['İstanbul\'un Fethi', 'Ankara Savaşı', 'Varna Savaşı', 'I. Kosova Savaşı', 'Niğbolu Savaşı'], correct: 1, exp: 'Fetret Devri Ankara Savaşı\'nın ardından yaşanan taht kavgaları dönemidir.' },
    { q: 'Osmanlı Devleti\'nde vakıf sistemiyle ilgili aşağıdaki ifadelerden hangisi doğrudur?', opts: ['Vakıflar yalnızca padişah tarafından kurulabilirdi.', 'Vakıf gelirleri hazineye aktarılırdı.', 'Vakıflar toplumsal hizmetlerin finansmanını sağlardı.', 'Vakıflar askerî amaçlı kurulurdu.', 'Vakıflar vergi toplama amacı taşırdı.'], correct: 2, exp: 'Vakıflar cami, medrese, hastane gibi yapıların finansmanını sağlayarak toplumsal hizmetleri desteklemiştir.' },
  ];
  const d = pick(pool);
  return makeQuestion('tarih', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function kurtulusSavasi() {
  const pool = [
    { q: '"Manda ve himaye kabul edilemez" kararı hangi kongrede alınmıştır?', opts: ['Amasya Kongresi', 'Erzurum Kongresi', 'Sivas Kongresi', 'Balıkesir Kongresi', 'Alaşehir Kongresi'], correct: 2, exp: 'Sivas Kongresi\'nde (1919) manda ve himaye kabul edilemez kararı alınmıştır.' },
    { q: 'Misak-ı Millî kararları hangi kurul tarafından kabul edilmiştir?', opts: ['Erzurum Kongresi', 'Heyet-i Temsiliye', 'Son Osmanlı Mebusan Meclisi', 'TBMM', 'Amasya Görüşmeleri'], correct: 2, exp: 'Misak-ı Millî kararları 28 Ocak 1920\'de Son Osmanlı Mebusan Meclisi tarafından kabul edilmiştir.' },
    { q: 'Büyük Taarruz hangi meydan muharebesiyle sonuçlanmıştır?', opts: ['I. İnönü', 'II. İnönü', 'Sakarya', 'Başkomutanlık Meydan Muharebesi', 'Kütahya-Eskişehir'], correct: 3, exp: 'Büyük Taarruz Başkomutanlık Meydan Muharebesi (Dumlupınar) ile sonuçlanmıştır.' },
    { q: 'Amasya Genelgesi\'nde "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır" ifadesi hangi ilkeyi vurgular?', opts: ['İnkılapçılık', 'Millî egemenlik', 'Milliyetçilik', 'Batıcılık', 'Devletçilik'], correct: 1, exp: 'Bu ifade millî egemenlik ilkesini vurgulamaktadır.' },
    { q: 'Lozan Antlaşması hangi tarihte imzalanmıştır?', opts: ['30 Ekim 1918', '24 Temmuz 1923', '29 Ekim 1923', '3 Mart 1924', '20 Nisan 1924'], correct: 1, exp: 'Lozan Antlaşması 24 Temmuz 1923\'te imzalanmıştır.' },
    { q: 'TBMM\'nin açılmasından sonra düzenli ordunun kurulmasını zorunlu kılan gelişme nedir?', opts: ['İstanbul\'un işgali', 'Kuva-yı Millîye\'nin yetersiz kalması', 'Sevr Antlaşması', 'Saltanatın kaldırılması', 'Londra Konferansı'], correct: 1, exp: 'Kuva-yı Millîye\'nin yetersiz kalması düzenli ordunun kurulmasını zorunlu kılmıştır.' },
  ];
  const d = pick(pool);
  return makeQuestion('tarih', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function inkilap() {
  const pool = [
    { q: 'Türk Medeni Kanunu hangi ülkenin medeni kanunu örnek alınarak hazırlanmıştır?', opts: ['Fransa', 'Almanya', 'İtalya', 'İsviçre', 'İngiltere'], correct: 3, exp: 'Türk Medeni Kanunu (1926) İsviçre Medeni Kanunu örnek alınarak hazırlanmıştır.' },
    { q: 'Harf İnkılabı hangi yıl gerçekleştirilmiştir?', opts: ['1923', '1926', '1928', '1930', '1934'], correct: 2, exp: 'Harf İnkılabı 1 Kasım 1928\'de kabul edilmiştir.' },
    { q: 'Aşağıdakilerden hangisi Atatürk\'ün toplumsal alanda yaptığı inkılaplardan biri değildir?', opts: ['Şapka Kanunu', 'Tekke ve zaviyelerin kapatılması', 'Soyadı Kanunu', 'Medeni Kanun\'un kabulü', 'Kabotaj Kanunu'], correct: 4, exp: 'Kabotaj Kanunu ekonomik alanda yapılan bir inkılaptır.' },
    { q: 'Türk kadınına milletvekili seçme ve seçilme hakkı hangi yıl verilmiştir?', opts: ['1926', '1930', '1933', '1934', '1935'], correct: 3, exp: 'Kadınlara milletvekili seçme ve seçilme hakkı 5 Aralık 1934\'te tanınmıştır.' },
    { q: 'Saltanat hangi tarihte kaldırılmıştır?', opts: ['23 Nisan 1920', '1 Kasım 1922', '29 Ekim 1923', '3 Mart 1924', '10 Nisan 1928'], correct: 1, exp: 'Saltanat 1 Kasım 1922\'de kaldırılmıştır.' },
    { q: 'Teşvik-i Sanayi Kanunu hangi alandaki inkılaplar kapsamındadır?', opts: ['Siyasi', 'Toplumsal', 'Hukuk', 'Ekonomi', 'Kültür'], correct: 3, exp: 'Teşvik-i Sanayi Kanunu (1927) ekonomik alandaki inkılaplar kapsamındadır.' },
  ];
  const d = pick(pool);
  return makeQuestion('tarih', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

// ─── Coğrafya ────────────────────────────────────────────────────────────────

function iklim() {
  const pool = [
    { q: 'Akdeniz ikliminin doğal bitki örtüsü aşağıdakilerden hangisidir?', opts: ['Orman', 'Bozkır', 'Maki', 'Çayır', 'Tundra'], correct: 2, exp: 'Akdeniz ikliminin bitki örtüsü makidir.' },
    { q: 'Türkiye\'de en fazla yağış alan bölge aşağıdakilerden hangisidir?', opts: ['İç Anadolu', 'Güneydoğu Anadolu', 'Doğu Anadolu', 'Karadeniz', 'Ege'], correct: 3, exp: 'Karadeniz Bölgesi en fazla yağış alan bölgedir.' },
    { q: 'Aşağıdakilerden hangisi atmosferin katmanlarından biri değildir?', opts: ['Troposfer', 'Stratosfer', 'Termosfer', 'Mezosfer', 'Litosfer'], correct: 4, exp: 'Litosfer yerkürenin taşküre katmanıdır, atmosfer katmanı değildir.' },
    { q: 'Türkiye\'de iklim çeşitliliğinin nedenlerinden biri aşağıdakilerden hangisi değildir?', opts: ['Üç tarafının denizlerle çevrili olması', 'Dağların uzanış doğrultusu', 'Yer şekillerinin çeşitliliği', 'Toprak tiplerinin farklılığı', 'Enlem farklılıkları'], correct: 3, exp: 'Toprak tiplerinin farklılığı iklimin sonucudur, nedeni değildir.' },
    { q: 'Yeryüzünde sıcaklığın dağılışını etkileyen temel faktör aşağıdakilerden hangisidir?', opts: ['Rüzgârlar', 'Okyanus akıntıları', 'Enlem', 'Kara ve deniz dağılışı', 'Yükselti'], correct: 2, exp: 'Sıcaklık dağılışını etkileyen temel faktör enlemdir.' },
    { q: 'Türkiye\'de Akdeniz ikliminin görüldüğü alanlar için hangisi söylenebilir?', opts: ['Kış sıcaklıkları 0°C altındadır', 'Yıllık yağış her yerde aynıdır', 'Yaz kuraklığı belirgindir', 'Kar yağışı hiç görülmez', 'Bitki örtüsü ormandır'], correct: 2, exp: 'Akdeniz ikliminde yaz kuraklığı en belirgin özelliktir.' },
  ];
  const d = pick(pool);
  return makeQuestion('cografya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function topografya() {
  const pool = [
    { q: 'Aşağıdakilerden hangisi iç kuvvetlerden biri değildir?', opts: ['Orojenez', 'Epirojenez', 'Volkanizma', 'Erozyon', 'Deprem'], correct: 3, exp: 'Erozyon dış kuvvetlerdendir.' },
    { q: 'Türkiye\'deki dağlar hangi orojenez döneminde oluşmuştur?', opts: ['Kaledonya', 'Kaledoniyen', 'Heresinyen', 'Alp-Himalaya', 'Kambriyen'], correct: 3, exp: 'Toroslar ve Kuzey Anadolu Dağları Alp-Himalaya orojenezinde oluşmuştur.' },
    { q: 'Aşağıdaki kıyı tiplerinden hangisi Türkiye\'de görülmez?', opts: ['Boyuna kıyılar', 'Enine kıyılar', 'Ria tipi kıyılar', 'Fiyort tipi kıyılar', 'Dalmaçya tipi kıyılar'], correct: 3, exp: 'Fiyort tipi kıyılar İskandinavya\'da görülür, Türkiye\'de yoktur.' },
    { q: 'Karstik aşınım şekilleri hangi kayaç türünde yaygındır?', opts: ['Granit', 'Bazalt', 'Kumtaşı', 'Kireç taşı', 'Mermer'], correct: 3, exp: 'Karstik şekiller kireç taşı (kalker) gibi eriyebilen kayaçlarda görülür.' },
    { q: 'Türkiye\'nin en yüksek dağı aşağıdakilerden hangisidir?', opts: ['Erciyes', 'Süphan', 'Ağrı Dağı', 'Demirkazık', 'Uludağ'], correct: 2, exp: 'Ağrı Dağı (5137 m) Türkiye\'nin en yüksek dağıdır.' },
  ];
  const d = pick(pool);
  return makeQuestion('cografya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function nufus() {
  const pool = [
    { q: 'Türkiye\'de nüfus yoğunluğunun en fazla olduğu bölge hangisidir?', opts: ['Ege', 'Marmara', 'Akdeniz', 'İç Anadolu', 'Karadeniz'], correct: 1, exp: 'Marmara Bölgesi en yoğun nüfuslu bölgedir.' },
    { q: 'Nüfus piramidinin dar tabanlı olması neyi gösterir?', opts: ['Doğum oranının yüksek olduğunu', 'Doğum oranının düşük olduğunu', 'Ölüm oranının düşük olduğunu', 'Göç alındığını', 'Yaşam süresinin uzun olduğunu'], correct: 1, exp: 'Dar tabanlı nüfus piramidi doğum oranlarının düşük olduğunu gösterir.' },
    { q: 'Türkiye\'de ilk nüfus sayımı hangi yıl yapılmıştır?', opts: ['1923', '1927', '1935', '1940', '1945'], correct: 1, exp: 'İlk nüfus sayımı 28 Ekim 1927\'de yapılmıştır.' },
    { q: 'Türkiye\'de iç göçlerin en önemli nedeni aşağıdakilerden hangisidir?', opts: ['Eğitim', 'İklim', 'Ekonomik nedenler', 'Kültürel etkinlikler', 'Sağlık hizmetleri'], correct: 2, exp: 'İç göçlerin en önemli nedeni ekonomiktir.' },
  ];
  const d = pick(pool);
  return makeQuestion('cografya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function harita() {
  const pool = [
    { q: '1/500.000 ölçekli haritada iki şehir arası 8 cm ise gerçek mesafe kaç km\'dir?', opts: ['20 km', '30 km', '40 km', '50 km', '60 km'], correct: 2, exp: '8 × 500.000 = 4.000.000 cm = 40 km.' },
    { q: 'Türkiye hangi yarımkürelerde yer alır?', opts: ['Kuzey ve Doğu', 'Kuzey ve Batı', 'Güney ve Doğu', 'Güney ve Batı', 'Ekvator üzerinde'], correct: 0, exp: 'Türkiye Kuzey Yarımküre ve Doğu Yarımküre\'dedir.' },
    { q: 'Büyük ölçekli haritalarla ilgili hangisi doğrudur?', opts: ['Ayrıntı azdır', 'Ölçek paydası küçüktür', 'Dar alanı küçük gösterir', 'Küçültme oranı fazladır', 'Harita alanı geniştir'], correct: 1, exp: 'Büyük ölçekli haritalarda ölçek paydası küçüktür.' },
    { q: 'Türkiye\'nin en kuzey noktası aşağıdakilerden hangisidir?', opts: ['Sinop (İnceburun)', 'İstanbul (Rumelifeneri)', 'Kastamonu', 'Samsun', 'Zonguldak'], correct: 0, exp: 'En kuzey nokta Sinop\'taki İnceburun\'dur.' },
  ];
  const d = pick(pool);
  return makeQuestion('cografya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

// ─── Felsefe ─────────────────────────────────────────────────────────────────

function varlikFelsefesi() {
  const pool = [
    { q: 'Varlığın ana maddesinin "su" olduğunu savunan filozof hangisidir?', opts: ['Anaksimenes', 'Thales', 'Anaksimandros', 'Herakleitos', 'Empedokles'], correct: 1, exp: 'Thales, varlığın temel maddesinin (arkhe) su olduğunu savunmuştur.' },
    { q: 'İdealizme göre varlıkla ilgili hangisi doğrudur?', opts: ['Varlık maddeden ibarettir', 'Varlığın özü düşüncedir', 'Varlık hem madde hem düşüncedir', 'Varlık duyularla algılanamaz', 'Varlık yoktur'], correct: 1, exp: 'İdealizme göre varlığın temelinde düşünce (idea) vardır.' },
    { q: '"Her şey akar" diyen filozof hangisidir?', opts: ['Parmenides', 'Zenon', 'Herakleitos', 'Demokritos', 'Anaksagoras'], correct: 2, exp: 'Herakleitos, evrende sürekli değişim olduğunu savunmuştur.' },
    { q: 'Varlığın temelini atom olarak kabul eden filozof hangisidir?', opts: ['Sokrates', 'Platon', 'Aristoteles', 'Demokritos', 'Epikuros'], correct: 3, exp: 'Demokritos, varlığın temelinde atomların bulunduğunu savunmuştur.' },
    { q: '"Düşünüyorum, öyleyse varım" sözü hangi akımın temelini oluşturur?', opts: ['Empirizm', 'Rasyonalizm', 'Nihilizm', 'Pragmatizm', 'Materyalizm'], correct: 1, exp: 'Descartes\'ın bu sözü rasyonalizmin temelini oluşturur.' },
  ];
  const d = pick(pool);
  return makeQuestion('felsefe', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function bilgiFelsefesi() {
  const pool = [
    { q: '"Doğru bilgi mümkün değildir" görüşünü savunan akım hangisidir?', opts: ['Rasyonalizm', 'Empirizm', 'Septisizm', 'Pozitivizm', 'Entüisyonizm'], correct: 2, exp: 'Septisizm (kuşkuculuk) doğru bilginin mümkün olmadığını savunur.' },
    { q: 'Bilginin kaynağını duyu deneyimlerine dayandıran akım hangisidir?', opts: ['Rasyonalizm', 'Empirizm', 'Kritisizm', 'Septisizm', 'Pragmatizm'], correct: 1, exp: 'Empirizm bilginin kaynağının duyu deneyimleri olduğunu savunur.' },
    { q: 'Sokrates\'in uyguladığı yöntem aşağıdakilerden hangisidir?', opts: ['Tümevarım', 'Analitik yöntem', 'Diyalektik yöntem', 'Fenomenolojik yöntem', 'Deneysel yöntem'], correct: 2, exp: 'Sokrates soru-cevap yöntemi olan diyalektiği kullanmıştır.' },
    { q: 'Pragmatizm bilginin doğruluğunu hangi ölçüte göre belirler?', opts: ['Tutarlılık', 'Uygunluk', 'Fayda ve işe yararlık', 'Sezgi', 'Vahiy'], correct: 2, exp: 'Pragmatizme göre bilginin doğruluğu sağladığı fayda ile ölçülür.' },
  ];
  const d = pick(pool);
  return makeQuestion('felsefe', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function etik() {
  const pool = [
    { q: '"Mutluluk erdemli yaşamaktır" diyen filozof hangisidir?', opts: ['Sokrates', 'Platon', 'Aristoteles', 'Epikür', 'Diogenes'], correct: 2, exp: 'Aristoteles\'e göre mutluluk erdemli yaşayarak ulaşılır.' },
    { q: 'Kant\'ın ödev ahlakına göre bir eylemin ahlaki değeri neye bağlıdır?', opts: ['Sonuçlarına', 'Sağladığı faydaya', 'Niyet ve ödeve uygunluğuna', 'Toplumun onayına', 'Duygulara'], correct: 2, exp: 'Kant\'a göre eylem sırf ödev duygusuyla yapıldığında ahlakidir.' },
    { q: 'Faydacılık (Utilitarianism) akımının kurucusu kimdir?', opts: ['Kant', 'Bentham', 'Mill', 'Nietzsche', 'Sartre'], correct: 1, exp: 'Faydacılığın kurucusu Jeremy Bentham\'dır.' },
  ];
  const d = pick(pool);
  return makeQuestion('felsefe', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

// ─── Din Kültürü ─────────────────────────────────────────────────────────────

function inancEsaslari() {
  const pool = [
    { q: 'Aşağıdakilerden hangisi imanın şartlarından biridir?', opts: ['Oruç tutmak', 'Hacca gitmek', 'Meleklere iman', 'Namaz kılmak', 'Zekât vermek'], correct: 2, exp: 'Meleklere iman imanın şartlarındandır.' },
    { q: 'İslam\'da kader inancıyla ilgili hangisi doğrudur?', opts: ['İnsanın yaptıkları zorunludur', 'Allah takdir etmiştir ve insanın iradesi vardır', 'Kader insanın elinde değildir', 'Yalnızca iyi şeyler kaderdir', 'Kader inancı yoktur'], correct: 1, exp: 'İslam\'da kader ve özgür irade bir arada bulunur.' },
    { q: 'Dört büyük melekle ilgili hangi eşleştirme doğrudur?', opts: ['Cebrail-Nefih', 'Mikâil-Ölüm', 'Azrail-Vahiy', 'İsrafil-Sur üfleme', 'Cebrail-Rızık'], correct: 3, exp: 'İsrafil Sûr\'a üflemekle görevlidir.' },
    { q: '"Allah\'tan başka ilah yoktur" anlamına gelen kavram hangisidir?', opts: ['Kelime-i şehadet', 'Tekbir', 'Salavat', 'Kelime-i tevhid', 'Besmele'], correct: 3, exp: '"Lâ ilâhe illallah" ifadesi kelime-i tevhiddir.' },
  ];
  const d = pick(pool);
  return makeQuestion('din', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function ibadetler() {
  const pool = [
    { q: 'Beş vakit namaz hangi olayla farz kılınmıştır?', opts: ['Hicret', 'İsra ve Miraç', 'Bedir Savaşı', 'Mekke\'nin Fethi', 'Akabe Biatları'], correct: 1, exp: 'Beş vakit namaz Miraç gecesinde farz kılınmıştır.' },
    { q: 'Zekât oranı aşağıdakilerden hangisidir?', opts: ['1/10', '1/20', '1/40', '1/50', '1/100'], correct: 2, exp: 'Zekât malın 1/40\'ı (yüzde 2,5) oranında verilir.' },
    { q: 'Orucun farz kılındığı ayet hangi surede yer alır?', opts: ['Fatiha', 'Bakara', 'Al-i İmran', 'Nisa', 'Maide'], correct: 1, exp: 'Oruç Bakara Suresi 183. ayetle farz kılınmıştır.' },
    { q: 'Hac ibadetiyle ilgili hangisi yanlıştır?', opts: ['İslam\'ın şartıdır', 'Ömürde bir kez farzdır', 'Zenginlere farzdır', 'Muharrem ayında yapılır', 'İhrama girilir'], correct: 3, exp: 'Hac Zilhicce ayında yapılır, Muharrem ayında değil.' },
  ];
  const d = pick(pool);
  return makeQuestion('din', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function ahlakSiyer() {
  const pool = [
    { q: '"Uswetün Hasene" kavramı neyi ifade eder?', opts: ['Allah\'ın elçisi olması', 'Güzel örnek olması', 'Son peygamber olması', 'Ümmi olması', 'Kureyşli olması'], correct: 1, exp: '"Uswetün Hasene" Hz. Muhammed\'in güzel örnek olduğunu ifade eder.' },
    { q: 'Hz. Muhammed\'in Medine\'ye hicretinin temel nedeni nedir?', opts: ['Ticaret yapmak', 'Medinelilerin daveti ve Mekke\'deki baskılar', 'Devlet kurmak', 'Ailesini güvende tutmak', 'Hac görevi'], correct: 1, exp: 'Medinelilerin daveti ve Mekke\'de artan baskılar hicrete neden olmuştur.' },
    { q: 'İslam ahlakında "emanet" kavramı neyi ifade eder?', opts: ['Maddi eşyaları korumak', 'Sorumlulukları yerine getirmek', 'İş yerinde güvenilir olmak', 'Vasiyet bırakmak', 'Borç vermek'], correct: 1, exp: 'Emanet, Allah\'a ve insanlara karşı sorumlulukları yerine getirmektir.' },
    { q: 'Hz. Muhammed\'e "Muhammedü\'l-Emin" denmesinin sebebi nedir?', opts: ['Zengin olması', 'Eğitimli olması', 'Doğru sözlü ve güvenilir olması', 'Asil soydan gelmesi', 'Tüccar olması'], correct: 2, exp: 'Hz. Muhammed doğruluğu ve güvenilirliği nedeniyle "el-Emin" lakabını almıştır.' },
  ];
  const d = pick(pool);
  return makeQuestion('din', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

const templates = [
  islamiyetOncesiTurk, osmanliKurulus, kurtulusSavasi, inkilap,
  iklim, topografya, nufus, harita,
  varlikFelsefesi, bilgiFelsefesi, etik,
  inancEsaslari, ibadetler, ahlakSiyer
];

export function generate(count = 30) {
  const seen = new Set();
  const unique = [];
  let attempts = 0;
  while (unique.length < count && attempts < 500) {
    attempts++;
    const tpl = templates[attempts % templates.length];
    const q = tpl();
    if (!q) continue;
    const key = `${q.sub_category}|${q.question}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(q);
    }
  }
  return unique.slice(0, count);
}
