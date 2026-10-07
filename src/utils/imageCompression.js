// Client-side image resize/recompress, run in the browser before a file ever
// leaves the device. Keeps R2 storage small by re-encoding to WebP at a size
// that matches where the image actually gets displayed on the site (a hero
// banner needs more pixels than a tiny avatar), instead of storing whatever
// resolution the visitor's camera happened to produce.

// Presets tuned to how each field is rendered across the site:
// - hero: business detail page banner (BusinessDetailPage.vue) — the largest
//   display context, so it keeps the most detail.
// - gallery: Foto Tempat / Foto Produk / Foto Menu — shown in smaller grids
//   and cards, compressed more aggressively.
// - avatar: owner profile photo — only ever shown as a small circular image.
export const COMPRESSION_PRESETS = {
  hero: { maxWidth: 1600, maxHeight: 1600, quality: 0.82 },
  gallery: { maxWidth: 1200, maxHeight: 1200, quality: 0.78 },
  avatar: { maxWidth: 600, maxHeight: 600, quality: 0.85 }
}

const OUTPUT_MIME_TYPE = 'image/webp'

// Animated GIFs would lose their animation if run through a canvas (only the
// first frame survives), so they are uploaded as-is.
const SKIP_COMPRESSION_TYPES = new Set(['image/gif'])

// Resizes `file` to fit within the preset's box (never upsamples) and
// re-encodes it as WebP at the preset's quality. Falls back to the original
// file whenever compression isn't possible or doesn't actually help, so a
// failure here never blocks the upload.
export async function compressImage(file, preset = COMPRESSION_PRESETS.gallery) {
  if (!file || SKIP_COMPRESSION_TYPES.has(file.type)) return file
  if (typeof createImageBitmap !== 'function' || typeof document === 'undefined') {
    return file
  }

  try {
    const bitmap = await createImageBitmap(file)
    const { maxWidth, maxHeight, quality } = preset
    const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height)
    const targetWidth = Math.max(1, Math.round(bitmap.width * scale))
    const targetHeight = Math.max(1, Math.round(bitmap.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight)
    bitmap.close?.()

    const blob = await new Promise(resolve => canvas.toBlob(resolve, OUTPUT_MIME_TYPE, quality))

    // No WebP support, or the "compressed" result is somehow not smaller
    // (e.g. a tiny icon that was already optimal) — keep the original.
    if (!blob || blob.size >= file.size) return file
    return blob
  } catch (err) {
    console.warn('Kompresi gambar gagal, mengunggah file asli:', err)
    return file
  }
}
