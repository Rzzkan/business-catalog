// Uploads an image file straight to Cloudflare R2 using a short-lived presigned
// PUT URL obtained from the `/api/r2-presign` serverless function, so the R2
// secret key never reaches the browser. Returns the public URL to store on
// the business/product record (same shape as the URLs that used to be pasted
// by hand into the foto fields).

const MAX_FILE_BYTES = 8 * 1024 * 1024 // 8MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])

export async function uploadImageToR2(file) {
  if (!file) throw new Error('Tidak ada file yang dipilih.')
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error('Format gambar tidak didukung. Gunakan JPG, PNG, WEBP, GIF, atau AVIF.')
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error('Ukuran gambar maksimal 8MB.')
  }

  const presignResponse = await fetch('/api/r2-presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contentType: file.type })
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

  const { uploadUrl, publicUrl } = await presignResponse.json()
  if (!uploadUrl || !publicUrl) {
    throw new Error('Respons upload tidak valid dari server.')
  }

  const putResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file
  })

  if (!putResponse.ok) {
    throw new Error(`Gagal mengunggah gambar ke penyimpanan (status ${putResponse.status}).`)
  }

  return publicUrl
}
