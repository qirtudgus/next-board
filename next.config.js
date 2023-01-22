/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: { displayName: true, ssr: true, minify: true },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i1.daumcdn.net',
      },
    ],
  },
};
module.exports = nextConfig;
// const withTM = require('next-transpile-modules')(['three']);
// module.exports = withTM();
