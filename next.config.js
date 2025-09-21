/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/rash' : '',
  assetPrefix: isProd ? '/rash/' : '',
  images: {
    unoptimized: true, // required for static export
  },
};

module.exports = nextConfig;
