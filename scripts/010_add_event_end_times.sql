-- Add end time columns for akad and reception events
ALTER TABLE wedding_settings
ADD COLUMN IF NOT EXISTS akad_time_end TEXT,
ADD COLUMN IF NOT EXISTS reception_time_end TEXT;

-- Set default values for existing rows (optional, adjust times as needed)
UPDATE wedding_settings
SET akad_time_end = 'Selesai',
    reception_time_end = 'Selesai'
WHERE akad_time_end IS NULL OR reception_time_end IS NULL;
