// Firebase initialization for Business Catalog (Katalog Bisnis BPC HIPMI Bantul).
//
// This config is the standard Firebase *web app* config, which is safe to ship inside
// the client bundle (it identifies the project, it is not a secret credential) — Firebase
// protects data through Firestore Security Rules, not by hiding this object. See
// firestore.rules at the project root for the rules that should be published for this app,
// and the note at the bottom of that file about the current limits of client-only auth.
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyA7cp9b2h0Iga2v8qQHQ--ITpmQKVGCuL4',
  authDomain: 'business-catalog-3a442.firebaseapp.com',
  projectId: 'business-catalog-3a442',
  storageBucket: 'business-catalog-3a442.firebasestorage.app',
  messagingSenderId: '687360900522',
  appId: '1:687360900522:web:789f4b002d35ce5411ffd3',
  measurementId: 'G-EB9HL5QBFX'
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)

// Analytics only works in a real browser (not SSR, not every browser/privacy mode),
// so it's initialized lazily and guarded with isSupported() rather than at import time.
export let analytics = null
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(firebaseApp)
      }
    })
    .catch(() => {
      // Analytics is optional — ignore environments where it can't load.
    })
}
