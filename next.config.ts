import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compiler options for better performance
  compiler: {
    // Remove console logs in production (keep errors and warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Posts moved from /blog to /writing; keep old links (LinkedIn, Medium, crawlers) working.
  async redirects() {
    return [
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/blog/:slug', destination: '/writing/:slug', permanent: true },
      { source: '/blog/:slug/:file', destination: '/writing/:slug/:file', permanent: true },
    ];
  },

  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps for faster builds and smaller bundle
};

export default nextConfig;
