"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, ChevronDown } from "lucide-react"
import { 
  generateGoogleCalendarUrl, 
  downloadICSFile, 
  generateOutlookUrl,
  detectPlatform 
} from "@/lib/calendar-utils"

interface CountdownSectionProps {
  countdownDate: string
  backgroundImage?: string | null
  sectionTitle?: string | null
  overlayOpacity?: number | null
  bgMode?: string | null
  bgColor?: string | null
  bgBlur?: number | null
  overlayColor?: string | null
  groomName?: string
  brideName?: string
  akadTime?: string
  akadTimeEnd?: string
  akadLocation?: string
  akadAddress?: string
  receptionTime?: string
  receptionTimeEnd?: string
  receptionLocation?: string
  receptionAddress?: string
  venueMapUrl?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownSection({ 
  countdownDate, 
  backgroundImage, 
  sectionTitle, 
  overlayOpacity,
  bgMode,
  bgColor,
  bgBlur,
  overlayColor,
  groomName,
  brideName,
  akadTime,
  akadTimeEnd,
  akadLocation,
  akadAddress,
  receptionTime,
  receptionTimeEnd,
  receptionLocation,
  receptionAddress,
  venueMapUrl
}: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showCalendarMenu, setShowCalendarMenu] = useState(false)
  const title = sectionTitle || "Save The Date"
  const overlayValue = overlayOpacity !== null && overlayOpacity !== undefined ? overlayOpacity / 100 : 0.8
  const blurValue = bgBlur || 0

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(countdownDate).getTime() - new Date().getTime()

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
  }, [countdownDate])

  const timeBlocks = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ]

  const bgUrl = backgroundImage && backgroundImage.length > 0 ? backgroundImage : '/soft-floral-pattern-cream-gold-wedding-background.jpg'
  const mode = bgMode || 'image'
  const solidColor = bgColor || '#ffffff'
  const finalOverlayColor = overlayColor || '#000000'

  // Function to handle Add to Calendar
  const handleAddToCalendar = (type: 'google' | 'apple' | 'outlook') => {
    const weddingDate = new Date(countdownDate)
    
    // Parse time strings to create proper Date objects
    const parseTime = (timeString?: string) => {
      if (!timeString) return weddingDate
      const [hours, minutes] = timeString.split(':').map(Number)
      const date = new Date(weddingDate)
      date.setHours(hours, minutes, 0, 0)
      return date
    }

    const akadStartDate = parseTime(akadTime)
    const akadEndDate = parseTime(akadTimeEnd) || new Date(akadStartDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours default
    
    const receptionStartDate = parseTime(receptionTime)
    const receptionEndDate = parseTime(receptionTimeEnd) || new Date(receptionStartDate.getTime() + 4 * 60 * 60 * 1000) // 4 hours default

    const eventTitle = `Pernikahan ${groomName || ''} & ${brideName || ''}`
    const eventDescription = `Kami mengundang Anda untuk hadir di pernikahan kami.\n\nAkad Nikah: ${akadTime || ''} - ${akadTimeEnd || ''}\nLokasi: ${akadLocation || ''}\n\nResepsi: ${receptionTime || ''} - ${receptionTimeEnd || ''}\nLokasi: ${receptionLocation || ''}`
    const eventLocation = `${akadLocation || receptionLocation || ''}, ${akadAddress || receptionAddress || ''}`
    const invitationUrl = typeof window !== 'undefined' ? window.location.href : ''

    const calendarData = {
      title: eventTitle,
      description: eventDescription,
      location: eventLocation,
      startDate: akadStartDate,
      endDate: receptionEndDate,
      url: invitationUrl,
    }

    switch (type) {
      case 'google':
        window.open(generateGoogleCalendarUrl(calendarData), '_blank')
        break
      case 'apple':
        downloadICSFile(calendarData, 'wedding-invitation.ics')
        break
      case 'outlook':
        window.open(generateOutlookUrl(calendarData), '_blank')
        break
    }
    
    setShowCalendarMenu(false)
  }

  const platform = typeof window !== 'undefined' ? detectPlatform() : 'other'

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {mode === 'solid' ? (
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: solidColor,
            filter: blurValue > 0 ? `blur(${blurValue}px)` : 'none'
          }} 
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('${bgUrl}')`,
            filter: blurValue > 0 ? `blur(${blurValue}px)` : 'none'
          }}
        />
      )}
      
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: finalOverlayColor,
          opacity: overlayValue 
        }} 
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">{title}</h2>
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

        {/* Add to Calendar Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 relative"
        >
          <button
            onClick={() => setShowCalendarMenu(!showCalendarMenu)}
            className="glass rounded-full px-6 py-3 flex items-center gap-2 mx-auto hover:bg-white/20 transition-all duration-300 group"
          >
            <Calendar className="w-5 h-5 text-gold" />
            <span className="text-foreground font-medium">Simpan ke Kalender</span>
            <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${showCalendarMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Calendar Options Menu */}
          {showCalendarMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass rounded-2xl p-2 min-w-[200px] shadow-xl z-20"
            >
              <button
                onClick={() => handleAddToCalendar('google')}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/20 transition-colors text-foreground flex items-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.5 3h-15A2.5 2.5 0 0 0 2 5.5v13A2.5 2.5 0 0 0 4.5 21h15a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 19.5 3zm-15 1.5h15a1 1 0 0 1 1 1V7h-17V5.5a1 1 0 0 1 1-1zM4.5 19.5a1 1 0 0 1-1-1v-10h17v10a1 1 0 0 1-1 1h-15z"/>
                  <path d="M9 14h6v1.5H9z"/>
                </svg>
                <span>Google Calendar</span>
              </button>
              
              <button
                onClick={() => handleAddToCalendar('apple')}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/20 transition-colors text-foreground flex items-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span>Apple Calendar</span>
              </button>
              
              <button
                onClick={() => handleAddToCalendar('outlook')}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/20 transition-colors text-foreground flex items-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 22h10c1.1 0 2-.9 2-2V8l-6-6H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2zm5-18l5 5h-5V4z"/>
                  <path d="M9 14h6v1.5H9z"/>
                </svg>
                <span>Outlook Calendar</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
