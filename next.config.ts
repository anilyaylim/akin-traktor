import type { NextConfig } from 'next';

// Static export → Cloudflare Pages (no server). Output goes to ./out
// BASE_PATH: '' for Cloudflare Pages (domain root), '/akin-traktor' for the GitHub Pages test build
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const config: NextConfig = {
  output: 'export',
  basePath: base || undefined,
  assetPrefix: base || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default config;
