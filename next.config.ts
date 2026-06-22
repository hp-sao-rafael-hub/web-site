import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin'  // ← acrescentar

const withNextIntl = createNextIntlPlugin()  // ← acrescentar

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async redirects() {
    if (process.env.NODE_ENV !== "production") {
      return [{ source: "/", destination: "/pt", permanent: false }]
    }
    return []
  },
}

export default withNextIntl(nextConfig)  // ← era: export default nextConfig
