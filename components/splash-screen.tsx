"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SplashScreenProps {
  groomName: string
  brideName: string
  guestName?: string
  onOpen: () => void
}
interface SplashExtra {
  splashImage?: string | null
  overlayOpacity?: number | null
  overlayMode?: 'light' | 'dark' | 'custom' | null
  overlayColor?: string | null
}

export function SplashScreen({ groomName, brideName, guestName, onOpen, splashImage, overlayOpacity, overlayMode, overlayColor }: SplashScreenProps & SplashExtra) {
  const [isVisible, setIsVisible] = useState(true)
  const [guestCode, setGuestCode] = useState("")

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Background with overlay (use an <img> to avoid background-repeat/tiling issues in some browsers) */}
          <div className="absolute inset-0 bg-[#FAF8F5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={splashImage || '/elegant-floral-wedding-background-with-soft-cream-.jpg'}
              srcSet={
                `${(splashImage || '/elegant-floral-wedding-background-with-soft-cream-.jpg')} 800w, ` +
                `${(splashImage || '/elegant-floral-wedding-background-with-soft-cream-.jpg')} 1200w, ` +
                `${(splashImage || '/elegant-floral-wedding-background-with-soft-cream-.jpg')} 1600w, ` +
                `${(splashImage || '/elegant-floral-wedding-background-with-soft-cream-.jpg')} 2400w`
              }
              sizes="100vw"
              alt=""
              className="w-full h-full object-cover block z-0"
              style={{ objectPosition: 'center center' }}
              decoding="async"
              loading="eager"
            />
            <div
              className="absolute inset-0 z-10"
              style={(() => {
                const opacity = typeof overlayOpacity === 'number' ? overlayOpacity : 0.8
                if ((overlayMode || 'light') === 'custom' && overlayColor) {
                  // custom solid color overlay
                  return { backgroundColor: overlayColor, opacity }
                }
                if ((overlayMode || 'light') === 'dark') {
                  // darker translucent overlay
                  return { background: `linear-gradient(to bottom, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${Math.max(0.6, opacity)}) 100%)` }
                }
                // default: soft cream gradient
                return { background: 'linear-gradient(to bottom, #FAF8F5 0%, #FAF8F5 100%)', opacity }
              })()}
            />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center px-6 w-full max-w-[92vw] sm:max-w-2xl"
          >
            {/* Wedding invitation text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm tracking-[0.3em] text-gold uppercase mb-4"
            >
              The Wedding Of
            </motion.p>

            {/* Couple names */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-6 w-full px-4"
            >
              <h1 
                className="font-serif text-gold-gradient font-medium leading-tight whitespace-nowrap px-2"
                style={{
                  fontSize: `clamp(1.25rem, calc(${(groomName?.length || 10) > 20 ? '70' : (groomName?.length || 10) > 15 ? '80' : '90'}vw / ${groomName?.length || 10}), 4rem)`
                }}
              >
                {groomName}
              </h1>
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-gold my-2">&</p>
              <h1 
                className="font-serif text-gold-gradient font-medium leading-tight whitespace-nowrap px-2"
                style={{
                  fontSize: `clamp(1.25rem, calc(${(brideName?.length || 10) > 20 ? '70' : (brideName?.length || 10) > 15 ? '80' : '90'}vw / ${brideName?.length || 10}), 4rem)`
                }}
              >
                {brideName}
              </h1>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-8"
            />

            {/* Guest greeting */}
            {guestName && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="glass rounded-2xl px-6 py-4 mb-8"
              >
                <p className="text-sm text-muted-foreground mb-1">Kepada Yth.</p>
                <p className="font-serif text-xl text-foreground">{guestName}</p>
              </motion.div>
            )}

            {/* If guestName exists show Open button; otherwise show admin login + guest code input */}
            {guestName ? (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsVisible(false)
                  onOpen()
                }}
                className="glass-gold px-8 py-4 rounded-full flex items-center gap-3 group"
              >
                <svg
                  className="w-5 h-5 text-gold group-hover:animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
                <span className="text-gold font-medium">Buka Undangan</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex gap-2">
                  <a href="/admin/login" className="glass-gold px-6 py-3 rounded-full flex items-center gap-2 text-gold font-medium">
                    Admin Login
                  </a>
                </div>

                <div className="glass rounded-xl px-4 py-3 flex items-center gap-2">
                  <input
                    value={guestCode}
                    onChange={(e) => setGuestCode(e.target.value)}
                    placeholder="Masukkan kode/slug tamu"
                    className="bg-white/50 px-3 py-2 rounded-md"
                  />
                  <button
                    onClick={() => {
                      const v = (guestCode || '').trim()
                      if (!v) return alert('Masukkan kode atau slug tamu')
                      // navigate to home with ?to=slug so server fetches guest
                      window.location.href = `/?to=${encodeURIComponent(v)}`
                    }}
                    className="bg-gold hover:bg-gold/90 text-white px-4 py-2 rounded-md"
                  >
                    Cek Undangan
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
