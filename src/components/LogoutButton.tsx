'use client'

import { logout } from '@/app/actions/auth'

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="btn-outline"
      style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
    >
      Çıkış Yap
    </button>
  )
}
