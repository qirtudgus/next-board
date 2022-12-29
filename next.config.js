/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: { displayName: true, ssr: true, minify: true },
  },
  env: {
    customKey: 'my-value',
  },
};

module.exports = nextConfig;
