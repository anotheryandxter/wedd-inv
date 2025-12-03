-- Delete all existing gallery items (clean slate before new compression settings)
-- Run this migration to remove all current gallery images
DELETE FROM gallery;

-- Optional: Reset auto-increment counter (if using serial/auto-increment IDs)
-- ALTER SEQUENCE gallery_id_seq RESTART WITH 1;

-- Note: This will permanently delete all gallery photos.
-- Make sure to backup if needed before running this script.
