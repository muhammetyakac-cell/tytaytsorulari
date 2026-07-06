/**
 * TYT AYT Soru Bankası - Yapay Zeka ile Soru Üretme Scripti
 *
 * Kullanım:
 *   node scripts/bot-soru-uret.mjs tyt-matematik --adet=50
 *   node scripts/bot-soru-uret.mjs tyt-matematik --adet=20 --subcategory=geometri --inject
 *   node scripts/bot-soru-uret.mjs all --adet=100 --inject
 *   node scripts/bot-soru-uret.mjs tyt-fen --adet=30 --dry-run
 *
 * Gereksinimler:
 *   - OPENAI_API_KEY ortam değişkeni (veya .env dosyasında)
 *   - npm install openai  (veya native fetch kullanılır)
 */

const { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } = await import('fs');
const { join, dirname } = await import('path');

// ─── Configuration ───────────────────────────────────────────────────────────

const CATEGORIES = {
  'tyt-turkce':     { file: 'tyt/turkce.json',     title: 'TYT Türkçe',       subs: ['sozcuk-anlami', 'cumle-anlami', 'paragraf', 'dil-bilgisi'] },
  'tyt-sosyal':     { file: 'tyt/sosyal.json',     title: 'TYT Sosyal',       subs: ['tarih', 'cografya', 'felsefe', 'din'] },
  'tyt-matematik':  { file: 'tyt/matematik.json',  title: 'TYT Matematik',    subs: ['matematik', 'geometri'] },
  'tyt-fen':        { file: 'tyt/fen.json',        title: 'TYT Fen',          subs: ['fizik', 'kimya', 'biyoloji'] },
  'ayt-matematik':  { file: 'ayt/matematik.json',  title: 'AYT Matematik',    subs: ['matematik'] },
  'ayt-fen':        { file: 'ayt/fen.json',        title: 'AYT Fen',          subs: ['fizik', 'kimya', 'biyoloji'] },
  'ayt-edebiyat-sos1': { file: 'ayt/edebiyat-sos1.json', title: 'AYT Edebiyat-Sos1', subs: ['edebiyat', 'tarih1', 'cografya1'] },
  'ayt-sos2':       { file: 'ayt/sos2.json',       title: 'AYT Sos2',         subs: ['tarih2', 'cografya2', 'felsefe', 'din'] },
};

const SUBCATEGORY_EXAMPLES = {
  'sozcuk-anlami':  'Sözcükte anlam, sözcükler arası anlam ilişkileri (eş anlamlı, zıt anlamlı, yakın anlamlı, vb.)',
  'cumle-anlami':   'Cümlede anlam, cümle yorumu, cümle tamamlama',
  'paragraf':       'Paragrafta anlam, paragrafın konusu, ana düşünce, yardımcı düşünce, paragraf tamamlama',
  'dil-bilgisi':    'Dil bilgisi, sözcük türleri, cümlenin ögeleri, yazım kuralları, noktalama',
  'tarih':           'TYT tarih: İslamiyet öncesi Türk tarihi, Osmanlı, Kurtuluş Savaşı',
  'tarih1':          'AYT tarih: Osmanlı kültür ve medeniyeti, 19. yüzyıl ıslahatları, I. Dünya Savaşı',
  'tarih2':          'AYT tarih: Cumhuriyet dönemi, inkılaplar, çok partili hayat, soğuk savaş',
  'cografya':       'TYT coğrafya: Topoğrafya, iklim, nüfus, göç, tarım, ekonomik faaliyetler',
  'cografya1':      'AYT coğrafya: Jeomorfoloji, dış kuvvetler, iklim tipleri, bitki örtüsü',
  'cografya2':      'AYT coğrafya: Beşeri coğrafya, şehirleşme, küreselleşme, bölgeler',
  'felsefe':        'Felsefe: Varlık felsefesi, bilgi felsefesi, etik, akımlar, düşünürler',
  'din':            'Din kültürü: İslam inanç esasları, ibadetler, ahlak, siyer, kelam',
  'matematik':      'Matematik (TYT veya AYT): Sayılar, denklemler, fonksiyonlar, limit, türev, integral, olasılık',
  'geometri':       'TYT geometri: Açılar, üçgenler, çember, dörtgenler, analitik geometri',
  'fizik':          'Fizik: Kuvvet, hareket, enerji, elektrik, manyetizma, optik, dalgalar, modern fizik',
  'kimya':          'Kimya: Madde, atom, periyodik sistem, kimyasal bağlar, asit-baz, organik kimya, reaksiyonlar',
  'biyoloji':       'Biyoloji: Hücre, canlıların sınıflandırılması, sistemler, genetik, ekoloji',
  'edebiyat':       'Türk edebiyatı: Tanzimat, Servet-i Fünun, Milli Edebiyat, Cumhuriyet dönemi edebiyatı, yazarlar, eserler',
};

