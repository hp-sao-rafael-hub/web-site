import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin'  // ← acrescentar

const withNextIntl = createNextIntlPlugin()  // ← acrescentar

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
}

export default withNextIntl(nextConfig)  // ← era: export default nextConfig
