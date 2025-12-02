import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = (body?.email || "").toString().trim()

    if (!email) {
      return NextResponse.json({ success: false, error: "Email diperlukan" }, { status: 400 })
    }

    const cookieStore = await cookies()

    const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // ignore
          }
        },
      },
    })

    // Build a redirectTo URL for the reset link.
    // Priority: explicit `NEXT_PUBLIC_SITE_URL` env var -> Vercel runtime `VERCEL_URL` -> derive from request headers -> undefined
    let redirectTo: string | undefined = undefined

    const normalize = (u: string) => u.replace(/\/$/, "")

    if (process.env.NEXT_PUBLIC_SITE_URL) {
      redirectTo = `${normalize(process.env.NEXT_PUBLIC_SITE_URL)}/admin/reset-password`
    } else if (process.env.VERCEL_URL) {
      // VERCEL_URL is provided in Vercel production runtime (e.g. "my-app-abc.vercel.app")
      // assume https for Vercel deployments
      redirectTo = `https://${normalize(process.env.VERCEL_URL)}/admin/reset-password`
    } else {
      // Try to derive origin from request headers (x-forwarded-proto and host) which may be present on Vercel or proxies.
      const proto = (request.headers.get("x-forwarded-proto") || request.headers.get("x-forwarded-protocol") || "https").split(",")[0]
      const host = request.headers.get("x-forwarded-host") || request.headers.get("host")
      if (host) {
        redirectTo = `${proto}://${normalize(host)}/admin/reset-password`
      }
    }

    // Send password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email, redirectTo ? { redirectTo } : undefined)

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    // If caller requested debug, include the redirectTo used so we can verify the URL.
    const bodyOut: any = { success: true }
    try {
      // request.json() was already consumed earlier; use the parsed `body` variable
      const reqBody = body as any
      if (reqBody?.debug) {
        bodyOut.redirectTo = redirectTo ?? null
      }
    } catch {
      // ignore
    }

    return NextResponse.json(bodyOut)
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 })
  }
}
