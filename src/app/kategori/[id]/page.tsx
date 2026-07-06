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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Ana Sayfa</Link>
          <span>&gt;</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{category.title}</span>
        </div>

        {/* Header Card */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="text-4xl mb-4">{category.icon}</div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-3">
            {category.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {category.description}
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold">
              {totalQuestions} Soru
            </span>
            <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
              {totalTests} Deneme
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
            <span className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></span>
            Deneme Sınavları
          </h3>

          {tests.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-slate-500 dark:text-slate-400">Bu kategoriye ait henüz test bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Karma Deneme Card */}
              <Link href="/genel-deneme" className="group">
                <div className="h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-3xl border-2 border-dashed border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-center text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎯</div>
                  <h4 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-2">Karma Deneme Başlat</h4>
                  <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70">
                    Tüm derslerden karışık sorularla genel deneme sınavı oluştur.
                  </p>
                </div>
              </Link>

              {/* Test Cards */}
              {tests.map((t) => {
                const isSolved = solvedTests.has(t.index);
                return (
                  <Link key={t.index} href={`/test/${categoryId}/${t.index}`} className="group">
                    <div className={`h-full flex flex-col bg-white dark:bg-slate-800 p-6 rounded-3xl border shadow-sm transition-all hover:shadow-md relative ${isSolved ? 'border-emerald-200 dark:border-emerald-800' : 'border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800'}`}>
                      {isSolved && (
                        <div className="absolute -top-3 -right-3 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg shadow-emerald-500/30">
                          ✓
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Test {t.index + 1}</h4>
                        <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">
                          {t.count} Soru
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 italic line-clamp-2">
                        &quot;{t.previewText}&quot;
                      </p>
                      
                      <div className="mt-auto pt-4">
                        {isSolved ? (
                          <div className="w-full text-center py-2.5 rounded-xl border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
                            ✓ Çözüldü (Tekrar Çöz)
                          </div>
                        ) : (
                          <div className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm group-hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20">
                            ▶ Başla
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
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
