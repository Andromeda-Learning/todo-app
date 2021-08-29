import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
export { collection, getDocs, doc, onSnapshot } from 'firebase/firestore'

const firebaseCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID
}

export const initFirebase = () =>
  initializeApp(firebaseCredentials)

export const getDb = () =>
  getFirestore()
