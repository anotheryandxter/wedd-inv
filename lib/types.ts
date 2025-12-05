export interface WeddingSettings {
  id: string
  groom_name: string
  bride_name: string
  groom_father: string
  groom_mother: string
  bride_father: string
  bride_mother: string
  wedding_date: string
  countdown_target_date?: string // Target date for countdown (GMT+7)
  akad_time: string
  akad_time_end: string
  akad_location: string
  akad_address: string
  reception_time: string
  reception_time_end: string
  reception_location: string
  reception_address: string
  venue_map_url: string
  venue_lat: number
  venue_lng: number
  love_story: string
  quote: string
  quote_source: string
  hero_image: string
  music_url?: string
  groom_photo?: string
  bride_photo?: string
  background_image?: string
  splash_image?: string
  splash_overlay_opacity?: number
  // Overlay mode: 'light' uses the soft cream gradient, 'dark' uses a darker overlay,
  // 'custom' uses `splash_overlay_color` as the overlay color.
  splash_overlay_mode?: 'light' | 'dark' | 'custom'
  // When mode is 'custom', this hex value (e.g. '#000000') will be used as overlay color
  splash_overlay_color?: string
  whatsapp_template?: string
  site_name?: string
  favicon?: string
  
  // Customizable section titles
  section_title_bismillah?: string
  section_title_couple?: string
  section_title_countdown?: string
  section_title_event?: string
  section_title_gallery?: string
  section_title_rsvp?: string
  section_title_comments?: string
  
  // Section backgrounds
  countdown_bg_image?: string
  countdown_bg_overlay?: number // 0-100
  event_bg_image?: string
  event_bg_overlay?: number
  gallery_bg_image?: string
  gallery_bg_overlay?: number
  rsvp_bg_image?: string
  rsvp_bg_overlay?: number
  comments_bg_image?: string
  comments_bg_overlay?: number
  
  // Closing message
  closing_message?: string
  
  // Footer content
  footer_copyright?: string
  footer_social_instagram?: string
  footer_social_facebook?: string
  footer_social_twitter?: string
  
  created_at: string
  updated_at: string
}

export interface Guest {
  id: string
  name: string
  phone: string | null
  address: string | null
  guest_count: number
  attendance_status: "pending" | "attending" | "not_attending"
  message: string | null
  unique_slug: string | null
  is_sent: boolean
  created_at: string
  updated_at: string
}

export interface GalleryItem {
  id: string
  image_url: string
  caption: string | null
  sort_order: number
  created_at: string
}

export interface Comment {
  id: string
  guest_name: string
  message: string
  is_approved: boolean
  created_at: string
}
