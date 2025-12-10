-- Migration: Add hint_box_text column to wedding_settings table
-- This allows customizing the text displayed in the floating hint box

ALTER TABLE wedding_settings 
ADD COLUMN hint_box_text TEXT;

COMMENT ON COLUMN wedding_settings.hint_box_text IS 'Custom text for the floating hint box (gift notice)';

-- Set default value for existing rows (optional)
UPDATE wedding_settings 
SET hint_box_text = 'Dengan segala kerendahan hati, kami tidak menerima kado saat acara. Terimakasih ❤️'
WHERE hint_box_text IS NULL;
