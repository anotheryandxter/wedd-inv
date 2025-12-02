import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const isPublicRoute = !request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname === "/admin/login"

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected admin routes, dynamically import and use session update
  try {
    const { updateSession } = await import("@/lib/supabase/middleware")
    return await updateSession(request)
  } catch (error) {
    console.error("Middleware error:", error)
    // If middleware fails, redirect to login
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
