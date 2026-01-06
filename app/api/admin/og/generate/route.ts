import fs from 'fs'
import path from 'path'
import { NextRequest } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') || process.env.SITE_URL || `https://mrgwedding.com`
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ success: false, error: 'Supabase service key not configured' }), { status: 500 })
    }

    // Request a fresh image from our dynamic OG generator by invoking the module directly.
    const stamp = Date.now()
    let buf: Buffer | null = null

    try {
      // Import the OG route module and call its GET handler directly to avoid network fetch issues
      const ogModule = await import('../../og/route')
      if (ogModule && typeof ogModule.GET === 'function') {
        const fakeReq = new Request(`${SITE_URL.replace(/\/$/, '')}/api/og?v=${stamp}`)
        const ogResponse: Response = await ogModule.GET(fakeReq)
        if (!ogResponse.ok) throw new Error(`OG handler responded ${ogResponse.status}`)
        buf = Buffer.from(await ogResponse.arrayBuffer())
      }
    } catch (e) {
      // Fallback to fetching the public endpoint if direct import fails
      const ogUrl = `${SITE_URL.replace(/\/$/, '')}/api/og?v=${stamp}`
      const imgRes = await fetch(ogUrl)
      if (!imgRes.ok) {
        return new Response(JSON.stringify({ success: false, error: `Failed to fetch generated OG image: ${imgRes.status}` }), { status: 502 })
      }
      buf = Buffer.from(await imgRes.arrayBuffer())
    }

    if (!buf) return new Response(JSON.stringify({ success: false, error: 'Failed to generate OG image' }), { status: 500 })

    // Upload to Supabase storage
    const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
    const filename = `og/${stamp}.png`
    const uploadRes = await supabase.storage.from('wedding-assets').upload(filename, buf, {
      contentType: 'image/png',
      upsert: true,
    })
    if (uploadRes.error) {
      return new Response(JSON.stringify({ success: false, error: uploadRes.error.message }), { status: 500 })
    }

    const publicUrl = `${SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/wedding-assets/${encodeURIComponent(filename)}`

    // Update wedding_settings with new og_image and increment og_version
    const { data: rows, error: selErr } = await supabase.from('wedding_settings').select('id,og_version').limit(1).single()
    if (selErr) return new Response(JSON.stringify({ success: false, error: selErr.message }), { status: 500 })
    const current = rows as any
    const newVersion = (current?.og_version || 0) + 1

    const { data, error: updErr } = await supabase.from('wedding_settings').update({ og_image: publicUrl, og_version: newVersion, updated_at: new Date().toISOString() }).eq('id', current.id).select().single()
    if (updErr) return new Response(JSON.stringify({ success: false, error: updErr.message }), { status: 500 })

    return new Response(JSON.stringify({ success: true, data, url: publicUrl }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || String(err) }), { status: 500 })
  }
}
