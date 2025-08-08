//@ts-check

const { withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    // More specific redirect rules to avoid conflicts with middleware
    return [
      // Remove .html extensions only - middleware handles other normalization
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,
      },
      // Remove trailing slashes only for specific paths (not root and not all paths)
      {
        source: '/cennik/',
        destination: '/cennik',
        permanent: true,
      },
      {
        source: '/galeria/',
        destination: '/galeria',
        permanent: true,
      },
      {
        source: '/kontakt/',
        destination: '/kontakt',
        permanent: true,
      },
      {
        source: '/kursy/',
        destination: '/kursy',
        permanent: true,
      },
      {
        source: '/o-nas/',
        destination: '/o-nas',
        permanent: true,
      },
      {
        source: '/pytania/',
        destination: '/pytania',
        permanent: true,
      },
      {
        source: '/rezerwacja/',
        destination: '/rezerwacja',
        permanent: true,
      },
    ];
  },
};

module.exports = withNx(nextConfig);
