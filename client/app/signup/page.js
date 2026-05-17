'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Navbar from '../../components/Navbar'

import {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from '../../lib/firebase'

export default function SignupPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  const saveSession = (firebaseUser, provider = 'email') => {
    const sessionUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name:
        firebaseUser.displayName ||
        formData.name ||
        firebaseUser.email?.split('@')[0] ||
        'User',
      photoURL: firebaseUser.photoURL || '',
      provider,
      loggedInAt: new Date().toISOString()
    }

    localStorage.setItem(
      'resumemind_session',
      JSON.stringify(sessionUser)
    )

    localStorage.setItem(
      'resumemind_user_profile',
      JSON.stringify(sessionUser)
    )

    localStorage.setItem(
      'resumemind_user',
      JSON.stringify(sessionUser)
    )
  }

  const getFirebaseErrorMessage = (code) => {
    if (code === 'auth/email-already-in-use') {
      return 'This email is already registered. Please login instead.'
    }

    if (code === 'auth/invalid-email') {
      return 'Please enter a valid email address.'
    }

    if (code === 'auth/weak-password') {
      return 'Password should be at least 6 characters.'
    }

    if (code === 'auth/popup-closed-by-user') {
      return 'Google signup was cancelled. Please try again.'
    }

    if (code === 'auth/cancelled-popup-request') {
      return 'Another Google popup was already opened. Please try again.'
    }

    if (code === 'auth/popup-blocked') {
      return 'Popup was blocked. Please allow popups and try again.'
    }

    if (code === 'auth/network-request-failed') {
      return 'Network error. Please check your internet and try again.'
    }

    return 'Signup failed. Please try again.'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters.')
      return
    }

    setLoading(true)

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim().toLowerCase(),
        formData.password
      )

      await updateProfile(response.user, {
        displayName: formData.name.trim()
      })

      const updatedUser = {
        ...response.user,
        displayName: formData.name.trim()
      }

      saveSession(updatedUser, 'email')
      router.push('/dashboard')
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await signInWithPopup(auth, googleProvider)

      saveSession(response.user, 'google')
      router.push('/dashboard')
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Google signup was cancelled. Please try again.')
        return
      }

      if (error.code === 'auth/cancelled-popup-request') {
        setError('Another Google popup was already opened. Please try again.')
        return
      }

      if (error.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups and try again.')
        return
      }

      setError(getFirebaseErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <div className="glow one"></div>
      <div className="glow two"></div>
      <div className="glow three"></div>

      <div className="container">
        <Navbar />

        <section className="auth-layout">
          <div className="auth-copy">
            <span className="eyebrow">
              Start Your Journey
            </span>

            <h1>
              Create your ResumeMind AI account
            </h1>

            <p>
              Sign up to analyze resumes, track ATS scores, compare company
              matches, save reports, and build improved resumes.
            </p>

            <div className="auth-feature-list">
              <span>🚀 AI Resume Analyzer</span>
              <span>🎯 ATS Score Tracking</span>
              <span>🏢 Company Match Reports</span>
              <span>📄 Resume Builder</span>
            </div>
          </div>

          <div className="auth-card">
            <span className="auth-icon">
              ✨
            </span>

            <h2>
              Signup
            </h2>

            <p>
              Create your account to access your AI resume dashboard.
            </p>

            {
              error ? (
                <div className="auth-error">
                  {error}
                </div>
              ) : null
            }

            <button
              type="button"
              className="google-login-btn"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <span className="google-icon">
                G
              </span>

              {loading ? 'Please wait...' : 'Continue with Google'}
            </button>

            <div className="auth-divider">
              <span></span>

              <p>
                or signup with email
              </p>

              <span></span>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="button auth-submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{' '}
              <Link href="/login">
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}