import './globals.css'
import { ReactNode } from 'react'
// import ErrorBoundary from './components/ErrorBoundary'
// import ErrorLogger from './components/ErrorLogger'

export const metadata = {
  title: 'Christ Revolution Ministries',
  description: 'A fresh Next + Tailwind starter inside crministries',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Environment indicator for staging
  const isStaging = process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging'
  
  return (
    <html lang="en">
      <body>
        {/* <ErrorBoundary>
          <ErrorLogger /> */}
          {isStaging && (
            <div className="bg-yellow-500 text-black text-center py-1 text-sm font-medium">
              🚧 STAGING ENVIRONMENT - dev.christrevolutionministries.org 🚧
            </div>
          )}
          {children}
        {/* </ErrorBoundary> */}
      </body>
    </html>
  )
}
