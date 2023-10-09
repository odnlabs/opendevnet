/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/app',
  reactStrictMode: true,
  transpilePackages: ['@odnlabs/ui', '@odnlabs/utils'],
};

module.exports = nextConfig;
