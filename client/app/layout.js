import './globals.css'
import ProfileMenu from '../components/ProfileMenu'

export const metadata = {
  title: 'ResumeMind AI',
  description: 'AI-powered resume analyzer platform'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProfileMenu />
        {children}
      </body>
    </html>
  )
}