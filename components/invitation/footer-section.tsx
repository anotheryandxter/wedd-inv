"use client"

import { motion } from "framer-motion"
import type { WeddingSettings } from "@/lib/types"
import { Heart } from "lucide-react"

interface FooterSectionProps {
  settings: WeddingSettings
}

export function FooterSection({ settings }: FooterSectionProps) {
  return (
    <footer className="py-16 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/elegant-gold-cream-floral-pattern-wedding-footer.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk
            memberikan doa restu kepada kedua mempelai.
          </p>

          <p className="text-muted-foreground mb-8">Atas kehadiran dan doa restunya kami ucapkan terima kasih.</p>

          <div className="mb-8">
            <p className="text-sm text-gold mb-2">Wassalamualaikum Wr. Wb.</p>
            <p className="font-serif text-2xl text-gold-gradient">
              {settings.groom_name} & {settings.bride_name}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>for our special day</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
