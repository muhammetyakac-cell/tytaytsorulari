/**
 * TYT Matematik & Geometri Soru Üretici
 */
import { randInt, pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

const SUB = 'matematik';
const GEO_SUB = 'geometri';

// ─── Helper: pick a random non-zero digit ───────────────────────────────────
function r(a, b) { return randInt(a, b); }

// ─── Template: Tek bilinmeyenli denklem ─────────────────────────────────────
function templateDenklem() {
  const a = r(2, 9), b = r(3, 15), c = r(1, 10);
  // ax + b = c  => x = (c-b)/a  must be integer
  const x = r(1, 10);
  const lhs = a * x + b;
  const correct = x;
  const wrong = shuffle([1,2,3,4,5,6,7,8,9,10].filter(v => v !== correct)).slice(0,4);
  const opts = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$${a}x + ${b} = ${lhs}$$ olduğuna göre, $x$ kaçtır?`,
    makeOptions(...opts.map(v => `$${v}$`)),
    opts.indexOf(correct),
    `$${a}x + ${b} = ${lhs} \\implies ${a}x = ${lhs} - ${b} = ${lhs - b} \\implies x = \\frac{${lhs - b}}{${a}} = ${correct}$.`);
}

// ─── Template: Karmaşık denklem ─────────────────────────────────────────────
function templateDenklem2() {
  const a = r(2, 8), b = r(1, 10), c = r(1, 8), d = r(2, 12);
  // (ax + b) / c = d  => ax + b = cd => ax = cd - b => x = (cd - b) / a
  // Need integer result
  let x, correct, wrong;
  while (true) {
    x = r(1, 12);
    const lhs = (a * x + b) / c;
    if (lhs === d) {
      correct = x;
      wrong = shuffle(Array.from({length:12},(_,i)=>i+1).filter(v => v !== correct)).slice(0,4);
      const cd = c * d;
      return makeQuestion(SUB,
        `$\\frac{${a}x + ${b}}{${c}} = ${d}$ olduğuna göre, $x$ kaçtır?`,
        makeOptions(...wrong.concat(correct).sort((a,b)=>a-b).map(v => `$${v}$`)),
        cd - b, // This won't work for index
        `$\\frac{${a}x + ${b}}{${c}} = ${d} \\implies ${a}x + ${b} = ${c}\\cdot${d} = ${c*d} \\implies ${a}x = ${c*d} - ${b} = ${c*d - b} \\implies x = ${correct}$`);
    }
  }
}

// ─── Template: Yaş problemi ──────────────────────────────────────────────────
function templateYas() {
  const cocuk = r(3, 15);
  const baba = cocuk + r(20, 35);
  const kacYil = r(3, 15);
  const oran = (baba + kacYil) / (cocuk + kacYil);
  // We need a nice ratio
  if (oran % 1 !== 0 && oran * 2 % 1 !== 0) return null;
  const correct = kacYil;
  const wrong = shuffle([1,2,3,4,5,6,7,8,9,10,12,15,20].filter(v => v !== correct)).slice(0,4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `Bir baba ${baba}, oğlu ${cocuk} yaşındadır. Kaç yıl sonra babanın yaşı oğlunun yaşının ${oran % 1 === 0 ? oran : oran * 2} katı olur?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$x$ yıl sonra: Baba: ${baba} + $x$, Oğul: ${cocuk} + $x$. ${baba} + x = ${oran % 1 === 0 ? oran : oran * 2}(${cocuk} + x) \\implies ${baba} + x = ${oran % 1 === 0 ? oran * cocuk : oran * 2 * cocuk} + ${oran % 1 === 0 ? oran : oran * 2}x \\implies ... \\implies x = ${correct}$.`);
}

// ─── Template: Yüzde problemi ────────────────────────────────────────────────
function templateYuzde() {
  const toplam = r(100, 500);
  const yuzde = pick([10, 15, 20, 25, 30, 40, 50, 60, 75]);
  const deger = Math.round(toplam * yuzde / 100);
  const iskonto = pick(['indirim', 'zam', 'kar']);
  const question = iskonto === 'indirim'
    ? `Bir ürünün fiyatı ${toplam} TL'dir. Üründe %${yuzde} indirim yapılırsa yeni fiyat kaç TL olur?`
    : iskonto === 'zam'
    ? `Bir ürünün fiyatı ${toplam} TL'dir. Ürüne %${yuzde} zam yapılırsa yeni fiyat kaç TL olur?`
    : `Bir mal ${toplam} TL'ye alınıp %${yuzde} kârla satılırsa satış fiyatı kaç TL olur?`;

  const correct = iskonto === 'indirim' ? toplam - deger : toplam + deger;
  const wrongOpts = [toplam, toplam + deger + r(10,50), toplam - deger - r(10,50), deger, deger * 2].filter(v => v !== correct && v > 0).slice(0,4);
  while (wrongOpts.length < 4) wrongOpts.push(correct + r(5,30));
  const all = shuffle([correct, ...wrongOpts.slice(0,4)]);
  return makeQuestion(SUB,
    question,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `%${yuzde} = $\\frac{${yuzde}}{100}$. ${iskonto === 'indirim' ? 'İndirim' : iskonto === 'zam' ? 'Zam' : 'Kâr'} miktarı: $${toplam} \\times \\frac{${yuzde}}{100} = ${deger}$ TL. ${iskonto === 'indirim' ? 'Yeni fiyat' : 'Yeni fiyat'}: $${toplam} ${iskonto === 'indirim' ? '-' : '+'} ${deger} = ${correct}$ TL.`);
}

// ─── Template: Olasılık ─────────────────────────────────────────────────────
function templateOlasilik() {
  const kirmizi = r(2, 6), mavi = r(2, 6), yesil = r(1, 4);
  const toplam = kirmizi + mavi + yesil;
  if (toplam < 3) return null;
  // Probability of drawing kırmızı or mavi
  const istenen = kirmizi + mavi;
  const pay = istenen, payda = toplam;
  const wrongOpts = [
    `${kirmizi}/${toplam}`,
    `${mavi}/${toplam}`,
    `${yesil}/${toplam}`,
    `${istenen + 1}/${toplam}`,
    `${istenen - 1}/${toplam}`,
  ].filter(v => v !== `$$\\frac{${pay}}{${payda}}$`);
  const all = shuffle([`\\frac{${pay}}{${payda}}`, ...wrongOpts.slice(0,4)]);
  return makeQuestion(SUB,
    `Bir torbada ${kirmizi} kırmızı, ${mavi} mavi ve ${yesil} yeşil top vardır. Rastgele çekilen bir topun kırmızı veya mavi olma olasılığı kaçtır?`,
    all.map((v,i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(`\\frac{${pay}}{${payda}}`),
    `Toplam top sayısı: $${kirmizi} + ${mavi} + ${yesil} = ${toplam}$. İstenen durum (kırmızı + mavi): $${kirmizi} + ${mavi} = ${istenen}$. Olasılık: $\\frac{${istenen}}{${toplam}}$.`);
}

// ─── Template: Basit eşitsizlik ──────────────────────────────────────────────
function templateEsitsizlik() {
  const a = r(1, 6), b = r(3, 15);
  const ops = pick(['<', '>', '≤', '≥']);
  const correct = pick([`x ${ops} ${b/a}`, `x ${ops} ${Math.ceil(b/a)}`, `x ${ops} ${Math.floor(b/a)}`]);
  // Actually let's make a simpler one
  const k = r(1, 5), sabit = r(2, 10);
  // kx - sabit < 0 => kx < sabit => x < sabit/k
  // Need sabit/k to be nice
  if (sabit % k !== 0) return null;
  const limit = sabit / k;
  const cevap = `x < ${limit}`;
  const yanlis = shuffle([`x \\leq ${limit-1}`, `x > ${limit}`, `x \\geq ${limit}`, `x < ${limit+1}`, `x \\leq ${limit}`].filter(v => v !== cevap)).slice(0,4);
  const all = shuffle([cevap, ...yanlis]);
  return makeQuestion(SUB,
    `$${k}x - ${sabit} < 0$ eşitsizliğinin çözüm kümesi aşağıdakilerden hangisidir?`,
    all.map((v,i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(cevap),
    `$${k}x - ${sabit} < 0 \\implies ${k}x < ${sabit} \\implies x < \\frac{${sabit}}{${k}} \\implies x < ${limit}$.`);
}

// ─── Template: Mutlak değer ──────────────────────────────────────────────────
function templateMutlak() {
  const a = r(1, 5), b = r(1, 8);
  const sabit = r(2, 6);
  // |ax - b| < sabit  =>  -sabit < ax - b < sabit => b - sabit < ax < b + sabit
  const lower = Math.ceil((b - sabit) / a * 10) / 10;
  const upper = Math.floor((b + sabit) / a * 10) / 10;
  if (lower >= upper) return null;
  const cevap = `(${lower}, ${upper})`;
  const yanlis = shuffle([
    `[${lower}, ${upper}]`,
    `(${lower - 1}, ${upper + 1})`,
    `(${lower}, ${upper + 1})`,
    `[${lower}, ${upper})`,
    `(${upper}, ${lower})`,
  ]).slice(0,4);
  const all = shuffle([cevap, ...yanlis]);
  return makeQuestion(SUB,
    `$|${a}x - ${b}| < ${sabit}$ eşitsizliğinin çözüm kümesi aşağıdakilerden hangisidir?`,
    all.map((v,i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(cevap),
    `$|${a}x - ${b}| < ${sabit} \\implies -${sabit} < ${a}x - ${b} < ${sabit} \\implies ${b - sabit} < ${a}x < ${b + sabit} \\implies \\frac{${b - sabit}}{${a}} < x < \\frac{${b + sabit}}{${a}} \\implies ${lower} < x < ${upper}$.`);
}

// ─── Template: Kümeler ──────────────────────────────────────────────────────
function templateKume() {
  const A = r(8, 20), B = r(8, 20), kesisim = r(2, Math.min(A, B));
  const birlesim = A + B - kesisim;
  const sadeceA = A - kesisim;
  const sadeceB = B - kesisim;
  const pickQ = pick(['birlesim', 'sadeceA', 'kesisim']);
  let question, correct, explanation;
  if (pickQ === 'birlesim') {
    correct = birlesim;
    const wrong = shuffle([A + B, Math.abs(A - B), A, B, kesisim].filter(v => v !== correct)).slice(0,4);
    while (wrong.length < 4) wrong.push(correct + r(1,5));
    const all = shuffle([correct, ...wrong]);
    question = `$s(A) = ${A}$, $s(B) = ${B}$ ve $s(A \\cap B) = ${kesisim}$ ise $s(A \\cup B)$ kaçtır?`;
    explanation = `$s(A \\cup B) = s(A) + s(B) - s(A \\cap B) = ${A} + ${B} - ${kesisim} = ${birlesim}$.`;
    return makeQuestion(SUB, question,
      makeOptions(...all.map(v => `$${v}$`)),
      all.indexOf(correct), explanation);
  } else if (pickQ === 'sadeceA') {
    correct = sadeceA;
    const wrong = shuffle([A, B, kesisim, birlesim, sadeceB].filter(v => v !== correct)).slice(0,4);
    while (wrong.length < 4) wrong.push(correct + r(1,5));
    const all = shuffle([correct, ...wrong]);
    question = `$s(A) = ${A}$, $s(B) = ${B}$ ve $s(A \\cap B) = ${kesisim}$ ise sadece $A$ kümesinin eleman sayısı kaçtır?`;
    explanation = `Sadece $A$: $s(A) - s(A \\cap B) = ${A} - ${kesisim} = ${sadeceA}$.`;
    return makeQuestion(SUB, question,
      makeOptions(...all.map(v => `$${v}$`)),
      all.indexOf(correct), explanation);
  }
  return null;
}

// ─── Template: Fonksiyon ─────────────────────────────────────────────────────
function templateFonksiyon() {
  const a = r(1, 5), b = r(2, 10);
  const x = r(2, 8);
  // f(x) = ax + b, find f(x)
  const correct = a * x + b;
  const wrong = shuffle([a * x, a * x + b + r(1,5), a * x - b, (a+1)*x + b, a * x + b - r(1,5)].filter(v => v !== correct && v > 0)).slice(0,4);
  while (wrong.length < 4) wrong.push(correct + r(1,5));
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$f(x) = ${a}x + ${b}$ ise $f(${x})$ kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$f(${x}) = ${a}\\cdot${x} + ${b} = ${correct}$.`);
}

// ─── Template: Oran-orantı ───────────────────────────────────────────────────
function templateOran() {
  const a = r(2, 8), b = r(3, 9);
  // a/b = ? / ?
  const kat = r(2, 6);
  const pay = a * kat, payda = b * kat;
  const correct = `\\frac{${pay}}{${payda}}`;
  const wrong = shuffle([
    `\\frac{${pay + 1}}{${payda}}`, `\\frac{${pay}}{${payda + 1}}`,
    `\\frac{${pay - 1}}{${payda}}`, `\\frac{${pay}}{${payda - 1}}`,
    `\\frac{${a * (kat + 1)}}{${b * (kat + 1)}}`
  ].filter(v => v !== correct)).slice(0,4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$\\frac{${a}}{${b}} = \\frac{?}{${payda}}$ ise soru işareti kaçtır?`,
    all.map((v,i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(correct),
    `$\\frac{${a}}{${b}} = \\frac{x}{${payda}} \\implies ${a} \\cdot ${payda} = ${b} \\cdot x \\implies ${a * payda} = ${b}x \\implies x = ${pay}$.`);
}

// ─── Template: Köklü sayılar ─────────────────────────────────────────────────
function templateKoklu() {
  const n = pick([2,3,5,6,7,8,10,12]);
  const k = pick([...Array(10)].map((_,i)=>i+2));
  const ic = n * k * k;
  const dis = k;
  const correct = `${dis}\\sqrt{${n}}`;
  const wrong = shuffle([
    `${dis+1}\\sqrt{${n}}`, `${dis}\\sqrt{${n+1}}`,
    `${dis-1}\\sqrt{${n}}`, `${dis}\\sqrt{${n > 1 ? n-1 : n+1}}`,
    `${dis*2}\\sqrt{${n}}`
  ]).slice(0,4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$\\sqrt{${ic}}$ ifadesinin eşiti aşağıdakilerden hangisidir?`,
    all.map((v,i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(correct),
    `$\\sqrt{${ic}} = \\sqrt{${k*k} \\times ${n}} = ${k}\\sqrt{${n}}$.`);
}

// ─── Template: Üslü sayılar ──────────────────────────────────────────────────
function templateUslu() {
  const taban = pick([2,3,4,5]);
  const us1 = r(2, 5), us2 = r(1, 4);
  const v1 = Math.pow(taban, us1);
  const v2 = Math.pow(taban, us2);
  const islem = pick(['carp', 'bol']);
  if (islem === 'carp') {
    const sonUs = us1 + us2;
    const sonuc = Math.pow(taban, sonUs);
    const correct = `\\frac{${sonuc}}{${1}}`;
    // Actually let's make it simpler
  }
  const sonuc = Math.pow(taban, us1 + us2);
  const wrong = shuffle([
    Math.pow(taban, us1 - us2), Math.pow(taban, us1 * us2),
    Math.pow(taban, us1) + Math.pow(taban, us2),
    Math.pow(taban, Math.abs(us1 - us2))
  ].filter(v => v !== sonuc)).slice(0,4);
  while (wrong.length < 4) wrong.push(sonuc + r(1,10));
  const all = shuffle([sonuc, ...wrong]);
  return makeQuestion(SUB,
    `$${taban}^{${us1}} \\cdot ${taban}^{${us2}}$ işleminin sonucu kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(sonuc),
    `$${taban}^{${us1}} \\cdot ${taban}^{${us2}} = ${taban}^{${us1}+${us2}} = ${taban}^{${us1 + us2}} = ${sonuc}$.`);
}

// ─── Template: Sayı problemi ─────────────────────────────────────────────────
function templateSayiProblemi() {
  const bas = r(1, 9);
  const artis = r(2, 5);
  const n = r(3, 8);
  const toplam = bas + (bas + artis) + (bas + 2*artis);
  // Arithmetic series sum
  // Better: sayıların toplamı ver, ortancayı bul
  const orta = bas + artis;
  const correct = orta;
  const wrong = shuffle([bas, bas + 2*artis, bas + artis + r(1,3), bas + artis - r(1,3)]).slice(0,4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `Ardışık ${n} tek sayının toplamı ${toplam}'dır. Buna göre, bu sayıların ortancası kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `Ardışık sayılar: ${bas}, ${bas + artis}, ${bas + 2*artis}. Toplam: ${bas} + ${bas + artis} + ${bas + 2*artis} = ${toplam}. Ortanca: ${orta}.`);
}

// ─── Geometri: Açı ──────────────────────────────────────────────────────────
function templateAci() {
  const aci = pick([30, 45, 60, 90, 120, 150]);
  const butunler = 180 - aci;
  const correct = butunler;
  const wrong = shuffle([90 - aci, 360 - aci, aci, aci + 90, 180 - aci + r(10,30)].filter(v => v > 0 && v !== correct)).slice(0,4);
  while (wrong.length < 4) wrong.push(correct + r(5,20));
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(GEO_SUB,
    `Ölçüsü ${aci}° olan açının bütünler açısının ölçüsü kaç derecedir?`,
    makeOptions(...all.map(v => `$${v}^\\circ$`)),
    all.indexOf(correct),
    `Bütünler açılar toplamı $180^\\circ$'dir. $180^\\circ - ${aci}^\\circ = ${butunler}^\\circ$.`);
}

// ─── Geometri: Üçgen alanı ──────────────────────────────────────────────────
function templateUcgenAlan() {
  const taban = r(4, 12), yukseklik = r(3, 10);
  const alan = (taban * yukseklik) / 2;
  if (alan % 1 !== 0) return null;
  const correct = alan;
  const wrong = shuffle([taban * yukseklik, taban + yukseklik, (taban * yukseklik) / 4, taban * yukseklik / 3].filter(v => v !== correct && v > 0)).slice(0,4);
  while (wrong.length < 4) wrong.push(correct + r(2,8));
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(GEO_SUB,
    `Taban uzunluğu ${taban} cm ve yüksekliği ${yukseklik} cm olan bir üçgenin alanı kaç cm²'dir?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `Üçgenin alanı: $A = \\frac{1}{2} \\times \\text{taban} \\times \\text{yükseklik} = \\frac{1}{2} \\times ${taban} \\times ${yukseklik} = ${alan}$ cm².`);
}

// ─── Geometri: Çember ───────────────────────────────────────────────────────
function templateCember() {
  const r = pick([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const cevre = 2 * Math.PI * r;
  const correct = `${2 * r}\\pi`;
  const wrong = shuffle([
    `${r}\\pi`, `${r * r}\\pi`, `${r + 1}\\pi`,
    `${2 * (r + 1)}\\pi`, `${r * 3}\\pi`
  ]).slice(0,4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(GEO_SUB,
    `Yarıçapı ${r} cm olan bir çemberin çevresi kaç cm'dir? ($\\pi = \\pi$)`,
    all.map((v,i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(correct),
    `Çemberin çevresi: $Ç = 2\\pi r = 2\\pi \\cdot ${r} = ${2*r}\\pi$ cm.`);
}

// ─── Geometri: Dikdörtgen ───────────────────────────────────────────────────
function templateDikdortgen() {
  const kisa = r(3, 8), uzun = r(kisa + 2, 15);
  const alan = kisa * uzun;
  const cevre = 2 * (kisa + uzun);
  const pickQ = pick(['alan', 'cevre']);
  const correct = pickQ === 'alan' ? alan : cevre;
  const wrong = shuffle([pickQ === 'alan' ? cevre : alan, 2 * correct, correct / 2, kisa * uzun / 2, (kisa + uzun)].filter(v => v !== correct)).slice(0,4);
  while (wrong.length < 4) wrong.push(correct + r(3,10));
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(GEO_SUB,
    `Kısa kenarı ${kisa} cm, uzun kenarı ${uzun} cm olan bir dikdörtgenin ${pickQ === 'alan' ? 'alanı' : 'çevresi'} kaç ${pickQ === 'alan' ? 'cm²' : 'cm'}dir?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `${pickQ === 'alan' ? `Alan: $${kisa} \\times ${uzun} = ${correct}$ cm²` : `Çevre: $2(${kisa} + ${uzun}) = 2 \\times ${kisa + uzun} = ${correct}$ cm`}.`);
}

// ─── Template registry ──────────────────────────────────────────────────────
const templates = [
  templateDenklem, templateYuzde, templateOlasilik, templateEsitsizlik,
  templateMutlak, templateFonksiyon, templateKoklu, templateUslu,
  templateSayiProblemi, templateYas, templateOran, templateKume,
  templateAci, templateUcgenAlan, templateCember, templateDikdortgen,
];

export function generate(count = 30) {
  let all = [];

  // Cycle through templates, each producing one question
  for (let i = 0; i < count; i++) {
    const tpl = templates[i % templates.length];
    const q = tpl();
    if (q) all.push(q);
  }

  // Deduplicate and ensure exact count
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
