'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('resumemind_auth')

    if (!isLoggedIn) {
      router.replace('/login')
      return
    }

    setCheckingAuth(false)
  }, [router])

  if (checkingAuth) {
    return (
      <div className="page">
        <div className="container">
          <p style={{ color: '#cbd5e1', padding: '80px 0' }}>
            Checking login...
          </p>
        </div>
      </div>
    )
  }

  return children
}