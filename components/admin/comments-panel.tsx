"use client"

import { useState, useTransition } from "react"
import type { Comment } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Check, Search, MessageSquare, RefreshCw } from "lucide-react"
import { toggleCommentApproval, deleteComment, getAllComments } from "@/lib/actions"

interface CommentsPanelProps {
  comments: Comment[]
  onUpdate: (comments: Comment[]) => void
}

export function CommentsPanel({ comments, onUpdate }: CommentsPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isPending, startTransition] = useTransition()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    const freshComments = await getAllComments()
    onUpdate(freshComments)
    setIsRefreshing(false)
  }

  const filteredComments = comments.filter(
    (comment) =>
      comment.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const result = await toggleCommentApproval(id, currentStatus)

      if (result.success) {
        onUpdate(comments.map((c) => (c.id === id ? { ...c, is_approved: result.newStatus } : c)))
      }
    })
  }

  const handleDeleteComment = async (id: string) => {
    if (!confirm("Yakin ingin menghapus komentar ini?")) return

    startTransition(async () => {
      const result = await deleteComment(id)

      if (result.success) {
        onUpdate(comments.filter((c) => c.id !== id))
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

  const approvedCount = comments.filter((c) => c.is_approved).length
  const pendingCount = comments.filter((c) => !c.is_approved).length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Komentar & Ucapan</h2>
          <p className="text-muted-foreground mt-1">Kelola ucapan dari tamu</p>
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing} title="Refresh komentar">
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-serif text-foreground">{comments.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-serif text-green-500">{approvedCount}</p>
          <p className="text-xs text-muted-foreground">Disetujui</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-serif text-yellow-500">{pendingCount}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Cari komentar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/50"
        />
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className={`glass rounded-xl p-4 ${!comment.is_approved ? "border-l-4 border-yellow-500" : ""}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{comment.guest_name}</h4>
                  {!comment.is_approved && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-600">Pending</span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-2">{comment.message}</p>
                <p className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleApproval(comment.id, comment.is_approved)}
                  disabled={isPending}
                  className={
                    comment.is_approved
                      ? "text-green-500 hover:text-green-600"
                      : "text-muted-foreground hover:text-green-500"
                  }
                  title={comment.is_approved ? "Batalkan persetujuan" : "Setujui"}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteComment(comment.id)}
                  disabled={isPending}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredComments.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "Tidak ada komentar yang ditemukan" : "Belum ada komentar"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
