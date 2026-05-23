'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'

// ─── Reveal hook ────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(14px)',
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
    } as CSSProperties,
  }
}

// ─── Data ───────────────────────────────────────────────────
type Product = {
  id: string
  bg: string
  title: string
  sub: string
  detail: string
  base: number
  img?: string
}

const PRODUCTS: Product[] = [
  { id: 'table',   bg: 'маси',        title: 'Маси',            sub: 'Журнални • трапезни • работни',       detail: 'Прозрачно, бронзово, графит. Скосени или полирани ръбове.',              base: 180, img: 'https://i.pinimg.com/736x/4b/50/fc/4b50fcdc38b613d9c051afdb47f6a063.jpg' },
  { id: 'aqua',    bg: 'аквариуми',   title: 'Аквариуми',       sub: 'Силиконово залепени, по проект',      detail: 'Дебелина 8–12 мм според литраж. Тествани на херметичност.',              base: 320, img: 'https://i.pinimg.com/736x/4a/69/34/4a693407f8fd57f6366ff9425f47d8a7.jpg' },
  { id: 'shower',  bg: 'душ кабини',  title: 'Душ кабини',      sub: 'Безпрофилни • walk-in • врати',       detail: 'Закалено 8 мм. Easy-Clean покритие срещу варовик.',                       base: 420, img: 'https://i1-c.pinimg.com/1200x/58/07/e5/5807e5bf8bad880a8535f8ef94abeed3.jpg' },
  { id: 'screen',  bg: 'паравани',    title: 'Паравани',        sub: 'Балкон • офис • кухня',               detail: 'Матирани или релефни мотиви. Дискретни алуминиеви фиксации.',             base: 240 },
  { id: 'mirror',  bg: 'огледала',    title: 'Огледала',        sub: 'Декоративни • с фасет • LED',         detail: 'Сребърно или бронзово отражение. Анти-маглив гръб.',                     base: 140 },
  { id: 'glaze',   bg: 'остъкления',  title: 'Остъкления',      sub: 'Фасади • прозорци • зимни градини',   detail: 'Структурно остъкляване и монолитно стъкло. За жилищни и търговски обекти.', base: 95 },
  { id: 'vitrina', bg: 'витрини',     title: 'Витрини',         sub: 'Магазини • банки • шоуруми',          detail: 'Единично и двойно остъкляване. С алуминиев профил или безрамково.',       base: 210 },
  { id: 'obekt',   bg: 'обекти',      title: 'Търговски обекти', sub: 'Ресторанти • хотели • фризьорски',    detail: 'Разделителни прегради, огледала и витрини за цял обект. Цени по договор.', base: 0 },
  { id: 'b2b',     bg: 'B2B',         title: 'B2B по проект',   sub: 'Архитекти • интериор • хотели',       detail: 'Партиди по размер. Сертификати, документация, монтажни екипи.',           base: 0 },
]

const THICKNESS = [4, 5, 6, 8, 10, 12]

const GLASS_TYPE = [
  { id: 'clear',    label: 'Прозрачно',      mult: 1.00 },
  { id: 'matte',    label: 'Матирано',       mult: 1.18 },
  { id: 'bronze',   label: 'Антиваровиково', mult: 1.25 },
  { id: 'graphite', label: 'Цветно',         mult: 1.32 },
]

const PRICE_PER_M2: Record<number, number> = { 4: 38, 5: 46, 6: 54, 8: 72, 10: 96, 12: 128 }

// ─── Wordmark separator ─────────────────────────────────────
function LogoSep({ size = 19 }: { size?: number }) {
  return (
    <span style={{
      display: 'inline-block', width: 1,
      height: size * 0.72,
      background: 'currentColor', opacity: 0.2,
      margin: `0 ${size * 0.38}px 0 ${size * 0.32}px`,
      verticalAlign: 'middle',
    }} />
  )
}

