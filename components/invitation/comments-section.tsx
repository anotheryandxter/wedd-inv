"use client"

import type React from "react"
import { useState, useRef, useTransition, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Comment, Guest } from "@/lib/types"
import { Send, MessageCircle, RefreshCw } from "lucide-react"
import { submitComment, getComments } from "@/lib/actions"

interface CommentsSectionProps {
  initialComments: Comment[]
  guest?: Guest | null
  sectionTitle?: string | null
}

export function CommentsSection({ initialComments, guest, sectionTitle }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [name, setName] = useState<string>(guest?.name ?? "")
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const commentsContainerRef = useRef<HTMLDivElement>(null)
  const title = sectionTitle || "Wishes & Comments"

  // If guest prop changes (e.g., when page loads with guest), ensure name is synced
  useEffect(() => {
    if (guest?.name) setName(guest.name)
  }, [guest])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    const freshComments = await getComments()
    setComments(freshComments)
    setIsRefreshing(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    startTransition(async () => {
      const result = await submitComment({
        guest_name: name.trim(),
        message: message.trim(),
      })

      if (result.success) {
        setName("")
        setMessage("")
        // Refresh comments after submission
        const freshComments = await getComments()
        setComments(freshComments)
      }
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">{title}</h2>
        </motion.div>

        {/* Comment Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-6 mb-8"
        >
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-border focus:border-gold focus:outline-none transition-colors placeholder:text-muted-foreground"
                required
                // If guest is known, prevent editing so name matches guest record
                readOnly={!!guest}
              />
            </div>
            <div>
              <textarea
                placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-border focus:border-gold focus:outline-none transition-colors resize-none placeholder:text-muted-foreground"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-gold text-white font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isPending ? "Mengirim..." : "Kirim Ucapan"}
            </button>
          </div>
        </motion.form>

        {/* Comments List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gold" />
              <span className="text-sm text-muted-foreground">{comments.length} ucapan</span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-full hover:bg-gold/10 transition-colors"
              title="Refresh ucapan"
            >
              <RefreshCw className={`w-4 h-4 text-gold ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div ref={commentsContainerRef} className="space-y-4 max-h-96 overflow-y-auto pr-2">
            <AnimatePresence>
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-white/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground">{comment.guest_name}</h4>
                    <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{comment.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>

            {comments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">Belum ada ucapan. Jadilah yang pertama!</div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
