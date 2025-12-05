"use client"

import type React from "react"
import type { WeddingSettings } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FooterSettingsTabProps {
  settings: WeddingSettings | null
  formData: Partial<WeddingSettings>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function FooterSettingsTab({ settings, formData, handleChange }: FooterSettingsTabProps) {
  return (
    <div className="space-y-6">
      {/* Copyright */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Copyright Text</h3>
        <div className="space-y-2">
          <Label htmlFor="footer_copyright">Copyright</Label>
          <Input
            id="footer_copyright"
            name="footer_copyright"
            value={formData.footer_copyright || ""}
            onChange={handleChange}
            placeholder="© 2025 Wedding Invitation"
            className="bg-white/50"
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Social Media Links</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="footer_social_instagram">Instagram URL</Label>
            <Input
              id="footer_social_instagram"
              name="footer_social_instagram"
              value={formData.footer_social_instagram || ""}
              onChange={handleChange}
              placeholder="https://instagram.com/username"
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="footer_social_facebook">Facebook URL</Label>
            <Input
              id="footer_social_facebook"
              name="footer_social_facebook"
              value={formData.footer_social_facebook || ""}
              onChange={handleChange}
              placeholder="https://facebook.com/username"
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="footer_social_twitter">Twitter/X URL</Label>
            <Input
              id="footer_social_twitter"
              name="footer_social_twitter"
              value={formData.footer_social_twitter || ""}
              onChange={handleChange}
              placeholder="https://twitter.com/username"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
