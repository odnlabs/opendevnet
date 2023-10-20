/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@odnlabs/ui', '@odnlabs/utils'],
  images: {
    domains: ['opendevnet.com', 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
