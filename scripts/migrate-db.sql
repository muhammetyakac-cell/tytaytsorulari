-- TYT AYT Soru Bankası - DB Migration: add sub_category, restructure categories

ALTER TABLE questions ADD COLUMN IF NOT EXISTS sub_category VARCHAR(50);

-- Delete old granular categories
DELETE FROM categories WHERE category_id IN ('ayt-fizik', 'ayt-kimya', 'ayt-biyoloji');

-- Delete the old ayt-edebiyat (will re-add as part of combined)
DELETE FROM categories WHERE category_id = 'ayt-edebiyat';

-- Add new/updated categories
INSERT INTO categories (category_id, title, icon, description) VALUES
('ayt-fen', 'AYT Fen Bilimleri', '🔬', 'AYT Fen Bilimleri dersi için fizik (14 soru), kimya (13 soru) ve biyoloji (13 soru) konularını kapsayan 40 soruluk testler.'),
('ayt-edebiyat-sos1', 'AYT Edebiyat-Sosyal Bilimler-1', '📚', 'AYT Türk Dili ve Edebiyatı-Sosyal Bilimler-1 dersi için edebiyat (24 soru), tarih (10 soru) ve coğrafya (6 soru) konuları.'),
('ayt-sos2', 'AYT Sosyal Bilimler-2', '🌍', 'AYT Sosyal Bilimler-2 dersi için tarih (11 soru), coğrafya (11 soru), felsefe grubu (12 soru) ve din kültürü (6 soru) konuları.');

-- Update existing category descriptions
UPDATE categories SET description = 'TYT Türkçe dersi için sözcük anlamı, cümle anlamı, paragraf (24 soru), dil bilgisi (6 soru) ve daha fazlası - toplam 40 soru.' WHERE category_id = 'tyt-turkce';
UPDATE categories SET description = 'TYT Matematik dersi için sayılar, problemler, cebir (30 soru) ve geometri (10 soru) konularını kapsayan 40 soruluk testler.' WHERE category_id = 'tyt-matematik';
UPDATE categories SET description = 'TYT Fen Bilimleri dersi için fizik (7 soru), kimya (7 soru) ve biyoloji (6 soru) konularını kapsayan 20 soruluk testler.' WHERE category_id = 'tyt-fen';
UPDATE categories SET description = 'TYT Sosyal Bilimler dersi için tarih (5 soru), coğrafya (5 soru), felsefe (5 soru) ve din kültürü (5 soru) konularını kapsayan 20 soruluk testler.' WHERE category_id = 'tyt-sosyal';
UPDATE categories SET description = 'AYT Matematik dersi için limit, türev, integral, trigonometri ve ileri düzey konular (30 soru) ile geometri (10 soru) - toplam 40 soru.' WHERE category_id = 'ayt-matematik';

-- Update existing questions: assign sub_category
-- The existing 6 questions need sub_category assignments
UPDATE questions SET sub_category = 'dil-bilgisi' WHERE id = 1;
UPDATE questions SET sub_category = 'paragraf' WHERE id = 2;
UPDATE questions SET sub_category = 'matematik' WHERE id = 3;
UPDATE questions SET sub_category = 'matematik' WHERE id = 4;
UPDATE questions SET sub_category = 'matematik' WHERE id = 5;
UPDATE questions SET sub_category = 'matematik' WHERE id = 6;
