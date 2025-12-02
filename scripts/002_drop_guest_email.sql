-- Migration: Drop email column from guests table
-- Run this in Supabase SQL editor or with psql/supabase CLI

ALTER TABLE IF EXISTS guests
  DROP COLUMN IF EXISTS email;

-- Optional: remove any index related to guests.email if exists
-- DROP INDEX IF EXISTS idx_guests_email;

-- Note: If you have any RLS policies referencing email, update or remove them.
