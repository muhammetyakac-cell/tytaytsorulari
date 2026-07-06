import { randInt, pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

function r(a, b) { return randInt(a, b); }

// ─── 1. Sözcük Anlamı ────────────────────────────────────────────────────────

function templateEsAnlam() {
  const data = [
    { w: 'mücadele', a: 'uğraş', d: ['barış', 'uzlaşma', 'anlaşma', 'sulh'] },
    { w: 'yetenek', a: 'kabiliyet', d: ['beceriksizlik', 'yetersizlik', 'eksiklik', 'kusur'] },
    { w: 'görev', a: 'vazife', d: ['izin', 'tatil', 'boş', 'hak'] },
    { w: 'düşünce', a: 'fikir', d: ['eylem', 'hareket', 'boşluk', 'sessizlik'] },
    { w: 'özlem', a: 'hasret', d: ['nefret', 'bıkkınlık', 'ilgisizlik', 'soğukluk'] },
    { w: 'yapıt', a: 'eser', d: ['hammadde', 'malzeme', 'araç', 'gereç'] },
    { w: 'ülkü', a: 'ideal', d: ['gerçek', 'somut', 'maddi', 'görünür'] },
    { w: 'söylence', a: 'efsane', d: ['gerçek', 'tarih', 'belge', 'kanıt'] },
    { w: 'tanık', a: 'şahit', d: ['avukat', 'yargıç', 'savcı', 'katip'] },
    { w: 'onur', a: 'şeref', d: ['kibir', 'gurur', 'küstahlık', 'utanç'] },
    { w: 'hızlı', a: 'süratli', d: ['yavaş', 'ağır', 'sakin', 'durgun'] },
    { w: 'bilge', a: 'hakim', d: ['cahil', 'okumuş', 'çömez', 'acemi'] },
    { w: 'yoksul', a: 'fakir', d: ['varlıklı', 'zengin', 'gönenc', 'varsıl'] },
    { w: 'kıymet', a: 'değer', d: ['fiyat', 'bedel', 'ücret', 'maliyet'] },
    { w: 'başarı', a: 'muvaffakiyet', d: ['hüsran', 'hezimet', 'mağlubiyet', 'yenilgi'] },
    { w: 'kural', a: 'kaide', d: ['kanun', 'yasa', 'talimat', 'emir'] },
    { w: 'usul', a: 'yöntem', d: ['sonuç', 'amaç', 'kural', 'soru'] },
    { w: 'savaş', a: 'harp', d: ['barış', 'sulh', 'anlaşma', 'uzlaşı'] },
    { w: 'ölçüt', a: 'kriter', d: ['sonuç', 'hedef', 'amaç', 'süreç'] },
    { w: 'duyarlı', a: 'hassas', d: ['katı', 'sert', 'duygusuz', 'kaba'] },
    { w: 'kutlama', a: 'tebrik', d: ['azarlama', 'eleştiri', 'suçlama', 'yerme'] },
    { w: 'yapay', a: 'suni', d: ['doğal', 'organik', 'gerçek', 'hakiki'] },
    { w: 'yardım', a: 'muavenet', d: ['engel', 'mani', 'güçlük', 'zorluk'] },
    { w: 'özgür', a: 'hür', d: ['esir', 'tutsak', 'köle', 'bağımlı'] },
    { w: 'bilinç', a: 'şuur', d: ['bilgi', 'haber', 'görüş', 'duygu'] },
    { w: 'yürek', a: 'kalp', d: ['ciğer', 'bağırsak', 'mide', 'böbrek'] },
    { w: 'okur', a: 'kari', d: ['yazar', 'şair', 'dinleyici', 'izleyici'] },
    { w: 'soru', a: 'sual', d: ['yanıt', 'cevap', 'açıklama', 'çözüm'] },
    { w: 'birey', a: 'fert', d: ['toplum', 'cemaat', 'halk', 'kalabalık'] },
    { w: 'toplum', a: 'cemiyet', d: ['birey', 'kişi', 'şahıs', 'fert'] },
    { w: 'çağ', a: 'asır', d: ['ay', 'hafta', 'gün', 'dakika'] },
    { w: 'yıkım', a: 'felaket', d: ['afet', 'musibet', 'bela', 'sıkıntı'] },
    { w: 'gereksinim', a: 'ihtiyaç', d: ['fazlalık', 'bolluk', 'zenginlik', 'lüks'] },
    { w: 'uzman', a: 'mütehassıs', d: ['çömez', 'acemi', 'toy', 'stajyer'] },
    { w: 'ad', a: 'isim', d: ['fiil', 'sıfat', 'zamir', 'bağlaç'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.d]);
  return makeQuestion('sozcuk-anlami',
    `Aşağıdakilerden hangisi "${item.w}" sözcüğüyle eş anlamlıdır?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `"${item.w}" sözcüğünün eş anlamlısı "${item.a}"dir.`);
}

function templateZitAnlam() {
  const data = [
    { w: 'soğuk', a: 'sıcak', d: ['ılık', 'serin', 'buz gibi', 'dondurucu'] },
    { w: 'büyük', a: 'küçük', d: ['geniş', 'kocaman', 'dev', 'iri'] },
    { w: 'zor', a: 'kolay', d: ['çetin', 'güç', 'karmaşık', 'çetrefilli'] },
    { w: 'zengin', a: 'fakir', d: ['varlıklı', 'varsıl', 'gönenc', 'maddi'] },
    { w: 'dar', a: 'geniş', d: ['sıkışık', 'ensiz', 'küçük', 'cılız'] },
    { w: 'erken', a: 'geç', d: ['sabah', 'vaktinden önce', 'erken saat', 'demin'] },
    { w: 'gürültü', a: 'sessizlik', d: ['ses', 'yankı', 'gümbürtü', 'patırtı'] },
    { w: 'kalın', a: 'ince', d: ['tok', 'kaba', 'katı', 'yoğun'] },
    { w: 'iyi', a: 'kötü', d: ['güzel', 'mükemmel', 'harika', 'olumlu'] },
    { w: 'doğru', a: 'yanlış', d: ['gerçek', 'hakiki', 'düz', 'kural'] },
    { w: 'uzun', a: 'kısa', d: ['yüksek', 'derin', 'geniş', 'uzak'] },
    { w: 'taze', a: 'bayat', d: ['yeni', 'günlük', 'dinç', 'canlı'] },
    { w: 'karanlık', a: 'aydınlık', d: ['loş', 'kızıl', 'esmer', 'koyu'] },
    { w: 'güçlü', a: 'zayıf', d: ['kuvvetli', 'dirençli', 'sağlam', 'dayanıklı'] },
    { w: 'akıllı', a: 'aptal', d: ['zeki', 'bilge', 'kurnaz', 'çevik'] },
    { w: 'tembel', a: 'çalışkan', d: ['yavaş', 'üşengeç', 'savsak', 'kayıtsız'] },
    { w: 'tok', a: 'aç', d: ['şişman', 'dolu', 'halis', 'katı'] },
    { w: 'yaşlı', a: 'genç', d: ['ihtiyar', 'kocamış', 'piri fan', 'olgun'] },
    { w: 'derin', a: 'sığ', d: ['engin', 'koyu', 'çukur', 'dibek'] },
    { w: 'hızlı', a: 'yavaş', d: ['süratli', 'çabuk', 'tez', 'seri'] },
    { w: 'kirli', a: 'temiz', d: ['paslı', 'pis', 'lekeli', 'murdar'] },
    { w: 'tatlı', a: 'acı', d: ['şekerli', 'tuzlu', 'lezzetli', 'ekşi'] },
    { w: 'yumuşak', a: 'sert', d: ['esnek', 'hafif', 'narin', 'ince'] },
    { w: 'cömert', a: 'cimri', d: ['bonkör', 'eli açık', 'savurgan', 'yardımsever'] },
    { w: 'alçak', a: 'yüksek', d: ['küçük', 'kısa', 'çukur', 'hor'] },
    { w: 'şişman', a: 'zayıf', d: ['kalın', 'etli', 'tombul', 'iri'] },
    { w: 'eski', a: 'yeni', d: ['antika', 'kadim', 'tarihi', 'köhne'] },
    { w: 'kolay', a: 'zor', d: ['basit', 'rahat', 'hafif', 'sade'] },
    { w: 'parlak', a: 'mat', d: ['ışıklı', 'aydınlık', 'cıvıl cıvıl', 'ışıltılı'] },
    { w: 'kaba', a: 'nazik', d: ['sert', 'haşin', 'katı', 'tokat'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.d]);
  return makeQuestion('sozcuk-anlami',
    `Aşağıdakilerden hangisi "${item.w}" sözcüğünün zıt anlamlısıdır?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `"${item.w}" sözcüğünün zıt anlamlısı "${item.a}"dir.`);
}

function templateYakinAnlam() {
  const data = [
    { w: 'öykü', c: 'Yaşanmış veya yaşanabilir olayların kısa anlatımı.', a: 'hikaye', d: ['roman', 'masal', 'destan', 'şiir'] },
    { w: 'konut', c: 'İnsanların içinde yaşadıkları yapı.', a: 'mesken', d: ['işyeri', 'fabrika', 'ahır', 'depo'] },
    { w: 'önder', c: 'Bir topluluğu yönlendiren kimse.', a: 'lider', d: ['üye', 'yönetici', 'sekreter', 'çalışan'] },
    { w: 'yoksul', c: 'Maddi olanakları kısıtlı olan.', a: 'fakir', d: ['varlıklı', 'zengin', 'gönenc', 'varsıl'] },
    { w: 'bilgin', c: 'Bir bilim alanında derin bilgiye sahip kimse.', a: 'alim', d: ['öğrenci', 'çömez', 'acemi', 'stajyer'] },
    { w: 'armagan', c: 'Bir dostluk veya sevgi belirtisi olarak verilen şey.', a: 'hediye', d: ['satın alma', 'ödünç', 'borç', 'ticaret'] },
    { w: 'yargı', c: 'Bir olay veya durumla ilgili son düşünce.', a: 'hüküm', d: ['şüphe', 'olasılık', 'tahmin', 'endişe'] },
    { w: 'korku', c: 'Bir tehlike veya tehlike düşüncesi karşısında duyulan kaygı.', a: 'endişe', d: ['sevinç', 'heyecan', 'öfke', 'neşe'] },
    { w: 'beğeni', c: 'Bir şeyin güzel veya doğru olduğuna ilişkin duygu.', a: 'takdir', d: ['eleştiri', 'yerme', 'küçümseme', 'alay'] },
    { w: 'gizem', c: 'Akla hemen gelmeyen, açıklanamayan durum.', a: 'sır', d: ['gerçek', 'açıklık', 'belirlilik', 'kesinlik'] },
    { w: 'onur', c: 'Kişinin kendine duyduğu saygı.', a: 'haysiyet', d: ['utanç', 'küçüklük', 'alçaklık', 'rezillik'] },
    { w: 'sav', c: 'Bir düşünceyi kanıtlama amacı taşıyan iddia.', a: 'tez', d: ['antitez', 'sentez', 'sonuç', 'çözüm'] },
    { w: 'ulaşım', c: 'Bir yerden başka bir yere gitme işi.', a: 'nakliye', d: ['iletişim', 'haberleşme', 'yayın', 'duyuru'] },
    { w: 'özen', c: 'Bir işi titizlikle yapma durumu.', a: 'itina', d: ['ihmal', 'savsaklama', 'tembellik', 'dikkatsizlik'] },
    { w: 'tasarı', c: 'Henüz uygulamaya konmamış düşünce.', a: 'proje', d: ['sonuç', 'ürün', 'bitmişlik', 'tamamlama'] },
    { w: 'kanı', c: 'Bir konuda edinilen düşünce.', a: 'fikir', d: ['gerçek', 'kanıt', 'belge', 'olgu'] },
    { w: 'bencillik', c: 'Yalnız kendi çıkarını düşünme durumu.', a: 'egoizm', d: ['özveri', 'fedakarlık', 'yardımseverlik', 'cömertlik'] },
    { w: 'gelenek', c: 'Kuşaktan kuşağa aktarılan alışkanlık.', a: 'anane', d: ['yenilik', 'değişim', 'modernite', 'çağdaşlık'] },
    { w: 'tanım', c: 'Bir kavramın sınırlarını belirleyen açıklama.', a: 'tarif', d: ['örnek', 'benzerlik', 'kıyas', 'analoji'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.d]);
  return makeQuestion('sozcuk-anlami',
    `"${item.c}"\nBu tanıma uygun sözcüğün yakın anlamlısı aşağıdakilerden hangisidir?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `"${item.w}" sözcüğünün yakın anlamlısı "${item.a}"dir.`);
}

function templateDeyim() {
  const data = [
    { d: 'Göz atmak', a: 'kısa süreli bakmak', w: ['dikkatlice incelemek', 'uzun uzun bakmak', 'gözlerini kapatmak', 'şaşkınca bakmak'] },
    { d: 'Kulak asmamak', a: 'önemsememek', w: ['dikkatle dinlemek', 'kulaklarını tıkamak', 'sesi duymamak', 'müzik dinlemek'] },
    { d: 'Dil dökmek', a: 'ikna etmeye çalışmak', w: ['şarkı söylemek', 'kitap okumak', 'yemek yapmak', 'spor yapmak'] },
    { d: 'Etekleri zil çalmak', a: 'çok sevinmek', w: ['korkmak', 'üzülmek', 'endişelenmek', 'yorulmak'] },
    { d: 'İpe un sermek', a: 'bir işi yapmamak için bahane bulmak', w: ['çamaşır yıkamak', 'yemek pişirmek', 'alışveriş yapmak', 'temizlik yapmak'] },
    { d: 'Göz boyamak', a: 'yanıltmak', w: ['makyaj yapmak', 'resim çizmek', 'gözlük takmak', 'renklendirmek'] },
    { d: 'Ateş püskürmek', a: 'çok öfkelenmek', w: ['yangın söndürmek', 'yemek pişirmek', 'ısınmak', 'ışık saçmak'] },
    { d: 'Dünyadan haberi olmamak', a: 'çevresinde olup biteni fark etmemek', w: ['seyahat etmemek', 'kitap okumamak', 'televizyon izlememek', 'ders çalışmamak'] },
    { d: 'Kafa yormak', a: 'bir konu üzerinde çok düşünmek', w: ['spor yapmak', 'uyumak', 'yemek yemek', 'dinlenmek'] },
    { d: 'Burnunda tütmek', a: 'çok özlemek', w: ['sigara içmek', 'ateş yakmak', 'yemek koklamak', 'nefes almak'] },
    { d: 'Can kulağıyla dinlemek', a: 'çok dikkatli dinlemek', w: ['müzik dinlemek', 'ders çalışmak', 'uyumak', 'konuşmak'] },
    { d: 'Eli ayağına dolaşmak', a: 'telaşlanmak', w: ['spor yapmak', 'koşmak', 'yürümek', 'dans etmek'] },
    { d: 'Gözden düşmek', a: 'itibarını kaybetmek', w: ['düşüp yaralanmak', 'görme yetisini kaybetmek', 'aşağıya düşmek', 'saklanmak'] },
    { d: 'İğne ipliğe dönmek', a: 'çok zayıflamak', w: ['dikiş dikmek', 'elbise tamir etmek', 'terzilik yapmak', 'moda tasarlamak'] },
    { d: 'Kulak kabartmak', a: 'gizlice dinlemek', w: ['müzik açmak', 'bağırmak', 'şarkı söylemek', 'alkışlamak'] },
    { d: 'Pabucu dama atılmak', a: 'görevden alınmak', w: ['ayakkabı tamir etmek', 'eve çıkmak', 'alışveriş yapmak', 'temizlik yapmak'] },
    { d: 'Süt dökmüş kediye dönmek', a: 'suçluluk duygusuyla mahcup olmak', w: ['kedi beslemek', 'süt içmek', 'hayvan sevmek', 'temizlik yapmak'] },
    { d: 'Tepesi atmak', a: 'çok sinirlenmek', w: ['bayılmak', 'düşmek', 'zıplamak', 'koşmak'] },
    { d: 'Yaka silkmek', a: 'bıkmak usanmak', w: ['elbise temizlemek', 'terlemek', 'dans etmek', 'yüzmek'] },
    { d: 'Zil takıp oynamak', a: 'çok sevinmek', w: ['müzik aleti çalmak', 'şarkı söylemek', 'tiyatro yapmak', 'davul çalmak'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('sozcuk-anlami',
    `Aşağıdakilerden hangisi "${item.d}" deyiminin anlamıdır?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `"${item.d}" deyimi "${item.a}" anlamına gelir.`);
}

// ─── 2. Cümle Anlamı ─────────────────────────────────────────────────────────

function templateCumleYorumu() {
  const data = [
    { c: 'Sanat, toplumun aynasıdır; toplumda ne varsa sanatta onu görürüz.', a: 'Sanat, toplumsal gerçeklikten beslenir.', w: ['Sanat toplumdan bağımsızdır.', 'Sanatçı toplumu yönlendirir.', 'Her sanat eseri toplumu yansıtmaz.', 'Sanat ve toplum arasında çatışma vardır.'] },
    { c: 'Okumak, insanın ufkunu genişleten en etkili yoldur.', a: 'Okuma alışkanlığı bireye geniş bir perspektif kazandırır.', w: ['Okumak zaman kaybıdır.', 'Sadece kitaplar insanı geliştirir.', 'Okuma alışkanlığı doğuştandır.', 'En iyi öğrenme yöntemi dinlemektir.'] },
    { c: 'Bilgi güçtür ancak paylaşıldıkça değer kazanır.', a: 'Bilginin asıl değeri onun paylaşılmasıyla ortaya çıkar.', w: ['Bilgi paylaşılmamalıdır.', 'Güç bilgiden önce gelir.', 'Bilgi tek başına değersizdir.', 'Paylaşılan bilgi azalır.'] },
    { c: 'Dil, bir milletin kültürünü taşıyan en önemli araçtır.', a: 'Kültürel mirasın aktarılmasında dilin önemi büyüktür.', w: ['Dil sadece iletişim aracıdır.', 'Kültür dilden daha önemlidir.', 'Her milletin dili aynıdır.', 'Dil zamanla değişmez.'] },
    { c: 'Başarı, tesadüflere değil, planlı ve disiplinli çalışmaya bağlıdır.', a: 'Başarılı olmak için düzenli çalışma programı izlenmelidir.', w: ['Başarı tamamen şansa bağlıdır.', 'Başarı için çalışmak gerekmez.', 'Disiplin başarıyı olumsuz etkiler.', 'Başarılı insanlar plan yapmaz.'] },
    { c: 'İnsan, ancak sevdiği işi yaparsa mutlu olur.', a: 'Mutluluk, kişinin ilgi alanlarına uygun bir iş yapmasıyla mümkündür.', w: ['Her iş insanı mutlu eder.', 'Sevmediğin işte de başarılı olabilirsin.', 'Mutluluk parayla satın alınır.', 'İş seçiminde para en önemli faktördür.'] },
    { c: 'Bilim, sürekli sorgulamayı ve merak etmeyi gerektirir.', a: 'Bilimsel düşüncenin temelinde merak ve eleştirel bakış vardır.', w: ['Bilim kesin bilgilerden oluşur.', 'Sorgulamak bilime zarar verir.', 'Bilim insanları her şeyi bilir.', 'Bilimsel bilgiler değişmez.'] },
    { c: 'Tarihini bilmeyen bir millet, geleceğini de inşa edemez.', a: 'Geçmişini tanıyan toplumlar sağlıklı bir gelecek kurabilir.', w: ['Tarih geçmişte kalmıştır.', 'Gelecek tarihten bağımsızdır.', 'Tarih bilmek yeterli değildir.', 'Tarih sadece geçmiş olayları inceler.'] },
    { c: 'Dostluk, menfaat üzerine kurulursa çabuk biter.', a: 'Çıkar ilişkilerine dayanan dostluklar uzun ömürlü olmaz.', w: ['Dostlukta menfaat önemlidir.', 'Dostluklar sonsuza dek sürer.', 'Menfaat dostluğu güçlendirir.', 'Her dostluk çıkar üzerine kurulur.'] },
    { c: 'Söz gümüşse sükut altındır.', a: 'Bazen konuşmaktansa susmak daha değerlidir.', w: ['Gümüş altından değerlidir.', 'Her zaman konuşmak gerekir.', 'Susmak zayıflık göstergesidir.', 'Söz söylemenin bir değeri yoktur.'] },
    { c: 'Ne ekersen onu biçersin.', a: 'Kişi yaptığı davranışların sonuçlarına katlanır.', w: ['Tarım yapmak önemlidir.', 'Herkes aynı sonucu alır.', 'Çalışmak her zaman kazandırır.', 'Doğa insana hükmeder.'] },
    { c: 'Damlaya damlaya göl olur.', a: 'Küçük birikimler zamanla büyük değere ulaşır.', w: ['Su birikintileri göl oluşturur.', 'Yağmur yağdıkça göller oluşur.', 'Küçük şeyler önemsizdir.', 'Birikim yapmak zaman kaybıdır.'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('cumle-anlami',
    `"${item.c}"\nBu cümleden aşağıdakilerden hangisi çıkarılabilir?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `Cümlede vurgulanan: "${item.a}"`);
}

function templateCumleTamamlama() {
  const data = [
    { s: 'Sanatçı, eserlerinde toplumun sorunlarına duyarsız kalamaz, çünkü o...', a: 'toplumun bir parçasıdır ve ondan etkilenir.', w: ['yalnızca kendi duygularını anlatmalıdır.', 'parayla çalışmaktadır.', 'herkesten üstün bir varlıktır.', 'sadece doğayı betimlemelidir.'] },
    { s: 'Kitap okumak insanın hayal dünyasını geliştirir, ayrıca...', a: 'kelime dağarcığını da zenginleştirir.', w: ['insanı yalnızlaştırır.', 'zaman kaybettirir.', 'göz sağlığını bozar.', 'pahalı bir hobidir.'] },
    { s: 'Teknolojinin hızla gelişmesiyle birlikte iletişim araçları da değişti, öyle ki...', a: 'insanlar artık anında haberleşebiliyor.', w: ['insanlar mektup yazmayı bıraktı.', 'teknoloji pahalılaştı.', 'herkes bilgisayar kullanıyor.', 'telefonlar bozuldu.'] },
    { s: 'Eğitim sistemimiz ezberci anlayıştan uzaklaşmalı, bunun yerine...', a: 'öğrencilere eleştirel düşünme becerisi kazandırılmalıdır.', w: ['ezber daha da artırılmalıdır.', 'sınavlar kaldırılmalıdır.', 'öğrenciler serbest bırakılmalıdır.', 'okullar kapatılmalıdır.'] },
    { s: 'Doğa, insanın sınırsız tüketimine karşı giderek daha fazla tepki göstermekte, bu durum...', a: 'ekolojik dengenin bozulmasına yol açmaktadır.', w: ['ekonomiyi canlandırmaktadır.', 'teknolojiyi geliştirmektedir.', 'nüfusu artırmaktadır.', 'şehirleşmeyi hızlandırmaktadır.'] },
    { s: 'Bir toplumun gelişmişlik düzeyi, kadınlara verdiği değerle ölçülür, çünkü...', a: 'kadınlar toplumun yarısını oluşturur ve her alanda yer almalıdır.', w: ['kadınlar erkeklerden daha başarılıdır.', 'kadınlar sadece ev işi yapmalıdır.', 'kadınlar siyasette yer almamalıdır.', 'kadınlar eğitim hakkına sahip değildir.'] },
    { s: 'Sosyal medya, doğru kullanıldığında faydalı bir araçtır; ancak...', a: 'aşırı kullanımı bağımlılık yapabilir ve zaman kaybına yol açar.', w: ['herkes sosyal medya kullanmalıdır.', 'sosyal medya tamamen zararsızdır.', 'sosyal medya yasaklanmalıdır.', 'sosyal medyada her bilgi doğrudur.'] },
    { s: 'İyi bir lider, emir vermekle kalmaz, aynı zamanda...', a: 'ekibine ilham verir ve onları motive eder.', w: ['her işi kendisi yapar.', 'astlarını sürekli eleştirir.', 'kararları tek başına alır.', 'çalışanları görmezden gelir.'] },
    { s: 'Geçmişini unutan milletler, gelecekte...', a: 'aynı hataları tekrarlama riski taşır.', w: ['daha güçlü olur.', 'tarih dersine ihtiyaç duymaz.', 'çağdaş medeniyete ulaşır.', 'bağımsızlıklarını kazanır.'] },
    { s: 'Bir ülkenin kalkınması, nitelikli insan gücüne bağlıdır; bu da...', a: 'kaliteli eğitimle mümkün olur.', w: ['doğal kaynaklarla sağlanır.', 'askeri güçle elde edilir.', 'dış yardımla gerçekleşir.', 'ticaret hacmiyle ölçülür.'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('cumle-anlami',
    `"${item.s}"\nBu cümle aşağıdakilerden hangisiyle en uygun şekilde tamamlanır?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `Anlam bütünlüğü: "${item.a}"`);
}

function templateCumleIliskisi() {
  const data = [
    { c1: 'Son zamanlarda kitap okuma oranı azalıyor.', c2: 'Buna karşılık sosyal medyada geçirilen süre artıyor.', a: 'Tezat', w: ['Neden-sonuç', 'Amaç-sonuç', 'Benzerlik', 'Koşul'] },
    { c1: 'Düzenli egzersiz yapmak sağlığımızı korur.', c2: 'Bu nedenle her gün yürüyüş yapmalıyız.', a: 'Neden-sonuç', w: ['Amaç-sonuç', 'Tezat', 'Benzerlik', 'Koşul'] },
    { c1: 'Yağmur yağınca her yer ıslandı.', c2: 'Bu yüzden maç ertelendi.', a: 'Neden-sonuç', w: ['Amaç-sonuç', 'Tezat', 'Benzerlik', 'Örneklendirme'] },
    { c1: 'Sınavı kazanmak istiyorsan çalışmalısın.', c2: 'Ancak bunun için yeterli zamanın yok.', a: 'Tezat', w: ['Neden-sonuç', 'Amaç-sonuç', 'Benzerlik', 'Örneklendirme'] },
    { c1: 'Sana yardım edebilirim.', c2: 'Yeter ki sen de çalışmaya istekli ol.', a: 'Koşul', w: ['Tezat', 'Neden-sonuç', 'Amaç-sonuç', 'Benzerlik'] },
    { c1: 'Daha iyi notlar almak istiyorum.', c2: 'Bu yüzden her gün düzenli çalışıyorum.', a: 'Amaç-sonuç', w: ['Neden-sonuç', 'Tezat', 'Koşul', 'Benzerlik'] },
    { c1: 'Kardeşi çok çalışkandır.', c2: 'O ise oldukça tembel bir çocuktur.', a: 'Tezat', w: ['Benzerlik', 'Neden-sonuç', 'Koşul', 'Amaç-sonuç'] },
    { c1: 'Hava soğudu.', c2: 'Bu yüzden kalın giysiler giymeliyiz.', a: 'Neden-sonuç', w: ['Tezat', 'Amaç-sonuç', 'Koşul', 'Örneklendirme'] },
    { c1: 'Sana güveniyorum.', c2: 'Çünkü sen hiç yalan söylemedin.', a: 'Neden-sonuç', w: ['Tezat', 'Koşul', 'Amaç-sonuç', 'Benzerlik'] },
    { c1: 'Ödevlerini bitirirsen dışarı çıkabilirsin.', c2: 'Aksi takdirde evde kalacaksın.', a: 'Koşul', w: ['Tezat', 'Neden-sonuç', 'Benzerlik', 'Amaç-sonuç'] },
    { c1: 'Bir dil öğrenmek istiyorum.', c2: 'Bunun için kursa yazıldım.', a: 'Amaç-sonuç', w: ['Tezat', 'Neden-sonuç', 'Koşul', 'Örneklendirme'] },
    { c1: 'Aşırı yağışlar nedeniyle tarlalar sular altında kaldı.', c2: 'Dolayısıyla bu yıl rekolte düşük olacak.', a: 'Neden-sonuç', w: ['Tezat', 'Koşul', 'Amaç-sonuç', 'Benzerlik'] },
    { c1: 'Çocuklar parkta oynuyor.', c2: 'Yetişkinler ise banklarda oturup sohbet ediyor.', a: 'Benzerlik', w: ['Tezat', 'Neden-sonuç', 'Koşul', 'Amaç-sonuç'] },
    { c1: 'Yağmur dinince yürüyüşe çıktık.', c2: 'Böylece hem temiz hava aldık hem de egzersiz yaptık.', a: 'Amaç-sonuç', w: ['Neden-sonuç', 'Koşul', 'Tezat', 'Örneklendirme'] },
    { c1: 'Deneme sınavına hazırlanmalısın.', c2: 'Çünkü bu sınav seviyeni belirleyecek.', a: 'Neden-sonuç', w: ['Koşul', 'Tezat', 'Amaç-sonuç', 'Benzerlik'] },
    { c1: 'Sürekli kitap okuyan insanların kelime hazinesi geniş olur.', c2: 'Aynı şekilde düzenli yazı yazanlar da dili iyi kullanır.', a: 'Benzerlik', w: ['Tezat', 'Neden-sonuç', 'Koşul', 'Amaç-sonuç'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('cumle-anlami',
    `I. ${item.c1}\nII. ${item.c2}\nBu iki cümle arasındaki anlam ilişkisi aşağıdakilerden hangisidir?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `Anlam ilişkisi: ${item.a}.`);
}

// ─── 3. Paragraf ─────────────────────────────────────────────────────────────

function templateParagrafKonu() {
  const data = [
    { p: 'Günümüzde teknoloji, hayatımızın her alanına girmiş durumdadır.\nÖzellikle akıllı telefonlar hayatımızı kolaylaştırırken bir yandan da bağımlılık yaratmaktadır.\nİnsanlar sürekli telefonlarıyla meşgul olmakta, yüz yüze iletişim giderek azalmaktadır.', a: 'Teknolojinin insan hayatındaki yeri', w: ['Telefonların tarihsel gelişimi', 'Bağımlılık türleri', 'Yüz yüze iletişimin önemi', 'Teknoloji şirketlerinin politikaları'] },
    { p: 'Okuma alışkanlığı, küçük yaşlarda ailede başlar.\nÇocuklarına kitap okuyan ebeveynlerin çocukları okumaya daha yatkın olur.\nOkulda bu alışkanlık pekiştirilmezse çocuklar kitaptan uzaklaşır.', a: 'Okuma alışkanlığının gelişiminde ailenin rolü', w: ['Eğitim sisteminin sorunları', 'Çocuk kitaplarının içeriği', 'Kütüphanelerin önemi', 'Yazarların sorumlulukları'] },
    { p: 'Şehir hayatının yoğun temposu insanları doğadan uzaklaştırmaktadır.\nBeton yığınları arasında sıkışan insanlar, hafta sonlarında doğal alanlara kaçış aramaktadır.\nBu durum, doğa turizminin popüler hale gelmesine yol açmaktadır.', a: 'Şehir hayatından doğaya yöneliş', w: ['Turizm çeşitleri', 'Doğanın korunması', 'Şehir planlaması', 'Hafta sonu aktiviteleri'] },
    { p: 'Sosyal medya, bireylerin kendini ifade etme biçimini değiştirmiştir.\nİnsanlar duygu ve düşüncelerini anlık paylaşımlarla ifade etmekte, beğenilme kaygısıyla hareket etmektedir.\nBu durum gençler arasında kimlik bunalımına yol açabilmektedir.', a: 'Sosyal medyanın birey üzerindeki etkileri', w: ['Gençlik sorunları', 'İletişim araçlarının tarihi', 'Sosyal medya platformları', 'Dijital pazarlama'] },
    { p: 'Küresel ısınma, dünyanın karşı karşıya olduğu en büyük çevre sorunlarından biridir.\nSanayi devriminden bu yana atmosferdeki karbondioksit oranı sürekli artmaktadır.\nBu durum buzulların erimesine ve deniz seviyesinin yükselmesine neden olmaktadır.', a: 'Küresel ısınmanın etkileri', w: ['Sanayi devriminin sonuçları', 'Deniz seviyesindeki değişimler', 'Enerji kaynaklarının tükenmesi', 'Hava kirliliğinin nedenleri'] },
    { p: 'Müzik, insanlık tarihi boyunca kültürlerin ayrılmaz bir parçası olmuştur.\nHer toplumun kendine özgü müzik aletleri ve ritimleri vardır.\nGünümüzde müzik, teknoloji sayesinde sınırları aşarak evrensel bir dil haline gelmiştir.', a: 'Müziğin kültürlerarası rolü', w: ['Müzik aletlerinin tarihi', 'Teknoloji ve müzik ilişkisi', 'Müzik türlerinin sınıflandırılması', 'Sanatçıların toplumsal rolü'] },
    { p: 'Düzenli fiziksel aktivite, sağlıklı bir yaşamın temel taşlarından biridir.\nSpor yapmak kalp-damar sağlığını korur, kilo kontrolüne yardımcı olur ve stresi azaltır.\nUzmanlar haftada en az üç gün egzersiz yapılmasını önermektedir.', a: 'Sporun sağlık üzerindeki faydaları', w: ['Egzersiz çeşitleri', 'Beslenme ve diyet', 'Stres yönetimi teknikleri', 'Kalp hastalıklarının tedavisi'] },
    { p: 'Sinema, 20. yüzyılın başlarından itibaren kitleleri etkileyen güçlü bir sanat dalı haline gelmiştir.\nİlk filmler sessiz ve siyah-beyazken günümüzde görsel efektlerle zenginleştirilmiş yapımlar izleyiciye sunulmaktadır.\nSinema endüstrisi milyarlarca dolarlık bir ekonomi oluşturmuştur.', a: 'Sinemanın tarihsel gelişimi', w: ['Film yapım teknikleri', 'Sinema sektörünün ekonomisi', 'Yönetmenlerin sanat anlayışı', 'İzleyici kitlesinin değişimi'] },
    { p: 'Edebiyat, insanın duygu ve düşüncelerini ifade etmesinin en eski yollarından biridir.\nŞiirden romana, hikayeden denemeye pek çok türü kapsar.\nHer edebi eser, yazıldığı dönemin izlerini taşır ve okuyucuya farklı pencereler açar.', a: 'Edebiyatın insan hayatındaki yeri', w: ['Roman türlerinin gelişimi', 'Şiir akımları', 'Yazarların yaşam öyküleri', 'Edebiyatın diğer sanatlarla ilişkisi'] },
    { p: 'Göç, insanlık tarihi kadar eski bir olgudur.\nİnsanlar daha iyi yaşam koşulları, savaşlardan kaçış veya ekonomik nedenlerle göç etmektedir.\nGünümüzde küreselleşmeyle birlikte göç hareketleri daha da karmaşık hale gelmiştir.', a: 'Göç olgusunun nedenleri ve sonuçları', w: ['Küreselleşmenin etkileri', 'Mülteci sorunları', 'Ekonomik krizler', 'Nüfus politikaları'] },
    { p: 'Yapay zeka teknolojileri son yıllarda büyük bir hızla gelişmektedir.\nSağlık, eğitim, ulaşım ve üretim gibi pek çok alanda kullanılmaktadır.\nAncak yapay zekanın etik boyutları ve işsizlik yaratma potansiyeli tartışma konusudur.', a: 'Yapay zekanın fırsatları ve riskleri', w: ['Etik kurallar ve teknoloji', 'Sağlık sektöründe yapay zeka', 'İşsizlik sorununun çözümü', 'Teknoloji bağımlılığı'] },
    { p: 'Kitaplar, geçmişten günümüze bilginin en güvenilir taşıyıcıları olmuştur.\nDijital çağda bile basılı kitaplar önemini korumaktadır.\nBir kitabın sayfalarını çevirmenin verdiği his, dijital ekranlarda henüz tam olarak yakalanamamıştır.', a: 'Basılı kitapların dijital çağdaki önemi', w: ['Dijital yayıncılığın avantajları', 'Okuma alışkanlıklarının değişimi', 'Kütüphanelerin geleceği', 'E-kitap teknolojileri'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('paragraf',
    `${item.p}\nBu parçanın konusu aşağıdakilerden hangisidir?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `Parçanın konusu: ${item.a}`);
}

function templateParagrafAnaDusunce() {
  const data = [
    { p: 'Kitaplar, geçmişle gelecek arasında bir köprüdür.\nBinlerce yıllık bilgi ve deneyim, kitaplar sayesinde günümüze ulaşmıştır.\nAncak günümüzde insanlar kitaplardan uzaklaşmakta, dijital içeriklere yönelmektedir.', a: 'Kitaplar, kültürel mirasın aktarımında vazgeçilmez bir araçtır.', w: ['Dijital içerikler kitaplardan daha faydalıdır.', 'Kitap okumak zaman kaybıdır.', 'Kitaplar yalnızca eğlence amaçlıdır.', 'Tüm bilgiler dijital ortama aktarılmalıdır.'] },
    { p: 'Başarıya ulaşmanın tek bir yolu yoktur.\nKimi çalışarak, kimi şansla, kimi de çevresinin desteğiyle başarılı olur.\nÖnemli olan herkesin kendi yolunu bulması ve azimle ilerlemesidir.', a: 'Başarı kişiden kişiye değişen farklı yollarla elde edilebilir.', w: ['Başarı yalnızca çalışarak kazanılır.', 'Şans başarının en önemli unsurudur.', 'Çevre desteği olmadan başarı mümkün değildir.', 'Azim tek başına yeterlidir.'] },
    { p: 'Dil, canlı bir varlıktır; doğar, büyür, gelişir ve değişir.\nKelimeler zamanla anlam genişlemesine uğrar, yenileri türetilir, bazıları unutulur.\nBir dili canlı tutmak için onu yaşatmak, kullanmak ve geliştirmek gerekir.', a: 'Dilin canlılığı, sürekli kullanılmasına ve geliştirilmesine bağlıdır.', w: ['Dil değişmez bir yapıdır.', 'Eski kelimeler tamamen yok olur.', 'Dil sadece yazılı olarak varlığını sürdürür.', 'Her dil aynı hızla değişir.'] },
    { p: 'Sanat, insan ruhunun derinliklerine inen bir yolculuktur.\nBir resim, bir şiir ya da bir müzik parçası, insanın iç dünyasında kapılar açar.\nBu nedenle sanatla ilgilenen insanlar daha duyarlı ve yaratıcı olur.', a: 'Sanat, insanın duygusal ve zihinsel gelişimine katkı sağlar.', w: ['Sanat yalnızca eğlence amaçlıdır.', 'Her insan sanatçı olabilir.', 'Sanatın eğitimle ilgisi yoktur.', 'Sanat maddi kazanç için yapılır.'] },
    { p: 'Zaman, en değerli kaynağımızdır çünkü geri dönüşü yoktur.\nParayı kaybettiğimizde yeniden kazanabiliriz ama zamanı asla.\nBu nedenle zamanımızı en iyi şekilde değerlendirmek hayatımızdaki en önemli sorumluluktur.', a: 'Zamanı verimli kullanmak hayatımızda büyük önem taşır.', w: ['Para zaman kadar değerlidir.', 'Zamanı harcamakta özgürüz.', 'Zaman sınırsız bir kaynaktır.', 'Zamanın değeri parayla ölçülür.'] },
    { p: 'Bilgiye ulaşmak hiç bu kadar kolay olmamıştı.\nAncak doğru bilgiye ulaşmak her zamankinden daha zor hale geldi.\nÇünkü internette doğru ve yanlış bilgiler iç içe geçmiş durumdadır.', a: 'Bilgi kirliliği, doğru bilgiye erişimi zorlaştırmaktadır.', w: ['İnternet her bilgiyi doğru olarak sunar.', 'Bilgiye ulaşmak her zaman kolaydır.', 'Yanlış bilgiler zamanla kaybolur.', 'Herkes bilgiyi doğru şekilde kullanır.'] },
    { p: 'Sadece kendini düşünen, başkalarının ihtiyaçlarına duyarsız kalan insanlar yalnızlaşır.\nOysa insan, paylaştıkça çoğalan bir varlıktır.\nMutluluğun sırrı, başkalarına dokunabilmekte ve onlarla birlikte var olabilmektedir.', a: 'İnsan, başkalarıyla etkileşim içinde anlam kazanan bir varlıktır.', w: ['İnsanlar yalnız yaşamak için yaratılmıştır.', 'Mutluluk maddi şeylerle elde edilir.', 'Başkalarını düşünmek insanı yorar.', 'Paylaşmak insanı zayıflatır.'] },
    { p: 'Eğitim, sadece okulda öğrenilen bilgilerden ibaret değildir.\nHayat boyu devam eden bir süreçtir ve her yeni deneyim bir öğrenme fırsatıdır.\nÖnemli olan öğrenmeye açık olmak ve merak duygusunu canlı tutmaktır.', a: 'Eğitim, yaşam boyu süren ve sürekli öğrenmeyi gerektiren bir süreçtir.', w: ['Eğitim yalnızca okulda verilir.', 'Merak duygusu zamanla kaybolur.', 'Deneyimler bilgi kadar değerli değildir.', 'Öğrenme yaşla birlikte zorlaşır.'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('paragraf',
    `${item.p}\nBu parçada asıl anlatılmak istenen aşağıdakilerden hangisidir?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `Ana düşünce: "${item.a}"`);
}

function templateParagrafYardimciDusunce() {
  const data = [
    { p: 'Edebiyat, toplumun nabzını tutar.\nİyi bir yazar, yaşadığı dönemin sosyal ve kültürel olaylarına duyarsız kalamaz.\nEserlerinde bu olayları işler, okuyucuya bir ayna tutar.', not: 'değinilmemiştir', a: 'Yazarlar eserlerinde sadece kendi hayatlarını anlatır.', w: ['Edebiyat toplumsal olaylardan etkilenir.', 'İyi bir yazar döneminin tanığıdır.', 'Edebiyat eserleri topluma ayna tutar.', 'Yazarlar sosyal olaylara ilgisiz kalamaz.'] },
    { p: 'Geleneksel Türk tiyatrosu; Karagöz, orta oyunu ve meddah gibi türlerden oluşur.\nBu türlerde güldürü ön plandadır ve toplumsal eleştiri yapılır.\nHalkın anlayacağı bir dil kullanılır.', not: 'değinilmemiştir', a: 'Geleneksel tiyatroda dekor kullanımı', w: ['Geleneksel tiyatro türleri', 'Güldürü ögesi', 'Toplumsal eleştiri', 'Halkın anlayacağı dil'] },
    { p: 'Tarihi romanlar, geçmişteki olayları kurgusal bir dille anlatır.\nYazar, tarihsel gerçekleri araştırır ve hayal gücüyle birleştirir.\nBöylece okuyucu hem tarih öğrenir hem keyifli vakit geçirir.', not: 'söylenemez', a: 'Tarihi romanlar tamamen gerçek olaylardan oluşur.', w: ['Tarihi romanlar kurgu içerir.', 'Yazar tarihsel araştırma yapar.', 'Tarihi romanlar eğitici ve eğlendiricidir.', 'Tarihi romanda hayal gücü kullanılır.'] },
    { p: 'Çay, Türk kültüründe önemli bir yere sahiptir.\nGünün her saati içilebilen çay, misafir ağırlamanın vazgeçilmezidir.\nKaradeniz Bölgesi, Türkiye\'nin çay üretim merkezidir.', not: 'değinilmemiştir', a: 'Çayın sağlık üzerindeki etkileri', w: ['Çayın Türk kültüründeki yeri', 'Çayın içilme zamanları', 'Çayın misafirperverlikle ilişkisi', 'Çay üretim bölgeleri'] },
    { p: 'Uzay araştırmaları, insanlığın merak duygusunun en somut örneğidir.\nAy\'a ayak basmaktan Mars\'a keşif araçları göndermeye kadar pek çok başarı elde edilmiştir.\nBu araştırmalar aynı zamanda teknolojik gelişmeleri de beraberinde getirmiştir.', not: 'değinilmemiştir', a: 'Uzay turizminin maliyeti', w: ['Uzay araştırmalarının tarihi', 'Ay yolculuğu başarısı', 'Mars keşif çalışmaları', 'Teknolojiye katkıları'] },
    { p: 'Nesli tükenmekte olan canlıların korunması için çeşitli projeler yürütülmektedir.\nBu kapsamda milli parklar ve doğal koruma alanları oluşturulmaktadır.\nAyrıca üreme programlarıyla popülasyonların artırılması hedeflenmektedir.', not: 'söylenemez', a: 'Nesli tükenen türlerin tamamı kurtarılmıştır.', w: ['Koruma projeleri yürütülmektedir.', 'Milli parklar oluşturulmaktadır.', 'Doğal koruma alanları vardır.', 'Üreme programları uygulanmaktadır.'] },
    { p: 'Trafik kazalarının en önemli nedenlerinden biri dikkatsizlik ve hız sınırına uymamaktır.\nAlkol kullanımı da kazalarda büyük rol oynamaktadır.\nYetkililer, denetimleri artırarak kazaları azaltmayı hedeflemektedir.', not: 'değinilmemiştir', a: 'Trafik kazalarının ekonomik boyutu', w: ['Dikkatsizlik kaza nedeni', 'Hız sınırı ihlalleri', 'Alkolün kazalardaki rolü', 'Denetimlerin artırılması'] },
    { p: 'Dünya üzerinde milyarlarca insan yeterli beslenememektedir.\nOysa üretilen gıda miktarı tüm dünya nüfusuna yetecek düzeydedir.\nSorun, gıdaların adil dağıtılamamasından kaynaklanmaktadır.', not: 'söylenemez', a: 'Gıda üretimi yetersizdir.', w: ['Beslenme sorunu devam etmektedir.', 'Üretilen gıda yeterlidir.', 'Dağıtımda adaletsizlik vardır.', 'Açlık küresel bir sorundur.'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('paragraf',
    `${item.p}\nBu parçada aşağıdakilerden hangisine ${item.not}?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `Parçada ${item.not}: "${item.a}"`);
}

function templateParagrafTamamlama() {
  const data = [
    { p: 'Kitap okuma alışkanlığı küçük yaşlarda kazanılır. Çocuklarına kitap okuyan ailelerin çocukları okumayı yaşam biçimi haline getirir. Oysa günümüzde ebeveynler çocuklarına kitap yerine tablet vermeyi tercih etmektedir. Bu durum...', a: 'çocukların okuma alışkanlığı kazanmasını zorlaştırmaktadır.', w: ['çocukların daha zeki olmasını sağlamaktadır.', 'aile içi iletişimi güçlendirmektedir.', 'eğitim sistemini olumlu etkilemektedir.', 'çocukların sosyalleşmesine katkıda bulunmaktadır.'] },
    { p: 'İnsanoğlu yüzyıllardır gökyüzünü merak etmiş, yıldızları incelemiştir. İlk çağlardan beri gök cisimlerinin hareketlerini gözlemleyen insanlar takvimler oluşturmuştur. Günümüzde uzay araştırmaları çok ilerlemiştir. Ancak hala...', a: 'evrenin sırlarını tam olarak çözebilmiş değiliz.', w: ['herkes uzaya yolculuk yapabilmektedir.', 'dünyanın uzayla ilişkisi kalmamıştır.', 'gökyüzü gözlemciliği tamamen bitmiştir.', 'teleskoplar kullanılmamaktadır.'] },
    { p: 'Bir yazarın en önemli özelliği, okuyucuyla duygusal bağ kurabilmesidir. Bunun için samimi bir dil kullanması gerekir. Okuyucu bu samimiyeti hissettiğinde yazarın dünyasına girer. Aksi takdirde...', a: 'yazılanlar kuru ve etkisiz kalır.', w: ['kitap daha çok satar.', 'yazar daha popüler olur.', 'dil daha süslü olur.', 'eser daha değerli olur.'] },
    { p: 'Müzik, insan ruhunun en derin duygularına hitap eden bir sanattır. Her kültürün kendine özgü müzik anlayışı vardır. Bu müzikler o kültürün tarihini, acılarını ve sevinçlerini yansıtır. Bu yönüyle müzik...', a: 'kültürlerin hafızası niteliği taşır.', w: ['sadece eğlence amaçlıdır.', 'her toplumda aynıdır.', 'modern dünyada önemini kaybetmiştir.', 'en eski sanat dalıdır.'] },
    { p: 'Bilim insanları, iklim değişikliğiyle mücadele için yenilenebilir enerji kaynaklarına yönelinmesi gerektiğini vurgulamaktadır. Güneş ve rüzgar enerjisi fosil yakıtlara alternatif olarak öne çıkmaktadır. Ancak bu kaynakların yaygınlaşması için...', a: 'teknolojik altyapının geliştirilmesi ve maliyetlerin düşürülmesi gerekmektedir.', w: ['fosil yakıt kullanımı artırılmalıdır.', 'enerji tüketimi tamamen durdurulmalıdır.', 'nükleer enerji terk edilmelidir.', 'herkes kendi enerjisini üretmelidir.'] },
    { p: 'Sosyal medya platformları, insanların haberleşme biçimini kökünden değiştirmiştir. Eskiden mektup günlerce beklenirken şimdi mesajlar saniyeler içinde ulaşmaktadır. Ancak bu hızlı iletişim, beraberinde...', a: 'yüzeysel ve derinlikten yoksun ilişkileri getirmiştir.', w: ['daha sağlam dostluklar kurulmasını sağlamıştır.', 'insanları daha mutlu etmiştir.', 'okuma yazma oranını artırmıştır.', 'aile bağlarını güçlendirmiştir.'] },
    { p: 'Tarih boyunca birçok medeniyet, güçlü orduları ve zengin kaynakları sayesinde yükselmiş ancak zamanla zayıflayarak yok olmuştur. Bu medeniyetlerin çöküşünde en önemli etken...', a: 'iç karışıklıklar ve yönetim zafiyetleridir.', w: ['dış düşmanların saldırılarıdır.', 'doğal afetlerdir.', 'ekonomik ambargolardır.', 'teknolojik geriliktir.'] },
    { p: 'Akıllı telefonlar hayatımızı kolaylaştıran pek çok özelliğe sahiptir. Ancak aşırı kullanımı durumunda...', a: 'bağımlılık yaparak sosyal hayattan kopmamıza neden olabilir.', w: ['daha üretken olmamızı sağlar.', 'bilgiye erişimimizi sınırlar.', 'iş bulmamızı kolaylaştırır.', 'uyku düzenimizi iyileştirir.'] },
    { p: 'Hoşgörü, farklı düşünce ve inançlara saygı duymayı gerektirir. Bir toplumda hoşgörü kültürü ne kadar gelişmişse...', a: 'o toplumda barış ve huzur ortamı o kadar güçlüdür.', w: ['insanlar birbirine benzemeye başlar.', 'ekonomik kalkınma yavaşlar.', 'kültürel çeşitlilik azalır.', 'herkes aynı şekilde düşünür.'] },
    { p: 'Çocuklara küçük yaşta sorumluluk vermek, onların kendine güvenen bireyler olarak yetişmesine katkı sağlar. Ancak verilen sorumluluklar...', a: 'çocuğun yaşına ve kapasitesine uygun olmalıdır.', w: ['her çocuğa aynı şekilde verilmelidir.', 'olabildiğince zor olmalıdır.', 'sadece okul başarısıyla ilgili olmalıdır.', 'çocuğa danışılmadan belirlenmelidir.'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('paragraf',
    `${item.p}\nBu parça aşağıdakilerden hangisiyle en uygun şekilde tamamlanır?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `Anlam bütünlüğü: "${item.a}"`);
}

function templateParagrafIkiyeBolme() {
  const data = [
    { p: '(I) Edebiyat, insanın kendini ifade etme biçimi olmuştur.\n(II) İlk çağlardaki mağara resimlerinden günümüz romanlarına kadar bu ifade biçimi hep var olmuştur.\n(III) Ancak teknolojinin gelişmesiyle edebiyat da dijitalleşmeye başlamıştır.\n(IV) Artık birçok eser dijital ortamda yayımlanmaktadır.\n(V) Bu durum edebiyatın geleceği hakkında tartışmaları beraberinde getirmiştir.', a: 'III', w: ['I', 'II', 'IV', 'V'] },
    { p: '(I) Sağlıklı bir yaşam için dengeli beslenmek şarttır.\n(II) Vitamin ve mineral açısından zengin gıdalar tüketmek vücudun ihtiyaçlarını karşılar.\n(III) Bunun yanında düzenli egzersiz yapmak da önemlidir.\n(IV) Günümüzde fast food kültürü sağlıklı beslenmeyi zorlaştırmaktadır.\n(V) Büyük şehirlerde insanlar sağlıklı gıdaya ulaşmakta zorlanmaktadır.', a: 'IV', w: ['I', 'II', 'III', 'V'] },
    { p: '(I) Dil, bir milletin en önemli kültürel mirasıdır.\n(II) Bir dilin zenginliği milletin medeniyet seviyesini gösterir.\n(III) Bu nedenle dilin korunması her bireyin görevidir.\n(IV) Gençler dilin doğru kullanımı konusunda bilinçlendirilmelidir.\n(V) Aksi takdirde dil yozlaşır ve özelliğini kaybeder.', a: 'IV', w: ['I', 'II', 'III', 'V'] },
    { p: '(I) İklim değişikliği, günümüzün en acil sorunlarından biridir.\n(II) Artan sıcaklıklar buzulların erimesine neden olmaktadır.\n(III) Deniz seviyesi yükselmekte ve kıyı bölgeleri tehdit altına girmektedir.\n(IV) Hükümetler bu konuda ortak politikalar geliştirmelidir.\n(V) Aksi halde gelecek nesiller geri dönüşü olmayan hasarlarla karşılaşacaktır.', a: 'IV', w: ['I', 'II', 'III', 'V'] },
    { p: '(I) Teknoloji, hayatımızı her geçen gün daha da kolaylaştırmaktadır.\n(II) Akıllı ev sistemleri enerji tasarrufu sağlamaktadır.\n(III) Yapay zeka destekli asistanlar günlük işlerimizde bize yardımcı olmaktadır.\n(IV) Ancak teknoloji bağımlılığı beraberinde yalnızlık sorununu getirmektedir.\n(V) Özellikle gençler arasında sosyal medya bağımlılığı giderek artmaktadır.', a: 'IV', w: ['I', 'II', 'III', 'V'] },
    { p: '(I) Tarih boyunca insanlar gökyüzünü merak etmiştir.\n(II) İlk uygarlıklar yıldızları gözlemleyerek takvimler oluşturmuştur.\n(III) Astronomi bilimi bu merak sayesinde doğmuştur.\n(IV) Günümüzde teleskoplarla evrenin derinlikleri keşfedilmektedir.\n(V) Uzaya gönderilen araçlar sayesinde diğer gezegenler hakkında bilgi sahibi oluyoruz.', a: 'IV', w: ['I', 'II', 'III', 'V'] },
    { p: '(I) Sanat, insanlık tarihi boyunca var olan bir ifade biçimidir.\n(II) Mağara duvarlarına çizilen resimler ilk sanat örnekleridir.\n(III) Zamanla heykel, müzik, tiyatro gibi yeni sanat dalları ortaya çıkmıştır.\n(IV) Ancak günümüzde sanat, ticari bir meta haline gelmiştir.\n(V) Birçok sanatçı eserlerini satmak için galerilere bağımlı hale gelmiştir.', a: 'IV', w: ['I', 'II', 'III', 'V'] },
    { p: '(I) Dünya nüfusu hızla artmaktadır.\n(II) Artan nüfus, gıda ve su kaynakları üzerinde baskı oluşturmaktadır.\n(III) Tarım alanları verimli kullanılmazsa kıtlık kaçınılmaz olacaktır.\n(IV) Bu sorunun çözümü için sürdürülebilir tarım yöntemleri geliştirilmelidir.\n(V) Ayrıca gıda israfını önlemek de büyük önem taşımaktadır.', a: 'IV', w: ['I', 'II', 'III', 'V'] },
    { p: '(I) Okuma alışkanlığı, bireyin zihinsel gelişimine katkıda bulunur.\n(II) Düzenli kitap okuyan insanların kelime dağarcığı genişler.\n(III) Ayrıca okumak, empati yeteneğini geliştirir.\n(IV) Oysa günümüzde insanlar kitap okumaya yeterince vakit ayırmamaktadır.\n(V) Bunun yerine sosyal medyada vakit geçirmeyi tercih etmektedir.', a: 'IV', w: ['I', 'II', 'III', 'V'] },
  ];
  const item = pick(data);
  const correctText = `${item.a}. cümleden itibaren`;
  const wrongTexts = item.w.filter(w => w !== item.a).map(n => `${n}. cümleden itibaren`);
  const opts = shuffle([correctText, ...wrongTexts]);
  return makeQuestion('paragraf',
    `${item.p}\nBu parça iki paragrafa bölünmek istense ikinci paragraf nerede başlar?`,
    makeOptions(...opts),
    opts.indexOf(correctText),
    `İkinci paragraf ${item.a}. cümleyle başlar.`);
}

// ─── 4. Dil Bilgisi ─────────────────────────────────────────────────────────

function templateSozcukTuru() {
  const data = [
    { c: 'Ahmet okula yeni bir çantayla geldi.', alt: 'yeni', a: 'sıfat', w: ['isim', 'zamir', 'fiil', 'zarf'] },
    { c: 'O kitabı daha önce ben de okudum.', alt: 'O', a: 'zamir', w: ['isim', 'sıfat', 'edat', 'bağlaç'] },
    { c: 'Çocuklar bahçede neşeyle oynuyor.', alt: 'neşeyle', a: 'zarf', w: ['sıfat', 'isim', 'fiil', 'zamir'] },
    { c: 'Kardeşim çok hızlı koşuyor.', alt: 'koşuyor', a: 'fiil', w: ['isim', 'sıfat', 'zamir', 'zarf'] },
    { c: 'Sana güveniyorum çünkü sen dürüstsün.', alt: 'çünkü', a: 'bağlaç', w: ['edat', 'zamir', 'isim', 'sıfat'] },
    { c: 'Akşama kadar yağmur yağdı.', alt: 'kadar', a: 'edat', w: ['bağlaç', 'isim', 'zarf', 'sıfat'] },
    { c: 'Akşam, güneş batarken eve döndük.', alt: 'Akşam', a: 'isim', w: ['sıfat', 'fiil', 'zamir', 'zarf'] },
    { c: 'Bu soruları daha önce çözmüştük.', alt: 'Bu', a: 'sıfat', w: ['zamir', 'bağlaç', 'edat', 'isim'] },
    { c: 'Bunu sana daha önce de söylemiştim.', alt: 'Bunu', a: 'zamir', w: ['isim', 'sıfat', 'fiil', 'edat'] },
    { c: 'Yemekten sonra hemen yürüyüşe çıktı.', alt: 'sonra', a: 'edat', w: ['bağlaç', 'isim', 'zarf', 'sıfat'] },
    { c: 'Çok güzel bir resim yapmışsın.', alt: 'güzel', a: 'sıfat', w: ['isim', 'fiil', 'zamir', 'zarf'] },
    { c: 'Yavaşça kapıyı açtı.', alt: 'Yavaşça', a: 'zarf', w: ['fiil', 'isim', 'sıfat', 'edat'] },
    { c: 'Ali okula gitmedi.', alt: 'gitmedi', a: 'fiil', w: ['isim', 'sıfat', 'zamir', 'zarf'] },
    { c: 'Sınıftaki herkes sınavı kazandı.', alt: 'herkes', a: 'zamir', w: ['isim', 'sıfat', 'fiil', 'zarf'] },
    { c: 'Kitap okumayı çok severim.', alt: 'kitap', a: 'isim', w: ['fiil', 'sıfat', 'zamir', 'zarf'] },
    { c: 'Yağmur yağdığı için piknik iptal oldu.', alt: 'için', a: 'edat', w: ['bağlaç', 'isim', 'fiil', 'sıfat'] },
    { c: 'Hem çalışıyor hem de okuyor.', alt: 'Hem', a: 'bağlaç', w: ['edat', 'isim', 'sıfat', 'zamir'] },
    { c: 'Eve gitmek üzere yola çıktı.', alt: 'üzere', a: 'edat', w: ['bağlaç', 'zarf', 'isim', 'fiil'] },
    { c: 'O kadar çalıştı ki kazandı.', alt: 'ki', a: 'bağlaç', w: ['edat', 'zamir', 'sıfat', 'isim'] },
    { c: 'Mavi gökyüzü çok güzeldi.', alt: 'Mavi', a: 'sıfat', w: ['isim', 'zamir', 'fiil', 'zarf'] },
    { c: 'Babam bana yeni bir bisiklet aldı.', alt: 'bana', a: 'zamir', w: ['isim', 'sıfat', 'edat', 'bağlaç'] },
    { c: 'Güzelce yıkandı ve çıktı.', alt: 'Güzelce', a: 'zarf', w: ['sıfat', 'isim', 'fiil', 'edat'] },
    { c: 'Sınav, haftaya cumaya ertelendi.', alt: 'Sınav', a: 'isim', w: ['fiil', 'sıfat', 'zamir', 'zarf'] },
    { c: 'Onlarınki daha güzel olmuş.', alt: 'Onlarınki', a: 'zamir', w: ['sıfat', 'isim', 'fiil', 'edat'] },
    { c: 'Eve doğru yürümeye başladı.', alt: 'doğru', a: 'edat', w: ['bağlaç', 'isim', 'sıfat', 'zarf'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('dil-bilgisi',
    `"${item.c}"\nAltı çizili "${item.alt}" sözcüğünün türü aşağıdakilerden hangisidir?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `"${item.alt}" sözcüğü "${item.a}" türündedir.`);
}

function templateCumleOgesi() {
  const data = [
    { c: 'Ali, yeni aldığı kitabı heyecanla okumaya başladı.', soru: 'yüklem', a: 'okumaya başladı', w: ['Ali', 'yeni aldığı kitabı', 'heyecanla', 'kitabı'] },
    { c: 'Öğretmen, öğrencilere ödevlerini dikkatlice anlattı.', soru: 'zarf tümleci', a: 'dikkatlice', w: ['Öğretmen', 'öğrencilere', 'ödevlerini', 'anlattı'] },
    { c: 'Yarınki gezi için herkes hazırlıklarını tamamladı.', soru: 'özne', a: 'herkes', w: ['Yarınki gezi için', 'hazırlıklarını', 'tamamladı', 'Yarınki'] },
    { c: 'Annem bana güzel bir hikaye kitabı aldı.', soru: 'nesne', a: 'güzel bir hikaye kitabı', w: ['Annem', 'bana', 'aldı', 'güzel'] },
    { c: 'Mehmet, dün akşam ödevini çabucak bitirdi.', soru: 'zarf tümleci', a: 'çabucak', w: ['Mehmet', 'dün akşam', 'ödevini', 'bitirdi'] },
    { c: 'Küçük kız annesine sarıldı.', soru: 'yüklem', a: 'sarıldı', w: ['Küçük kız', 'annesine', 'küçük', 'Kız'] },
    { c: 'Babam yarın İstanbul\'a gidecek.', soru: 'dolaylı tümleç', a: 'İstanbul\'a', w: ['Babam', 'yarın', 'gidecek', 'Babam yarın'] },
    { c: 'Öğrenciler sınavı dikkatlice çözdü.', soru: 'nesne', a: 'sınavı', w: ['Öğrenciler', 'dikkatlice', 'çözdü', 'Öğrenciler sınavı'] },
    { c: 'Yağmur üç gündür aralıksız yağıyor.', soru: 'zarf tümleci', a: 'üç gündür', w: ['Yağmur', 'aralıksız', 'yağıyor', 'Yağmur yağıyor'] },
    { c: 'Bu romanı çok beğendim.', soru: 'nesne', a: 'bu romanı', w: ['çok', 'beğendim', 'Bu', 'Bu beğendim'] },
    { c: 'Çocuklar bahçede neşeyle oynuyor.', soru: 'dolaylı tümleç', a: 'bahçede', w: ['Çocuklar', 'neşeyle', 'oynuyor', 'neşeyle oynuyor'] },
    { c: 'Annem bugün bana kek yapacak.', soru: 'dolaylı tümleç', a: 'bana', w: ['Annem', 'bugün', 'kek', 'yapacak'] },
    { c: 'Hasta adam güçlükle yürüyordu.', soru: 'zarf tümleci', a: 'güçlükle', w: ['Hasta adam', 'yürüyordu', 'adam', 'Hasta'] },
    { c: 'Deniz kenarında yürüyüş yapmak istiyorum.', soru: 'nesne', a: 'yürüyüş', w: ['Deniz kenarında', 'yapmak', 'istiyorum', 'Deniz'] },
    { c: 'Tren saat onda kalkacak.', soru: 'zarf tümleci', a: 'onda', w: ['Tren', 'kalkacak', 'saat', 'Tren saat'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('dil-bilgisi',
    `"${item.c}"\nBu cümledeki ${item.soru} aşağıdakilerden hangisidir?`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `Cümledeki ${item.soru}: "${item.a}"`);
}

function templateYazimKurali() {
  const data = [
    { a: 'Her şeyi yapabilirsin ama önce inanmalısın.', w: ['Her şeyi yapabilirsin ama önce inanmalısın.', 'Herşeyi yapabilirsin ama önce inanmalısın.', 'Her şeyi yapabilirsin ama öncede inanmalısın.', 'Herşeyi yapabilirsin ama öncede inanmalısın.'], hata: 'her şey / herşey' },
    { a: 'Ben de seninle gelmek istiyorum.', w: ['Bende seninle gelmek istiyorum.', 'Ben de seninle gelmek istiyorum.', 'Ben de seninle gelmek istiyorum.', 'Bende seninle gelmek istiyorum.'], hata: 'de / -de' },
    { a: 'Bu konuda hiçbir şey bilmiyorum.', w: ['Bu konuda hiçbir şey bilmiyorum.', 'Bu konuda hiç bir şey bilmiyorum.', 'Bu konuda hiçbirşey bilmiyorum.', 'Bu konuda hiç birşey bilmiyorum.'], hata: 'hiçbir' },
    { a: 'Yanlış yazdığın sözcükleri düzeltmelisin.', w: ['Yanlış yazdığın sözcükleri düzeltmelisin.', 'Yanlız yazdığın sözcükleri düzeltmelisin.', 'Yalnış yazdığın sözcükleri düzeltmelisin.', 'Yanlış yazdığın sözcükleri düzeltmelisin.'], hata: 'yanlış / yanlız / yalnış' },
    { a: 'Birkaç gün sonra görüşürüz.', w: ['Birkaç gün sonra görüşürüz.', 'Bir kaç gün sonra görüşürüz.', 'Birkaçgün sonra görüşürüz.', 'Bir kaç gün sonra görüşürüz.'], hata: 'birkaç / bir kaç' },
    { a: 'Şurada oturan kişiyi tanıyor musun?', w: ['Şurada oturan kişiyi tanıyor musun?', 'Şurada oturan kişiyi tanıyormusun?', 'Şurada oturan kişiyi tanıyormusun?', 'Şurada oturan kişiyi tanıyor musun?'], hata: 'soru eki "mi" ayrı yazılır' },
    { a: 'Gelirken ekmek almayı unutma.', w: ['Gelirken ekmek almayı unutma.', 'Gelirken ekmek almayı unutma.', 'Gelirken ekmek almayı unutma.', 'Gelirken ekmek almayı unutma.'], hata: 'olumsuzluk eki "-ma/-me"' },
    { a: 'Çok mutlu olduğu için havalara uçuyor.', w: ['Çok mutlu olduğu için havalara uçuyor.', 'Çok mutlu olduğu için havalara uçuyor.', 'Çok mutlu olduğu için havalara uçuyor.', 'Çok mutlu olduğu için havalara uçuyor.'], hata: '"havalara uçmak" deyimi' },
  ];
  const item = pick(data);
  const correct = item.a;
  const opts = shuffle(item.w.map((w, i) => i === 0 ? w : w));
  return makeQuestion('dil-bilgisi',
    `Aşağıdaki cümlelerden hangisinde yazım yanlışı yoktur?`,
    makeOptions(...opts),
    opts.indexOf(correct),
    `Doğru: "${correct}".`);
}

function templateNoktalama() {
  const data = [
    { c: 'Ahmet, Ali, ve Ayşe toplantıya katıldı.', a: 'Virgülden sonra "ve" kullanılmamalıdır', w: ['"Ahmet"ten sonra virgül gereksizdir', '"Ali"den sonra noktalı virgül olmalıdır', 'Cümle sonunda soru işareti olmalıdır', 'Cümlede noktalama yanlışı yoktur'] },
    { c: 'Yarın mı geliyorsun?', a: 'Cümlede noktalama yanlışı yoktur', w: ['Soru ekinden sonra soru işareti gelmez', '"Yarın"dan sonra virgül olmalıdır', '"mı" ayrı yazılmamalıdır', 'Cümle ünlemle bitmelidir'] },
    { c: 'Kitap, defter, kalem; hepsini aldı.', a: 'Bu cümlede noktalı virgül doğru kullanılmıştır', w: ['Noktalı virgül yerine virgül kullanılmalıdır', 'Noktalı virgül yerine iki nokta kullanılmalıdır', '"kalem"den sonra nokta konmalıdır', 'Cümle başında büyük harf yanlıştır'] },
    { c: 'Ali (babam) bugün gelecek.', a: 'Yay ayraç doğru kullanılmıştır', w: ['Yay ayraç yerine köşeli ayraç olmalıdır', 'Cümle ortasında ayraç kullanılmaz', '"Ali"den sonra virgül olmalıdır', 'Ayraçtan önce nokta konmalıdır'] },
    { c: 'Sana bir şey söyleyeceğim: dinler misin?', a: 'İki nokta doğru kullanılmıştır', w: ['İki nokta yerine noktalı virgül olmalıdır', 'İki noktadan sonra büyük harf gelmelidir', 'İki nokta yerine virgül konmalıdır', 'Cümlede noktalama yanlışı vardır'] },
    { c: 'Vay be! Ne güzel bir manzara!', a: 'Ünlem işaretleri doğru kullanılmıştır', w: ['İlk ünlem gereksizdir', 'İkinci cümle soru cümlesidir', 'Ünlem yerine nokta konmalıdır', 'Cümlelerde yazım yanlışı vardır'] },
    { c: 'Ali, Ahmet ve Ayşe geldiler mi?', a: 'Virgül ve soru işareti doğru kullanılmıştır', w: ['Virgülden sonra "ve" gelmemelidir', 'Soru işareti yerine nokta olmalıdır', '"geldiler mi" bitişik yazılmalıdır', 'Virgül yerine noktalı virgül olmalıdır'] },
    { c: 'Türkiye\'nin başkenti: Ankara\'dır.', a: 'İki nokta yanlış kullanılmıştır', w: ['İki nokta doğru kullanılmıştır', 'Kesme işareti yanlış kullanılmıştır', 'Cümle büyük harfle başlamalıdır', 'Nokta yerine virgül olmalıdır'] },
    { c: '"Merhaba!" dedi.', a: 'Tırnak ve ünlem doğru kullanılmıştır', w: ['Tırnak içinde ünlem kullanılmaz', '"dedi"den sonra nokta konmamalıdır', 'Tırnak yerine yay ayraç olmalıdır', 'Cümle büyük harfle başlamalıdır'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('dil-bilgisi',
    `Aşağıdakilerden hangisi doğrudur? ("${item.c}")`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `"${item.c}" → ${item.a}`);
}

// ─── 5. Sözel Mantık ─────────────────────────────────────────────────────────

function templateSozelMantik1() {
  const data = [
    { p: 'Beş arkadaş (Ali, Ayşe, Can, Defne, Emre) sınav sonuçlarına göre sıralanmıştır.\n- Ali, Defne\'den daha yüksek puan almıştır.\n- Emre, Can\'dan daha düşük puan almıştır.\n- Ayşe, en düşük puan alan kişidir.\n- Can, Ali\'den daha yüksek puan almıştır.\nBuna göre en yüksek puan alan kişi kimdir?', a: 'Can', w: ['Ali', 'Ayşe', 'Defne', 'Emre'] },
    { p: 'Bir okulda dört farklı kulüp vardır: Tiyatro, Müzik, Resim, Spor.\n- Resim kulübü Pazartesi günleri toplanır.\n- Spor kulübü Çarşamba günleri toplanır.\n- Tiyatro kulübü Spor kulübünden bir gün sonra toplanır.\n- Müzik kulübü Tiyatro kulübünden iki gün önce toplanır.\nBuna göre Müzik kulübü hangi gün toplanır?', a: 'Salı', w: ['Pazartesi', 'Çarşamba', 'Perşembe', 'Cuma'] },
    { p: 'Bir sınıftaki öğrenciler matematik, fen ve edebiyat derslerinin en az birinden başarılı olmuştur.\n- Matematikten başarılı olanların sayısı 20\'dir.\n- Fenden başarılı olanların sayısı 15\'tir.\n- Edebiyattan başarılı olanların sayısı 12\'dir.\n- Matematik ve fenden başarılı olan 8 kişi vardır.\n- Matematik ve edebiyattan başarılı olan 5 kişi vardır.\n- Fen ve edebiyattan başarılı olan 3 kişi vardır.\n- Her üç dersten başarılı olan 2 kişi vardır.\nBuna göre sınıf mevcudu kaçtır?', a: '33', w: ['27', '30', '35', '40'] },
    { p: 'Bir iş yerinde çalışanlar haftanın belirli günlerinde nöbet tutmaktadır.\n- Ahmet, Can ile aynı gün nöbet tutmaz.\n- Burcu, sadece Pazartesi ve Çarşamba nöbet tutar.\n- Can, Ahmet\'ten bir gün sonra nöbet tutar.\n- Nöbet günleri Pazartesi, Salı, Çarşamba ve Perşembe\'dir.\nBuna göre Ahmet hangi günler nöbet tutabilir?', a: 'Salı ve Perşembe', w: ['Pazartesi ve Salı', 'Salı ve Çarşamba', 'Çarşamba ve Perşembe', 'Pazartesi ve Perşembe'] },
    { p: 'Bir kutuda kırmızı, mavi ve yeşil toplar vardır.\n- Kırmızı topların sayısı mavi topların sayısından 5 fazladır.\n- Yeşil topların sayısı kırmızı topların sayısından 3 azdır.\n- Toplam top sayısı 40\'tır.\nBuna göre kutuda kaç tane mavi top vardır?', a: '11', w: ['13', '14', '15', '16'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('sozel-mantik',
    `${item.p}`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `Cevap: ${item.a}`);
}

const templates = [
  templateEsAnlam, templateZitAnlam, templateYakinAnlam, templateDeyim,
  templateCumleYorumu, templateCumleTamamlama, templateCumleIliskisi,
  templateParagrafKonu, templateParagrafAnaDusunce, templateParagrafYardimciDusunce,
  templateParagrafTamamlama, templateParagrafIkiyeBolme,
  templateSozcukTuru, templateCumleOgesi, templateYazimKurali, templateNoktalama,
  templateSozelMantik1,
];

export function generate(count = 30) {
  return generateUnique(() => {
    const tpl = pick(templates);
    return tpl();
  }, count);
}
