-- TYT AYT Soru Bankası - Veritabanı Kurulum Scripti

-- Kategoriler tablosu
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  category_id VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  icon VARCHAR(10) DEFAULT '📚',
  description TEXT
);

-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Kullanıcı ilerleme tablosu
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id VARCHAR(50) NOT NULL,
  test_index INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  wrong INTEGER NOT NULL,
  empty INTEGER NOT NULL,
  details JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, category_id, test_index)
);

-- Sorular tablosu
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  category_id VARCHAR(50) REFERENCES categories(category_id),
  sub_category VARCHAR(50),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  test_index INTEGER DEFAULT 0
);

-- Kategorileri ekle
INSERT INTO categories (category_id, title, icon, description) VALUES
('tyt-turkce', 'TYT Türkçe', '📝', 'TYT Türkçe dersi için sözcük anlamı, cümle anlamı, paragraf (24 soru), dil bilgisi (6 soru) ve daha fazlası - toplam 40 soru.'),
('tyt-sosyal', 'TYT Sosyal Bilimler', '🌍', 'TYT Sosyal Bilimler dersi için tarih (5 soru), coğrafya (5 soru), felsefe (5 soru) ve din kültürü (5 soru) konularını kapsayan 20 soruluk testler.'),
('tyt-matematik', 'TYT Matematik', '📐', 'TYT Matematik dersi için sayılar, problemler, cebir (30 soru) ve geometri (10 soru) konularını kapsayan 40 soruluk testler.'),
('tyt-fen', 'TYT Fen Bilimleri', '🔬', 'TYT Fen Bilimleri dersi için fizik (7 soru), kimya (7 soru) ve biyoloji (6 soru) konularını kapsayan 20 soruluk testler.'),
('ayt-matematik', 'AYT Matematik', '📐', 'AYT Matematik dersi için limit, türev, integral, trigonometri ve ileri düzey konular (30 soru) ile geometri (10 soru) - toplam 40 soru.'),
('ayt-fen', 'AYT Fen Bilimleri', '🔬', 'AYT Fen Bilimleri dersi için fizik (14 soru), kimya (13 soru) ve biyoloji (13 soru) konularını kapsayan 40 soruluk testler.'),
('ayt-edebiyat-sos1', 'AYT Edebiyat-Sosyal Bilimler-1', '📚', 'AYT Türk Dili ve Edebiyatı-Sosyal Bilimler-1 dersi için edebiyat (24 soru), tarih (10 soru) ve coğrafya (6 soru) konuları.'),
('ayt-sos2', 'AYT Sosyal Bilimler-2', '🌍', 'AYT Sosyal Bilimler-2 dersi için tarih (11 soru), coğrafya (11 soru), felsefe grubu (12 soru) ve din kültürü (6 soru) konuları.');
