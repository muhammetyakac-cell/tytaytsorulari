import { pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

// ─── Tarih ───────────────────────────────────────────────────────────────────

function islamiyetOncesiTurk() {
  const pool = [
    { q: 'İslamiyet öncesi Türk devletlerinde hükümdarın başkanlığında toplanan ve devlet işlerinin görüşüldüğü meclise ne ad verilirdi?', opts: ['Meclis-i Mebusan', 'Toy (Kurultay)', 'Divan-ı Hümayun', 'Ayan Meclisi', 'İltizam'], correct: 1, exp: 'İslamiyet öncesi Türk devletlerinde hükümdarın başkanlığında toplanan meclise "Toy" veya "Kurultay" adı verilirdi.' },
    { q: 'Orhun Abideleri hangi Türk devleti döneminde dikilmiştir?', opts: ['Asya Hun Devleti', 'Avrupa Hun Devleti', 'II. Göktürk (Kutluk) Devleti', 'Uygur Devleti', 'Hazar Kağanlığı'], correct: 2, exp: 'Orhun Abideleri, II. Göktürk (Kutluk) Devleti döneminde (8. yüzyıl) dikilmiştir.' },
    { q: 'İslamiyet öncesi Türklerde ölen kişinin ardından düzenlenen yas törenine ne ad verilirdi?', opts: ['Sığır', 'Şölen', 'Yuğ', 'Kurgan', 'Balbal'], correct: 2, exp: 'İslamiyet öncesi Türklerde ölen kişinin ardından düzenlenen törene "yuğ" adı verilirdi.' },
    { q: 'Tarihte bilinen ilk Türk devleti aşağıdakilerden hangisidir?', opts: ['Göktürkler', 'Asya Hun Devleti', 'Avrupa Hun Devleti', 'Uygurlar', 'Hazarlar'], correct: 1, exp: 'Tarihte bilinen ilk Türk devleti, Teoman tarafından MÖ 220\'de kurulan Asya Hun Devleti\'dir.' },
    { q: 'Uygurların yerleşik hayata geçmesinde etkili olan din aşağıdakilerden hangisidir?', opts: ['Göktanrı inancı', 'Budizm', 'Maniheizm', 'Hristiyanlık', 'Musevilik'], correct: 2, exp: 'Uygurlar Maniheizm\'i kabul ederek yerleşik hayata geçmişlerdir.' },
    { q: '"Kut" anlayışı aşağıdakilerden hangisini ifade eder?', opts: ['Hükümdarın yönetme yetkisini Tanrı\'dan alması', 'Ordunun düzenli toplanması', 'Ticaret yollarının denetimi', 'Vergilerin düzenli toplanması', 'Toprakların paylaşılması'], correct: 0, exp: '"Kut" anlayışı, hükümdarın yönetme yetkisini Tanrı\'dan aldığı inancına dayanır.' },
    { q: 'Türklerin kullandığı ilk alfabe aşağıdakilerden hangisidir?', opts: ['Uygur', 'Arap', 'Kiril', 'Göktürk (Orhun)', 'Latin'], correct: 3, exp: 'Türklerin kullandığı ilk alfabe 38 harften oluşan Göktürk (Orhun) alfabesidir.' },
    { q: 'Avrupa Hun Devleti\'nin en parlak dönemini yaşatan hükümdar kimdir?', opts: ['Balamir', 'Teoman', 'Mete Han', 'Attila', 'Bumin Kağan'], correct: 3, exp: 'Avrupa Hun Devleti en parlak dönemini Attila zamanında yaşamıştır.' },
    { q: 'İslamiyet öncesi Türk devletlerinde devleti yöneten hanedan üyelerine ülkenin paylaştırılması geleneğine ne ad verilir?', opts: ['Kut anlayışı', 'İkili teşkilat (Ülüş)', 'Kurultay', 'Toy', 'Veraset sistemi'], correct: 1, exp: 'Ülke topraklarının hanedan üyelerinin ortak malı sayılmasına ve paylaştırılmasına ülüş (ikili teşkilat) denir.' },
    { q: 'Tarihte Türk adıyla kurulan ilk devlet aşağıdakilerden hangisidir?', opts: ['Asya Hun Devleti', 'Göktürk Devleti', 'Uygur Devleti', 'Avarlar', 'Hazarlar'], correct: 1, exp: 'Türk adıyla kurulan ilk devlet I. Göktürk Devleti\'dir.' },
    { q: 'Museviliği resmi din olarak kabul eden ilk ve tek Türk devleti hangisidir?', opts: ['Hazarlar', 'Peçenekler', 'Kıpçaklar', 'Karluklar', 'Macarlar'], correct: 0, exp: 'Hazarlar, Museviliği kabul eden ilk ve tek Türk boyudur.' },
    { q: 'İslamiyet öncesi Türklerde mezar taşlarına, kişinin hayattayken öldürdüğü düşman sayısınca dikilen heykellere ne ad verilir?', opts: ['Kurgan', 'Balbal', 'Uçmağ', 'Tamu', 'Yuğ'], correct: 1, exp: 'Mezar taşlarına dikilen bu küçük heykellere "Balbal" adı verilirdi.' }
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
    { q: 'Osmanlı Devleti\'nin Rumeli\'ye geçişini sağlayan ve ilk toprak parçası olan kale aşağıdakilerden hangisidir?', opts: ['Gelibolu', 'Çimpe Kalesi', 'Aydos Kalesi', 'Edirne Kalesi', 'Belgrad'], correct: 1, exp: 'Orhan Bey döneminde Bizans\'tan alınan Çimpe Kalesi, Osmanlı\'nın Rumeli\'deki ilk toprağıdır.' },
    { q: 'Haçlılarla yapılan ve Osmanlı\'nın Balkanlar\'daki hakimiyetini kesinleştiren II. Kosova Savaşı hangi padişah dönemindedir?', opts: ['I. Murat', 'Yıldırım Bayezid', 'Çelebi Mehmet', 'II. Murat', 'Fatih Sultan Mehmet'], correct: 3, exp: 'II. Kosova Savaşı (1448), II. Murat döneminde gerçekleşmiştir.' },
    { q: 'Osmanlı Devleti\'nde ilk gümüş para (akçe) hangi padişah döneminde bastırılmıştır?', opts: ['Osman Bey', 'Orhan Bey', 'I. Murat', 'Yıldırım Bayezid', 'Fatih Sultan Mehmet'], correct: 1, exp: 'İlk bakır para Osman Bey, ilk gümüş para (akçe) ise Orhan Bey döneminde bastırılmıştır.' },
    { q: 'İstanbul\'u kuşatan ilk Osmanlı padişahı aşağıdakilerden hangisidir?', opts: ['Osman Bey', 'Orhan Bey', 'I. Murat', 'Yıldırım Bayezid', 'II. Murat'], correct: 3, exp: 'İstanbul\'u ilk kuşatan Osmanlı padişahı Yıldırım Bayezid (I. Bayezid)\'dir.' },
  ];
  const d = pick(pool);
  return makeQuestion('tarih', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function kurtulusSavasi() {
  const pool = [
    { q: '"Manda ve himaye kabul edilemez" kararı hangi kongrede alınmıştır?', opts: ['Amasya Kongresi', 'Erzurum Kongresi', 'Sivas Kongresi', 'Balıkesir Kongresi', 'Alaşehir Kongresi'], correct: 2, exp: 'Sivas Kongresi\'nde (1919) manda ve himaye kesin olarak reddedilmiştir.' },
    { q: 'Misak-ı Millî kararları hangi kurul tarafından kabul edilmiştir?', opts: ['Erzurum Kongresi', 'Heyet-i Temsiliye', 'Son Osmanlı Mebusan Meclisi', 'TBMM', 'Amasya Görüşmeleri'], correct: 2, exp: 'Misak-ı Millî kararları 28 Ocak 1920\'de Son Osmanlı Mebusan Meclisi tarafından kabul edilmiştir.' },
    { q: 'Büyük Taarruz hangi meydan muharebesiyle sonuçlanmıştır?', opts: ['I. İnönü', 'II. İnönü', 'Sakarya', 'Başkomutanlık Meydan Muharebesi', 'Kütahya-Eskişehir'], correct: 3, exp: 'Büyük Taarruz Başkomutanlık Meydan Muharebesi (Dumlupınar) ile sonuçlanmıştır.' },
    { q: 'Amasya Genelgesi\'nde "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır" ifadesi hangi ilkeyi vurgular?', opts: ['İnkılapçılık', 'Millî egemenlik', 'Milliyetçilik', 'Batıcılık', 'Devletçilik'], correct: 1, exp: 'Bu ifade millî egemenlik ilkesini vurgulamaktadır.' },
    { q: 'Lozan Antlaşması hangi tarihte imzalanmıştır?', opts: ['30 Ekim 1918', '24 Temmuz 1923', '29 Ekim 1923', '3 Mart 1924', '20 Nisan 1924'], correct: 1, exp: 'Lozan Antlaşması 24 Temmuz 1923\'te imzalanmıştır.' },
    { q: 'TBMM\'nin açılmasından sonra düzenli ordunun kurulmasını zorunlu kılan gelişme nedir?', opts: ['İstanbul\'un işgali', 'Kuva-yı Millîye\'nin yetersiz kalması', 'Sevr Antlaşması', 'Saltanatın kaldırılması', 'Londra Konferansı'], correct: 1, exp: 'Kuva-yı Millîye\'nin düzensizliği ve düşman ilerleyişini durduramaması düzenli orduyu zorunlu kılmıştır.' },
    { q: 'Milli Mücadele döneminde Batı Cephesi komutanlığına kim atanmıştır?', opts: ['Mustafa Kemal Paşa', 'Kazım Karabekir Paşa', 'İsmet İnönü', 'Ali Fuat Cebesoy', 'Fevzi Çakmak'], correct: 3, exp: 'Sivas Kongresi\'nde Batı Cephesi Komutanlığı\'na Ali Fuat Paşa atanmıştır.' },
    { q: 'Fransa ile imzalanan ve Güney Cephesi\'ni kapatan antlaşma aşağıdakilerden hangisidir?', opts: ['Gümrü Antlaşması', 'Moskova Antlaşması', 'Ankara Antlaşması (1921)', 'Kars Antlaşması', 'Mudanya Mütarekesi'], correct: 2, exp: 'Sakarya Meydan Muharebesi\'nden sonra Fransa ile 1921 Ankara Antlaşması imzalanmış ve Güney Cephesi kapanmıştır.' },
    { q: 'Doğu Cephesi komutanı olarak Ermenilere karşı başarılı mücadele veren komutan kimdir?', opts: ['Mustafa Kemal Paşa', 'İsmet Paşa', 'Fevzi Çakmak', 'Kazım Karabekir', 'Refet Bele'], correct: 3, exp: 'Doğu Cephesi\'nde XV. Kolordu Komutanı Kazım Karabekir görev yapmıştır.' },
    { q: 'Tekalif-i Milliye Emirleri hangi savaştan önce ordunun ihtiyaçlarını karşılamak için çıkarılmıştır?', opts: ['I. İnönü', 'II. İnönü', 'Sakarya Meydan Muharebesi', 'Büyük Taarruz', 'Kütahya-Eskişehir'], correct: 2, exp: 'Tekalif-i Milliye Emirleri, Kütahya-Eskişehir Savaşları\'ndan sonra, Sakarya Meydan Muharebesi öncesinde çıkarılmıştır.' }
  ];
  const d = pick(pool);
  return makeQuestion('tarih', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function inkilap() {
  const pool = [
    { q: 'Türk Medeni Kanunu hangi ülkenin medeni kanunu örnek alınarak hazırlanmıştır?', opts: ['Fransa', 'Almanya', 'İtalya', 'İsviçre', 'İngiltere'], correct: 3, exp: 'Türk Medeni Kanunu (1926) İsviçre Medeni Kanunu örnek alınarak hazırlanmıştır.' },
    { q: 'Harf İnkılabı hangi yıl gerçekleştirilmiştir?', opts: ['1923', '1926', '1928', '1930', '1934'], correct: 2, exp: 'Harf İnkılabı 1 Kasım 1928\'de kabul edilmiştir.' },
    { q: 'Aşağıdakilerden hangisi Atatürk\'ün toplumsal alanda yaptığı inkılaplardan biri değildir?', opts: ['Şapka Kanunu', 'Tekke ve zaviyelerin kapatılması', 'Soyadı Kanunu', 'Medeni Kanun\'un kabulü', 'Kabotaj Kanunu'], correct: 4, exp: 'Kabotaj Kanunu denizcilik ve ekonomi alanında yapılan bir inkılaptır.' },
    { q: 'Türk kadınına milletvekili seçme ve seçilme hakkı hangi yıl verilmiştir?', opts: ['1926', '1930', '1933', '1934', '1935'], correct: 3, exp: 'Kadınlara milletvekili seçme ve seçilme hakkı 5 Aralık 1934\'te tanınmıştır.' },
    { q: 'Saltanat hangi tarihte kaldırılmıştır?', opts: ['23 Nisan 1920', '1 Kasım 1922', '29 Ekim 1923', '3 Mart 1924', '10 Nisan 1928'], correct: 1, exp: 'Saltanat 1 Kasım 1922\'de kaldırılmıştır.' },
    { q: 'Teşvik-i Sanayi Kanunu hangi alandaki inkılaplar kapsamındadır?', opts: ['Siyasi', 'Toplumsal', 'Hukuk', 'Ekonomi', 'Kültür'], correct: 3, exp: 'Teşvik-i Sanayi Kanunu (1927) sanayiyi geliştirmek için ekonomik alanda çıkarılmıştır.' },
    { q: 'Eğitim ve öğretimde birliği sağlamak amacıyla çıkarılan kanun aşağıdakilerden hangisidir?', opts: ['Maarif Teşkilatı Hakkında Kanun', 'Tevhid-i Tedrisat Kanunu', 'Harf İnkılabı', 'Üniversite Reformu', 'Millet Mekteplerinin açılması'], correct: 1, exp: '3 Mart 1924\'te çıkarılan Tevhid-i Tedrisat Kanunu ile eğitim ve öğretim birleştirilmiştir.' },
    { q: 'Hafta tatilinin Cuma gününden Pazar gününe alınması Atatürk ilkelerinden en çok hangisiyle ilgilidir?', opts: ['Milliyetçilik', 'Halkçılık', 'Devletçilik', 'İnkılapçılık', 'Laiklik'], correct: 3, exp: 'Takvim, saat, ölçü ve hafta tatilindeki değişiklikler Batı\'ya uyum sağlamak amacıyla yapıldığı için İnkılapçılık ilkesiyle doğrudan ilgilidir.' },
    { q: 'Aşar vergisinin kaldırılması Atatürk\'ün hangi ilkesinin doğrudan bir gereğidir?', opts: ['Cumhuriyetçilik', 'Laiklik', 'Halkçılık', 'Devletçilik', 'İnkılapçılık'], correct: 2, exp: 'Çiftçinin üzerindeki yükü hafifleten Aşar vergisinin kaldırılması, sosyal adaleti sağladığı için Halkçılık ilkesiyle ilgilidir.' }
  ];
  const d = pick(pool);
  return makeQuestion('tarih', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

// ─── Coğrafya ────────────────────────────────────────────────────────────────

function iklim() {
  const pool = [
    { q: 'Akdeniz ikliminin doğal bitki örtüsü aşağıdakilerden hangisidir?', opts: ['Orman', 'Bozkır', 'Maki', 'Çayır', 'Tundra'], correct: 2, exp: 'Akdeniz ikliminin bitki örtüsü, kısa boylu ağaççıklar olan makidir.' },
    { q: 'Türkiye\'de en fazla yağış alan bölge aşağıdakilerden hangisidir?', opts: ['İç Anadolu', 'Güneydoğu Anadolu', 'Doğu Anadolu', 'Karadeniz', 'Ege'], correct: 3, exp: 'Karadeniz Bölgesi her mevsim yağış alan tek bölge olarak Türkiye\'de en fazla yağış alan yerdir.' },
    { q: 'Aşağıdakilerden hangisi atmosferin katmanlarından biri değildir?', opts: ['Troposfer', 'Stratosfer', 'Termosfer', 'Mezosfer', 'Litosfer'], correct: 4, exp: 'Litosfer (taş küre) yerkürenin bir katmanıdır, atmosfer katmanı değildir.' },
    { q: 'Türkiye\'de iklim çeşitliliğinin nedenlerinden biri aşağıdakilerden hangisi değildir?', opts: ['Üç tarafının denizlerle çevrili olması', 'Dağların uzanış doğrultusu', 'Yer şekillerinin çeşitliliği', 'Toprak tiplerinin farklılığı', 'Enlem farklılıkları'], correct: 3, exp: 'Toprak tiplerinin farklılığı iklimin bir sonucudur, nedeni değildir.' },
    { q: 'Yeryüzünde sıcaklığın dağılışını etkileyen temel faktör aşağıdakilerden hangisidir?', opts: ['Rüzgârlar', 'Okyanus akıntıları', 'Enlem', 'Kara ve deniz dağılışı', 'Yükselti'], correct: 2, exp: 'Sıcaklık dağılışını etkileyen en temel faktör, güneş ışınlarının geliş açısını belirleyen enlemdir.' },
    { q: 'Türkiye\'de Akdeniz ikliminin görüldüğü alanlar için hangisi söylenebilir?', opts: ['Kış sıcaklıkları 0°C altındadır', 'Yıllık yağış her yerde aynıdır', 'Yaz kuraklığı belirgindir', 'Kar yağışı hiç görülmez', 'Bitki örtüsü ormandır'], correct: 2, exp: 'Akdeniz ikliminde yazlar sıcak ve kurak, kışlar ılık ve yağışlıdır.' },
    { q: 'Karasal iklimin en belirgin özelliklerinden biri aşağıdakilerden hangisidir?', opts: ['Her mevsim yağışlı olması', 'Yıllık sıcaklık farkının yüksek olması', 'Bitki örtüsünün maki olması', 'Kışların ılık geçmesi', 'Bağıl nemin yüksek olması'], correct: 1, exp: 'Karasal iklimde denizellik etkisi olmadığı için günlük ve yıllık sıcaklık farkları çok yüksektir.' },
    { q: 'Muson ikliminin en fazla görüldüğü kıta aşağıdakilerden hangisidir?', opts: ['Avrupa', 'Afrika', 'Güney Amerika', 'Asya', 'Avustralya'], correct: 3, exp: 'Muson iklimi, Güneydoğu Asya (Hindistan, Çin, Japonya) kıyılarında belirgindir.' },
  ];
  const d = pick(pool);
  return makeQuestion('cografya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function topografya() {
  const pool = [
    { q: 'Aşağıdakilerden hangisi iç kuvvetlerden biri değildir?', opts: ['Orojenez', 'Epirojenez', 'Volkanizma', 'Erozyon', 'Deprem'], correct: 3, exp: 'Erozyon, akarsu, rüzgar gibi etkenlerle oluşan bir dış kuvvettir.' },
    { q: 'Türkiye\'deki dağlar ağırlıklı olarak hangi orojenez döneminde oluşmuştur?', opts: ['Kaledonya', 'Kaledoniyen', 'Heresinyen', 'Alp-Himalaya', 'Kambriyen'], correct: 3, exp: 'Türkiye\'deki Toroslar ve Kuzey Anadolu Dağları, III. Jeolojik Zaman\'daki Alp-Himalaya kıvrım sistemine aittir.' },
    { q: 'Aşağıdaki kıyı tiplerinden hangisi Türkiye\'de görülmez?', opts: ['Boyuna kıyılar', 'Enine kıyılar', 'Ria tipi kıyılar', 'Fiyort tipi kıyılar', 'Dalmaçya tipi kıyılar'], correct: 3, exp: 'Fiyort tipi kıyılar buzulların etkisiyle oluşur ve kutuplara yakın bölgelerde (örn. Norveç) görülür.' },
    { q: 'Karstik aşınım şekilleri hangi kayaç türünde daha çok yaygındır?', opts: ['Granit', 'Bazalt', 'Kumtaşı', 'Kireç taşı', 'Mermer'], correct: 3, exp: 'Karstik şekiller (lapya, dolin, obruk vb.) kolay eriyebilen kireç taşı (kalker) arazilerinde oluşur.' },
    { q: 'Türkiye\'nin en yüksek dağı aşağıdakilerden hangisidir?', opts: ['Erciyes', 'Süphan', 'Ağrı Dağı', 'Demirkazık', 'Uludağ'], correct: 2, exp: 'Ağrı Dağı (5137 m) Türkiye\'nin en yüksek dağıdır.' },
    { q: 'Kıtaların yükselip alçalması şeklindeki geniş alanlı yer kabuğu hareketlerine ne ad verilir?', opts: ['Orojenez', 'Epirojenez', 'Seizma', 'Volkanizma', 'Faylanma'], correct: 1, exp: 'Epirojenez (kıta oluşumu), yer kabuğunun geniş alanlı yaylanma hareketleridir.' },
    { q: 'Akarsuların taşıdığı malzemeleri denize döküldükleri yerde biriktirmesiyle oluşan ovalara ne ad verilir?', opts: ['Karstik ova', 'Tektonik ova', 'Delta ovası', 'Volkanik ova', 'Buzul ovası'], correct: 2, exp: 'Delta ovaları (örneğin Çukurova, Bafra), akarsuların getirdiği alüvyonların deniz kıyısında birikmesiyle oluşur.' }
  ];
  const d = pick(pool);
  return makeQuestion('cografya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function nufus() {
  const pool = [
    { q: 'Türkiye\'de nüfus yoğunluğunun en fazla olduğu bölge hangisidir?', opts: ['Ege', 'Marmara', 'Akdeniz', 'İç Anadolu', 'Karadeniz'], correct: 1, exp: 'Marmara Bölgesi, sanayi, ticaret ve ulaşım imkanları nedeniyle en yoğun nüfuslu bölgedir.' },
    { q: 'Nüfus piramidinin dar tabanlı olması aşağıdakilerden hangisini gösterir?', opts: ['Doğum oranının yüksek olduğunu', 'Doğum oranının düşük olduğunu', 'Ölüm oranının düşük olduğunu', 'Göç alındığını', 'Yaşam süresinin uzun olduğunu'], correct: 1, exp: 'Dar tabanlı nüfus piramidi, genç nüfus oranının ve doğum oranlarının düşük olduğunu gösterir.' },
    { q: 'Türkiye\'de ilk sistemli nüfus sayımı hangi yıl yapılmıştır?', opts: ['1923', '1927', '1935', '1940', '1945'], correct: 1, exp: 'Cumhuriyet döneminin ilk nüfus sayımı 1927 yılında yapılmıştır.' },
    { q: 'Türkiye\'de iç göçlerin en önemli nedeni aşağıdakilerden hangisidir?', opts: ['Eğitim', 'İklim', 'Ekonomik nedenler', 'Kültürel etkinlikler', 'Sağlık hizmetleri'], correct: 2, exp: 'İş bulma umudu ve daha iyi yaşam koşulları arayışı (ekonomik nedenler) iç göçlerin temel sebebidir.' },
    { q: 'Bir ülkede aritmetik nüfus yoğunluğunu bulmak için aşağıdakilerden hangisine ihtiyaç vardır?', opts: ['Nüfus artış hızı ve toplam nüfus', 'Toplam nüfus ve yüz ölçümü', 'Tarım alanları ve tarımsal nüfus', 'Doğum ve ölüm oranları', 'Şehir ve kır nüfusu'], correct: 1, exp: 'Aritmetik nüfus yoğunluğu, toplam nüfusun toplam yüz ölçümüne bölünmesiyle bulunur.' },
    { q: 'Gelişmiş ülkelerin nüfus özellikleri ile ilgili hangisi yanlıştır?', opts: ['Ortalama yaşam süresi uzundur', 'Doğum oranları düşüktür', 'Yaşlı nüfus oranı düşüktür', 'Eğitim seviyesi yüksektir', 'Kentsel nüfus oranı fazladır'], correct: 2, exp: 'Gelişmiş ülkelerde sağlık koşulları iyi olduğu için ortalama yaşam süresi uzun, yaşlı nüfus oranı yüksektir.' }
  ];
  const d = pick(pool);
  return makeQuestion('cografya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function harita() {
  const pool = [
    { q: '1/500.000 ölçekli bir haritada iki şehir arası 8 cm ise gerçek mesafe kaç km\'dir?', opts: ['20 km', '30 km', '40 km', '50 km', '60 km'], correct: 2, exp: 'Gerçek Uzaklık = Harita Uzunluğu × Ölçek Paydası = 8 × 500.000 cm = 4.000.000 cm = 40 km.' },
    { q: 'Türkiye Dünya üzerinde hangi yarımkürelerde yer alır?', opts: ['Kuzey ve Doğu', 'Kuzey ve Batı', 'Güney ve Doğu', 'Güney ve Batı', 'Ekvator üzerinde'], correct: 0, exp: 'Türkiye, Ekvator\'un kuzeyinde (Kuzey Yarımküre) ve Başlangıç Meridyeni\'nin doğusunda (Doğu Yarımküre) yer alır.' },
    { q: 'Büyük ölçekli haritalarla ilgili aşağıdakilerden hangisi doğrudur?', opts: ['Ayrıntıyı gösterme gücü azdır', 'Ölçek paydası küçüktür', 'Geniş alanları gösterir', 'Küçültme oranı fazladır', 'Hata payı yüksektir'], correct: 1, exp: 'Büyük ölçekli haritalarda ölçek paydası küçük, küçültme oranı az ve ayrıntı fazladır.' },
    { q: 'Türkiye\'nin en kuzey noktası aşağıdakilerden hangisidir?', opts: ['Sinop (İnceburun)', 'İstanbul (Rumelifeneri)', 'Kastamonu', 'Samsun', 'Zonguldak'], correct: 0, exp: 'Türkiye\'nin en kuzey ucu Sinop ilindeki İnceburun\'dur (42° 06\' Kuzey enlemi).' },
    { q: 'Fiziki haritalarda yükselti basamaklarını göstermek için kullanılan yönteme ne ad verilir?', opts: ['Tarama', 'Gölgelendirme', 'Kabartma', 'Renklendirme', 'İzohips (Eş yükselti)'], correct: 3, exp: 'Fiziki haritalarda yükseltiler yeşil, sarı, kahverengi gibi renklerle (renklendirme yöntemi) gösterilir.' },
    { q: 'Eş yükselti (izohips) eğrilerinin birbirine çok yaklaştığı yerler için hangisi söylenebilir?', opts: ['Eğim azdır', 'Yükselti azdır', 'Eğim fazladır', 'Deniz seviyesindedir', 'Düzlüktür'], correct: 2, exp: 'İzohipslerin sıklaştığı yerlerde eğim dik, seyrekleştiği yerlerde eğim azdır.' }
  ];
  const d = pick(pool);
  return makeQuestion('cografya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

// ─── Felsefe ─────────────────────────────────────────────────────────────────

function varlikFelsefesi() {
  const pool = [
    { q: 'Varlığın ana maddesinin "su" olduğunu savunan filozof hangisidir?', opts: ['Anaksimenes', 'Thales', 'Anaksimandros', 'Herakleitos', 'Empedokles'], correct: 1, exp: 'Thales, evrendeki her şeyin temel maddesinin (arkhe) su olduğunu savunmuştur.' },
    { q: 'İdealizme göre varlıkla ilgili hangisi doğrudur?', opts: ['Varlık maddeden ibarettir', 'Varlığın özü düşüncedir', 'Varlık hem madde hem düşüncedir', 'Varlık duyularla algılanamaz', 'Varlık yoktur'], correct: 1, exp: 'İdealizme göre gerçek varlık maddesel değil, zihinsel veya düşünseldir (idea).' },
    { q: '"Aynı nehirde iki kez yıkanılmaz" diyerek evrende sürekli bir değişim olduğunu savunan filozof hangisidir?', opts: ['Parmenides', 'Zenon', 'Herakleitos', 'Demokritos', 'Anaksagoras'], correct: 2, exp: 'Herakleitos, varlığın sürekli bir oluş ve değişim içinde olduğunu bu sözüyle ifade etmiştir.' },
    { q: 'Varlığın temelini bölünemez en küçük yapı taşı olan "atom" olarak kabul eden filozof hangisidir?', opts: ['Sokrates', 'Platon', 'Aristoteles', 'Demokritos', 'Epikuros'], correct: 3, exp: 'Demokritos, evrenin atomlardan ve boşluktan oluştuğunu savunan ilk materyalist filozoflardandır.' },
    { q: '"Düşünüyorum, öyleyse varım" (Cogito ergo sum) sözü hangi akımın temelini oluşturur?', opts: ['Empirizm', 'Rasyonalizm', 'Nihilizm', 'Pragmatizm', 'Materyalizm'], correct: 1, exp: 'Rene Descartes\'ın bu sözü, bilginin kaynağını akılda gören rasyonalizmin temel taşlarındandır.' },
    { q: 'Hiçbir şeyin var olmadığını, var olsa bile bilinemeyeceğini savunan felsefi akım hangisidir?', opts: ['Nihilizm', 'Egzistansiyalizm', 'Realizm', 'Materyalizm', 'Dualizm'], correct: 0, exp: 'Gorgias\'ın temsilcisi olduğu nihilizm (hiççilik), varlığın gerçekliğini reddeder.' },
    { q: 'Varlığı hem madde hem de ruh olarak iki ayrı töz şeklinde açıklayan görüşe ne ad verilir?', opts: ['Monizm', 'Plüralizm', 'İdealizm', 'Dualizm', 'Fenomenoloji'], correct: 3, exp: 'Descartes tarafından savunulan dualizm (ikicilik), varlığı madde ve ruh olmak üzere iki temel ilkeyle açıklar.' }
  ];
  const d = pick(pool);
  return makeQuestion('felsefe', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function bilgiFelsefesi() {
  const pool = [
    { q: '"Doğru bilgi mümkün değildir" görüşünü savunan akım hangisidir?', opts: ['Rasyonalizm', 'Empirizm', 'Septisizm', 'Pozitivizm', 'Entüisyonizm'], correct: 2, exp: 'Septisizm (kuşkuculuk), insan zihninin kesin ve mutlak bir doğruya ulaşamayacağını savunur.' },
    { q: 'İnsan zihninin doğuştan boş bir levha (Tabula Rasa) olduğunu ve bilginin deneyimlerle sonradan kazanıldığını savunan akım hangisidir?', opts: ['Rasyonalizm', 'Empirizm', 'Kritisizm', 'Septisizm', 'Pragmatizm'], correct: 1, exp: 'John Locke tarafından savunulan empirizm, tüm bilgilerin kaynağının duyum ve deneyim olduğunu ileri sürer.' },
    { q: 'Sokrates\'in, karşısındakine sorular sorarak onda doğuştan var olan bilgileri açığa çıkarma yöntemine ne ad verilir?', opts: ['Tümevarım', 'Analitik yöntem', 'Diyalektik (Maiotik) yöntem', 'Fenomenolojik yöntem', 'Deneysel yöntem'], correct: 2, exp: 'Sokrates\'in "doğurtma" (maiotik) adını verdiği bu diyalektik yöntem, sorularla doğruyu buldurmayı amaçlar.' },
    { q: 'Pragmatizm (faydacılık) bilginin doğruluğunu hangi ölçüte göre belirler?', opts: ['Tutarlılık', 'Uygunluk', 'Fayda ve işe yararlık', 'Sezgi', 'Vahiy'], correct: 2, exp: 'Pragmatizme (William James, John Dewey) göre bir bilgi günlük hayatta işe yarıyor ve problem çözüyorsa doğrudur.' },
    { q: 'Kant\'ın rasyonalizm ile empirizmi sentezleyerek oluşturduğu felsefi akım aşağıdakilerden hangisidir?', opts: ['Pozitivizm', 'Fenomenoloji', 'Kritisizm (Eleştirel Felsefe)', 'Analitik Felsefe', 'Egzistansiyalizm'], correct: 2, exp: 'Kant, bilginin kaynağı olarak hem aklı hem de deneyi kabul eden kritisizm (eleştirel felsefe) akımının kurucusudur.' },
    { q: 'Sadece bilimsel olarak kanıtlanabilen olguların doğru bilgi olduğunu savunan Auguste Comte\'un akımı nedir?', opts: ['Pozitivizm', 'Entüisyonizm', 'Mistisizm', 'Pragmatizm', 'Rasyonalizm'], correct: 0, exp: 'Pozitivizm (olguculuk), yalnızca deney ve gözleme dayalı bilimsel olguların gerçek bilgi olduğunu savunur.' }
  ];
  const d = pick(pool);
  return makeQuestion('felsefe', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function etik() {
  const pool = [
    { q: '"Mutluluk erdemli yaşamaktır" diyerek ahlakın amacını mutluluğa (eudaimonia) bağlayan filozof hangisidir?', opts: ['Sokrates', 'Platon', 'Aristoteles', 'Epikür', 'Diogenes'], correct: 2, exp: 'Aristoteles\'e göre insan eylemlerinin nihai amacı mutluluktur ve buna erdemli bir hayatla ulaşılır.' },
    { q: 'Kant\'ın ödev ahlakına göre bir eylemin ahlaki değeri neye bağlıdır?', opts: ['Sonuçlarına', 'Sağladığı faydaya', 'Niyet ve ödeve uygunluğuna', 'Toplumun onayına', 'Duygulara'], correct: 2, exp: 'Kant\'a göre bir eylem, sadece iyi niyetle ve ödev duygusuyla (ahlak yasasına saygıdan) yapıldığında ahlakidir.' },
    { q: 'Ahlaki eylemin amacının "en fazla sayıda insanın en büyük mutluluğu" olduğunu savunan akım hangisidir?', opts: ['Ödev Ahlakı', 'Utilitarianizm (Faydacılık)', 'Egoizm', 'Stoacılık', 'Hedonizm'], correct: 1, exp: 'Jeremy Bentham ve J.S. Mill\'in temsil ettiği faydacılık, toplumsal faydayı ahlakın temeli sayar.' },
    { q: 'İnsanın bencil bir doğaya sahip olduğunu ve "insanın insanın kurdu" (homo homini lupus) olduğunu savunan filozof kimdir?', opts: ['J.J. Rousseau', 'Thomas Hobbes', 'John Locke', 'David Hume', 'Karl Marx'], correct: 1, exp: 'Hobbes\'a göre insanlar doğası gereği bencildir ve devlet, bu doğa durumundaki çatışmayı önlemek için kurulmuştur.' },
    { q: 'Ahlaki eylemin amacını "haz" (zevk) olarak gören ve acıdan kaçmayı savunan İlk Çağ felsefi akımı hangisidir?', opts: ['Hedonizm (Hazcılık)', 'Kinizm', 'Stoacılık', 'Sofizm', 'Septisizm'], correct: 0, exp: 'Aristippos ve Epikuros gibi düşünürlerin savunduğu hedonizm, en yüksek iyinin haz olduğunu ileri sürer.' }
  ];
  const d = pick(pool);
  return makeQuestion('felsefe', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

// ─── Din Kültürü ─────────────────────────────────────────────────────────────

function inancEsaslari() {
  const pool = [
    { q: 'Aşağıdakilerden hangisi İslam\'ın inanç esaslarından (imanın şartlarından) biri değildir?', opts: ['Allah\'a iman', 'Peygamberlere iman', 'Namaz kılmak', 'Meleklere iman', 'Ahiret gününe iman'], correct: 2, exp: 'Namaz kılmak İslam\'ın şartıdır (ibadettir), imanın şartı değildir.' },
    { q: 'İslam\'da kader inancıyla ilgili aşağıdaki ifadelerden hangisi doğrudur?', opts: ['İnsanın eylemleri tamamen zorunludur.', 'Allah her şeyi bilir ve takdir eder, ancak insanın cüzi iradesi vardır.', 'Kader sadece kötü olayları kapsar.', 'İnsan iradesinin kader üzerinde hiçbir etkisi yoktur.', 'Kader inancı Kuran\'da yer almaz.'], correct: 1, exp: 'İslam\'da kader (külli irade) ile insanın özgür seçimi (cüzi irade) bir arada bulunur.' },
    { q: 'Dört büyük melekle görevleri eşleştirmelerinden hangisi yanlıştır?', opts: ['Cebrail - Vahiy', 'Mikâil - Doğa olayları', 'Azrail - Can alma', 'İsrafil - Rızık dağıtma', 'İsrafil - Sûr\'a üfleme'], correct: 3, exp: 'İsrafil\'in görevi kıyamette Sûr\'a üflemektir. Rızık dağıtımı ve doğa olayları Mikâil\'in görevidir.' },
    { q: '"Allah\'tan başka ilah yoktur, Muhammed O\'nun kulu ve elçisidir" anlamına gelen dini ifade hangisidir?', opts: ['Kelime-i Şehadet', 'Tekbir', 'Salavat', 'Kelime-i Tevhid', 'Besmele'], correct: 0, exp: 'Eşhedü en la ilahe illallah... ifadesi Kelime-i Şehadet\'tir.' },
    { q: 'Allah\'ın hiçbir şeye muhtaç olmaması, her şeyin O\'na muhtaç olması anlamına gelen sıfatı aşağıdakilerden hangisidir?', opts: ['Kıdem', 'Beka', 'Vahdaniyet', 'Kıyam bi-nefsihî', 'Muhalefetün lil-havadis'], correct: 3, exp: 'Kıyam bi-nefsihî, Allah\'ın var olmak için hiçbir şeye ihtiyaç duymaması demektir.' },
    { q: 'Peygamberlerin günah işlemekten korunmuş olmalarını ifade eden sıfatı aşağıdakilerden hangisidir?', opts: ['Sıdk', 'Emanet', 'İsmet', 'Fetanet', 'Tebliğ'], correct: 2, exp: 'İsmet sıfatı, peygamberlerin gizli ve açık her türlü günahtan korunmuş olmalarıdır.' }
  ];
  const d = pick(pool);
  return makeQuestion('din', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function ibadetler() {
  const pool = [
    { q: 'Günde beş vakit namaz kılınması, Hz. Muhammed\'in hangi mucizevi olayı sırasında farz kılınmıştır?', opts: ['Hicret', 'İsra ve Miraç', 'Bedir Savaşı', 'Mekke\'nin Fethi', 'Akabe Biatları'], correct: 1, exp: 'Beş vakit namaz, Hz. Peygamber\'in Mirac\'a yükseldiği gece farz kılınmıştır.' },
    { q: 'İslam dinine göre zekât verilecek malların nisap miktarına ulaştıktan sonra üzerinden ne kadar süre geçmesi gerekir?', opts: ['1 Ay', '6 Ay', '1 Kameri Yıl (Havl)', '2 Yıl', 'Süre sınırı yoktur'], correct: 2, exp: 'Zekâtın farz olabilmesi için malın nisap miktarına ulaşmasının üzerinden tam bir kameri yıl geçmesi gerekir.' },
    { q: 'Ramazan ayında tutulan orucun farz kılındığını bildiren ayet hangi surede yer almaktadır?', opts: ['Fatiha', 'Bakara', 'Al-i İmran', 'Nisa', 'Maide'], correct: 1, exp: 'Oruç ibadeti, Bakara Suresi 183. ayetle farz kılınmıştır.' },
    { q: 'Hac ibadetiyle ilgili aşağıdaki bilgilerden hangisi yanlıştır?', opts: ['İslam\'ın beş şartından biridir.', 'Ömürde bir kez yapılması farzdır.', 'Yalnızca zenginlere farzdır.', 'Senenin herhangi bir ayında yapılabilir.', 'İhrama girmek haccın farzlarındandır.'], correct: 3, exp: 'Hac ibadeti sadece belirli günlerde (Zilhicce ayı) yapılabilir. Diğer zamanlarda yapılan Kabe ziyaretine Umre denir.' },
    { q: 'Namazda ayakta durmaya ne ad verilir?', opts: ['Kıyam', 'Kıraat', 'Rüku', 'Secde', 'Kade-i Ahire'], correct: 0, exp: 'Namazın farzlarından (içindeki şartlar) olan Kıyam, ayakta durmak demektir.' },
    { q: 'Yolculuk, hastalık gibi durumlarda su bulunmadığında veya kullanılamadığında toprakla yapılan temizliğe ne ad verilir?', opts: ['Gusül', 'Abdest', 'Teyemmüm', 'İstinca', 'İstibra'], correct: 2, exp: 'Teyemmüm, suyun bulunmadığı durumlarda temiz toprakla alınan sembolik abdesttir.' }
  ];
  const d = pick(pool);
  return makeQuestion('din', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function ahlakSiyer() {
  const pool = [
    { q: 'Kur\'an-ı Kerim\'de Hz. Muhammed için kullanılan "Üsve-i Hasene" kavramı neyi ifade eder?', opts: ['Son peygamber olmasını', 'En güzel örnek olmasını', 'Okuma yazma bilmemesini', 'Arap toplumundan gelmesini', 'Mucizeler göstermesini'], correct: 1, exp: '"Üsve-i Hasene", inananlar için en güzel ve mükemmel örnek anlamına gelir.' },
    { q: 'Müslümanların Mekke\'den Medine\'ye gerçekleştirdikleri Hicret\'in (622) temel nedeni aşağıdakilerden hangisidir?', opts: ['Ticaret yollarını ele geçirmek', 'Mekke\'de artan baskı ve şiddetten kurtulup inançlarını özgürce yaşamak', 'Medine\'deki Yahudilerle savaşmak', 'Yeni tarım alanları bulmak', 'Siyasi bir devlet kurma hırsı'], correct: 1, exp: 'Hicretin temel amacı, müşriklerin dayanılmaz baskılarından kurtulup İslam\'ı özgürce yaşayabilmektir.' },
    { q: 'İslam ahlakında, kişinin sorumluluklarını bilmesi ve kendisine verilen şeyleri koruması anlamına gelen kavram hangisidir?', opts: ['Adalet', 'Emanet', 'Merhamet', 'Tevazu', 'İhsan'], correct: 1, exp: 'Emanet kavramı sadece eşyayı değil, görevleri, sırları ve bedeni koruma sorumluluğunu da içerir.' },
    { q: 'Hz. Muhammed\'e gençliğinde Mekkeliler tarafından verilen "Muhammedü\'l-Emin" lakabının sebebi nedir?', opts: ['Çok zengin ve soylu olması', 'Ticarette çok yetenekli olması', 'Son derece dürüst ve güvenilir olması', 'İyi bir asker olması', 'Çok ibadet etmesi'], correct: 2, exp: 'Hz. Muhammed, yalan söylememesi ve emanetleri koruması nedeniyle "el-Emin" (Güvenilir) lakabını almıştır.' },
    { q: 'Hz. Muhammed\'in Medine\'ye hicret ettikten sonra, Mekkeli muhacirler ile Medineli ensar arasında kurduğu kardeşlik bağına ne ad verilir?', opts: ['Medine Sözleşmesi', 'Akabe Biatı', 'Muahat', 'Hudeybiye Barışı', 'Veda Haccı'], correct: 2, exp: 'Muahat (Kardeşleşme), her bir muhacirin bir ensar ile kardeş ilan edilmesidir.' },
    { q: 'İslam ahlakında, yapılan bir iyiliği başa kakmamak ve gösterişten (riya) uzak durmak hangi erdemle ilgilidir?', opts: ['İhlas', 'Sabır', 'Cesaret', 'Cömertlik', 'Tevazu'], correct: 0, exp: 'İhlas, ibadetleri ve iyilikleri sadece Allah rızası için, gösterişten uzak yapmaktır.' }
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
  return generateUnique(() => {
    const tpl = pick(templates);
    return tpl();
  }, count);
}
