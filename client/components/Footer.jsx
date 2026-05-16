import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='footer'>

      <div>

        <h2>
          ResumeMind AI
        </h2>

        <p>
          AI-powered resume intelligence for students, freshers,
          and job seekers.
        </p>

      </div>

      <div className='footer-links'>

        <Link href='/'>
          Home
        </Link>

        <Link href='/dashboard'>
          Dashboard
        </Link>

        <Link href='/templates'>
          Templates
        </Link>

        <Link href='/login'>
          Login
        </Link>

      </div>

      <p className='copyright'>
        © 2026 ResumeMind AI. Built with Next.js, Express, Firebase, and Gemini AI.
      </p>

    </footer>
  )
}