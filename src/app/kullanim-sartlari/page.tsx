import Link from 'next/link'

export default function TermsPage() {
  return (
    <section className="page-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Kullanım Şartları</h1>

      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>1. Kabul</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          tytaytsorulari.com sitesini ziyaret ederek ve kullanarak bu kullanım şartlarını kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız, siteyi kullanmamalısınız.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>2. Hizmet Kullanımı</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Sitemiz, TYT ve AYT sınavlarına hazırlanan öğrencilere ücretsiz soru çözme imkanı sunmaktadır. Tüm içerikler eğitim amaçlıdır. Kayıtlı kullanıcılar, kendi hesaplarından sorumludur.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>3. Fikri Mülkiyet</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Sitede yer alan tüm içerik, tasarım, yazılım ve kodlar tytaytsorulari.com'a aittir. İzinsiz kopyalama, dağıtma ve ticari amaçla kullanma yasaktır.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>4. Sorumluluk Reddi</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Sitemizde sunulan içeriklerin doğruluğu konusunda azami gayret gösterilmektedir ancak herhangi bir garanti verilmemektedir. Sitemizin kullanımından doğacak zararlardan sorumlu tutulamayız.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>5. Değişiklikler</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Bu kullanım şartları önceden bildirim yapılmaksızın değiştirilebilir. Güncel şartlar her zaman bu sayfada yayınlanacaktır.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>6. Yürürlük</h2>
        <p className="text-muted">
          Bu kullanım şartları, siteyi kullanmaya başladığınız andan itibaren yürürlüğe girer.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link href="/" className="btn-outline" style={{ textDecoration: 'none' }}>Ana Sayfaya Dön</Link>
      </div>
    </section>
  )
}
