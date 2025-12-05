-- Add customizable section titles, backgrounds, closing message, and footer content
-- Migration 013: Comprehensive section customization

-- Section Titles
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS section_title_bismillah TEXT DEFAULT 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS section_title_couple TEXT DEFAULT 'The Happy Couple';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS section_title_countdown TEXT DEFAULT 'Save The Date';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS section_title_event TEXT DEFAULT 'Wedding Event';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS section_title_gallery TEXT DEFAULT 'Our Gallery';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS section_title_rsvp TEXT DEFAULT 'RSVP';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS section_title_comments TEXT DEFAULT 'Wishes & Prayers';

-- Section Background Images
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS countdown_bg_image TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS event_bg_image TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS gallery_bg_image TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS rsvp_bg_image TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS comments_bg_image TEXT;

-- Section Background Overlays (0-100)
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS countdown_bg_overlay INTEGER DEFAULT 80;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS event_bg_overlay INTEGER DEFAULT 80;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS gallery_bg_overlay INTEGER DEFAULT 80;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS rsvp_bg_overlay INTEGER DEFAULT 80;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS comments_bg_overlay INTEGER DEFAULT 80;

-- Closing Message
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS closing_message TEXT DEFAULT 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami. Terima kasih.';

-- Footer Content
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS footer_copyright TEXT DEFAULT '© 2025 Wedding Invitation';
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS footer_social_instagram TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS footer_social_facebook TEXT;
ALTER TABLE wedding_settings ADD COLUMN IF NOT EXISTS footer_social_twitter TEXT;

-- Note: All columns are nullable or have defaults to allow gradual adoption
