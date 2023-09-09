/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/app',
  reactStrictMode: true,
  transpilePackages: ['@odnlabs/ui'],
};

module.exports = nextConfig;
