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
    'https://overclockedx-admin.vercel.app', // ✅ no trailing slash
  ],
};

export default nextConfig;
