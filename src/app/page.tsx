import { sql } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const categories = await sql`SELECT id, category_id, title, icon, description FROM categories ORDER BY id ASC`;

  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat: any) => {
      const countRes = await sql`SELECT COUNT(*) FROM questions WHERE category_id = ${cat.category_id}`;
      return {
        ...cat,
        totalQuestions: parseInt(countRes[0].count)
      };
    })
  );

  return (
    <section className="page-section">
      <div className="hero">
        <h1 className="gradient-text">TYT & AYT'ye Hazırlanmanın<br/>En Akıllı Yolu</h1>
        <p>Modern arayüz, anında geri bildirim ve detaylı istatistiklerle YKS hedefine emin adımlarla ilerle.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/kategori/tyt-matematik" className="btn-primary">
            TYT Soruları
          </Link>
          <Link href="/kategori/ayt-matematik" className="btn-outline">
            AYT Soruları
          </Link>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '3rem' }}>
        <div className="card stat-box">
          <div className="stat-icon" style={{ background: 'var(--primary-light)' }}>📝</div>
          <div className="stat-info">
            <h4>Toplam Soru</h4>
            <div className="stat-value" style={{ color: 'var(--primary)' }}>
              {categoriesWithCounts.reduce((acc, c) => acc + c.totalQuestions, 0)}
            </div>
          </div>
        </div>
        <div className="card stat-box">
          <div className="stat-icon" style={{ background: '#fef3c7' }}>📚</div>
          <div className="stat-info">
            <h4>Konu Alanı</h4>
            <div className="stat-value" style={{ color: '#f59e0b' }}>{categoriesWithCounts.length}</div>
          </div>
        </div>
        <div className="card stat-box">
          <div className="stat-icon" style={{ background: '#dcfce7' }}>🎯</div>
          <div className="stat-info">
            <h4>Deneme</h4>
            <div className="stat-value" style={{ color: '#10b981' }}>
              {categoriesWithCounts.reduce((acc, c) => acc + Math.ceil(c.totalQuestions / 10), 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="categories-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>Ders ve Konu Alanları</h2>
        </div>

        <div className="categories-grid">
          {categoriesWithCounts.map((cat) => (
            <Link
              href={`/kategori/${cat.category_id}`}
              key={cat.id}
              className="category-card card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="category-icon">{cat.icon}</div>
              <div>
                <h3>{cat.title}</h3>
                <p className="text-muted" style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>{cat.totalQuestions || 0} Soru - {Math.ceil((cat.totalQuestions || 0) / 10)} Test</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Sıkça Sorulan Sorular</h2>
        <div className="card faq-card">
          <h4 style={{ marginBottom: '0.5rem' }}>TYT AYT testlerini ücretsiz mi çözüyorum?</h4>
          <p className="text-muted">Evet, platformumuzdaki tüm TYT ve AYT online deneme ve yaprak testleri tamamen ücretsizdir.</p>
        </div>
        <div className="card faq-card">
          <h4 style={{ marginBottom: '0.5rem' }}>Sorular güncel ÖSYM formatına uygun mu?</h4>
          <p className="text-muted">Sistemimize düzenli olarak yeni müfredata ve ÖSYM'nin yeni nesil soru tiplerine uygun güncel testler eklenmektedir.</p>
        </div>
        <div className="card faq-card">
          <h4 style={{ marginBottom: '0.5rem' }}>Çözdüğüm testlerin sonucunu görebilir miyim?</h4>
          <p className="text-muted">Testi bitirdiğiniz anda kaç doğru, kaç yanlış yaptığınızı görebilir, soruların detaylı çözümlerini anında inceleyebilirsiniz.</p>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "TYT AYT testlerini ücretsiz mi çözüyorum?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Evet, platformumuzdaki tüm TYT ve AYT online deneme ve yaprak testleri tamamen ücretsizdir."
              }
            },
            {
              "@type": "Question",
              "name": "Sorular güncel ÖSYM formatına uygun mu?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sistemimize düzenli olarak yeni müfredata ve ÖSYM'nin yeni nesil soru tiplerine uygun güncel testler eklenmektedir."
              }
            },
            {
              "@type": "Question",
              "name": "Çözdüğüm testlerin sonucunu görebilir miyim?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Testi bitirdiğiniz anda kaç doğru, kaç yanlış yaptığınızı görebilir, soruların detaylı çözümlerini anında inceleyebilirsiniz."
              }
            }
          ]
        })
      }} />
    </section>
  )
}