const SUBCATEGORY_PROMPTS = {
  'tyt-turkce':     'TYT Türkçe dersine ait (sözcük anlamı, cümle anlamı, paragraf, dil bilgisi) ÖSYM tarzında soru',
  'tyt-sosyal':     'TYT Sosyal Bilimler dersine ait (tarih, coğrafya, felsefe, din kültürü) ÖSYM tarzında soru',
  'tyt-matematik':  'TYT Matematik dersine ait (matematik ve geometri konularından) ÖSYM tarzında soru',
  'tyt-fen':        'TYT Fen Bilimleri dersine ait (fizik, kimya, biyoloji) ÖSYM tarzında soru',
  'ayt-matematik':  'AYT Matematik dersine ait (limit, türev, integral, trigonometri, logaritma, dizi, olasılık) ÖSYM tarzında soru',
  'ayt-fen':        'AYT Fen Bilimleri dersine ait (fizik, kimya, biyoloji) ÖSYM tarzında soru',
  'ayt-edebiyat-sos1': 'AYT Edebiyat-Sosyal Bilimler 1 dersine ait (edebiyat, tarih, coğrafya) ÖSYM tarzında soru',
  'ayt-sos2':       'AYT Sosyal Bilimler 2 dersine ait (tarih, coğrafya, felsefe, din) ÖSYM tarzında soru',
};

// ─── Parse Arguments ─────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const target = args.find(a => !a.startsWith('--')) || '';
  const opts = {
    adet: 10,
    subcategory: '',
    inject: false,
    dryRun: false,
    model: 'gpt-4o',
  };

  for (const arg of args) {
    if (arg.startsWith('--adet=')) opts.adet = parseInt(arg.split('=')[1]) || 10;
    else if (arg.startsWith('--subcategory=')) opts.subcategory = arg.split('=')[1];
    else if (arg.startsWith('--model=')) opts.model = arg.split('=')[1];
    else if (arg === '--inject') opts.inject = true;
    else if (arg === '--dry-run') opts.dryRun = true;
  }

  return { target, ...opts };
}

// ─── AI API Call (OpenAI / Anthropic) ─────────────────────────────────────────

