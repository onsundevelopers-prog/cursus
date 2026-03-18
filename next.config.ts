import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['swr'],
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
