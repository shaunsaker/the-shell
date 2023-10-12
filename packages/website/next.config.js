/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['components'],

  // adds support for importing svg's as components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
