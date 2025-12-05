"use client"

import { motion } from "framer-motion"
import type { WeddingSettings } from "@/lib/types"

interface QuoteSectionProps {
  settings: WeddingSettings
}

export function QuoteSection({ settings }: QuoteSectionProps) {
  const title = settings.section_title_bismillah || "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
  
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-gold mb-8">{title}</h2>
          
          <svg className="w-10 h-10 text-gold/50 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <div 
            className="font-serif text-lg md:text-xl text-foreground/80 italic leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: settings.quote || '' }}
          />

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />

          <p className="text-sm text-gold font-medium">{settings.quote_source}</p>
        </motion.div>
      </div>
    </section>
  )
}
