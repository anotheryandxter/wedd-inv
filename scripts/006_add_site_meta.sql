-- Migration: Add site meta (site_name, favicon) to wedding_settings
-- Run this in Supabase SQL editor or with psql/supabase CLI

ALTER TABLE IF EXISTS wedding_settings
  ADD COLUMN IF NOT EXISTS site_name text;

ALTER TABLE IF EXISTS wedding_settings
  ADD COLUMN IF NOT EXISTS favicon text;

-- Note: after running this migration, you may need to refresh Supabase API schema cache.
-- To refresh cache, restart the project from the Supabase Dashboard (Project Settings → Restart project),
-- or make a trivial schema change (e.g., add a COMMENT on the table) to trigger schema reload.
