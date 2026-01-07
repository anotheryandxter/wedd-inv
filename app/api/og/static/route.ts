export async function GET(req: Request) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL
    if (!SUPABASE_URL) return new Response('Not configured', { status: 500 })

    const url = new URL(req.url)
    const file = url.searchParams.get('file')
    if (!file) return new Response('Missing file', { status: 400 })

    const storageUrl = `${SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/wedding-assets/${encodeURIComponent(file)}`

    const fetchRes = await fetch(storageUrl)
    if (!fetchRes.ok) {
      const text = await fetchRes.text().catch(() => '')
      return new Response(text || 'Not found', { status: fetchRes.status })
    }

    const headers: Record<string, string> = {
      'Content-Type': fetchRes.headers.get('content-type') || 'application/octet-stream',
      // Set caching for scrapers / CDN
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=259200',
    }

    const body = await fetchRes.arrayBuffer()
    return new Response(body, { status: 200, headers })
  } catch (err: any) {
    return new Response(String(err?.message || err), { status: 500 })
  }
}