// ─── Small bits ─────────────────────────────────────────────
function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Navbar ─────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkStyle: CSSProperties = { color: 'var(--ink)' }
  return (
    <div
      className="glass v2-nav"
      style={{
        position: 'fixed',
        top: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100,
        width: 'calc(100% - 32px)',
        maxWidth: 1440,
        padding: '14px 22px 14px 28px',
        borderRadius: 999,
        display: 'flex', alignItems: 'center', gap: 18,
        transition: 'padding .2s ease, background .2s ease',
        background: scrolled ? 'rgba(250,248,243,0.35)' : 'rgba(255,255,255,0.12)',
      }}
    >
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--ink)', padding: '4px 10px 4px 6px' }}>
        <div style={{ lineHeight: 1 }}>
          <div className="wordmark" style={{ fontSize: 19, letterSpacing: '-0.005em', lineHeight: 1 }}>
            O&amp;N<LogoSep size={19} /><em style={{ fontStyle: 'italic' }}>glass</em>
          </div>
          <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: 'var(--ink-3)', marginTop: 4 }}>EST.&nbsp;2007 · ПЛОВДИВ</div>
        </div>
      </a>

      <nav className="v2-nav-links" style={{ display: 'flex', gap: 22, marginLeft: 28, alignItems: 'center' }}>
        <a className="nav-link" style={linkStyle} href="#products">Продукти</a>
        <a className="nav-link" style={linkStyle} href="#calculator">Калкулатор</a>
        <a className="nav-link" style={linkStyle} href="#services">Услуги</a>
        <a className="nav-link" style={linkStyle} href="#b2b">B2B</a>
        <a className="nav-link" style={linkStyle} href="#contact">Контакт</a>
      </nav>

      <div style={{ flex: 1 }} />

      <a className="btn btn-primary" href="#calculator">
        Изчисли цена <Arrow />
      </a>
    </div>
  )
}

// ─── Hero ───────────────────────────────────────────────────
function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '0.5px dashed var(--line)', paddingTop: 8 }}>
      <span className="dim" style={{ fontSize: 12 }}>{k}</span>
      <span className="mono" style={{ fontSize: 12, letterSpacing: '0.02em' }}>{v}</span>
    </li>
  )
}

function Hero() {
  return (
    <section id="top" className="v2-hero" style={{ position: 'relative', paddingTop: 140, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>

        <h1 className="serif" style={{
          fontSize: 'clamp(56px, 8.5vw, 124px)',
          lineHeight: 0.96,
          letterSpacing: '-0.02em',
          margin: '0 0 28px',
          maxWidth: 1100,
          animation: 'v2FadeInUp 0.75s ease backwards',
        }}>
          Стъкло, прецизно <br />
          по&nbsp;вашите <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>размери</em>.
        </h1>

        <p className="dim" style={{
          fontSize: 18, lineHeight: 1.5, maxWidth: 560, margin: '0 0 36px',
          letterSpacing: '-0.005em',
          animation: 'v2FadeInUp 0.75s 0.12s ease backwards',
        }}>
          Маси, аквариуми, душ&nbsp;кабини, паравани и&nbsp;огледала — изработени
          в&nbsp;собствено ателие. Кантиране, доставка и&nbsp;монтаж от&nbsp;един екип.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56, animation: 'v2FadeInUp 0.75s 0.22s ease backwards' }}>
          <a className="btn btn-primary" href="#calculator">Изчисли поръчка <Arrow /></a>
          <a className="btn btn-ghost" href="#products">Разгледай продукти</a>
        </div>

        <div className="v2-grid-hero" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14, minHeight: 360, animation: 'v2FadeInUp 0.8s 0.32s ease backwards' }}>
          <div className="glass-matte" style={{ minHeight: 360, position: 'relative', animation: 'v2Float 7s ease-in-out infinite' }}>
            <div className="tile-img" style={{ position: 'absolute', inset: 14, borderRadius: 10 }}>
              <Image src="https://i1-c.pinimg.com/1200x/40/20/0a/40200aade6932a8939f1a6a89fc36f29.jpg" alt="Матирано стъкло 8 мм" fill priority style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 55vw" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="glass-matte" style={{ flex: 1, position: 'relative', animation: 'v2Float 9s 0.7s ease-in-out infinite' }}>
              <div className="tile-img" style={{ position: 'absolute', inset: 12, borderRadius: 8 }}>
                <Image src="https://i1-c.pinimg.com/736x/66/8b/55/668b5582b6270b97f0e4b476c886e602.jpg" alt="Душ кабина" fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 22vw" />
              </div>
            </div>
            <div className="glass-matte" style={{ flex: 1, position: 'relative', animation: 'v2Float 6.5s 1.4s ease-in-out infinite' }}>
              <div className="tile-img" style={{ position: 'absolute', inset: 12, borderRadius: 8 }}>
                <Image src="https://i1-c.pinimg.com/736x/e4/0a/f8/e40af891cacb55f80654ccbdb6f6048b.jpg" alt="Огледало с фасет" fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 22vw" />
              </div>
            </div>
          </div>
          <div className="glass" style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="serif" style={{ fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.01em' }}>
                Закалено<br/>безопасно стъкло
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 13 }}>
              <SpecRow k="Дебелина" v="4 – 12 мм" />
              <SpecRow k="Размер" v="до 2400 × 3600" />
              <SpecRow k="Ръб" v="полиран · скосен" />
              <SpecRow k="Срок" v="5 – 14 дни" />
              <SpecRow k="Гаранция" v="36 месеца" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section heading ────────────────────────────────────────
