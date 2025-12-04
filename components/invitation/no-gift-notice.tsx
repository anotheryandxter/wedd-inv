"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"

export function NoGiftNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-[90%] sm:w-full"
    >
      <div className="glass rounded-2xl p-4 backdrop-blur-md bg-white/30 border border-white/50 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
            <Gift className="w-5 h-5 text-gold" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground/90 leading-relaxed">
              Dengan segala kerendahan hati, kami tidak menerima kado saat acara. Terimakasih
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
