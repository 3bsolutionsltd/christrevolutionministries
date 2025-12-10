const crypto = require('crypto');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export for deployment
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
    unoptimized: true, // Required for static export
    domains: ['christrevolutionministries.org', 'img.youtube.com'], // Allow YouTube thumbnails
  },
  // Exclude admin and API routes from static build
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        './app/api/admin/**/*',
        './app/api/auth/**/*', 
        './app/admin/**/*'
      ]
    }
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://christrevolutionministries.org' : '',
  // Use hash-based build ID for better security and caching
  generateBuildId: async () => {
    const date = new Date();
    const timestamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const hash = crypto.createHash('sha256').update(timestamp).digest('hex').substring(0, 8);
    return `${timestamp}-${hash}`;
  },
  // Security headers are handled by the web server configuration
}

module.exports = nextConfig
