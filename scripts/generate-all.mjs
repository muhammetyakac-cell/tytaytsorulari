/**
 * TYT AYT - Tüm Kategoriler için Soru Üretme Ana Betiği
 *
 * Kullanım:
 *   node scripts/generate-all.mjs                          # Her kategoriye 40 soru
 *   node scripts/generate-all.mjs --adet=30                # Her kategoriye 30 soru
 *   node scripts/generate-all.mjs --adet=50 --inject       # 50 soru + DB'ye ekle
 *   node scripts/generate-all.mjs --inject                 # 40 soru + DB'ye ekle
 *   node scripts/generate-all.mjs --reset                  # Önce mevcut soruları temizle
 *   node scripts/generate-all.mjs --dry-run                # Kuru çalışma
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

// ─── Kategori Yapılandırması ─────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'tyt-turkce',    file: 'tyt/turkce.json',    title: 'TYT Türkçe',       importPath: './generators/tyt-turkce.mjs' },
  { id: 'tyt-sosyal',    file: 'tyt/sosyal.json',    title: 'TYT Sosyal',       importPath: './generators/tyt-sosyal.mjs' },
  { id: 'tyt-matematik', file: 'tyt/matematik.json', title: 'TYT Matematik',    importPath: './generators/tyt-matematik.mjs' },
  { id: 'tyt-fen',       file: 'tyt/fen.json',       title: 'TYT Fen',          importPath: './generators/tyt-fen.mjs' },
  { id: 'ayt-matematik', file: 'ayt/matematik.json', title: 'AYT Matematik',    importPath: './generators/ayt-matematik.mjs' },
  { id: 'ayt-fen',       file: 'ayt/fen.json',       title: 'AYT Fen',          importPath: './generators/ayt-fen.mjs' },
  { id: 'ayt-edebiyat-sos1', file: 'ayt/edebiyat-sos1.json', title: 'AYT Edebiyat-Sos1', importPath: './generators/ayt-edebiyat-sos1.mjs' },
  { id: 'ayt-sos2',      file: 'ayt/sos2.json',      title: 'AYT Sos2',         importPath: './generators/ayt-sos2.mjs' },
];

// ─── Argümanlar ──────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { adet: 40, inject: false, reset: false, dryRun: false, filter: '' };

  for (const arg of args) {
    if (arg.startsWith('--adet=')) opts.adet = parseInt(arg.split('=')[1]) || 40;
    else if (arg === '--inject') opts.inject = true;
    else if (arg === '--reset') opts.reset = true;
    else if (arg === '--dry-run') opts.dryRun = true;
    else if (!arg.startsWith('--')) opts.filter = arg;
  }

  return opts;
}

// ─── JSON Okuma / Yazma ──────────────────────────────────────────────────────

function loadExisting(filePath) {
  if (!existsSync(filePath)) return [];
  try {
    const raw = readFileSync(filePath, 'utf-8').trim();
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveQuestions(filePath, questions) {
  const dir = join(filePath, '..');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf-8');
  console.log(`  💾 Kaydedildi: ${filePath} (${questions.length} soru)`);
}

// ─── DB Inject (alt süreç) ───────────────────────────────────────────────────

function runBotInject(categoryId) {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', ['scripts/bot-soru-ekle.mjs', categoryId], {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: { ...process.env },
    });
    proc.on('close', code => code === 0 ? resolve() : reject(new Error(`Çıkış kodu: ${code}`)));
    proc.on('error', reject);
  });
}

// ─── Ana ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   TYT AYT - Toplu Soru Üretme              ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');

  const opts = parseArgs();

  // Filtrele
  let cats = CATEGORIES;
  if (opts.filter) {
    cats = CATEGORIES.filter(c => c.id.includes(opts.filter) || opts.filter.includes(c.id));
    if (cats.length === 0) {
      console.error(`❌ "${opts.filter}" ile eşleşen kategori bulunamadı`);
      console.error(`   Kategoriler: ${CATEGORIES.map(c => c.id).join(', ')}`);
      process.exit(1);
    }
  }

  // Reset
  if (opts.reset && !opts.dryRun) {
    console.log('🔴 Mevcut soru dosyaları sıfırlanıyor...');
    for (const cat of cats) {
      const fp = join(process.cwd(), 'testler', cat.file);
      saveQuestions(fp, []);
    }
    console.log('');
  }

  console.log(`Her kategoriye ${opts.adet} soru üretilecek`);
  console.log(`Kategoriler: ${cats.map(c => c.id).join(', ')}`);
  if (opts.dryRun) console.log('🔸 Kuru çalışma (dosyalar değişmeyecek)');
  if (opts.inject) console.log('🔸 DB inject aktif');
  console.log('');

  let totals = { generated: 0, existing: 0, injected: 0 };

  for (const cat of cats) {
    console.log(`╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌`);
    console.log(`📂 ${cat.title} (${cat.id})`);

    try {
      const generator = await import(cat.importPath);
      const filePath = join(process.cwd(), 'testler', cat.file);
      const existing = loadExisting(filePath);
      const existingCount = existing.length;

      console.log(`   Mevcut soru: ${existingCount}`);

      if (opts.reset) {
        // Already reset above
        const questions = generator.generate(opts.adet);
        if (!opts.dryRun) {
          saveQuestions(filePath, questions);
        } else {
          console.log(`   🔸 ${questions.length} soru üretildi (kaydedilmedi)`);
        }
        totals.generated += questions.length;
        totals.existing += questions.length;
      } else {
        // Merge with existing
        const newQuestions = generator.generate(opts.adet);

        // Deduplicate
        const seen = new Set(existing.map(q => `${q.sub_category}|${q.question}`));
        const unique = newQuestions.filter(q => !seen.has(`${q.sub_category}|${q.question}`));

        console.log(`   ${newQuestions.length} soru üretildi, ${unique.length} yeni`);
        totals.generated += unique.length;

        if (unique.length > 0 && !opts.dryRun) {
          const merged = [...existing, ...unique];
          saveQuestions(filePath, merged);
          totals.existing = merged.length;

          // DB inject
          if (opts.inject) {
            console.log('   💿 DB\'ye ekleniyor...');
            try {
              await runBotInject(cat.id);
              totals.injected += unique.length;
              console.log(`   ✅ DB'ye eklendi`);
            } catch (err) {
              console.error(`   ❌ DB inject hatası: ${err.message}`);
            }
          }
        } else if (opts.dryRun) {
          console.log(`   🔸 ${unique.length} yeni soru kaydedilmedi (kuru çalışma)`);
        }
      }

      // Prevent rate limiting
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`   ❌ Hata: ${err.message}`);
    }
    console.log('');
  }

  // Özet
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   ÖZET                                     ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`   Üretilen yeni soru: ${totals.generated}`);
  console.log(`   Toplam dosyadaki soru: ${totals.existing}`);
  if (totals.injected > 0) console.log(`   DB\'ye eklenen: ${totals.injected}`);
  if (opts.dryRun) console.log('   🔸 Kuru çalışma - hiçbir dosya değiştirilmedi');
  console.log('');
}

main().catch(err => {
  console.error('\n❌ Fatal hata:', err);
  process.exit(1);
});
