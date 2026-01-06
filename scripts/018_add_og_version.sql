-- Migration 018: Add OG version for cache busting
-- This allows forcing social media platforms to refetch OG previews

ALTER TABLE wedding_settings 
ADD COLUMN IF NOT EXISTS og_version INTEGER DEFAULT 1 NOT NULL;

-- Add a comment to explain the field
COMMENT ON COLUMN wedding_settings.og_version IS 'Version number for OG image cache busting. Increment to force social platforms to refetch preview.';

-- Initialize to 1 for existing rows
UPDATE wedding_settings SET og_version = 1 WHERE og_version IS NULL;
