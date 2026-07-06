import { randInt, pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

function r(a, b) { return randInt(a, b); }

// ─── Fizik ────────────────────────────────────────────────────────────────────

function templateTork() {
  const F = r(10, 50);
  const d = r(1, 5);
  const correct = F * d;
  const wrong = shuffle([F, d, F + d, correct + r(5, 15), correct - r(5, 15), F * (d + 1)].filter(v => v !== correct && v > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `Bir cisme ${F} N büyüklüğünde bir kuvvet, dönme noktasından ${d} m uzaklığa dik olarak uygulanıyor. Buna göre cisme etki eden torkun büyüklüğü kaç N·m dir?`,
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
    `Şiddeti $B = ${B}$ T olan düzgün manyetik alan içinde, alan çizgilerine dik olarak yerleştirilen $i = ${i}$ A akım taşıyan $L = ${L}$ m uzunluğundaki tele etki eden manyetik kuvvet kaç N dur?`,
    makeOptions(...all.map(v => `$${v}$ N`)),
    all.indexOf(correct),
    `Manyetik Kuvvet Formülü: $F = B \\cdot i \\cdot L \\cdot \\sin(90^\\circ) = ${B} \\cdot ${i} \\cdot ${L} = ${correct}$ N.`);
}

function templateInduksiyon() {
  const B = r(1, 3);
  const L = r(1, 3);
  const v = r(2, 10);
  const correct = B * L * v;
  const wrong = shuffle([B * L, L * v, B * v, (B + 1) * L * v, B * L * (v + 1)].filter(vv => vv !== correct && vv > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `$B = ${B}$ T şiddetindeki düzgün manyetik alan içinde, manyetik alana dik olarak hareket ettirilen $L = ${L}$ m boyundaki iletken düz telin hızı $v = ${v}$ m/s dir. Telin uçları arasında oluşan indüksiyon elektromotor kuvveti (emk) kaç V olur?`,
    makeOptions(...all.map(vv => `$${vv}$`)),
    all.indexOf(correct),
    `$\\varepsilon = B \\cdot v \\cdot L \\cdot \\sin(90^\\circ) = ${B} \\cdot ${v} \\cdot ${L} = ${correct}$ V.`);
}

function templateAtis() {
  const t = r(2, 6);
  const g = 10;
  const h = 5 * t * t;
  const v = g * t;
  
  const q = pick([
    {
      text: `Sürtünmesiz ortamda serbest bırakılan bir cisim yere ${t} saniyede çarpıyor. Cismin bırakıldığı yükseklik (h) kaç metredir? (g=10 m/s²)`,
      ans: h,
      formula: `h = \\frac{1}{2} g t^2 = 5 \\cdot ${t}^2 = ${h} m`
    },
    {
      text: `Sürtünmesiz ortamda belirli bir yükseklikten serbest bırakılan cisim yere çarptığı anda hızı ${v} m/s oluyor. Cisim havada kaç saniye kalmıştır? (g=10 m/s²)`,
      ans: t,
      formula: `v = g \\cdot t \\implies ${v} = 10 \\cdot t \\implies t = ${t} s`
    }
  ]);
  
  const wrong = shuffle([q.ans + 10, q.ans - 10, q.ans * 2, q.ans / 2, q.ans + 5, q.ans - 5].filter(x => x > 0 && x !== q.ans)).slice(0, 4);
  const all = shuffle([q.ans, ...wrong]);
  return makeQuestion('fizik', q.text, makeOptions(...all.map(x => `$${x}$`)), all.indexOf(q.ans), q.formula);
}

function templateYayEnerjisi() {
  const k = r(10, 50) * 10; // 100 to 500
  const x_cm = pick([10, 20, 30, 40]);
  const x = x_cm / 100;
  const E = 0.5 * k * x * x;
  
  const wrong = shuffle([E * 2, E / 2, E * 10, E + 5, E - 2].filter(v => v !== E && v > 0)).slice(0, 4);
  const all = shuffle([E, ...wrong]);
  
  return makeQuestion('fizik',
    `Yay sabiti $k = ${k}$ N/m olan esnek bir yay, denge konumundan $x = ${x_cm}$ cm sıkıştırılıyor. Yayda depolanan esneklik potansiyel enerjisi kaç Joule'dür?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(E),
    `$x = ${x_cm}$ cm = ${x} m. $E_p = \\frac{1}{2} k x^2 = \\frac{1}{2} \\cdot ${k} \\cdot (${x})^2 = ${E}$ Joule.`
  );
}

// ─── Kimya ────────────────────────────────────────────────────────────────────

function templateOrganik() {
  const q = pick([
    { q: 'Aşağıdakilerden hangisi bir alkoldür?', a: 'CH₃CH₂OH', w: ['CH₃OCH₃', 'CH₃CHO', 'CH₃COOH', 'CH₃COCH₃'], e: 'CH₃CH₂OH (etanol) bir alkol olup -OH fonksiyonel grubuna sahiptir.' },
    { q: 'Aşağıdaki fonksiyonel gruplardan hangisi karbonil (C=O) içermez?', a: 'Alkol', w: ['Aldehit', 'Keton', 'Karboksilik asit', 'Ester'], e: 'Alkoller (R-OH) hidroksil grubuna sahiptir, karbonil (C=O) içermezler.' },
    { q: 'Aromatik hidrokarbonların en basit üyesi aşağıdakilerden hangisidir?', a: 'Benzen (C₆H₆)', w: ['Etan (C₂H₆)', 'Siklohekzan (C₆H₁₂)', 'Metan (CH₄)', 'Toluen (C₇H₈)'], e: 'Benzen (C₆H₆), 6 karbonlu ve üç çift bağ içeren aromatik halkanın en basit üyesidir.' },
    { q: 'Aşağıdakilerden hangisi bir esterdir?', a: 'CH₃COOCH₂CH₃', w: ['CH₃CH₂COOH', 'CH₃CH₂CHO', 'CH₃COCH₃', 'CH₃CH₂OH'], e: 'CH₃COOCH₂CH₃ (etil asetat) bir esterdir. Esterler R-COO-R\' yapısındadır.' },
    { q: 'Alkinlerin (asetilen sınıfı) genel formülü aşağıdakilerden hangisidir?', a: '$C_nH_{2n-2}$', w: ['$C_nH_{2n+2}$', '$C_nH_{2n}$', '$C_nH_{2n+1}OH$', '$C_nH_{2n}O$'], e: 'Alkanlar $C_nH_{2n+2}$, alkenler $C_nH_{2n}$, alkinler ise üçlü bağ içerdikleri için $C_nH_{2n-2}$ genel formülüne sahiptir.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('kimya', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateMolarite() {
  const n = pick([0.1, 0.2, 0.4, 0.5, 1.0]);
  const v_ml = pick([100, 200, 250, 500]);
  const v = v_ml / 1000;
  const M = n / v;
  
  const wrong = shuffle([M * 10, M / 10, M * 2, M / 2, n * v_ml].filter(x => x !== M && x > 0)).slice(0, 4);
  const all = shuffle([M, ...wrong]);
  
  return makeQuestion('kimya',
    `İçerisinde ${n} mol NaOH çözünmüş ${v_ml} mL sulu çözeltinin molaritesi (M) kaçtır?`,
    makeOptions(...all.map(x => `$${x}$ M`)),
    all.indexOf(M),
    `Hacim: $V = ${v_ml} mL = ${v} L$. Molarite: $M = \\frac{n}{V} = \\frac{${n}}{${v}} = ${M} M$.`
  );
}

function templateDenge() {
  const q = pick([
    { q: 'Kapalı bir kapta dengede olan $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) \\quad \\Delta H < 0$ (ekzotermik) tepkimesine göre, sistemin sıcaklığı artırılırsa aşağıdakilerden hangisi gerçekleşir?', a: 'Denge girenler (sol) yönüne kayar ve $NH_3$ miktarı azalır.', w: ['Denge ürünler yönüne kayar', 'Denge sabiti (Kc) artar', 'Basınç kesinlikle azalır', 'Tepkime durur'], e: 'Ekzotermik tepkimelerde sıcaklık artarsa Le Chatelier ilkesine göre sistem ısıyı azaltmak için girenler yönüne kayar ve denge sabiti küçülür.' },
    { q: 'Denge halindeki bir sisteme sabit sıcaklıkta ve hacimde inert (tepkimeye girmeyen) bir gaz eklenirse (örneğin He) kimyasal denge nasıl etkilenir?', a: 'Denge konumu değişmez.', w: ['Girenler yönüne kayar', 'Ürünler yönüne kayar', 'Denge sabiti artar', 'İleri hız artar'], e: 'Sabit hacimde inert gaz eklenmesi kısmi basınçları (derişimleri) değiştirmediği için dengeyi etkilemez.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('kimya', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

// ─── Biyoloji ─────────────────────────────────────────────────────────────────

function templateFotosentez() {
  const q = pick([
    { q: 'Fotosentezin ışığa bağımlı tepkimelerinde aşağıdakilerden hangisi üretilir?', a: 'ATP ve NADPH', w: ['Glikoz ve CO₂', 'CO₂ ve H₂O', 'ATP ve glikoz', 'NADPH ve glikoz'], e: 'Işığa bağımlı evrede su fotolize uğrar, oksijen çıkar. Aynı zamanda ATP ve NADPH üretilerek ışıktan bağımsız evreye aktarılır.' },
    { q: 'Fotosentezin ışıktan bağımsız tepkimeleri (Calvin döngüsü) kloroplastın hangi bölgesinde gerçekleşir?', a: 'Stroma', w: ['Granum', 'Tilakoid zar', 'Matriks', 'Krista'], e: 'Calvin döngüsü kloroplastın sıvı kısmı olan stromada gerçekleşir.' },
    { q: 'Fotosentezde atmosfere verilen oksijen gazının (O₂) kaynağı aşağıdakilerden hangisidir?', a: 'Su (H₂O)', w: ['Karbondioksit (CO₂)', 'Klorofil', 'Glikoz', 'Topraktaki mineraller'], e: 'Işığa bağımlı evrede suyun fotolizi (ışıkla parçalanması) sonucu H, e- ve O₂ açığa çıkar.' },
    { q: 'Kemosentez yapan bir canlı için aşağıdakilerden hangisi kesinlikle doğrudur?', a: 'Prokaryot hücre yapısına sahiptir.', w: ['Klorofili vardır.', 'Sadece aydınlık ortamda besin üretir.', 'Ökaryot hücre yapısındadır.', 'Oksijensiz solunum yapar.'], e: 'Kemosentezi sadece bazı bakteriler ve arkeler (prokaryotlar) yapabilir.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('biyoloji', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateSolunum() {
  const q = pick([
    { q: 'Oksijenli solunumda en fazla ATP hangi evrede üretilir?', a: 'Elektron taşıma sistemi (ETS)', w: ['Glikoliz', 'Krebs döngüsü', 'Pirüvat oksidasyonu', 'Fermantasyon'], e: 'ETS evresinde oksidatif fosforilasyon ile NADH ve FADH₂\'lerdeki elektronlar kullanılarak yoğun ATP (yaklaşık 28-32) üretilir.' },
    { q: 'Tüm canlılarda ortak olarak gerçekleşen, glikozun pirüvata kadar parçalandığı evre aşağıdakilerden hangisidir?', a: 'Glikoliz', w: ['Krebs (Sitrik Asit) Döngüsü', 'ETS', 'Laktik asit fermantasyonu', 'Kemosentez'], e: 'Glikoliz evresi, oksijenli solunum ve fermantasyon yapan tüm canlılarda sitoplazmada ortak gerçekleşir.' },
    { q: 'İnsanda çizgili kas hücreleri, aşırı egzersiz sırasında oksijen yetersizliğinde enerjiyi hangi yolla elde eder?', a: 'Laktik Asit Fermantasyonu', w: ['Etil Alkol Fermantasyonu', 'Kemosentez', 'Sadece Glikoliz', 'Oksijenli Solunum'], e: 'Kas hücreleri O₂ yetersizliğinde glikolizle üretilen pirüvatı laktik asite dönüştürerek ATP üretimini (fermantasyon) sürdürür.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('biyoloji', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

function templateSistemler() {
  const q = pick([
    { q: 'İnsan kalbinde kirli kanın (O₂\'ce fakir) bulunduğu ve akciğerlere pompalandığı odacık hangisidir?', a: 'Sağ Karıncık', w: ['Sol Karıncık', 'Sağ Kulakçık', 'Sol Kulakçık', 'Aort'], e: 'Sağ karıncıktaki kirli kan, akciğer atardamarı ile temizlenmek üzere akciğerlere pompalanır.' },
    { q: 'Sindirim sisteminde yağların mekanik sindirimini sağlayan safra sıvısı hangi organda üretilir?', a: 'Karaciğer', w: ['Pankreas', 'Safra kesesi', 'Mide', 'İnce bağırsak'], e: 'Safra sıvısı karaciğerde üretilir, safra kesesinde ise sadece depolanır.' },
    { q: 'Sinir hücresinde (nöron) uyartıların iletim hızını artıran yapıya ne ad verilir?', a: 'Miyelin Kılıf', w: ['Dendrit', 'Sinaps', 'Ranvier Boğumu', 'Akson ucu'], e: 'Miyelin kılıf, elektriksel yalıtım sağlayarak impulsun (uyartının) sıçramalı ve çok daha hızlı iletilmesini sağlar.' }
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion('biyoloji', q.q, all.map((v, i) => `${String.fromCharCode(65 + i)}) ${v}`), all.indexOf(q.a), q.e);
}

const templates = [
  templateTork, templateManyetizma, templateInduksiyon, templateAtis, templateYayEnerjisi,
  templateOrganik, templateMolarite, templateDenge,
  templateFotosentez, templateSolunum, templateSistemler
];

export function generate(count = 30) {
  return generateUnique(() => {
    const tpl = pick(templates);
    return tpl();
  }, count);
}
