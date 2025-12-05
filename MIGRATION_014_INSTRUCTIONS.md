# Migration 014 - Advanced Background Styling

## Overview
Menambahkan kontrol styling background yang lebih lengkap untuk setiap section dan main background pattern.

## New Features

### 1. Main Background Pattern Opacity (Assets Tab)
- **Field baru**: `background_opacity` (0-100)
- Kontrol opacity untuk background pattern utama yang digunakan di seluruh halaman
- Default: 100 (fully opaque)

### 2. Advanced Section Background Styling (Styling Tab)

Setiap section (Countdown, Event, Gallery, RSVP, Comments) sekarang memiliki kontrol lengkap:

#### Background Mode
- **Image Upload**: Upload gambar sebagai background
- **Solid Color**: Gunakan warna solid dengan color picker

#### Styling Options
1. **Background Color** (jika mode = solid)
   - Color picker untuk pilih warna
   - Input hex code manual

2. **Background Image URL** (jika mode = image)
   - URL gambar untuk background
   - Fallback ke background pattern utama

3. **Overlay Opacity** (0-100)
   - Kontrol transparansi overlay
   - 0 = transparan penuh, 100 = gelap penuh

4. **Overlay Color**
   - Color picker untuk warna overlay
   - Input hex code manual
   - Default: #000000 (hitam)

5. **Blur Radius** (0-20px)
   - Efek blur pada background
   - 0 = tidak ada blur, 20 = blur maksimal
   - Opsional untuk efek artistic

## Database Schema

Migration menambahkan 21 kolom baru:

```sql
-- Main background
background_opacity INTEGER DEFAULT 100

-- Per section (5 sections × 4 fields = 20 columns)
{section}_bg_mode TEXT DEFAULT 'image'
{section}_bg_color TEXT
{section}_bg_blur INTEGER DEFAULT 0
{section}_overlay_color TEXT
```

Sections: countdown, event, gallery, rsvp, comments

## How to Use

### Admin Panel - Assets Tab
1. Upload/set background pattern
2. Atur opacity dengan slider 0-100
3. Save settings

### Admin Panel - Styling Tab
Untuk setiap section:

1. **Pilih Mode**:
   - "Image Upload" untuk background gambar
   - "Solid Color" untuk warna solid

2. **Set Background**:
   - Mode Image: Masukkan URL gambar
   - Mode Solid: Pilih warna dengan color picker

3. **Atur Overlay**:
   - Opacity: 0-100 (transparansi)
   - Color: Pilih warna overlay (default hitam)

4. **Optional - Blur**:
   - 0-20px untuk efek blur artistic

5. Save settings

## Example Configurations

### 1. Classic Image with Dark Overlay
```
Mode: Image Upload
Background Image: https://example.com/photo.jpg
Overlay Opacity: 80
Overlay Color: #000000
Blur: 0
```

### 2. Solid Color with Light Overlay
```
Mode: Solid Color
Background Color: #f5f0e8 (cream)
Overlay Opacity: 20
Overlay Color: #d4af37 (gold)
Blur: 0
```

### 3. Blurred Image with Colored Overlay
```
Mode: Image Upload
Background Image: https://example.com/pattern.jpg
Overlay Opacity: 50
Overlay Color: #c9a962 (gold)
Blur: 10
```

## Migration Instructions

1. **Run SQL Migration**:
   - Copy content dari `scripts/014_add_background_styling_options.sql`
   - Execute di Supabase SQL Editor

2. **Refresh Schema Cache**:
   - Supabase Dashboard → Project Settings → Database
   - Click "Refresh schema cache"

3. **Test**:
   - Login ke admin panel
   - Buka tab "Assets" → test background opacity
   - Buka tab "Styling" → test section styling
   - View public site → verify changes

## Notes

- Semua field opsional dengan defaults yang sensible
- Blur optimal: 5-10px untuk subtle effect
- Overlay opacity 60-80 biasanya cocok untuk readability
- Solid color mode bagus untuk minimalist design
- Image mode + blur creates artistic bokeh effect

## Compatibility

- Backward compatible - existing settings tetap berfungsi
- Default values ensure no breaking changes
- Migration uses `ADD COLUMN IF NOT EXISTS` (safe to re-run)
