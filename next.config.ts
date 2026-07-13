import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok.app"],
  devIndicators: false,
  output: "standalone",
};

export default nextConfig;
