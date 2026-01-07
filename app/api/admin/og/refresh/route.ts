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

      // Use REST patch to ensure proper WHERE clause and bypass any client quirks
      const settingsRes = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/wedding_settings?id=eq.${current.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ og_image: newOg, updated_at: new Date().toISOString() }),
      })

      if (!settingsRes.ok) {
        const text = await settingsRes.text().catch(() => '')
        return new Response(JSON.stringify({ success: false, error: `DB update failed: ${settingsRes.status}`, detail: text }), { status: 500 })
      }

      const updated = await settingsRes.json()
      const returned = Array.isArray(updated) ? updated[0] : updated
      return new Response(JSON.stringify({ success: true, url: newOg, data: returned }), { status: 200 })
    } catch (e: any) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid og_image URL' }), { status: 400 })
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || String(err) }), { status: 500 })
  }
}