function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div>
      <h2 className="serif" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', letterSpacing: '-0.015em', lineHeight: 1.02, margin: '0 0 14px' }}>
        {title}
      </h2>
      {sub && <p className="dim" style={{ fontSize: 16, maxWidth: 560, margin: 0, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  )
}

// ─── Products ───────────────────────────────────────────────
function ProductCard({ p, i }: { p: Product; i: number }) {
  const { ref, style: revealStyle } = useReveal(i * 0.07)
  const [hovered, setHovered] = useState(false)
  const isB2B = p.id === 'b2b'
  return (
    <div ref={ref} style={revealStyle}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="glass-matte"
        style={{
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          minHeight: 360,
          transform: hovered ? 'translateY(-3px)' : 'none',
          cursor: 'default',
          background: isB2B
            ? 'linear-gradient(180deg, rgba(46,74,74,0.85), rgba(29,42,42,0.95))'
            : undefined,
          color: isB2B ? '#ece8e1' : undefined,
        }}
      >
        <div className="tile-img" style={{
          flex: 1, minHeight: 180, borderRadius: 10,
          background: isB2B
            ? 'repeating-linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 9px), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
            : 'none',
        }}>
          {!isB2B && (
            <Image
              src={p.img ?? `https://picsum.photos/seed/${p.id}-product/600/500`}
              alt={p.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          )}
        </div>

        <div>
          <h3 className="serif" style={{ fontSize: 28, letterSpacing: '-0.01em', margin: '0 0 4px' }}>
            {p.title}
          </h3>
          <div style={{
            fontSize: 12.5, color: isB2B ? 'rgba(236,232,225,0.7)' : 'var(--ink-2)',
            fontFamily: 'Geist Mono, monospace', letterSpacing: '0.01em',
          }}>
            {p.sub}
          </div>
        </div>

        <p style={{
          fontSize: 13.5, lineHeight: 1.5, margin: 0,
          color: isB2B ? 'rgba(236,232,225,0.75)' : 'var(--ink-2)',
        }}>
          {p.detail}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6 }}>
          {!isB2B && p.base > 0 && (
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>от {p.base} лв.</span>
          )}
          {(!isB2B && p.base === 0) && (
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>по договор</span>
          )}
          <a href={isB2B ? '#b2b' : '#calculator'}
             style={{
               color: isB2B ? '#ece8e1' : 'var(--ink)',
               textDecoration: 'none', fontSize: 13, fontWeight: 500,
               display: 'inline-flex', alignItems: 'center', gap: 8,
               marginLeft: 'auto',
             }}>
            {isB2B ? 'Заявка за оферта' : 'Изчисли'}
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  )
}

