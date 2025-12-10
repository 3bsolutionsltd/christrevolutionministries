import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next()

  // Skip security headers in development to allow HTTP
  if (process.env.NODE_ENV === 'development') {
    // Minimal CSP for development
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https://img.youtube.com",
        "font-src 'self' data:",
        "connect-src 'self'",
        "report-uri /api/csp-report"
      ].join('; ')
    )
    return response
  }

  // Production security headers
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.christrevolutionministries.org",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https://*.christrevolutionministries.org https://img.youtube.com data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "manifest-src 'self'",
      "media-src 'self'",
      "worker-src 'none'",
      "upgrade-insecure-requests", // Only in production
      "block-all-mixed-content", // Only in production
      "report-uri /api/csp-report"
    ].join('; ')
  )

  // Production security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return response
}