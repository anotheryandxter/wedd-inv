"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Music, Play, Gift } from "lucide-react"

interface MusicPlayerProps {
  musicUrl?: string | null
  hintBoxText?: string | null
}

export function MusicPlayer({ musicUrl, hintBoxText }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hintBoxHeight, setHintBoxHeight] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hintBoxRef = useRef<HTMLDivElement>(null)

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

  // Measure hint box height for dynamic padding
  useEffect(() => {
    const measureHeight = () => {
      if (hintBoxRef.current) {
        const height = hintBoxRef.current.offsetHeight
        setHintBoxHeight(height)
        // Apply padding to body on mobile
        if (window.innerWidth < 768) {
          document.body.style.paddingBottom = `${height + 24}px` // height + 24px gap
        } else {
          document.body.style.paddingBottom = '0px'
        }
      }
    }

    measureHeight()
    window.addEventListener('resize', measureHeight)
    return () => {
      window.removeEventListener('resize', measureHeight)
      document.body.style.paddingBottom = '0px'
    }
  }, [hintBoxText])

  return (
    <>
      <audio ref={audioRef} loop src={musicUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} />
      
      {/* Hint Box - Left Bottom */}
      <motion.div
        ref={hintBoxRef}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 left-6 z-40 max-w-[280px] w-[calc(100vw-96px)] sm:w-auto"
      >
        <div className="glass rounded-2xl p-4 backdrop-blur-md bg-white/95 border border-gold/30 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground/90 leading-relaxed">
                {hintBoxText || "Dengan segala kerendahan hati, kami tidak menerima kado saat acara. Terimakasih ❤️"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Music Button - Right Bottom (Circle) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="fixed bottom-6 right-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="w-14 h-14 rounded-full glass-gold flex items-center justify-center shadow-xl hover:shadow-2xl transition-all"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <div className="relative">
              <Music className="w-6 h-6 text-gold animate-pulse" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-gold/30"
              />
            </div>
          ) : (
            <Play className="w-6 h-6 text-gold ml-0.5" />
          )}
        </motion.button>
      </motion.div>
    </>
  )
}
