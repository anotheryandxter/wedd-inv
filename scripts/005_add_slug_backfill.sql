-- Migration: Ensure `slug` column exists on guests and backfill values
-- Run this in Supabase SQL editor or with psql/supabase CLI

ALTER TABLE IF EXISTS guests
  ADD COLUMN IF NOT EXISTS slug text;

-- Backfill slug from name + unique_code/id when missing
UPDATE guests
SET slug = lower(regexp_replace(coalesce(name, ''), '[^a-z0-9]+', '-', 'g')) || '-' ||
           coalesce(substring(unique_code, 1, 6), substring(md5(id::text), 1, 6))
WHERE slug IS NULL OR slug = '';

-- Optionally make slug indexed/unique if desired (commented out):
-- CREATE UNIQUE INDEX IF NOT EXISTS idx_guests_slug_unique ON guests (slug);

-- Note: after running this migration, you may need to refresh Supabase API schema cache.
-- To refresh cache, restart the project from the Supabase Dashboard (Project Settings → Restart project),
-- or make a trivial schema change (e.g., add a COMMENT on the table) to trigger schema reload.
