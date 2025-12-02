"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownSectionProps {
  weddingDate: string
  backgroundImage?: string | null
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownSection({ weddingDate, backgroundImage }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(weddingDate).getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [weddingDate])

  const timeBlocks = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ]

  const bgUrl = backgroundImage && backgroundImage.length > 0 ? backgroundImage : '/soft-floral-pattern-cream-gold-wedding-background.jpg'

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('${bgUrl}')`,
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-sm tracking-[0.2em] text-gold uppercase mb-2">Save The Date</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Menghitung Hari</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto"
        >
          {timeBlocks.map((block, index) => (
            <div key={block.label} className="glass rounded-2xl p-4 md:p-6">
              <motion.span
                key={block.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="block font-serif text-3xl md:text-5xl text-gold-gradient font-medium"
              >
                {String(block.value).padStart(2, "0")}
              </motion.span>
              <span className="text-xs md:text-sm text-muted-foreground mt-2 block">{block.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
