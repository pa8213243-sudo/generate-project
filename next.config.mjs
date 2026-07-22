/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ☢️ IGNORE ALL TS ERRORS
  },
  eslint: {
    ignoreDuringBuilds: true, // ☢️ IGNORE ALL ESLINT ERRORS
  },
};
export default nextConfig;