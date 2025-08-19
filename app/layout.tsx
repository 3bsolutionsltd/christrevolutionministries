import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Christ Revolution Ministries',
  description: 'A fresh Next + Tailwind starter inside crministries',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
