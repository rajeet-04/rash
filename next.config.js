/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '' : '',
  assetPrefix: isProd ? '' : '',
  images: {
    unoptimized: true, // required for static export
  },
};

module.exports = nextConfig;
