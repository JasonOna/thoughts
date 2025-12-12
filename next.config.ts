import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/thoughts',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/thoughts',
  },
};

export default nextConfig;
