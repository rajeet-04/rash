/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // When deploying to GitHub Pages under the repository path (e.g. /rash),
  // set basePath and assetPrefix to the repo name so _next and assets are
  // requested from /rash/_next/... This only applies for production builds.
  basePath: isProd ? '/rash' : '',
  assetPrefix: isProd ? '/rash/' : '',
  images: {
    unoptimized: true, // required for static export
  },
};

module.exports = nextConfig;
