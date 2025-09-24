import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next()

  // Add security headers
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.christrevolutionministries.org", // Restrict to own domain
      "style-src 'self' 'unsafe-inline'", // Required for styled-components
      "img-src 'self' https://*.christrevolutionministries.org data:", // Restrict to own domain
      "font-src 'self' data:", // Restrict font sources
      "connect-src 'self'", // Restrict API connections
      "frame-ancestors 'none'", // Prevent clickjacking
      "form-action 'self'", // Restrict form submissions
      "base-uri 'self'", // Restrict base tag
      "object-src 'none'", // Prevent object injection
      "manifest-src 'self'", // Restrict manifest files
      "media-src 'self'", // Restrict media files
      "worker-src 'none'", // Restrict workers
      "upgrade-insecure-requests", // Upgrade HTTP to HTTPS
      "block-all-mixed-content", // Prevent mixed content
      "report-uri /api/csp-report" // Monitor violations using our own endpoint
    ].join('; ')
  )

  // Add other security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return response
}