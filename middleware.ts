import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next()

  // Skip some security headers in development to allow HTTP
  if (process.env.NODE_ENV === 'development') {
    // Stricter CSP for development (removed unsafe-eval)
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com",
        "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com",
        "img-src 'self' data: https://img.youtube.com",
        "font-src 'self' data:",
        "connect-src 'self' https://api.github.com https://github.com",
        "frame-ancestors 'none'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "report-uri /api/csp-report"
      ].join('; ')
    )
    
    // Add basic security headers even in development
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    return response
  }

  // Production security headers with strengthened CSP
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://*.christrevolutionministries.org https://cdn.tailwindcss.com",
      "style-src 'self' 'unsafe-inline' https://*.christrevolutionministries.org https://cdn.tailwindcss.com",
      "img-src 'self' https://*.christrevolutionministries.org https://img.youtube.com https://avatars.githubusercontent.com data:",
      "font-src 'self' https://*.christrevolutionministries.org data:",
      "connect-src 'self' https://api.github.com https://github.com https://*.christrevolutionministries.org",
      "frame-ancestors 'none'",
      "form-action 'self' https://github.com",
      "base-uri 'self'",
      "object-src 'none'",
      "manifest-src 'self'",
      "media-src 'self' https://*.christrevolutionministries.org",
      "worker-src 'none'",
      "upgrade-insecure-requests",
      "block-all-mixed-content",
      "report-uri /api/csp-report"
    ].join('; ')
  )

  // Comprehensive production security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()')

  return response
}