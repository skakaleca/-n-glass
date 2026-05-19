'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} style={{ position: 'relative' }}>
      <Link href="/" className="logo">
        <span className="logo-mark">
          O<em>&</em>N
        </span>
        <span className="logo-divider" />
        Glass
      </Link>

      <ul className={`nav-links${mobileOpen ? ' open' : ''}`}>
        <li><a href="#услуги" onClick={() => setMobileOpen(false)}>Услуги</a></li>
        <li><a href="#калкулатор" onClick={() => setMobileOpen(false)}>Калкулатор</a></li>
        <li><a href="#за-нас" onClick={() => setMobileOpen(false)}>За нас</a></li>
        <li><a href="#контакти" onClick={() => setMobileOpen(false)}>Контакти</a></li>
      </ul>

      <a href="#контакти" className="nav-cta" style={{ display: mobileOpen ? 'none' : undefined }}>
        Запитване
      </a>

      <button
        className="nav-mobile-btn"
        aria-label="Меню"
        onClick={() => setMobileOpen(v => !v)}
      >
        {mobileOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </nav>
  )
}
