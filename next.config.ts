import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/local",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
