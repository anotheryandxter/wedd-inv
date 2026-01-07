import { ImageResponse } from '@vercel/og'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('wedding_settings').select('*').single()
    const settings = (data || {}) as any

    const title = settings.site_name || `${settings.groom_name || ''} & ${settings.bride_name || ''}` || 'Wedding Invitation'
    const dateText = settings.wedding_date ? new Date(settings.wedding_date).toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : ''
    const desc = settings.og_description || settings.quote || 'Suatu kehormatan apabila Bapak/Ibu/Saudara dapat hadir pada acara pernikahan kami'

    const reqOrigin = (typeof req !== 'undefined' && req && typeof req.url === 'string') ? new URL(req.url).origin : ''
    const baseUrlRaw = reqOrigin || process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') || process.env.SITE_URL || ''
    const baseUrl = String(baseUrlRaw).replace(/\/$/, '')

    const imagePath = settings.splash_image || settings.hero_image || settings.og_image || null
    const imageUrl = imagePath ? (String(imagePath).startsWith('http') ? String(imagePath) : `${baseUrl}/${String(imagePath).replace(/^\/*/, '')}`) : null

    // If an original graphic asset exists, prefer it and set `og_image` to
    // that original URL. This disables generating/uploading WebP images.
    if (imageUrl) {
      const SUPABASE_URL = process.env.SUPABASE_URL
      const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        return new Response(JSON.stringify({ success: false, error: 'Supabase service key not configured' }), { status: 500 })
      }

      const settingsRes = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/wedding_settings?id=eq.${settings.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ og_image: imageUrl, updated_at: new Date().toISOString() }),
      })

      if (!settingsRes.ok) {
        const text = await settingsRes.text().catch(() => '')
        return new Response(JSON.stringify({ success: false, error: `DB update failed: ${settingsRes.status}`, detail: text }), { status: 500 })
      }

      const updated = await settingsRes.json()
      const returned = Array.isArray(updated) ? updated[0] : updated
      return new Response(JSON.stringify({ success: true, url: imageUrl, data: returned }), { status: 200 })
    }

    return new Response(JSON.stringify({ success: false, error: 'No original graphic asset found. Upload a hero/splash/og image first.' }), { status: 400 })
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || String(err) }), { status: 500 })
  }
}
