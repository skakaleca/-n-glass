'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { GlassType, ThicknessOption, ExtraService, QuoteRequest } from '@/lib/types'

type Tab = 'prices' | 'requests'

const STATUS_BG: Record<string, string> = {
  new: 'Нова',
  seen: 'Видяна',
  done: 'Приключена',
}

const STATUS_COLOR: Record<string, string> = {
  new: '#2d4a3e',
  seen: '#8aa89c',
  done: '#aaa',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('prices')

  const [glassTypes, setGlassTypes] = useState<GlassType[]>([])
  const [thicknessOptions, setThicknessOptions] = useState<ThicknessOption[]>([])
  const [extraServices, setExtraServices] = useState<ExtraService[]>([])
  const [requests, setRequests] = useState<QuoteRequest[]>([])

  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  const supabase = createClient()

  const fetchAll = useCallback(async () => {
    const [gt, th, ex, rq] = await Promise.all([
      supabase.from('glass_types').select('*').order('sort_order'),
      supabase.from('thickness_options').select('*').order('sort_order'),
      supabase.from('extra_services').select('*').order('sort_order'),
      supabase.from('quote_requests').select('*').order('created_at', { ascending: false }),
    ])
    if (gt.data) setGlassTypes(gt.data)
    if (th.data) setThicknessOptions(th.data)
    if (ex.data) setExtraServices(ex.data)
    if (rq.data) setRequests(rq.data as QuoteRequest[])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchAll() }, [fetchAll])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const savePrice = async (
    table: string,
    id: number,
    field: string,
    value: string
  ) => {
    const key = `${table}-${id}`
    setSaving(key)
    const num = parseFloat(value)
    if (isNaN(num)) { setSaving(null); return }
    await supabase.from(table).update({ [field]: num }).eq('id', id)
    setSaving(null)
    setSaved(key)
    setTimeout(() => setSaved(null), 2000)
    await fetchAll()
  }

  const updateRequestStatus = async (id: string, status: string) => {
    await supabase.from('quote_requests').update({ status }).eq('id', id)
    await fetchAll()
  }

  const tdStyle: React.CSSProperties = {
    padding: '0.8rem 1rem',
    borderBottom: '1px solid var(--line)',
    fontSize: '0.95rem',
    verticalAlign: 'middle',
  }
  const thStyle: React.CSSProperties = {
    ...tdStyle,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--ink-soft)',
    fontWeight: 500,
    background: 'var(--bg-2)',
  }

  const PriceInput = ({
    table, id, field, value,
  }: { table: string; id: number; field: string; value: number }) => {
    const [local, setLocal] = useState(String(value))
    const key = `${table}-${id}`

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <input
          type="number"
          value={local}
          step="0.01"
          min="0"
          onChange={e => setLocal(e.target.value)}
          onBlur={() => savePrice(table, id, field, local)}
          style={{
            width: '90px',
            padding: '0.35rem 0.5rem',
            border: '1px solid var(--line)',
            borderRadius: '2px',
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            background: saving === key ? 'var(--bg-2)' : 'white',
          }}
        />
        <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>лв.</span>
        {saved === key && <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>✓</span>}
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-inter-tight), sans-serif' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid var(--line)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="/" className="logo">
          <span className="logo-mark">O<em>&</em>N</span>
          <span className="logo-divider" />
          Glass
        </a>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="/" target="_blank" style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', textDecoration: 'none' }}>
            Виж сайта ↗
          </a>
          <button
            onClick={logout}
            style={{
              padding: '0.5rem 1.2rem',
              border: '1px solid var(--line)',
              borderRadius: '999px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.875rem',
            }}
          >
            Изход
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 2rem', background: 'white', borderBottom: '1px solid var(--line)', display: 'flex', gap: '0' }}>
        {(['prices', 'requests'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '1rem 1.5rem',
              border: 'none',
              borderBottom: tab === t ? '2px solid var(--ink)' : '2px solid transparent',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? 'var(--ink)' : 'var(--ink-soft)',
              marginBottom: '-1px',
            }}
          >
            {t === 'prices' ? 'Цени' : `Заявки (${requests.filter(r => r.status === 'new').length})`}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '2rem', maxWidth: '1100px' }}>

        {tab === 'prices' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* Glass types */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.3rem', marginBottom: '1rem' }}>
                Видове стъкло — базова цена/м²
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', border: '1px solid var(--line)' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Вид</th>
                    <th style={thStyle}>Цена на м²</th>
                  </tr>
                </thead>
                <tbody>
                  {glassTypes.map(g => (
                    <tr key={g.id}>
                      <td style={tdStyle}>{g.name}</td>
                      <td style={tdStyle}>
                        <PriceInput table="glass_types" id={g.id} field="base_price_per_m2" value={g.base_price_per_m2} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Thickness */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.3rem', marginBottom: '1rem' }}>
                Дебелина — доплащане на м²
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', border: '1px solid var(--line)' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Дебелина</th>
                    <th style={thStyle}>Доплащане на м²</th>
                  </tr>
                </thead>
                <tbody>
                  {thicknessOptions.map(t => (
                    <tr key={t.id}>
                      <td style={tdStyle}>{t.label}</td>
                      <td style={tdStyle}>
                        <PriceInput table="thickness_options" id={t.id} field="surcharge_per_m2" value={t.surcharge_per_m2} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Extra services */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.3rem', marginBottom: '1rem' }}>
                Допълнителни услуги
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', border: '1px solid var(--line)' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Услуга</th>
                    <th style={thStyle}>Цена на м²</th>
                    <th style={thStyle}>Фиксирана цена</th>
                  </tr>
                </thead>
                <tbody>
                  {extraServices.map(s => (
                    <tr key={s.id}>
                      <td style={tdStyle}>{s.name}</td>
                      <td style={tdStyle}>
                        {s.price_per_m2 != null
                          ? <PriceInput table="extra_services" id={s.id} field="price_per_m2" value={s.price_per_m2} />
                          : <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>—</span>}
                      </td>
                      <td style={tdStyle}>
                        {s.fixed_price != null
                          ? <PriceInput table="extra_services" id={s.id} field="fixed_price" value={s.fixed_price} />
                          : <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {tab === 'requests' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.3rem', marginBottom: '1rem' }}>
              Заявки от клиенти
            </h2>
            {requests.length === 0 ? (
              <p style={{ color: 'var(--ink-soft)', padding: '3rem 0', textAlign: 'center' }}>
                Все още няма заявки.
              </p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', border: '1px solid var(--line)' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Дата</th>
                    <th style={thStyle}>Клиент</th>
                    <th style={thStyle}>Телефон</th>
                    <th style={thStyle}>Услуга</th>
                    <th style={thStyle}>Размери</th>
                    <th style={thStyle}>Цена</th>
                    <th style={thStyle}>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id} style={{ opacity: r.status === 'done' ? 0.5 : 1 }}>
                      <td style={tdStyle}>
                        {new Date(r.created_at).toLocaleDateString('bg-BG', {
                          day: '2-digit', month: '2-digit', year: '2-digit'
                        })}
                      </td>
                      <td style={tdStyle}>
                        <div>{r.name || '—'}</div>
                        {r.email && <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{r.email}</div>}
                        {r.notes && <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', maxWidth: '200px' }}>{r.notes}</div>}
                      </td>
                      <td style={tdStyle}>
                        {r.phone ? <a href={`tel:${r.phone}`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>{r.phone}</a> : '—'}
                      </td>
                      <td style={tdStyle}>
                        <div>{r.glass_type || '—'}</div>
                        {r.thickness_mm && <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{r.thickness_mm} мм</div>}
                      </td>
                      <td style={tdStyle}>
                        {r.width_cm && r.height_cm
                          ? `${r.width_cm}×${r.height_cm} см`
                          : '—'}
                      </td>
                      <td style={{ ...tdStyle, fontFamily: 'var(--font-fraunces), serif', fontSize: '1.1rem' }}>
                        {r.estimated_price ? `${r.estimated_price} лв.` : '—'}
                      </td>
                      <td style={tdStyle}>
                        <select
                          value={r.status}
                          onChange={e => updateRequestStatus(r.id, e.target.value)}
                          style={{
                            padding: '0.3rem 0.6rem',
                            border: '1px solid var(--line)',
                            borderRadius: '2px',
                            background: 'white',
                            fontFamily: 'inherit',
                            fontSize: '0.85rem',
                            color: STATUS_COLOR[r.status] || 'inherit',
                            cursor: 'pointer',
                          }}
                        >
                          {Object.entries(STATUS_BG).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
