import { createClient } from "@/lib/supabase/server"
import { WeddingInvitation } from "@/components/wedding-invitation"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ to?: string }>
}) {
  const params = await searchParams
  const guestSlug = params.to

  const supabase = await createClient()

  // Fetch wedding settings
  const { data: settings } = await supabase.from("wedding_settings").select("*").single()

  // Fetch gallery
  const { data: gallery } = await supabase.from("gallery").select("*").order("sort_order", { ascending: true })

  // Fetch approved comments
  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })

  // Fetch guest if slug provided
  let guest = null
  if (guestSlug) {
    const { data: guestData } = await supabase.from("guests").select("*").eq("unique_slug", guestSlug).single()
    guest = guestData
  }

  // Default settings if none exist
  const defaultSettings = {
    id: "",
    groom_name: "Ahmad",
    bride_name: "Fatimah",
    groom_father: "Bapak Hasan",
    groom_mother: "Ibu Aminah",
    bride_father: "Bapak Umar",
    bride_mother: "Ibu Khadijah",
    wedding_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    akad_time: "08:00",
    akad_location: "Masjid Al-Ikhlas",
    akad_address: "Jl. Merdeka No. 123, Jakarta Selatan",
    reception_time: "11:00",
    reception_location: "Gedung Serbaguna",
    reception_address: "Jl. Merdeka No. 456, Jakarta Selatan",
    venue_map_url: "",
    venue_lat: -6.2088,
    venue_lng: 106.8456,
    love_story:
      "Cerita cinta kami dimulai dari sebuah pertemuan tak terduga yang kemudian menjadi awal dari perjalanan indah ini.",
    quote:
      "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
    quote_source: "QS. Ar-Rum: 21",
    hero_image: "",
    splash_image: "",
    splash_overlay_opacity: 0.8,
    created_at: "",
    updated_at: "",
  }

  return (
    <WeddingInvitation
      settings={settings || defaultSettings}
      gallery={gallery || []}
      comments={comments || []}
      guest={guest}
    />
  )
}
