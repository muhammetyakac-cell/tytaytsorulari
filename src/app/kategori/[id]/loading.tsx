export default function Loading() {
  return (
    <section className="page-section">
      <div className="breadcrumb" style={{ height: '1.5rem', background: 'var(--bg-card)', borderRadius: '8px', width: '200px', marginBottom: '1rem', opacity: 0.5 }} />
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-card-hover)', marginBottom: '0.75rem' }} />
        <div style={{ height: '2rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '60%', marginBottom: '0.75rem' }} />
        <div style={{ height: '1rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '80%', marginBottom: '0.5rem' }} />
        <div style={{ height: '1rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '40%' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="card" style={{ padding: '1.25rem', height: '180px' }}>
            <div style={{ height: '1.2rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '50%', marginBottom: '0.75rem' }} />
            <div style={{ height: '0.85rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '90%', marginBottom: '0.5rem' }} />
            <div style={{ height: '0.85rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '70%', marginBottom: '1rem' }} />
            <div style={{ height: '2.5rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '100%' }} />
          </div>
        ))}
      </div>
    </section>
  )
}
