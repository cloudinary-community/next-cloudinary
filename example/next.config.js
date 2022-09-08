/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    cloudinary: {
      test: 'hey'
    }
  }
}

module.exports = nextConfig
