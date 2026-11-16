#!/usr/bin/env bash
# Builds both versions into ./site: dark (root) and light v2 (/light).
#   BASE=/akin-traktor bash scripts/build-all.sh   # GitHub Pages
#   bash scripts/build-all.sh                      # Cloudflare Pages (domain root) → output dir: site
set -euo pipefail
BASE="${BASE:-}"
rm -rf site .next out
NEXT_PUBLIC_BASE_PATH="$BASE" NEXT_PUBLIC_ALT_BASE="$BASE/light" npx next build
mv out site
rm -rf .next
NEXT_PUBLIC_THEME=light NEXT_PUBLIC_BASE_PATH="$BASE/light" NEXT_PUBLIC_ALT_BASE="${BASE:-/}" npx next build
rm -rf out/brand
mv out site/light
touch site/.nojekyll
echo "built: site/ (dark) + site/light/ (light)"
