-- =========================================================
-- ESQUEMA DE BASE DE DATOS SUPABASE // KYTECH
-- Ejecutar en: Supabase Dashboard -> SQL Editor -> New Query
-- =========================================================

-- 1. TABLA DE LEADS / CONSULTAS DE CONTACTO
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nombre TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT,
    empresa TEXT,
    servicio TEXT,
    mensaje TEXT,
    estado TEXT DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'contactado', 'en_proceso', 'cerrado', 'descartado'))
);

-- Habilitar Row Level Security (RLS) para proteger los datos
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Permitir que cualquier visitante de la web envíe el formulario de contacto
CREATE POLICY "Permitir inserción pública de leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Solo usuarios autenticados (tu usuario de Supabase) pueden ver las consultas
CREATE POLICY "Solo administradores pueden ver leads" 
ON public.leads 
FOR SELECT 
USING (auth.role() = 'authenticated');


-- 2. TABLA DE EQUIPOS / TIENDA DE HARDWARE CERTIFICADO
CREATE TABLE IF NOT EXISTS public.equipos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    modelo TEXT NOT NULL,
    categoria TEXT DEFAULT 'Estándar', -- 'Premium', 'Recomendado', 'Estándar'
    estado_general TEXT DEFAULT 'Excelente',
    bateria_pct INTEGER CHECK (bateria_pct BETWEEN 50 AND 100),
    condicion_estetica TEXT DEFAULT 'Sin marcas',
    face_id_ok BOOLEAN DEFAULT true,
    pantalla_original BOOLEAN DEFAULT true,
    icloud_libre BOOLEAN DEFAULT true,
    garantia_meses INTEGER DEFAULT 6,
    precio_usd NUMERIC(10, 2),
    imagen_url TEXT,
    disponible BOOLEAN DEFAULT true,
    orden INTEGER DEFAULT 0
);

-- Habilitar RLS en equipos
ALTER TABLE public.equipos ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública de equipos disponibles
CREATE POLICY "Lectura pública de equipos disponibles" 
ON public.equipos 
FOR SELECT 
USING (disponible = true);

-- Solo administradores pueden agregar, editar o borrar equipos
CREATE POLICY "Solo administradores pueden modificar equipos" 
ON public.equipos 
FOR ALL 
USING (auth.role() = 'authenticated');


-- 3. DATOS INICIALES DE EJEMPLO (iPhones verificados Kytech)
INSERT INTO public.equipos (modelo, categoria, estado_general, bateria_pct, condicion_estetica, garantia_meses, precio_usd, disponible, orden)
VALUES
    ('iPhone 13', 'Estándar', 'Excelente', 88, 'Sin marcas', 3, 580.00, true, 1),
    ('iPhone 14', 'Recomendado', 'Impecable', 93, 'Sin marcas', 6, 720.00, true, 2),
    ('iPhone 15', 'Premium', 'Como nuevo', 97, 'Categoría A', 6, 890.00, true, 3);
