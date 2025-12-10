"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Music, Play, Gift } from "lucide-react"

interface MusicPlayerProps {
  musicUrl?: string | null
}

export function MusicPlayer({ musicUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
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
      
      {/* Single Floating Hint Box - Always Visible with Gift Notice + Music Control */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="glass rounded-2xl p-4 backdrop-blur-md bg-white/95 border border-gold/30 shadow-xl max-w-[280px]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground/90 leading-relaxed mb-3">
                Dengan segala kerendahan hati, kami tidak menerima kado saat acara. Terimakasih ❤️
              </p>
              
              {/* Music Control Button Inside Hint Box */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-full py-2 px-4 rounded-xl glass-gold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? (
                  <>
                    <Music className="w-5 h-5 text-gold animate-pulse" />
                    <span className="text-sm font-medium text-gold">Pause Musik</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 text-gold" />
                    <span className="text-sm font-medium text-gold">Play Musik</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
