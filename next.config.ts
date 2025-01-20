import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignorar erros de ESLint na build
  },
};

export default nextConfig;
