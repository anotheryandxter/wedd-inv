import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Amiri } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { createClient } from "@/lib/supabase/server"
import type { WeddingSettings } from "@/lib/types"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
})

const defaultMetadata: Metadata = {
  title: "Wedding Invitation | Undangan Pernikahan Digital",
  description: "Kami mengundang Anda untuk hadir di hari bahagia kami",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from("wedding_settings").select("*").single()
    const settings = (data || {}) as WeddingSettings
    const siteTitle = settings?.site_name || "Wedding Invitation | Undangan Pernikahan Digital"
    const desc = settings?.quote || "Kami mengundang Anda untuk hadir di hari bahagia kami"
    let favicon = settings?.favicon || null
    // Ensure favicon is an absolute URL. If admin supplied a relative path, prefix with site URL.
    const baseUrlRaw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || ""
    const baseUrl = String(baseUrlRaw).replace(/\/$/, "")
    if (favicon && !/^https?:\/\//i.test(favicon) && baseUrl) {
      // remove leading slashes
      favicon = `${baseUrl}/${String(favicon).replace(/^\/*/, "")}`
    }

    // Add a small cache-bust query param so browsers pick up updated favicon after admin changes.
    const icons: Metadata["icons"] | undefined = favicon
      ? (() => {
          const stamp = settings?.updated_at ? `v=${new Date(settings.updated_at).getTime()}` : `v=${Date.now()}`
          const urlWithCache = favicon.includes("?") ? `${favicon}&${stamp}` : `${favicon}?${stamp}`
          // choose types by extension when possible
          const lower = String(favicon).toLowerCase()
          const candidates: Array<{ url: string; type?: string }> = []
          if (lower.endsWith('.svg')) candidates.push({ url: urlWithCache, type: 'image/svg+xml' })
          else if (lower.endsWith('.ico')) candidates.push({ url: urlWithCache, type: 'image/x-icon' })
          else candidates.push({ url: urlWithCache, type: 'image/png' }, { url: urlWithCache })

          return {
            icon: candidates,
            apple: urlWithCache,
            shortcut: urlWithCache,
          }
        })()
      : undefined

    // Use og_image first, then splash_image, then hero_image as fallback
    const ogImage = settings?.og_image || settings?.splash_image || settings?.hero_image || null
    const ogImageAbsolute = ogImage && !/^https?:\/\//i.test(ogImage) && baseUrl
      ? `${baseUrl}/${String(ogImage).replace(/^\/*/, "")}`
      : ogImage

    return {
      title: siteTitle,
      description: desc,
      icons,
      generator: "v0.app",
      openGraph: ogImageAbsolute ? {
        title: siteTitle,
        description: desc,
        images: [
          {
            url: ogImageAbsolute,
            width: 1200,
            height: 630,
            alt: siteTitle,
          },
        ],
        type: 'website',
        siteName: siteTitle,
        url: baseUrl || undefined,
      } : undefined,
      twitter: ogImageAbsolute ? {
        card: 'summary_large_image',
        title: siteTitle,
        description: desc,
        images: [ogImageAbsolute],
      } : undefined,
      metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    }
    } catch (err) {
    return defaultMetadata
  }
}

export const viewport: Viewport = {
  themeColor: "#D4AF37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
