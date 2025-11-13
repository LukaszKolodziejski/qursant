//@ts-check

const { withNx } = require('@nx/next');

/**
 * ⚡⚡⚡ ULTRA PERFORMANCE OPTIMIZED CONFIG ⚡⚡⚡
 * - Compiler optimizations
 * - Package import optimization
 * - React strict mode dla production
 * - Security headers
 *
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },

  // ===================================================================
  // 🚀 PERFORMANCE OPTIMIZATIONS
  // ===================================================================

  // React Compiler Optimizations
  reactStrictMode: true,
  poweredByHeader: false,

  // Optimize Package Imports - reduce bundle size
  optimizePackageImports: [
    'react-icons',
    'react-icons/hi',
    'react-icons/fa',
    'react-icons/bs',
  ],

  // Compiler Options
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-icons', 'leaflet'],
  },

  // ===================================================================
  // 🖼️ IMAGE OPTIMIZATION
  // ===================================================================
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

module.exports = withNx(nextConfig);
