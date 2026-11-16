import type { NextConfig } from 'next';

// Static export → Cloudflare Pages (no server). Output goes to ./out
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default config;
