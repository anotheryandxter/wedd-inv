# Migration Instructions - Section Customization Feature

## Database Migrations Required

You need to run two SQL migrations in your Supabase SQL Editor:

### Step 1: Run Migration 012 (Countdown Target Date)

Open `scripts/012_add_countdown_target_date.sql` and execute in Supabase SQL Editor:

```sql
ALTER TABLE wedding_settings ADD COLUMN countdown_target_date TIMESTAMPTZ;
-- Note: This column is optional. If null, the countdown will use wedding_date instead.
```

### Step 2: Run Migration 013 (Section Customization)

Open `scripts/013_add_section_customization.sql` and execute all its content in Supabase SQL Editor. This adds:

- **7 section title columns**: bismillah, couple, countdown, event, gallery, rsvp, comments
- **10 background columns**: bg_image and bg_overlay for 5 sections (countdown, event, gallery, rsvp, comments)
- **1 closing message column**: customizable footer closing text
- **4 footer columns**: copyright, instagram, facebook, twitter links

### Step 3: Refresh Schema Cache

After running both migrations:
1. Go to Supabase Dashboard
2. Navigate to **Project Settings** → **Database**
3. Click **"Refresh schema cache"** button
4. Wait for confirmation

## New Features Available

### Admin Panel - Tabbed Interface

The settings panel now has 6 organized tabs:

1. **Informasi (Basic)** - Couple names, parents info
2. **Acara (Event)** - Wedding date, times, locations, maps
3. **Judul (Sections)** - Customize all section titles + closing message
4. **Styling** - Background images and overlay opacity for each section
5. **Footer** - Copyright text and social media links
6. **Assets** - Images, music, quote uploads

### Customizable Fields

**Section Titles:**
- Bismillah/Quote section title
- Couple section title  
- Countdown section title
- Event section title
- Gallery section title
- RSVP section title
- Comments section title

**Section Backgrounds:**
- Each section (countdown, event, gallery, rsvp, comments) has:
  - Background image URL field
  - Overlay opacity slider (0-100)

**Footer:**
- Custom copyright text
- Instagram, Facebook, Twitter links with icons

**Closing Message:**
- Customizable farewell text displayed in footer

## Testing

After migrations:

1. **Test Admin Panel:**
   - Navigate to `/admin`
   - Try each tab
   - Save settings in each tab
   - Verify no errors

2. **Test Public Site:**
   - Visit main invitation page
   - Check all section titles display custom values
   - Verify backgrounds and overlays apply correctly
   - Check footer shows custom copyright and social links
   - Confirm closing message appears

3. **Test Defaults:**
   - All fields are optional with sensible defaults
   - If not customized, original Indonesian/English text appears

## File Changes Summary

**Database:**
- `scripts/012_add_countdown_target_date.sql` - NEW
- `scripts/013_add_section_customization.sql` - NEW

**Types:**
- `lib/types.ts` - Extended WeddingSettings interface

**Admin Components:**
- `components/admin/settings-panel.tsx` - Refactored with tabs
- `components/admin/sections-settings-tab.tsx` - NEW
- `components/admin/styling-settings-tab.tsx` - NEW  
- `components/admin/footer-settings-tab.tsx` - NEW

**Invitation Components:**
- `components/invitation/quote-section.tsx` - Uses section_title_bismillah
- `components/invitation/couple-section.tsx` - Uses section_title_couple
- `components/invitation/countdown-section.tsx` - Uses title + bg + overlay
- `components/invitation/event-section.tsx` - Uses section_title_event
- `components/invitation/gallery-section.tsx` - Uses section_title_gallery
- `components/invitation/rsvp-section.tsx` - Uses section_title_rsvp
- `components/invitation/comments-section.tsx` - Uses section_title_comments
- `components/invitation/footer-section.tsx` - Uses footer fields + closing_message
- `components/wedding-invitation.tsx` - Passes new props to sections

## Deployment

```bash
# Build to check for errors
pnpm build

# If successful, commit changes
git add -A
git commit -m "feat: comprehensive section customization with tabbed admin UI"
git push origin main

# Deploy (if using Vercel)
npx vercel --prod
```

## Rollback Plan

If issues occur:
- Original settings-panel is backed up at `components/admin/settings-panel-backup.tsx`
- Migrations use `ADD COLUMN IF NOT EXISTS` so they're safe to re-run
- All new fields are optional, won't break existing data
