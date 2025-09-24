const crypto = require('crypto');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  productionBrowserSourceMaps: false, // Disable source maps in production
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable Gzip compression
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['christrevolutionministries.org'], // Restrict image domains
    deviceSizes: [640, 750, 828, 1080, 1200], // Optimize image sizes
    imageSizes: [16, 32, 48, 64, 96], // Optimize image sizes
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://christrevolutionministries.org' : '',
  // Use hash-based build ID for better security and caching
  generateBuildId: async () => {
    const date = new Date();
    const timestamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const hash = crypto.createHash('sha256').update(timestamp).digest('hex').substring(0, 8);
    return `${timestamp}-${hash}`;
  },
  // Additional security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'X-Download-Options',
          value: 'noopen',
        },
        {
          key: 'X-Permitted-Cross-Domain-Policies',
          value: 'none',
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin',
        },
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'require-corp',
        },
        {
          key: 'Cross-Origin-Resource-Policy',
          value: 'same-site',
        },
        {
          key: 'Permissions-Policy',
          value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
        },
      ],
    },
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://christrevolutionministries.org',
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type',
        },
      ],
    },
  ],
}

module.exports = nextConfig
