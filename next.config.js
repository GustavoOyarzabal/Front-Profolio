const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
    largePageDataBytes: 128 * 100000,
  },
})

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ['res.cloudinary.com'], // dominio cloudinary
//     formats: ['image/avif', 'image/webp'],
//   },
//   compiler: {
//     emotion: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   experimental: {
//     scrollRestoration: true,
//     largePageDataBytes: 128 * 100000,
//   },
// }

// module.exports = nextConfig
