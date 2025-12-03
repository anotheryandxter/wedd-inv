"use client"

import { motion } from "framer-motion"
import type { WeddingSettings } from "@/lib/types"
import { Calendar, Clock, MapPin, HeartHandshake, Flower2 } from "lucide-react"

interface EventSectionProps {
  settings: WeddingSettings
}

export function EventSection({ settings }: EventSectionProps) {
  const weddingDate = new Date(settings.wedding_date)
  const formattedDate = weddingDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] text-gold uppercase mb-2">Wedding Event</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Acara Pernikahan</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Akad */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-2xl text-foreground mb-6">Akad Nikah</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5 text-gold" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-gold" />
                <span>{settings.akad_time} WIB - Selesai</span>
              </div>
              <div className="flex items-start justify-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{settings.akad_location}</p>
                  <p className="text-sm">{settings.akad_address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Resepsi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
              <Flower2 className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-2xl text-foreground mb-6">Resepsi</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5 text-gold" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-gold" />
                <span>{settings.reception_time} WIB - Selesai</span>
              </div>
              <div className="flex items-start justify-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{settings.reception_location}</p>
                  <p className="text-sm">{settings.reception_address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-3xl overflow-hidden"
        >
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${settings.venue_lat},${settings.venue_lng}&zoom=15`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Venue"
          />
          <div className="p-4 text-center">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${settings.venue_lat},${settings.venue_lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass-gold rounded-full text-gold font-medium hover:opacity-90 transition-opacity"
            >
              <MapPin className="w-5 h-5" />
              Buka di Google Maps
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
