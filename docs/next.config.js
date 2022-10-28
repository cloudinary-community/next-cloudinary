const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
});

module.exports = withNextra({
  env: {
    EXAMPLES_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_EXAMPLES_DIRECTORY || 'images'
  }
});