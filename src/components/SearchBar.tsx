'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/arama?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Ara..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="form-input"
        style={{ padding: '0.4rem 0.8rem', width: '120px', fontSize: '0.85rem' }}
      />
    </form>
  )
}
