"use client"

import type React from "react"
import { useState, useTransition } from "react"
import type { WeddingSettings } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Loader2 } from "lucide-react"
import { updateWeddingSettings } from "@/lib/actions"

interface SectionSettingsTabProps {
  settings: WeddingSettings | null
  formData: Partial<WeddingSettings>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function SectionSettingsTab({ settings, formData, handleChange }: SectionSettingsTabProps) {
  return (
    <div className="space-y-6">
      {/* Section Titles */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Judul Section</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="section_title_bismillah">Bismillah/Quotes</Label>
            <Input
              id="section_title_bismillah"
              name="section_title_bismillah"
              value={formData.section_title_bismillah || ""}
              onChange={handleChange}
              placeholder="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section_title_couple">Couple Section</Label>
            <Input
              id="section_title_couple"
              name="section_title_couple"
              value={formData.section_title_couple || ""}
              onChange={handleChange}
              placeholder="The Happy Couple"
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section_title_countdown">Countdown</Label>
            <Input
              id="section_title_countdown"
              name="section_title_countdown"
              value={formData.section_title_countdown || ""}
              onChange={handleChange}
              placeholder="Save The Date"
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section_title_event">Event</Label>
            <Input
              id="section_title_event"
              name="section_title_event"
              value={formData.section_title_event || ""}
              onChange={handleChange}
              placeholder="Wedding Event"
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section_title_gallery">Gallery</Label>
            <Input
              id="section_title_gallery"
              name="section_title_gallery"
              value={formData.section_title_gallery || ""}
              onChange={handleChange}
              placeholder="Our Gallery"
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section_title_rsvp">RSVP</Label>
            <Input
              id="section_title_rsvp"
              name="section_title_rsvp"
              value={formData.section_title_rsvp || ""}
              onChange={handleChange}
              placeholder="RSVP"
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="section_title_comments">Comments/Wishes</Label>
            <Input
              id="section_title_comments"
              name="section_title_comments"
              value={formData.section_title_comments || ""}
              onChange={handleChange}
              placeholder="Wishes & Prayers"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>

      {/* Closing Message */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Kalimat Penutup</h3>
        <div className="space-y-2">
          <Label htmlFor="closing_message">Pesan Penutup</Label>
          <Textarea
            id="closing_message"
            name="closing_message"
            value={formData.closing_message || ""}
            onChange={handleChange}
            rows={4}
            placeholder="Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami. Terima kasih."
            className="bg-white/50"
          />
        </div>
      </div>
    </div>
  )
}
