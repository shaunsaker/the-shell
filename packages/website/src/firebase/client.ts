import { FirebaseOptions, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

import firebaseConfig from '../../../../firebase.json'

const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const app = initializeApp(config)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)

if (process.env.NODE_ENV === 'development') {
  try {
    connectAuthEmulator(auth, `http://localhost:${firebaseConfig.emulators.auth.port}`, {
      disableWarnings: true,
    })
    connectFirestoreEmulator(db, 'localhost', firebaseConfig.emulators.firestore.port)
    connectFunctionsEmulator(functions, 'localhost', firebaseConfig.emulators.functions.port)
  } catch (error) {
    // silent error in case the emulators are not running
    console.error(error)
  }
}
