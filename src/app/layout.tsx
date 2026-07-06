import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import LogoutButton from '@/components/LogoutButton'
import SearchBar from '@/components/SearchBar'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tytaytsorulari.com'),
  title: 'TYT AYT Soru Bankası | YKS Hazırlık Platformu',
  description: 'TYT ve AYT için tamamen ücretsiz, güncel müfredata uygun online testler, denemeler ve konu anlatımları. Türkçe, Matematik, Fen Bilimleri, Sosyal Bilimler ve daha fazlası.',
  openGraph: {
    title: 'TYT AYT Soru Bankası | YKS Hazırlık Platformu',
    description: 'YKS maratonunda netlerini artır! Binlerce çözümlü soru, anlık analiz ve başarı grafiğinle rakiplerini geride bırak.',
    url: 'https://www.tytaytsorulari.com/',
    siteName: 'TYT AYT Soru Bankası',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TYT AYT Soru Bankası',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: '/',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  return (
    <html lang="tr">
      <body>
        <header>
          <div className="container">
            <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
              <span className="gradient-text" style={{ fontSize: '1.4rem' }}>tytaytsorulari</span>
              <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>SORU BANKASI</span>
            </Link>
            <nav style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <SearchBar />
              <Link href="/blog" className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Blog</Link>
              <Link href="/" className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Kategoriler</Link>
              {session ? (
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderLeft: '1px solid var(--border-color)', paddingLeft: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{session.name}</span>
                  <LogoutButton />
                </div>
              ) : (
                <Link href="/giris" className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Giriş Yap</Link>
              )}
            </nav>
          </div>
        </header>

        <main className="container">
          {children}
        </main>

        <footer>
          <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
            <div style={{ flex: '1 1 300px' }}>
              <Link href="/" className="logo" style={{ textDecoration: 'none', marginBottom: '1rem', display: 'inline-flex' }}>
                <span className="gradient-text" style={{ fontSize: '1.2rem' }}>tytaytsorulari</span>
              </Link>
              <p className="text-muted" style={{ fontSize: '0.9rem', maxWidth: '300px', marginTop: '0.5rem' }}>
                TYT ve AYT adayları için modern, interaktif ve tamamen ücretsiz soru çözme platformu. Hedefinize ulaşmanıza yardımcı oluyoruz.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>Hızlı Bağlantılar</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><Link href="/" className="text-muted" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>Ana Sayfa</Link></li>
                  <li><Link href="/blog" className="text-muted" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>Yasal</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><Link href="/gizlilik-politikasi" className="text-muted" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>Gizlilik Politikası</Link></li>
                  <li><Link href="/kullanim-sartlari" className="text-muted" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>Kullanım Şartları</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} tytaytsorulari. Tüm hakları saklıdır.
          </div>
        </footer>
      </body>
    </html>
  )
}
