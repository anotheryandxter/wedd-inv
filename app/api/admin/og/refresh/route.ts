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

    // Do not bump og_version anymore. Return current settings without modification.
    const { data: rows, error: selErr } = await supabase.from('wedding_settings').select('*').limit(1).single()
    if (selErr) {
      return new Response(JSON.stringify({ success: false, error: selErr.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true, data: rows }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || String(err) }), { status: 500 })
  }
}
