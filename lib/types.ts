export interface GlassType {
  id: number
  slug: string
  name: string
  base_price_per_m2: number
  sort_order: number
}

export interface ThicknessOption {
  id: number
  mm: number
  label: string
  surcharge_per_m2: number
  sort_order: number
}

export interface ExtraService {
  id: number
  slug: string
  name: string
  price_per_m2: number | null
  fixed_price: number | null
  sort_order: number
}

export interface QuoteRequest {
  id: string
  created_at: string
  name: string | null
  phone: string | null
  email: string | null
  glass_type: string | null
  width_cm: number | null
  height_cm: number | null
  thickness_mm: number | null
  extras: Record<string, boolean> | null
  estimated_price: number | null
  notes: string | null
  status: 'new' | 'seen' | 'done'
}
