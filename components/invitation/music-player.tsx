"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Play, Gift, X } from "lucide-react"

interface MusicPlayerProps {
  musicUrl?: string | null
}

export function MusicPlayer({ musicUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showGiftNotice, setShowGiftNotice] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleGiftNotice = () => {
    setShowGiftNotice(!showGiftNotice)
  }

  // Auto-play when component mounts (after splash screen)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // Autoplay blocked by browser
            setIsPlaying(false)
          })
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <audio ref={audioRef} loop src={musicUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} />
      
      {/* Integrated Music + Gift Notice Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      >
        {/* Gift Notice Popup */}
        <AnimatePresence>
          {showGiftNotice && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: 10 }}
              className="glass rounded-2xl p-4 backdrop-blur-md bg-white/95 border border-gold/30 shadow-xl max-w-[280px] relative"
            >
              <button
                onClick={() => setShowGiftNotice(false)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full hover:bg-gold/10 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gold" />
              </button>
              <div className="flex items-start gap-3 pr-6">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Dengan segala kerendahan hati, kami tidak menerima kado saat acara. Terimakasih ❤️
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons Container */}
        <div className="flex items-center gap-2">
          {/* Gift Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleGiftNotice}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
              showGiftNotice ? 'glass-gold' : 'glass'
            }`}
            aria-label="Gift notice"
          >
            <Gift className={`w-5 h-5 ${showGiftNotice ? 'text-gold' : 'text-gold/70'}`} />
          </motion.button>

          {/* Music Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-14 h-14 rounded-full glass-gold flex items-center justify-center shadow-lg"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <div className="relative">
                <Music className="w-6 h-6 text-gold animate-pulse" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 rounded-full border-2 border-gold/30"
                />
              </div>
            ) : (
              <Play className="w-6 h-6 text-gold ml-1" />
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
