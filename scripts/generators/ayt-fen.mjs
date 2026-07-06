import { randInt, pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

const r = (a, b) => randInt(a, b);

// ─── Fizik ────────────────────────────────────────────────────────────────────

function templateTork() {
  const F = r(10, 50);
  const d = r(1, 5);
  const correct = F * d;
  const wrong = shuffle([F, d, F + d, correct + r(5, 15), correct - r(5, 15), F * (d + 1)].filter(v => v !== correct && v > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `Bir cisme ${F} N büyüklüğünde bir kuvvet, dönme noktasından ${d} m uzaklığa dik olarak uygulanıyor. Buna göre tork kaç N·m dir?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `Tork: $\\tau = F \\cdot d = ${F} \\cdot ${d} = ${correct}$ N·m.`);
}

function templateManyetizma() {
  const B = r(1, 5);
  const i = r(2, 10);
  const L = pick([0.5, 1, 1.5, 2]);
  const correct = B * i * L;
  if (correct % 1 !== 0 && correct * 10 % 1 !== 0) return null;
  const wrong = shuffle([B * i, B * L, i * L, B * i * (L + 0.5), (B + 1) * i * L].filter(v => v !== correct && v > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `$B = ${B}$ T manyetik alan içinde alana dik yerleştirilen $i = ${i}$ A akım taşıyan $L = ${L}$ m uzunluğundaki tele etki eden manyetik kuvvet kaç N dur?`,
    makeOptions(...all.map(v => `$${v}$ N`)),
    all.indexOf(correct),
    `$F = B \\cdot i \\cdot L = ${B} \\cdot ${i} \\cdot ${L} = ${correct}$ N.`);
}

function templateInduksiyon() {
  const B = r(1, 3);
  const L = r(1, 3);
  const v = r(2, 10);
  const correct = B * L * v;
  const wrong = shuffle([B * L, L * v, B * v, (B + 1) * L * v, B * L * (v + 1)].filter(vv => vv !== correct && vv > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `$B = ${B}$ T manyetik alan içinde alana dik hareket eden $L = ${L}$ m boyundaki bir iletkenin hızı $v = ${v}$ m/s ise uçları arasında indüklenen emk kaç V tur?`,
    makeOptions(...all.map(vv => `$${vv}$`)),
    all.indexOf(correct),
    `$\\varepsilon = B \\cdot L \\cdot v = ${B} \\cdot ${L} \\cdot ${v} = ${correct}$ V.`);
}

function templateBHH() {
  const q = pick([
    { q: 'Bir basit harmonik hareketlinin genliği A, periyodu T dir. Cismin denge konumundan geçerkenki maksimum hızı aşağıdakilerden hangisine eşittir?', a: '$\\frac{2\\pi A}{T}$', w: ['$\\frac{\\pi A}{T}$', '$\\frac{4\\pi A}{T}$', '$\\frac{2\\pi T}{A}$', '$\\frac{A}{T}$'], e: 'Maksimum hız $v_{max} = \\omega A = \\frac{2\\pi}{T} \\cdot A = \\frac{2\\pi A}{T}$ dir.' },
    { q: 'Bir yay sarkacının periyodu T dir. Yay sabiti 4 katına çıkarılırsa yeni periyot kaç T olur?', a: '$\\frac{T}{2}$', w: ['$2T$', '$4T$', '$\\frac{T}{4}$', '$T$'], e: '$T \\propto \\frac{1}{\\sqrt{k}}$ olduğundan k 4 katına çıkarsa $T\' = \\frac{T}{2}$ olur.' },
    { q: 'Bir basit sarkacın boyu 4 katına çıkarılırsa periyodu nasıl değişir?', a: '2 katına çıkar', w: ['4 katına çıkar', 'yarıya iner', 'değişmez', '\\u221a2 katına çıkar'], e: '$T \\propto \\sqrt{L}$ olduğundan L 4 katına çıkarsa $T\' = 2T$ olur.' },
    { q: 'Bir basit harmonik harekette geri çağırıcı kuvvetin büyüklüğü aşağıdakilerden hangisiyle orantılıdır?', a: 'Uzanım', w: ['Hız', 'İvme', 'Genlik', 'Frekans'], e: 'Basit harmonik harekette $F = -kx$ olduğundan geri çağırıcı kuvvet uzanımla doğru orantılıdır.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('fizik',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(q.a),
    q.e);
}

function templateOptik() {
  const f = pick([10, 15, 20]);
  const d = pick([f + 5, f + 10, 2 * f, 3 * f]);
  const di = (f * d) / (d - f);
  if (di % 1 !== 0 && di * 10 % 1 !== 0) return null;
  const correct = Math.round(di * 10) / 10;
  const wrong = shuffle([(f * d) / (d + f), f, d, Math.round(correct * 1.5), Math.round(correct * 0.5)].filter(v => v !== correct && v > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `Odak uzaklığı ${f} cm olan ince kenarlı bir mercekte cismin merceğe uzaklığı ${d} cm ise görüntünün merceğe uzaklığı kaç cm dir?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i} \\implies \\frac{1}{${di}} = \\frac{1}{${f}} - \\frac{1}{${d}} \\implies d_i = ${correct}$ cm.`);
}

function templateOptikAyna() {
  const q = pick([
    { q: 'Çukur aynada tıpkı odak ile merkez arasına konulan bir cismin görüntüsü için aşağıdakilerden hangisi doğrudur?', a: 'Gerçek, ters ve büyük', w: ['Gerçek, ters ve küçük', 'Sanal, düz ve büyük', 'Sanal, düz ve küçük', 'Gerçek, düz ve büyük'], e: 'Çukur aynada cisim F ile M arasında ise görüntü gerçek, ters ve büyüktür.' },
    { q: 'Düz aynada oluşan görüntü için aşağıdakilerden hangisi yanlıştır?', a: 'Tersdir', w: ['Sanaldır', 'Düzdür', 'Boyu cismin boyuna eşittir', 'Simetriktir'], e: 'Düz aynada görüntü sanal, düz, ters değil ve cisimle simetriktir.' },
    { q: 'Odak uzaklığı f olan tümsek aynaya gelen ışınlar için aşağıdakilerden hangisi doğrudur?', a: 'Görüntü daima sanaldır', w: ['Görüntü daima gerçektir', 'Odak uzaklığı pozitiftir', 'Görüntü ters oluşur', 'Merkezde gerçek görüntü oluşur'], e: 'Tümsek aynada görüntü daima sanaldır. Odak uzaklığı negatiftir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('fizik',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`),
    all.indexOf(q.a),
    q.e);
}

