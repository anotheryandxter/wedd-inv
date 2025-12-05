"use client"

import { motion } from "framer-motion"
import type { WeddingSettings } from "@/lib/types"
import { Heart } from "lucide-react"

interface FooterSectionProps {
  settings: WeddingSettings
}

export function FooterSection({ settings }: FooterSectionProps) {
  const closingMessage = settings.closing_message || "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai."
  const copyright = settings.footer_copyright || "Made with ❤ for our special day"
  
  return (
    <footer className="py-16 px-6 relative overflow-hidden">
      {/* Remove hardcoded background - use settings.background_image if needed */}
      {settings.background_image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${settings.background_image}')`,
              opacity: settings.background_opacity ? settings.background_opacity / 100 : 1
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
        </>
      )}

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
            {closingMessage}
          </p>

          <p className="text-muted-foreground mb-8">Atas kehadiran dan doa restunya kami ucapkan terima kasih.</p>

          <div className="mb-8">
            <p className="text-sm text-gold mb-2">Wassalamualaikum Wr. Wb.</p>
            <p className="font-serif text-2xl text-gold-gradient">
              {settings.groom_name} & {settings.bride_name}
            </p>
          </div>

          {/* Social Links */}
          {(settings.footer_social_instagram || settings.footer_social_facebook || settings.footer_social_twitter) && (
            <div className="flex items-center justify-center gap-4 mb-6">
              {settings.footer_social_instagram && (
                <a href={settings.footer_social_instagram} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {settings.footer_social_facebook && (
                <a href={settings.footer_social_facebook} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {settings.footer_social_twitter && (
                <a href={settings.footer_social_twitter} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <span>{copyright}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
