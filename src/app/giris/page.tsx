'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import Link from 'next/link'

const initialState = {
  error: null as string | null
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login as any, initialState)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div className="card auth-card">
        <h2 className="gradient-text" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Giriş Yap</h2>

        {state?.error && (
          <div className="error-box" style={{ marginBottom: '1rem' }}>
            {state.error}
          </div>
        )}

        <form action={formAction} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required className="form-input" />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input type="password" name="password" required className="form-input" />
          </div>
          <button type="submit" className="btn-primary" disabled={isPending} style={{ marginTop: '0.5rem', padding: '0.8rem', width: '100%' }}>
            {isPending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Hesabınız yok mu? <Link href="/kayit" className="text-primary" style={{ textDecoration: 'none' }}>Kayıt Ol</Link>
        </p>
      </div>
    </div>
  )
}
