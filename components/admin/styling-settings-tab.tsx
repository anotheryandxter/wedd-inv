"use client"

import type React from "react"
import type { WeddingSettings } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StylingSettingsTabProps {
  settings: WeddingSettings | null
  formData: Partial<WeddingSettings>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function StylingSettingsTab({ settings, formData, handleChange }: StylingSettingsTabProps) {
  return (
    <div className="space-y-6">
      {/* Countdown Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Countdown Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="countdown_bg_image">Background Image URL</Label>
            <Input
              id="countdown_bg_image"
              name="countdown_bg_image"
              value={formData.countdown_bg_image || ""}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="countdown_bg_overlay">Overlay Opacity (0-100)</Label>
            <Input
              id="countdown_bg_overlay"
              name="countdown_bg_overlay"
              type="number"
              min="0"
              max="100"
              value={formData.countdown_bg_overlay ?? ""}
              onChange={handleChange}
              placeholder="80"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>

      {/* Event Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Event Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="event_bg_image">Background Image URL</Label>
            <Input
              id="event_bg_image"
              name="event_bg_image"
              value={formData.event_bg_image || ""}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event_bg_overlay">Overlay Opacity (0-100)</Label>
            <Input
              id="event_bg_overlay"
              name="event_bg_overlay"
              type="number"
              min="0"
              max="100"
              value={formData.event_bg_overlay ?? ""}
              onChange={handleChange}
              placeholder="80"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>

      {/* Gallery Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Gallery Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="gallery_bg_image">Background Image URL</Label>
            <Input
              id="gallery_bg_image"
              name="gallery_bg_image"
              value={formData.gallery_bg_image || ""}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gallery_bg_overlay">Overlay Opacity (0-100)</Label>
            <Input
              id="gallery_bg_overlay"
              name="gallery_bg_overlay"
              type="number"
              min="0"
              max="100"
              value={formData.gallery_bg_overlay ?? ""}
              onChange={handleChange}
              placeholder="80"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>

      {/* RSVP Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">RSVP Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="rsvp_bg_image">Background Image URL</Label>
            <Input
              id="rsvp_bg_image"
              name="rsvp_bg_image"
              value={formData.rsvp_bg_image || ""}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rsvp_bg_overlay">Overlay Opacity (0-100)</Label>
            <Input
              id="rsvp_bg_overlay"
              name="rsvp_bg_overlay"
              type="number"
              min="0"
              max="100"
              value={formData.rsvp_bg_overlay ?? ""}
              onChange={handleChange}
              placeholder="80"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>

      {/* Comments Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Comments Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="comments_bg_image">Background Image URL</Label>
            <Input
              id="comments_bg_image"
              name="comments_bg_image"
              value={formData.comments_bg_image || ""}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments_bg_overlay">Overlay Opacity (0-100)</Label>
            <Input
              id="comments_bg_overlay"
              name="comments_bg_overlay"
              type="number"
              min="0"
              max="100"
              value={formData.comments_bg_overlay ?? ""}
              onChange={handleChange}
              placeholder="80"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
