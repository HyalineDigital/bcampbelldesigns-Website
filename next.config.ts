/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This will allow the build to finish even with Type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;