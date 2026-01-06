import { NextRequest } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

function parseCSV(text: string) {
  // Very small CSV parser that handles quoted fields and commas
  const rows: string[][] = []
  let cur = ''
  let row: string[] = []
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        // escaped quote
        cur += '"'
        i++
        continue
      }
      inQuotes = !inQuotes
      continue
    }
    if (ch === ',' && !inQuotes) {
      row.push(cur)
      cur = ''
      continue
    }
    if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (cur !== '' || row.length > 0) {
        row.push(cur)
        rows.push(row)
        row = []
        cur = ''
      }
      // skip possible \r\n handling by continuing
      continue
    }
    cur += ch
  }
  if (cur !== '' || row.length > 0) {
    row.push(cur)
    rows.push(row)
  }
  return rows
}

function normalizePhone(raw?: string) {
  if (!raw) return ''
  let digits = raw.replace(/[^0-9+]/g, '')
  if (digits.startsWith('+')) digits = digits.slice(1)
  if (digits.startsWith('0')) digits = '62' + digits.slice(1)
  return digits
}

export async function POST(req: NextRequest) {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ success: false, error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on server.' }), { status: 500 })
  }

  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ success: false, error: 'No file provided' }), { status: 400 })
    }

    const text = await file.text()
    const rows = parseCSV(text)
    if (rows.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'CSV kosong' }), { status: 400 })
    }

    // Detect header row: common headers name, phone
    let start = 0
    const header = rows[0].map((c) => c.trim().toLowerCase())
    const hasName = header.includes('name') || header.includes('nama')
    const hasPhone = header.includes('phone') || header.includes('nomor') || header.includes('nomor_hp') || header.includes('hp')
    if (hasName || hasPhone) start = 1

    const supabase = createSupabaseClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

    const results: Array<any> = []
    let imported = 0

    for (let i = start; i < rows.length; i++) {
      const cols = rows[i].map((c) => c.trim())
      if (cols.length === 0) continue

      let name = ''
      let phone = ''

      if (start === 1) {
        // map by header
        const map: Record<number, string> = {}
        header.forEach((h, idx) => {
          map[idx] = h
        })
        for (let j = 0; j < cols.length; j++) {
          const h = map[j]
          if (!h) continue
          if (h.includes('name') || h.includes('nama')) name = cols[j]
          if (h.includes('phone') || h.includes('nomor') || h.includes('hp')) phone = cols[j]
        }
      } else {
        // assume first = name, second = phone
        name = cols[0] || ''
        phone = cols[1] || ''
      }

      name = (name || '').trim()
      phone = normalizePhone(phone)
      if (!name) continue

      // try to find by phone first, then by exact name
      let existing: any = null
      if (phone) {
        const resp = await supabase.from('guests').select('*').eq('phone', phone).limit(1).single()
        existing = (resp && (resp as any).data) || null
      }
      if (!existing) {
        const resp2 = await supabase.from('guests').select('*').eq('name', name).limit(1).single()
        existing = (resp2 && (resp2 as any).data) || null
      }

      if (existing) {
        const upd: any = { name }
        if (phone) upd.phone = phone
        const { error } = await supabase.from('guests').update({ ...upd, updated_at: new Date().toISOString() }).eq('id', existing.id)
        results.push({ action: 'updated', id: existing.id, name, phone, error: error ? error.message : null })
        if (!error) imported++
      } else {
        // create slug
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Math.random().toString(36).substr(2, 6)
        const payload: any = { name, phone: phone || null, slug, unique_slug: slug, attendance_status: 'pending', guest_count: 1 }
        const { data, error } = await supabase.from('guests').insert(payload).select().single()
        results.push({ action: 'inserted', id: data?.id || null, name, phone, error: error ? error.message : null })
        if (!error) imported++
      }
    }

    // return updated guests list
    const { data: allGuests } = await supabase.from('guests').select('*').order('created_at', { ascending: false })

    return new Response(JSON.stringify({ success: true, imported, results, data: allGuests || [] }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 })
  }
}
