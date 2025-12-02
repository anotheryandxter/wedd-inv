"use client"

import { useState, useTransition } from "react"
import type { GalleryItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Loader2, ImageIcon } from "lucide-react"
import { addGalleryItem, deleteGalleryItem, updateGalleryItem } from "@/lib/actions"

interface GalleryPanelProps {
  gallery: GalleryItem[]
  onUpdate: (gallery: GalleryItem[]) => void
}

export function GalleryPanel({ gallery, onUpdate }: GalleryPanelProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [newImage, setNewImage] = useState({ image_url: "", caption: "" })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null)

  const handleAddImage = async () => {
    if (!newImage.image_url.trim()) return
    if (gallery.length >= 30) return alert('Batas maksimal 30 foto')

    startTransition(async () => {
      const result = await addGalleryItem(newImage.image_url, newImage.caption)

      if (result.success && result.data) {
        onUpdate([...gallery, result.data])
        setNewImage({ image_url: "", caption: "" })
        setIsAdding(false)
      }
    })
  }

  const handleFileChange = async (file?: File | null) => {
    // single file support kept: wrap into handler for multiple
    if (!file) return
    await handleFilesChange([file])
  }

  const handleFilesChange = async (files?: FileList | File[] | null) => {
    if (!files) return
    const list = Array.from(files as any)
    if (list.length === 0) return
    const available = 30 - gallery.length
    if (available <= 0) return alert('Batas maksimal 30 foto tercapai')

    let toUpload = list
    if (list.length > available) {
      toUpload = list.slice(0, available)
      alert(`Hanya ${available} file yang akan diunggah (batas 30 foto).`)
    }

    setIsUploading(true)
    setUploadProgress({ done: 0, total: toUpload.length })

    const newGallery = [...gallery]

    for (let i = 0; i < toUpload.length; i += 1) {
      const f = toUpload[i]
      try {
        // compress image to <= 1MB before upload
        const compressed = await compressImageToMaxSize(f, 1_000_000)
        const fd = new FormData()
        fd.append('file', compressed, compressed.name || f.name)
        fd.append('filename', compressed.name || f.name)
        fd.append('folder', 'gallery')

        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const json = await res.json()
        if (!json.success) throw new Error(json.error || 'Upload gagal')
        const url = json.publicUrl || json.publicURL || json.public_url
        if (!url) throw new Error('No url returned')

        // create gallery item on the server
        // call addGalleryItem server action
        // eslint-disable-next-line no-await-in-loop
        const r = await addGalleryItem(url, '')
        if (r.success && r.data) {
          newGallery.push(r.data)
          // update parent progressively
          onUpdate(newGallery.slice())
        }
      } catch (err) {
        console.error('batch upload error', err)
        // continue with next file
      } finally {
        setUploadProgress((prev) => ({ done: (prev?.done || 0) + 1, total: prev?.total || 0 }))
      }
    }

    setIsUploading(false)
    setUploadProgress(null)
    setIsAdding(false)
    setNewImage({ image_url: '', caption: '' })
  }

  // --- Image compression helper ---
  async function compressImageToMaxSize(file: File, maxBytes: number): Promise<File> {
    if (file.size <= maxBytes) return file
    // create image bitmap
    const imgBitmap = await createImageBitmap(file)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    // set initial dimensions
    let width = imgBitmap.width
    let height = imgBitmap.height

    // scale down if very large
    const maxDim = Math.max(width, height)
    if (maxDim > 2000) {
      const ratio = 2000 / maxDim
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)
    }

    canvas.width = width
    canvas.height = height
    ctx.drawImage(imgBitmap, 0, 0, width, height)

    // try decreasing quality until size fits or quality low
    let quality = 0.92
    for (let i = 0; i < 6; i += 1) {
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve as any, 'image/jpeg', quality))
      if (!blob) break
      if (blob.size <= maxBytes) {
        return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' })
      }
      // reduce dimensions slightly and quality
      quality = Math.max(0.5, quality - 0.15)
      // scale down canvas for next iteration
      width = Math.round(width * 0.9)
      height = Math.round(height * 0.9)
      const tmpCanvas = document.createElement('canvas')
      tmpCanvas.width = width
      tmpCanvas.height = height
      tmpCanvas.getContext('2d')!.drawImage(canvas, 0, 0, width, height)
      // copy back
      canvas.width = width
      canvas.height = height
      ctx.drawImage(tmpCanvas, 0, 0)
    }

    // fallback: return original (may be > maxBytes)
    return file
  }

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return

    startTransition(async () => {
      const result = await deleteGalleryItem(id)

      if (result.success) {
        onUpdate(gallery.filter((g) => g.id !== id))
      }
    })
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Galeri Foto</h2>
          <p className="text-muted-foreground mt-1">Kelola foto-foto pernikahan</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-gold hover:bg-gold/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Foto
        </Button>
      </div>

      {/* Add Image Form */}
      {isAdding && (
        <div className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-medium text-foreground mb-4">Tambah Foto Baru</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Unggah / URL Gambar *</Label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFilesChange(e.target.files)}
                />
                <Input
                  value={newImage.image_url}
                  onChange={(e) => setNewImage((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="bg-white/50"
                />
              </div>
              {isUploading && (
                <p className="text-sm text-muted-foreground">
                  Mengunggah {uploadProgress?.done ?? 0}/{uploadProgress?.total ?? ''}...
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Caption</Label>
              <Input
                value={newImage.caption}
                onChange={(e) => setNewImage((prev) => ({ ...prev, caption: e.target.value }))}
                placeholder="Deskripsi foto"
                className="bg-white/50"
              />
            </div>
            {newImage.image_url && (
              <div className="aspect-video w-full max-w-sm rounded-lg overflow-hidden bg-muted">
                <img
                  src={newImage.image_url || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/image-preview-concept.png"
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAdding(false)
                setNewImage({ image_url: "", caption: "" })
              }}
            >
              Batal
            </Button>
            <Button
              onClick={handleAddImage}
              disabled={isPending || !newImage.image_url.trim()}
              className="bg-gold hover:bg-gold/90 text-white"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan"}
            </Button>
          </div>
        </div>
      )}

      {/* Gallery Grid - limit to 9 */}
      <div className="grid grid-cols-3 gap-4">
        {gallery.slice(0, 9).map((image) => (
          <div key={image.id} className="group relative aspect-square rounded-xl overflow-hidden glass">
            <img
              src={image.image_url || "/placeholder.svg"}
              alt={image.caption || "Gallery image"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newCaption = prompt('Edit caption:', image.caption || '')
                    if (newCaption !== null) {
                      startTransition(async () => {
                        const r = await updateGalleryItem(image.id, { caption: newCaption })
                        if (r.success && r.data) {
                          onUpdate(gallery.map((g) => (g.id === image.id ? r.data : g)))
                        }
                      })
                    }
                  }}
                >
                  ✏️
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteImage(image.id)}
                  disabled={isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-sm truncate">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {gallery.length === 0 && !isAdding && (
        <div className="text-center py-16">
          <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">Belum ada foto. Tambahkan foto pertama!</p>
        </div>
      )}
    </div>
  )
}
