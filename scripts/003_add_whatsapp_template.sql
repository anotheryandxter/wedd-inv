-- Migration: Add whatsapp_template column to wedding_settings
-- Run this in Supabase SQL editor or with psql/supabase CLI

ALTER TABLE IF EXISTS wedding_settings
  ADD COLUMN IF NOT EXISTS whatsapp_template text;

-- Optional: you can set a default template for existing rows, e.g:
-- UPDATE wedding_settings SET whatsapp_template = 'Halo {name}, kami mengundang Anda...' WHERE whatsapp_template IS NULL;

-- Note: After running this migration, redeploy the app so code and schema match.
