import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <section className="page-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Gizlilik Politikası</h1>

      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>1. Giriş</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          tytaytsorulari.com olarak kullanıcılarımızın gizliliğine önem vermekteyiz. Bu gizlilik politikası, sitemizi ziyaret eden kullanıcıların hangi bilgilerinin toplandığını, bu bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>2. Toplanan Bilgiler</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Kayıt olurken ad, soyad ve e-posta adresi gibi kişisel bilgileriniz toplanmaktadır. Ayrıca site kullanımınız sırasında çerezler aracılığıyla bazı teknik veriler (IP adresi, tarayıcı türü, ziyaret süresi gibi) otomatik olarak kaydedilmektedir.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>3. Bilgilerin Kullanımı</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Toplanan bilgiler; size daha iyi bir kullanıcı deneyimi sunmak, sitemizi geliştirmek, teknik sorunları çözmek ve yasal yükümlülüklerimizi yerine getirmek amacıyla kullanılmaktadır.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>4. Bilgi Paylaşımı</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Kişisel bilgileriniz, yasal zorunluluk halleri dışında üçüncü şahıslarla paylaşılmamaktadır. Veritabanımız güvenli sunucularda barındırılmakta olup, bilgileriniz şifreleme yöntemleriyle korunmaktadır.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>5. KVKK Haklarınız</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, kişisel verilerinize erişme, bunların düzeltilmesini veya silinmesini talep etme hakkına sahipsiniz. Bu talepleriniz için bizimle iletişime geçebilirsiniz.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>6. İletişim</h2>
        <p className="text-muted">
          Gizlilik politikamız hakkında her türlü soru ve öneriniz için bizimle iletişime geçebilirsiniz.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link href="/" className="btn-outline" style={{ textDecoration: 'none' }}>Ana Sayfaya Dön</Link>
      </div>
    </section>
  )
}
