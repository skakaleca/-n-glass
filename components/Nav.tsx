'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`v1-nav${scrolled ? ' scrolled' : ''}`}>
      <Link href="/" className="v1-nav-wordmark">
        <div className="v1-nav-brand">O&amp;N&nbsp;<em>glass</em></div>
        <div className="v1-nav-sub">EST.&nbsp;2008 · ПЛОВДИВ</div>
      </Link>

      <div className="v1-nav-links">
        <a className="v1-nav-link" href="#services">Услуги</a>
        <a className="v1-nav-link" href="#calculator">Калкулатор</a>
        <a className="v1-nav-link" href="#about">За нас</a>
        <a className="v1-nav-link" href="#contact">Контакт</a>
      </div>

      <div style={{ flex: 1 }} />

      <div className="v1-chip">
        <span className="v1-dot" />
        отворено · до&nbsp;18:00
      </div>

      <a className="v1-nav-cta" href="#calculator">
        Изчисли цена <Arrow />
      </a>
    </nav>
  )
}
