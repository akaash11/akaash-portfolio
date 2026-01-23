import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compiler options for better performance
  compiler: {
    // Remove console logs in production (keep errors and warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps for faster builds and smaller bundle
};

export default nextConfig;
