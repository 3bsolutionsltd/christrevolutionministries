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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com", // Required for Next.js and analytics
      "style-src 'self' 'unsafe-inline'", // Required for styled-components
      "img-src 'self' data: https: blob:", // Allow images from https sources
      "font-src 'self' data: https:", // Allow web fonts
      "connect-src 'self' https://cloudflareinsights.com", // Allow analytics
      "frame-ancestors 'none'", // Prevent clickjacking
      "form-action 'self'", // Restrict form submissions
      "base-uri 'self'", // Restrict base tag
      "require-trusted-types-for 'script'", // Prevent DOM XSS
      "trusted-types 'none'", // Disable trusted types (Next.js doesn't support it yet)
      "upgrade-insecure-requests", // Upgrade HTTP to HTTPS
      "report-uri /api/csp-report" // Monitor violations using our own endpoint
    ].join('; ')
  )
  )
  
  // Add CSP Report Only for testing new rules
  response.headers.set(
    'Content-Security-Policy-Report-Only',
    [
      "script-src 'strict-dynamic' 'nonce-{random}' 'unsafe-inline' http: https:",
      "object-src 'none'",
      "base-uri 'none'",
      "report-uri https://christrevolutionministries.report-uri.com/r/d/csp/reportOnly"
    ].join('; ')
  )

  // Add other security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return response
}