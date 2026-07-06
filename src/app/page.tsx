import SoruBankasiApp from '@/components/SoruBankasiApp';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let dbQuestions: any[] = [];
  try {
    dbQuestions = await sql`SELECT * FROM questions ORDER BY id DESC`;
  } catch (error) {
    console.error("Database fetch failed:", error);
  }

  const formattedQuestions = dbQuestions.map((q: any) => {
    let optionsArr: string[] = [];
    try {
      optionsArr = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
    } catch(e) {
      optionsArr = [];
    }

    const cleanOption = (opt: string) => opt ? opt.replace(/^[A-E]\)\s*/, '') : '';

    return {
      id: q.id,
      exam: q.category_id?.includes('tyt') ? 'TYT' : 'AYT',
      subject: q.category_id?.includes('turkce') ? 'Türkçe' : q.category_id?.includes('matematik') ? 'Matematik' : 'Fen Bilimleri',
      topic: 'Genel',
      difficulty: 'Orta',
      questionText: q.question,
      options: {
        A: cleanOption(optionsArr[0]),
        B: cleanOption(optionsArr[1]),
        C: cleanOption(optionsArr[2]),
        D: cleanOption(optionsArr[3]),
        E: cleanOption(optionsArr[4])
      },
      correctAnswer: String.fromCharCode(65 + (q.correct_answer || 0)),
      solution: q.explanation,
      author: 'DB System',
      likes: 0
    };
  });

  return <SoruBankasiApp initialQuestions={formattedQuestions} />;
}
