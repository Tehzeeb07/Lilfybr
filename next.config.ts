import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dnnemyksfegffnyynfpr.supabase.co",
      },
    ],
  },
};

export default nextConfig;