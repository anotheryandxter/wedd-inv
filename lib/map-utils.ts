/**
 * Utility functions for parsing Google Maps URLs and extracting coordinates
 */

export interface MapCoordinates {
  lat: number
  lng: number
}

/**
 * Extract coordinates from various Google Maps URL formats:
 * - https://maps.app.goo.gl/...
 * - https://www.google.com/maps/place/...
 * - https://www.google.com/maps/@lat,lng,...
 * - https://www.google.com/maps/embed?pb=...
 * - iframe embed code
 */
export function extractCoordinatesFromMapInput(input: string): MapCoordinates | null {
  if (!input || typeof input !== 'string') return null

  const trimmed = input.trim()

  // Extract from iframe embed code
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/)
  if (iframeMatch) {
    const embedUrl = iframeMatch[1]
    return extractFromEmbedUrl(embedUrl)
  }

  // Direct URL processing
  return extractFromUrl(trimmed)
}

/**
 * Extract coordinates from Google Maps embed URL
 */
function extractFromEmbedUrl(url: string): MapCoordinates | null {
  try {
    const urlObj = new URL(url)
    
    // Format: /maps/embed?pb=!1m18!1m12!1m3!1d...!2d109.2448768!3d-7.395261...
    const pb = urlObj.searchParams.get('pb')
    if (pb) {
      // Extract !2d (longitude) and !3d (latitude) from pb parameter
      const lngMatch = pb.match(/!2d([-\d.]+)/)
      const latMatch = pb.match(/!3d([-\d.]+)/)
      
      if (lngMatch && latMatch) {
        const lng = parseFloat(lngMatch[1])
        const lat = parseFloat(latMatch[1])
        if (isValidCoordinate(lat, lng)) {
          return { lat, lng }
        }
      }
    }

    // Format: /maps/embed/v1/place?...&q=lat,lng or &center=lat,lng
    const q = urlObj.searchParams.get('q')
    if (q) {
      const coords = parseCoordinateString(q)
      if (coords) return coords
    }

    const center = urlObj.searchParams.get('center')
    if (center) {
      const coords = parseCoordinateString(center)
      if (coords) return coords
    }

  } catch (e) {
    // Invalid URL, continue to other methods
  }

  return null
}

/**
 * Extract coordinates from regular Google Maps URLs
 */
function extractFromUrl(url: string): MapCoordinates | null {
  try {
    const urlObj = new URL(url)

    // Format: /maps/@lat,lng,zoom
    const atMatch = urlObj.pathname.match(/@([-\d.]+),([-\d.]+)/)
    if (atMatch) {
      const lat = parseFloat(atMatch[1])
      const lng = parseFloat(atMatch[2])
      if (isValidCoordinate(lat, lng)) {
        return { lat, lng }
      }
    }

    // Format: /maps/place/.../@lat,lng
    const placeMatch = urlObj.pathname.match(/\/@([-\d.]+),([-\d.]+)/)
    if (placeMatch) {
      const lat = parseFloat(placeMatch[1])
      const lng = parseFloat(placeMatch[2])
      if (isValidCoordinate(lat, lng)) {
        return { lat, lng }
      }
    }

    // Format: ?q=lat,lng or ?ll=lat,lng
    const q = urlObj.searchParams.get('q')
    if (q) {
      const coords = parseCoordinateString(q)
      if (coords) return coords
    }

    const ll = urlObj.searchParams.get('ll')
    if (ll) {
      const coords = parseCoordinateString(ll)
      if (coords) return coords
    }

  } catch (e) {
    // Not a valid URL, might be coordinate string
    const coords = parseCoordinateString(url)
    if (coords) return coords
  }

  return null
}

/**
 * Parse coordinate string like "-7.395261, 109.244876" or "-7.395261,109.244876"
 */
function parseCoordinateString(str: string): MapCoordinates | null {
  const parts = str.split(',').map(s => s.trim())
  if (parts.length === 2) {
    const lat = parseFloat(parts[0])
    const lng = parseFloat(parts[1])
    if (isValidCoordinate(lat, lng)) {
      return { lat, lng }
    }
  }
  return null
}

/**
 * Validate latitude and longitude values
 */
function isValidCoordinate(lat: number, lng: number): boolean {
  return (
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  )
}

/**
 * Generate Google Maps direction URL from coordinates
 */
export function getDirectionUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

/**
 * Generate Google Maps embed URL from coordinates
 */
export function getEmbedUrl(lat: number, lng: number, zoom: number = 15): string {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=${zoom}`
}
