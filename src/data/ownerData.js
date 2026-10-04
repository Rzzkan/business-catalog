import { reactive } from 'vue'

const storedOwners = localStorage.getItem('business-owners')
const initialOwners = storedOwners ? JSON.parse(storedOwners) : []

// Reactive store for business-owner accounts (login credentials created by the admin,
// each account can be linked to one or more businesses in businessStore).
export const ownerStore = reactive({
  ownerList: initialOwners,

  getAll() {
    return this.ownerList
  },

  getById(id) {
    return this.ownerList.find(o => o.id === Number(id))
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
    return this.ownerList.find(o => o.businessIds.includes(bId)) || null
  },

  // Returns the owner record on a successful email+password match, otherwise null.
  authenticate(email, password) {
    const owner = this.getByEmail(email)
    if (owner && owner.password === password) {
      return owner
    }
    return null
  },

  emailTaken(email, excludeId = null) {
    const clean = (email || '').trim().toLowerCase()
    if (!clean) return false
    return this.ownerList.some(o => o.email.toLowerCase() === clean && o.id !== Number(excludeId))
  },

  add(owner) {
    const newId = this.ownerList.length ? Math.max(...this.ownerList.map(o => o.id)) + 1 : 1
    const record = {
      id: newId,
      nama: (owner.nama || '').trim(),
      email: (owner.email || '').trim().toLowerCase(),
      password: owner.password || '',
      businessIds: Array.isArray(owner.businessIds) ? [...new Set(owner.businessIds.map(Number))] : [],
      fotoProfil: (owner.fotoProfil || '').trim()
    }
    this.ownerList.push(record)
    this.persist()
    return newId
  },

  update(id, data) {
    const index = this.ownerList.findIndex(o => o.id === Number(id))
    if (index !== -1) {
      const next = { ...this.ownerList[index], ...data }
      if (data.email) next.email = data.email.trim().toLowerCase()
      if (data.nama) next.nama = data.nama.trim()
      if (Array.isArray(data.businessIds)) next.businessIds = [...new Set(data.businessIds.map(Number))]
      // Keep the existing password when an edit submits an empty one.
      if (!data.password) next.password = this.ownerList[index].password
      this.ownerList[index] = next
      this.persist()
      return true
    }
    return false
  },

  delete(id) {
    const index = this.ownerList.findIndex(o => o.id === Number(id))
    if (index !== -1) {
      this.ownerList.splice(index, 1)
      this.persist()
      return true
    }
    return false
  },

  // Businesses still referencing a deleted business id are pruned from every owner
  // account so the dashboard never shows a dangling reference.
  unlinkBusiness(businessId) {
    const bId = Number(businessId)
    let changed = false
    this.ownerList.forEach(owner => {
      const idx = owner.businessIds.indexOf(bId)
      if (idx !== -1) {
        owner.businessIds.splice(idx, 1)
        changed = true
      }
    })
    if (changed) this.persist()
  },

  persist() {
    localStorage.setItem('business-owners', JSON.stringify(this.ownerList))
  }
})
