/**
 * TYT Fen Bilimleri Soru Üretici
 */
import { randInt, pick, shuffle, makeQuestion, makeOptions } from './shared.mjs';

function r(a, b) { return randInt(a, b); }

// ═══ FİZİK ══════════════════════════════════════════════════════════════════

function fizikKuvvet() {
  const m = r(2, 20), a = r(1, 10);
  const f = m * a;
  const wrong = shuffle([m + a, m - a, f + r(1, 5), f - r(1, 5), m * a + r(2, 8)].filter(v => v > 0 && v !== f)).slice(0, 4);
  while (wrong.length < 4) wrong.push(f + r(1, 5));
  const all = shuffle([f, ...wrong]);
  return makeQuestion('fizik',
    `${m} kg kütleli bir cisme uygulanan net kuvvetin büyüklüğü kaç N olursa cisim ${a} m/s² ivme kazanır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(f),
    `$F = m \\cdot a = ${m} \\cdot ${a} = ${f}$ N.`);
}

function fizikEnerji() {
  const m = r(1, 10), g = 10, h = r(2, 15);
  const ep = m * g * h;
  const wrong = shuffle([m * h, m * g, ep + r(5, 20), ep - r(5, 20), m * h * r(2, 3)].filter(v => v > 0 && v !== ep)).slice(0, 4);
  while (wrong.length < 4) wrong.push(ep + r(3, 10));
  const all = shuffle([ep, ...wrong]);
  return makeQuestion('fizik',
    `${m} kg kütleli bir cisim yerden ${h} m yükseklikteyken potansiyel enerjisi kaç J'dür? (g = 10 m/s²)`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(ep),
    `$E_p = mgh = ${m} \\cdot 10 \\cdot ${h} = ${ep}$ J.`);
}

function fizikElektrik() {
  const v = r(6, 30), i = r(1, 10);
  const res = v / i;
  if (res % 1 !== 0 && res * 2 % 1 !== 0 && res * 5 % 1 !== 0) return null;
  const correct = res;
  const wrong = shuffle([v * i, v + i, v - i, i / v, v / (i + 1)].filter(vv => vv !== correct && vv > 0)).slice(0, 4);
  while (wrong.length < 4) wrong.push(correct + r(1, 5));
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `Bir iletkene ${v} V potansiyel fark uygulandığında ${i} A akım geçmektedir. İletkenin direnci kaç Ω'dur?`,
    makeOptions(...all.map(vv => `$${vv}$`)),
    all.indexOf(correct),
    `$R = V / I = ${v} / ${i} = ${correct}$ Ω.`);
}

function fizikBasinc() {
  const f = r(20, 200), a = r(2, 20);
  const p = f / a;
  if (p % 1 !== 0 && p * 2 % 1 !== 0) return null;
  const correct = p;
  const wrong = shuffle([f * a, f + a, f - a, a / f, f / (a * 2)].filter(v => v !== correct && v > 0)).slice(0, 4);
  while (wrong.length < 4) wrong.push(correct + r(1, 5));
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `${f} N ağırlığındaki bir cisim ${a} m² yüzey alanına sahip bir zemine konulduğunda yaptığı basınç kaç Pa'dır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$P = F / A = ${f} / ${a} = ${correct}$ Pa.`);
}

function fizikDalga() {
  const v = r(100, 600, 50), f = r(20, 200, 10);
  // v = λ * f => λ = v / f must be integer
  if (v % f !== 0) return null;
  const lam = v / f;
  const correct = lam;
  const wrong = shuffle([v * f, f / v, v + f, v - f, v / (f * 2)].filter(vv => vv !== correct && vv > 0)).slice(0, 4);
  while (wrong.length < 4) wrong.push(correct + r(1, 3));
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `Bir ses dalgasının havadaki hızı ${v} m/s ve frekansı ${f} Hz ise dalga boyu kaç metredir?`,
    makeOptions(...all.map(vv => `$${vv}$`)),
    all.indexOf(correct),
    `$\\lambda = v / f = ${v} / ${f} = ${correct}$ m.`);
}

