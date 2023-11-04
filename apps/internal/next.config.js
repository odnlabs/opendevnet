const withMDX = require('@next/mdx')();
const { join } = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/internal',
  reactStrictMode: false, // Prevent multiple refreshes in dev mode.
  transpilePackages: ['@odnlabs/ui', '@odnlabs/utils-client', '@odnlabs/utils'],
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // distDir: '../../dist/apps/site/.next', // commented out, because it should not leave the project directory.
  experimental: {
    // this includes files from the monorepo base two directories up.
    outputFileTracingRoot: join(__dirname, '../../'),
    webpackBuildWorker: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opendevnet.com',
      },
      {
        // For GitHub avatars.
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
    ],
  },
  env: {
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    PUBLIC_WS_URL: process.env.PUBLIC_WS_URL,
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL,
    PUBLIC_WEB_URL: process.env.PUBLIC_WEB_URL,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = withMDX(nextConfig);
