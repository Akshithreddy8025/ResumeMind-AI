'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Navbar from '../../components/Navbar'

import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getRedirectResult
} from '../../lib/firebase'

export default function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkRedirectLogin = async () => {
      try {
        const response = await getRedirectResult(auth)

        if (response?.user) {
          saveSession(response.user, 'google')
          router.push('/dashboard')
        }
      } catch (error) {
        setError(getFirebaseErrorMessage(error.code))
      }
    }

    checkRedirectLogin()
  }, [router])

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
    if (code === 'auth/invalid-email') {
      return 'Please enter a valid email address.'
    }

    if (code === 'auth/user-not-found') {
      return 'No account found with this email. Please sign up first.'
    }

    if (code === 'auth/wrong-password') {
      return 'Incorrect password. Please try again.'
    }

    if (code === 'auth/invalid-credential') {
      return 'Invalid email or password.'
    }

    if (code === 'auth/popup-closed-by-user') {
      return 'Google login was cancelled. Please try again.'
    }

    if (code === 'auth/cancelled-popup-request') {
      return 'Another Google popup was already opened. Please try again.'
    }

    if (code === 'auth/popup-blocked') {
      return 'Popup was blocked. Please allow popups and try again.'
    }

    if (code === 'auth/too-many-requests') {
      return 'Too many attempts. Please wait and try again.'
    }

    if (code === 'auth/network-request-failed') {
      return 'Network error. Please check your internet and try again.'
    }

    return 'Login failed. Please try again.'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formData.email.trim().toLowerCase(),
        formData.password
      )

      saveSession(response.user, 'email')
      router.push('/dashboard')
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await signInWithPopup(auth, googleProvider)

      saveSession(response.user, 'google')
      router.push('/dashboard')
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Google login was cancelled. Please try again.')
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
              Welcome Back
            </span>

            <h1>
              Continue improving your resume with AI
            </h1>

            <p>
              Login to access your dashboard, ATS analysis, company matching,
              resume templates, skill gap insights, and resume builder workflow.
            </p>

            <div className="auth-feature-list">
              <span>📊 ATS Resume Score</span>
              <span>🏢 Company Role Match</span>
              <span>🧠 Skill Gap Detection</span>
              <span>📄 ATS Templates</span>
            </div>
          </div>

          <div className="auth-card">
            <span className="auth-icon">
              🔐
            </span>

            <h2>
              Login
            </h2>

            <p>
              Enter your account details to open your ResumeMind AI dashboard.
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
              onClick={handleGoogleLogin}
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
                or login with email
              </p>

              <span></span>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="button auth-submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="auth-switch">
              Don&apos;t have an account?{' '}
              <Link href="/signup">
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}