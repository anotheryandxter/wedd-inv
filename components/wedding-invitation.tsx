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
import { NoGiftNotice } from "@/components/invitation/no-gift-notice"
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
          <NoGiftNotice />
          <HeroSection settings={settings} />
          <QuoteSection settings={settings} />
          <CoupleSection settings={settings} />
          <CountdownSection weddingDate={settings.wedding_date} backgroundImage={settings.background_image || undefined} />
          <EventSection settings={settings} />
          <GallerySection images={gallery} />
          <RSVPSection guest={guest} />
          <CommentsSection initialComments={comments} guest={guest} />
          <FooterSection settings={settings} />
        </>
      )}
    </main>
  )
}
