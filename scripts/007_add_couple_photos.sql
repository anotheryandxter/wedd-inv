-- Migration: Add groom_photo and bride_photo to wedding_settings

ALTER TABLE IF EXISTS wedding_settings
  ADD COLUMN IF NOT EXISTS groom_photo text,
  ADD COLUMN IF NOT EXISTS bride_photo text;

-- Optional: set existing rows to empty string or a default if desired
-- UPDATE wedding_settings SET groom_photo = '' WHERE groom_photo IS NULL;
-- UPDATE wedding_settings SET bride_photo = '' WHERE bride_photo IS NULL;
