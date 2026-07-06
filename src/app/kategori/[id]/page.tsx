import { sql } from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: categoryId } = await params;

  const cats = await sql`SELECT * FROM categories WHERE category_id = ${categoryId} LIMIT 1`;
  if (!cats || cats.length === 0) {
    notFound();
  }
  const category = cats[0];

  const [{ count: totalQuestions }] = await sql`SELECT COUNT(*)::int as count FROM questions WHERE category_id = ${categoryId}`;
  const totalTests = Math.ceil(totalQuestions / 10);

  const rawTests = await sql`
    WITH numbered AS (
      SELECT id, question, (ROW_NUMBER() OVER (ORDER BY id) - 1) / 10 AS test_idx
      FROM questions WHERE category_id = ${categoryId}
    )
    SELECT test_idx, COUNT(*)::int as count, MIN(question) as preview
    FROM numbered GROUP BY test_idx ORDER BY test_idx
  `;

  const tests = rawTests.map((t: any) => ({
    index: t.test_idx,
    count: t.count,
    previewText: t.preview ? t.preview.substring(0, 80) + '...' : '',
  }));

  const session = await getSession();
  const solvedTests = new Set<number>();

  if (session) {
    const progress = await sql`SELECT test_index FROM user_progress WHERE user_id = ${session.userId} AND category_id = ${categoryId}`;
    progress.forEach((p: any) => solvedTests.add(p.test_index));
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Ana Sayfa',
        'item': 'https://www.tytaytsorulari.com/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': category.title,
        'item': `https://www.tytaytsorulari.com/kategori/${categoryId}`
      }
    ]
  };

  return (
    <section className={`page-section theme-${categoryId}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="breadcrumb">
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Ana Sayfa</Link> &gt;
        <span style={{ color: 'var(--primary)' }}> {category.title}</span>
      </div>

      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{category.icon}</div>
        <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{category.title}</h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          {category.description}
        </p>
        <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Toplam {totalQuestions} soru, {totalTests} test
        </p>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Deneme Sınavları</h3>

      {tests.length === 0 ? (
        <p className="text-muted">Bu kategoriye ait henüz test bulunmuyor.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          <Link
            href="/genel-deneme"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card" style={{ padding: '1.25rem', cursor: 'pointer', border: '2px dashed var(--primary)', background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(245,158,11,0.05))' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>🎯</div>
              <h4 style={{ margin: 0, textAlign: 'center', color: 'var(--primary)' }}>Karma Deneme Başlat</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>
                Tüm derslerden karışık sorularla genel deneme sınavı oluştur.
              </p>
            </div>
          </Link>
          {tests.map((t) => {
            const isSolved = solvedTests.has(t.index);
            return (
              <Link
                key={t.index}
                href={`/test/${categoryId}/${t.index}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card" style={{ padding: '1.25rem', cursor: 'pointer', position: 'relative' }}>
                  {isSolved && (
                    <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--success)', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', zIndex: 10 }}>
                      ✓
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0 }}>Test {t.index + 1}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.count} Soru</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
                    &quot;{t.previewText}&quot;
                  </p>
                  <button className={isSolved ? "btn-outline" : "btn-primary"} style={{ width: '100%', padding: '0.6rem', fontSize: '0.9rem', color: isSolved ? 'var(--success)' : undefined, borderColor: isSolved ? 'var(--success)' : undefined }}>
                    {isSolved ? '✓ Çözüldü (Tekrar Çöz)' : '▶ Başla'}
                  </button>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return {
    title: `${id.toUpperCase()} TYT AYT Testleri - tytaytsorulari`,
    description: `${id} alanındaki en güncel TYT ve AYT online deneme sınavları.`,
    alternates: {
      canonical: `/kategori/${id}`
    }
  }
}
