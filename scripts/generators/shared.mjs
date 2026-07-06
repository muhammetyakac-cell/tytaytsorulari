/**
 * Shared utilities for question generators
 */

// ─── Random helpers ──────────────────────────────────────────────────────────

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randFloat(min, max, decimals = 2) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pluralize(n, singular, plural) {
  return n === 1 ? singular : (plural || `${singular}ler`);
}

// ─── Number formatting ───────────────────────────────────────────────────────

export function asFraction(n, d) {
  return `\\frac{${n}}{${d}}`;
}

export function sqrt(n) {
  return `\\sqrt{${n}}`;
}

// ─── Question builder ────────────────────────────────────────────────────────

export function makeQuestion(sub_category, question, options, correctAnswer, explanation) {
  return { sub_category, question, options, correct_answer: correctAnswer, explanation };
}

export function makeOptions(...texts) {
  return texts.map((t, i) => `${String.fromCharCode(65 + i)}) ${t}`);
}

// ─── Guarantee uniqueness ────────────────────────────────────────────────────

export function generateUnique(generator, count, maxAttempts = 200) {
  const seen = new Set();
  const results = [];
  let attempts = 0;

  while (results.length < count && attempts < maxAttempts) {
    attempts++;
    const q = generator();
    if (!q) continue;
    // Use question text + sub_category as unique key
    const key = `${q.sub_category}|${q.question}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push(q);
    }
  }

  return results;
}

export function stripLatexMath(str) {
  return str.replace(/\$[\s\S]*?\$/g, '').trim();
}
