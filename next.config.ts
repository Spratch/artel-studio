import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
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
  },
  allowedDevOrigins: ["192.168.1.170"]
};

export default nextConfig;
