import { initializeApp, getApps } from 'firebase/app'

import {
  getAuth,
  GoogleAuthProvider,
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
  reauthenticateWithCredential
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBHh5EjctfR4xSovPYya0hwJo29tAW_1t8',
  authDomain: 'ai-resume-6d715.firebaseapp.com',
  projectId: 'ai-resume-6d715',
  storageBucket: 'ai-resume-6d715.firebasestorage.app',
  messagingSenderId: '264415729067',
  appId: '1:264415729067:web:93e05572c1253f866d6eee'
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()

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
  reauthenticateWithCredential
}