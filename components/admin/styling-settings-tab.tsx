"use client"

import type React from "react"
import type { WeddingSettings } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StylingSettingsTabProps {
  settings: WeddingSettings | null
  formData: Partial<WeddingSettings>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  setFormData: React.Dispatch<React.SetStateAction<Partial<WeddingSettings>>>
}

export function StylingSettingsTab({ settings, formData, handleChange, setFormData }: StylingSettingsTabProps) {
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Countdown Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Countdown Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="countdown_bg_mode">Background Mode</Label>
            <Select 
              value={formData.countdown_bg_mode || "image"} 
              onValueChange={(val) => handleSelectChange("countdown_bg_mode", val)}
            >
              <SelectTrigger className="bg-white/50">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image Upload</SelectItem>
                <SelectItem value="solid">Solid Color</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.countdown_bg_mode === "solid" ? (
            <div className="space-y-2">
              <Label htmlFor="countdown_bg_color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="countdown_bg_color"
                  name="countdown_bg_color"
                  type="color"
                  value={formData.countdown_bg_color || "#ffffff"}
                  onChange={handleChange}
                  className="w-20 h-10"
                />
                <Input
                  name="countdown_bg_color"
                  value={formData.countdown_bg_color || "#ffffff"}
                  onChange={handleChange}
                  placeholder="#ffffff"
                  className="bg-white/50 flex-1"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
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
          )}
          
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
          
          <div className="space-y-2">
            <Label htmlFor="countdown_overlay_color">Overlay Color</Label>
            <div className="flex gap-2">
              <Input
                id="countdown_overlay_color"
                name="countdown_overlay_color"
                type="color"
                value={formData.countdown_overlay_color || "#000000"}
                onChange={handleChange}
                className="w-20 h-10"
              />
              <Input
                name="countdown_overlay_color"
                value={formData.countdown_overlay_color || "#000000"}
                onChange={handleChange}
                placeholder="#000000"
                className="bg-white/50 flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="countdown_bg_blur">Blur Radius (0-20px)</Label>
            <Input
              id="countdown_bg_blur"
              name="countdown_bg_blur"
              type="number"
              min="0"
              max="20"
              value={formData.countdown_bg_blur ?? ""}
              onChange={handleChange}
              placeholder="0"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>

      {/* Event Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Event Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="event_bg_mode">Background Mode</Label>
            <Select 
              value={formData.event_bg_mode || "image"} 
              onValueChange={(val) => handleSelectChange("event_bg_mode", val)}
            >
              <SelectTrigger className="bg-white/50">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image Upload</SelectItem>
                <SelectItem value="solid">Solid Color</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.event_bg_mode === "solid" ? (
            <div className="space-y-2">
              <Label htmlFor="event_bg_color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="event_bg_color"
                  name="event_bg_color"
                  type="color"
                  value={formData.event_bg_color || "#ffffff"}
                  onChange={handleChange}
                  className="w-20 h-10"
                />
                <Input
                  name="event_bg_color"
                  value={formData.event_bg_color || "#ffffff"}
                  onChange={handleChange}
                  placeholder="#ffffff"
                  className="bg-white/50 flex-1"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
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
          )}
          
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
          
          <div className="space-y-2">
            <Label htmlFor="event_overlay_color">Overlay Color</Label>
            <div className="flex gap-2">
              <Input
                id="event_overlay_color"
                name="event_overlay_color"
                type="color"
                value={formData.event_overlay_color || "#000000"}
                onChange={handleChange}
                className="w-20 h-10"
              />
              <Input
                name="event_overlay_color"
                value={formData.event_overlay_color || "#000000"}
                onChange={handleChange}
                placeholder="#000000"
                className="bg-white/50 flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event_bg_blur">Blur Radius (0-20px)</Label>
            <Input
              id="event_bg_blur"
              name="event_bg_blur"
              type="number"
              min="0"
              max="20"
              value={formData.event_bg_blur ?? ""}
              onChange={handleChange}
              placeholder="0"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>

      {/* Gallery Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Gallery Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gallery_bg_mode">Background Mode</Label>
            <Select 
              value={formData.gallery_bg_mode || "image"} 
              onValueChange={(val) => handleSelectChange("gallery_bg_mode", val)}
            >
              <SelectTrigger className="bg-white/50">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image Upload</SelectItem>
                <SelectItem value="solid">Solid Color</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.gallery_bg_mode === "solid" ? (
            <div className="space-y-2">
              <Label htmlFor="gallery_bg_color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="gallery_bg_color"
                  name="gallery_bg_color"
                  type="color"
                  value={formData.gallery_bg_color || "#ffffff"}
                  onChange={handleChange}
                  className="w-20 h-10"
                />
                <Input
                  name="gallery_bg_color"
                  value={formData.gallery_bg_color || "#ffffff"}
                  onChange={handleChange}
                  placeholder="#ffffff"
                  className="bg-white/50 flex-1"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
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
          )}
          
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
          
          <div className="space-y-2">
            <Label htmlFor="gallery_overlay_color">Overlay Color</Label>
            <div className="flex gap-2">
              <Input
                id="gallery_overlay_color"
                name="gallery_overlay_color"
                type="color"
                value={formData.gallery_overlay_color || "#000000"}
                onChange={handleChange}
                className="w-20 h-10"
              />
              <Input
                name="gallery_overlay_color"
                value={formData.gallery_overlay_color || "#000000"}
                onChange={handleChange}
                placeholder="#000000"
                className="bg-white/50 flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gallery_bg_blur">Blur Radius (0-20px)</Label>
            <Input
              id="gallery_bg_blur"
              name="gallery_bg_blur"
              type="number"
              min="0"
              max="20"
              value={formData.gallery_bg_blur ?? ""}
              onChange={handleChange}
              placeholder="0"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>

      {/* RSVP Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">RSVP Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rsvp_bg_mode">Background Mode</Label>
            <Select 
              value={formData.rsvp_bg_mode || "image"} 
              onValueChange={(val) => handleSelectChange("rsvp_bg_mode", val)}
            >
              <SelectTrigger className="bg-white/50">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image Upload</SelectItem>
                <SelectItem value="solid">Solid Color</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.rsvp_bg_mode === "solid" ? (
            <div className="space-y-2">
              <Label htmlFor="rsvp_bg_color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="rsvp_bg_color"
                  name="rsvp_bg_color"
                  type="color"
                  value={formData.rsvp_bg_color || "#ffffff"}
                  onChange={handleChange}
                  className="w-20 h-10"
                />
                <Input
                  name="rsvp_bg_color"
                  value={formData.rsvp_bg_color || "#ffffff"}
                  onChange={handleChange}
                  placeholder="#ffffff"
                  className="bg-white/50 flex-1"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
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
          )}
          
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
          
          <div className="space-y-2">
            <Label htmlFor="rsvp_overlay_color">Overlay Color</Label>
            <div className="flex gap-2">
              <Input
                id="rsvp_overlay_color"
                name="rsvp_overlay_color"
                type="color"
                value={formData.rsvp_overlay_color || "#000000"}
                onChange={handleChange}
                className="w-20 h-10"
              />
              <Input
                name="rsvp_overlay_color"
                value={formData.rsvp_overlay_color || "#000000"}
                onChange={handleChange}
                placeholder="#000000"
                className="bg-white/50 flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rsvp_bg_blur">Blur Radius (0-20px)</Label>
            <Input
              id="rsvp_bg_blur"
              name="rsvp_bg_blur"
              type="number"
              min="0"
              max="20"
              value={formData.rsvp_bg_blur ?? ""}
              onChange={handleChange}
              placeholder="0"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>

      {/* Comments Background */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Comments Section Background</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="comments_bg_mode">Background Mode</Label>
            <Select 
              value={formData.comments_bg_mode || "image"} 
              onValueChange={(val) => handleSelectChange("comments_bg_mode", val)}
            >
              <SelectTrigger className="bg-white/50">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image Upload</SelectItem>
                <SelectItem value="solid">Solid Color</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.comments_bg_mode === "solid" ? (
            <div className="space-y-2">
              <Label htmlFor="comments_bg_color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="comments_bg_color"
                  name="comments_bg_color"
                  type="color"
                  value={formData.comments_bg_color || "#ffffff"}
                  onChange={handleChange}
                  className="w-20 h-10"
                />
                <Input
                  name="comments_bg_color"
                  value={formData.comments_bg_color || "#ffffff"}
                  onChange={handleChange}
                  placeholder="#ffffff"
                  className="bg-white/50 flex-1"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
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
          )}
          
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
          
          <div className="space-y-2">
            <Label htmlFor="comments_overlay_color">Overlay Color</Label>
            <div className="flex gap-2">
              <Input
                id="comments_overlay_color"
                name="comments_overlay_color"
                type="color"
                value={formData.comments_overlay_color || "#000000"}
                onChange={handleChange}
                className="w-20 h-10"
              />
              <Input
                name="comments_overlay_color"
                value={formData.comments_overlay_color || "#000000"}
                onChange={handleChange}
                placeholder="#000000"
                className="bg-white/50 flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comments_bg_blur">Blur Radius (0-20px)</Label>
            <Input
              id="comments_bg_blur"
              name="comments_bg_blur"
              type="number"
              min="0"
              max="20"
              value={formData.comments_bg_blur ?? ""}
              onChange={handleChange}
              placeholder="0"
              className="bg-white/50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
