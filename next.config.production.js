const crypto = require('crypto');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for shared hosting
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export
    domains: ['christrevolutionministries.org', 'img.youtube.com'],
  },
  // Generate static data at build time
  async generateBuildId() {
    const date = new Date();
    const timestamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const hash = crypto.createHash('sha256').update(timestamp).digest('hex').substring(0, 8);
    return `${timestamp}-${hash}`;
  },
}

module.exports = nextConfig