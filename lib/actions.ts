"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Comment, Guest, WeddingSettings, GalleryItem } from "@/lib/types"

// ============ Auth Actions ============

export async function loginAdmin(email: string, password: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  return { success: true }
}

export async function logoutAdmin() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/admin")
  redirect("/admin/login")
}

// Change admin password (server action) — uses server session from cookies
export async function changeAdminPassword(newPassword: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({ password: newPassword })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  return { success: true }
}

// ============ Comments Actions ============

export async function getComments(): Promise<Comment[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching comments:", error)
    return []
  }
  return data || []
}

export async function submitComment(formData: { guest_name: string; message: string }) {
  const supabase = await createClient()

  const { error } = await supabase.from("comments").insert({
    guest_name: formData.guest_name,
    message: formData.message,
    is_approved: true,
  })

  if (error) {
    console.error("Error submitting comment:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

// ============ RSVP Actions ============

export async function updateRSVP(guestId: string, attendance: string, guestCount: number) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("guests")
    .update({
      attendance_status: attendance,
      guest_count: guestCount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", guestId)

  if (error) {
    console.error("Error updating RSVP:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

export async function getGuestBySlug(slug: string): Promise<Guest | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("guests").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching guest:", error)
    return null
  }
  return data
}

// ============ Wedding Settings Actions ============

export async function getWeddingSettings(): Promise<WeddingSettings | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("wedding_settings").select("*").single()

  if (error) {
    console.error("Error fetching settings:", error)
    return null
  }
  return data
}

export async function updateWeddingSettings(settingsId: string, settings: Partial<WeddingSettings>) {
  // Prefer service-role client for writes when available to avoid RLS/anon issues
  let supabase = await createClient()
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_URL) {
    supabase = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    }) as any
  }

  const { data, error } = await supabase
    .from("wedding_settings")
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq("id", settingsId)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message, data: null }
  }

  revalidatePath("/")
  revalidatePath("/admin")
  return { success: true, data }
}

// ============ Gallery Actions ============

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("gallery").select("*").order("sort_order", { ascending: true })

  if (error) {
    console.error("Error fetching gallery:", error)
    return []
  }
  return data || []
}

export async function addGalleryItem(imageUrl: string, caption?: string) {
  const supabase = await createClient()

  // Get max sort order
  const { data: maxOrder } = await supabase
    .from("gallery")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .single()

  const { data, error } = await supabase
    .from("gallery")
    .insert({
      image_url: imageUrl,
      caption,
      sort_order: (maxOrder?.sort_order || 0) + 1,
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message, data: null }
  }

  revalidatePath("/")
  revalidatePath("/admin")
  return { success: true, data }
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("gallery").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  revalidatePath("/admin")
  return { success: true }
}

export async function updateGalleryItem(id: string, updates: Partial<{ image_url: string; caption: string }>) {
  const supabase = await createClient()

  const payload = { ...updates, updated_at: new Date().toISOString() }

  const { data, error } = await supabase.from("gallery").update(payload).eq("id", id).select().single()

  if (error) {
    console.error("updateGalleryItem: supabase update error", { error, id, payload })
    return { success: false, error: error.message || JSON.stringify(error), data: null }
  }

  revalidatePath("/")
  revalidatePath("/admin")
  return { success: true, data }
}

// ============ Guests Management Actions ============

export async function getGuests(): Promise<Guest[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("guests").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching guests:", error)
    return []
  }
  return data || []
}

export async function addGuest(guestData: {
  name: string
  phone?: string
  address?: string
  guest_count?: number
}) {
  const supabase = await createClient()

  const slug =
    guestData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Math.random().toString(36).substr(2, 6)

  const payload = {
    name: guestData.name,
    slug,
    unique_slug: slug,
    phone: guestData.phone,
    address: guestData.address,
    attendance_status: "pending",
    guest_count: guestData.guest_count || 1,
  }

  const { data, error } = await supabase.from("guests").insert(payload).select().single()

  if (error) {
    // Log full error and payload to help debug PostgREST 400 issues
    console.error("addGuest: supabase insert error", { error, payload })
    return { success: false, error: error.message || JSON.stringify(error), data: null }
  }

  revalidatePath("/admin")
  return { success: true, data }
}

