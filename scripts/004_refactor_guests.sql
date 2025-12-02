-- Migration: Refactor guests table for blasting & unique codes
-- Adds columns required for WhatsApp blasting and guest tracking

ALTER TABLE IF EXISTS guests
  ADD COLUMN IF NOT EXISTS unique_code text;

ALTER TABLE IF EXISTS guests
  ADD COLUMN IF NOT EXISTS invited_at timestamptz;

ALTER TABLE IF EXISTS guests
  ADD COLUMN IF NOT EXISTS last_blasted_at timestamptz;

ALTER TABLE IF EXISTS guests
  ADD COLUMN IF NOT EXISTS blast_status text;

ALTER TABLE IF EXISTS guests
  ADD COLUMN IF NOT EXISTS opt_out boolean DEFAULT false;

ALTER TABLE IF EXISTS guests
  ADD COLUMN IF NOT EXISTS phone_normalized text;

-- Add index on phone_normalized for faster lookups
CREATE INDEX IF NOT EXISTS idx_guests_phone_normalized ON guests (phone_normalized);

-- Backfill simple unique_code for existing rows that lack it
UPDATE guests
SET unique_code = substring(md5(random()::text || clock_timestamp()::text), 1, 10)
WHERE unique_code IS NULL;

-- Note: run this migration in Supabase SQL editor or via supabase CLI
