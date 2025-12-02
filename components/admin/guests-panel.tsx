"use client"

import { useState, useTransition } from "react"
import type { Guest } from "@/lib/types"
import type { WeddingSettings } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Search, Copy, UserCheck, UserX, Clock, Users, Loader2, Send } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { addGuest, deleteGuest, updateGuest } from "@/lib/actions"

interface GuestsPanelProps {
  guests: Guest[]
  onUpdate: (guests: Guest[]) => void
  settings?: WeddingSettings | null
}

export function GuestsPanel({ guests, onUpdate, settings }: GuestsPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [newGuest, setNewGuest] = useState({
    name: "",
    phone: "",
    address: "",
    guest_count: 1,
  })

  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [selectAll, setSelectAll] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Guest>>({})

  const filteredGuests = guests.filter((guest) => {
    const q = searchTerm.toLowerCase()
    return (
      guest.name.toLowerCase().includes(q) ||
      (guest.phone || "").toLowerCase().includes(q) ||
      (guest.address || "").toLowerCase().includes(q)
    )
  })

  const handleAddGuest = async () => {
    if (!newGuest.name.trim()) return

    startTransition(async () => {
      const result = await addGuest(newGuest)

      if (result.success && result.data) {
        onUpdate([result.data, ...guests])
        setNewGuest({ name: "", phone: "", address: "", guest_count: 1 })
        setIsAdding(false)
      }
    })
  }

  const handleDeleteGuest = async (id: string) => {
    if (!confirm("Yakin ingin menghapus tamu ini?")) return

    startTransition(async () => {
      const result = await deleteGuest(id)

      if (result.success) {
        onUpdate(guests.filter((g) => g.id !== id))
      }
    })
  }

  const handleStartEdit = (guest: Guest) => {
    setEditingId(guest.id)
    setEditForm({ ...guest })
  }

  const handleSaveEdit = async (id: string) => {
    startTransition(async () => {
      const payload: any = {
        name: editForm.name,
        phone: editForm.phone,
        address: editForm.address,
        guest_count: editForm.guest_count,
        attendance_status: editForm.attendance_status,
      }

      const result = await updateGuest(id, payload)
      if (result.success && result.data) {
        onUpdate(guests.map((g) => (g.id === id ? result.data : g)))
        setEditingId(null)
        setEditForm({})
      }
    })
  }

  const normalizePhoneForWhatsApp = (raw?: string) => {
    if (!raw) return ""
    let digits = raw.replace(/[^0-9+]/g, "")
    if (digits.startsWith("+")) digits = digits.slice(1)
    if (digits.startsWith("0")) digits = "62" + digits.slice(1)
    return digits
  }

  const sendWhatsApp = async (guest: Guest) => {
    if (!guest.phone) return alert("Nomor telepon tidak tersedia")

    // Normalize and strictly validate id: trim and reject literal 'undefined'/'null' (case-insensitive)
    const rawId = guest.id ?? ""
    const id = (typeof rawId === "string" ? rawId : String(rawId)).trim()
    const hasValidId = id.length > 0 && !/^\s*(undefined|null)\s*$/i.test(id)

    // Guard: if guest.id missing or invalid, fallback to client-side builder to avoid server uuid errors
    if (!hasValidId) {
      const template = settings?.whatsapp_template || 'Halo {{name}}! Anda diundang ke acara kami. Lihat undangan: {{link}}'
      const link = `${window.location.origin}?to=${guest.unique_slug || guest.slug || ""}`
      let message = template.replace(/{{\s*name\s*}}/gi, guest.name || "")
      message = message.replace(/{{\s*link\s*}}/gi, link)
      const phone = normalizePhoneForWhatsApp(guest.phone)
      if (!phone) return alert("Nomor telepon tidak valid")
      const encoded = encodeURIComponent(message)
      const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`
      window.open(url, "_blank")
      return
    }

    try {
      const res = await fetch(`/api/admin/blast/${encodeURIComponent(id)}`)
      const json = await res.json()
      if (!json.success) return alert(json.error || 'Gagal membuat pesan')
      const waLink = json.waLink || json.wa_link || json.data?.waLink
      if (!waLink) return alert('Tidak ada link WhatsApp dihasilkan')
      window.open(waLink, '_blank')
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan saat membuat pesan')
    }
  }

  const batchSendWhatsApp = async () => {
    // filter out invalid id strings like "undefined" or "null"
    const ids = Object.keys(selected).filter((k) => selected[k] && k !== "undefined" && k !== "null")
    if (ids.length === 0) return alert('Pilih minimal satu tamu')
    try {
      const res = await fetch('/api/admin/blast/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      const json = await res.json()
      if (!json.success) return alert(json.error || 'Gagal membuat pesan batch')
      for (const r of json.results) {
        const waLink = r.waLink || r.wa_link || r.data?.waLink
        if (waLink) window.open(waLink, '_blank')
      }
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan saat membuat pesan batch')
    }
  }

  const copyInvitationLink = (slug: string) => {
    const url = `${window.location.origin}?to=${slug}`
    navigator.clipboard.writeText(url)
    alert("Link undangan disalin!")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "attending":
        return <UserCheck className="w-4 h-4 text-green-500" />
      case "not_attending":
        return <UserX className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "attending":
        return "Akan Hadir"
      case "not_attending":
        return "Tidak Hadir"
      default:
        return "Belum Konfirmasi"
    }
  }

  const attending = guests.filter((g) => g.attendance_status === "attending")
  const totalAttending = attending.reduce((sum, g) => sum + g.guest_count, 0)

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Daftar Tamu</h2>
          <p className="text-muted-foreground mt-1">Kelola tamu undangan</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAdding(true)} className="bg-gold hover:bg-gold/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Tamu
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={batchSendWhatsApp} className="bg-gold hover:bg-gold/90 text-white">
                Kirim WhatsApp (Dipilih)
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>Kirim pesan WhatsApp menggunakan template yang disimpan</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-gold" />
            <div>
              <p className="text-2xl font-serif text-foreground">{guests.length}</p>
              <p className="text-xs text-muted-foreground">Total Tamu</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-serif text-foreground">{attending.length}</p>
              <p className="text-xs text-muted-foreground">Akan Hadir</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <UserX className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-2xl font-serif text-foreground">
                {guests.filter((g) => g.attendance_status === "not_attending").length}
              </p>
              <p className="text-xs text-muted-foreground">Tidak Hadir</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-serif text-foreground">{totalAttending}</p>
              <p className="text-xs text-muted-foreground">Total Orang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Cari tamu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/50"
        />
      </div>

      {/* Add Guest Form */}
      {isAdding && (
        <div className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-medium text-foreground mb-4">Tambah Tamu Baru</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nama *</Label>
              <Input
                value={newGuest.name}
                onChange={(e) => setNewGuest((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Nama tamu"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label>No. Telepon</Label>
              <Input
                value={newGuest.phone}
                onChange={(e) => setNewGuest((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="08xxxxxxxxxx"
                className="bg-white/50"
              />
            </div>
            {/* Email removed: guests do not require email */}
            <div className="space-y-2">
              <Label>Jumlah Tamu</Label>
              <Input
                type="number"
                min="1"
                value={newGuest.guest_count}
                onChange={(e) =>
                  setNewGuest((prev) => ({ ...prev, guest_count: Number.parseInt(e.target.value) || 1 }))
                }
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Alamat</Label>
              <Input
                value={newGuest.address}
                onChange={(e) => setNewGuest((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Alamat lengkap"
                className="bg-white/50"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAdding(false)
                setNewGuest({ name: "", phone: "", address: "", guest_count: 1 })
              }}
            >
              Batal
            </Button>
            <Button
              onClick={handleAddGuest}
              disabled={isPending || !newGuest.name.trim()}
              className="bg-gold hover:bg-gold/90 text-white"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan"}
            </Button>
          </div>
        </div>
      )}

      {/* Guests List */}
      <div className="space-y-3">
        {filteredGuests.map((guest) => (
          <div key={guest.id} className="glass rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={!!selected[guest.id]}
                  onChange={(e) => {
                    const next = { ...selected, [guest.id]: e.target.checked }
                    setSelected(next)
                    const all = filteredGuests.every((g) => next[g.id])
                    setSelectAll(all)
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">{guest.name}</h4>
                    {getStatusIcon(guest.attendance_status)}
                    <span className="text-xs text-muted-foreground">({getStatusText(guest.attendance_status)})</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {guest.phone && <span>{guest.phone}</span>}
                    <span>{guest.guest_count} orang</span>
                    {guest.unique_code && <span className="px-2 py-0.5 rounded bg-slate-100 text-xs">Kode: {guest.unique_code}</span>}
                    {guest.blast_status && <span className="px-2 py-0.5 rounded bg-slate-100 text-xs">Status: {guest.blast_status}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyInvitationLink(guest.unique_slug || guest.slug || "")}
                  className="text-muted-foreground hover:text-foreground"
                  title="Salin link undangan"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleStartEdit(guest)} className="text-muted-foreground">
                  <UserCheck className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => sendWhatsApp(guest)}
                  className="bg-gold hover:bg-gold/90 text-white"
                  title="Kirim via WhatsApp"
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteGuest(guest.id)}
                  disabled={isPending}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {editingId === guest.id && (
              <div className="mt-3">
                <div className="grid md:grid-cols-3 gap-3">
                  <Input value={(editForm.name as string) || ''} onChange={(e) => setEditForm((p) => ({ ...(p || {}), name: e.target.value }))} />
                  <Input value={(editForm.phone as string) || ''} onChange={(e) => setEditForm((p) => ({ ...(p || {}), phone: e.target.value }))} />
                  <Input type="number" value={(editForm.guest_count as number) || 1} onChange={(e) => setEditForm((p) => ({ ...(p || {}), guest_count: Number(e.target.value) }))} />
                </div>
                <div className="flex gap-2 justify-end mt-2">
                  <Button variant="outline" onClick={() => { setEditingId(null); setEditForm({}) }}>Batal</Button>
                  <Button onClick={() => handleSaveEdit(guest.id)} className="bg-gold text-white">Simpan</Button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredGuests.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {searchTerm ? "Tidak ada tamu yang ditemukan" : "Belum ada tamu. Tambahkan tamu pertama!"}
          </div>
        )}
      </div>
    </div>
  )
}
