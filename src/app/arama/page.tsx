import { sql } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  const query = q || '';

  if (!query) {
    return (
      <section className="page-section">
        <h2>Arama</h2>
        <p className="text-muted">Lütfen aramak istediğiniz kelimeyi yukarıdaki arama çubuğuna girin.</p>
      </section>
    );
  }

  const searchTerm = `%${query}%`;

  const qResults = await sql`
    SELECT id, category_id, question FROM questions 
    WHERE question ILIKE ${searchTerm} OR explanation ILIKE ${searchTerm}
    LIMIT 10
  `;

  return (
    <section className="page-section" style={{ minHeight: '60vh' }}>
      <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Arama Sonuçları: &quot;{query}&quot;</h2>

      <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Test Soruları ({qResults.length})</h3>
      {qResults.length === 0 ? <p className="text-muted">Soru bulunamadı.</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {qResults.map((q: any) => (
            <div key={q.id} className="card" style={{ padding: '1.25rem' }}>
              <span className="text-primary" style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>{q.category_id}</span>
              <p style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>{q.question.substring(0, 150)}...</p>
              <Link href={`/kategori/${q.category_id}`} className="btn-outline" style={{ display: 'inline-block', padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                Kategoriye Git
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
