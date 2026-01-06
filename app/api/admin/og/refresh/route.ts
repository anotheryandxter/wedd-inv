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

    // Increment og_version atomically and return the new value
    const { data, error } = await supabase
      .from('wedding_settings')
      .update({ og_version: supabase.raw('COALESCE(og_version, 1) + 1') })
      .select()
      .limit(1)

    if (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
    }

    const row = Array.isArray(data) ? data[0] : data
    return new Response(JSON.stringify({ success: true, data: row }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || String(err) }), { status: 500 })
  }
}
