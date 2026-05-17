'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('resumemind_user')
    setIsLoggedIn(Boolean(user))
  }, [pathname])

  const publicLinks = [
    {
      label: 'Home',
      href: '/'
    }
  ]

  const privateLinks = [
    {
      label: 'Dashboard',
      href: '/dashboard'
    },
    {
      label: 'Company Match',
      href: '/company-match'
    },
    {
      label: 'Templates',
      href: '/templates'
    }
  ]

  const guestLinks = [
    {
      label: 'Login',
      href: '/login'
    },
    {
      label: 'Signup',
      href: '/signup'
    }
  ]

  const links = isLoggedIn
    ? [...publicLinks, ...privateLinks]
    : [...publicLinks, ...guestLinks]

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  return (
    <nav className="navbar">
      <Link href="/" className="brand">
        <span className="brand-icon">
          R
        </span>

        <span>
          ResumeMind AI
        </span>
      </Link>

      <div className="nav-links">
        {
          links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))
        }
      </div>
    </nav>
  )
}