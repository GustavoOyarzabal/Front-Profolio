const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
  },
})

module.exports = withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['res.cloudinary.com'], // dominio cloudinary
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
