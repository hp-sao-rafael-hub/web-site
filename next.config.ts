import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin'  // ← acrescentar

const withNextIntl = createNextIntlPlugin()  // ← acrescentar

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
}

export default withNextIntl(nextConfig)  // ← era: export default nextConfig