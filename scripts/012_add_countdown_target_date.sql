-- Add countdown_target_date column to wedding_settings table
-- This allows setting a specific countdown target time (GMT+7) different from wedding_date

ALTER TABLE wedding_settings
ADD COLUMN countdown_target_date TIMESTAMPTZ;

-- Note: This column is optional. If null, the countdown will use wedding_date instead.
