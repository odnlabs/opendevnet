const withMDX = require('@next/mdx')();
const { join } = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevent multiple refreshes in dev mode
  transpilePackages: ['@odnlabs/api-client', '@odnlabs/ui', '@odnlabs/utils'],
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // distDir: '../../dist/apps/site/.next', // commented out, because it should not leave the project directory
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: join(__dirname, '../../'),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['opendevnet.com', 'avatars.githubusercontent.com'],
  },
};

module.exports = withMDX(nextConfig);
