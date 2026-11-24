import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compiler options for better performance
  compiler: {
    // Remove console logs in production (keep errors and warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // The blog index was merged into the homepage Writing section.
  async redirects() {
    return [{ source: '/blog', destination: '/#writing', permanent: false }];
  },

  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps for faster builds and smaller bundle
};

export default nextConfig;
