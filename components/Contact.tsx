'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus('loading')

    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form }),
    })

    if (res.ok) {
      setStatus('ok')
      setForm({ name: '', phone: '', email: '', notes: '' })
    } else {
      setStatus('err')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="контакти">
      <div className="section-head">
        <span className="section-num">04</span>
        <h2 className="section-title">
          Свържете се<br /><em>с нас</em>
        </h2>
      </div>

      <div className="contact-wrap">
        <div className="contact-info">
          <div className="contact-block">
            <h3>Телефон</h3>
            <a href="tel:+359XXXXXXXXX" className="contact-detail">+359 XX XXX XXXX</a>
            <p className="contact-meta">Работно време: Пон–Пет, 9:00–18:00</p>
          </div>
          <div className="contact-block">
            <h3>Имейл</h3>
            <a href="mailto:info@onglass.bg" className="contact-detail">info@onglass.bg</a>
            <p className="contact-meta">Отговаряме до 24 часа</p>
          </div>
          <div className="contact-block">
            <h3>Адрес</h3>
            <span className="contact-detail" style={{ cursor: 'default' }}>Пловдив, България</span>
            <p className="contact-meta">Идваме и на място за измерване</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Вашето име *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Иван Петров"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Телефон *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+359 88 888 8888"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email">Имейл</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ivan@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="notes">Опишете проекта си</label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Каква услуга търсите, размери, материал..."
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={status === 'loading' || status === 'ok'}
            style={{ alignSelf: 'flex-start' }}
          >
            {status === 'loading' && 'Изпращане...'}
            {status === 'ok' && '✓ Изпратено!'}
            {status === 'err' && 'Грешка — опитайте пак'}
            {status === 'idle' && (
              <>
                Изпратете запитване
                <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>

          {status === 'ok' && (
            <p style={{ fontSize: '0.875rem', color: 'var(--accent)', marginTop: '0.5rem' }}>
              Ще се свържем с вас до 24 часа.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
