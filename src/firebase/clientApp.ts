import { initializeApp, getApp, getApps } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase fo Server Side Rendering
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const firestore = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { app, firestore, auth, storage }

// // Use Firestore emulator if in development environment
// if (process.env.NODE_ENV === 'development') {
//   connectFirestoreEmulator(firestore, 'localhost', 9080)
//   connectAuthEmulator(auth, 'http://localhost:9099') // Emulator Auth URL
//   connectStorageEmulator(storage, 'localhost', 9199) // Emulator Storage URL
//   // If using Firebase Functions emulator, you can also connect it here
//   // firebase.functions().useFunctionsEmulator('http://localhost:5001');
// }
