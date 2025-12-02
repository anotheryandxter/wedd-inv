import { NextResponse } from 'next/server'
import { generateBlastMessageForGuest } from '@/lib/actions'

export async function GET(request: Request, { params }: { params: { id?: string } }) {
  // Try multiple extraction strategies: route params, fallback to last path segment, then query param
  let id = params?.id
  if (!id || id === 'undefined' || id === 'null') {
    try {
      const url = new URL(request.url)
      const pathSeg = url.pathname.split('/').filter(Boolean).pop() || ''
      if (pathSeg && !/^api$/i.test(pathSeg)) id = pathSeg
      if ((!id || id === 'undefined' || id === 'null') && url.searchParams.has('id')) {
        id = url.searchParams.get('id') || undefined
      }
    } catch (e) {
      // ignore URL parse errors
    }
  }

  // Normalize & validate
  const norm = (typeof id === 'string' ? id.trim() : '')
  if (!norm || /^\s*(undefined|null)\s*$/i.test(norm)) {
    console.warn('[blast] Missing or invalid guest id for request:', request.url)
    return NextResponse.json({ success: false, error: 'Missing guest id' }, { status: 400 })
  }

  try {
    const res = await generateBlastMessageForGuest(norm)
    return NextResponse.json(res)
  } catch (err) {
    console.error('[blast] Error generating blast for id=', norm, err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
