"use client"

import type React from "react"
import { useState, useTransition, useEffect, useRef } from "react"
import type { WeddingSettings } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { SplashScreen } from "@/components/splash-screen"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Loader2 } from "lucide-react"
import { updateWeddingSettings } from "@/lib/actions"
import { changeAdminPassword } from "@/lib/actions"
import { extractCoordinatesFromMapInput } from "@/lib/map-utils"
import { SectionSettingsTab } from "./sections-settings-tab"
import { StylingSettingsTab } from "./styling-settings-tab"
import { FooterSettingsTab } from "./footer-settings-tab"

interface SettingsPanelProps {
  settings: WeddingSettings | null
  onUpdate: (settings: WeddingSettings) => void
}

export function SettingsPanel({ settings, onUpdate }: SettingsPanelProps) {
  const [formData, setFormData] = useState<Partial<WeddingSettings>>(settings || {})
  const [previewSplashVisible, setPreviewSplashVisible] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings?.id) return
    setMessage(null)

    startTransition(async () => {
      // Remove transient UI-only fields before sending to the API
      const payload: any = { ...formData }
      if (payload.place_query !== undefined) delete payload.place_query

      // Coerce latitude/longitude to numbers or null to avoid PostgREST 22P02 errors
      if (payload.venue_lat === "" || payload.venue_lat === undefined) payload.venue_lat = null
      else if (typeof payload.venue_lat === "string") payload.venue_lat = Number(payload.venue_lat)
      if (payload.venue_lng === "" || payload.venue_lng === undefined) payload.venue_lng = null
      else if (typeof payload.venue_lng === "string") payload.venue_lng = Number(payload.venue_lng)

      // Normalize countdown_target_date (datetime-local input) to include seconds and GMT+7 offset
      // Input from <input type="datetime-local"> is like "2025-12-04T08:00" (no timezone)
      // We store as TIMESTAMPTZ in GMT+7 by appending ":00+07:00" so Postgres stores the intended instant.
      if (payload.countdown_target_date === "" || payload.countdown_target_date === undefined) {
        payload.countdown_target_date = null
      } else if (typeof payload.countdown_target_date === "string") {
        const v = payload.countdown_target_date.trim()
        // If it already contains timezone offset or Z, leave it
        if (!/[Zz]|[+\-]\d{2}:?\d{2}$/.test(v)) {
          // If it's in the form YYYY-MM-DDTHH:MM, append seconds and +07:00
          if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v)) {
            payload.countdown_target_date = v + ":00+07:00"
          } else {
            // otherwise pass through (backend should validate)
            payload.countdown_target_date = v
          }
        }
      }

      // Ensure venue_map_url is a full URL (if it's a Google Maps search URL we've set it earlier)
      if (payload.venue_map_url && typeof payload.venue_map_url !== 'string') payload.venue_map_url = String(payload.venue_map_url)

      const result = await updateWeddingSettings(settings.id, payload)

      if (result.success && result.data) {
        setMessage({ type: "success", text: "Pengaturan berhasil disimpan" })
        onUpdate(result.data)
      } else {
        setMessage({ type: "error", text: result.error || "Gagal menyimpan pengaturan" })
      }
    })
  }

  // Password change state
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pwPending, startPwTransition] = useTransition()
  const [pwMessage, setPwMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwMessage(null)
    if (!newPassword || newPassword.length < 8) {
      setPwMessage({ type: "error", text: "Password harus minimal 8 karakter" })
      return
    }
    if (newPassword !== confirmPassword) {
      setPwMessage({ type: "error", text: "Password dan konfirmasi tidak cocok" })
      return
    }

    startPwTransition(async () => {
      const result = await changeAdminPassword(newPassword)
      if (result.success) {
        setPwMessage({ type: "success", text: "Password berhasil diubah" })
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setPwMessage({ type: "error", text: result.error || "Gagal mengubah password" })
      }
    })
  }

  // --- Page assets (cover image / music) ---
  const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "wedding-assets"

  const [coverUploading, setCoverUploading] = useState(false)
  const [musicUploading, setMusicUploading] = useState(false)
  const [assetMessage, setAssetMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const uploadViaServer = async (file: File) => {
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('filename', file.name)
      fd.append('folder', 'wedding')

      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      return res.json()
    } catch (err: any) {
      return { success: false, error: err?.message || String(err) }
    }
  }

  const handleCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !settings?.id) return
    setAssetMessage(null)
    setCoverUploading(true)
    const res = await uploadViaServer(file)
    setCoverUploading(false)
    if (!res.success) return setAssetMessage({ type: 'error', text: res.error || 'Gagal mengunggah gambar' })

    startTransition(async () => {
      const result = await updateWeddingSettings(settings.id, { hero_image: res.publicUrl })
      if (result.success && result.data) {
        setAssetMessage({ type: 'success', text: 'Gambar cover berhasil diperbarui' })
        onUpdate(result.data)
      } else {
        setAssetMessage({ type: 'error', text: result.error || 'Gagal menyimpan URL gambar' })
      }
    })
  }

  

  const handleGroomPhotoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !settings?.id) return
    setAssetMessage(null)
    const res = await uploadViaServer(file)
    if (!res.success) return setAssetMessage({ type: 'error', text: res.error || 'Gagal mengunggah gambar' })

    startTransition(async () => {
      const result = await updateWeddingSettings(settings.id, { groom_photo: res.publicUrl })
      if (result.success && result.data) {
        setAssetMessage({ type: 'success', text: 'Foto mempelai pria berhasil diperbarui' })
        // keep formData in sync
        setFormData((p) => ({ ...p, groom_photo: res.publicUrl }))
        onUpdate(result.data)
      } else {
        setAssetMessage({ type: 'error', text: result.error || 'Gagal menyimpan URL gambar' })
      }
    })
  }

  const handleBridePhotoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !settings?.id) return
    setAssetMessage(null)
    const res = await uploadViaServer(file)
    if (!res.success) return setAssetMessage({ type: 'error', text: res.error || 'Gagal mengunggah gambar' })

    startTransition(async () => {
      const result = await updateWeddingSettings(settings.id, { bride_photo: res.publicUrl })
      if (result.success && result.data) {
        setAssetMessage({ type: 'success', text: 'Foto mempelai wanita berhasil diperbarui' })
        // keep formData in sync
        setFormData((p) => ({ ...p, bride_photo: res.publicUrl }))
        onUpdate(result.data)
      } else {
        setAssetMessage({ type: 'error', text: result.error || 'Gagal menyimpan URL gambar' })
      }
    })
  }

  const handleMusicFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !settings?.id) return
    setAssetMessage(null)
    setMusicUploading(true)
    const res = await uploadViaServer(file)
    setMusicUploading(false)
    if (!res.success) return setAssetMessage({ type: 'error', text: res.error || 'Gagal mengunggah audio' })

    startTransition(async () => {
      const result = await updateWeddingSettings(settings.id, { music_url: res.publicUrl })
      if (result.success && result.data) {
        setAssetMessage({ type: 'success', text: 'Musik berhasil diperbarui' })
        onUpdate(result.data)
      } else {
        setAssetMessage({ type: 'error', text: result.error || 'Gagal menyimpan URL musik' })
      }
    })
  }

  const [backgroundUploading, setBackgroundUploading] = useState(false)

  const handleBackgroundPatternFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !settings?.id) return
    setAssetMessage(null)
    setBackgroundUploading(true)
    const res = await uploadViaServer(file)
    setBackgroundUploading(false)
    if (!res.success) return setAssetMessage({ type: 'error', text: res.error || 'Gagal mengunggah gambar latar' })

    startTransition(async () => {
      const result = await updateWeddingSettings(settings.id, { background_image: res.publicUrl })
      if (result.success && result.data) {
        setAssetMessage({ type: 'success', text: 'Gambar latar berhasil diperbarui' })
        setFormData((p) => ({ ...p, background_image: res.publicUrl }))
        onUpdate(result.data)
      } else {
        setAssetMessage({ type: 'error', text: result.error || 'Gagal menyimpan URL gambar latar' })
      }
    })
  }

  const [splashUploading, setSplashUploading] = useState(false)

  const handleSplashFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !settings?.id) return
    setAssetMessage(null)
    setSplashUploading(true)
    const res = await uploadViaServer(file)
    setSplashUploading(false)
    if (!res.success) return setAssetMessage({ type: 'error', text: res.error || 'Gagal mengunggah gambar splash' })

    startTransition(async () => {
      const result = await updateWeddingSettings(settings.id, { splash_image: res.publicUrl })
      if (result.success && result.data) {
        setAssetMessage({ type: 'success', text: 'Gambar splash berhasil diperbarui' })
        setFormData((p) => ({ ...p, splash_image: res.publicUrl }))
        onUpdate(result.data)
      } else {
        setAssetMessage({ type: 'error', text: result.error || 'Gagal menyimpan URL gambar splash' })
      }
    })
  }

  const handleSaveAssetUrl = async (field: 'hero_image' | 'background_image' | 'splash_image' | 'og_image' | 'music_url' | 'whatsapp_template' | 'favicon' | 'site_name' | 'groom_photo' | 'bride_photo', value: string) => {
    if (!settings?.id) return
    setAssetMessage(null)
    startTransition(async () => {
      // Avoid overwriting existing value with an empty string
      if (!value || value.trim() === '') {
        setAssetMessage({ type: 'error', text: 'URL kosong — unggah file terlebih dahulu atau isi URL.' })
        return
      }
      const payload: any = {}
      payload[field] = value
      const result = await updateWeddingSettings(settings.id, payload)
      if (result.success && result.data) {
        setAssetMessage({ type: 'success', text: 'URL berhasil disimpan' })
        // keep local formData in sync so UI updates immediately
        setFormData((p) => ({ ...p, [field]: value }))
        onUpdate(result.data)
      } else {
        setAssetMessage({ type: 'error', text: result.error || 'Gagal menyimpan URL' })
      }
    })
  }

  // --- Google Places autocomplete for location search ---
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const [predictions, setPredictions] = useState<any[]>([])
  const autocompleteServiceRef = useRef<any | null>(null)
  const placesServiceRef = useRef<any | null>(null)
  const groomInputRef = useRef<HTMLInputElement | null>(null)
  const brideInputRef = useRef<HTMLInputElement | null>(null)

  const loadGoogleMaps = () => {
    if (typeof window === 'undefined') return
    if ((window as any).google?.maps?.places) return
    if (!googleApiKey) return
    const src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`
    if (document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js"]`)) return
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.defer = true
    document.head.appendChild(s)
  }

  useEffect(() => {
    loadGoogleMaps()
    const interval = setInterval(() => {
      if ((window as any).google?.maps?.places && !autocompleteServiceRef.current) {
        try {
          autocompleteServiceRef.current = new (window as any).google.maps.places.AutocompleteService()
          placesServiceRef.current = new (window as any).google.maps.places.PlacesService(document.createElement('div'))
        } catch (e) {
          // ignore
        }
      }
    }, 300)
    return () => clearInterval(interval)
  }, [])

  // Watch place_query to fetch predictions
  useEffect(() => {
    const q = (formData as any).place_query || ''
    if (!q || q.length < 3) return setPredictions([])
    const svc = autocompleteServiceRef.current
    if (!svc) return
    svc.getPlacePredictions({ input: q }, (preds: any[], status: string) => {
      if (status === 'OK' && Array.isArray(preds)) setPredictions(preds)
      else setPredictions([])
    })
  }, [formData.place_query])

  const handleSelectPrediction = (pred: any) => {
    setPredictions([])
    setFormData((p) => ({ ...p, place_query: pred.description }))
    const svc = placesServiceRef.current
    if (!svc) return
    svc.getDetails({ placeId: pred.place_id }, (place: any, status: string) => {
      if (status !== 'OK' || !place) return
      let lat: number | null = null
      let lng: number | null = null
      if (place.geometry?.location) {
        const loc = place.geometry.location
        if (typeof loc.lat === 'function') lat = loc.lat()
        else if (typeof loc.lat === 'number') lat = loc.lat
        if (typeof loc.lng === 'function') lng = loc.lng()
        else if (typeof loc.lng === 'number') lng = loc.lng
      }
      const addr = place.formatted_address || pred.description || ''
      const mapUrl = lat !== null && lng !== null ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + ',' + lng)}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`
      setFormData((p) => ({ ...p, venue_lat: lat, venue_lng: lng, venue_map_url: mapUrl }))
    })
  }

  return (
    <>
      <div className="max-w-4xl">
      
      <div className="mb-8">
        <h2 className="font-serif text-2xl text-foreground">Pengaturan Undangan</h2>
        <p className="text-muted-foreground mt-1">Kelola informasi pernikahan Anda</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tabbed Interface */}
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="basic">Informasi</TabsTrigger>
            <TabsTrigger value="event">Acara</TabsTrigger>
            <TabsTrigger value="sections">Judul</TabsTrigger>
            <TabsTrigger value="styling">Styling</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            {/* Couple Information */}
            <div className="glass rounded-2xl p-6">
          <h3 className="font-medium text-foreground mb-4">Informasi Mempelai</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="groom_name">Nama Mempelai Pria</Label>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0 bg-muted flex items-center justify-center">
                  {settings?.groom_photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={settings.groom_photo} alt="Groom" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" aria-hidden />
                  )}
                </div>
                <div className="flex-1 w-full">
                  <Input
                    id="groom_name"
                    name="groom_name"
                    value={formData.groom_name || ""}
                    onChange={handleChange}
                    className="bg-white/50"
                  />
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <input ref={groomInputRef} type="file" accept="image/*" onChange={handleGroomPhotoFile} className="hidden" />
                    <Button size="sm" onClick={() => groomInputRef.current?.click()}>Pilih Foto</Button>
                    <Button size="sm" onClick={() => handleSaveAssetUrl('groom_photo', (formData.groom_photo as string) || settings?.groom_photo || '')}>Simpan Foto</Button>
                    <Button size="sm" variant="ghost" onClick={async () => {
                      if (!settings?.id) return
                      setAssetMessage(null)
                      startTransition(async () => {
                        const result = await updateWeddingSettings(settings.id, { groom_photo: null })
                        if (result.success && result.data) {
                          setAssetMessage({ type: 'success', text: 'Foto mempelai pria dihapus' })
                          onUpdate(result.data)
                        } else {
                          setAssetMessage({ type: 'error', text: result.error || 'Gagal menghapus foto' })
                        }
                      })
                    }}>Hapus Foto</Button>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bride_name">Nama Mempelai Wanita</Label>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0 bg-muted flex items-center justify-center">
                  {settings?.bride_photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={settings.bride_photo} alt="Bride" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" aria-hidden />
                  )}
                </div>
                <div className="flex-1 w-full">
                  <Input
                    id="bride_name"
                    name="bride_name"
                    value={formData.bride_name || ""}
                    onChange={handleChange}
                    className="bg-white/50"
                  />
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <input ref={brideInputRef} type="file" accept="image/*" onChange={handleBridePhotoFile} className="hidden" />
                    <Button size="sm" onClick={() => brideInputRef.current?.click()}>Pilih Foto</Button>
                    <Button size="sm" onClick={() => handleSaveAssetUrl('bride_photo', (formData.bride_photo as string) || settings?.bride_photo || '')}>Simpan Foto</Button>
                    <Button size="sm" variant="ghost" onClick={async () => {
                      if (!settings?.id) return
                      setAssetMessage(null)
                      startTransition(async () => {
                        const result = await updateWeddingSettings(settings.id, { bride_photo: null })
                        if (result.success && result.data) {
                          setAssetMessage({ type: 'success', text: 'Foto mempelai wanita dihapus' })
                          onUpdate(result.data)
                        } else {
                          setAssetMessage({ type: 'error', text: result.error || 'Gagal menghapus foto' })
                        }
                      })
                    }}>Hapus Foto</Button>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="groom_father">Ayah Mempelai Pria</Label>
              <Input
                id="groom_father"
                name="groom_father"
                value={formData.groom_father || ""}
                onChange={handleChange}
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bride_father">Ayah Mempelai Wanita</Label>
              <Input
                id="bride_father"
                name="bride_father"
                value={formData.bride_father || ""}
                onChange={handleChange}
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groom_mother">Ibu Mempelai Pria</Label>
              <Input
                id="groom_mother"
                name="groom_mother"
                value={formData.groom_mother || ""}
                onChange={handleChange}
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bride_mother">Ibu Mempelai Wanita</Label>
              <Input
                id="bride_mother"
                name="bride_mother"
                value={formData.bride_mother || ""}
                onChange={handleChange}
                className="bg-white/50"
              />
            </div>
          </div>
        </div>
          </TabsContent>

          <TabsContent value="event" className="space-y-6">
        {/* Event Information */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-medium text-foreground mb-4">Informasi Acara</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="wedding_date">Tanggal Pernikahan</Label>
              <Input
                id="wedding_date"
                name="wedding_date"
                type="datetime-local"
                value={formData.wedding_date?.slice(0, 16) || ""}
                onChange={handleChange}
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="countdown_target_date">Waktu Target Countdown (GMT+7)</Label>
              <Input
                id="countdown_target_date"
                name="countdown_target_date"
                type="datetime-local"
                value={formData.countdown_target_date?.slice(0, 16) || ""}
                onChange={handleChange}
                placeholder="Kosongkan untuk menggunakan tanggal pernikahan"
                className="bg-white/50"
              />
              <p className="text-xs text-muted-foreground">Atur waktu spesifik untuk countdown. Kosongkan jika ingin menggunakan tanggal pernikahan.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="akad_time">Waktu Akad (Mulai)</Label>
              <Input
                id="akad_time"
                name="akad_time"
                value={formData.akad_time || ""}
                onChange={handleChange}
                placeholder="08:00"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="akad_time_end">Waktu Akad (Selesai)</Label>
              <Input
                id="akad_time_end"
                name="akad_time_end"
                value={formData.akad_time_end || ""}
                onChange={handleChange}
                placeholder="10:00"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reception_time">Waktu Resepsi (Mulai)</Label>
              <Input
                id="reception_time"
                name="reception_time"
                value={formData.reception_time || ""}
                onChange={handleChange}
                placeholder="11:00"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reception_time_end">Waktu Resepsi (Selesai)</Label>
              <Input
                id="reception_time_end"
                name="reception_time_end"
                value={formData.reception_time_end || ""}
                onChange={handleChange}
                placeholder="14:00"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="akad_location">Lokasi Akad</Label>
              <Input
                id="akad_location"
                name="akad_location"
                value={formData.akad_location || ""}
                onChange={handleChange}
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reception_location">Lokasi Resepsi</Label>
              <Input
                id="reception_location"
                name="reception_location"
                value={formData.reception_location || ""}
                onChange={handleChange}
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="akad_address">Alamat Akad</Label>
              <Input
                id="akad_address"
                name="akad_address"
                value={formData.akad_address || ""}
                onChange={handleChange}
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reception_address">Alamat Resepsi</Label>
              <Input
                id="reception_address"
                name="reception_address"
                value={formData.reception_address || ""}
                onChange={handleChange}
                className="bg-white/50"
              />
            </div>
          </div>
        </div>

        {/* Map Location */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-medium text-foreground mb-4">Lokasi di Peta</h3>
          <div className="space-y-3">
            {/* Location search using Google Places (Places API key required) */}
            <div className="space-y-2">
              <Label htmlFor="map_input">Input Lokasi Google Maps</Label>
              <Textarea
                id="map_input"
                placeholder="Masukkan salah satu:&#10;1. Latitude, Longitude (contoh: -7.395261, 109.244876)&#10;2. Google Maps URL (contoh: https://maps.app.goo.gl/...)&#10;3. Iframe embed code"
                rows={4}
                onChange={(e) => {
                  const input = e.target.value
                  const coords = extractCoordinatesFromMapInput(input)
                  if (coords) {
                    setFormData((p) => ({ ...p, venue_lat: coords.lat, venue_lng: coords.lng }))
                  }
                }}
                className="bg-white/50 font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">
                Paste koordinat, URL Google Maps, atau kode iframe embed. Koordinat akan otomatis terdeteksi.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="venue_lat">Latitude (Terdeteksi)</Label>
              <Input
                id="venue_lat"
                name="venue_lat"
                type="number"
                step="any"
                value={formData.venue_lat || ""}
                onChange={handleChange}
                placeholder="-6.2088"
                className="bg-white/50"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue_lng">Longitude (Terdeteksi)</Label>
              <Input
                id="venue_lng"
                name="venue_lng"
                type="number"
                step="any"
                value={formData.venue_lng || ""}
                onChange={handleChange}
                placeholder="106.8456"
                className="bg-white/50"
                readOnly
              />
            </div>
            </div>
          </div>
        </div>
          </TabsContent>

          <TabsContent value="sections">
            <SectionSettingsTab settings={settings} formData={formData} handleChange={handleChange} />
          </TabsContent>

          <TabsContent value="styling">
            <StylingSettingsTab settings={settings} formData={formData} handleChange={handleChange} setFormData={setFormData} />
          </TabsContent>

          <TabsContent value="footer">
            <FooterSettingsTab settings={settings} formData={formData} handleChange={handleChange} />
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
        {/* Quote */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-medium text-foreground mb-4">Kutipan</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quote">Kutipan</Label>
              <Textarea
                id="quote"
                name="quote"
                value={formData.quote || ""}
                onChange={handleChange}
                rows={3}
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote_source">Sumber Kutipan</Label>
              <Input
                id="quote_source"
                name="quote_source"
                value={formData.quote_source || ""}
                onChange={handleChange}
                placeholder="QS. Ar-Rum: 21"
                className="bg-white/50"
              />
            </div>
          </div>

            {/* Page Assets: Cover Image & Music */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-medium text-foreground mb-4">Pengaturan Halaman (Cover & Musik)</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  {settings?.hero_image ? (
                    <img src={settings.hero_image} alt="Cover" className="w-full h-48 object-cover rounded-md mb-2" />
                  ) : (
                    <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-sm">No cover image</div>
                  )}
                  <input type="file" accept="image/*" onChange={handleCoverFile} />

                  <div className="flex gap-2">
                    <Input
                      placeholder="Atau masukkan URL gambar"
                      value={(formData.hero_image as string) || settings?.hero_image || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, hero_image: e.target.value }))}
                    />
                    <Button size="sm" onClick={() => handleSaveAssetUrl("hero_image", (formData.hero_image as string) || settings?.hero_image || "")}>Simpan</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Section Background (Pattern)</Label>
                  {settings?.background_image ? (
                    <img src={settings.background_image} alt="Background pattern" className="w-full h-48 object-cover rounded-md mb-2" />
                  ) : (
                    <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-sm">No background pattern</div>
                  )}
                  <input type="file" accept="image/*" onChange={handleBackgroundPatternFile} />

                  <div className="flex gap-2">
                    <Input
                      placeholder="Atau masukkan URL gambar pattern"
                      value={(formData.background_image as string) || settings?.background_image || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, background_image: e.target.value }))}
                    />
                    <Button size="sm" onClick={() => handleSaveAssetUrl("background_image", (formData.background_image as string) || settings?.background_image || "")}>Simpan</Button>
                    <Button size="sm" variant="ghost" onClick={async () => {
                      if (!settings?.id) return
                      setAssetMessage(null)
                      startTransition(async () => {
                        const result = await updateWeddingSettings(settings.id, { background_image: null })
                        if (result.success && result.data) {
                          setAssetMessage({ type: 'success', text: 'Gambar latar dihapus' })
                          setFormData((p) => ({ ...p, background_image: null }))
                          onUpdate(result.data)
                        } else {
                          setAssetMessage({ type: 'error', text: result.error || 'Gagal menghapus gambar latar' })
                        }
                      })
                    }}>Hapus</Button>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="background_opacity">Background Opacity (0-100)</Label>
                    <Input
                      id="background_opacity"
                      name="background_opacity"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.background_opacity ?? settings?.background_opacity ?? 100}
                      onChange={handleChange}
                      placeholder="100"
                      className="bg-white/50"
                    />
                    <p className="text-xs text-muted-foreground">Kontrol opacity untuk main background pattern (0 = transparan, 100 = penuh)</p>
                  </div>
                </div>

                

                <div className="space-y-2">
                  <Label>Musik Latar</Label>
                  {settings?.music_url ? (
                    <audio controls src={settings.music_url} className="w-full mb-2" />
                  ) : (
                    <div className="w-full h-12 bg-muted rounded-md flex items-center justify-center text-sm">No music set</div>
                  )}
                  <input type="file" accept="audio/*" onChange={handleMusicFile} />

                  <div className="flex gap-2">
                    <Input
                      placeholder="Atau masukkan URL audio"
                      value={(formData.music_url as string) || settings?.music_url || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, music_url: e.target.value }))}
                    />
                    <Button size="sm" onClick={() => handleSaveAssetUrl("music_url", (formData.music_url as string) || settings?.music_url || "")}>Simpan</Button>
                  </div>
                </div>
              </div>

              {assetMessage && (
                <div className={`p-3 mt-3 rounded-lg ${assetMessage.type === "success" ? "bg-green-50 text-green-700" : "bg-destructive/10 text-destructive"}`}>
                  {assetMessage.text}
                </div>
              )}

              <div className="mt-4">
                <Label>Template Pesan WhatsApp</Label>
                <Textarea
                  placeholder="Gunakan {{name}} dan {{link}} sebagai placeholder. Contoh: Halo <b>{{name}}</b>!"
                  value={(formData.whatsapp_template as string) || settings?.whatsapp_template || ""}
                  onChange={(e) => setFormData((p) => ({ ...p, whatsapp_template: e.target.value }))}
                  rows={3}
                  className="bg-white/50"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Anda dapat menggunakan tag HTML sederhana atau markdown-like untuk memformat pesan: <b>&lt;b&gt;bold&lt;/b&gt;</b> → <code>*bold*</code>, <b>&lt;i&gt;italic&lt;/i&gt;</b> → <code>_italic_</code>, <b>&lt;s&gt;strike&lt;/s&gt;</b> → <code>~strike~</code>, dan <b>&lt;code&gt;</b> untuk monospace. (Catatan: underline tidak didukung oleh WhatsApp; akan dikonversi ke italic.)
                </p>
                <div className="flex justify-end mt-2">
                  <Button size="sm" onClick={() => handleSaveAssetUrl("whatsapp_template", (formData.whatsapp_template as string) || settings?.whatsapp_template || "")}>Simpan Template</Button>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 mt-6">
                <h3 className="font-medium text-foreground mb-4">Pengaturan Situs</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nama Situs</Label>
                    <Input
                      value={(formData.site_name as string) || settings?.site_name || ''}
                      onChange={(e) => setFormData((p) => ({ ...p, site_name: e.target.value }))}
                      placeholder="Nama situs, mis. Undangan Ahmad & Fatimah"
                      className="bg-white/50"
                    />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" onClick={() => handleSaveAssetUrl('site_name', (formData.site_name as string) || settings?.site_name || '')}>Simpan Nama Situs</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    {settings?.favicon ? (
                      <img src={settings.favicon} alt="favicon" className="w-12 h-12 object-contain rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-sm">No favicon</div>
                    )}
                    <input type="file" accept="image/*" onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      setAssetMessage(null)
                      const fd = new FormData()
                      fd.append('file', file)
                      fd.append('filename', file.name)
                      fd.append('folder', 'site')
                      const res = await fetch('/api/upload', { method: 'POST', body: fd })
                      const json = await res.json()
                      if (!json.success) return setAssetMessage({ type: 'error', text: json.error || 'Gagal mengunggah favicon' })
                      const url = json.publicUrl || json.publicURL || json.public_url
                      if (url) handleSaveAssetUrl('favicon', url)
                    }} />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" onClick={() => handleSaveAssetUrl('favicon', (formData.favicon as string) || settings?.favicon || '')}>Simpan Favicon</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground mb-2">Splash Screen</h4>
                  <Label>Splash Background</Label>
                  {settings?.splash_image ? (
                    <img src={settings.splash_image} alt="Splash" className="w-full h-48 object-cover rounded-md mb-2" />
                  ) : (
                    <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-sm">No splash image</div>
                  )}
                  <input type="file" accept="image/*" onChange={handleSplashFile} />

                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Atau masukkan URL gambar splash"
                      value={(formData.splash_image as string) || settings?.splash_image || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, splash_image: e.target.value }))}
                    />
                    <Button size="sm" onClick={() => handleSaveAssetUrl('splash_image', (formData.splash_image as string) || settings?.splash_image || '')}>Simpan</Button>
                    <Button size="sm" variant="outline" onClick={() => setPreviewSplashVisible(true)}>Preview Splash</Button>
                    <Button size="sm" variant="ghost" onClick={async () => {
                      if (!settings?.id) return
                      setAssetMessage(null)
                      startTransition(async () => {
                        const result = await updateWeddingSettings(settings.id, { splash_image: null })
                        if (result.success && result.data) {
                          setAssetMessage({ type: 'success', text: 'Gambar splash dihapus' })
                          setFormData((p) => ({ ...p, splash_image: null }))
                          onUpdate(result.data)
                        } else {
                          setAssetMessage({ type: 'error', text: result.error || 'Gagal menghapus gambar splash' })
                        }
                      })
                    }}>Hapus</Button>
                  </div>

                  <div className="mt-3 space-y-3">
                    <Label>Overlay Mode & Opacity</Label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="splash_overlay_mode"
                          value="light"
                          checked={(formData.splash_overlay_mode || settings?.splash_overlay_mode || 'light') === 'light'}
                          onChange={() => setFormData((p) => ({ ...p, splash_overlay_mode: 'light' }))}
                        />
                        <span className="text-sm">Light</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="splash_overlay_mode"
                          value="dark"
                          checked={(formData.splash_overlay_mode || settings?.splash_overlay_mode || 'light') === 'dark'}
                          onChange={() => setFormData((p) => ({ ...p, splash_overlay_mode: 'dark' }))}
                        />
                        <span className="text-sm">Dark</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="splash_overlay_mode"
                          value="custom"
                          checked={(formData.splash_overlay_mode || settings?.splash_overlay_mode || 'light') === 'custom'}
                          onChange={() => setFormData((p) => ({ ...p, splash_overlay_mode: 'custom' }))}
                        />
                        <span className="text-sm">Custom</span>
                      </label>
                    </div>

                    {/* Color picker only when custom selected */}
                    {((formData.splash_overlay_mode as any) ?? settings?.splash_overlay_mode ?? 'light') === 'custom' && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={(formData.splash_overlay_color as string) || settings?.splash_overlay_color || '#000000'}
                          onChange={(e) => setFormData((p) => ({ ...p, splash_overlay_color: e.target.value }))}
                          className="w-12 h-10 p-0"
                        />
                        <Input
                          value={(formData.splash_overlay_color as string) || settings?.splash_overlay_color || '#000000'}
                          onChange={(e) => setFormData((p) => ({ ...p, splash_overlay_color: e.target.value }))}
                          className="w-full"
                        />
                      </div>
                    )}

                    <div>
                      <Label>Overlay Opacity ({String((formData.splash_overlay_opacity ?? settings?.splash_overlay_opacity ?? 0.8) as number)})</Label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={Math.round(((formData.splash_overlay_opacity as any) ?? (settings?.splash_overlay_opacity ?? 0.8)) * 100)}
                        onChange={(e) => {
                          const v = Number(e.target.value) / 100
                          setFormData((p) => ({ ...p, splash_overlay_opacity: v }))
                        }}
                        className="w-full"
                      />
                    </div>

                    <div className="flex justify-end mt-2">
                      <Button size="sm" onClick={async () => {
                        if (!settings?.id) return
                        const payload: any = {}
                        payload.splash_overlay_mode = (formData.splash_overlay_mode as any) ?? settings?.splash_overlay_mode ?? 'light'
                        payload.splash_overlay_color = (formData.splash_overlay_color as any) ?? settings?.splash_overlay_color ?? null
                        payload.splash_overlay_opacity = Number(((formData.splash_overlay_opacity as any) ?? settings?.splash_overlay_opacity ?? 0.8))
                        setAssetMessage(null)
                        startTransition(async () => {
                          const result = await updateWeddingSettings(settings.id, payload)
                          if (result.success && result.data) {
                            setAssetMessage({ type: 'success', text: 'Pengaturan overlay splash disimpan' })
                            setFormData((p) => ({ ...p, ...payload }))
                            onUpdate(result.data)
                          } else {
                            setAssetMessage({ type: 'error', text: result.error || 'Gagal menyimpan pengaturan overlay' })
                          }
                        })
                      }}>Simpan Overlay</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Open Graph Preview Image */}
              <div className="glass rounded-2xl p-6 mt-6">
                <h3 className="font-medium text-foreground mb-4">Gambar Preview Link (Open Graph)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Gambar ini akan muncul saat link undangan dibagikan di WhatsApp, Facebook, Twitter, dll. 
                  Ukuran optimal: 1200×630 piksel. Jika tidak diatur, akan menggunakan Splash Image sebagai fallback.
                </p>
                
                <div className="space-y-2">
                  <Label>Gambar Preview (1200×630 px)</Label>
                  {(formData.og_image as string) || settings?.og_image ? (
                    <img 
                      src={(formData.og_image as string) || settings?.og_image || ""} 
                      alt="OG Preview" 
                      className="w-full max-w-2xl h-auto object-cover rounded-md mb-2 border-2 border-gold/20" 
                    />
                  ) : (
                    <div className="w-full max-w-2xl h-64 bg-muted rounded-md flex flex-col items-center justify-center text-sm gap-2">
                      <span>Belum ada gambar preview</span>
                      <span className="text-xs text-muted-foreground">Akan menggunakan Splash Image jika tidak diatur</span>
                    </div>
                  )}
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file || !settings?.id) return
                      setAssetMessage(null)
                      
                      const fd = new FormData()
                      fd.append('file', file)
                      fd.append('filename', file.name)
                      fd.append('folder', 'og')
                      
                      const res = await fetch('/api/upload', { method: 'POST', body: fd })
                      const json = await res.json()
                      
                      if (!json.success) {
                        return setAssetMessage({ type: 'error', text: json.error || 'Gagal mengunggah gambar OG' })
                      }
                      
                      const url = json.publicUrl || json.publicURL || json.public_url
                      if (url) {
                        setFormData((p) => ({ ...p, og_image: url }))
                        handleSaveAssetUrl('og_image', url)
                      }
                    }} 
                  />

                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Atau masukkan URL gambar preview"
                      value={(formData.og_image as string) || settings?.og_image || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, og_image: e.target.value }))}
                      className="bg-white/50"
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleSaveAssetUrl('og_image', (formData.og_image as string) || settings?.og_image || '')}
                    >
                      Simpan
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={async () => {
                        if (!settings?.id) return
                        setAssetMessage(null)
                        startTransition(async () => {
                          const result = await updateWeddingSettings(settings.id, { og_image: null })
                          if (result.success && result.data) {
                            setAssetMessage({ type: 'success', text: 'Gambar preview dihapus (akan gunakan fallback)' })
                            setFormData((p) => ({ ...p, og_image: null }))
                            onUpdate(result.data)
                          } else {
                            setAssetMessage({ type: 'error', text: result.error || 'Gagal menghapus gambar preview' })
                          }
                        })
                      }}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-xl ${
              message.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-600"
                : "bg-destructive/10 border border-destructive/20 text-destructive"
            }`}
          >
            {message.text}
          </div>
        )}

          </TabsContent>
        </Tabs>

        {/* Submit - Use isPending */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending} className="bg-gold hover:bg-gold/90 text-white">
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Pengaturan
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Change password section */}
      <div className="mt-8 glass rounded-2xl p-6">
        <h3 className="font-medium text-foreground mb-4">Ganti Password Admin</h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <Label htmlFor="new_password">Password baru</Label>
            <Input id="new_password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="confirm_password">Konfirmasi password</Label>
            <Input id="confirm_password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          {pwMessage && (
            <div className={`p-3 rounded-lg ${pwMessage.type === "success" ? "bg-green-50 text-green-700" : "bg-destructive/10 text-destructive"}`}>
              {pwMessage.text}
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white" disabled={pwPending}>
              {pwPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengubah...
                </>
              ) : (
                "Ganti Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
      {previewSplashVisible && (
        <SplashScreen
          groomName={(formData.groom_name as string) || settings?.groom_name || ""}
          brideName={(formData.bride_name as string) || settings?.bride_name || ""}
          onOpen={() => setPreviewSplashVisible(false)}
          splashImage={(formData.splash_image as string) || settings?.splash_image || null}
          overlayOpacity={(formData.splash_overlay_opacity as any) ?? settings?.splash_overlay_opacity ?? 0.8}
          overlayMode={(formData.splash_overlay_mode as any) ?? settings?.splash_overlay_mode ?? 'light'}
          overlayColor={((formData.splash_overlay_color as any) ?? settings?.splash_overlay_color) || null}
        />
      )}
    </>
  )
}
