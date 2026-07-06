import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  // 1. Add sub_category column
  await sql`ALTER TABLE questions ADD COLUMN IF NOT EXISTS sub_category VARCHAR(50)`;
  console.log('sub_category column added');

  // 2. Delete old granular categories
  await sql`DELETE FROM categories WHERE category_id IN ('ayt-fizik', 'ayt-kimya', 'ayt-biyoloji', 'ayt-edebiyat')`;
  console.log('Old categories deleted');

  // 3. Add new combined categories
  await sql`INSERT INTO categories (category_id, title, icon, description) VALUES
    ('ayt-fen', 'AYT Fen Bilimleri', '🔬', 'AYT Fen Bilimleri dersi için fizik (14 soru), kimya (13 soru) ve biyoloji (13 soru) konularını kapsayan 40 soruluk testler.'),
    ('ayt-edebiyat-sos1', 'AYT Edebiyat-Sosyal Bilimler-1', '📚', 'AYT Türk Dili ve Edebiyatı-Sosyal Bilimler-1 dersi için edebiyat (24 soru), tarih (10 soru) ve coğrafya (6 soru) konuları.'),
    ('ayt-sos2', 'AYT Sosyal Bilimler-2', '🌍', 'AYT Sosyal Bilimler-2 dersi için tarih (11 soru), coğrafya (11 soru), felsefe grubu (12 soru) ve din kültürü (6 soru) konuları.')`;
  console.log('New categories added');

  // 4. Update category descriptions
  await sql`UPDATE categories SET description = 'TYT Türkçe dersi için sözcük anlamı, cümle anlamı, paragraf (24 soru), dil bilgisi (6 soru) ve daha fazlası - toplam 40 soru.' WHERE category_id = 'tyt-turkce'`;
  await sql`UPDATE categories SET description = 'TYT Matematik dersi için sayılar, problemler, cebir (30 soru) ve geometri (10 soru) konularını kapsayan 40 soruluk testler.' WHERE category_id = 'tyt-matematik'`;
  await sql`UPDATE categories SET description = 'TYT Fen Bilimleri dersi için fizik (7 soru), kimya (7 soru) ve biyoloji (6 soru) konularını kapsayan 20 soruluk testler.' WHERE category_id = 'tyt-fen'`;
  await sql`UPDATE categories SET description = 'TYT Sosyal Bilimler dersi için tarih (5 soru), coğrafya (5 soru), felsefe (5 soru) ve din kültürü (5 soru) konularını kapsayan 20 soruluk testler.' WHERE category_id = 'tyt-sosyal'`;
  await sql`UPDATE categories SET description = 'AYT Matematik dersi için limit, türev, integral, trigonometri ve ileri düzey konular (30 soru) ile geometri (10 soru) - toplam 40 soru.' WHERE category_id = 'ayt-matematik'`;
  console.log('Category descriptions updated');

  // 5. Update existing question sub_categories
  await sql`UPDATE questions SET sub_category = 'dil-bilgisi' WHERE id = 1`;
  await sql`UPDATE questions SET sub_category = 'paragraf' WHERE id = 2`;
  await sql`UPDATE questions SET sub_category = 'matematik' WHERE id = 3`;
  await sql`UPDATE questions SET sub_category = 'matematik' WHERE id = 4`;
  await sql`UPDATE questions SET sub_category = 'matematik' WHERE id = 5`;
  await sql`UPDATE questions SET sub_category = 'matematik' WHERE id = 6`;
  console.log('Question sub_categories updated');

  console.log('Migration completed successfully!');
}

migrate().catch(e => console.error(e));
