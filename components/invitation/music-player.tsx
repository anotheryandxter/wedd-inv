"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Music, Play } from "lucide-react"

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
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full glass-gold flex items-center justify-center shadow-lg"
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
    </>
  )
}
