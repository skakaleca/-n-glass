'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })

    if (err) {
      setError('Грешен имейл или парола.')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'white',
        padding: '3rem',
        border: '1px solid var(--line)',
        borderRadius: '4px',
        boxShadow: '0 20px 60px -20px rgba(0,0,0,0.1)',
      }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <a href="/" className="logo" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
            <span className="logo-mark">O<em>&</em>N</span>
            <span className="logo-divider" />
            Glass
          </a>
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', marginTop: '0.5rem' }}>
            Admin панел
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-field">
            <label htmlFor="email">Имейл</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Парола</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p style={{ fontSize: '0.875rem', color: '#c0392b' }}>{error}</p>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ justifyContent: 'center' }}
          >
            {loading ? 'Влизане...' : 'Влез'}
          </button>
        </form>
      </div>
    </div>
  )
}
