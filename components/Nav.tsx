'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  getDisplacementFilter,
  supportsBackdropFilterUrl,
} from '@/lib/liquidGlass'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const glassRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const nav = navRef.current
    const glass = glassRef.current
    if (!nav || !glass) return

    const apply = () => {
      const rect = nav.getBoundingClientRect()
      const width = Math.round(rect.width)
      const height = Math.round(rect.height)
      if (!width || !height) return

      if (supportsBackdropFilterUrl()) {
        const filter = getDisplacementFilter({
          width,
          height,
          radius: height / 2,
          depth: 8,
          strength: 60,
          chromaticAberration: 4,
        })
        glass.style.backdropFilter = `blur(2px) url('${filter}') saturate(1.5) brightness(1.1)`
        ;(glass.style as unknown as Record<string, string>)['-webkit-backdrop-filter'] =
          `blur(2px) url('${filter}') saturate(1.5) brightness(1.1)`
      } else {
        glass.style.backdropFilter = 'blur(30px) saturate(180%)'
        ;(glass.style as unknown as Record<string, string>)['-webkit-backdrop-filter'] =
          'blur(30px) saturate(180%)'
      }
    }

    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(nav)
    return () => ro.disconnect()
  }, [])

  return (
    <nav ref={navRef} className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div ref={glassRef} className="nav-glass" aria-hidden />

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
