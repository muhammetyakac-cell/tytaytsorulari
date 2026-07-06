import { pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

// ─── Edebiyat ─────────────────────────────────────────────────────────────────

function templateTanzimat() {
  const q = pick([
    { q: 'Tanzimat Edebiyatının I. dönem sanatçıları aşağıdakilerden hangisinde doğru verilmiştir?', a: 'Şinasi, Namık Kemal, Ziya Paşa', w: ['Tevfik Fikret, Cenap Şahabettin, Halit Ziya', 'Mehmet Akif, Yahya Kemal, Ahmet Haşim', 'Fazıl Hüsnü, Orhan Veli, Melih Cevdet', 'Ahmet Mithat, Nabizade Nâzım, Samipaşazade Sezai'], e: 'Tanzimat I. dönem sanatçıları: Şinasi, Namık Kemal ve Ziya Paşa\'dır.' },
    { q: 'Tanzimat Edebiyatı\'nda ilk yerli tiyatro eseri aşağıdakilerden hangisidir?', a: 'Şair Evlenmesi - Şinasi', w: ['Vatan yahut Silistre - Namık Kemal', 'Gülnihal - Namık Kemal', 'Celaleddin Harzemşah - Ziya Paşa', 'Macera-yı Aşk - Abdülhak Hamit'], e: 'Şinasi\'nin Şair Evlenmesi (1860), Türk edebiyatının yazılan ilk yerli tiyatro eseridir.' },
    { q: 'Aşağıdakilerden hangisi Tanzimat Edebiyatı\'nda roman türünün ilk örneklerinden biri değildir?', a: 'Safahat', w: ['Taaşşuk-ı Talat ve Fitnat', 'İntibah', 'Cezmi', 'Sergüzeşt'], e: 'Safahat, Mehmet Akif Ersoy\'a ait bir şiir kitabıdır, roman değildir.' },
    { q: 'Tanzimat II. Dönem sanatçılarından olup "Tezatlar Şairi" olarak bilinen ve "Makber" şiiriyle ünlü şair kimdir?', a: 'Abdülhak Hamit Tarhan', w: ['Recaizade Mahmut Ekrem', 'Muallim Naci', 'Ziya Paşa', 'Namık Kemal'], e: 'Makber şiiriyle ünlenen ve tezatlar şairi olarak bilinen sanatçı Abdülhak Hamit Tarhan\'dır.' },
    { q: 'Türk edebiyatında ilk edebi roman olan "İntibah"ın yazarı kimdir?', a: 'Namık Kemal', w: ['Ahmet Mithat Efendi', 'Şemsettin Sami', 'Recaizade Mahmut Ekrem', 'Samipaşazade Sezai'], e: 'Namık Kemal\'in yazdığı İntibah, edebiyatımızdaki ilk edebi romandır.' },
    { q: 'Tanzimat I. Dönemde edebiyatımızdaki ilk çeviri roman olan "Telemak"ı kim çevirmiştir?', a: 'Yusuf Kamil Paşa', w: ['Şinasi', 'Ziya Paşa', 'Ahmet Vefik Paşa', 'Namık Kemal'], e: 'Fransız yazar Fenelon\'dan "Telemak" adlı romanı Yusuf Kamil Paşa çevirmiştir.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateServetFunun() {
  const q = pick([
    { q: 'Servet-i Fünun Edebiyatı\'nın şiir alanındaki en büyük temsilcisi ve öncüsü aşağıdakilerden hangisidir?', a: 'Tevfik Fikret', w: ['Cenap Şahabettin', 'Halit Ziya Uşaklıgil', 'Mehmet Rauf', 'Hüseyin Cahit Yalçın'], e: 'Servet-i Fünun şiirinin öncüsü Tevfik Fikret\'tir.' },
    { q: 'Aşağıdaki eserlerden hangisi Türk edebiyatında Batılı anlamda ilk kusursuz roman kabul edilir?', a: 'Mai ve Siyah', w: ['Eylül', 'Kırık Hayatlar', 'Araba Sevdası', 'İntibah'], e: 'Halit Ziya Uşaklıgil\'in Mai ve Siyah ile Aşk-ı Memnu romanları Batılı anlamda ilk modern romanlardır.' },
    { q: 'Servet-i Fünun döneminde "Sanat sanat içindir" anlayışı benimsenmiştir. Aşağıdakilerden hangisi bu dönem özelliklerinden biri değildir?', a: 'Toplumsal konular ve siyasi eleştiri işlenmiştir', w: ['Arapça-Farsça sözcükler ve ağır bir dil kullanılmıştır', 'Sembolizm ve parnasizm etkisi vardır', 'Mensur şiir türü gelişmiştir', 'Aruz ölçüsü başarıyla kullanılmıştır'], e: 'Servet-i Fünun\'da sansür nedeniyle toplumsal değil, bireysel konular işlenmiştir.' },
    { q: 'Edebiyatımızdaki ilk psikolojik roman olan "Eylül"ün yazarı kimdir?', a: 'Mehmet Rauf', w: ['Halit Ziya Uşaklıgil', 'Peyami Safa', 'Nabizade Nâzım', 'Hüseyin Rahmi Gürpınar'], e: 'Eylül romanı Mehmet Rauf tarafından yazılmıştır ve ilk psikolojik romandır.' },
    { q: 'Servet-i Fünun dönemi şairlerinden Cenap Şahabettin\'in doğa betimlemeleriyle ünlü şiiri hangisidir?', a: 'Elhan-ı Şita', w: ['Sis', 'Promete', 'Makber', 'Sahra'], e: 'Elhan-ı Şita (Kış Nağmeleri), Cenap Şahabettin\'in kar yağışını anlattığı ünlü sembolist şiiridir.' },
    { q: 'Servet-i Fünun dergisi hangi yazarın Fransızcadan çevirdiği "Edebiyat ve Hukuk" makalesi bahane edilerek kapatılmıştır?', a: 'Hüseyin Cahit Yalçın', w: ['Tevfik Fikret', 'Ahmet Şuayb', 'Süleyman Nazif', 'Ali Ekrem Bolayır'], e: 'Hüseyin Cahit Yalçın\'ın "Edebiyat ve Hukuk" makalesi derginin kapatılmasına neden olmuştur.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateFecriAtiMilli() {
  const q = pick([
    { q: 'Fecr-i Ati topluluğunun yayımladığı beyanname ile edebiyat dünyasına çıkışının ardından savunduğu temel ilke nedir?', a: 'Sanat şahsi ve muhteremdir.', w: ['Toplum için sanat', 'Memleket gerçeklerini yansıtmak', 'Sade dille yazmak', 'Batı taklitçiliğinden kaçınmak'], e: 'Fecr-i Ati\'nin temel ilkesi "Sanat şahsi ve muhteremdir (saygıdeğerdir)" sloganıdır.' },
    { q: 'Milli Edebiyat akımının dil anlayışını belirleyen "Yeni Lisan" makalesi hangi dergide yayımlanmıştır?', a: 'Genç Kalemler', w: ['Türk Yurdu', 'Servet-i Fünun', 'Tercüman-ı Ahval', 'Dergah'], e: 'Yeni Lisan makalesi, 1911\'de Selanik\'te çıkan Genç Kalemler dergisinde Ömer Seyfettin tarafından imzasız yayımlanmıştır.' },
    { q: 'Milli Edebiyat akımının öncüsü ve Türk hikayeciliğinde Maupassant (olay) tarzının en büyük temsilcisi kimdir?', a: 'Ömer Seyfettin', w: ['Ziya Gökalp', 'Mehmet Emin Yurdakul', 'Refik Halit Karay', 'Memduh Şevket Esendal'], e: 'Ömer Seyfettin, Milli Edebiyat\'ın öncüsü ve olay hikayesinin (Maupassant) ustasıdır.' },
    { q: 'Türkçülük akımını sistemleştiren, "Türkçülüğün Esasları" adlı eserin yazarı kimdir?', a: 'Ziya Gökalp', w: ['Yusuf Akçura', 'Gaspıralı İsmail', 'Mehmet Fuat Köprülü', 'Ahmet Ağaoğlu'], e: 'Ziya Gökalp, sosyolog kimliğiyle Türkçülük fikrini "Türkçülüğün Esasları" kitabında sistemleştirmiştir.' },
    { q: 'Milli Mücadele yıllarını anlatan "Ateşten Gömlek" ve "Vurun Kahpeye" romanlarının yazarı kimdir?', a: 'Halide Edip Adıvar', w: ['Yakup Kadri Karaosmanoğlu', 'Reşat Nuri Güntekin', 'Aka Gündüz', 'Refik Halit Karay'], e: 'Halide Edip Adıvar, bizzat katıldığı Milli Mücadele\'yi bu eserlerinde anlatmıştır.' },
    { q: 'Fecr-i Ati topluluğunda sonuna kadar kalarak bu anlayışla şiir yazmaya devam eden tek şair kimdir?', a: 'Ahmet Haşim', w: ['Yakup Kadri Karaosmanoğlu', 'Emin Bülent Serdaroğlu', 'Refik Halit Karay', 'Fuat Köprülü'], e: 'Ahmet Haşim, Fecr-i Ati dağıldıktan sonra da bireysel sanat anlayışını ve sembolizmi sürdüren tek sanatçıdır.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateCumhuriyetEdebiyat() {
  const q = pick([
    { q: 'Aşağıdakilerden hangisi Cumhuriyet Dönemi "Garip (I. Yeni)" akımının kurucularından biri değildir?', a: 'Cemal Süreya', w: ['Orhan Veli Kanık', 'Melih Cevdet Anday', 'Oktay Rifat Horozcu'], e: 'Cemal Süreya, İkinci Yeni akımının temsilcisidir.' },
    { q: 'Hece ölçüsünü ustalıkla kullanan, "Kaldırımlar" şiiriyle "Kaldırımlar Şairi" olarak bilinen sanatçı kimdir?', a: 'Necip Fazıl Kısakürek', w: ['Ahmet Hamdi Tanpınar', 'Cahit Sıtkı Tarancı', 'Ahmet Muhip Dıranas', 'Ziya Osman Saba'], e: 'Necip Fazıl Kısakürek, mistik eğilimleri ve Kaldırımlar şiiriyle tanınır.' },
    { q: 'İkinci Yeni şiirinin özellikleri arasında aşağıdakilerden hangisi yer almaz?', a: 'Sade ve anlaşılır bir dil kullanma', w: ['Sözcüklerin anlamını bozma, yeni sözcükler türetme', 'Mantık dokusunu kırma, sürrealizmden etkilenme', 'İmgeci ve kapalı bir anlatım benimseme', 'Geleneksel şiir kalıplarını reddetme'], e: 'İkinci Yeni, anlaşılırlığa karşı çıkmış, kapalı ve imge yoğunluklu bir dil kullanmıştır.' },
    { q: 'Toplumcu Gerçekçi şiirin öncüsü olan, serbest nazım ve fütürizmden etkilenen şair kimdir?', a: 'Nâzım Hikmet Ran', w: ['Attila İlhan', 'Hasan Hüseyin Korkmazgil', 'Ahmet Arif', 'Rıfat Ilgaz'], e: 'Nâzım Hikmet, Türk şiirinde serbest ölçüyü ve toplumcu gerçekçi anlayışı başlatan isimdir.' },
    { q: 'Modernizm ve postmodernizm etkisindeki Cumhuriyet romanında bilinçakışı tekniğini başarıyla kullanan "Tutunamayanlar" romanının yazarı kimdir?', a: 'Oğuz Atay', w: ['Yusuf Atılgan', 'Orhan Pamuk', 'Bilge Karasu', 'Adalet Ağaoğlu'], e: 'Oğuz Atay\'ın Tutunamayanlar romanı, Türk edebiyatında postmodernizmin başyapıtlarındandır.' },
    { q: '"Yaş Otuz Beş" şiiriyle ölümü ve yaşam sevincini bir arada işleyen, "Ölüm Şairi" olarak da anılan şair kimdir?', a: 'Cahit Sıtkı Tarancı', w: ['Ziya Osman Saba', 'Asaf Halet Çelebi', 'Behçet Necatigil', 'Ahmet Muhip Dıranas'], e: 'Cahit Sıtkı Tarancı, Yaş Otuz Beş şiiriyle tanınır ve ölüm korkusunu sıkça işler.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('edebiyat', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateYazarEser() {
  const eser = pick([
    { q: '"Yaban" romanı kime aittir?', a: 'Yakup Kadri Karaosmanoğlu', w: ['Reşat Nuri Güntekin', 'Halide Edip Adıvar', 'Refik Halit Karay', 'Peyami Safa'], e: 'Yaban, Yakup Kadri\'nin Kurtuluş Savaşı dönemindeki aydın-köylü çatışmasını anlattığı eseridir.' },
    { q: '"Dokuzuncu Hariciye Koğuşu" romanının yazarı aşağıdakilerden hangisidir?', a: 'Peyami Safa', w: ['Ahmet Hamdi Tanpınar', 'Tarık Buğra', 'Memduh Şevket Esendal', 'Abdülhak Şinasi Hisar'], e: 'Peyami Safa\'nın otobiyografik izler taşıyan ünlü psikolojik romanıdır.' },
    { q: '"Bereketli Topraklar Üzerinde" eseri aşağıdaki yazarlardan hangisine aittir?', a: 'Orhan Kemal', w: ['Yaşar Kemal', 'Kemal Tahir', 'Fakir Baykurt', 'Sabahattin Ali'], e: 'Orhan Kemal, Çukurova\'ya pamuk toplamaya giden işçilerin yaşamını bu eserinde anlatır.' },
    { q: '"Suç ve Ceza" romanının yazarı aşağıdakilerden hangisidir?', a: 'Dostoyevski', w: ['Tolstoy', 'Gogol', 'Çehov', 'Turgenyev'], e: 'Suç ve Ceza (Raskolnikov), Rus yazar Dostoyevski\'nin başyapıtıdır.' },
    { q: '"İnce Memed" romanıyla dünya çapında ün kazanan yazarımız kimdir?', a: 'Yaşar Kemal', w: ['Orhan Kemal', 'Kemal Tahir', 'Talip Apaydın', 'Mahmut Makal'], e: 'Yaşar Kemal, Çukurova insanının destansı hikayesini İnce Memed serisinde anlatmıştır.' },
    { q: '"Kuyucaklı Yusuf" adlı romanın yazarı kimdir?', a: 'Sabahattin Ali', w: ['Sait Faik Abasıyanık', 'Sadri Ertem', 'Halikarnas Balıkçısı', 'Reşat Nuri Güntekin'], e: 'Kuyucaklı Yusuf, Sabahattin Ali\'nin Türk romanında kasaba gerçeğini yansıtan ilk başarılı örneğidir.' }
  ]);
  const wrong = shuffle(eser.w).slice(0, 4);
  const all = shuffle([eser.a, ...wrong]);
  return makeQuestion('edebiyat', eser.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(eser.a), eser.e);
}

// ─── Tarih-1 ───────────────────────────────────────────────────────────────────

function templateOsmanliKultur() {
  const q = pick([
    { q: 'Osmanlı Devleti\'nde "Müsadere" uygulaması aşağıdakilerden hangisidir?', a: 'Devlet görevlilerinin mallarına el konulması', w: ['Toprakların miras yoluyla devredilmesi', 'Vergilerin toplanması', 'Askerlik hizmeti', 'Ticaretin düzenlenmesi'], e: 'Müsadere, devlet görevlilerinin ölümü veya azlinde mallarına devlet tarafından el konulmasıdır.' },
    { q: 'Osmanlı Devleti\'nde "Tımar Sistemi"nin temel amacı aşağıdakilerden hangisidir?', a: 'Asker yetiştirmek ve toprağı işletmek', w: ['Merkezi otoriteyi güçlendirmek', 'Ticareti geliştirmek', 'Denizcilik faaliyetlerini artırmak', 'Sanayileşmeyi sağlamak'], e: 'Tımar sistemi, toprağı işleterek hem üretimi sağlar hem de sipahi adı verilen atlı asker (cebelü) yetiştirirdi.' },
    { q: 'Osmanlı\'da Lonca Teşkilatı\'nın işlevi aşağıdakilerden hangisidir?', a: 'Esnaf ve zanaatkarları denetlemek', w: ['Askeri eğitim vermek', 'Medreseleri yönetmek', 'Mahkemeleri düzenlemek', 'Vergi toplamak'], e: 'Lonca teşkilatı, esnaf ve zanaatkarların üretim, kalite, fiyat denetimini yapar ve usta-çırak ilişkisini düzenlerdi.' },
    { q: 'Osmanlı Devleti\'nde yönetici kesim (Seyfiye, İlmiye, Kalemiye) içinde hangisi İlmiye sınıfının görevlerinden biri değildir?', a: 'Maliyeyi yönetmek', w: ['Eğitim ve öğretimi sağlamak', 'Hukuk (kadılık) işlerine bakmak', 'Dini işleri yürütmek', 'Fetva vermek'], e: 'Maliye işleri Kalemiye sınıfının (Defterdar) görevidir. İlmiye sınıfı din, eğitim ve hukukla ilgilenir.' },
    { q: 'Osmanlı Devleti\'nde olağanüstü durumlarda (savaş, afet) halktan toplanan vergiye ne ad verilir?', a: 'Avarız', w: ['Aşar (Öşür)', 'Cizye', 'Haraç', 'Çiftbozan'], e: 'Avarız vergisi, olağanüstü hallerde toplanan ve zamanla sürekli hale gelen vergidir.' },
    { q: 'Divan-ı Hümayun\'da alınan kararların kaydedildiği defterlere ne ad verilir?', a: 'Mühimme Defterleri', w: ['Tahrir Defterleri', 'Şer\'iye Sicilleri', 'Tereke Defterleri', 'Maliyeden Müdevver'], e: 'Divan kararları Mühimme Defterlerine yazılırdı. Tahrir defterleri toprak kayıtları içindir.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateIslahat() {
  const q = pick([
    { q: 'III. Selim döneminde yapılan radikal ıslahat hareketlerinin tümüne ne ad verilir?', a: 'Nizam-ı Cedid', w: ['Tanzimat', 'Islahat', 'Meşrutiyet', 'Lale Devri'], e: 'III. Selim\'in kurduğu yeni orduya ve yaptığı yeniliklerin tümüne Nizam-ı Cedid denir.' },
    { q: '1839 Tanzimat Fermanı (Gülhane Hatt-ı Hümayunu) ile aşağıdakilerden hangisi ilk kez güvence altına alınmıştır?', a: 'Can, mal ve namus güvenliği', w: ['Parlamenter sisteme geçiş', 'Saltanatın kaldırılması', 'Laiklik ilkesi', 'Cumhuriyetin ilanı'], e: 'Padişah, Tanzimat Fermanı ile ilk defa kendi gücünün üstünde kanun gücünü tanımış ve halkın can, mal güvenliğini garanti etmiştir.' },
    { q: '1876 Kanun-ı Esasi\'nin ilanıyla hangi yönetim biçimine geçilmiştir?', a: 'Meşrutiyet (Anayasalı monarşi)', w: ['Cumhuriyet', 'Mutlak monarşi', 'Federal devlet', 'Teokrasi'], e: '1876\'da Kanun-ı Esasi ilan edilerek Mebusan Meclisi açılmış ve Meşrutiyet yönetimine geçilmiştir.' },
    { q: 'Osmanlı Devleti\'nde gayrimüslimlere devlet memuru olabilme hakkı ilk kez hangi belgeyle verilmiştir?', a: 'Islahat Fermanı (1856)', w: ['Tanzimat Fermanı', 'Kanun-ı Esasi', 'Sened-i İttifak', 'Halepa Fermanı'], e: 'Islahat Fermanı, gayrimüslimlere Müslümanlarla tam eşitlik sağlamayı amaçlamış ve memuriyet hakkı tanımıştır.' },
    { q: 'II. Mahmut döneminde Yeniçeri Ocağı\'nın kaldırılması olayına tarihte ne ad verilir?', a: 'Vaka-i Hayriye (Hayırlı Olay)', w: ['Vaka-i Vakvakiye (Çınar Vakası)', 'Patrona Halil İsyanı', 'Kabakçı Mustafa İsyanı', '31 Mart Vakası'], e: '1826\'da Yeniçeri Ocağı\'nın kaldırılması, yeniliklerin önünü açtığı için Hayırlı Olay olarak adlandırılır.' },
    { q: 'Osmanlı Devleti\'nde ilk resmi gazete aşağıdakilerden hangisidir?', a: 'Takvim-i Vekayi', w: ['Tercüman-ı Ahval', 'Ceride-i Havadis', 'Tasvir-i Efkâr', 'Muhbir'], e: 'II. Mahmut döneminde (1831) çıkarılan Takvim-i Vekayi ilk resmi gazetedir.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateSavas1() {
  const q = pick([
    { q: 'I. Dünya Savaşı\'nın başlama nedeni (kıvılcımı) aşağıdakilerden hangisidir?', a: 'Avusturya-Macaristan Veliahdı\'nın Saraybosna\'da öldürülmesi', w: ['Almanya\'nın Fransa\'yı işgali', 'Rusya\'nın Boğazlara saldırması', 'İngiltere\'nin sömürge politikası', 'Osmanlı\'nın gemileri batırması'], e: '1914\'te Veliaht Ferdinand\'ın bir Sırp milliyetçisi tarafından öldürülmesi savaşın fitilini ateşlemiştir.' },
    { q: 'I. Dünya Savaşı\'nda Osmanlı Devleti\'nin taarruz (saldırı) amacıyla açtığı cepheler hangileridir?', a: 'Kafkas ve Kanal Cepheleri', w: ['Çanakkale ve Suriye', 'Irak ve Hicaz-Yemen', 'Galiçya ve Makedonya', 'Çanakkale ve Kanal'], e: 'Osmanlı, Rusya\'ya karşı Kafkas, İngiltere\'ye karşı Mısır\'ı almak için Kanal cephesinde taarruz etmiştir.' },
    { q: 'I. Dünya Savaşı\'nı bitiren ve Osmanlı Devleti\'nin paylaşımını içeren ağır şartlı antlaşma aşağıdakilerden hangisidir?', a: 'Sevr Antlaşması', w: ['Versay Antlaşması', 'Mondros Ateşkesi', 'Lozan Antlaşması', 'Trianon Antlaşması'], e: '10 Ağustos 1920\'de imzalanan Sevr Antlaşması, Osmanlı\'yı fiilen sona erdiren antlaşmadır.' },
    { q: 'İtilaf Devletleri\'nin Rusya\'ya yardım götürmek ve Osmanlı\'yı savaş dışı bırakmak amacıyla açtığı cephe hangisidir?', a: 'Çanakkale Cephesi', w: ['Irak Cephesi', 'Kanal Cephesi', 'Kafkas Cephesi', 'Suriye-Filistin Cephesi'], e: 'Çanakkale Boğazı\'nı geçerek Rusya\'ya yardım ulaştırmak isteyen İtilaf Donanması başarısız olmuştur.' },
    { q: 'I. Dünya Savaşı sonunda kurulan ve dünya barışını korumayı amaçlayan uluslararası örgüt hangisidir?', a: 'Milletler Cemiyeti (Cemiyet-i Akvam)', w: ['Birleşmiş Milletler', 'NATO', 'Avrupa Konseyi', 'Varşova Paktı'], e: 'Wilson İlkeleri doğrultusunda Paris Barış Konferansı\'nda Milletler Cemiyeti kurulmuştur.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('tarih1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Coğrafya-1 ────────────────────────────────────────────────────────────────

function templateJeomorfoloji() {
  const q = pick([
    { q: 'Aşağıdakilerden hangisi Dünya\'nın iç ısısından enerjisini alan iç kuvvetlerden biri değildir?', a: 'Erozyon', w: ['Deprem (Seizma)', 'Volkanizma', 'Orojenez (Dağ oluşumu)', 'Epirojenez (Kıta hareketi)'], e: 'Erozyon, akarsu ve rüzgar gibi dış kuvvetler tarafından gerçekleştirilir.' },
    { q: 'Türkiye\'de en yaygın görülen kayaç grubu aşağıdakilerden hangisidir?', a: 'Tortul (sedimanter) kayaçlar', w: ['İç püskürük kayaçlar', 'Başkalaşım (metamorfik) kayaçları', 'Dış püskürük kayaçlar', 'Siyenit ve Diorit'], e: 'Türkiye\'de özellikle kireçtaşı (kalker) gibi tortul kayaçlar çok geniş alan kaplar.' },
    { q: 'Türkiye\'nin bulunduğu Alp-Himalaya kıvrım dağ sistemi hangi jeolojik zamanda oluşmuştur?', a: 'III. Jeolojik Zaman (Tersiyer)', w: ['I. Jeolojik Zaman (Paleozoik)', 'II. Jeolojik Zaman (Mezozoik)', 'IV. Jeolojik Zaman (Kuvaterner)', 'Prekambriyen'], e: 'Alp-Himalaya sistemi Tersiyer (3. Zaman) döneminde oluşan genç kıvrım dağlarıdır.' },
    { q: 'Okyanus veya deniz tabanlarında meydana gelen şiddetli depremler sonrası oluşan dev dalgalara ne ad verilir?', a: 'Tsunami', w: ['Gelgit (Medcezir)', 'Fırtına kabarması', 'Hortum', 'Rip akıntısı'], e: 'Tsunami, deniz tabanındaki sismik hareketler (deprem, volkan) sonucu oluşur.' },
    { q: 'Aşağıdaki yer şekillerinden hangisinin oluşumunda volkanizmanın doğrudan etkisi vardır?', a: 'Kaldera', w: ['Obruk', 'Fiyort', 'Sirk', 'Tombolo'], e: 'Kaldera, volkanik patlama veya çökme sonucu oluşan devasa kraterdir.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateDisKuvvetler() {
  const q = pick([
    { q: 'Akarsu aşındırması sonucu oluşan, derin ve sarp yamaçlı vadilere ne ad verilir?', a: 'Kanyon vadi', w: ['Çentik vadi', 'Boğaz vadi', 'Geniş tabanlı vadi', 'Kör vadi'], e: 'Kanyon vadiler, özellikle karstik arazilerde veya farklı dirençteki tabakaların derine aşınmasıyla oluşur.' },
    { q: 'Karstik arazilerde yer altı mağaralarının tavanlarının çökmesiyle oluşan derin kuyulara ne ad verilir?', a: 'Obruk', w: ['Dolin', 'Uvala', 'Polye', 'Düden'], e: 'Konya havzasında sıkça görülen obruklar, yeraltı boşluklarının çökmesiyle oluşur.' },
    { q: 'Buzul aşındırması sonucu oluşan aşağıdaki yer şekillerinden hangisi yanlış eşleştirilmiştir?', a: 'Menderes - Buzul', w: ['Sirk (Buzul yalağı) - Buzul', 'Moren - Buzul', 'Hörgüç kaya - Buzul', 'U şekilli vadi - Buzul'], e: 'Menderes (büklüm), eğimin azaldığı yerlerde akarsuların oluşturduğu bir şekildir, buzul değil.' },
    { q: 'Rüzgarların aşındırmasıyla oluşan, mantara benzeyen kaya şekillerine ne ad verilir?', a: 'Mantar kaya (Şahit kaya)', w: ['Tafoni', 'Barkan', 'Lös', 'Hamada'], e: 'Mantar kaya, kurak bölgelerde rüzgarın taşıdığı kumların kayaların alt kısımlarını aşındırmasıyla oluşur.' },
    { q: 'Kıyıya yakın bir adanın, dalgaların biriktirdiği kumlarla (kıyı oku) karaya bağlanması sonucu oluşan şekle ne ad verilir?', a: 'Tombolo (Saplı ada)', w: ['Lagün', 'Falez', 'Haliç', 'Delta'], e: 'Sinop Yarımadası ve Kapıdağ Yarımadası tomboloya (saplı ada) örnektir.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateIklim() {
  const q = pick([
    { q: 'Aşağıdaki iklim tiplerinden hangisinde yıllık sıcaklık farkı en azdır?', a: 'Ekvatoral iklim', w: ['Karasal iklim', 'Akdeniz iklimi', 'Sert karasal iklim', 'Muson iklimi'], e: 'Ekvatoral iklimde yıl boyunca güneş ışınları dik ve dike yakın geldiği için sıcaklık değişimi çok azdır.' },
    { q: 'Türkiye\'de aşağıdaki iklim tiplerinden hangisi görülmez?', a: 'Okyanusal iklim (Ilıman okyanusal)', w: ['Akdeniz iklimi', 'Karasal iklim', 'Karadeniz iklimi', 'Marmara (geçiş) iklimi'], e: 'Okyanusal iklim, Batı Avrupa gibi okyanus kıyılarında görülür. Karadeniz iklimi buna benzerlik gösterse de Türkiye\'de tam okyanusal iklim yoktur.' },
    { q: 'Yazları sıcak ve kurak, kışları soğuk ve kar yağışlı geçen; bitki örtüsü bozkır (step) olan iklim tipi hangisidir?', a: 'Ilıman Karasal iklim', w: ['Sert Karasal iklim', 'Akdeniz iklimi', 'Karadeniz iklimi', 'Tundra iklimi'], e: 'İç Anadolu bölgesinde görülen ılıman karasal (step) ikliminin temel özelliğidir.' },
    { q: 'Bir dağ yamacı boyunca yükselen nemli havanın soğuyarak yağış bırakmasına ne ad verilir?', a: 'Orografik (Yamaç) yağış', w: ['Konveksiyonel (Yükselim) yağış', 'Cephe (Frontal) yağış', 'Çisenti', 'Kırağı'], e: 'Orografik yağışlar dağların kıyıya paralel uzandığı yerlerde (Karadeniz, Toroslar) görülür.' },
    { q: 'Muson ikliminin temel oluşum nedeni aşağıdakilerden hangisidir?', a: 'Kara ve denizlerin yıl içinde farklı ısınıp soğuması', w: ['Okyanus akıntıları', 'Sürekli rüzgarların karşılaşması', 'Dağların uzanış doğrultusu', 'Ekvatora yakınlık'], e: 'Yaz ve kış musonları, devasa kara kütlesi (Asya) ile okyanusun farklı ısınma kapasitesi sonucu oluşur.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('cografya1', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

const templates = [
  templateTanzimat, templateServetFunun, templateFecriAtiMilli, templateCumhuriyetEdebiyat, templateYazarEser,
  templateOsmanliKultur, templateIslahat, templateSavas1,
  templateJeomorfoloji, templateDisKuvvetler, templateIklim
];

export function generate(count = 30) {
  return generateUnique(() => {
    const tpl = pick(templates);
    return tpl();
  }, count);
}
