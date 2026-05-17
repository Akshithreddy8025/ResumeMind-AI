'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem('resumemind_session')

    if (!session) {
      router.replace('/login')
      return
    }

    setChecking(false)
  }, [pathname, router])

  if (checking) {
    return (
      <main className="page">
        <div className="glow one"></div>
        <div className="glow two"></div>
        <div className="glow three"></div>

        <div className="auth-loading">
          <div className="auth-loader"></div>

          <h2>
            Checking your session...
          </h2>

          <p>
            Preparing your ResumeMind AI workspace.
          </p>
        </div>
      </main>
    )
  }

  return children
}