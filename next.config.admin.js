const crypto = require('crypto');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for admin hosting
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
    unoptimized: true, // Required for static export
    domains: ['christrevolutionministries.org'], // Restrict image domains
    deviceSizes: [640, 750, 828, 1080, 1200], // Optimize image sizes
    imageSizes: [16, 32, 48, 64, 96], // Optimize image sizes
  },
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