export async function updateGuest(id: string, updates: Partial<{ name: string; phone: string; address: string; guest_count: number; attendance_status: string }>) {
  const supabase = await createClient()

  const payload = { ...updates, updated_at: new Date().toISOString() }

  const { data, error } = await supabase.from("guests").update(payload).eq("id", id).select().single()

  if (error) {
    console.error("updateGuest: supabase update error", { error, id, payload })
    return { success: false, error: error.message || JSON.stringify(error), data: null }
  }

  revalidatePath("/admin")
  return { success: true, data }
}

export async function deleteGuest(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("guests").delete().eq("id", id)

  if (error) {
    console.error("deleteGuest: supabase delete error", { error, id })
    return { success: false, error: error.message || JSON.stringify(error) }
  }

  revalidatePath("/admin")
  return { success: true }
}

// ============ Comments Management Actions ============

export async function getAllComments(): Promise<Comment[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("comments").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all comments:", error)
    return []
  }
  return data || []
}

export async function toggleCommentApproval(id: string, currentStatus: boolean) {
  const supabase = await createClient()

  const { error } = await supabase.from("comments").update({ is_approved: !currentStatus }).eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  revalidatePath("/admin")
  return { success: true, newStatus: !currentStatus }
}

export async function deleteComment(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("comments").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  revalidatePath("/admin")
  return { success: true }
}

// ============ Guests blasting helpers ============

function normalizePhoneForWa(phone?: string) {
  if (!phone) return null
  const digits = phone.replace(/[^0-9]/g, "")
  if (digits.startsWith("0")) return "62" + digits.slice(1)
  if (digits.startsWith("62")) return digits
  if (digits.startsWith("8")) return "62" + digits
  return digits
}

function interpolateTemplate(template: string, data: Record<string, string | number | null>) {
  // Support both {key} and {{key}} placeholders
  return template.replace(/\{\{?\s*(\w+)\s*\}?\}/g, (_, key) => {
    const v = data[key]
    return v == null ? "" : String(v)
  })
}

function transformFormattingForWhatsApp(text: string) {
  if (!text) return text

  // HTML-like tags -> WhatsApp formatting
  // Bold/strong -> *text*
  text = text.replace(/<\s*(?:b|strong)>([\s\S]*?)<\s*\/\s*(?:b|strong)>/gi, '*$1*')

  // Italic/em -> _text_
  text = text.replace(/<\s*(?:i|em)>([\s\S]*?)<\s*\/\s*(?:i|em)>/gi, '_$1_')

  // Strikethrough -> ~text~
  text = text.replace(/<\s*(?:s|strike|del)>([\s\S]*?)<\s*\/\s*(?:s|strike|del)>/gi, '~$1~')

  // Code/pre -> ```text``` (preserve newlines)
  text = text.replace(/<\s*(?:pre|code)>([\s\S]*?)<\s*\/\s*(?:pre|code)>/gi, '```$1```')

  // Underline is not supported by WhatsApp; map <u> to italic as closest alternative
  text = text.replace(/<\s*u>([\s\S]*?)<\s*\/\s*u>/gi, '_$1_')

  // Markdown-like shortcuts: **bold** -> *bold*, __underline__ -> _underline_ (note: WhatsApp doesn't support underline)
  text = text.replace(/\*\*(.*?)\*\*/g, '*$1*')
  text = text.replace(/__(.*?)__/g, '_$1_')

  return text
}

export async function ensureGuestUniqueCode(id: string) {
  const supabase = await createClient()
  const { data: g, error: fetchErr } = await supabase.from("guests").select("id,unique_code").eq("id", id).single()
  if (fetchErr) {
    console.error("ensureGuestUniqueCode: fetch error", fetchErr)
    return null
  }
  if (g.unique_code) return g.unique_code

  const code = substringRandomCode()
  const { error: updErr } = await supabase.from("guests").update({ unique_code: code }).eq("id", id)
  if (updErr) {
    console.error("ensureGuestUniqueCode: update error", updErr)
    return null
  }
  return code
}

function substringRandomCode() {
  return Math.random().toString(36).substr(2, 9)
}

