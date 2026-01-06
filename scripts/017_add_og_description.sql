-- Migration 017: Add og_description for Open Graph / share preview description

ALTER TABLE wedding_settings
  ADD COLUMN IF NOT EXISTS og_description TEXT;

COMMENT ON COLUMN wedding_settings.og_description IS 'Custom description used for link previews and meta description for social sharing (WhatsApp/Facebook/Twitter)';
