export default function Loading() {
  return (
    <section className="page-section">
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ height: '2rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '50%', marginBottom: '1rem' }} />
        <div style={{ height: '1rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '30%', marginBottom: '2rem' }} />
        <div style={{ height: '1.5rem', background: 'var(--bg-card-hover)', borderRadius: '8px', width: '100%', marginBottom: '1rem' }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.6rem' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-card-hover)' }} />
            <div style={{ height: '1rem', background: 'var(--bg-card-hover)', borderRadius: '8px', flex: 1 }} />
          </div>
        ))}
      </div>
    </section>
  )
}
