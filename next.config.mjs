/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export (out/): the app has no server code; served by nginx (see Dockerfile).
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
