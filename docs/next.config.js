const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
});

module.exports = withNextra({
  env: {
    IMAGES_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_IMAGES_DIRECTORY || 'images',
    VIDEOS_DIRECTORY: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEOS_DIRECTORY || 'videos'
  },
  webpack: (config) => {
    for (const [index, rule] of config.module.rules.entries()) {
      if (!rule.test && rule.oneOf) {
        config.module.rules[index].oneOf = [
          {
            resourceQuery: /raw/,
            type: "asset/source",
          },
        ].concat(config.module.rules[index].oneOf);
      }
    }

    return config;
  },
});