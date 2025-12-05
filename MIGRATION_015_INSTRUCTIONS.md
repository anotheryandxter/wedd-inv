# Migration 015: Open Graph Preview Image

## Deskripsi
Menambahkan field `og_image` untuk mengatur gambar preview link yang muncul saat dibagikan di social media (WhatsApp, Facebook, Twitter, dll).

## Fitur Baru
- **Field baru**: `og_image` (TEXT, nullable)
- **Upload/URL**: Dapat diatur via upload file atau input URL
- **Ukuran optimal**: 1200×630 piksel
- **Fallback otomatis**: Jika tidak diatur, akan gunakan `splash_image` atau `hero_image`

## Cara Menjalankan Migration

### 1. Buka Supabase Dashboard
Login ke [Supabase Dashboard](https://supabase.com/dashboard)

### 2. Jalankan SQL Migration
1. Pilih project Anda
2. Klik **SQL Editor** di sidebar kiri
3. Klik tombol **New Query**
4. Copy-paste isi file `scripts/015_add_og_image.sql`
5. Klik **Run** atau tekan `Ctrl+Enter`

### 3. Verifikasi Migration
```sql
-- Cek kolom baru sudah ada
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'wedding_settings' 
AND column_name = 'og_image';
```

Expected result:
```
column_name | data_type | is_nullable
og_image    | text      | YES
```

### 4. Refresh Schema Cache
1. Pergi ke **Project Settings** → **Database**
2. Scroll ke bawah, klik tombol **Refresh schema cache**
3. Tunggu beberapa detik hingga selesai

## Cara Menggunakan Fitur

### Di Admin Panel
1. Login ke `/admin`
2. Buka tab **Assets**
3. Scroll ke bagian **Gambar Preview Link (Open Graph)**
4. Upload gambar atau masukkan URL
5. Klik **Simpan**

### Tips Penggunaan
- **Ukuran optimal**: 1200×630 piksel (rasio 1.91:1)
- **Format**: JPG, PNG, atau WebP
- **Ukuran file**: Maksimal 5MB untuk loading cepat
- **Konten**: Pastikan teks dalam gambar mudah dibaca dalam ukuran kecil

### Preview URL untuk Testing
Setelah set gambar, test preview di:
- **WhatsApp**: Share link ke chat
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/

### Prioritas Image Fallback
```typescript
og_image → splash_image → hero_image → null
```

## Troubleshooting

### Preview tidak berubah setelah update gambar
**Penyebab**: Cache social media platform (24-48 jam)

**Solusi**:
1. Gunakan debugger/validator tool (link di atas) untuk force refresh
2. Tambahkan query parameter: `?v=2` di URL
3. Tunggu 24-48 jam untuk cache expire otomatis

### Gambar terlalu kecil di preview
**Penyebab**: Ukuran gambar kurang dari 1200×630

**Solusi**: Upload gambar dengan resolusi minimal 1200×630 piksel

### Preview menampilkan gambar lama
**Penyebab**: Browser atau CDN cache

**Solusi**:
1. Clear browser cache (`Cmd+Shift+R` atau `Ctrl+Shift+R`)
2. Gunakan incognito/private mode
3. Tunggu beberapa menit untuk CDN propagation

## SQL Migration Code
```sql
-- Migration 015: Add og_image field for Open Graph preview
ALTER TABLE wedding_settings 
ADD COLUMN IF NOT EXISTS og_image TEXT;

COMMENT ON COLUMN wedding_settings.og_image IS 'Custom Open Graph preview image for social media sharing (1200x630px recommended)';
```

## Rollback (Jika Diperlukan)
```sql
-- Hapus kolom og_image
ALTER TABLE wedding_settings DROP COLUMN IF EXISTS og_image;
```

## Status
- ✅ Migration file created
- ✅ TypeScript types updated
- ✅ Admin UI implemented
- ✅ Metadata generation updated
- ⏳ **Pending**: Run migration in Supabase
- ⏳ **Pending**: Refresh schema cache

## Related Files
- `scripts/015_add_og_image.sql` - Migration SQL
- `lib/types.ts` - TypeScript interface (WeddingSettings)
- `components/admin/settings-panel.tsx` - Admin UI
- `app/layout.tsx` - Metadata generation

---

**Tanggal**: 5 Desember 2025  
**Versi**: 1.0.0  
**Deployment**: https://wedd-dj3chb5m6-reflectionartmediastudio-2450s-projects.vercel.app
