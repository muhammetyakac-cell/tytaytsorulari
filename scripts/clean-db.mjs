import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

await sql`DELETE FROM user_progress`;
await sql`DELETE FROM questions`;
await sql`ALTER SEQUENCE questions_id_seq RESTART WITH 1`;
console.log('Database cleaned! Questions and progress reset.');
