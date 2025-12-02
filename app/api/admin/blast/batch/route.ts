import { NextResponse } from 'next/server'
import { generateBlastMessageForGuest } from '@/lib/actions'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Filter out falsy values and literal strings "undefined"/"null" that can appear from UI
    const ids: string[] = Array.isArray(body.ids)
      ? body.ids.filter((id: any) => id && id !== "undefined" && id !== "null")
      : []
    const results = []
    for (const id of ids) {
      try {
        // reuse the same helper
        // eslint-disable-next-line no-await-in-loop
        const r = await generateBlastMessageForGuest(id)
        results.push({ id, ...r })
      } catch (err) {
        results.push({ id, success: false, error: String(err) })
      }
    }
    return NextResponse.json({ success: true, results })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
