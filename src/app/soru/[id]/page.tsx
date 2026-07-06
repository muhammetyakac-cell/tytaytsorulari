import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function SoruPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qId = parseInt(id);

  if (isNaN(qId)) {
    notFound();
  }

  const questions = await sql`
    SELECT q.id, q.question, q.options, q.correct_answer, q.explanation, q.category_id, c.title as category_title 
    FROM questions q
    JOIN categories c ON q.category_id = c.category_id
    WHERE q.id = ${qId} 
    LIMIT 1
  `;

  if (!questions || questions.length === 0) {
    notFound();
  }

  const q = questions[0];
  const options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
  const labels = ['A', 'B', 'C', 'D', 'E'];

  const allCatQuestions = await sql`SELECT id FROM questions WHERE category_id = ${q.category_id} ORDER BY id ASC`;
  const indexInCat = allCatQuestions.findIndex((item: any) => item.id === q.id);
  const testIndex = indexInCat !== -1 ? Math.floor(indexInCat / 10) : 0;

  return (
    <section className="page-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="breadcrumb">
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Ana Sayfa</Link> &gt;
        <Link href={`/kategori/${q.category_id}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}> {q.category_title}</Link> &gt;
        <span style={{ color: 'var(--primary)' }}> Soru #{q.id}</span>
      </div>

      <div className="card question-card">
        <h1 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
          {q.category_title} Dersi Sorusu
        </h1>

        <div className="question-text">{q.question}</div>

        <div className="options-container" style={{ pointerEvents: 'none' }}>
          {options.map((opt: string, idx: number) => {
            const textParts = opt.split(') ');
            const letter = textParts.length > 1 ? textParts[0] : labels[idx];
            const text = textParts.length > 1 ? textParts.slice(1).join(') ') : opt;
            const isCorrect = idx === q.correct_answer;
            const btnClass = `option-btn ${isCorrect ? 'correct' : ''}`;

            return (
              <div key={idx} className={btnClass} style={{ opacity: isCorrect ? 1 : 0.6 }}>
                <span className="option-letter">{letter})</span> <span>{text}</span>
              </div>
            )
          })}
        </div>

        <div className="explanation-box show" style={{ marginTop: '1.5rem' }}>
          <strong>Çözüm / Açıklama:</strong>
          <p style={{ marginTop: '0.5rem' }}>{q.explanation || 'Bu soru için açıklama bulunmamaktadır.'}</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Bu sorunun da yer aldığı testi çözerek kendini sına!</p>
          <Link href={`/test/${q.category_id}/${testIndex}`} className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Bu Testi Çözmeye Başla
          </Link>
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qId = parseInt(id);
  if (isNaN(qId)) return {};

  const questions = await sql`SELECT question FROM questions WHERE id = ${qId} LIMIT 1`;
  if (!questions || questions.length === 0) return {};

  const cleanQuestionText = questions[0].question.replace(/<[^>]*>?/gm, '');

  return {
    title: `Soru #${qId} - TYT AYT Çıkmış ve Örnek Sorular | tytaytsorulari`,
    description: cleanQuestionText.substring(0, 150) + '...',
    alternates: {
      canonical: `/soru/${qId}`
    }
  }
}
