/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    cloudinary: {
      test: 'hey'
    }
  },
  experimental: { images: { allowFutureImage: true } }
}

module.exports = nextConfig
