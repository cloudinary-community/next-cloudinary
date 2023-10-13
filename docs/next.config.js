const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
})

module.exports = withNextra({
  env: {
    ASSETS_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_DIRECTORY || 'assets',
    IMAGES_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_IMAGES_DIRECTORY || 'images',
    VIDEOS_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEOS_DIRECTORY || 'videos'
  },
  async redirects() {
    return [
      {
        source: '/components/:path(.*)',
        destination: '/:path*',
        permanent: false,
      },
      {
        source: '/helpers/:path(.*)',
        destination: '/:path*',
        permanent: false,
      },
      {
        source: '/use-cases/:path(.*)',
        destination: '/guides/:path*',
        permanent: false,
      },
      {
        source: '/resources',
        destination: '/',
        permanent: false,
      },
    ];
  }
});