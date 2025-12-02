"use client"

import { motion } from "framer-motion"
import type { WeddingSettings } from "@/lib/types"

interface CoupleSectionProps {
  settings: WeddingSettings
}

export function CoupleSection({ settings }: CoupleSectionProps) {
  
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] text-gold uppercase mb-2">Bismillahirrahmanirrahim</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Mempelai</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 text-center"
          >
            <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold/30 bg-muted flex items-center justify-center">
              {settings.groom_photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.groom_photo} alt={settings.groom_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" aria-hidden />
              )}
            </div>
            <h3 className="font-serif text-2xl text-gold-gradient mb-2">{settings.groom_name}</h3>
            <p className="text-muted-foreground mb-4">Putra dari</p>
            <p className="text-foreground">Bapak {settings.groom_father}</p>
            <p className="text-foreground">& Ibu {settings.groom_mother}</p>
          </motion.div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 text-center"
          >
            <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold/30 bg-muted flex items-center justify-center">
              {settings.bride_photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.bride_photo} alt={settings.bride_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" aria-hidden />
              )}
            </div>
            <h3 className="font-serif text-2xl text-gold-gradient mb-2">{settings.bride_name}</h3>
            <p className="text-muted-foreground mb-4">Putri dari</p>
            <p className="text-foreground">Bapak {settings.bride_father}</p>
            <p className="text-foreground">& Ibu {settings.bride_mother}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
