'use client'

import { useActionState } from 'react'
import { register } from '@/app/actions/auth'
import Link from 'next/link'

const initialState = {
  error: null as string | null
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register as any, initialState)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div className="card auth-card">
        <h2 className="gradient-text" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Kayıt Ol</h2>

        {state?.error && (
          <div className="error-box" style={{ marginBottom: '1rem' }}>
            {state.error}
          </div>
        )}

        <form action={formAction} className="auth-form">
          <div className="form-group">
            <label>Ad Soyad</label>
            <input type="text" name="name" required className="form-input" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required className="form-input" />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input type="password" name="password" required className="form-input" />
          </div>
          <button type="submit" className="btn-primary" disabled={isPending} style={{ marginTop: '0.5rem', padding: '0.8rem', width: '100%' }}>
            {isPending ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Zaten hesabınız var mı? <Link href="/giris" className="text-primary" style={{ textDecoration: 'none' }}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  )
}
