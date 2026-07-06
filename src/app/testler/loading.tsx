export default function Loading() {
  return (
    <section className="page-section">
      <div style={{ height: '1.5rem', background: 'var(--bg-card)', borderRadius: '8px', width: '200px', marginBottom: '1rem', opacity: 0.5 }} />
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ height: '2rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '40%', margin: '0 auto 0.5rem' }} />
        <div style={{ height: '1rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '60%', margin: '0 auto' }} />
      </div>
      <div style={{ height: '1.5rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '200px', marginBottom: '1rem' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="card" style={{ padding: '1.25rem', height: '150px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--bg-card-hover)', marginBottom: '0.5rem' }} />
            <div style={{ height: '1.1rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '60%', marginBottom: '0.4rem' }} />
            <div style={{ height: '0.85rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '40%', marginBottom: '0.75rem' }} />
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {Array.from({ length: 5 }, (_, j) => (
                <div key={j} style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--bg-card-hover)' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
