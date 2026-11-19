const path = require('path');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
});

module.exports = withNextra({
  env: {
    ASSETS_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_DIRECTORY || 'assets',
    IMAGES_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_IMAGES_DIRECTORY || 'images',
    VIDEOS_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEOS_DIRECTORY || 'videos'
  },
  // The docs import next-cloudinary from the workspace, whose own node_modules
  // has React 19 / Next 16. Force a single copy of React and Next (the docs'
  // own versions) so components don't crash with duplicate React instances.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.dirname(require.resolve('react/package.json')),
      'react-dom': path.dirname(require.resolve('react-dom/package.json')),
      next: path.dirname(require.resolve('next/package.json')),
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/nextjs-13',
        destination: '/nextjs-14',
        permanent: false,
      },
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