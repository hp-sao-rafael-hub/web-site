import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin'  // ← acrescentar

const withNextIntl = createNextIntlPlugin()  // ← acrescentar

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export não roda otimizador de imagem no servidor.
    unoptimized: true,
    remotePatterns: [],
  },
}

export default withNextIntl(nextConfig)  // ← era: export default nextConfig