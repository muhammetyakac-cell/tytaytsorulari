import { randInt, pick, shuffle, makeQuestion, makeOptions, generateUnique } from './shared.mjs';

const SUB = 'matematik';
const r = (a, b) => randInt(a, b);

function fact(n) {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

function fmtPoly(coeffs) {
  const parts = [];
  for (const [c, p] of coeffs) {
    if (c === 0) continue;
    const sign = parts.length === 0 ? (c < 0 ? '-' : '') : (c > 0 ? ' + ' : ' - ');
    const absC = Math.abs(c);
    const cs = absC === 1 && p > 0 ? '' : `${absC}`;
    if (p === 0) parts.push(`${sign}${cs}`);
    else if (p === 1) parts.push(`${sign}${cs}x`);
    else parts.push(`${sign}${cs}x^{${p}}`);
  }
  return parts.join('').trim() || '0';
}

function fmtComplex(re, im) {
  if (re === 0 && im === 0) return '0';
  if (re === 0) return `${im}i`;
  if (im === 0) return `${re}`;
  return im > 0 ? `${re} + ${im}i` : `${re} - ${Math.abs(im)}i`;
}

function templateLimit1() {
  const a = r(2, 5);
  const correct = 2 * a;
  const wrong = shuffle([a, a + 1, a * a, correct + 1, a - 1].filter(v => v !== correct && v > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}}$ limitinin değeri kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}} = \\lim_{x \\to ${a}} \\frac{(x-${a})(x+${a})}{x-${a}} = \\lim_{x \\to ${a}} (x+${a}) = ${a} + ${a} = ${correct}$.`);
}

function templateLimit2() {
  const a = r(1, 4);
  const b = r(-3, 5);
  if (b === a) return null;
  const sum = a + b;
  const prod = a * b;
  const correct = a - b;
  const wrong = shuffle([a + b, b - a, a * b, a, b, correct + 1, correct - 1].filter(v => v !== correct)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  const numStr = prod === 0
    ? `x^2 - ${sum}x`
    : prod < 0
      ? `x^2 - ${sum}x - ${Math.abs(prod)}`
      : `x^2 - ${sum}x + ${prod}`;
  return makeQuestion(SUB,
    `$\\lim_{x \\to ${a}} \\frac{${numStr}}{x - ${a}}$ limitinin değeri kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `Pay\\, $${numStr} = (x-${a})(x-${b})$. $\\lim_{x \\to ${a}} \\frac{(x-${a})(x-${b})}{x-${a}} = \\lim_{x \\to ${a}} (x-${b}) = ${a} - ${b} = ${correct}$.`);
}

function templateLimit3() {
  const a = r(1, 4);
  const d = r(1, 4);
  const b = r(-5, 5);
  const c = r(-5, 5);
  const e = r(-5, 5);
  const f = r(-5, 5);
  const correct = `\\frac{${a}}{${d}}`;
  const wrong = shuffle([
    `\\frac{${b}}{${e}}`, `\\frac{${a + 1}}{${d}}`, `\\frac{${a}}{${d + 1}}`,
    `\\frac{${c}}{${f}}`, `\\frac{${d}}{${a}}`
  ].filter(v => v !== correct)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$\\lim_{x \\to \\infty} \\frac{${a}x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)}}{${d}x^2 ${e >= 0 ? '+' : '-'} ${Math.abs(e)}x ${f >= 0 ? '+' : '-'} ${Math.abs(f)}}$ limitinin değeri kaçtır?`,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(correct),
    `$x \\to \\infty$ için en büyük dereceli terimler öne çıkar: $\\frac{${a}x^2}{${d}x^2} = \\frac{${a}}{${d}}$.`);
}

function templateTurev1() {
  const a = r(1, 4);
  const n = r(2, 3);
  const b = r(-4, 4);
  const c = r(-3, 3);
  const k = r(1, 3);
  const derivCoeff = a * n;
  const correct = derivCoeff * Math.pow(k, n - 1) + b;
  const candidates = [correct + 1, correct - 1, correct + a, correct - a, derivCoeff * Math.pow(k + 1, n - 1) + b, b].filter(v => v !== correct);
  const wrong = shuffle(candidates).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  const fStr = fmtPoly([[a, n], [b, 1], [c, 0]]);
  return makeQuestion(SUB,
    `$f(x) = ${fStr}$ olduğuna göre $f'(${k})$ kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$f'(x) = ${derivCoeff}x^{${n - 1}} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}$ ise $f'(${k}) = ${derivCoeff} \\cdot ${k}^{${n - 1}} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${correct}$.`);
}

