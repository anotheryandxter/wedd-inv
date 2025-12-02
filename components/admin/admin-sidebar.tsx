"use client"

import type { User } from "@supabase/supabase-js"
import type { AdminTab } from "@/components/admin/admin-dashboard"
import { Settings, Users, ImageIcon, MessageSquare, LogOut, ExternalLink } from "lucide-react"

interface AdminSidebarProps {
  user: User
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
  onLogout: () => void
  stats: {
    guests: number
    attending: number
    gallery: number
    comments: number
  }
}

export function AdminSidebar({ user, activeTab, onTabChange, onLogout, stats }: AdminSidebarProps) {
  const menuItems = [
    { id: "settings" as AdminTab, label: "Pengaturan", icon: Settings },
    { id: "guests" as AdminTab, label: "Daftar Tamu", icon: Users, badge: stats.guests },
    { id: "gallery" as AdminTab, label: "Galeri", icon: ImageIcon, badge: stats.gallery },
    { id: "comments" as AdminTab, label: "Komentar", icon: MessageSquare, badge: stats.comments },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="font-serif text-xl text-gold-gradient">Wedding Admin</h1>
        <p className="text-sm text-muted-foreground mt-1 truncate">{user.email}</p>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-2xl font-serif text-gold">{stats.attending}</p>
            <p className="text-xs text-muted-foreground">Hadir</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-2xl font-serif text-gold">{stats.guests}</p>
            <p className="text-xs text-muted-foreground">Total Tamu</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id
                ? "bg-gold/10 text-gold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
            {item.badge !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === item.id ? "bg-gold text-white" : "bg-muted"
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <ExternalLink className="w-5 h-5" />
          <span>Lihat Undangan</span>
        </a>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  )
}
