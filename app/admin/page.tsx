import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/login")
  }

  // Fetch all data for dashboard
  const [settingsRes, guestsRes, galleryRes, commentsRes] = await Promise.all([
    supabase.from("wedding_settings").select("*").single(),
    supabase.from("guests").select("*").order("created_at", { ascending: false }),
    supabase.from("gallery").select("*").order("sort_order", { ascending: true }),
    supabase.from("comments").select("*").order("created_at", { ascending: false }),
  ])

  return (
    <AdminDashboard
      user={user}
      initialSettings={settingsRes.data}
      initialGuests={guestsRes.data || []}
      initialGallery={galleryRes.data || []}
      initialComments={commentsRes.data || []}
    />
  )
}
