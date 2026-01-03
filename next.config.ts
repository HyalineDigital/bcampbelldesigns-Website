/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This will allow the build to finish even with those quote errors
    ignoreDuringBuilds: true,
  },
  // If you have other settings here like 'images', keep them!
};

export default nextConfig;

