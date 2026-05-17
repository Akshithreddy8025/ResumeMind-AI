'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { auth, signOut } from '../lib/firebase'

export default function ProfileMenu() {
  const router = useRouter()
  const pathname = usePathname()
  const menuRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadUser = () => {
      const session = localStorage.getItem('resumemind_session')
      const savedUser = localStorage.getItem('resumemind_user')

      if (!session && !savedUser) {
        setUser(null)
        setReady(true)
        return
      }

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch {
          setUser(null)
        }
      }

      setReady(true)
    }

    loadUser()

    let unsubscribe = null

    try {
      unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          const cleanUser = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || 'ResumeMind User',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || ''
          }

          setUser(cleanUser)

          localStorage.setItem(
            'resumemind_user',
            JSON.stringify(cleanUser)
          )

          localStorage.setItem(
            'resumemind_session',
            JSON.stringify({
              uid: firebaseUser.uid,
              loginMethod: 'firebase',
              loggedInAt: new Date().toISOString()
            })
          )
        } else {
          loadUser()
        }

        setReady(true)
      })
    } catch {
      loadUser()
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const hideOnAuthPages =
    pathname === '/login' ||
    pathname === '/signup'

  if (!ready || hideOnAuthPages || !user) {
    return null
  }

  const displayName =
    user?.displayName ||
    user?.name ||
    'ResumeMind User'

  const email =
    user?.email ||
    'No email found'

  const photoURL =
    user?.photoURL ||
    user?.photo ||
    ''

  const initial =
    displayName?.charAt(0)?.toUpperCase() ||
    email?.charAt(0)?.toUpperCase() ||
    'U'

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch {
      // Ignore Firebase logout issue and clear local session
    }

    localStorage.removeItem('resumemind_user')
    localStorage.removeItem('resumemind_session')
    localStorage.removeItem('resumemind_latest_analysis')
    localStorage.removeItem('resumemind_latest_meta')

    setOpen(false)
    setUser(null)

    router.push('/login')
  }

  return (
    <div className="profile-floating-wrapper" ref={menuRef}>
      <button
        type="button"
        className="profile-floating-button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open profile menu"
      >
        {
          photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="profile-floating-image"
            />
          ) : (
            <span>
              {initial}
            </span>
          )
        }
      </button>

      {
        open ? (
          <div className="profile-floating-dropdown">
            <div className="profile-dropdown-header">
              <div className="profile-dropdown-avatar">
                {
                  photoURL ? (
                    <img src={photoURL} alt="Profile" />
                  ) : (
                    <span>{initial}</span>
                  )
                }
              </div>

              <div>
                <h3>{displayName}</h3>
                <p>{email}</p>
              </div>
            </div>

            <div className="profile-dropdown-stats">
              <div>
                <strong>0</strong>
                <span>Analyses</span>
              </div>

              <div>
                <strong>0</strong>
                <span>Reports</span>
              </div>

              <div>
                <strong>0</strong>
                <span>Resumes</span>
              </div>
            </div>

            <div className="profile-dropdown-actions">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  router.push('/profile')
                }}
              >
                👤 Your Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  router.push('/history')
                }}
              >
                📁 Analysis History
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  router.push('/templates')
                }}
              >
                🧾 Saved Templates
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  router.push('/settings')
                }}
              >
                ⚙️ Settings
              </button>

              <button
                type="button"
                className="logout-profile-btn"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}