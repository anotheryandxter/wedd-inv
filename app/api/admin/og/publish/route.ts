import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ success: false, error: 'Supabase service key not configured' }), { status: 500 })
    }

    const buf = Buffer.from(await req.arrayBuffer())

    const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })

    const stamp = Date.now()
    const filename = `og/${stamp}.webp`

    // Upload using the SDK so we can set cacheControl metadata
    const { error: uploadError } = await supabase.storage
      .from('wedding-assets')
      .upload(filename, buf, { contentType: 'image/webp', cacheControl: 'public, max-age=86400', upsert: true })

    if (uploadError) {
      return new Response(JSON.stringify({ success: false, error: uploadError.message }), { status: 500 })
    }

    const publicUrl = `${SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/wedding-assets/${encodeURIComponent(filename)}`

    // Build a proxy URL on our domain so we can control HTTP Cache headers
    const siteBase = req.headers.get('x-site-base') || (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') || process.env.SITE_URL || '')
    const base = String(siteBase).replace(/\/$/, '')
    const proxyPath = `/api/og/static?file=${encodeURIComponent(filename)}`
    const proxyUrl = `${base}${proxyPath}`

    // Update wedding_settings to point to proxy URL
    const { data: updated, error: updateError } = await supabase
      .from('wedding_settings')
      .update({ og_image: proxyUrl, updated_at: new Date().toISOString() })
      .select()
      .single()

    if (updateError) {
      return new Response(JSON.stringify({ success: false, error: updateError.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true, url: proxyUrl, storage_url: publicUrl, data: updated }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || String(err) }), { status: 500 })
  }
}
