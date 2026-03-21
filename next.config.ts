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
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
