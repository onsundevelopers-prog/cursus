import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['swr', 'convex', '@clerk/nextjs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailark.com',
      },
    ],
  },
};

export default nextConfig;
