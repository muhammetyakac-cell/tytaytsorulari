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
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  test_index INTEGER DEFAULT 0
);

-- Kategorileri ekle
INSERT INTO categories (category_id, title, icon, description) VALUES
('tyt-turkce', 'TYT Türkçe', '📝', 'TYT Türkçe dersi için sözcük anlamı, cümle anlamı, paragraf, dil bilgisi ve daha fazlası.'),
('tyt-matematik', 'TYT Matematik', '📐', 'TYT Matematik dersi için sayılar, problemler, geometri, cebir ve yeni nesil sorular.'),
('tyt-fen', 'TYT Fen Bilimleri', '🔬', 'TYT Fen Bilimleri dersi için fizik, kimya ve biyoloji konularını kapsayan testler.'),
('tyt-sosyal', 'TYT Sosyal Bilimler', '🌍', 'TYT Sosyal Bilimler dersi için tarih, coğrafya, felsefe, din kültürü soruları.'),
('ayt-matematik', 'AYT Matematik', '📐', 'AYT Matematik dersi için limit, türev, integral, trigonometri ve ileri düzey konular.'),
('ayt-fizik', 'AYT Fizik', '⚡', 'AYT Fizik dersi için mekanik, elektrik, manyetizma, modern fizik konuları.'),
('ayt-kimya', 'AYT Kimya', '🧪', 'AYT Kimya dersi için organik kimya, kimyasal tepkimeler, çözeltiler ve daha fazlası.'),
('ayt-biyoloji', 'AYT Biyoloji', '🧬', 'AYT Biyoloji dersi için hücre, genetik, canlıların çeşitliliği ve sistemler.'),
('ayt-edebiyat', 'AYT Türk Dili ve Edebiyatı', '📚', 'AYT Edebiyat dersi için Türk edebiyatı dönemleri, yazarlar, eserler ve dil bilgisi.');
