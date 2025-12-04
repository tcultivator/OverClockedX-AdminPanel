import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "files.edgestore.dev" },
      { hostname: "res.cloudinary.com" },
      { hostname: "b.tile.openstreetmap.org" },
      { hostname: "images.barcodelookup.com" }, // ✅ no https://
    ],
  },
  allowedDevOrigins: [
    'https://myapp123.loca.lt', // ✅ no trailing slash
  ],
};

export default nextConfig;
