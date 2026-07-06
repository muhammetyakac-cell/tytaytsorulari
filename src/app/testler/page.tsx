import { sql } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function TestlerPage() {
  const categories = await sql`SELECT * FROM categories ORDER BY category_id`

  const stats = await sql`
    SELECT category_id, COUNT(*)::int as count
    FROM questions GROUP BY category_id ORDER BY category_id
  `
  const countMap: Record<string, number> = {}
  for (const s of stats) countMap[s.category_id] = s.count

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Ana Sayfa', 'item': 'https://www.tytaytsorulari.com/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Tüm Testler', 'item': 'https://www.tytaytsorulari.com/testler' }
    ]
  }

  const tytCats = categories.filter((c: any) => c.category_id.startsWith('tyt'))
  const aytCats = categories.filter((c: any) => c.category_id.startsWith('ayt'))

  return (
    <section className="page-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="breadcrumb">
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Ana Sayfa</Link> &gt;
        <span style={{ color: 'var(--primary)' }}> Tüm Testler</span>
      </div>

      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tüm Testler</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Kategorilere göre düzenlenmiş testleri görüntüle, istediğini seçip çözmeye başla.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📝</span> TYT Testleri
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {tytCats.map((cat: any) => {
            const totalQ = countMap[cat.category_id] || 0
            const testCount = Math.ceil(totalQ / 10)
            return (
              <Link key={cat.category_id} href={`/kategori/${cat.category_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`card theme-${cat.category_id}`} style={{ padding: '1.25rem', cursor: 'pointer', transition: 'transform 0.2s', borderLeft: '4px solid var(--primary)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>{cat.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>
                    {totalQ} soru, {testCount} test
                  </p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {Array.from({ length: Math.min(testCount, 10) }, (_, i) => (
                      <div key={i} style={{
                        width: '28px', height: '28px', borderRadius: '6px',
                        background: 'var(--bg-card-hover)', color: 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 700
                      }}>{i + 1}</div>
                    ))}
                    {testCount > 10 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>+{testCount - 10}</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📐</span> AYT Testleri
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {aytCats.map((cat: any) => {
            const totalQ = countMap[cat.category_id] || 0
            const testCount = Math.ceil(totalQ / 10)
            return (
              <Link key={cat.category_id} href={`/kategori/${cat.category_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`card theme-${cat.category_id}`} style={{ padding: '1.25rem', cursor: 'pointer', transition: 'transform 0.2s', borderLeft: '4px solid var(--primary)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>{cat.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>
                    {totalQ} soru, {testCount} test
                  </p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {Array.from({ length: Math.min(testCount, 10) }, (_, i) => (
                      <div key={i} style={{
                        width: '28px', height: '28px', borderRadius: '6px',
                        background: 'var(--bg-card-hover)', color: 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 700
                      }}>{i + 1}</div>
                    ))}
                    {testCount > 10 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>+{testCount - 10}</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