function Products() {
  return (
    <section id="products" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SectionHead title="Девет направления, едно ателие" sub="Всяка поръчка минава през собствено производство — рязане, кантиране, закаляване, сглобяване." />
        <div className="v2-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 44 }}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Calculator ─────────────────────────────────────────────
function Label({ text }: { text: string }) {
  return (
    <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em' }}>{text}</span>
  )
}

function Field({ label, value, onChange, suffix, min = 1 }: { label: string; value: number; onChange: (n: number) => void; suffix: string; min?: number }) {
  return (
    <label style={{ display: 'block' }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ position: 'relative' }}>
        <input
          type="number"
          value={value}
          min={min}
          onChange={e => onChange(Math.max(min, Number(e.target.value) || min))}
          style={{ paddingRight: 40, fontVariantNumeric: 'tabular-nums' }}
        />
        <span style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono, monospace',
          pointerEvents: 'none',
        }}>{suffix}</span>
      </div>
    </label>
  )
}

function DimSliderHint({ w, h, m2 }: { w: number; h: number; m2: number }) {
  const maxDim = Math.max(w, h, 800)
  const vw = (w / maxDim) * 100
  const vh = (h / maxDim) * 100
  return (
    <div style={{
      marginTop: 12, padding: '10px 12px',
      background: 'rgba(255,255,255,0.4)',
      border: '0.5px dashed var(--line)',
      borderRadius: 10,
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{ width: 64, height: 64, position: 'relative', flexShrink: 0 }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: `${vw * 0.6}%`, height: `${vh * 0.6}%`,
          background: 'rgba(110,140,140,0.25)',
          border: '0.5px solid rgba(46,74,74,0.6)',
          borderRadius: 2,
        }} />
      </div>
      <div style={{ flex: 1, fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.4 }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink)' }}>{w} × {h} мм</span>
        <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 2 }}>
          ≈ {m2.toFixed(2)} м² · периметър {(2 * (w + h) / 1000).toFixed(2)} м
        </div>
      </div>
    </div>
  )
}

function GlassSwatch({ type }: { type: string }) {
  const bg: Record<string, string> = {
    clear:    'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(220,230,235,0.5))',
    matte:    'linear-gradient(135deg, rgba(245,245,240,0.85), rgba(220,220,215,0.8))',
    bronze:   'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(190,220,225,0.65))',
    graphite: 'linear-gradient(135deg, rgba(120,170,180,0.6), rgba(180,140,90,0.5) 50%, rgba(150,120,170,0.6))',
  }
  return (
    <div style={{
      width: 28, height: 18, borderRadius: 4,
      background: bg[type],
      border: '0.5px solid rgba(0,0,0,0.15)',
      boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
    }} />
  )
}

