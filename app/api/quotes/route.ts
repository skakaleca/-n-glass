import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = await createClient()

    const { error } = await supabase.from('quote_requests').insert([{
      name: body.name ?? null,
      phone: body.phone ?? null,
      email: body.email ?? null,
      glass_type: body.glass_type ?? null,
      width_cm: body.width_cm ?? null,
      height_cm: body.height_cm ?? null,
      thickness_mm: body.thickness_mm ?? null,
      extras: body.extras ?? null,
      estimated_price: body.estimated_price ?? null,
      notes: body.notes ?? null,
    }])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
