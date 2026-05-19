'use client'

import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !contact) return
    setStatus('loading')

    const isEmail = contact.includes('@')

    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone: isEmail ? null : contact,
        email: isEmail ? contact : null,
        notes: description,
      }),
    })

    if (res.ok) {
      setStatus('ok')
      setName('')
      setContact('')
      setDescription('')
    } else {
      setStatus('err')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact">
      <div className="section-head">
        <div className="section-num">— 04 / Контакт</div>
        <h2 className="section-title">
          Свържи се<br /><em>с ателието</em>.
        </h2>
      </div>

      <div className="contact-wrap">
        <div className="contact-info">
          <div className="contact-block">
            <h3>Телефон</h3>
            <a href="tel:+359000000000" className="contact-detail">+359 __ ___ ____</a>
            <div className="contact-meta">Понеделник – Петък, 8:00 – 17:00 / Събота, 9:00 – 13:00</div>
          </div>

          <div className="contact-block">
            <h3>Имейл</h3>
            <a href="mailto:office@onglass.bg" className="contact-detail">office@onglass.bg</a>
            <div className="contact-meta">Пращайте размери, скици и снимки за бърза оферта.</div>
          </div>

          <div className="contact-block">
            <h3>Адрес</h3>
            <div className="contact-detail">ул. Примерна 00, Пловдив</div>
            <div className="contact-meta">Безплатен паркинг пред ателието</div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="calc-field">
              <label className="calc-label">Име</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="calc-field">
              <label className="calc-label">Телефон или имейл</label>
              <input
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                required
              />
            </div>
            <div className="calc-field">
              <label className="calc-label">Описание на проекта</label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="например: душ кабина 90×200, 8 мм"
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'loading' || status === 'ok'}
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
            >
              {status === 'loading' && 'Изпращане...'}
              {status === 'ok' && '✓ Благодарим! Ще се свържем с вас.'}
              {status === 'err' && 'Грешка — опитайте пак'}
              {status === 'idle' && (
                <>
                  Изпрати запитване
                  <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </>
              )}
            </button>

            {status === 'ok' && (
              <div className="contact-status ok">Ще се свържем с вас в рамките на работния ден.</div>
            )}
            {status === 'err' && (
              <div className="contact-status err">Възникна грешка. Моля опитайте по-късно.</div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