export async function generateBlastMessageForGuest(guestId: string, origin?: string) {
  const supabase = await createClient()
  const { data: guest, error: gErr } = await supabase.from("guests").select("*").eq("id", guestId).single()
  if (gErr || !guest) {
    console.error("generateBlastMessageForGuest: guest fetch error", gErr)
    return { success: false, error: gErr?.message || "Guest not found" }
  }

  const settings = await getWeddingSettings()

  // Ensure unique code exists
  if (!guest.unique_code) {
    const code = Math.random().toString(36).substr(2, 9)
    await supabase.from("guests").update({ unique_code: code }).eq("id", guestId)
    guest.unique_code = code
  }

  // Use origin parameter if provided (dynamic from request), otherwise fallback to env var
  const baseUrlRaw = origin || process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || ""
  const baseUrl = String(baseUrlRaw).replace(/\/$/, "")
  // Make the link format match the client clipboard link: `${origin}?to=<slug>`
  const link = `${baseUrl}?to=${encodeURIComponent(guest.unique_slug || guest.slug || guest.id)}`

  const template = settings?.whatsapp_template || "Halo {name}, Anda diundang. Silakan lihat: {link} (kode: {unique_code})"

  // Detect whether admin included a {link} placeholder; if not, we'll append the link after formatting
  const includesLinkPlaceholder = /\{\{?\s*link\s*\}?\}/i.test(template)

  let message = interpolateTemplate(template, {
    name: guest.name,
    unique_code: guest.unique_code,
    link,
  })

  // Apply WhatsApp formatting conversions (HTML-like tags or markdown shortcuts)
  message = transformFormattingForWhatsApp(message)

  // If template didn't include link, append it at the end so the invite always contains the URL
  if (!includesLinkPlaceholder) {
    message = `${message}\n\n${link}`
  }

  const phone = normalizePhoneForWa(guest.phone)
  if (!phone) return { success: false, error: "No phone number" }

  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return { success: true, waLink, message }
}

export async function sendWhatsAppViaTwilio(guestId: string) {
  // Optional: if TWILIO env vars are present, attempt to send via Twilio's API
  const SID = process.env.TWILIO_ACCOUNT_SID
  const TOKEN = process.env.TWILIO_AUTH_TOKEN
  const FROM = process.env.TWILIO_WHATSAPP_FROM // e.g. 'whatsapp:+1415...'
  if (!SID || !TOKEN || !FROM) {
    return { success: false, error: "Twilio credentials not configured" }
  }

  const supabase = await createClient()
  const { data: guest, error: gErr } = await supabase.from("guests").select("*").eq("id", guestId).single()
  if (gErr || !guest) return { success: false, error: gErr?.message || "Guest not found" }

  // ensure unique_code
  let code = guest.unique_code
  if (!code) {
    code = Math.random().toString(36).substr(2, 9)
    await supabase.from("guests").update({ unique_code: code }).eq("id", guestId)
  }

  const settings = await getWeddingSettings()
  const template = settings?.whatsapp_template || "Halo {name}, Anda diundang. Silakan lihat: {link} (kode: {unique_code})"
  const baseUrlRaw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || ""
  const baseUrl = String(baseUrlRaw).replace(/\/$/, "")
  const link = `${baseUrl}?to=${encodeURIComponent(guest.unique_slug || guest.slug || guest.id)}`
  const message = interpolateTemplate(template, { name: guest.name, unique_code: code, link })

  const phone = normalizePhoneForWa(guest.phone)
  if (!phone) return { success: false, error: "No phone number" }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`
  const payload = new URLSearchParams()
  payload.append("To", `whatsapp:+${phone}`)
  payload.append("From", FROM)
  payload.append("Body", message)

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${SID}:${TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    })
    const json = await res.json()
    if (!res.ok) {
      console.error("sendWhatsAppViaTwilio: twilio error", json)
      return { success: false, error: json }
    }

    // update guest last_blasted_at / blast_status
    await supabase.from("guests").update({ last_blasted_at: new Date().toISOString(), blast_status: "sent" }).eq("id", guestId)

    return { success: true, data: json }
  } catch (err) {
    console.error("sendWhatsAppViaTwilio: exception", err)
    return { success: false, error: err }
  }
}

