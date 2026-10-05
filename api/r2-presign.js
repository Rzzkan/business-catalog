// Vercel serverless function: generates a short-lived presigned PUT URL for
// Cloudflare R2 (S3-compatible API) so the browser can upload an image file
// directly to R2 without the R2 secret key ever reaching the client.
//
// Required environment variables (set in Vercel project settings, never
// committed to git):
//   R2_ACCOUNT_ID        - Cloudflare account id
//   R2_ACCESS_KEY_ID      - from an R2 API token scoped to the bucket below
//   R2_SECRET_ACCESS_KEY  - from the same R2 API token
//   R2_BUCKET_NAME        - the R2 bucket to upload into
//   R2_PUBLIC_BASE_URL    - public base URL for the bucket (the pub-xxxx.r2.dev
//                           URL, or a connected custom domain), no trailing slash

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
const BUCKET_NAME = process.env.R2_BUCKET_NAME
const PUBLIC_BASE_URL = process.env.R2_PUBLIC_BASE_URL

// Only images are accepted; the extension is derived from the content type
// rather than trusting a client-supplied filename.
const EXTENSION_BY_CONTENT_TYPE = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif'
}

let cachedClient = null
function getClient() {
  if (!cachedClient) {
    cachedClient = new S3Client({
      region: 'auto',
      endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
      }
    })
  }
  return cachedClient
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET_NAME || !PUBLIC_BASE_URL) {
    console.error('R2 belum dikonfigurasi: satu atau lebih environment variable kosong.')
    return res.status(500).json({ error: 'Konfigurasi penyimpanan gambar belum lengkap di server.' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }

  const contentType = (body && body.contentType) || ''
  const extension = EXTENSION_BY_CONTENT_TYPE[contentType]
  if (!extension) {
    return res.status(400).json({ error: 'Tipe file tidak didukung. Gunakan JPG, PNG, WEBP, GIF, atau AVIF.' })
  }

  const today = new Date().toISOString().slice(0, 10)
  const key = `uploads/${today}/${randomUUID()}.${extension}`

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType
    })
    const uploadUrl = await getSignedUrl(getClient(), command, { expiresIn: 300 })
    const publicUrl = `${PUBLIC_BASE_URL.replace(/\/$/, '')}/${key}`

    return res.status(200).json({ uploadUrl, publicUrl, key })
  } catch (err) {
    console.error('Gagal membuat presigned URL R2:', err)
    return res.status(500).json({ error: 'Gagal menyiapkan upload. Silakan coba lagi.' })
  }
}
