"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import type { Guest } from "@/lib/types"
import { Check, X, Users } from "lucide-react"
import { updateRSVP } from "@/lib/actions"

interface RSVPSectionProps {
  guest: Guest | null
  sectionTitle?: string | null
}

export function RSVPSection({ guest, sectionTitle }: RSVPSectionProps) {
  const [attendance, setAttendance] = useState<string>(guest?.attendance_status || "pending")
  const [guestCount, setGuestCount] = useState<number>(guest?.guest_count || 1)
  const [isPending, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const title = sectionTitle || "RSVP"

  const handleSubmit = async () => {
    if (!guest) return

    startTransition(async () => {
      const result = await updateRSVP(guest.id, attendance, guestCount)
      if (result.success) {
        setIsSubmitted(true)
      }
    })
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/elegant-cream-gold-floral-pattern-subtle-backgroun.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">{title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8"
        >
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">Terima Kasih!</h3>
              <p className="text-muted-foreground">Konfirmasi kehadiran Anda telah kami terima.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {guest && (
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">Halo,</p>
                  <p className="font-serif text-xl text-foreground">{guest.name}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Apakah Anda akan hadir?</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAttendance("attending")}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      attendance === "attending" ? "border-gold bg-gold/10" : "border-border hover:border-gold/50"
                    }`}
                  >
                    <Check
                      className={`w-6 h-6 ${attendance === "attending" ? "text-gold" : "text-muted-foreground"}`}
                    />
                    <span className={attendance === "attending" ? "text-gold font-medium" : "text-muted-foreground"}>
                      Ya, Saya Hadir
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance("not_attending")}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      attendance === "not_attending" ? "border-gold bg-gold/10" : "border-border hover:border-gold/50"
                    }`}
                  >
                    <X
                      className={`w-6 h-6 ${attendance === "not_attending" ? "text-gold" : "text-muted-foreground"}`}
                    />
                    <span
                      className={attendance === "not_attending" ? "text-gold font-medium" : "text-muted-foreground"}
                    >
                      Maaf, Tidak Bisa
                    </span>
                  </button>
                </div>
              </div>

              {attendance === "attending" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-3">Jumlah Tamu</label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:bg-gold/10 transition-colors"
                    >
                      -
                    </button>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gold" />
                      <span className="font-serif text-2xl text-foreground w-8 text-center">{guestCount}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(5, guestCount + 1))}
                      className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:bg-gold/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isPending || attendance === "pending"}
                className="w-full py-4 rounded-xl bg-gold text-white font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Mengirim..." : "Konfirmasi"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
