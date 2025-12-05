"use client"

import { motion } from "framer-motion"
import type { WeddingSettings } from "@/lib/types"

interface HeroSectionProps {
  settings: WeddingSettings
}

export function HeroSection({ settings }: HeroSectionProps) {
  const weddingDate = new Date(settings.wedding_date)
  const formattedDate = weddingDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - only use hero_image from settings, no fallback to placeholder */}
      {settings.hero_image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${settings.hero_image}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] text-black uppercase mb-6"
        >
          We Are Getting Married
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8 w-full px-2"
        >
          {(() => {
            const longestNameLength = Math.max(settings.groom_name?.length || 10, settings.bride_name?.length || 10)
            const baseScale = Math.min(1, (typeof window !== 'undefined' ? window.innerWidth * 0.85 : 300) / (longestNameLength * 40))
            return (
              <>
                <div className="relative w-full flex justify-center">
                  <h1 
                    className="font-serif text-black font-medium mb-2 leading-tight whitespace-nowrap origin-center"
                    style={{
                      fontSize: '5rem',
                      transform: `scale(${baseScale})`
                    }}
                  >
                    {settings.groom_name}
                  </h1>
                </div>
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-gold my-4">&</p>
                <div className="relative w-full flex justify-center">
                  <h1 
                    className="font-serif text-black font-medium leading-tight whitespace-nowrap origin-center"
                    style={{
                      fontSize: '5rem',
                      transform: `scale(${baseScale})`
                    }}
                  >
                    {settings.bride_name}
                  </h1>
                </div>
              </>
            )
          })()}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="font-serif text-xl md:text-2xl text-foreground/80"
        >
          {formattedDate}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
