import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignorar erros de ESLint na build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignorar erros de TypeScript na build
  },
};

export default nextConfig;