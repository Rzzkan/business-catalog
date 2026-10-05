import { reactive } from 'vue'
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { hashPassword, verifyPassword } from '../utils/password'

const ownersCollection = collection(db, 'owners')

// Reactive store for business-owner accounts (login credentials created by the admin,
// each account can be linked to one or more businesses in businessStore).
//
// Backed by Firestore: `ownerList` is kept in sync in real time via onSnapshot, so reads
// below (getAll/getById/getByEmail/getByBusinessId/emailTaken) stay synchronous against a
// local cache, while writes (add/update/delete/unlinkBusiness) are async Firestore calls.
//
// Passwords are never stored in plain text — only a random per-account salt and a
// PBKDF2-SHA256 hash derived from it (see src/utils/password.js). The plain password
// never leaves add()/update() once hashed.
export const ownerStore = reactive({
  ownerList: [],
  ready: false,

  getAll() {
    return this.ownerList
  },

  getById(id) {
    return this.ownerList.find(o => String(o.id) === String(id))
  },

  getByEmail(email) {
    const clean = (email || '').trim().toLowerCase()
    if (!clean) return null
    return this.ownerList.find(o => o.email.toLowerCase() === clean) || null
  },

  // Finds the owner account (if any) that this business is linked to — used to
  // keep the publicly displayed owner name/photo in sync with the login account.
  getByBusinessId(businessId) {
    const bId = Number(businessId)
    return this.ownerList.find(o => (o.businessIds || []).includes(bId)) || null
  },

  // Returns the owner record on a successful email+password match, otherwise null.
  // Async because verifying the hashed password uses the Web Crypto API.
  async authenticate(email, password) {
    const owner = this.getByEmail(email)
    if (!owner) return null
    const ok = await verifyPassword(password, owner.passwordSalt, owner.passwordHash)
    return ok ? owner : null
  },

  emailTaken(email, excludeId = null) {
    const clean = (email || '').trim().toLowerCase()
    if (!clean) return false
    return this.ownerList.some(o => o.email.toLowerCase() === clean && String(o.id) !== String(excludeId))
  },

  // Creates a new owner account. The plain password is hashed before it is written —
  // only the salt + hash ever reach Firestore. Returns the new numeric id.
  async add(owner) {
    const newId = this.ownerList.length ? Math.max(...this.ownerList.map(o => o.id)) + 1 : 1
    const { salt, hash } = await hashPassword(owner.password || '')
    const record = {
      id: newId,
      nama: (owner.nama || '').trim(),
      email: (owner.email || '').trim().toLowerCase(),
      passwordSalt: salt,
      passwordHash: hash,
      businessIds: Array.isArray(owner.businessIds) ? [...new Set(owner.businessIds.map(Number))] : [],
      fotoProfil: (owner.fotoProfil || '').trim(),
      nomorKTA: (owner.nomorKTA || '').trim()
    }
    await setDoc(doc(db, 'owners', String(newId)), record)
    return newId
  },

  // Updates an existing owner account. Pass `password` (plain text) only when it should
  // change — it is hashed here and the plain value is never written to Firestore.
  async update(id, data) {
    const existing = this.getById(id)
    if (!existing) return false

    const next = {}
    if (data.email) next.email = data.email.trim().toLowerCase()
    if (data.nama) next.nama = data.nama.trim()
    if (Array.isArray(data.businessIds)) next.businessIds = [...new Set(data.businessIds.map(Number))]
    if (typeof data.fotoProfil === 'string') next.fotoProfil = data.fotoProfil.trim()
    if (typeof data.nomorKTA === 'string') next.nomorKTA = data.nomorKTA.trim()
    if (data.password) {
      const { salt, hash } = await hashPassword(data.password)
      next.passwordSalt = salt
      next.passwordHash = hash
    }

    await updateDoc(doc(db, 'owners', String(existing.id)), next)
    return true
  },

  async delete(id) {
    const existing = this.getById(id)
    if (!existing) return false
    await deleteDoc(doc(db, 'owners', String(existing.id)))
    return true
  },

  // Businesses still referencing a deleted business id are pruned from every owner
  // account so the dashboard never shows a dangling reference.
  async unlinkBusiness(businessId) {
    const bId = Number(businessId)
    const affected = this.ownerList.filter(o => (o.businessIds || []).includes(bId))
    await Promise.all(
      affected.map(o => {
        const nextBusinessIds = o.businessIds.filter(existingId => existingId !== bId)
        return updateDoc(doc(db, 'owners', String(o.id)), { businessIds: nextBusinessIds })
      })
    )
  }
})

// Keep the reactive ownerList in sync with Firestore in real time, so every page
// reading it (admin panel, owner dashboard, business detail) always reflects the
// latest data without any manual refresh.
onSnapshot(
  query(ownersCollection, orderBy('id')),
  (snapshot) => {
    ownerStore.ownerList = snapshot.docs.map(d => d.data())
    ownerStore.ready = true
  },
  (error) => {
    console.error('Gagal memuat data akun pemilik dari Firestore:', error)
  }
)
