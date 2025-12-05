"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"

export function NoGiftNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-20 left-4 right-4 sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-30 max-w-md sm:w-full"
    >
      <div className="glass rounded-2xl p-3 sm:p-4 backdrop-blur-md bg-white/30 border border-white/50 shadow-xl">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
              Dengan segala kerendahan hati, kami tidak menerima kado saat acara. Terimakasih
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
