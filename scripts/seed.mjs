import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  // TYT Türkçe
  await sql`INSERT INTO questions (category_id, question, options, correct_answer, explanation, test_index) VALUES ('tyt-turkce', ${'Aşağıdaki cümlelerin hangisinde "bakmak" sözcüğü "bir şeyin gelişmesi için gereken ilgiyi göstermek" anlamında kullanılmıştır?'}, ${JSON.stringify(['A) Çocuklara bakmak herkesin harcı değildir.', 'B) Bu tabloya bakmak insanın içini açıyor.', 'C) Pencere denize bakıyor.', 'D) Bu işe bir de sen bak.', 'E) Ona öyle bakma, çok alınır.'])}, 0, ${'"Bakmak" sözcüğü A seçeneğinde "bir şeyin gelişmesi için gereken ilgiyi göstermek" anlamında kullanılmıştır.'}, 0)`;

  await sql`INSERT INTO questions (category_id, question, options, correct_answer, explanation, test_index) VALUES ('tyt-turkce', ${'Sanatçı, toplumun bir parçası olarak eserlerinde yaşadığı dönemin izlerini taşır. Onun duyarlılığı, içinde bulunduğu toplumun sorunlarına kayıtsız kalmasına engel olur. Bu nedenle gerçek bir sanatçı, eserlerinde toplumsal konulara yer vermekten kaçınmaz.\n\nBu parçada asıl anlatılmak istenen aşağıdakilerden hangisidir?'}, ${JSON.stringify(['A) Sanatçı, toplumdan bağımsız düşünülemez.', 'B) Sanat eserleri, sadece bireysel duyguları yansıtır.', 'C) Sanatçı, eserlerinde toplumsal konulara yer vermelidir.', 'D) Her sanatçı aynı toplumsal duyarlılığa sahiptir.', 'E) Sanat, toplumsal değişimin önünde gitmelidir.'])}, 2, ${'Parçada sanatçının toplumun bir parçası olduğu ve toplumsal sorunlara kayıtsız kalamayacağı vurgulanarak, eserlerinde toplumsal konulara yer vermesi gerektiği anlatılmaktadır.'}, 0)`;

  // TYT Matematik
  await sql`INSERT INTO questions (category_id, question, options, correct_answer, explanation, test_index) VALUES ('tyt-matematik', ${'Bir okuldaki öğrencilerin %40\'ı kız öğrencidir. Kız öğrencilerin %30\'u, erkek öğrencilerin ise %20\'si gözlüklüdür. Buna göre, bu okuldaki öğrencilerin yüzde kaçı gözlüklüdür?'}, ${JSON.stringify(['A) 20', 'B) 22', 'C) 24', 'D) 26', 'E) 28'])}, 2, ${'Okuldaki toplam öğrenci sayısına 100 diyelim. Kız öğrenci sayısı: 40, erkek öğrenci sayısı: 60. Gözlüklü kız: 40×30/100 = 12. Gözlüklü erkek: 60×20/100 = 12. Toplam gözlüklü: 24. Yani %24.'}, 0)`;

  await sql`INSERT INTO questions (category_id, question, options, correct_answer, explanation, test_index) VALUES ('tyt-matematik', ${'a, b birer gerçek sayı olmak üzere,\nax² + bx + 6 = 0\ndenkleminin kökleri 2 ve 3\'tür.\nBuna göre, a + b toplamı kaçtır?'}, ${JSON.stringify(['A) -5', 'B) -3', 'C) 1', 'D) 3', 'E) 5'])}, 0, ${'Kökler çarpımı: 6/a = 2×3 = 6 → a = 1. Kökler toplamı: -b/a = 2+3 = 5 → -b/1 = 5 → b = -5. a + b = 1 + (-5) = -4.'}, 0)`;

  // AYT Matematik
  await sql`INSERT INTO questions (category_id, question, options, correct_answer, explanation, test_index) VALUES ('ayt-matematik', ${'f(x) = x³ - 6x² + 9x + 1 fonksiyonunun yerel minimum değeri kaçtır?'}, ${JSON.stringify(['A) 1', 'B) 3', 'C) 5', 'D) 7', 'E) 9'])}, 0, ${'f\'(x) = 3x² - 12x + 9 = 3(x² - 4x + 3) = 3(x-1)(x-3). Türevin kökleri x=1 ve x=3. f\'\'(x) = 6x - 12. f\'\'(1) = -6 < 0 (yerel maksimum), f\'\'(3) = 6 > 0 (yerel minimum). f(3) = 27 - 54 + 27 + 1 = 1.'}, 0)`;

  await sql`INSERT INTO questions (category_id, question, options, correct_answer, explanation, test_index) VALUES ('ayt-matematik', ${'log₂(x-1) + log₂(x+1) = 3\ndenklemini sağlayan x değeri kaçtır?'}, ${JSON.stringify(['A) 2', 'B) 3', 'C) 4', 'D) 5', 'E) 6'])}, 1, ${'log₂[(x-1)(x+1)] = 3 → log₂(x²-1) = 3 → x²-1 = 2³ = 8 → x² = 9 → x = 3 veya x = -3. Logaritma tanımı gereği x-1 > 0 ve x+1 > 0 olmalı, yani x > 1. Bu durumda x = 3.'}, 0)`;

  console.log('Seed data inserted successfully!');
}

seed().catch(e => console.error(e));