function ServiceChip({ on, onClick, title, sub }: { on: boolean; onClick: () => void; title: string; sub: string }) {
  return (
    <button onClick={onClick}
      style={{
        padding: '12px 14px',
        borderRadius: 12,
        border: '0.5px solid ' + (on ? 'var(--accent)' : 'var(--line)'),
        background: on ? 'rgba(46,74,74,0.08)' : 'rgba(255,255,255,0.5)',
        color: 'var(--ink)',
        textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 4,
        position: 'relative',
        transition: 'all .15s ease',
      }}>
      <span style={{
        position: 'absolute', top: 10, right: 10,
        width: 16, height: 16, borderRadius: 4,
        border: '0.5px solid ' + (on ? 'var(--accent)' : 'var(--line)'),
        background: on ? 'var(--accent)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .15s ease',
      }}>
        {on && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6.5L4.5 9L10 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{title}</span>
      <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{sub}</span>
    </button>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
      <span style={{ color: muted ? 'rgba(236,232,225,0.55)' : undefined }}>{label}</span>
      <span className="mono" style={{ fontVariantNumeric: 'tabular-nums', color: muted ? 'rgba(236,232,225,0.75)' : undefined }}>{value}</span>
    </div>
  )
}

type CalcResult = {
  m2: number; perimM: number; glassCost: number; kantCost: number;
  deliveryCost: number; montageCost: number; subtotal: number;
  vat: number; total: number; pricePerM2: number
}

function Summary({
  product, glass, thickness, w, h, qty, services, calc, fmt, onSend, sendState,
}: {
  product: Product
  glass: typeof GLASS_TYPE[number]
  thickness: number
  w: number; h: number; qty: number
  services: { kant: boolean; delivery: boolean; montage: boolean }
  calc: CalcResult
  fmt: (n: number) => string
  onSend: () => void
  sendState: 'idle' | 'loading' | 'ok' | 'err'
}) {
  const rows = [
    { k: `Стъкло ${glass.label.toLowerCase()} · ${thickness} мм`, v: `${fmt(calc.glassCost)} лв.` },
    services.kant     && { k: `Кантиране (${calc.perimM.toFixed(2)} м)`, v: `${fmt(calc.kantCost)} лв.` },
    services.delivery && { k: 'Доставка',                                v: `${fmt(calc.deliveryCost)} лв.` },
    services.montage  && { k: 'Монтаж на място',                         v: `${fmt(calc.montageCost)} лв.` },
  ].filter(Boolean) as { k: string; v: string }[]

  return (
    <div className="glass-matte" style={{
      padding: 24,
      display: 'flex', flexDirection: 'column', gap: 18,
      background: 'linear-gradient(180deg, rgba(46,74,74,0.95), rgba(29,42,42,0.98))',
      color: '#ece8e1',
      borderColor: 'rgba(255,255,255,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', color: 'rgba(236,232,225,0.55)' }}>
          ОФЕРТА · {new Date().toLocaleDateString('bg-BG')}
        </div>
        <div className="mono" style={{ fontSize: 10.5, color: 'rgba(236,232,225,0.55)' }}>
          № {Math.floor(Math.random() * 8000 + 1000)}
        </div>
      </div>

      <div>
        <div className="serif" style={{ fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
          {product.title}
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'rgba(236,232,225,0.6)', marginTop: 4 }}>
          {w} × {h} мм · {qty} бр. · {calc.m2.toFixed(2)} м²
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 6 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '0.5px dashed rgba(255,255,255,0.15)', paddingTop: 10, fontSize: 13 }}>
            <span style={{ color: 'rgba(236,232,225,0.75)' }}>{r.k}</span>
            <span className="mono" style={{ fontVariantNumeric: 'tabular-nums' }}>{r.v}</span>
          </div>
        ))}
        {qty > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '0.5px dashed rgba(255,255,255,0.15)', paddingTop: 10, fontSize: 12 }}>
            <span style={{ color: 'rgba(236,232,225,0.55)' }}>× {qty} бр.</span>
            <span />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 10, borderTop: '0.5px solid rgba(255,255,255,0.2)' }}>
        <Row label="Междинна сума" value={`${fmt(calc.subtotal)} лв.`} muted />
        <Row label="ДДС 20%" value={`${fmt(calc.vat)} лв.`} muted />
      </div>

      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.25)',
      }}>
        <span style={{ fontSize: 13, color: 'rgba(236,232,225,0.7)' }}>За плащане</span>
        <span className="serif" style={{ fontSize: 42, letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>
          {fmt(calc.total)} <span style={{ fontSize: 22, opacity: 0.7 }}>лв.</span>
        </span>
      </div>

      <button
        className="btn"
        onClick={onSend}
        disabled={sendState === 'loading' || sendState === 'ok'}
        style={{
          background: '#ece8e1', color: '#1d1c19',
          justifyContent: 'center', padding: '12px 16px', marginTop: 4,
          border: 'none',
          opacity: sendState === 'loading' ? 0.6 : 1,
          transition: 'opacity .15s ease',
        }}
      >
        {sendState === 'loading' && 'Изпращане...'}
        {sendState === 'ok' && '✓ Заявката е изпратена'}
        {sendState === 'err' && 'Грешка — опитайте пак'}
        {sendState === 'idle' && (<>Изпрати запитване <Arrow /></>)}
      </button>

      <div className="mono" style={{ fontSize: 10, color: 'rgba(236,232,225,0.45)', lineHeight: 1.5, textAlign: 'center' }}>
        Ориентировъчна цена. Финалната оферта се потвърждава от технолог.
      </div>
    </div>
  )
}