function getApiConfig() {
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const googleKey = process.env.GEMINI_API_KEY;

  if (openaiKey) {
    return {
      provider: 'openai',
      key: openaiKey,
      url: 'https://api.openai.com/v1/chat/completions',
      model: process.env.AI_MODEL || 'gpt-4o',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${openaiKey}` },
      bodyFn: (model, messages) => ({
        model,
        messages,
        temperature: 0.8,
        max_tokens: 4096,
      }),
      parser: (data) => data.choices[0]?.message?.content?.trim() || '',
    };
  }

  if (anthropicKey) {
    return {
      provider: 'anthropic',
      key: anthropicKey,
      url: 'https://api.anthropic.com/v1/messages',
      model: process.env.AI_MODEL || 'claude-sonnet-4-20250514',
      headers: { 'Content-Type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
      bodyFn: (model, messages) => {
        const systemMsg = messages.find(m => m.role === 'system')?.content || '';
        const userMsg = messages.find(m => m.role === 'user')?.content || '';
        return {
          model,
          max_tokens: 4096,
          system: systemMsg,
          messages: [{ role: 'user', content: userMsg }],
        };
      },
      parser: (data) => data.content?.[0]?.text?.trim() || '',
    };
  }

  if (googleKey) {
    return {
      provider: 'google',
      key: googleKey,
      url: `https://generativelanguage.googleapis.com/v1beta/models/${process.env.AI_MODEL || 'gemini-2.0-flash'}:generateContent?key=${googleKey}`,
      model: process.env.AI_MODEL || 'gemini-2.0-flash',
      headers: { 'Content-Type': 'application/json' },
      bodyFn: (model, messages) => {
        const systemMsg = messages.find(m => m.role === 'system')?.content || '';
        const userMsg = messages.find(m => m.role === 'user')?.content || '';
        return {
          contents: [{ parts: [{ text: `${systemMsg}\n\n${userMsg}` }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 4096 },
        };
      },
      parser: (data) => data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '',
    };
  }

  console.error('\n❌ API anahtarı bulunamadı!');
  console.error('   .env dosyasına aşağıdakilerden birini ekleyin:');
  console.error('   - OPENAI_API_KEY=sk-...  (OpenAI)');
  console.error('   - ANTHROPIC_API_KEY=sk-...  (Anthropic)');
  console.error('   - GEMINI_API_KEY=...  (Google Gemini)');
  console.error('   İsteğe bağlı: AI_MODEL=gpt-4o-mini (model seçimi)\n');
  process.exit(1);
}

const SYSTEM_PROMPT = `Sen bir ÖSYM sınav soruları yazarısın. Verilen formatta geçerli JSON dizisi üretmelisin.

KURALLAR:
1. Her soru mutlaka 5 seçenekli (A, B, C, D, E) olsun
2. correct_answer 0-bazlı indeks olsun (A=0, B=1, C=2, D=3, E=4)
3. Matematiksel ifadeler için KaTeX formatı kullan: $...$ inline, $$...$$ block (örnek: $\\\\frac{1}{2}$, $x^2$, $\\\\sqrt{3}$)
4. Sorular ÖSYM formatına uygun, net ve anlaşılır olsun
5. Açıklamalar adım adım ve anlaşılır olsun, matematiksel çözümlerde KaTeX kullan
6. SADECE geçerli bir JSON dizisi döndür, başka açıklama ekleme
7. Her soru için sub_category alanı doğru olsun

JSON FORMATI:
[
  {
    "sub_category": "...",
    "question": "soru metni",
    "options": ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."],
    "correct_answer": 0,
    "explanation": "çözüm açıklaması"
  }
]`;

async function callAI(prompt, modelOverride = '', retries = 3) {
  const config = getApiConfig();
  const model = modelOverride || config.model;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const body = config.bodyFn(model, [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ]);

      const res = await fetch(config.url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`${config.provider} Hata ${res.status}: ${err.substring(0, 200)}`);
      }

      const data = await res.json();
      const content = config.parser(data);

      // Extract JSON from markdown code block if present
      let jsonStr = content;
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) jsonStr = jsonMatch[1].trim();

      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed)) throw new Error('Yanıt bir dizi değil');
      if (parsed.length === 0) throw new Error('Boş dizi');

      return parsed;
    } catch (err) {
      console.error(`  ⚠ API çağrısı başarısız (deneme ${attempt}/${retries}): ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validateQuestions(questions) {
  const valid = [];
  const errors = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const idx = i + 1;

    if (!q.question || typeof q.question !== 'string') {
      errors.push(`  Soru ${idx}: question alanı eksik veya geçersiz`); continue;
    }
    if (!Array.isArray(q.options) || q.options.length !== 5) {
      errors.push(`  Soru ${idx}: options 5 elemanlı dizi olmalı`); continue;
    }
    if (typeof q.correct_answer !== 'number' || q.correct_answer < 0 || q.correct_answer > 4) {
      errors.push(`  Soru ${idx}: correct_answer 0-4 arası olmalı`); continue;
    }
    if (!q.explanation || typeof q.explanation !== 'string') {
      errors.push(`  Soru ${idx}: explanation alanı eksik`); continue;
    }
    if (!q.sub_category || typeof q.sub_category !== 'string') {
      errors.push(`  Soru ${idx}: sub_category alanı eksik`); continue;
    }

    // Ensure options have letter prefix
    const fixedOptions = q.options.map((opt, oi) => {
      const letter = String.fromCharCode(65 + oi);
      return opt.startsWith(`${letter}) `) ? opt : `${letter}) ${opt}`;
    });

    valid.push({ ...q, options: fixedOptions });
  }

  return { valid, errors };
}

// ─── File Operations ─────────────────────────────────────────────────────────

function loadExistingQuestions(filePath) {
  if (!existsSync(filePath)) return [];
  try {
    const raw = readFileSync(filePath, 'utf-8').trim();
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    console.error(`  ⚠ ${filePath} okunamadı, boş başlanıyor`);
    return [];
  }
}

function saveQuestions(filePath, questions) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf-8');
}

function deduplicate(existing, newOnes) {
  const existingTexts = new Set(existing.map(q => q.question.trim()));
  const unique = [];
  for (const q of newOnes) {
    if (!existingTexts.has(q.question.trim())) {
      existingTexts.add(q.question.trim());
      unique.push(q);
    }
  }
  return unique;
}

// ─── Prompt Builder ──────────────────────────────────────────────────────────

function buildPrompt(categoryId, count, subcategoryFilter) {
  const cat = CATEGORIES[categoryId];
  const prompt = SUBCATEGORY_PROMPTS[categoryId] || `ÖSYM tarzında ${cat.title} sorusu`;

  let subs = cat.subs;
  let extra = '';

  if (subcategoryFilter) {
    const filtered = subs.filter(s => s.includes(subcategoryFilter));
    if (filtered.length > 0) {
      subs = filtered;
      extra = `\nSadece "${subcategoryFilter}" alt konusundan soru hazırla.`;
    }
  }

  const subDescs = subs.map(s => {
    const desc = SUBCATEGORY_EXAMPLES[s] || s;
    return `  - "${s}": ${desc}`;
  }).join('\n');

  return `Aşağıdaki kategori için ÖSYM formatında TAM OLARAK ${count} adet soru üret.

