import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const serviceAccount = require('./../secret/sertis-e6e6e-firebase-adminsdk-lvtgx-c52171490b.json')

initializeApp({
  credential: cert(serviceAccount)
})
// firestore db setup
const db = getFirestore()
export {
  db, Timestamp
}