function Calculator() {
  const [productId, setProductId] = useState('table')
  const [glassType, setGlassType] = useState('clear')
  const [thickness, setThickness] = useState(8)
  const [w, setW] = useState(1200)
  const [h, setH] = useState(700)
  const [qty, setQty] = useState(1)
  const [services, setServices] = useState({ kant: true, delivery: false, montage: false })
  const [sendState, setSendState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  const calcProducts = PRODUCTS.filter(p => p.id !== 'b2b' && p.id !== 'obekt')
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0]
  const glass = GLASS_TYPE.find(g => g.id === glassType) || GLASS_TYPE[0]

  const calc = useMemo<CalcResult>(() => {
    const m2 = Math.max(0.04, (w / 1000) * (h / 1000))
    const pricePerM2 = PRICE_PER_M2[thickness]
    const glassCost = m2 * pricePerM2 * glass.mult
    const perimM = 2 * ((w / 1000) + (h / 1000))
    const kantCost = services.kant ? perimM * 14 : 0
    const deliveryCost = services.delivery ? 35 + Math.max(0, m2 - 1) * 8 : 0
    const montageCost = services.montage ? 60 + m2 * 18 : 0
    const subtotal = (glassCost + kantCost + deliveryCost + montageCost) * qty
    const vat = subtotal * 0.20
    const total = subtotal + vat
    return { m2, perimM, glassCost, kantCost, deliveryCost, montageCost, subtotal, vat, total, pricePerM2 }
  }, [w, h, thickness, qty, services, glass])

  const fmt = (n: number) => Math.round(n).toLocaleString('bg-BG')

  const handleSend = async () => {
    setSendState('loading')
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          glass_type: `${product.title} · ${glass.label}`,
          width_cm: w / 10,
          height_cm: h / 10,
          thickness_mm: thickness,
          extras: services,
          estimated_price: Math.round(calc.total),
        }),
      })
      setSendState(res.ok ? 'ok' : 'err')
    } catch {
      setSendState('err')
    }
    setTimeout(() => setSendState('idle'), 4000)
  }

  return (
    <section id="calculator" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SectionHead title="Изчислете поръчката си на място" sub="Ориентировъчна цена за секунди. Финалната оферта се потвърждава от технолог в рамките на работния ден." />

        <div className="glass v2-grid-calc" style={{
          marginTop: 44,
          padding: 28,
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 28,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div>
              <Label text="Тип продукт" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 10 }}>
                {calcProducts.map(p => (
                  <button key={p.id}
                    onClick={() => setProductId(p.id)}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 10,
                      border: '0.5px solid ' + (productId === p.id ? 'var(--ink)' : 'var(--line)'),
                      background: productId === p.id ? 'var(--ink)' : 'rgba(255,255,255,0.55)',
                      color: productId === p.id ? '#ece8e1' : 'var(--ink)',
                      fontSize: 13, fontWeight: 500,
                      textAlign: 'left',
                      transition: 'all .12s ease',
                      display: 'flex', flexDirection: 'column', gap: 2,
                    }}>
                    <span>{p.title}</span>
                    <span style={{ fontSize: 10.5, opacity: 0.6, fontFamily: 'Geist Mono, monospace' }}>от {p.base} лв.</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label text="Размери (мм)" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.7fr', gap: 10, marginTop: 10 }}>
                <Field label="Ширина" value={w} onChange={setW} suffix="мм" />
                <Field label="Височина" value={h} onChange={setH} suffix="мм" />
                <Field label="Брой" value={qty} onChange={setQty} suffix="бр." min={1} />
              </div>
              <DimSliderHint w={w} h={h} m2={calc.m2} />
            </div>

            <div>
              <Label text="Дебелина" />
              <div className="seg" style={{ marginTop: 10, width: '100%', display: 'grid', gridTemplateColumns: 'repeat(6,1fr)' }}>
                {THICKNESS.map(t => (
                  <button key={t} className={thickness === t ? 'on' : ''} onClick={() => setThickness(t)}>
                    {t} мм
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label text="Вид стъкло" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 10 }}>
                {GLASS_TYPE.map(g => (
                  <button key={g.id}
                    onClick={() => setGlassType(g.id)}
                    style={{
                      padding: '10px 12px', borderRadius: 10,
                      border: '0.5px solid ' + (glassType === g.id ? 'var(--ink)' : 'var(--line)'),
                      background: glassType === g.id ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
                      fontSize: 12.5, fontWeight: 500,
                      color: 'var(--ink)',
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
                      transition: 'all .12s ease',
                    }}>
                    <GlassSwatch type={g.id} />
                    <span>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label text="Услуги" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 10 }}>
                <ServiceChip on={services.kant}     onClick={() => setServices(s => ({ ...s, kant: !s.kant }))}         title="Кантиране" sub="полиран ръб · 14 лв/м" />
                <ServiceChip on={services.delivery} onClick={() => setServices(s => ({ ...s, delivery: !s.delivery }))} title="Доставка"  sub="до адрес · от 35 лв" />
                <ServiceChip on={services.montage}  onClick={() => setServices(s => ({ ...s, montage: !s.montage }))}   title="Монтаж"    sub="на място · от 60 лв" />
              </div>
            </div>
          </div>

          <Summary product={product} glass={glass} thickness={thickness} w={w} h={h} qty={qty}
                   services={services} calc={calc} fmt={fmt} onSend={handleSend} sendState={sendState} />
        </div>
      </div>
    </section>
  )
}

// ─── Services ───────────────────────────────────────────────
function Services() {
  const items = [
    { t: 'Кантиране', d: 'Полиран и скосен ръб. CNC обработка до C-фасет 30°. Готовност за директен монтаж без рамки.' },
    { t: 'Доставка',  d: 'Собствен транспорт за Пловдив и областта. За страната — куриерска услуга със специализирано опаковане.' },
    { t: 'Монтаж',    d: 'Сертифициран екип на място. Силиконово залепване, профили, повдигачи за големи листове.' },
  ]
  return (
    <section id="services" style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SectionHead title="Един екип — от рязане до монтаж" />
        <div className="v2-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 36 }}>
          {items.map((it, i) => {
            const { ref, style } = useReveal(i * 0.08) // eslint-disable-line react-hooks/rules-of-hooks
            return (
              <div key={it.t} ref={ref} style={style}>
                <div className="glass" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 220 }}>
                  <div className="serif" style={{ fontSize: 30, letterSpacing: '-0.01em' }}>{it.t}</div>
                  <p className="dim" style={{ fontSize: 13.5, lineHeight: 1.55, margin: 0 }}>{it.d}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── B2B ────────────────────────────────────────────────────
function B2B() {
  const { ref, style } = useReveal(0)
  return (
    <section id="b2b" style={{ padding: '80px 24px' }}>
      <div ref={ref} style={{ maxWidth: 1240, margin: '0 auto', ...style }}>
        <div className="glass-matte v2-grid-b2b" style={{
          padding: 44, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 44,
          background: 'linear-gradient(180deg, rgba(46,74,74,0.94), rgba(20,32,32,0.98))',
          color: '#ece8e1', borderColor: 'rgba(255,255,255,0.12)',
        }}>
          <div>
            <h2 className="serif" style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.015em', margin: '0 0 18px' }}>
              За архитекти, <br/> интериорни студия и&nbsp;хотели.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(236,232,225,0.75)', maxWidth: 520, margin: '0 0 28px' }}>
              Партиди по размер със стабилни срокове и&nbsp;документация. Назначен технолог за&nbsp;всеки обект.
              Цени по&nbsp;договор за повече от&nbsp;15 м² годишно.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a className="btn" style={{ background: '#ece8e1', color: '#1d1c19' }} href="#contact">
                Заявка за оферта <Arrow />
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { k: 'Среден срок',          v: '5 – 14 работни дни' },
              { k: 'Минимална партида',    v: '5 м² / поръчка' },
              { k: 'Максимален размер',    v: '2400 × 3600 мм' },
              { k: 'Сертификати',          v: 'EN 12150 · EN 14179' },
              { k: 'Активни обекти',       v: '12 в Пловдив, 4 в страната' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '0.5px dashed rgba(255,255,255,0.18)' }}>
                <span style={{ fontSize: 13, color: 'rgba(236,232,225,0.65)' }}>{r.k}</span>
                <span className="mono" style={{ fontSize: 12, color: '#ece8e1' }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ─────────────────────────────────────────────────
type FooterRow = [string, string]
function FooterCol({ title, rows, pair, link }: { title: string; rows: FooterRow[]; pair?: boolean; link?: boolean }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--ink-3)', marginBottom: 14, textTransform: 'uppercase' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
        {rows.map((r, i) => {
          if (link) return <a key={i} href={r[1]} style={{ color: 'var(--ink)', textDecoration: 'none' }} className="nav-link">{r[0]}</a>
          if (pair) return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="dim">{r[0]}</span>
              <span className="mono" style={{ fontSize: 11.5 }}>{r[1]}</span>
            </div>
          )
          return <div key={i}>{r[0]}</div>
        })}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer id="contact" style={{ padding: '80px 24px 40px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="v2-grid-footer" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 36, paddingBottom: 36, borderBottom: '0.5px solid var(--line)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span className="wordmark" style={{ fontSize: 32, letterSpacing: '-0.005em', lineHeight: 1 }}>
                O&amp;N<LogoSep size={32} /><em style={{ fontStyle: 'italic' }}>glass</em>
              </span>
            </div>
            <p className="dim" style={{ fontSize: 13.5, lineHeight: 1.55, maxWidth: 360, margin: '0 0 12px' }}>
              Семейно ателие за индивидуално стъкло от 2007. Собствено производство в кв. Изгрев, Пловдив.
            </p>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
              Основана · 2007 · Пловдив
            </div>
          </div>

          <FooterCol title="Контакт" rows={[
            ['+359 32 800 2007', 'tel'],
            ['работилница@onglass.bg', 'mail'],
            ['Изгрев 14, Пловдив', 'addr'],
          ]} />

          <FooterCol title="Работно време" rows={[
            ['Пон – Пет', '08:00 – 17:00'],
            ['Събота',    '09:00 – 14:00'],
            ['Неделя',    'затворено'],
          ]} pair />

          <FooterCol title="Навигация" rows={[
            ['Продукти',   '#products'],
            ['Калкулатор', '#calculator'],
            ['Услуги',     '#services'],
            ['B2B',        '#b2b'],
          ]} link />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 24, fontSize: 11.5, color: 'var(--ink-3)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.04em', flexWrap: 'wrap', gap: 10 }}>
          <span>© 2007 – {new Date().getFullYear()} O&amp;N GLASS ООД</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ──────────────────────────────────────────────────
export default function V2Page() {
  return (
    <div className="v2-page">
      <Navbar />
      <Hero />
      <Products />
      <Calculator />
      <Services />
      <B2B />
      <Footer />
    </div>
  )
}