Kategori: ${cat.title} (${categoryId})
Alt konular:
${subDescs}${extra}

Her soru için:
- sub_category: yukarıdaki alt konulardan uygun olanı seç
- question: soru metni (gerekiyorsa \\n ile satır atla, matematik için KaTeX kullan)
- options: ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."]
- correct_answer: 0-4 arası indeks
- explanation: adım adım çözüm (KaTeX destekli)

Sadece JSON dizisi üret, başka metin yazma.`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   TYT AYT - Yapay Zeka Soru Üretici         ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');

  const { target, adet, subcategory, inject, dryRun, model } = parseArgs();

  // Determine which categories to process
  let catsToProcess = [];
  if (target === 'all') {
    catsToProcess = Object.keys(CATEGORIES);
  } else if (CATEGORIES[target]) {
    catsToProcess = [target];
  } else {
    // Try fuzzy matching
    const matched = Object.keys(CATEGORIES).find(k => k.includes(target) || target.includes(k));
    if (matched) {
      catsToProcess = [matched];
    } else {
      console.error(`❌ Geçersiz kategori: "${target}"`);
      console.error(`   Mevcut kategoriler: ${Object.keys(CATEGORIES).join(', ')}`);
      console.error(`   Veya "all" kullanarak tüm kategorilere üretebilirsiniz.\n`);
      process.exit(1);
    }
  }

  const batchSize = Math.min(adet, 10); // Max 10 questions per API call

  console.log(`Model: ${model}`);
  console.log(`Hedef: ${catsToProcess.join(', ')}`);
  console.log(`Toplam hedef: ${adet} soru`);
  if (subcategory) console.log(`Alt konu filtresi: ${subcategory}`);
  if (dryRun) console.log('🔸 Kuru çalışma (dosyaya yazılmayacak)');
  if (inject) console.log('🔸 DB inject aktif');
  console.log('');

  let grandTotal = { generated: 0, saved: 0, errors: 0, injected: 0 };

  for (const categoryId of catsToProcess) {
    const cat = CATEGORIES[categoryId];
    const filePath = join(process.cwd(), 'testler', cat.file);

    console.log(`╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌`);
    console.log(`📂 ${cat.title} (${categoryId})`);
    console.log(`   Dosya: ${cat.file}`);

    const existing = loadExistingQuestions(filePath);
    console.log(`   Mevcut soru: ${existing.length}`);

    const perCategory = Math.ceil(adet / catsToProcess.length);
    let needed = perCategory;
    if (catsToProcess.length === 1) needed = adet;

    if (needed <= 0) {
      console.log('   ✅ Yeterli soru var, atlanıyor');
      continue;
    }

    console.log(`   Üretilecek: ${needed} soru`);
    console.log('');

    let allNew = [];
    let attempts = 0;
    const maxAttempts = Math.ceil(needed / batchSize) + 3;

    while (allNew.length < needed && attempts < maxAttempts) {
      attempts++;
      const batchCount = Math.min(batchSize, needed - allNew.length);
      console.log(`   🤖 API çağrısı #${attempts} (${batchCount} soru isteniyor)...`);

      try {
        const prompt = buildPrompt(categoryId, batchCount + 2, subcategory);
        const response = await callAI(prompt, model);

        const { valid, errors } = validateQuestions(response);
        if (errors.length > 0) {
          console.error(`   ⚠ Doğrulama hataları:`);
          errors.forEach(e => console.error(`      ${e}`));
        }

        if (valid.length === 0) {
          console.log('   ⚠ Geçerli soru üretilemedi, yeniden deneniyor...');
          continue;
        }

        // Deduplicate against existing + already collected new
        const unique = deduplicate([...existing, ...allNew], valid);
        console.log(`   ✅ ${valid.length} soru üretildi, ${unique.length} yeni (${valid.length - unique.length} mükerrer)`);

        allNew.push(...unique);
      } catch (err) {
        console.error(`   ❌ API hatası: ${err.message}`);
        grandTotal.errors++;
      }

      // Rate limiting delay
      if (allNew.length < needed && attempts < maxAttempts) {
        console.log('   ⏳ 2 saniye bekleniyor...');
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    console.log(`\n   📊 ${cat.title}: ${allNew.length} yeni soru üretildi`);

    if (allNew.length > 0 && !dryRun) {
      const updated = [...existing, ...allNew];
      saveQuestions(filePath, updated);
      grandTotal.saved += allNew.length;
      console.log(`   💾 ${filePath} dosyasına kaydedildi (toplam ${updated.length} soru)`);
    } else if (allNew.length > 0 && dryRun) {
      console.log(`   🔸 Kuru çalışma: ${allNew.length} soru kaydedilmedi`);
    }

    grandTotal.generated += allNew.length;

    // Auto-inject to DB
    if (inject && allNew.length > 0 && !dryRun) {
      console.log(`   💿 DB'ye ekleniyor...`);
      try {
        const { default: botScript } = await import('./bot-soru-ekle.mjs');
        // We can't easily import the other script's functions, so just run it as a child process
      } catch {}

      // Run bot-soru-ekle.mjs as child process
      const { spawn } = await import('child_process');
      await new Promise((resolve, reject) => {
        const proc = spawn('node', ['scripts/bot-soru-ekle.mjs', categoryId], {
          stdio: 'inherit',
          cwd: process.cwd(),
          env: { ...process.env },
        });
        proc.on('close', (code) => {
          if (code === 0) {
            grandTotal.injected += allNew.length;
            console.log(`   ✅ ${allNew.length} soru DB'ye eklendi`);
            resolve();
          } else {
            console.error(`   ❌ DB ekleme başarısız (kod: ${code})`);
            reject(new Error(`DB inject failed with code ${code}`));
          }
        });
        proc.on('error', reject);
      });
    }

    console.log('');
  }

  // Summary
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   ÖZET                                     ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`   Üretilen: ${grandTotal.generated} soru`);
  console.log(`   Kaydedilen: ${grandTotal.saved} soru`);
  if (grandTotal.injected > 0) console.log(`   DB\'ye eklenen: ${grandTotal.injected} soru`);
  if (grandTotal.errors > 0) console.log(`   Hata: ${grandTotal.errors}`);
  if (dryRun) console.log('   🔸 Kuru çalışma - hiçbir dosya değiştirilmedi');
  console.log('');
}

main().catch(err => {
  console.error('\n❌ Fatal hata:', err);
  process.exit(1);
});
