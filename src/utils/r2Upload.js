// Uploads an image file straight to Cloudflare R2 using a short-lived presigned
// PUT URL obtained from the `/api/r2-presign` serverless function, so the R2
// secret key never reaches the browser. Returns the object's bare KEY (not a
// full URL) to store on the business/product record — the key plus the
// configurable Public Base URL (Admin > Pengaturan, see resolveImageUrl in
// data/businessData.js) is how the actual image URL gets resolved at display
// time, so changing the storage domain later never requires touching every
// stored record.
//
// Before the upload, the file is resized and recompressed in the browser
// (see imageCompression.js) so storage usage stays small regardless of the
// resolution the visitor's camera or phone originally produced.

import { compressImage, COMPRESSION_PRESETS } from './imageCompression'

// Generous cap on the file the browser is asked to decode/compress — this is
// the size check that runs on the ORIGINAL file, before compression.
const MAX_SOURCE_BYTES = 20 * 1024 * 1024 // 20MB
// Safety-net cap on what actually gets uploaded, after compression. A normal
// photo run through the presets above lands far below this; this only
// catches the rare case where compression didn't help much (e.g. a large
// animated GIF, which is never compressed).
const MAX_UPLOAD_BYTES = 6 * 1024 * 1024 // 6MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])

export async function uploadImageToR2(file, preset = COMPRESSION_PRESETS.gallery) {
  if (!file) throw new Error('Tidak ada file yang dipilih.')
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error('Format gambar tidak didukung. Gunakan JPG, PNG, WEBP, GIF, atau AVIF.')
  }
  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error('Ukuran gambar maksimal 20MB.')
  }

  const uploadBlob = await compressImage(file, preset)
  const contentType = uploadBlob.type || file.type

  if (uploadBlob.size > MAX_UPLOAD_BYTES) {
    throw new Error('Ukuran gambar masih terlalu besar setelah dikompres. Coba gunakan foto lain.')
  }

  const presignResponse = await fetch('/api/r2-presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contentType })
  })

  if (!presignResponse.ok) {
    let detail = ''
    try {
      detail = (await presignResponse.json())?.error || ''
    } catch {
      // response wasn't JSON - ignore and fall back to the generic message below
    }
    throw new Error(detail || `Gagal menyiapkan upload (status ${presignResponse.status}).`)
  }

  const { uploadUrl, key } = await presignResponse.json()
  if (!uploadUrl || !key) {
    throw new Error('Respons upload tidak valid dari server.')
  }

  const putResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: uploadBlob
  })

  if (!putResponse.ok) {
    throw new Error(`Gagal mengunggah gambar ke penyimpanan (status ${putResponse.status}).`)
  }

  return key
}
