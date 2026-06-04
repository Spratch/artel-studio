import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "image.mux.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: ""
      }
    ]
  }
};

export default nextConfig;
