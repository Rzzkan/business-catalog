// Shared helpers for reading/writing entries in the repeatable photo-list
// fields (foto.tempat, foto.produk, foto.menu). Each entry is either a
// legacy plain URL/R2-key string (every record saved before captions
// existed), or an object { url, caption } once a custom caption has been
// set for that photo - these helpers read/normalize either shape so the
// rest of the app never has to care which one a given record has.

export function photoEntryUrl(entry) {
  return typeof entry === 'string' ? entry : (entry?.url || '')
}

export function photoEntryCaption(entry) {
  return typeof entry === 'string' ? '' : (entry?.caption || '')
}

// Normalizes a stored/incoming photo list into { url, caption } objects for
// use in an editable form (UrlList.vue). Always returns at least one blank
// row so the form has an empty field ready to fill in.
export function normalizePhotoList(list) {
  if (!Array.isArray(list) || !list.length) return [{ url: '', caption: '' }]
  return list.map(entry => ({ url: photoEntryUrl(entry), caption: photoEntryCaption(entry) }))
}
