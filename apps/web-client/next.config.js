const withMDX = require('@next/mdx')();
const { join } = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/app',
  reactStrictMode: false, // Prevent multiple refreshes in dev mode.
  transpilePackages: [
    '@odnlabs/api-client',
    '@odnlabs/ui',
    '@odnlabs/utils-client',
    '@odnlabs/utils-server',
  ],
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // distDir: '../../dist/apps/web-client/.next', // commented out, because it should not leave the project directory.
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
    PUBLIC_WEBSITE_URL: process.env.PUBLIC_WEBSITE_URL,
    PUBLIC_WEB_CLIENT_URL: process.env.PUBLIC_WEB_CLIENT_URL,
  },
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = withMDX(nextConfig);
