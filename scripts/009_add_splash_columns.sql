-- 009_add_splash_columns.sql
-- Add columns for admin-configurable splash screen image and overlay opacity

BEGIN;

-- Add splash_image (text) if not exists
ALTER TABLE wedding_settings
  ADD COLUMN IF NOT EXISTS splash_image text;

-- Add splash_overlay_opacity (numeric) if not exists, default 0.8
ALTER TABLE wedding_settings
  ADD COLUMN IF NOT EXISTS splash_overlay_opacity numeric DEFAULT 0.8;

-- Add splash_overlay_mode and splash_overlay_color for overlay customization
ALTER TABLE wedding_settings
  ADD COLUMN IF NOT EXISTS splash_overlay_mode text DEFAULT 'light';

ALTER TABLE wedding_settings
  ADD COLUMN IF NOT EXISTS splash_overlay_color text;

-- Ensure existing rows have a sensible default value
UPDATE wedding_settings
  SET splash_overlay_opacity = 0.8
  WHERE splash_overlay_opacity IS NULL;

-- Ensure default overlay mode set where null
UPDATE wedding_settings
  SET splash_overlay_mode = 'light'
  WHERE splash_overlay_mode IS NULL;

COMMIT;
