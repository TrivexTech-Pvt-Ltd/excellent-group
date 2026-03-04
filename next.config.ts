import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Next.js <Image> to serve uploaded files from /public/uploads
  images: {
    remotePatterns: [],
    // Local /uploads path served from public/
  },
  // Increase body size limit for image uploads (default is 1MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
