const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
});

module.exports = withNextra({
  env: {
    IMAGES_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_IMAGES_DIRECTORY || 'images',
    VIDEOS_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEOS_DIRECTORY || 'videos'
  }
});