-- Migration 014: Add advanced background styling options
-- Adds opacity for main background pattern and comprehensive styling per section

-- Main background opacity
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS background_opacity INTEGER DEFAULT 100;

-- Countdown section styling
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS countdown_bg_mode TEXT DEFAULT 'image';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS countdown_bg_color TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS countdown_bg_blur INTEGER DEFAULT 0;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS countdown_overlay_color TEXT;

-- Event section styling
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS event_bg_mode TEXT DEFAULT 'image';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS event_bg_color TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS event_bg_blur INTEGER DEFAULT 0;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS event_overlay_color TEXT;

-- Gallery section styling
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS gallery_bg_mode TEXT DEFAULT 'image';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS gallery_bg_color TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS gallery_bg_blur INTEGER DEFAULT 0;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS gallery_overlay_color TEXT;

-- RSVP section styling
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS rsvp_bg_mode TEXT DEFAULT 'image';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS rsvp_bg_color TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS rsvp_bg_blur INTEGER DEFAULT 0;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS rsvp_overlay_color TEXT;

-- Comments section styling
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS comments_bg_mode TEXT DEFAULT 'image';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS comments_bg_color TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS comments_bg_blur INTEGER DEFAULT 0;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS comments_overlay_color TEXT;

-- Note: 
-- bg_mode: 'image' for uploaded asset, 'solid' for solid color
-- bg_color: hex color value for solid mode (e.g. '#f0f0f0')
-- bg_blur: blur radius 0-20px (optional)
-- overlay_color: hex color for overlay with opacity from existing bg_overlay column
