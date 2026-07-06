/**
 * TYT AYT Soru Bankası - Bot ile Soru Ekleme Scripti
 * 
 * Kullanım:
 *   node scripts/bot-soru-ekle.mjs              # Tüm JSON dosyalarını yükle
 *   node scripts/bot-soru-ekle.mjs tyt           # Sadece TYT yükle
 *   node scripts/bot-soru-ekle.mjs ayt/matematik # Sadece AYT matematik yükle
 *   node scripts/bot-soru-ekle.mjs --dry-run     # Yüklemeden sadece listele
 *   node scripts/bot-soru-ekle.mjs --reset       # Önce mevcut veriyi temizle
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, relative } from 'path';

const sql = neon(process.env.DATABASE_URL);

// Map from JSON path to category_id
function detectCategory(relPath) {
  const parts = relPath.replace(/\\/g, '/').replace(/\.json$/, '').toLowerCase().split('/');
  if (parts.length < 2) return null;
  const exam = parts[0]; // tyt or ayt
  const name = parts[1];
  const slug = `${exam}-${name}`;
  const validCategories = [
    'tyt-turkce', 'tyt-sosyal', 'tyt-matematik', 'tyt-fen',
    'ayt-matematik', 'ayt-fen', 'ayt-edebiyat-sos1', 'ayt-sos2'
  ];
  if (validCategories.includes(slug)) return slug;
  // Fallback: try to match
  for (const cat of validCategories) {
    if (cat.includes(name)) return cat;
  }
  return null;
}

async function insertQuestions(categoryId, questions, dryRun = false) {
  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const q of questions) {
    try {
      // Create the options array with letter prefixes if not present
      const options = q.options.map((opt, i) => {
        const letter = String.fromCharCode(65 + i); // A, B, C, D, E
        return opt.startsWith(`${letter}) `) ? opt : `${letter}) ${opt}`;
      });

      if (dryRun) {
        console.log(`  [DRY] ${q.sub_category}: ${q.question.substring(0, 60)}...`);
        inserted++;
        continue;
      }

      // Check if question already exists by hash of question text
      const existing = await sql`SELECT id FROM questions WHERE category_id = ${categoryId} AND question = ${q.question} LIMIT 1`;
      
      if (existing.length > 0) {
        skipped++;
        continue;
      }

      await sql`
        INSERT INTO questions (category_id, sub_category, question, options, correct_answer, explanation)
        VALUES (${categoryId}, ${q.sub_category}, ${q.question}, ${JSON.stringify(options)}, ${q.correct_answer}, ${q.explanation})
      `;
      inserted++;
    } catch (err) {
      console.error(`  [ERROR] ${q.sub_category}: ${err.message}`);
      errors++;
    }
  }

  return { inserted, skipped, errors };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const reset = args.includes('--reset');
  const filter = args.filter(a => !a.startsWith('--'))[0] || '';

  const testlerDir = join(process.cwd(), 'testler');
  if (!existsSync(testlerDir)) {
    console.error('HATA: testler/ klasörü bulunamadı!');
    console.log('Önce testler/ klasörünü oluşturun ve JSON soru dosyalarını ekleyin.');
    process.exit(1);
  }

  if (reset && !dryRun) {
    console.log('Mevcut sorular temizleniyor...');
    await sql`DELETE FROM user_progress`;
    await sql`DELETE FROM questions`;
    await sql`ALTER SEQUENCE questions_id_seq RESTART WITH 1`;
    console.log('Temizlendi!\n');
  }

  // Collect JSON files
  const files = [];
  function walk(dir, base) {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, base || dir);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        const rel = relative(base || testlerDir, fullPath);
        files.push({ path: fullPath, rel });
      }
    }
  }
  walk(testlerDir, testlerDir);

  if (files.length === 0) {
    console.log('testler/ klasöründe JSON dosyası bulunamadı.');
    return;
  }

  let total = { inserted: 0, skipped: 0, errors: 0 };

  for (const file of files) {
    const categoryId = detectCategory(file.rel);
    if (!categoryId) {
      console.log(`[SKIP] ${file.rel} → kategori eşleşmedi`);
      continue;
    }

    // Apply filter
    if (filter && !file.rel.toLowerCase().includes(filter.toLowerCase()) && !categoryId.includes(filter.toLowerCase())) {
      continue;
    }

    const raw = readFileSync(file.path, 'utf-8');
    let questions;
    try {
      questions = JSON.parse(raw);
    } catch {
      console.log(`[ERROR] ${file.rel} → JSON parse hatası`);
      total.errors++;
      continue;
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      console.log(`[SKIP] ${file.rel} → boş veya geçersiz`);
      continue;
    }

    console.log(`\n[${categoryId}] ${file.rel} → ${questions.length} soru yükleniyor...`);
    const result = await insertQuestions(categoryId, questions, dryRun);
    total.inserted += result.inserted;
    total.skipped += result.skipped;
    total.errors += result.errors;
    console.log(`  → Eklendi: ${result.inserted}, Atlandı: ${result.skipped}, Hata: ${result.errors}`);
  }

  console.log(`\n========================================`);
  console.log(`ÖZET: Eklendi=${total.inserted} Atlandı=${total.skipped} Hata=${total.errors}`);
  if (dryRun) console.log('(--dry-run: gerçek ekleme yapılmadı)');
  console.log(`========================================`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
