"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const examOptions = [
  { id: 'tyt', label: 'TYT', desc: 'Temel Yeterlilik Testi', icon: '📝', subjects: 'Türkçe, Sosyal, Matematik, Fen' },
  { id: 'ayt', label: 'AYT', desc: 'Alan Yeterlilik Testi', icon: '📐', subjects: 'Matematik, Fen, Edebiyat-Sos1, Sos2' },
  { id: 'tyt-ayt', label: 'TYT + AYT (Karma)', desc: 'Tüm derslerden karma', icon: '🎯', subjects: 'TYT + AYT tüm dersler' },
]

const countOptions = [10, 20, 30, 40, 50, 90, 120]

export default function GenelDenemePage() {
  const [tur, setTur] = useState('tyt')
  const [adet, setAdet] = useState(40)
  const router = useRouter()

  const handleStart = () => {
    router.push(`/karma?tur=${tur}&adet=${adet}`)
  }

  return (
    <section className="page-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Ana Sayfa</Link> &gt;
        <span style={{ color: 'var(--primary)' }}> Genel Deneme</span>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎯</div>
        <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Karma Deneme Sınavı</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          İstediğin derslerden ve istediğin sayıda sorudan oluşan özel bir deneme sınavı oluştur.
        </p>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.25rem' }}>1. Sınav Türünü Seç</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {examOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setTur(opt.id)}
              style={{
                padding: '1.25rem',
                borderRadius: '1rem',
                border: `2px solid ${tur === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                background: tur === opt.id ? 'var(--primary-light, rgba(99,102,241,0.1))' : 'var(--bg-card)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{opt.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{opt.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{opt.desc}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.7 }}>{opt.subjects}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.25rem' }}>2. Soru Sayısını Seç</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {countOptions.map(n => (
            <button
              key={n}
              onClick={() => setAdet(n)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: `2px solid ${adet === n ? 'var(--primary)' : 'var(--border-color)'}`,
                background: adet === n ? 'var(--primary)' : 'var(--bg-card)',
                color: adet === n ? '#fff' : 'var(--text)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'all 0.2s',
                minWidth: '70px',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleStart} className="btn-primary" style={{
        width: '100%', padding: '1.25rem', fontSize: '1.2rem', fontWeight: 800,
        borderRadius: '1rem', marginBottom: '2rem',
      }}>
        🚀 Sınavı Başlat
      </button>
    </section>
  )
}
