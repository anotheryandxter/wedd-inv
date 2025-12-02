-- Wedding Invitation Database Schema
-- Tables for wedding settings, guests, gallery, and comments

-- 1. Wedding Settings Table (stores all configurable wedding information)
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

-- 2. Guests Table (for guest management and RSVP)
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

-- 3. Gallery Table (for wedding photos)
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Comments Table (for guest wishes/comments)
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Admin Users Table (for dashboard access)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE wedding_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for wedding_settings
CREATE POLICY "Allow public read wedding_settings" ON wedding_settings FOR SELECT USING (true);
CREATE POLICY "Allow admin update wedding_settings" ON wedding_settings FOR UPDATE USING (auth.uid() IN (SELECT id FROM admin_users));
CREATE POLICY "Allow admin insert wedding_settings" ON wedding_settings FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- RLS Policies for guests
CREATE POLICY "Allow public read guests by slug" ON guests FOR SELECT USING (true);
CREATE POLICY "Allow public update guest RSVP" ON guests FOR UPDATE USING (true);
CREATE POLICY "Allow admin all guests" ON guests FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- RLS Policies for gallery  
CREATE POLICY "Allow public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow admin all gallery" ON gallery FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- RLS Policies for comments
CREATE POLICY "Allow public read approved comments" ON comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Allow public insert comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin all comments" ON comments FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- RLS Policies for admin_users
CREATE POLICY "Allow admin read admin_users" ON admin_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow admin insert admin_users" ON admin_users FOR INSERT WITH CHECK (auth.uid() = id);

-- Create trigger for auto-create admin on signup
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_users (id, email, name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'name', new.email)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin();

-- Insert default wedding settings
INSERT INTO wedding_settings (id) VALUES (gen_random_uuid());

-- Enable realtime for comments
ALTER PUBLICATION supabase_realtime ADD TABLE comments;
