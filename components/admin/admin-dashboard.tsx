"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import type { WeddingSettings, Guest, GalleryItem, Comment } from "@/lib/types"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SettingsPanel } from "@/components/admin/settings-panel"
import { GuestsPanel } from "@/components/admin/guests-panel"
import { GalleryPanel } from "@/components/admin/gallery-panel"
import { CommentsPanel } from "@/components/admin/comments-panel"
import { Menu, X, LogOut } from "lucide-react"
import { logoutAdmin } from "@/lib/actions"

interface AdminDashboardProps {
  user: User
  initialSettings: WeddingSettings | null
  initialGuests: Guest[]
  initialGallery: GalleryItem[]
  initialComments: Comment[]
}

export type AdminTab = "settings" | "guests" | "gallery" | "comments"

export function AdminDashboard({
  user,
  initialSettings,
  initialGuests,
  initialGallery,
  initialComments,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("settings")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [settings, setSettings] = useState(initialSettings)
  const [guests, setGuests] = useState(initialGuests)
  const [gallery, setGallery] = useState(initialGallery)
  const [comments, setComments] = useState(initialComments)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdmin()
    })
  }

  const renderPanel = () => {
    switch (activeTab) {
      case "settings":
        return <SettingsPanel settings={settings} onUpdate={setSettings} />
      case "guests":
        return <GuestsPanel guests={guests} onUpdate={setGuests} settings={settings} />
      case "gallery":
        return <GalleryPanel gallery={gallery} onUpdate={setGallery} />
      case "comments":
        return <CommentsPanel comments={comments} onUpdate={setComments} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg hover:bg-muted">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-serif text-lg">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsSidebarOpen(false)}>
          <div className="w-72 h-full bg-background" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-serif text-lg">Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-lg hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <AdminSidebar
              user={user}
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab)
                setIsSidebarOpen(false)
              }}
              onLogout={handleLogout}
              stats={{
                guests: guests.length,
                attending: guests.filter((g) => g.attendance_status === "attending").length,
                gallery: gallery.length,
                comments: comments.length,
              }}
            />
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 h-screen fixed left-0 top-0 glass border-r border-border">
          <AdminSidebar
            user={user}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
            stats={{
              guests: guests.length,
              attending: guests.filter((g) => g.attendance_status === "attending").length,
              gallery: gallery.length,
              comments: comments.length,
            }}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 pt-16 lg:pt-0">
          <div className="p-4 lg:p-8">{renderPanel()}</div>
        </main>
      </div>
    </div>
  )
}
