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

    // Read current og_version (assumes single-row settings table)
    const { data: rows, error: selErr } = await supabase.from('wedding_settings').select('id,og_version').limit(1).single()
    if (selErr) {
      return new Response(JSON.stringify({ success: false, error: selErr.message }), { status: 500 })
    }

    const current = rows as any
    const newVersion = (current?.og_version || 0) + 1

    const { data, error: updErr } = await supabase
      .from('wedding_settings')
      .update({ og_version: newVersion })
      .eq('id', current.id)
      .select()
      .single()

    if (updErr) {
      return new Response(JSON.stringify({ success: false, error: updErr.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || String(err) }), { status: 500 })
  }
}
