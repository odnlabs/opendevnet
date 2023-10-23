const withMDX = require('@next/mdx')();
const { join } = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['api-client', '@odnlabs/ui', '@odnlabs/utils'],
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
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/app',
        destination: `${process.env.WEB_URL}`,
      },
      {
        source: '/app/:path*',
        destination: `${process.env.WEB_URL}/:path*`,
      },
      {
        source: '/api',
        destination: `${process.env.API_URL}`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
