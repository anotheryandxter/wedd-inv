import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''
  const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  const present = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  }

  if (!SUPABASE_URL || !SERVICE) {
    return new Response(JSON.stringify({ ok: false, message: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on server.', present }), { status: 400 })
  }

  // Attempt a minimal REST request using the service role key (safe server-side check)
  try {
    const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/wedding_settings?select=id&limit=1`
    const res = await fetch(url, {
      headers: {
        apikey: SERVICE,
        Authorization: `Bearer ${SERVICE}`,
      },
    })

    const text = await res.text()
    const ok = res.ok

    return new Response(
      JSON.stringify({ ok: true, present, rest: { status: res.status, ok, bodyPreview: text.slice(0, 200) } }),
      { status: 200 }
    )
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: String(err), present }), { status: 500 })
  }
}
