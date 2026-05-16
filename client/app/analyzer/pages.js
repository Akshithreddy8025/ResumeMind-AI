'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthGuard from '../../components/AuthGuard'

export default function Analyzer() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard')
  }, [router])

  return (
    <AuthGuard>
      <div className="page">
        <div className="container">
          <p style={{ color: '#cbd5e1', padding: '80px 0' }}>
            Opening analyzer...
          </p>
        </div>
      </div>
    </AuthGuard>
  )
}