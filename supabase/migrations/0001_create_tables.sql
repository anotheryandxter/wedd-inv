-- Migration: create initial tables for wedding invitation app

-- Contents copied from scripts/001_create_tables.sql

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Wedding Settings
CREATE TABLE IF NOT EXISTS wedding_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  groom_name TEXT NOT NULL DEFAULT 'Nama Mempelai Pria',
  bride_name TEXT NOT NULL DEFAULT 'Nama Mempelai Wanita',
  groom_father TEXT DEFAULT 'Nama Ayah Mempelai Pria',
  groom_mother TEXT DEFAULT 'Nama Ibu Mempelai Pria',
  bride_father TEXT DEFAULT 'Nama Ayah Mempelai Wanita',
  bride_mother TEXT DEFAULT 'Nama Ibu Mempelai Wanita',
  wedding_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  akad_time TEXT DEFAULT '08:00',
  akad_location TEXT DEFAULT 'Masjid Al-Ikhlas',
  akad_address TEXT DEFAULT 'Jl. Contoh No. 123, Jakarta',
  reception_time TEXT DEFAULT '11:00',
  reception_location TEXT DEFAULT 'Gedung Serbaguna',
  reception_address TEXT DEFAULT 'Jl. Contoh No. 456, Jakarta',
  venue_map_url TEXT DEFAULT '',
  venue_lat DECIMAL(10, 8) DEFAULT -6.2088,
  venue_lng DECIMAL(11, 8) DEFAULT 106.8456,
  love_story TEXT DEFAULT 'Cerita cinta kami dimulai...',
  quote TEXT DEFAULT 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...',
  quote_source TEXT DEFAULT 'QS. Ar-Rum: 21',
  hero_image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guests
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  guest_count INTEGER DEFAULT 1,
  attendance_status TEXT DEFAULT 'pending' CHECK (attendance_status IN ('pending', 'attending', 'not_attending')),
  message TEXT,
  unique_slug TEXT UNIQUE,
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE IF EXISTS wedding_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS admin_users ENABLE ROW LEVEL SECURITY;

-- Policies (basic/public + admin checks)
DROP POLICY IF EXISTS allow_public_read_wedding_settings ON wedding_settings;
CREATE POLICY allow_public_read_wedding_settings ON wedding_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS allow_admin_update_wedding_settings ON wedding_settings;
CREATE POLICY allow_admin_update_wedding_settings ON wedding_settings FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS allow_admin_insert_wedding_settings ON wedding_settings;
CREATE POLICY allow_admin_insert_wedding_settings ON wedding_settings FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS allow_public_read_guests ON guests;
CREATE POLICY allow_public_read_guests ON guests FOR SELECT USING (true);

DROP POLICY IF EXISTS allow_public_update_guest_rsvp ON guests;
CREATE POLICY allow_public_update_guest_rsvp ON guests FOR UPDATE USING (true);

DROP POLICY IF EXISTS allow_admin_all_guests ON guests;
CREATE POLICY allow_admin_all_guests ON guests FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS allow_public_read_gallery ON gallery;
CREATE POLICY allow_public_read_gallery ON gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS allow_admin_all_gallery ON gallery;
CREATE POLICY allow_admin_all_gallery ON gallery FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS allow_public_read_approved_comments ON comments;
CREATE POLICY allow_public_read_approved_comments ON comments FOR SELECT USING (is_approved = true);

DROP POLICY IF EXISTS allow_public_insert_comments ON comments;
CREATE POLICY allow_public_insert_comments ON comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS allow_admin_all_comments ON comments;
CREATE POLICY allow_admin_all_comments ON comments FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS allow_admin_read_admin_users ON admin_users;
CREATE POLICY allow_admin_read_admin_users ON admin_users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS allow_admin_insert_admin_users ON admin_users;
CREATE POLICY allow_admin_insert_admin_users ON admin_users FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger function to create admin user on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.admin_users (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin();

-- Insert default wedding settings row if none
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM wedding_settings) THEN
    INSERT INTO wedding_settings (id) VALUES (gen_random_uuid());
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    PERFORM pg_create_logical_replication_slot('supabase_realtime_slot', 'pgoutput');
    CREATE PUBLICATION supabase_realtime;
  END IF;
  BEGIN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE comments';
  EXCEPTION WHEN duplicate_object THEN
    -- already added, ignore
  END;
END$$;
