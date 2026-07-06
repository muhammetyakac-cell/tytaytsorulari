import type { Metadata } from 'next'
import './globals.css'
import 'katex/dist/katex.min.css'

export const metadata: Metadata = {
  title: 'TYT AYT Soru Bankası | YKS Hazırlık Platformu',
  description: 'TYT ve AYT için tamamen ücretsiz, güncel müfredata uygun online testler, denemeler ve konu anlatımları.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="antialiased m-0 p-0">
        {children}
      </body>
    </html>
  )
}
