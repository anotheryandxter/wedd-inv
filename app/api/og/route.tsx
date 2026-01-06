import { ImageResponse } from '@vercel/og'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('wedding_settings').select('*').single()
    const settings = data || {}

    const title = settings.site_name || `${settings.groom_name || ''} & ${settings.bride_name || ''}` || 'Wedding Invitation'
    const dateText = settings.wedding_date ? new Date(settings.wedding_date).toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : ''
    const desc = settings.og_description || settings.quote || 'Suatu kehormatan apabila Bapak/Ibu/Saudara dapat hadir pada acara pernikahan kami'

    // Prefer the request origin (so custom domains are used). Fall back to env vars.
    const reqOrigin = (typeof req !== 'undefined' && req && typeof req.url === 'string') ? new URL(req.url).origin : ''
    const baseUrlRaw = reqOrigin || process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') || process.env.SITE_URL || ''
    const baseUrl = String(baseUrlRaw).replace(/\/$/, '')

    const imagePath = settings.og_image || settings.splash_image || settings.hero_image || null
    const imageUrl = imagePath ? (String(imagePath).startsWith('http') ? String(imagePath) : `${baseUrl}/${String(imagePath).replace(/^\/*/, '')}`) : null

    const imageResponse = new ImageResponse(
      (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '1200px',
          height: '630px',
          background: '#f7f7f7',
          fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          color: '#111827',
        }}>
          <div style={{ width: '100%', height: '360px', display: 'flex', background: '#fff' }}>
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#e5e7eb' }} />
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', padding: 36, background: '#ffffff', flex: '1 1 auto' }}>
            <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.05, marginBottom: 8 }}>{title}</div>
            {dateText && <div style={{ fontSize: 22, color: '#6b7280', marginBottom: 12 }}>{dateText}</div>}
            <div style={{ fontSize: 20, color: '#374151', maxWidth: 1020 }}>{desc}</div>
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12, color: '#6b7280' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12a9 9 0 0114.85-6.364l1.414-1.414A11 11 0 002 12v.001L3 12z" fill="#9CA3AF"/></svg>
              <div style={{ fontSize: 18 }}>{baseUrl.replace(/^https?:\/\//, '')}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )

    // Render to an ArrayBuffer so we can return a Response with explicit headers
    try {
      const buf = await imageResponse.arrayBuffer()
      const headers: Record<string, string> = {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400'
      }
      return new Response(buf, { headers })
    } catch (e) {
      console.error('OG render/response error', e)
      // Fallback: return the original response if we can't read buffer
      return imageResponse
    }
  } catch (err) {
    console.error('OG generation error', err)
    return new Response('Error generating image', { status: 500 })
  }
}
