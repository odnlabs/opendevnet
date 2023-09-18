/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.opendevnet.com',
      'opendevnet.com',
      'localhost',
      'avatars.githubusercontent.com',
    ],
  },
  reactStrictMode: true,
  transpilePackages: ['@odnlabs/ui'],
};

module.exports = nextConfig;
