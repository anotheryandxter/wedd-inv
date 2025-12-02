import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
  const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'wedding-assets'

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ success: false, error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on server.' }), { status: 500 })
  }

  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    const filenameRaw = (form.get('filename') as string) || (file && (file as any).name) || `upload-${Date.now()}`
    // sanitize filename: remove unsafe characters (spaces, brackets, unicode, etc.)
    const filename = String(filenameRaw)
      .trim()
      .replace(/\s+/g, '-') // spaces -> hyphen
      .replace(/[^a-zA-Z0-9.\-_]/g, '-') // remove other unsafe chars
      .replace(/-+/g, '-')
    const folder = (form.get('folder') as string) || 'wedding'

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ success: false, error: 'No file provided' }), { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    let uploadBuffer = buffer
    let contentType = file.type || 'application/octet-stream'

    // If the uploaded file is an image, try to re-encode it server-side to avoid
    // progressive JPEGs or other formats that cause rendering quirks in some browsers.
    if (file.type && file.type.startsWith('image/')) {
      try {
        const sharp = await import('sharp')
        // For PNG keep PNG output; for other images, convert to baseline JPEG
        if (file.type === 'image/png') {
          uploadBuffer = await sharp.default(buffer).png({ compressionLevel: 9 }).toBuffer()
          contentType = 'image/png'
        } else {
          // Convert to non-progressive JPEG to avoid progressive rendering seams
          uploadBuffer = await sharp.default(buffer).jpeg({ quality: 90, progressive: false }).toBuffer()
          contentType = 'image/jpeg'
        }
      } catch (e) {
        // If sharp is not available or conversion fails, fall back to original buffer
        // but continue — upload will proceed with original content-type.
        console.warn('Image re-encoding failed, uploading original file:', String(e))
        uploadBuffer = buffer
        contentType = file.type || 'application/octet-stream'
      }
    }
    const path = `${folder}/${Date.now()}-${filename}`

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false },
    })

    const { error } = await supabase.storage.from(BUCKET).upload(path, uploadBuffer, {
      contentType,
      upsert: false,
    })

    if (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 })
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)

    return new Response(JSON.stringify({ success: true, publicUrl: data.publicUrl }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 })
  }
}
