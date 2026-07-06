/**
 * TYT Türkçe Soru Üretici
 */
import { randInt, pick, shuffle, makeQuestion, makeOptions } from './shared.mjs';

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
    { w: 'öykü', c: 'Yaşanmış veya yaşanabilir olayların kısa anlatımı.', a: 'hikâye', d: ['roman', 'masal', 'destan', 'şiir'] },
    { w: 'konut', c: 'İnsanların içinde yaşadıkları yapı.', a: 'mesken', d: ['işyeri', 'fabrika', 'ahır', 'depo'] },
    { w: 'önder', c: 'Bir topluluğu yönlendiren kimse.', a: 'lider', d: ['üye', 'yönetici', 'sekreter', 'çalışan'] },
    { w: 'yoksul', c: 'Maddi olanakları kısıtlı olan.', a: 'fakir', d: ['varlıklı', 'zengin', 'gönenc', 'varsıl'] },
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
    { p: 'Şehir hayatının yoğun temposu insanları doğadan uzaklaştırmaktadır.\nBeton yığınları arasında sıkışan insanlar, hafta sonlarında doğal alanlara kaçış aramaktadır.\nBu durum, doğa turizminin popüler hâle gelmesine yol açmaktadır.', a: 'Şehir hayatından doğaya yöneliş', w: ['Turizm çeşitleri', 'Doğanın korunması', 'Şehir planlaması', 'Hafta sonu aktiviteleri'] },
    { p: 'Sosyal medya, bireylerin kendini ifade etme biçimini değiştirmiştir.\nİnsanlar duygu ve düşüncelerini anlık paylaşımlarla ifade etmekte, beğenilme kaygısıyla hareket etmektedir.\nBu durum gençler arasında kimlik bunalımına yol açabilmektedir.', a: 'Sosyal medyanın birey üzerindeki etkileri', w: ['Gençlik sorunları', 'İletişim araçlarının tarihi', 'Sosyal medya platformları', 'Dijital pazarlama'] },
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
    { p: 'Tarihî romanlar, geçmişteki olayları kurgusal bir dille anlatır.\nYazar, tarihsel gerçekleri araştırır ve hayal gücüyle birleştirir.\nBöylece okuyucu hem tarih öğrenir hem keyifli vakit geçirir.', not: 'söylenemez', a: 'Tarihî romanlar tamamen gerçek olaylardan oluşur.', w: ['Tarihî romanlar kurgu içerir.', 'Yazar tarihsel araştırma yapar.', 'Tarihî romanlar eğitici ve eğlendiricidir.', 'Tarihî romanda hayal gücü kullanılır.'] },
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
    { p: 'Kitap okuma alışkanlığı küçük yaşlarda kazanılır. Çocuklarına kitap okuyan ailelerin çocukları okumayı yaşam biçimi hâline getirir. Oysa günümüzde ebeveynler çocuklarına kitap yerine tablet vermeyi tercih etmektedir. Bu durum...', a: 'çocukların okuma alışkanlığı kazanmasını zorlaştırmaktadır.', w: ['çocukların daha zeki olmasını sağlamaktadır.', 'aile içi iletişimi güçlendirmektedir.', 'eğitim sistemini olumlu etkilemektedir.', 'çocukların sosyalleşmesine katkıda bulunmaktadır.'] },
    { p: 'İnsanoğlu yüzyıllardır gökyüzünü merak etmiş, yıldızları incelemiştir. İlk çağlardan beri gök cisimlerinin hareketlerini gözlemleyen insanlar takvimler oluşturmuştur. Günümüzde uzay araştırmaları çok ilerlemiştir. Ancak hâlâ...', a: 'evrenin sırlarını tam olarak çözebilmiş değiliz.', w: ['herkes uzaya yolculuk yapabilmektedir.', 'dünyanın uzayla ilişkisi kalmamıştır.', 'gökyüzü gözlemciliği tamamen bitmiştir.', 'teleskoplar kullanılmamaktadır.'] },
    { p: 'Bir yazarın en önemli özelliği, okuyucuyla duygusal bağ kurabilmesidir. Bunun için samimi bir dil kullanması gerekir. Okuyucu bu samimiyeti hissettiğinde yazarın dünyasına girer. Aksi takdirde...', a: 'yazılanlar kuru ve etkisiz kalır.', w: ['kitap daha çok satar.', 'yazar daha popüler olur.', 'dil daha süslü olur.', 'eser daha değerli olur.'] },
    { p: 'Müzik, insan ruhunun en derin duygularına hitap eden bir sanattır. Her kültürün kendine özgü müzik anlayışı vardır. Bu müzikler o kültürün tarihini, acılarını ve sevinçlerini yansıtır. Bu yönüyle müzik...', a: 'kültürlerin hafızası niteliği taşır.', w: ['sadece eğlence amaçlıdır.', 'her toplumda aynıdır.', 'modern dünyada önemini kaybetmiştir.', 'en eski sanat dalıdır.'] },
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
    { c: 'Annem bana güzel bir hikâye kitabı aldı.', soru: 'nesne', a: 'güzel bir hikâye kitabı', w: ['Annem', 'bana', 'aldı', 'güzel'] },
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
  ];
  const item = pick(data);
  const correct = item.a;
  const wrong = shuffle(item.w.filter(w => w !== correct));
  const opts = shuffle([correct, ...wrong.slice(0, 4)]);
  return makeQuestion('dil-bilgisi',
    `Aşağıdaki cümlelerin hangisinde bir yazım yanlışı vardır?`,
    makeOptions(...opts),
    opts.indexOf(correct),
    `Doğru yazım: "${correct}". Yaygın hata: ${item.hata}.`);
}

