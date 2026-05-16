import AuthProvider from '../components/AuthProvider'
import './globals.css'

export const metadata = {
  title: 'ResumeMind AI',
  description: 'Premium AI Resume Platform'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AuthProvider />
        {children}
      </body>
    </html>
  )
}