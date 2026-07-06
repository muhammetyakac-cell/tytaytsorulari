import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

const cats = await sql`SELECT * FROM categories ORDER BY category_id`;
console.log('=== CATEGORIES ===');
cats.forEach(c => console.log(`  ${c.category_id}: ${c.title} (${c.icon})`));

const qs = await sql`SELECT id, category_id, sub_category FROM questions ORDER BY id`;
console.log('\n=== QUESTIONS ===');
qs.forEach(q => console.log(`  id=${q.id} cat=${q.category_id} sub=${q.sub_category}`));
