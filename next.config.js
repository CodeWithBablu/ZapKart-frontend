/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [{ source: "/canceled", destination: "/", permanent: true }];
  },
}

module.exports = nextConfig
