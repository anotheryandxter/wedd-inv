"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { GalleryItem } from "@/lib/types"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GallerySectionProps {
  images: GalleryItem[]
}

export function GallerySection({ images }: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  // shuffle and pick images for display on the invitation
  const displayedImages = useMemo(() => {
    const src = images && images.length > 0 ? images.slice() : []
    // Fisher-Yates shuffle
    for (let i = src.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = src[i]
      src[i] = src[j]
      src[j] = tmp
    }
    return src.slice(0, 9) // Take 9 images
  }, [images])

  const defaultImages: GalleryItem[] =
    displayedImages.length > 0
      ? displayedImages
      : [
          { id: "1", image_url: "/romantic-couple-prewedding-photo-outdoor-nature.jpg", caption: "Our Journey", sort_order: 0, created_at: "" },
          { id: "2", image_url: "/elegant-couple-engagement-photo-studio.jpg", caption: "Engagement", sort_order: 1, created_at: "" },
          { id: "3", image_url: "/couple-holding-hands-sunset-romantic.jpg", caption: "Together", sort_order: 2, created_at: "" },
          { id: "4", image_url: "/couple-laughing-happy-candid-moment.jpg", caption: "Joy", sort_order: 3, created_at: "" },
          { id: "5", image_url: "/couple-traditional-indonesian-wedding-attire.jpg", caption: "Traditional", sort_order: 4, created_at: "" },
          { id: "6", image_url: "/couple-looking-at-each-other-romantic-gaze.jpg", caption: "Love", sort_order: 5, created_at: "" },
        ]

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)
  const goNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % defaultImages.length : 0))
  const goPrev = () =>
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + defaultImages.length) % defaultImages.length : 0))

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] text-gold uppercase mb-2">Our Gallery</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Galeri Foto</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {defaultImages.slice(0, 8).map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square cursor-pointer group overflow-hidden rounded-2xl"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.image_url || "/placeholder.svg"}
                alt={image.caption || `Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{image.caption}</p>
              </div>
            </motion.div>
          ))}
          {/* Show 9th image only on tablet/desktop */}
          {defaultImages[8] && (
            <motion.div
              key={defaultImages[8].id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 8 * 0.1 }}
              className="hidden md:block relative aspect-square cursor-pointer group overflow-hidden rounded-2xl"
              onClick={() => openLightbox(8)}
            >
              <img
                src={defaultImages[8].image_url || "/placeholder.svg"}
                alt={defaultImages[8].caption || "Gallery 9"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{defaultImages[8].caption}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={defaultImages[selectedIndex].image_url}
                alt={defaultImages[selectedIndex].caption || ""}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
