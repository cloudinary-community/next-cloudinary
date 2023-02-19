/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'test'
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
