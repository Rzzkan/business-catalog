// Shared Google Maps helpers used by the business admin form, the owner dashboard
// form, and the public business detail page. Each business can have multiple
// cabang (branches); these helpers operate on one address/embed value at a time
// and are applied per-branch by the callers.

// Pulls a "lat,lng" pair out of a Google Maps embed URL/snippet, if present.
export function extractLatLng(value) {
  const input = (value || '').trim()
  if (!input) return null
  const match = input.match(/(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/)
  if (!match) return null
  return { lat: match[1], lng: match[2] }
}

// Normalizes a pasted iframe embed code, a Google Maps link, or a "lat,lng" pair
// into a plain https://www.google.com/maps?...&output=embed URL suitable for an
// <iframe src>. Falls back to treating the input as a free-text search query.
export function normalizeMapEmbed(value) {
  const input = (value || '').trim()
  if (!input) return ''

  const iframeSrc = input.match(/src=["']([^"']+)["']/i)?.[1]
  const raw = (iframeSrc || input).replace(/&amp;/g, '&')

  if (/^https:\/\/(www\.)?google\.[^/]+\/maps\/embed/i.test(raw) || /^https:\/\/maps\.google\.[^/]+\/maps/i.test(raw)) {
    return raw
  }

  // Extract coordinates from long URL path (e.g. /@latitude,longitude)
  const pathCoords = raw.match(/@(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/)
  if (pathCoords) {
    return `https://www.google.com/maps?q=${pathCoords[1]},${pathCoords[2]}&output=embed`
  }

  const coords = raw.match(/(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/)
  if (coords) {
    return `https://www.google.com/maps?q=${coords[1]},${coords[2]}&output=embed`
  }

  try {
    const url = new URL(raw)
    if (url.hostname.includes('google.')) {
      const query = url.searchParams.get('q') || url.searchParams.get('query')
      if (query) {
        return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
      }
    }
  } catch {
    // Treat as query below
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(raw)}&output=embed`
}

// Loose validation used by the admin/owner forms to catch obviously-wrong input
// (a non-Maps URL, or a short link that Google blocks from being embedded)
// before it's saved.
export function isValidGoogleMapsUrl(value) {
  const input = (value || '').trim()
  if (!input) return true

  // If it's short, it is invalid for embed
  if (input.includes('maps.app.goo.gl') || input.includes('goo.gl/maps') || input.includes('goo.gl')) {
    return false
  }

  const iframeSrc = input.match(/src=["']([^"']+)["']/i)?.[1]
  const rawUrl = iframeSrc || input

  try {
    const url = new URL(rawUrl)
    const hostname = url.hostname.toLowerCase()

    return (hostname.includes('google.') && (url.pathname.includes('/maps') || url.pathname.includes('/embed'))) ||
           (hostname === 'maps.google.com')
  } catch (e) {
    // If it's coordinate text, accept it
    return /^(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)$/.test(input)
  }
}

// Ensures a business record always has a `cabang` (branch) array, synthesizing a
// single "Cabang Utama" entry from the legacy flat alamat/mapsEmbed fields for
// records saved before the multi-branch feature existed. Mutates and returns
// the given object so it can be used inline when mapping Firestore snapshots.
export function normalizeBusinessCabang(data) {
  if (!data) return data
  if (!Array.isArray(data.cabang) || !data.cabang.length) {
    data.cabang = [{
      label: 'Cabang Utama',
      alamat: data.alamat || '',
      mapsEmbed: data.mapsEmbed || ''
    }]
  }
  return data
}