function fizikIsi() {
  const m = r(1, 5), c = r(2, 8), dt = r(10, 50);
  const q = m * c * dt;
  const correct = q;
  const wrong = shuffle([m * c, c * dt, m * dt, q + r(10, 50), q - r(10, 50)].filter(v => v !== correct && v > 0)).slice(0, 4);
  while (wrong.length < 4) wrong.push(correct + r(20, 100));
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('fizik',
    `${m} kg kütleli bir maddenin sıcaklığını ${dt}°C artırmak için gereken ısı miktarı kaç J'dür? (özısı = ${c} J/kg°C)`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$Q = m \\cdot c \\cdot \\Delta T = ${m} \\cdot ${c} \\cdot ${dt} = ${correct}$ J.`);
}

// ═══ KİMYA ══════════════════════════════════════════════════════════════════

function kimyaMol() {
  const n = r(1, 5), ma = r(12, 64);
  const m = n * ma;
  const correct = m;
  const wrong = shuffle([n + ma, ma / n, n, ma, n * ma + r(5, 20)].filter(v => v !== correct && v > 0)).slice(0, 4);
  while (wrong.length < 4) wrong.push(correct + r(4, 16));
  const all = shuffle([correct, ...wrong]);
  return makeQuestion('kimya',
    `Mol kütlesi ${ma} g/mol olan bir bileşiğin ${n} molü kaç gramdır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$m = n \\cdot M_A = ${n} \\cdot ${ma} = ${correct}$ g.`);
}

function kimyaAsitBaz() {
  const pool = [
    { q: 'Sulu çözeltisinde OH⁻ iyonu veren madde aşağıdakilerden hangisidir?', opts: ['HCl', 'H₂SO₄', 'NaOH', 'CH₃COOH', 'HNO₃'], correct: 2, exp: 'NaOH (sodyum hidroksit) bazik özellik gösterir ve OH⁻ iyonu verir.' },
    { q: 'pH değeri 7\'den küçük olan çözeltiler için aşağıdakilerden hangisi doğrudur?', opts: ['Baziktir', 'Asidiktir', 'Nötrdür', 'Tuzludur', 'Kuvvetli bazdır'], correct: 1, exp: 'pH < 7 olan çözeltiler asidiktir.' },
    { q: 'Mavi turnusol kağıdını kırmızıya çeviren çözelti hangisidir?', opts: ['NaOH', 'KOH', 'HCl', 'NaCl', 'Ca(OH)₂'], correct: 2, exp: 'Asitler (HCl) mavi turnusolü kırmızıya çevirir.' },
    { q: 'Aşağıdakilerden hangisi kuvvetli bir bazdır?', opts: ['CH₃COOH', 'NH₃', 'KOH', 'H₂CO₃', 'HF'], correct: 2, exp: 'KOH (potasyum hidroksit) kuvvetli bir bazdır.' },
  ];
  const d = pick(pool);
  return makeQuestion('kimya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function kimyaPeriyodik() {
  const pool = [
    { q: 'Periyodik cetvelde aynı grupta bulunan elementler için aşağıdakilerden hangisi ortaktır?', opts: ['Proton sayısı', 'Nötron sayısı', 'Değerlik elektron sayısı', 'Kütle numarası', 'Katman sayısı'], correct: 2, exp: 'Aynı gruptaki elementlerin değerlik elektron sayıları aynıdır.' },
    { q: 'Periyodik cetvelde aynı periyotta bulunan elementler için aşağıdakilerden hangisi ortaktır?', opts: ['Değerlik elektron sayısı', 'Elektron katman sayısı', 'Proton sayısı', 'Kütle numarası', 'Metalik özellik'], correct: 1, exp: 'Aynı periyottaki elementlerin katman sayıları aynıdır.' },
    { q: 'Elementlerin periyodik cetvelde artışına göre sıralandığı temel özellik aşağıdakilerden hangisidir?', opts: ['Kütle numarası', 'Atom numarası', 'Nötron sayısı', 'Atom çapı', 'Elektronegatiflik'], correct: 1, exp: 'Elementler atom numarasına (proton sayısına) göre sıralanmıştır.' },
    { q: 'Aşağıdaki elementlerden hangisi periyodik cetvelde 2. periyotta yer alır?', opts: ['Na', 'Mg', 'O', 'K', 'Ca'], correct: 2, exp: 'Oksijen (O) 2. periyotta yer alır.' },
  ];
  const d = pick(pool);
  return makeQuestion('kimya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function kimyaBilesik() {
  const pool = [
    { q: 'Aşağıdakilerden hangisi iyonik bağlı bir bileşiktir?', opts: ['H₂O', 'CO₂', 'NaCl', 'CH₄', 'NH₃'], correct: 2, exp: 'NaCl (sofra tuzu), Na⁺ ve Cl⁻ iyonları arasında iyonik bağla oluşur.' },
    { q: 'Aşağıdakilerden hangisi kovalent bağlı bir bileşiktir?', opts: ['KCl', 'NaF', 'CaO', 'H₂O', 'MgCl₂'], correct: 3, exp: 'H₂O (su) molekülünde O ve H atomları arasında kovalent bağ vardır.' },
    { q: 'Suyun formülü aşağıdakilerden hangisidir?', opts: ['H₂O₂', 'H₂O', 'OH', 'HO₂', 'H₃O'], correct: 1, exp: 'Suyun kimyasal formülü H₂O\'dur.' },
  ];
  const d = pick(pool);
  return makeQuestion('kimya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function kimyaHalDegisimi() {
  const pool = [
    { q: 'Katı bir maddenin sıvı hâle geçmesi olayına ne ad verilir?', opts: ['Donma', 'Buharlaşma', 'Erime', 'Süblimleşme', 'Kırağılaşma'], correct: 2, exp: 'Katıdan sıvıya geçişe erime denir.' },
    { q: 'Sıvı hâldeki bir maddenin gaz hâle geçmesi olayına ne ad verilir?', opts: ['Yoğuşma', 'Donma', 'Buharlaşma', 'Erime', 'Süblimleşme'], correct: 2, exp: 'Sıvıdan gaza geçişe buharlaşma denir.' },
    { q: 'Katı hâlden doğrudan gaz hâle geçme olayına ne ad verilir?', opts: ['Erime', 'Buharlaşma', 'Süblimleşme', 'Yoğuşma', 'Donma'], correct: 2, exp: 'Katıdan doğrudan gaza geçişe süblimleşme denir.' },
  ];
  const d = pick(pool);
  return makeQuestion('kimya', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

// ═══ BİYOLOJİ ════════════════════════════════════════════════════════════════

function biyolojiHucre() {
  const pool = [
    { q: 'Aşağıdakilerden hangisi prokaryot hücre yapısına sahip bir canlıdır?', opts: ['Bakteri', 'Bitki', 'Hayvan', 'Mantar', 'Protist'], correct: 0, exp: 'Bakteriler prokaryot hücre yapısına sahiptir (çekirdek ve zarlı organelleri yoktur).' },
    { q: 'Hücrenin yönetim merkezi olan ve DNA\'yı taşıyan organel aşağıdakilerden hangisidir?', opts: ['Ribozom', 'Mitokondri', 'Çekirdek', 'Endoplazmik retikulum', 'Golgi'], correct: 2, exp: 'Çekirdek, hücrenin genetik bilgisini taşır ve yönetim merkezidir.' },
    { q: 'Aşağıdaki organellerden hangisi sadece bitki hücresinde bulunur?', opts: ['Mitokondri', 'Ribozom', 'Kloroplast', 'Endoplazmik retikulum', 'Golgi aygıtı'], correct: 2, exp: 'Kloroplast, fotosentez yapmak üzere sadece bitki hücresinde bulunur.' },
    { q: 'Hücrede enerji üretiminden sorumlu organel aşağıdakilerden hangisidir?', opts: ['Ribozom', 'Mitokondri', 'Kloroplast', 'Lizozom', 'Koful'], correct: 1, exp: 'Mitokondri, hücrenin enerji santralidir (ATP üretir).' },
  ];
  const d = pick(pool);
  return makeQuestion('biyoloji', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function biyolojiBolunme() {
  const pool = [
    { q: 'Mitoz bölünme sonucunda kaç hücre oluşur?', opts: ['1', '2', '4', '3', '8'], correct: 1, exp: 'Mitoz bölünme sonucu 2 yeni hücre oluşur.' },
    { q: 'Mayoz bölünme sonucunda kromozom sayısı nasıl değişir?', opts: ['İki katına çıkar', 'Aynı kalır', 'Yarıya iner', 'Üç katına çıkar', 'Dört katına çıkar'], correct: 2, exp: 'Mayoz bölünme sonucu kromozom sayısı yarıya iner.' },
    { q: 'Mayoz bölünme hangi canlılarda görülür?', opts: ['Tüm hücrelerde', 'Sadece üreme ana hücrelerinde', 'Sadece bitkilerde', 'Sadece hayvanlarda', 'Prokaryotlarda'], correct: 1, exp: 'Mayoz bölünme, üreme ana hücrelerinde (eşey ana hücrelerinde) görülür.' },
    { q: 'Mitoz bölünmenin canlılar için önemi aşağıdakilerden hangisidir?', opts: ['Genetik çeşitlilik sağlar', 'Kromozom sayısını yarıya indirir', 'Büyüme ve onarım sağlar', 'Sadece üreme hücrelerinde olur', 'Kalıtsal hastalıkları önler'], correct: 2, exp: 'Mitoz bölünme büyüme, gelişme ve onarımı sağlar.' },
  ];
  const d = pick(pool);
  return makeQuestion('biyoloji', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function biyolojiGenetik() {
  const pool = [
    { q: 'Heterozigot uzun boylu (Aa) iki bezelyenin çaprazlanması sonucu oluşacak bireylerin genotip oranı aşağıdakilerden hangisidir?', opts: ['1:1', '1:2:1', '3:1', '2:1', '9:3:3:1'], correct: 1, exp: 'Aa × Aa çaprazlamasında genotip oranı 1 AA : 2 Aa : 1 aa (1:2:1) şeklindedir.' },
    { q: 'DNA\'nın eşlenmesi sırasında adenin (A) nükleotidi hangi nükleotitle eşleşir?', opts: ['Guanin (G)', 'Sitozin (C)', 'Timin (T)', 'Urasil (U)', 'Adenin (A)'], correct: 2, exp: 'DNA\'da adenin (A) timin (T) ile eşleşir.' },
    { q: 'Mendel\'in bezelye deneylerinde kullandığı ve "saf döl" olarak ifade edilen bireyler için hangisi doğrudur?', opts: ['Homozigot genotiplidir', 'Heterozigot genotiplidir', 'Melezdir', 'Fenotipi farklıdır', 'Resesif gen taşımaz'], correct: 0, exp: 'Saf döl bireyler homozigot genotipe (AA veya aa) sahiptir.' },
  ];
  const d = pick(pool);
  return makeQuestion('biyoloji', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function biyolojiSistemler() {
  const pool = [
    { q: 'Kanın vücutta dolaşmasını sağlayan organ aşağıdakilerden hangisidir?', opts: ['Akciğer', 'Böbrek', 'Kalp', 'Karaciğer', 'Beyin'], correct: 2, exp: 'Kalp, kanın vücutta dolaşmasını sağlayan pompa görevindeki organdır.' },
    { q: 'Besinlerin sindirilmesi sırasında proteinler hangi moleküllere ayrılır?', opts: ['Glikoz', 'Amino asit', 'Yağ asidi', 'Vitamin', 'Mineral'], correct: 1, exp: 'Proteinler sindirim sonucu amino asitlere ayrılır.' },
    { q: 'Vücudumuzda gaz alışverişinin gerçekleştiği organ aşağıdakilerden hangisidir?', opts: ['Kalp', 'Böbrek', 'Akciğer', 'Mide', 'Karaciğer'], correct: 2, exp: 'Akciğerler, oksijen ve karbondioksit alışverişinin yapıldığı solunum organıdır.' },
    { q: 'Aşağıdaki organlardan hangisi boşaltım sistemine ait değildir?', opts: ['Böbrek', 'Üreter', 'Mesane', 'Mide', 'Üretra'], correct: 3, exp: 'Mide sindirim sistemine aittir, boşaltım sistemi böbrek, üreter, mesane ve üretradan oluşur.' },
  ];
  const d = pick(pool);
  return makeQuestion('biyoloji', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

function biyolojiSiniflandirma() {
  const pool = [
    { q: 'Canlıların sınıflandırılmasında kullanılan en kapsamlı taksonomik birim aşağıdakilerden hangisidir?', opts: ['Tür', 'Cins', 'Familya', 'Alem', 'Şube'], correct: 3, exp: 'Âlem (regnum), canlıların sınıflandırılmasındaki en kapsamlı birimdir.' },
    { q: 'Aşağıdakilerden hangisi omurgalı hayvanlar arasında yer almaz?', opts: ['Balık', 'Kurbağa', 'Böcek', 'Kuş', 'Memeli'], correct: 2, exp: 'Böcekler omurgasızlar sınıfındadır.' },
    { q: '"Hepçil" olarak adlandırılan canlılar hangi beslenme türüne sahiptir?', opts: ['Sadece ot yer', 'Sadece et yer', 'Hem ot hem et yer', 'Fotosentez yapar', 'Ayrıştırıcıdır'], correct: 2, exp: 'Hepçil (omnivor) canlılar hem bitkisel hem hayvansal besinlerle beslenir.' },
  ];
  const d = pick(pool);
  return makeQuestion('biyoloji', d.q, makeOptions(...d.opts), d.correct, d.exp);
}

const templates = [
  fizikKuvvet, fizikEnerji, fizikElektrik, fizikBasinc, fizikDalga, fizikIsi,
  kimyaMol, kimyaAsitBaz, kimyaPeriyodik, kimyaBilesik, kimyaHalDegisimi,
  biyolojiHucre, biyolojiBolunme, biyolojiGenetik, biyolojiSistemler, biyolojiSiniflandirma,
];

export function generate(count = 30) {
  const seen = new Set();
  const unique = [];
  let attempts = 0;
  while (unique.length < count && attempts < 600) {
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