function templateTurev2() {
  const a = r(1, 3);
  const t = r(-4, 4);
  const b = -2 * a * t;
  const c = r(-4, 4);
  const correct = t;
  const wrong = shuffle([t + 1, t - 1, -t, -b, c, t + a, t - a].filter(v => v !== correct)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  const fStr = fmtPoly([[a, 2], [b, 1], [c, 0]]);
  return makeQuestion(SUB,
    `$f(x) = ${fStr}$ fonksiyonunun $f'(x) = 0$ denklemini sağlayan $x$ değeri kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$f'(x) = ${2 * a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}$. $f'(x) = 0 \\implies ${2 * a}x = ${Math.abs(b)} \\implies x = ${correct}$.`);
}

function templateIntegral1() {
  const pairs = [[2, 3], [2, 6], [1, 2], [1, 4], [3, 4], [3, 8]];
  const [[n, a], [m, b]] = shuffle(pairs).slice(0, 2);
  const c = r(1, 4);
  const cA = a / (n + 1);
  const cB = b / (m + 1);
  if (cA % 1 !== 0 || cB % 1 !== 0) return null;
  const correctStr = `${cA === 1 ? '' : cA}x^{${n + 1}} ${cB >= 0 ? '+' : '-'} ${Math.abs(cB) === 1 ? '' : Math.abs(cB)}x^{${m + 1}} ${c >= 0 ? '+' : '-'} ${Math.abs(c)}x + C`;
  const wrongStrs = shuffle([
    `${cA === 1 ? '' : cA + 1}x^{${n + 1}} ${cB >= 0 ? '+' : '-'} ${Math.abs(cB) === 1 ? '' : Math.abs(cB)}x^{${m + 1}} ${c >= 0 ? '+' : '-'} ${Math.abs(c)}x + C`,
    `${cA === 1 ? '' : cA}x^{${n + 1}} ${cB >= 0 ? '+' : '-'} ${Math.abs(cB) + 1 === 1 ? '' : Math.abs(cB) + 1}x^{${m + 1}} ${c >= 0 ? '+' : '-'} ${Math.abs(c)}x + C`,
    `${cA === 1 ? '' : cA}x^{${n + 1}} ${cB >= 0 ? '+' : '-'} ${Math.abs(cB) === 1 ? '' : Math.abs(cB)}x^{${m + 1}} + C`,
    `x^{${n + 2}} ${cB >= 0 ? '+' : '-'} ${Math.abs(cB) === 1 ? '' : Math.abs(cB)}x^{${m + 1}} ${c >= 0 ? '+' : '-'} ${Math.abs(c)}x + C`
  ]).slice(0, 4);
  const all = shuffle([correctStr, ...wrongStrs]);
  return makeQuestion(SUB,
    `$\\int (${a}x^{${n}} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x^{${m}} ${c >= 0 ? '+' : '-'} ${Math.abs(c)}) dx$ integralinin sonucu aşağıdakilerden hangisidir?`,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(correctStr),
    `$\\int ${a}x^{${n}} dx = ${cA}x^{${n + 1}}$, $\\int ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x^{${m}} dx = ${cB >= 0 ? '+' : '-'} ${Math.abs(cB)}x^{${m + 1}}$, $\\int ${c} dx = ${c}x$. Sonuç: $${correctStr}$.`);
}

function templateIntegral2() {
  const n = r(1, 3);
  const k = (n + 1) * r(1, 3);
  const a = 0;
  const b = r(a + 2, 5);
  const correct = (k / (n + 1)) * (Math.pow(b, n + 1) - Math.pow(a, n + 1));
  if (correct % 1 !== 0) return null;
  const wrong = shuffle([correct + 1, correct - 1, correct + (n + 1), correct * 2, correct / 2].filter(v => v !== correct && v > 0 && v % 1 === 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$\\int_{${a}}^{${b}} ${k}x^{${n}} dx$ integralinin değeri kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$\\int ${k}x^{${n}} dx = \\frac{${k}}{${n + 1}} x^{${n + 1}}$. $\\left[\\frac{${k}}{${n + 1}} x^{${n + 1}}\\right]_{${a}}^{${b}} = \\frac{${k}}{${n + 1}} (${b}^{${n + 1}} - ${a}^{${n + 1}}) = ${correct}$.`);
}

function templateTrigonometri1() {
  const q = pick([
    { q: '$\\sin^2 x + \\cos^2 x$ ifadesinin eşiti nedir?', a: '1', w: ['0', '-1', '$\\frac{1}{2}$', '$\\sin x + \\cos x$'], e: 'Temel trigonometrik özdeşliğe göre $\\sin^2 x + \\cos^2 x = 1$.' },
    { q: '$\\frac{\\sin x}{\\cos x}$ ifadesinin eşiti nedir?', a: '$\\tan x$', w: ['$\\cot x$', '$\\sec x$', '$\\csc x$', '$\\cos x \\cdot \\sin x$'], e: '$\\frac{\\sin x}{\\cos x} = \\tan x$ temel özdeşliktir.' },
    { q: '$1 + \\tan^2 x$ ifadesinin eşiti nedir?', a: '$\\sec^2 x$', w: ['$\\csc^2 x$', '$\\cot^2 x$', '$\\sin^2 x$', '$\\cos^2 x$'], e: '$1 + \\tan^2 x = \\sec^2 x = \\frac{1}{\\cos^2 x}$.' },
    { q: '$\\sin(\\frac{\\pi}{2} - x)$ ifadesinin eşiti nedir?', a: '$\\cos x$', w: ['$-\\cos x$', '$\\sin x$', '$\\tan x$', '$\\cot x$'], e: 'Tümler açı özdeşliği: $\\sin(\\frac{\\pi}{2} - x) = \\cos x$.' },
    { q: '$\\cos 2x$ ifadesinin aşağıdaki eşitlerinden hangisi yanlıştır?', a: '$2\\cos^2 x - 1$', w: ['$\\cos^2 x - \\sin^2 x$', '$1 - 2\\sin^2 x$', '$2\\sin x \\cos x$'], e: '$\\cos 2x = \\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x$. $2\\sin x \\cos x = \\sin 2x$ olduğundan yanlıştır.' },
  ]);
  const wrong = shuffle(q.w).slice(0, 4);
  const all = shuffle([q.a, ...wrong]);
  return makeQuestion(SUB,
    q.q,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(q.a),
    q.e);
}

function templateTrigonometri2() {
  const data = [
    { val: '\\frac{\\sqrt{2}}{2}', ans: '\\frac{\\pi}{4}', opts: ['\\frac{\\pi}{6}', '\\frac{\\pi}{3}', '\\frac{\\pi}{2}', '\\frac{2\\pi}{3}'] },
    { val: '\\frac{1}{2}', ans: '\\frac{\\pi}{6}', opts: ['\\frac{\\pi}{4}', '\\frac{\\pi}{3}', '\\frac{\\pi}{2}', '\\frac{\\pi}{8}'] },
    { val: '\\frac{\\sqrt{3}}{2}', ans: '\\frac{\\pi}{3}', opts: ['\\frac{\\pi}{6}', '\\frac{\\pi}{4}', '\\frac{\\pi}{2}', '\\frac{2\\pi}{3}'] },
    { val: '0', ans: '\\pi', opts: ['0', '\\frac{\\pi}{2}', '\\frac{\\pi}{4}', '\\frac{\\pi}{6}'] },
  ];
  const d = pick(data);
  const func = pick(['sin', 'cos']);
  const all = shuffle([d.ans, ...d.opts]);
  return makeQuestion(SUB,
    `$${func} x = ${d.val}$ denkleminin $[0, \\pi]$ aralığındaki çözümü aşağıdakilerden hangisidir?`,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(d.ans),
    `$${func} x = ${d.val}$ denkleminin $[0, \\pi]$ aralığındaki çözümü $x = ${d.ans}$ tir.`);
}

function templateLogaritma1() {
  const a = r(2, 5);
  const b = r(1, a - 2);
  if (a - b < 2) return null;
  const x = a - b;
  const correct = x;
  const wrong = shuffle([x + 1, x - 1, a, b, b + a, x + a].filter(v => v !== correct && v > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$\\log_{${a}}(x^2 - ${b * b}) - \\log_{${a}}(x - ${b}) = 1$ ise $x$ kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$\\log_{${a}} \\frac{x^2 - ${b * b}}{x - ${b}} = 1 \\implies \\log_{${a}} (x + ${b}) = 1 \\implies x + ${b} = ${a} \\implies x = ${x}$.`);
}

function templateLogaritma2() {
  const a = r(2, 4);
  const b = a * a;
  const correct = 2;
  const wrong = shuffle([1, 3, 4, a, b]).filter(v => v !== correct).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$\\log_{${a}} ${b} + \\log_{${a}} 1$ işleminin sonucu kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$\\log_{${a}} ${b} = 2$ ve $\\log_{${a}} 1 = 0$ olduğundan sonuç $2 + 0 = 2$ dir.`);
}

function templateDiziAritmetik() {
  const ilk = r(2, 10);
  const fark = r(2, 6);
  const n = r(6, 15);
  const correct = ilk + (n - 1) * fark;
  const wrong = shuffle([ilk + (n - 1) * fark + fark, ilk + (n - 2) * fark, ilk * n, ilk + fark * n, fark * (n - 1)].filter(v => v !== correct && v > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `İlk terimi ${ilk}, ortak farkı ${fark} olan bir aritmetik dizinin ${n}. terimi kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$a_${n} = a_1 + (n-1)d = ${ilk} + (${n} - 1) \\cdot ${fark} = ${ilk} + ${(n - 1) * fark} = ${correct}$.`);
}

function templateDiziGeometrik() {
  const ilk = r(1, 4);
  const oran = r(2, 4);
  const n = r(4, 7);
  const correct = ilk * Math.pow(oran, n - 1);
  const wrong = shuffle([ilk * Math.pow(oran, n), ilk * Math.pow(oran, n - 2), ilk * Math.pow(oran + 1, n - 1), oran * Math.pow(ilk, n - 1), ilk * Math.pow(oran, n - 1) + 1].filter(v => v !== correct && v > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `İlk terimi ${ilk}, ortak çarpanı ${oran} olan bir geometrik dizinin ${n}. terimi kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$a_${n} = a_1 \\cdot r^{n-1} = ${ilk} \\cdot ${oran}^{${n - 1}} = ${correct}$.`);
}

function templateKarmasikIslem() {
  const a = r(1, 5);
  const b = r(-5, 5);
  const c = r(1, 5);
  const d = r(-5, 5);
  const islem = pick(['+', '-']);
  let re, im;
  if (islem === '+') {
    re = a + c;
    im = b + d;
  } else {
    re = a - c;
    im = b - d;
  }
  const correctStr = fmtComplex(re, im);
  const wrong = shuffle([
    fmtComplex(re + 1, im), fmtComplex(re, im + 1), fmtComplex(a + c, b - d),
    fmtComplex(b, a), fmtComplex(im, re)
  ].filter(v => v !== correctStr)).slice(0, 4);
  const all = shuffle([correctStr, ...wrong]);
  const z1 = fmtComplex(a, b);
  const z2 = fmtComplex(c, d);
  return makeQuestion(SUB,
    `$z_1 = ${z1}$ ve $z_2 = ${z2}$ ise $z_1 ${islem} z_2$ işleminin sonucu aşağıdakilerden hangisidir?`,
    all.map((v, i) => `${String.fromCharCode(65 + i)}) $${v}$`),
    all.indexOf(correctStr),
    `$z_1 ${islem} z_2 = (${a} ${islem} ${c}) + (${b} ${islem} ${d})i = ${correctStr}$.`);
}

function templateKarmasikModulus() {
  const pairs = [[3, 4], [6, 8], [5, 12], [8, 15], [7, 24], [9, 12]];
  const [a, b] = pick(pairs);
  const mod = Math.sqrt(a * a + b * b);
  const correct = mod;
  const wrong = shuffle([a, b, a + b, mod + 1, mod - 1, Math.abs(a - b)].filter(v => v !== correct && v > 0)).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$z = ${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i$ karmaşık sayısının modülü kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$|z| = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a + b * b}} = ${mod}$.`);
}

