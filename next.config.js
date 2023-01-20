/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.dicebear.com',
            port: '',
            pathname: '/5.x/*/svg/**',
          },
        ],
        dangerouslyAllowSVG : true
      },
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = nextConfig