function templateNoktalama() {
  const data = [
    { c: 'Ahmet, Ali, ve Ayşe toplantıya katıldı.', a: 'Virgülden sonra "ve" kullanılmamalıdır', w: ['"Ahmet"ten sonra virgül gereksizdir', '"Ali"den sonra noktalı virgül olmalıdır', 'Cümle sonunda soru işareti olmalıdır', 'Cümlede noktalama yanlışı yoktur'] },
    { c: 'Yarın mı geliyorsun?', a: 'Cümlede noktalama yanlışı yoktur', w: ['Soru ekinden sonra soru işareti gelmez', '"Yarın"dan sonra virgül olmalıdır', '"mı" ayrı yazılmamalıdır', 'Cümle ünlemle bitmelidir'] },
    { c: 'Kitap, defter, kalem; hepsini aldı.', a: 'Bu cümlede noktalı virgül doğru kullanılmıştır', w: ['Noktalı virgül yerine virgül kullanılmalıdır', 'Noktalı virgül yerine iki nokta kullanılmalıdır', '"kalem"den sonra nokta konmalıdır', 'Cümle başında büyük harf yanlıştır'] },
    { c: 'Ali (babam) bugün gelecek.', a: 'Yay ayraç doğru kullanılmıştır', w: ['Yay ayraç yerine köşeli ayraç olmalıdır', 'Cümle ortasında ayraç kullanılmaz', '"Ali"den sonra virgül olmalıdır', 'Ayraçtan önce nokta konmalıdır'] },
    { c: 'Sana bir şey söyleyeceğim: dinler misin?', a: 'İki nokta doğru kullanılmıştır', w: ['İki nokta yerine noktalı virgül olmalıdır', 'İki noktadan sonra büyük harf gelmelidir', 'İki nokta yerine virgül konmalıdır', 'Cümlede noktalama yanlışı vardır'] },
  ];
  const item = pick(data);
  const opts = shuffle([item.a, ...item.w]);
  return makeQuestion('dil-bilgisi',
    `Noktalama yanlışı olan cümle hangisidir? (${item.c})`,
    makeOptions(...opts),
    opts.indexOf(item.a),
    `"${item.c}" → ${item.a}`);
}

const templates = [
  templateEsAnlam, templateZitAnlam, templateYakinAnlam, templateDeyim,
  templateCumleYorumu, templateCumleTamamlama, templateCumleIliskisi,
  templateParagrafKonu, templateParagrafAnaDusunce, templateParagrafYardimciDusunce,
  templateParagrafTamamlama, templateParagrafIkiyeBolme,
  templateSozcukTuru, templateCumleOgesi, templateYazimKurali, templateNoktalama,
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