function templatePermutasyon() {
  const n = r(5, 10);
  const rVal = r(2, Math.min(4, n));
  const correct = fact(n) / fact(n - rVal);
  const wrongOpts = [fact(n), fact(n) / fact(rVal), fact(n - rVal), fact(n - 1) / fact(n - rVal - 1), correct + r(5, 20)].filter(v => v !== correct && v > 0);
  const wrong = shuffle(wrongOpts).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$P(${n}, ${rVal})$ permütasyonunun değeri kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$P(${n}, ${rVal}) = \\frac{${n}!}{(${n} - ${rVal})!} = \\frac{${fact(n)}}{${fact(n - rVal)}} = ${correct}$.`);
}

function templateKombinasyon() {
  const n = r(6, 12);
  const rVal = r(2, Math.min(5, n));
  const correct = fact(n) / (fact(rVal) * fact(n - rVal));
  const wrongOpts = [fact(n) / fact(rVal), fact(n) / fact(n - rVal), correct + r(5, 30), Math.round(correct * 1.5), Math.round(correct * 0.5)].filter(v => v !== correct && v > 0);
  const wrong = shuffle(wrongOpts).slice(0, 4);
  const all = shuffle([correct, ...wrong]);
  return makeQuestion(SUB,
    `$C(${n}, ${rVal})$ kombinasyonunun değeri kaçtır?`,
    makeOptions(...all.map(v => `$${v}$`)),
    all.indexOf(correct),
    `$C(${n}, ${rVal}) = \\frac{${n}!}{${rVal}! \\cdot (${n} - ${rVal})!} = \\frac{${fact(n)}}{${fact(rVal)} \\cdot ${fact(n - rVal)}} = ${correct}$.`);
}

const templates = [
  templateLimit1, templateLimit2, templateLimit3,
  templateTurev1, templateTurev2,
  templateIntegral1, templateIntegral2,
  templateTrigonometri1, templateTrigonometri2,
  templateLogaritma1, templateLogaritma2,
  templateDiziAritmetik, templateDiziGeometrik,
  templateKarmasikIslem, templateKarmasikModulus,
  templatePermutasyon, templateKombinasyon,
];

export function generate(count = 30) {
  return generateUnique(() => {
    const tpl = pick(templates);
    return tpl();
  }, count);
}
