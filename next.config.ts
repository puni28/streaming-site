import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      dns : false,
      net : false,
      tls : false,
    };
    return config;
  },
};

export default nextConfig;
