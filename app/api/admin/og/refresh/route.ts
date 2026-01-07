import { NextRequest } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ success: false, error: 'Supabase service key not configured' }), { status: 500 })
    }

    const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })

    // Fetch current settings
    const { data: rows, error: selErr } = await supabase.from('wedding_settings').select('*').limit(1).single()
    if (selErr) {
      return new Response(JSON.stringify({ success: false, error: selErr.message }), { status: 500 })
    }

    const current = (rows as any) || {}
    const currentOg = current.og_image || current.splash_image || current.hero_image
    if (!currentOg) {
      return new Response(JSON.stringify({ success: false, error: 'No og_image or source asset set' }), { status: 400 })
    }

    try {
      const url = new URL(String(currentOg))
      url.searchParams.set('v', String(Date.now()))
      const newOg = url.toString()

      const { data: updated, error: updErr } = await supabase.from('wedding_settings').update({ og_image: newOg, updated_at: new Date().toISOString() }).select().limit(1).single()
      if (updErr) {
        return new Response(JSON.stringify({ success: false, error: updErr.message }), { status: 500 })
      }

      return new Response(JSON.stringify({ success: true, url: newOg, data: updated }), { status: 200 })
    } catch (e: any) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid og_image URL' }), { status: 400 })
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || String(err) }), { status: 500 })
  }
}
