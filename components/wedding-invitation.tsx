"use client"

import { useState } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { HeroSection } from "@/components/invitation/hero-section"
import { QuoteSection } from "@/components/invitation/quote-section"
import { CoupleSection } from "@/components/invitation/couple-section"
import { CountdownSection } from "@/components/invitation/countdown-section"
import { EventSection } from "@/components/invitation/event-section"
import { GallerySection } from "@/components/invitation/gallery-section"
import { RSVPSection } from "@/components/invitation/rsvp-section"
import { CommentsSection } from "@/components/invitation/comments-section"
import { FooterSection } from "@/components/invitation/footer-section"
import { MusicPlayer } from "@/components/invitation/music-player"
import type { WeddingSettings, GalleryItem, Comment, Guest } from "@/lib/types"

interface WeddingInvitationProps {
  settings: WeddingSettings
  gallery: GalleryItem[]
  comments: Comment[]
  guest: Guest | null
}

export function WeddingInvitation({ settings, gallery, comments, guest }: WeddingInvitationProps) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <main
      className="min-h-screen bg-background select-none"
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        // allow interaction with inputs and buttons — only block text selection
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
        if (tag === 'input' || tag === 'textarea' || tag === 'button' || (e.target as HTMLElement)?.closest?.('.editor')) return
        e.preventDefault()
      }}
    >
      <SplashScreen
        groomName={settings.groom_name}
        brideName={settings.bride_name}
        guestName={guest?.name}
        onOpen={() => setIsOpened(true)}
        splashImage={settings.splash_image}
        overlayOpacity={settings.splash_overlay_opacity}
        overlayMode={settings.splash_overlay_mode}
        overlayColor={settings.splash_overlay_color}
      />

      {isOpened && (
        <>
          <MusicPlayer musicUrl={settings.music_url} />
          <HeroSection settings={settings} />
          <QuoteSection settings={settings} />
          <CoupleSection settings={settings} />
          <CountdownSection 
            countdownDate={settings.countdown_target_date || settings.wedding_date} 
            backgroundImage={settings.countdown_bg_image || settings.background_image || undefined}
            sectionTitle={settings.section_title_countdown || undefined}
            overlayOpacity={settings.countdown_bg_overlay ?? undefined}
            bgMode={settings.countdown_bg_mode || undefined}
            bgColor={settings.countdown_bg_color || undefined}
            bgBlur={settings.countdown_bg_blur ?? undefined}
            overlayColor={settings.countdown_overlay_color || undefined}
            groomName={settings.groom_name}
            brideName={settings.bride_name}
            akadTime={settings.akad_time}
            akadTimeEnd={settings.akad_time_end}
            akadLocation={settings.akad_location}
            akadAddress={settings.akad_address}
            receptionTime={settings.reception_time}
            receptionTimeEnd={settings.reception_time_end}
            receptionLocation={settings.reception_location}
            receptionAddress={settings.reception_address}
            venueMapUrl={settings.venue_map_url}
          />
          <EventSection settings={settings} />
          <GallerySection 
            images={gallery} 
            sectionTitle={settings.section_title_gallery || undefined}
          />
          <RSVPSection 
            guest={guest}
            sectionTitle={settings.section_title_rsvp || undefined}
            backgroundImage={settings.rsvp_bg_image || undefined}
            bgMode={settings.rsvp_bg_mode || undefined}
            bgColor={settings.rsvp_bg_color || undefined}
            bgBlur={settings.rsvp_bg_blur ?? undefined}
            overlayOpacity={settings.rsvp_bg_overlay ?? undefined}
            overlayColor={settings.rsvp_overlay_color || undefined}
          />
          <CommentsSection 
            initialComments={comments} 
            guest={guest}
            sectionTitle={settings.section_title_comments || undefined}
          />
          <FooterSection settings={settings} />
        </>
      )}
    </main>
  )
}
