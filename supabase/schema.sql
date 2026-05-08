-- O&N Glass — Supabase schema
-- Изпълни в SQL Editor на твоя Supabase проект

-- ============================================
-- ТАБЛИЦИ
-- ============================================

CREATE TABLE glass_types (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  base_price_per_m2 DECIMAL(10,2) NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE thickness_options (
  id SERIAL PRIMARY KEY,
  mm INT NOT NULL,
  label TEXT NOT NULL,
  surcharge_per_m2 DECIMAL(10,2) NOT NULL DEFAULT 0,
  sort_order INT DEFAULT 0
);

CREATE TABLE extra_services (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price_per_m2 DECIMAL(10,2),
  fixed_price DECIMAL(10,2),
  sort_order INT DEFAULT 0
);

CREATE TABLE quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  phone TEXT,
  email TEXT,
  glass_type TEXT,
  width_cm DECIMAL,
  height_cm DECIMAL,
  thickness_mm INT,
  extras JSONB,
  estimated_price DECIMAL(10,2),
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'seen', 'done'))
);

-- ============================================
-- RLS ПОЛИТИКИ
-- ============================================

ALTER TABLE glass_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE thickness_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE extra_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Ценови таблици: всеки може да чете
CREATE POLICY "public_read_glass_types" ON glass_types FOR SELECT USING (true);
CREATE POLICY "public_read_thickness" ON thickness_options FOR SELECT USING (true);
CREATE POLICY "public_read_extras" ON extra_services FOR SELECT USING (true);

-- Ценови таблици: само логнат потребител може да редактира
CREATE POLICY "admin_all_glass_types" ON glass_types
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_thickness" ON thickness_options
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_extras" ON extra_services
  FOR ALL USING (auth.role() = 'authenticated');

-- Заявки: всеки може да добавя, само admin вижда
CREATE POLICY "public_insert_quotes" ON quote_requests
  FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_read_quotes" ON quote_requests
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "admin_update_quotes" ON quote_requests
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- НАЧАЛНИ ЦЕНИ (seed data)
-- ============================================

INSERT INTO glass_types (slug, name, base_price_per_m2, sort_order) VALUES
  ('shower',    'Душ кабини',       85.00, 1),
  ('mirror',    'Огледала',         70.00, 2),
  ('partition', 'Паравани',         75.00, 3),
  ('aquarium',  'Аквариуми',       110.00, 4),
  ('custom',    'Стъкло по размер', 60.00, 5);

INSERT INTO thickness_options (mm, label, surcharge_per_m2, sort_order) VALUES
  (4,  '4 мм',  0.00, 1),
  (6,  '6 мм', 12.00, 2),
  (8,  '8 мм', 25.00, 3),
  (10, '10 мм',40.00, 4);

INSERT INTO extra_services (slug, name, price_per_m2, fixed_price, sort_order) VALUES
  ('polishing',    'Полиране на ръбове',  8.00,  NULL,  1),
  ('drilling',     'Пробиване',           NULL,  15.00, 2),
  ('tempering',    'Калено стъкло',       30.00, NULL,  3),
  ('installation', 'Монтаж',             25.00, NULL,  4);
