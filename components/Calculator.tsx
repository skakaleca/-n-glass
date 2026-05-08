'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { GlassType, ThicknessOption, ExtraService } from '@/lib/types'

interface CalcState {
  glassTypeId: number | null
  widthCm: string
  heightCm: string
  thicknessId: number | null
  extras: Record<string, boolean>
}

interface Breakdown {
  base: number
  thickness: number
  extraLines: { name: string; amount: number }[]
  total: number
  areaSqm: number
}

export default function Calculator() {
  const [glassTypes, setGlassTypes] = useState<GlassType[]>([])
  const [thicknessOptions, setThicknessOptions] = useState<ThicknessOption[]>([])
  const [extraServices, setExtraServices] = useState<ExtraService[]>([])
  const [loading, setLoading] = useState(true)

  const [state, setState] = useState<CalcState>({
    glassTypeId: null,
    widthCm: '',
    heightCm: '',
    thicknessId: null,
    extras: {},
  })

  const [breakdown, setBreakdown] = useState<Breakdown | null>(null)
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from('glass_types').select('*').order('sort_order'),
      supabase.from('thickness_options').select('*').order('sort_order'),
      supabase.from('extra_services').select('*').order('sort_order'),
    ]).then(([gt, th, ex]) => {
      if (gt.data) setGlassTypes(gt.data)
      if (th.data) setThicknessOptions(th.data)
      if (ex.data) setExtraServices(ex.data)
      setLoading(false)
    })
  }, [])

  const calculate = useCallback(() => {
    const gType = glassTypes.find(g => g.id === state.glassTypeId)
    const thick = thicknessOptions.find(t => t.id === state.thicknessId)
    const w = parseFloat(state.widthCm)
    const h = parseFloat(state.heightCm)

    if (!gType || !thick || !w || !h || w <= 0 || h <= 0) {
      setBreakdown(null)
      return
    }

    const areaSqm = (w / 100) * (h / 100)
    const base = gType.base_price_per_m2 * areaSqm
    const thicknessAmt = thick.surcharge_per_m2 * areaSqm

    const extraLines: { name: string; amount: number }[] = []
    let extrasTotal = 0

    for (const svc of extraServices) {
      if (!state.extras[svc.slug]) continue
      const amt = svc.price_per_m2 != null
        ? svc.price_per_m2 * areaSqm
        : (svc.fixed_price ?? 0)
      extraLines.push({ name: svc.name, amount: amt })
      extrasTotal += amt
    }

    setBreakdown({
      base,
      thickness: thicknessAmt,
      extraLines,
      total: base + thicknessAmt + extrasTotal,
      areaSqm,
    })
  }, [state, glassTypes, thicknessOptions, extraServices])

  useEffect(() => { calculate() }, [calculate])

  const handleSend = async () => {
    if (!breakdown) return
    setSubmitState('loading')

    const gType = glassTypes.find(g => g.id === state.glassTypeId)
    const thick = thicknessOptions.find(t => t.id === state.thicknessId)

    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        glass_type: gType?.name,
        width_cm: parseFloat(state.widthCm),
        height_cm: parseFloat(state.heightCm),
        thickness_mm: thick?.mm,
        extras: state.extras,
        estimated_price: Math.round(breakdown.total),
      }),
    })

    setSubmitState(res.ok ? 'ok' : 'err')
    setTimeout(() => setSubmitState('idle'), 4000)
  }

  if (loading) {
    return (
      <div className="calc-wrap">
        <div className="calc-form">
          {[1, 2, 3, 4].map(i => (
            <div className="calc-field" key={i}>
              <div className="skeleton" style={{ height: '1rem', width: '40%', marginBottom: '0.6rem' }} />
              <div className="skeleton" style={{ height: '2.2rem', width: '100%' }} />
            </div>
          ))}
        </div>
        <div className="calc-result">
          <div>
            <div className="skeleton" style={{ height: '1rem', width: '60%', marginBottom: '1rem', opacity: 0.3 }} />
            <div className="skeleton" style={{ height: '5rem', width: '80%', opacity: 0.3 }} />
          </div>
        </div>
      </div>
    )
  }

  const glassTypeName = glassTypes.find(g => g.id === state.glassTypeId)?.name

  return (
    <div className="calc-wrap">
      {/* Лява колона — форма */}
      <div className="calc-form">
        <div className="calc-field">
          <label className="calc-label">Вид стъкло</label>
          <select
            value={state.glassTypeId ?? ''}
            onChange={e => setState(s => ({ ...s, glassTypeId: Number(e.target.value) || null }))}
          >
            <option value="">Изберете...</option>
            {glassTypes.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        <div className="calc-row">
          <div className="calc-field">
            <label className="calc-label">Ширина (см)</label>
            <input
              type="number"
              placeholder="100"
              min="1"
              value={state.widthCm}
              onChange={e => setState(s => ({ ...s, widthCm: e.target.value }))}
            />
          </div>
          <div className="calc-field">
            <label className="calc-label">Височина (см)</label>
            <input
              type="number"
              placeholder="200"
              min="1"
              value={state.heightCm}
              onChange={e => setState(s => ({ ...s, heightCm: e.target.value }))}
            />
          </div>
        </div>

        <div className="calc-field">
          <label className="calc-label">Дебелина</label>
          <select
            value={state.thicknessId ?? ''}
            onChange={e => setState(s => ({ ...s, thicknessId: Number(e.target.value) || null }))}
          >
            <option value="">Изберете...</option>
            {thicknessOptions.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="calc-field">
          <label className="calc-label">Допълнителни услуги</label>
          <div className="checkbox-group">
            {extraServices.map(svc => (
              <label
                key={svc.slug}
                className={`checkbox-item${state.extras[svc.slug] ? ' checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={!!state.extras[svc.slug]}
                  onChange={e =>
                    setState(s => ({
                      ...s,
                      extras: { ...s.extras, [svc.slug]: e.target.checked },
                    }))
                  }
                  style={{ display: 'none' }}
                />
                {svc.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Дясна колона — резултат */}
      <div className="calc-result">
        <div>
          <p className="result-eyebrow">Ориентировъчна цена</p>
          <div className="result-price">
            {breakdown ? (
              <>
                {Math.round(breakdown.total).toLocaleString('bg-BG')}
                <span className="currency">лв.</span>
              </>
            ) : '—'}
          </div>
          <p className="result-note">
            {breakdown
              ? `${breakdown.areaSqm.toFixed(2)} м² · само материал, без монтаж`
              : 'Попълнете данните вляво'}
          </p>

          {breakdown && (
            <div className="result-breakdown">
              <div className="breakdown-row">
                <span>{glassTypeName ?? 'Стъкло'}</span>
                <span className="val">{Math.round(breakdown.base)} лв.</span>
              </div>
              {breakdown.thickness > 0 && (
                <div className="breakdown-row">
                  <span>Дебелина</span>
                  <span className="val">+{Math.round(breakdown.thickness)} лв.</span>
                </div>
              )}
              {breakdown.extraLines.map(line => (
                <div className="breakdown-row" key={line.name}>
                  <span>{line.name}</span>
                  <span className="val">+{Math.round(line.amount)} лв.</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            className="calc-cta"
            onClick={handleSend}
            disabled={!breakdown || submitState === 'loading' || submitState === 'ok'}
          >
            {submitState === 'loading' && 'Изпращане...'}
            {submitState === 'ok' && '✓ Заявката е изпратена'}
            {submitState === 'err' && 'Грешка — опитайте пак'}
            {submitState === 'idle' && 'Искам оферта →'}
          </button>
        </div>
      </div>
    </div>
  )
}
