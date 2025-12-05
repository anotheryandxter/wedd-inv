# Fitur Add to Calendar

## Deskripsi
Tombol "Simpan ke Kalender" pada bagian Save the Date/Countdown memungkinkan tamu mengunduh event pernikahan ke kalender perangkat mereka.

## Fitur
- **3 Platform Kalender**: Google Calendar, Apple Calendar (iCal/ICS), Outlook
- **Auto-detect Platform**: Deteksi otomatis perangkat iOS/Android/Mac/Windows
- **Detail Lengkap**: 
  - Judul event: "Pernikahan [Nama Pengantin]"
  - Waktu akad & resepsi
  - Lokasi dengan alamat lengkap
  - Link undangan
  - Reminder otomatis (24 jam sebelum event)

## Cara Menggunakan
Tamu tinggal:
1. Klik tombol **"Simpan ke Kalender"** di bagian countdown
2. Pilih platform kalender (Google/Apple/Outlook)
3. Event otomatis tersimpan dengan semua detail

## File Baru
- `lib/calendar-utils.ts` - Utility functions untuk generate calendar links & ICS file

## File yang Diupdate
- `components/invitation/countdown-section.tsx` - Tambah UI tombol & dropdown menu
- `components/wedding-invitation.tsx` - Pass event details ke countdown section

## Format ICS (Apple Calendar)
File `.ics` yang di-generate support:
- Apple Calendar (iOS/macOS)
- Outlook Desktop
- Thunderbird
- Google Calendar (import manual)

## Format URL
- **Google**: `https://calendar.google.com/calendar/render?action=TEMPLATE&...`
- **Outlook**: `https://outlook.live.com/calendar/0/deeplink/compose?...`

## Testing
Test di berbagai perangkat untuk memastikan kompatibilitas:
- ✅ iOS Safari → Apple Calendar
- ✅ Android Chrome → Google Calendar
- ✅ Desktop → Pilih kalender favorit

---

**Deployed**: 5 Desember 2025  
**URL**: https://wedd-2gc9ddh0t-reflectionartmediastudio-2450s-projects.vercel.app
