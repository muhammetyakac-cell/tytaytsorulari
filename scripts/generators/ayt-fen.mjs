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
    `Bir cisme ${F} N büyüklü\\u011fünde bir kuvvet, dönme noktas\\u0131ndan ${d} m uzakl\\u0131\\u011fa dik olarak uygulan\\u0131yor. Buna göre tork kaç N·m dir?`,
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
    `$B = ${B}$ T manyetik alan içinde alana dik yerle\\u015ftirilen $i = ${i}$ A ak\\u0131m ta\\u015f\\u0131yan $L = ${L}$ m uzunlu\\u011fundaki tele etki eden manyetik kuvvet kaç N dur?`,
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
    `$B = ${B}$ T manyetik alan içinde alana dik hareket eden $L = ${L}$ m boyundaki bir iletkenin h\\u0131z\\u0131 $v = ${v}$ m/s ise uçlar\\u0131 aras\\u0131nda indüklenen emk kaç V tur?`,
    makeOptions(...all.map(vv => `$${vv}$`)),
    all.indexOf(correct),
    `$\\varepsilon = B \\cdot L \\cdot v = ${B} \\cdot ${L} \\cdot ${v} = ${correct}$ V.`);
}

function templateBHH() {
  const q = pick([
    { q: 'Bir basit harmonik hareketlinin genli\\u011fi A, periyodu T dir. Cismin denge konumundan geçerkenki maksimum h\\u0131z\\u0131 a\\u015fa\\u011f\\u0131dakilerden hangisine e\\u015fittir?', a: '$\\frac{2\\pi A}{T}$', w: ['$\\frac{\\pi A}{T}$', '$\\frac{4\\pi A}{T}$', '$\\frac{2\\pi T}{A}$', '$\\frac{A}{T}$'], e: 'Maksimum h\\u0131z $v_{max} = \\omega A = \\frac{2\\pi}{T} \\cdot A = \\frac{2\\pi A}{T}$ dir.' },
    { q: 'Bir yay sarkac\\u0131n\\u0131n periyodu T dir. Yay sabiti 4 kat\\u0131na ç\\u0131kar\\u0131l\\u0131rsa yeni periyot kaç T olur?', a: '$\\frac{T}{2}$', w: ['$2T$', '$4T$', '$\\frac{T}{4}$', '$T$'], e: '$T \\propto \\frac{1}{\\sqrt{k}}$ oldu\\u011fundan k 4 kat\\u0131na ç\\u0131karsa $T\' = \\frac{T}{2}$ olur.' },
    { q: 'Bir basit sarkac\\u0131n boyu 4 kat\\u0131na ç\\u0131kar\\u0131l\\u0131rsa periyodu nas\\u0131l de\\u011fi\\u015fir?', a: '2 kat\\u0131na ç\\u0131kar', w: ['4 kat\\u0131na ç\\u0131kar', 'yar\\u0131ya iner', 'de\\u011fi\\u015fmez', '\\u221a2 kat\\u0131na ç\\u0131kar'], e: '$T \\propto \\sqrt{L}$ oldu\\u011fundan L 4 kat\\u0131na ç\\u0131karsa $T\' = 2T$ olur.' },
    { q: 'Bir basit harmonik harekette geri ça\\u011f\\u0131r\\u0131c\\u0131 kuvvetin büyüklü\\u011fü a\\u015fa\\u011f\\u0131dakilerden hangisiyle orant\\u0131l\\u0131d\\u0131r?', a: 'Uzan\\u0131m', w: ['H\\u0131z', '\\u0130vme', 'Genlik', 'Frekans'], e: 'Basit harmonik harekette $F = -kx$ oldu\\u011fundan geri ça\\u011f\\u0131r\\u0131c\\u0131 kuvvet uzan\\u0131mla do\\u011fru orant\\u0131l\\u0131d\\u0131r.' },
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
    `Odak uzaklı\\u011f\\u0131 ${f} cm olan ince kenarl\\u0131 bir mercekte cismin merceğe uzaklı\\u011f\\u0131 ${d} cm ise görüntünün merceğe uzaklı\\u011f\\u0131 kaç cm dir?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i} \\implies \\frac{1}{${di}} = \\frac{1}{${f}} - \\frac{1}{${d}} \\implies d_i = ${correct}$ cm.`);
}

function templateOptikAyna() {
  const q = pick([
    { q: 'Çukur aynada t\\u0131pk\\u0131 odak ile merkez aras\\u0131na konulan bir cismin görüntüsü için a\\u015fa\\u011f\\u0131dakilerden hangisi do\\u011frudur?', a: 'Gerçek, ters ve büyük', w: ['Gerçek, ters ve küçük', 'Sanal, düz ve büyük', 'Sanal, düz ve küçük', 'Gerçek, düz ve büyük'], e: 'Çukur aynada cisim F ile M aras\\u0131nda ise görüntü gerçek, ters ve büyüktür.' },
    { q: 'Düz aynada olu\\u015fan görüntü için a\\u015fa\\u011f\\u0131dakilerden hangisi yanl\\u0131\\u015ft\\u0131r?', a: 'Tersdir', w: ['Sanald\\u0131r', 'Düzdür', 'Boyu cismin boyuna e\\u015fittir', 'Simetriktir'], e: 'Düz aynada görüntü sanal, düz, ters de\\u011fil ve cisimle simetriktir.' },
    { q: 'Odak uzaklı\\u011f\\u0131 f olan tümsek aynaya gelen \\u0131\\u015f\\u0131nlar için a\\u015fa\\u011f\\u0131dakilerden hangisi do\\u011frudur?', a: 'Görüntü daima sanald\\u0131r', w: ['Görüntü daima gerçektir', 'Odak uzaklı\\u011f\\u0131 pozitiftir', 'Görüntü ters olu\\u015fur', 'Merkezde gerçek görüntü olu\\u015fur'], e: 'Tümsek aynada görüntü daima sanald\\u0131r. Odak uzaklı\\u011f\\u0131 negatiftir.' },
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
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi bir alkoldür?', a: 'CH₃CH₂OH', w: ['CH₃OCH₃', 'CH₃CHO', 'CH₃COOH', 'CH₃COCH₃'], e: 'CH₃CH₂OH (etanol) bir alkol olup -OH fonksiyonel grubuna sahiptir.' },
    { q: 'A\\u015fa\\u011f\\u0131daki fonksiyonel gruplardan hangisi karbonil (C=O) içermez?', a: 'Alkol', w: ['Aldehit', 'Keton', 'Karboksilik asit', 'Ester'], e: 'Alkoller -OH grubuna sahiptir, C=O içermezler.' },
    { q: 'Aromatik hidrokarbon a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'C₆H₆', w: ['C₂H₆', 'C₃H₈', 'C₄H₁₀', 'C₅H₁₂'], e: 'Benzen (C₆H₆) aromatik hidrokarbondur ve halka yap\\u0131s\\u0131na sahiptir.' },
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi bir esterdir?', a: 'CH₃COOCH₂CH₃', w: ['CH₃CH₂COOH', 'CH₃CH₂CHO', 'CH₃COCH₃', 'CH₃CH₂OH'], e: 'CH₃COOCH₂CH₃ (etil asetat) bir esterdir. Esterler -COO- grubu içerir.' },
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi doymam\\u0131\\u015f hidrokarbondur?', a: 'C₂H₄', w: ['CH₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀'], e: 'C₂H₄ (eten) ikili ba\\u011f içerdi\\u011finden doymam\\u0131\\u015f hidrokarbondur.' },
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
    { q: 'Bir tepkimenin h\\u0131z sabiti k ve deri\\u015fimler [A], [B] olmak üzere h\\u0131z = k[A][B]² şeklindedir. Tepkimenin mertebesi kaçt\\u0131r?', a: '3', w: ['1', '2', '4', '5'], e: 'H\\u0131z ba\\u011f\\u0131nt\\u0131s\\u0131nda üsler toplam\\u0131: $1 + 2 = 3$ oldu\\u011fundan tepkime 3. mertebedendir.' },
    { q: 'S\\u0131cakl\\u0131k 10°C art\\u0131r\\u0131ld\\u0131\\u011f\\u0131nda bir tepkimenin h\\u0131z\\u0131 2 kat\\u0131na ç\\u0131k\\u0131yorsa s\\u0131cakl\\u0131k 30°C art\\u0131r\\u0131ld\\u0131\\u011f\\u0131nda h\\u0131z kaç kat\\u0131na ç\\u0131kar?', a: '8', w: ['2', '4', '6', '16'], e: 'Her 10°C\'de 2 kat artarsa 30°C\'de $2^3 = 8$ kat\\u0131na ç\\u0131kar.' },
    { q: 'Bir tepkimede s\\u0131cakl\\u0131k art\\u0131\\u015f\\u0131 ile a\\u015fa\\u011f\\u0131dakilerden hangisi kesinlikle artar?', a: 'Birim zamandaki çarp\\u0131\\u015fma say\\u0131s\\u0131', w: ['Aktifle\\u015fme enerjisi', 'Denge sabiti', 'Verim', 'Deri\\u015fim'], e: 'S\\u0131cakl\\u0131k artarsa moleküllerin ortalama kinetik enerjisi artar, çarp\\u0131\\u015fma say\\u0131s\\u0131 artar.' },
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
    { q: '$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$ tepkimesi için $K_c = \\frac{[NH_3]^2}{[N_2][H_2]^3}$ tür. Ayn\\u0131 tepkimenin $K_p$ ile $K_c$ aras\\u0131ndaki ili\\u015fki a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: '$K_p = K_c(RT)^{-2}$', w: ['$K_p = K_c(RT)^{2}$', '$K_p = K_c(RT)^{-1}$', '$K_p = K_cRT$', '$K_p = K_c$'], e: '$\\Delta n = 2 - (1 + 3) = -2$ oldu\\u011fundan $K_p = K_c(RT)^{-2}$ dir.' },
    { q: 'Denge halindeki bir sisteme d\\u0131\\u015far\\u0131dan ürün eklenirse sistem nas\\u0131l tepki verir?', a: 'Girenler yönüne kayar', w: ['Ürünler yönüne kayar', 'Denge bozulmaz', 'S\\u0131cakl\\u0131k artar', 'Bas\\u0131nç artar'], e: 'Le Chatelier prensibine göre sistem eklenen maddenin deri\\u015fimini azaltacak yönde hareket eder, yani girenler yönüne kayar.' },
    { q: 'Denge sabiti K s\\u0131cakl\\u0131ktan ba\\u011f\\u0131ms\\u0131z m\\u0131d\\u0131r?', a: 'Hay\\u0131r, s\\u0131cakl\\u0131kla de\\u011fi\\u015fir', w: ['Evet', 'Yaln\\u0131zca gaz faz\\u0131nda de\\u011fi\\u015fir', 'Yaln\\u0131zca s\\u0131v\\u0131 fazda de\\u011fi\\u015fir', 'Bas\\u0131nçla de\\u011fi\\u015fir'], e: 'Denge sabiti K sadece s\\u0131cakl\\u0131\\u011fa ba\\u011fl\\u0131d\\u0131r, deri\\u015fim ve bas\\u0131nç de\\u011fi\\u015fimlerinden etkilenmez.' },
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
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi bir elektrokimyasal hücrede anotta gerçekle\\u015fen olayd\\u0131r?', a: 'Yükseltgenme', w: ['\\u0130ndirgenme', 'Nötralleşme', 'Çökelme', 'Asit-baz tepkimesi'], e: 'Anotta yükseltgenme (oksidasyon) gerçekleşir, elektronlar devreye verilir.' },
    { q: 'Bir galvanik hücrede a\\u015fa\\u011f\\u0131dakilerden hangisi do\\u011frudur?', a: 'Kimyasal enerji elektrik enerjisine dönüşür', w: ['Elektrik enerjisi kimyasal enerjiye dönüşür', 'Anot (+) kutuptur', 'Katot (-) kutuptur', 'Elektronlar d\\u0131ş devrede katottan anoda gider'], e: 'Galvanik hücrede kendili\\u011finden gerçekleşen redoks tepkimesi ile kimyasal enerji elektrik enerjisine dönüşür.' },
    { q: 'Elektrolizde katotta hangi olay gerçekleşir?', a: '\\u0130ndirgenme', w: ['Yükseltgenme', 'Nötralleşme', 'Süblimleşme', 'Buharlaşma'], e: 'Elektrolizde katotta indirgenme gerçekleşir, elektronlar katoda gelir.' },
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
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi çözünürlü\\ğü art\\u0131r\\u0131r?', a: 'S\\u0131cakl\\u0131\\ğ\\u0131 art\\u0131rmak (kat\\u0131lar için)', w: ['S\\u0131cakl\\u0131\\ğ\\u0131 azaltmak', 'Bas\\u0131nc\\u0131 art\\u0131rmak', 'Çözeltiyi kar\\u0131\\şt\\u0131rmak', 'Ortak iyon eklemek'], e: 'Ço\\ğu kat\\u0131n\\u0131n çözünürlü\\ğü s\\u0131cakl\\u0131kla artar. Kar\\u0131şt\\u0131rma çözünme h\\u0131z\\u0131n\\u0131 art\\u0131r\\u0131r ancak çözünürlü\\ğü etkilemez.' },
    { q: '$AgCl$ kat\\u0131s\\u0131n\\u0131n çözünürlük çarp\\u0131m\\u0131 ($K_{çç}$) a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: '$[Ag^+][Cl^-]$', w: ['$[Ag^+][Cl^-]^2$', '$[Ag^+]^2[Cl^-]$', '$\\frac{[Ag^+]}{[Cl^-]}$', '$[AgCl]$'], e: '$AgCl(k) \\rightleftharpoons Ag^+(aq) + Cl^-(aq)$ için $K_{çç} = [Ag^+][Cl^-]$ dir.' },
    { q: 'Ortak iyon etkisi ile ilgili a\\u015fa\\u011f\\u0131dakilerden hangisi do\\u011frudur?', a: 'Çözünürlü\\ğü azalt\\u0131r', w: ['Çözünürlü\\ğü art\\u0131r\\u0131r', 'Çözünürlü\\ğü etkilemez', 'Yaln\\u0131zca bazlar için geçerlidir', 'Yaln\\u0131zca asitler için geçerlidir'], e: 'Ortak iyon etkisi, az çözünen tuzun çözünürlü\\ğünü azalt\\u0131r (Le Chatelier prensibi).' },
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
    { q: 'Fotosentezin \\u0131\\u015fa ba\\ğ\\u0131ml\\u0131 tepkimelerinde a\\u015fa\\u011f\\u0131dakilerden hangisi üretilir?', a: 'ATP ve NADPH', w: ['Glikoz ve CO₂', 'CO₂ ve H₂O', 'ATP ve glikoz', 'NADPH ve glikoz'], e: 'I\\u015fa ba\\ğ\\u0131ml\\u0131 tepkimelerde ATP ve NADPH üretilir. Bu moleküller Calvin döngüsünde kullan\\u0131l\\u0131r.' },
    { q: 'Fotosentezin \\u0131\\u015ftan ba\\ğ\\u0131ms\\u0131z tepkimeleri (Calvin döngüsü) nerede gerçekleşir?', a: 'Stroma', w: ['Granum', 'Tilakoid zar', 'Klorofil', 'Mitokondri'], e: 'Calvin döngüsü kloroplast\\u0131n stromas\\u0131nda gerçekleşir.' },
    { q: 'Fotosentez h\\u0131z\\u0131n\\u0131 s\\u0131n\\u0131rland\\u0131ran faktörler aras\\u0131nda a\\u015fa\\u011f\\u0131dakilerden hangisi yer almaz?', a: 'Mitokondri say\\u0131s\\u0131', w: ['CO₂ derişimi', 'I\\u015f\\u0131k şiddeti', 'S\\u0131cakl\\u0131k', 'Su miktar\\u0131'], e: 'Fotosentez h\\u0131z\\u0131n\\u0131 CO₂, \\u0131\\u015f\\u0131k, s\\u0131cakl\\u0131k ve su etkiler. Mitokondri say\\u0131s\\u0131 solunumla ilgilidir.' },
    { q: 'Fotosentezde aç\\u0131\\u011fa ç\\u0131kan oksijen nereden gelir?', a: 'Sudan (H₂O)', w: ['CO₂\'den', 'Glikozdan', 'Klorofilden', 'ATP\'den'], e: 'Fotosentezin \\u0131\\u015fa ba\\ğ\\u0131ml\\u0131 tepkimelerinde suyun fotolizi ile oksijen aç\\u0131\\u011fa ç\\u0131kar.' },
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
    { q: 'Oksijenli solunumda en fazla ATP hangi evrede üretilir?', a: 'Elektron taş\\u0131ma sistemi', w: ['Glikoliz', 'Krebs döngüsü', 'Glikoliz ve Krebs döngüsü', 'Haz\\u0131rl\\u0131k evresi'], e: 'Elektron taş\\u0131ma sisteminde (oksidatif fosforilasyon) 32-34 ATP üretilir.' },
    { q: 'Glikoliz evresi nerede gerçekleşir?', a: 'Sitoplazma', w: ['Mitokondri iç zar\\u0131', 'Mitokondri matriksi', 'Kloroplast', 'Çekirdek'], e: 'Glikoliz, oksijenli veya oksijensiz tüm canl\\u0131larda sitoplazmada gerçekleşir.' },
    { q: 'Oksijensiz solunum (fermentasyon) sonucu a\\u015fa\\u011f\\u0131dakilerden hangisi oluşur?', a: '2 ATP ve etil alkol veya laktik asit', w: ['36 ATP ve CO₂', '2 ATP ve oksijen', '38 ATP ve su', '4 ATP ve asetaldehit'], e: 'Fermentasyonda net 2 ATP kazan\\u0131l\\u0131r ve son ürün olarak etil alkol veya laktik asit oluşur.' },
    { q: 'Krebs döngüsünde a\\u015fa\\u011f\\u0131dakilerden hangisi üretilmez?', a: 'Oksijen', w: ['CO₂', 'NADH', 'FADH₂', 'ATP'], e: 'Krebs döngüsünde CO₂, NADH, FADH₂ ve az miktarda ATP üretilir. Oksijen üretilmez.' },
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
    { q: 'Bir nöronda impuls iletimi s\\u0131ras\\u0131nda a\\u015fa\\u011f\\u0131dakilerden hangisi gerçekleşir?', a: 'Na⁺ iyonlar\\u0131 hücre içine girer', w: ['K⁺ iyonlar\\u0131 hücre içine girer', 'Ca²⁺ iyonlar\\u0131 hücre d\\u0131ş\\u0131na ç\\u0131kar', 'Cl⁻ iyonlar\\u0131 hücre içine girer', 'Mg²⁺ iyonlar\\u0131 taş\\u0131n\\u0131r'], e: 'Depolarizasyon s\\u0131ras\\u0131nda Na⁺ kanallar\\u0131 aç\\u0131l\\u0131r ve Na⁺ hücre içine girer.' },
    { q: 'Sinapslarda impuls iletimi s\\u0131ras\\u0131nda a\\u015fa\\u011f\\u0131dakilerden hangisi rol oynar?', a: 'Nörotransmitter maddeler', w: ['Myelin k\\u0131l\\u0131f', 'Ranvier bo\\u011fumu', 'Akson', 'Dendrit'], e: 'Sinapslarda impuls iletimi, nörotransmitter maddeler (ör. asetilkolin) arac\\u0131l\\u0131\\ğ\\u0131yla sa\\ğlan\\u0131r.' },
    { q: 'Ranvier bo\\ğumlar\\u0131n\\u0131n işlevi a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: '\\u0130mpuls iletimini h\\u0131zland\\u0131rmak', w: ['Nörotransmitter üretmek', 'Hücreyi beslemek', 'Sinaps oluşturmak', 'Myelin üretmek'], e: 'Ranvier boğumlar\\u0131 miyelinli nöronlarda s\\u0131çramal\\u0131 iletim sa\\ğlayarak impuls h\\u0131z\\u0131n\\u0131 art\\u0131r\\u0131r.' },
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
    { q: 'DNA replikasyonu (eşlenmesi) ile ilgili a\\u015fa\\u011f\\u0131dakilerden hangisi yanl\\u0131\\u015ft\\u0131r?', a: 'Yeni DNA zinciri 3\' → 5\' yönünde sentezlenir', w: ['DNA polimeraz enzimi görev yapar', 'Yar\\u0131 korunumlu olarak gerçekleşir', '\\u015eablon olarak eski zincir kullan\\u0131l\\u0131r', 'Helikaz enzimi DNA\'y\\u0131 açar'], e: 'DNA sentezi daima 5\' → 3\' yönünde gerçekleşir. 3\' → 5\' sentezi mümkün de\\ğildir.' },
    { q: 'DNA\'n\\u0131n yap\\u0131s\\u0131nda a\\u015fa\\u011f\\u0131dakilerden hangisi bulunmaz?', a: 'Urasil', w: ['Adenin', 'Guanin', 'Sitozin', 'Timin'], e: 'DNA\'da urasil bulunmaz. Urasil RNA\'ya özgüdür, DNA\'da timin bulunur.' },
    { q: 'DNA eşlenmesi s\\u0131ras\\u0131nda kesintisiz sentezlenen zincire ne ad verilir?', a: 'Öncü (lider) zincir', w: ['Gecikmeli (geride kalan) zincir', 'Tamamlay\\u0131c\\u0131 zincir', 'Kodlay\\u0131c\\u0131 zincir', 'Kal\\u0131p zincir'], e: 'Öncü zincir 5\' → 3\' yönünde kesintisiz sentezlenir. Gecikmeli zincir ise Okazaki parçalar\\u0131 halinde sentezlenir.' },
    { q: 'Bir DNA molekülünde A nükleotit say\\u0131s\\u0131 600 ise toplam nükleotit say\\u0131s\\u0131 en az kaçt\\u0131r?', a: '1200', w: ['600', '900', '1500', '1800'], e: 'A = T ve G = C oldu\\ğundan A=600 ise T=600\'dür. A+T+G+C en az 1200 olur.' },
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
    { q: 'Bir ekosistemde biyokütlenin en fazla oldu\\ğu trofik düzey a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Üreticiler', w: ['Birincil tüketiciler', '\\u0130kincil tüketiciler', 'Üçüncül tüketiciler', 'Ayrışt\\u0131r\\u0131c\\u0131lar'], e: 'Ekolojik piramitte en alt basamakta bulunan üreticiler en fazla biyokütleye sahiptir.' },
    { q: 'A\\u015fa\\u011f\\u0131dakilerden hangisi bir ekosistemdeki besin a\\ğ\\u0131n\\u0131n bozulmas\\u0131na neden olabilir?', a: 'Biyolojik çeşitlili\\ğin azalmas\\u0131', w: ['Madde döngülerinin devam etmesi', 'Enerji ak\\u0131ş\\u0131n\\u0131n sürmesi', 'Popülasyonlar\\u0131n dengede olmas\\u0131', 'Habitatlar\\u0131n korunmas\\u0131'], e: 'Biyolojik çeşitlili\\ğin azalmas\\u0131 besin a\\ğ\\u0131n\\u0131 zay\\u0131flat\\u0131r ve ekosistemi bozar.' },
    { q: 'Azot döngüsünde atmosferdeki N₂\'nin canl\\u0131lar taraf\\u0131ndan kullan\\u0131labilir hale gelmesini sa\\ğlayan olay a\\u015fa\\u011f\\u0131dakilerden hangisidir?', a: 'Azot fiksasyonu (ba\\ğlanmas\\u0131)', w: ['Denitrifikasyon', 'Amonyaklaşma', 'Nitrifikasyon', 'Ayrışma'], e: 'Azot fiksasyonu, atmosferdeki N₂ gaz\\u0131n\\u0131n bakteriler taraf\\u0131ndan NH₃\'e dönüştürülmesidir.' },
    { q: 'Karbon döngüsünde a\\u015fa\\u011f\\u0131dakilerden hangisi atmosferdeki CO₂ miktar\\u0131n\\u0131 art\\u0131r\\u0131r?', a: 'Fosil yak\\u0131tlar\\u0131n yak\\u0131lmas\\u0131', w: ['Fotosentez', 'Kireçtaş\\u0131 oluşumu', 'Okyanuslarda çözünme', 'A\\ğaçland\\u0131rma'], e: 'Fosil yak\\u0131tlar\\u0131n yak\\u0131lmas\\u0131 atmosfere CO₂ sal\\u0131n\\u0131m\\u0131na neden olur. Fotosentez ise CO₂ tüketir.' },
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
