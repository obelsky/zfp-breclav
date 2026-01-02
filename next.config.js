/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // SEO Optimization: vzdelavani-zfp → financni-vzdelavani
      {
        source: '/vzdelavani-zfp',
        destination: '/financni-vzdelavani',
        permanent: true, // 301 redirect
      },
      {
        source: '/vzdelavani-zfp/:path*',
        destination: '/financni-vzdelavani/:path*',
        permanent: true,
      },
      // SEO Optimization: poradenstvi → financni-poradenstvi
      {
        source: '/poradenstvi',
        destination: '/financni-poradenstvi',
        permanent: true, // 301 redirect
      },
      {
        source: '/poradenstvi/:path*',
        destination: '/financni-poradenstvi/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
