-- Migration 015: Add og_image field for Open Graph preview
-- This field allows custom image for social media link previews (WhatsApp, Facebook, Twitter, etc.)
-- Recommended size: 1200x630 pixels

ALTER TABLE wedding_settings 
ADD COLUMN IF NOT EXISTS og_image TEXT;

COMMENT ON COLUMN wedding_settings.og_image IS 'Custom Open Graph preview image for social media sharing (1200x630px recommended)';
