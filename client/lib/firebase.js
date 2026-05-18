import { initializeApp, getApps } from 'firebase/app'

import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  sendEmailVerification,
  reauthenticateWithCredential,
  fetchSignInMethodsForEmail
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const missingFirebaseEnv = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key)

if (missingFirebaseEnv.length > 0) {
  console.warn(
    'Missing Firebase environment variables:',
    missingFirebaseEnv.join(', ')
  )
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const microsoftProvider = new OAuthProvider('microsoft.com')

microsoftProvider.setCustomParameters({
  prompt: 'select_account'
})

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  sendEmailVerification,
  reauthenticateWithCredential,
  fetchSignInMethodsForEmail
}