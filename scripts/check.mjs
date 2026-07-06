import { neon } from '@neondatabase/serverless';
const s = neon(process.env.DATABASE_URL);
const q = await s`SELECT c.category_id, c.title, COUNT(q.id)::int as count FROM categories c LEFT JOIN questions q ON c.category_id = q.category_id GROUP BY c.category_id, c.title ORDER BY c.category_id`;
console.log('Category distribution:');
q.forEach(r => console.log(`  ${r.category_id}: ${r.count} soru`));
const t = await s`SELECT COUNT(*)::int as total FROM questions`;
console.log(`\nTotal: ${t[0].total} questions`);

const dup = await s`SELECT question, COUNT(*)::int as cnt FROM questions GROUP BY question HAVING COUNT(*) > 1`;
if (dup.length > 0) {
  console.log(`\nDuplicates found: ${dup.length}`);
  dup.forEach(d => console.log(`  x${d.cnt}: ${d.question.substring(0, 80)}...`));
} else {
  console.log('\nNo duplicate questions found.');
}

// Check for invalid $ signs at end of question text
const bad = await s`SELECT id, question FROM questions WHERE question LIKE '%$'`;
if (bad.length > 0) {
  console.log(`\nQuestions ending with $: ${bad.length}`);
  bad.forEach(b => console.log(`  id=${b.id}: ${b.question.substring(0,50)}...`));
} else {
  console.log('No questions end with bare $.');
}