// ─── Kimya ────────────────────────────────────────────────────────────────────

function templateOrganik() {
  const q = pick([
    { q: 'Aşağıdakilerden hangisi bir alkoldür?', a: 'CH₃CH₂OH', w: ['CH₃OCH₃', 'CH₃CHO', 'CH₃COOH', 'CH₃COCH₃'], e: 'CH₃CH₂OH (etanol) bir alkol olup -OH fonksiyonel grubuna sahiptir.' },
    { q: 'Aşağıdaki fonksiyonel gruplardan hangisi karbonil (C=O) içermez?', a: 'Alkol', w: ['Aldehit', 'Keton', 'Karboksilik asit', 'Ester'], e: 'Alkoller -OH grubuna sahiptir, C=O içermezler.' },
    { q: 'Aromatik hidrokarbon aşağıdakilerden hangisidir?', a: 'C₆H₆', w: ['C₂H₆', 'C₃H₈', 'C₄H₁₀', 'C₅H₁₂'], e: 'Benzen (C₆H₆) aromatik hidrokarbondur ve halka yapısına sahiptir.' },
    { q: 'Aşağıdakilerden hangisi bir esterdir?', a: 'CH₃COOCH₂CH₃', w: ['CH₃CH₂COOH', 'CH₃CH₂CHO', 'CH₃COCH₃', 'CH₃CH₂OH'], e: 'CH₃COOCH₂CH₃ (etil asetat) bir esterdir. Esterler -COO- grubu içerir.' },
    { q: 'Aşağıdakilerden hangisi doymamış hidrokarbondur?', a: 'C₂H₄', w: ['CH₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀'], e: 'C₂H₄ (eten) ikili bağ içerdiğinden doymamış hidrokarbondur.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('kimya',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`),
    all.indexOf(q.a),
    q.e);
}

function templateTepkimeHizi() {
  const q = pick([
    { q: 'Bir tepkimenin hız sabiti k ve derişimler [A], [B] olmak üzere hız = k[A][B]² şeklindedir. Tepkimenin mertebesi kaçtır?', a: '3', w: ['1', '2', '4', '5'], e: 'Hız bağıntısında üsler toplamı: $1 + 2 = 3$ olduğundan tepkime 3. mertebedendir.' },
    { q: 'Sıcaklık 10°C artırıldığında bir tepkimenin hızı 2 katına çıkıyorsa sıcaklık 30°C artırıldığında hız kaç katına çıkar?', a: '8', w: ['2', '4', '6', '16'], e: 'Her 10°C\'de 2 kat artarsa 30°C\'de $2^3 = 8$ katına çıkar.' },
    { q: 'Bir tepkimede sıcaklık artışı ile aşağıdakilerden hangisi kesinlikle artar?', a: 'Birim zamandaki çarpışma sayısı', w: ['Aktifleşme enerjisi', 'Denge sabiti', 'Verim', 'Derişim'], e: 'Sıcaklık artarsa moleküllerin ortalama kinetik enerjisi artar, çarpışma sayısı artar.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('kimya',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(q.a),
    q.e);
}

function templateDenge() {
  const q = pick([
    { q: '$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$ tepkimesi için $K_c = \\frac{[NH_3]^2}{[N_2][H_2]^3}$ tür. Aynı tepkimenin $K_p$ ile $K_c$ arasındaki ilişki aşağıdakilerden hangisidir?', a: '$K_p = K_c(RT)^{-2}$', w: ['$K_p = K_c(RT)^{2}$', '$K_p = K_c(RT)^{-1}$', '$K_p = K_cRT$', '$K_p = K_c$'], e: '$\\Delta n = 2 - (1 + 3) = -2$ olduğundan $K_p = K_c(RT)^{-2}$ dir.' },
    { q: 'Denge halindeki bir sisteme dışarıdan ürün eklenirse sistem nasıl tepki verir?', a: 'Girenler yönüne kayar', w: ['Ürünler yönüne kayar', 'Denge bozulmaz', 'Sıcaklık artar', 'Basınç artar'], e: 'Le Chatelier prensibine göre sistem eklenen maddenin derişimini azaltacak yönde hareket eder, yani girenler yönüne kayar.' },
    { q: 'Denge sabiti K sıcaklıktan bağımsız mıdır?', a: 'Hayır, sıcaklıkla değişir', w: ['Evet', 'Yalnızca gaz fazında değişir', 'Yalnızca sıvı fazda değişir', 'Basınçla değişir'], e: 'Denge sabiti K sadece sıcaklığa bağlıdır, derişim ve basınç değişimlerinden etkilenmez.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('kimya',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(q.a),
    q.e);
}

function templateElektrokimya() {
  const q = pick([
    { q: 'Aşağıdakilerden hangisi bir elektrokimyasal hücrede anotta gerçekleşen olaydır?', a: 'Yükseltgenme', w: ['İndirgenme', 'Nötralleşme', 'Çökelme', 'Asit-baz tepkimesi'], e: 'Anotta yükseltgenme (oksidasyon) gerçekleşir, elektronlar devreye verilir.' },
    { q: 'Bir galvanik hücrede aşağıdakilerden hangisi doğrudur?', a: 'Kimyasal enerji elektrik enerjisine dönüşür', w: ['Elektrik enerjisi kimyasal enerjiye dönüşür', 'Anot (+) kutuptur', 'Katot (-) kutuptur', 'Elektronlar dış devrede katottan anoda gider'], e: 'Galvanik hücrede kendiliğinden gerçekleşen redoks tepkimesi ile kimyasal enerji elektrik enerjisine dönüşür.' },
    { q: 'Elektrolizde katotta hangi olay gerçekleşir?', a: 'İndirgenme', w: ['Yükseltgenme', 'Nötralleşme', 'Süblimleşme', 'Buharlaşma'], e: 'Elektrolizde katotta indirgenme gerçekleşir, elektronlar katoda gelir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('kimya',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`),
    all.indexOf(q.a),
    q.e);
}

function templateCozunurluk() {
  const q = pick([
    { q: 'Aşağıdakilerden hangisi çözünürlü\\ğü artırır?', a: 'Sıcaklı\\ğı artırmak (katılar için)', w: ['Sıcaklı\\ğı azaltmak', 'Basıncı artırmak', 'Çözeltiyi karı\\ştırmak', 'Ortak iyon eklemek'], e: 'Ço\\ğu katının çözünürlü\\ğü sıcaklıkla artar. Karıştırma çözünme hızını artırır ancak çözünürlü\\ğü etkilemez.' },
    { q: '$AgCl$ katısının çözünürlük çarpımı ($K_{çç}$) aşağıdakilerden hangisidir?', a: '$[Ag^+][Cl^-]$', w: ['$[Ag^+][Cl^-]^2$', '$[Ag^+]^2[Cl^-]$', '$\\frac{[Ag^+]}{[Cl^-]}$', '$[AgCl]$'], e: '$AgCl(k) \\rightleftharpoons Ag^+(aq) + Cl^-(aq)$ için $K_{çç} = [Ag^+][Cl^-]$ dir.' },
    { q: 'Ortak iyon etkisi ile ilgili aşağıdakilerden hangisi doğrudur?', a: 'Çözünürlü\\ğü azaltır', w: ['Çözünürlü\\ğü artırır', 'Çözünürlü\\ğü etkilemez', 'Yalnızca bazlar için geçerlidir', 'Yalnızca asitler için geçerlidir'], e: 'Ortak iyon etkisi, az çözünen tuzun çözünürlü\\ğünü azaltır (Le Chatelier prensibi).' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('kimya',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(q.a),
    q.e);
}

// ─── Biyoloji ─────────────────────────────────────────────────────────────────

function templateFotosentez() {
  const q = pick([
    { q: 'Fotosentezin ışa ba\\ğımlı tepkimelerinde aşağıdakilerden hangisi üretilir?', a: 'ATP ve NADPH', w: ['Glikoz ve CO₂', 'CO₂ ve H₂O', 'ATP ve glikoz', 'NADPH ve glikoz'], e: 'Işa ba\\ğımlı tepkimelerde ATP ve NADPH üretilir. Bu moleküller Calvin döngüsünde kullanılır.' },
    { q: 'Fotosentezin ıştan ba\\ğımsız tepkimeleri (Calvin döngüsü) nerede gerçekleşir?', a: 'Stroma', w: ['Granum', 'Tilakoid zar', 'Klorofil', 'Mitokondri'], e: 'Calvin döngüsü kloroplastın stromasında gerçekleşir.' },
    { q: 'Fotosentez hızını sınırlandıran faktörler arasında aşağıdakilerden hangisi yer almaz?', a: 'Mitokondri sayısı', w: ['CO₂ derişimi', 'Işık şiddeti', 'Sıcaklık', 'Su miktarı'], e: 'Fotosentez hızını CO₂, ışık, sıcaklık ve su etkiler. Mitokondri sayısı solunumla ilgilidir.' },
    { q: 'Fotosentezde açığa çıkan oksijen nereden gelir?', a: 'Sudan (H₂O)', w: ['CO₂\'den', 'Glikozdan', 'Klorofilden', 'ATP\'den'], e: 'Fotosentezin ışa ba\\ğımlı tepkimelerinde suyun fotolizi ile oksijen açığa çıkar.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('biyoloji',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`),
    all.indexOf(q.a),
    q.e);
}

function templateSolunum() {
  const q = pick([
    { q: 'Oksijenli solunumda en fazla ATP hangi evrede üretilir?', a: 'Elektron taşıma sistemi', w: ['Glikoliz', 'Krebs döngüsü', 'Glikoliz ve Krebs döngüsü', 'Hazırlık evresi'], e: 'Elektron taşıma sisteminde (oksidatif fosforilasyon) 32-34 ATP üretilir.' },
    { q: 'Glikoliz evresi nerede gerçekleşir?', a: 'Sitoplazma', w: ['Mitokondri iç zarı', 'Mitokondri matriksi', 'Kloroplast', 'Çekirdek'], e: 'Glikoliz, oksijenli veya oksijensiz tüm canlılarda sitoplazmada gerçekleşir.' },
    { q: 'Oksijensiz solunum (fermentasyon) sonucu aşağıdakilerden hangisi oluşur?', a: '2 ATP ve etil alkol veya laktik asit', w: ['36 ATP ve CO₂', '2 ATP ve oksijen', '38 ATP ve su', '4 ATP ve asetaldehit'], e: 'Fermentasyonda net 2 ATP kazanılır ve son ürün olarak etil alkol veya laktik asit oluşur.' },
    { q: 'Krebs döngüsünde aşağıdakilerden hangisi üretilmez?', a: 'Oksijen', w: ['CO₂', 'NADH', 'FADH₂', 'ATP'], e: 'Krebs döngüsünde CO₂, NADH, FADH₂ ve az miktarda ATP üretilir. Oksijen üretilmez.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('biyoloji',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`),
    all.indexOf(q.a),
    q.e);
}

function templateNoron() {
  const q = pick([
    { q: 'Bir nöronda impuls iletimi sırasında aşağıdakilerden hangisi gerçekleşir?', a: 'Na⁺ iyonları hücre içine girer', w: ['K⁺ iyonları hücre içine girer', 'Ca²⁺ iyonları hücre dışına çıkar', 'Cl⁻ iyonları hücre içine girer', 'Mg²⁺ iyonları taşınır'], e: 'Depolarizasyon sırasında Na⁺ kanalları açılır ve Na⁺ hücre içine girer.' },
    { q: 'Sinapslarda impuls iletimi sırasında aşağıdakilerden hangisi rol oynar?', a: 'Nörotransmitter maddeler', w: ['Myelin kılıf', 'Ranvier boğumu', 'Akson', 'Dendrit'], e: 'Sinapslarda impuls iletimi, nörotransmitter maddeler (ör. asetilkolin) aracılı\\ğıyla sa\\ğlanır.' },
    { q: 'Ranvier bo\\ğumlarının işlevi aşağıdakilerden hangisidir?', a: 'İmpuls iletimini hızlandırmak', w: ['Nörotransmitter üretmek', 'Hücreyi beslemek', 'Sinaps oluşturmak', 'Myelin üretmek'], e: 'Ranvier boğumları miyelinli nöronlarda sıçramalı iletim sa\\ğlayarak impuls hızını artırır.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('biyoloji',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`),
    all.indexOf(q.a),
    q.e);
}

function templateDNA() {
  const q = pick([
    { q: 'DNA replikasyonu (eşlenmesi) ile ilgili aşağıdakilerden hangisi yanlıştır?', a: 'Yeni DNA zinciri 3\' → 5\' yönünde sentezlenir', w: ['DNA polimeraz enzimi görev yapar', 'Yarı korunumlu olarak gerçekleşir', 'Şablon olarak eski zincir kullanılır', 'Helikaz enzimi DNA\'yı açar'], e: 'DNA sentezi daima 5\' → 3\' yönünde gerçekleşir. 3\' → 5\' sentezi mümkün de\\ğildir.' },
    { q: 'DNA\'nın yapısında aşağıdakilerden hangisi bulunmaz?', a: 'Urasil', w: ['Adenin', 'Guanin', 'Sitozin', 'Timin'], e: 'DNA\'da urasil bulunmaz. Urasil RNA\'ya özgüdür, DNA\'da timin bulunur.' },
    { q: 'DNA eşlenmesi sırasında kesintisiz sentezlenen zincire ne ad verilir?', a: 'Öncü (lider) zincir', w: ['Gecikmeli (geride kalan) zincir', 'Tamamlayıcı zincir', 'Kodlayıcı zincir', 'Kalıp zincir'], e: 'Öncü zincir 5\' → 3\' yönünde kesintisiz sentezlenir. Gecikmeli zincir ise Okazaki parçaları halinde sentezlenir.' },
    { q: 'Bir DNA molekülünde A nükleotit sayısı 600 ise toplam nükleotit sayısı en az kaçtır?', a: '1200', w: ['600', '900', '1500', '1800'], e: 'A = T ve G = C oldu\\ğundan A=600 ise T=600\'dür. A+T+G+C en az 1200 olur.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('biyoloji',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(q.a),
    q.e);
}

function templateEkosistem() {
  const q = pick([
    { q: 'Bir ekosistemde biyokütlenin en fazla oldu\\ğu trofik düzey aşağıdakilerden hangisidir?', a: 'Üreticiler', w: ['Birincil tüketiciler', 'İkincil tüketiciler', 'Üçüncül tüketiciler', 'Ayrıştırıcılar'], e: 'Ekolojik piramitte en alt basamakta bulunan üreticiler en fazla biyokütleye sahiptir.' },
    { q: 'Aşağıdakilerden hangisi bir ekosistemdeki besin a\\ğının bozulmasına neden olabilir?', a: 'Biyolojik çeşitlili\\ğin azalması', w: ['Madde döngülerinin devam etmesi', 'Enerji akışının sürmesi', 'Popülasyonların dengede olması', 'Habitatların korunması'], e: 'Biyolojik çeşitlili\\ğin azalması besin a\\ğını zayıflatır ve ekosistemi bozar.' },
    { q: 'Azot döngüsünde atmosferdeki N₂\'nin canlılar tarafından kullanılabilir hale gelmesini sa\\ğlayan olay aşağıdakilerden hangisidir?', a: 'Azot fiksasyonu (ba\\ğlanması)', w: ['Denitrifikasyon', 'Amonyaklaşma', 'Nitrifikasyon', 'Ayrışma'], e: 'Azot fiksasyonu, atmosferdeki N₂ gazının bakteriler tarafından NH₃\'e dönüştürülmesidir.' },
    { q: 'Karbon döngüsünde aşağıdakilerden hangisi atmosferdeki CO₂ miktarını artırır?', a: 'Fosil yakıtların yakılması', w: ['Fotosentez', 'Kireçtaşı oluşumu', 'Okyanuslarda çözünme', 'A\\ğaçlandırma'], e: 'Fosil yakıtların yakılması atmosfere CO₂ salınımına neden olur. Fotosentez ise CO₂ tüketir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('biyoloji',
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`),
    all.indexOf(q.a),
    q.e);
}

const templates = [
  templateTork, templateManyetizma, templateInduksiyon, templateBHH, templateOptik, templateOptikAyna,
  templateOrganik, templateTepkimeHizi, templateDenge, templateElektrokimya, templateCozunurluk,
  templateFotosentez, templateSolunum, templateNoron, templateDNA, templateEkosistem,
];

export function generate(count = 30) {
  return generateUnique(() => {
    const tpl = pick(templates);
    return tpl();
  }, count);
}
