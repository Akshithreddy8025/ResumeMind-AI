'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkSession = () => {
      if (typeof window === 'undefined') return

      const session = localStorage.getItem('resumemind_session')
      setIsLoggedIn(Boolean(session))
    }

    checkSession()

    window.addEventListener('storage', checkSession)
    window.addEventListener('focus', checkSession)

    return () => {
      window.removeEventListener('storage', checkSession)
      window.removeEventListener('focus', checkSession)
    }
  }, [pathname])

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className="navbar">
      <Link
        href={isLoggedIn ? '/dashboard' : '/'}
        className="brand"
      >
        <span className="brand-icon">
          🧠
        </span>

        <span>
          ResumeMind AI
        </span>
      </Link>

      <div className="nav-links">
        {!isLoggedIn ? (
          <>
            <Link
              href="/"
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>

            <Link
              href="/templates"
              className={isActive('/templates') ? 'active' : ''}
            >
              Templates
            </Link>

            <Link
              href="/login"
              className={isActive('/login') ? 'active' : ''}
            >
              Login
            </Link>

            <Link
              href="/signup"
              className={isActive('/signup') ? 'active' : ''}
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className={isActive('/dashboard') ? 'active' : ''}
            >
              Dashboard
            </Link>

            <Link
              href="/resumes"
              className={isActive('/resumes') ? 'active' : ''}
            >
              Resumes
            </Link>

            <Link
              href="/report"
              className={isActive('/report') ? 'active' : ''}
            >
              Reports
            </Link>

            <Link
              href="/editor"
              className={isActive('/editor') ? 'active' : ''}
            >
              Editor
            </Link>

            <Link
              href="/skills"
              className={isActive('/skills') ? 'active' : ''}
            >
              Skills
            </Link>

            <Link
              href="/templates"
              className={isActive('/templates') ? 'active' : ''}
            >
              Templates
            </Link>

            <Link
              href="/company-match"
              className={isActive('/company-match') ? 'active' : ''}
            >
              Company Match
            </Link>

            <Link
              href="/history"
              className={isActive('/history') ? 'active' : ''}
            >
              History
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}