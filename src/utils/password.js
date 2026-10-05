// Password hashing using the browser's built-in Web Crypto API (PBKDF2-SHA256).
// No plaintext password is ever stored in Firestore or localStorage — only a
// random per-user salt and the derived hash. This runs entirely client-side
// since the app has no server backend.
const ITERATIONS = 150000
const HASH_BYTE_LENGTH = 32 // 256 bits

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function fromHex(hex) {
  const clean = (hex || '').trim()
  const bytes = new Uint8Array(clean.length / 2)
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16)
  }
  return bytes
}

function randomSaltHex(byteLength = 16) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength))
  return toHex(bytes)
}

async function deriveHashHex(password, saltHex) {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: fromHex(saltHex),
      iterations: ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    HASH_BYTE_LENGTH * 8
  )
  return toHex(bits)
}

// Hashes a plain-text password for storage. Returns { salt, hash } — store both,
// never the original password.
export async function hashPassword(password) {
  const salt = randomSaltHex()
  const hash = await deriveHashHex(password, salt)
  return { salt, hash }
}

// Verifies a plain-text password attempt against a stored salt + hash.
export async function verifyPassword(password, salt, hash) {
  if (!salt || !hash || !password) return false
  const candidate = await deriveHashHex(password, salt)
  return candidate === hash
}
