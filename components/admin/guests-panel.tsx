"use client"

import { useState, useTransition, useRef } from "react"
import type { Guest } from "@/lib/types"
import type { WeddingSettings } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Plus, Trash2, Search, Copy, UserCheck, UserX, Clock, Users, Loader2, Send } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
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
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [csvHeaders, setCsvHeaders] = useState<string[] | null>(null)
  const [csvRows, setCsvRows] = useState<string[][]>([])
  const [hasHeaderRow, setHasHeaderRow] = useState(true)
  const [columnMap, setColumnMap] = useState<{ name?: number | null; phone?: number | null }>({})
  const [fileToImport, setFileToImport] = useState<File | null>(null)
  const { toast } = useToast()

  function parseCSV(text: string) {
    const rows: string[][] = []
    let cur = ''
    let row: string[] = []
    let inQuotes = false
    for (let i = 0; i < text.length; i++) {
      const ch = text[i]
      if (ch === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"'
          i++
          continue
        }
        inQuotes = !inQuotes
        continue
      }
      if (ch === ',' && !inQuotes) {
        row.push(cur)
        cur = ''
        continue
      }
      if ((ch === '\n' || ch === '\r') && !inQuotes) {
        if (cur !== '' || row.length > 0) {
          row.push(cur)
          rows.push(row)
          row = []
          cur = ''
        }
        continue
      }
      cur += ch
    }
    if (cur !== '' || row.length > 0) {
      row.push(cur)
      rows.push(row)
    }
    return rows
  }

  const filteredGuests = guests.filter((guest) => {
    const q = searchTerm.toLowerCase()
    return (
      (guest.name || "").toLowerCase().includes(q) ||
      (guest.phone || "").toLowerCase().includes(q)
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
    focusNameInput(guest.id)
  }
  
  // focus the name input after entering edit mode
  const focusNameInput = (id: string) => {
    setTimeout(() => {
      try {
        const el = document.getElementById(`guest-name-input-${id}`) as HTMLInputElement | null
        if (el) el.focus()
      } catch (e) {
        // ignore
      }
    }, 50)
  }

  const handleSaveEdit = async (id: string) => {
    startTransition(async () => {
      const payload: any = {
        name: editForm.name,
        phone: editForm.phone,
        guest_count: editForm.guest_count,
        attendance_status: editForm.attendance_status,
      }

      const result = await updateGuest(id, payload)
      if (result.success && result.data) {
        const old = guests.find((g) => g.id === id)
        onUpdate(guests.map((g) => (g.id === id ? result.data : g)))
        setEditingId(null)
        setEditForm({})
        // notify if slug changed
        try {
          const newSlug = result.data.unique_slug || result.data.slug
          const oldSlug = old?.unique_slug || old?.slug
          if (newSlug && oldSlug && newSlug !== oldSlug) {
            const link = `${typeof window !== 'undefined' ? window.location.origin : ''}?to=${newSlug}`
            toast({
              title: 'Link undangan diperbarui',
              description: (
                <span className="truncate block">Link baru disalin atau buka langsung.</span>
              ),
              action: (
                <ToastAction asChild>
                  <button
                    className="inline-flex h-8 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium"
                    onClick={() => {
                      try {
                        navigator.clipboard.writeText(link)
                        alert('Link disalin ke clipboard')
                      } catch (e) {
                        // ignore
                      }
                    }}
                  >
                    Salin Link
                  </button>
                </ToastAction>
              ),
            })
          }
        } catch (e) {
          // ignore toast errors
        }
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

  const doImport = async () => {
    if (!fileToImport) return alert('File tidak tersedia')
    setIsImporting(true)
    try {
      const fd = new FormData()
      fd.append('file', fileToImport)
      const res = await fetch('/api/admin/guests/import', { method: 'POST', body: fd })
      const json = await res.json()
      if (!json.success) {
        alert(json.error || 'Import gagal')
      } else {
        alert(`Berhasil import ${json.imported || 0} tamu`)
        if (json.data) onUpdate(json.data)
        setPreviewOpen(false)
      }
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan saat import')
    } finally {
      setIsImporting(false)
      setFileToImport(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

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
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              setFileToImport(f)
              try {
                const text = await f.text()
                const rows = parseCSV(text)
                if (rows.length === 0) return alert('CSV kosong atau tidak terbaca')

                // detect header
                const first = rows[0].map((c) => c.trim().toLowerCase())
                const hasHeader = first.some((h) => ['name', 'nama', 'phone', 'nomor', 'hp', 'nomor_hp'].includes(h))
                setHasHeaderRow(hasHeader)

                const headers = hasHeader ? rows[0].map((c) => c.trim()) : rows[0].map((_, i) => `Column ${i + 1}`)
                const dataRows = hasHeader ? rows.slice(1) : rows
                setCsvHeaders(headers)
                setCsvRows(dataRows)

                // default mapping: try to find name/phone by header, else first/second
                let nameIdx: number | null = null
                let phoneIdx: number | null = null
                if (hasHeader) {
                  headers.forEach((h, idx) => {
                    const key = h.trim().toLowerCase()
                    if (['name', 'nama'].includes(key) && nameIdx == null) nameIdx = idx
                    if (['phone', 'nomor', 'hp', 'nomor_hp'].includes(key) && phoneIdx == null) phoneIdx = idx
                  })
                }
                if (nameIdx == null) nameIdx = 0
                if (phoneIdx == null) phoneIdx = Math.min(1, headers.length - 1)
                setColumnMap({ name: nameIdx, phone: phoneIdx })
                setPreviewOpen(true)
              } catch (err) {
                console.error(err)
                alert('Gagal membaca file CSV')
                setFileToImport(null)
              }
            }}
          />
          <Button onClick={() => fileInputRef.current?.click()} className="bg-gold hover:bg-gold/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Import CSV
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

      {/* CSV Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={(v) => setPreviewOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview CSV sebelum import</DialogTitle>
            <DialogDescription>Periksa kolom dan contoh baris. Sesuaikan pemetaan kolom sebelum mengimpor.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={hasHeaderRow} onChange={(e) => setHasHeaderRow(e.target.checked)} />
                <span className="text-sm text-muted-foreground">Baris pertama adalah header</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Kolom Nama</Label>
                <select
                  className="w-full bg-background border rounded p-2"
                  value={columnMap.name ?? 0}
                  onChange={(e) => setColumnMap((p) => ({ ...p, name: Number(e.target.value) }))}
                >
                  {(csvHeaders || []).map((h, i) => (
                    <option key={i} value={i}>{h || `Kolom ${i + 1}`}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Kolom Telepon</Label>
                <select
                  className="w-full bg-background border rounded p-2"
                  value={columnMap.phone ?? 0}
                  onChange={(e) => setColumnMap((p) => ({ ...p, phone: Number(e.target.value) }))}
                >
                  {(csvHeaders || []).map((h, i) => (
                    <option key={i} value={i}>{h || `Kolom ${i + 1}`}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-auto max-h-64 border rounded">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Nama</th>
                    <th className="p-2 text-left">Telepon</th>
                    <th className="p-2 text-left">Raw</th>
                  </tr>
                </thead>
                <tbody>
                  {(csvRows || []).slice(0, 10).map((r, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-slate-50">
                      <td className="p-2 align-top">{idx + 1}</td>
                      <td className="p-2 align-top">{r[columnMap.name ?? 0] ?? ''}</td>
                      <td className="p-2 align-top">{r[columnMap.phone ?? 1] ?? ''}</td>
                      <td className="p-2 align-top text-xs text-muted-foreground truncate">{r.join(' | ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setPreviewOpen(false); setFileToImport(null); if (fileInputRef.current) fileInputRef.current.value = '' }}>Batal</Button>
            <Button onClick={doImport} className="bg-gold hover:bg-gold/90 text-white">
              {isImporting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Import'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                    <h4 className="font-medium text-foreground truncate cursor-pointer" onDoubleClick={() => handleStartEdit(guest)} title="Klik dua kali untuk edit">{guest.name}</h4>
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
                  <Input id={`guest-name-input-${guest.id}`} value={(editForm.name as string) || ''} onChange={(e) => setEditForm((p) => ({ ...(p || {}), name: e.target.value }))} onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(guest.id) }} />
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
