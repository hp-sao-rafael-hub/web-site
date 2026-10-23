"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"
import { TINTIM_BOOTSTRAP, tintimAccountForPath, tintimAttribution, withTintimAttribution } from "@/lib/tintim"

export function TintimTracking() {
  const pathname = usePathname()
  const attribution = useRef<URLSearchParams | null>(null)

  useEffect(() => {
    const currentAttribution = tintimAttribution(window.location.search)
    if (currentAttribution.size || !attribution.current) attribution.current = currentAttribution
    const installedAccount = (window as unknown as { tt?: { accountCode?: string } }).tt?.accountCode
    // The vendor core is initialized once per document. Crossing from HSR to
    // IMD (or back) needs a fresh document to initialize the correct account.
    if (installedAccount && installedAccount !== tintimAccountForPath(pathname)) {
      const destination = withTintimAttribution(window.location.href, attribution.current)
      if (destination === window.location.href) window.location.reload()
      else window.location.replace(destination)
    }
  }, [pathname])

  return (
    <Script id="tintim-tracking" strategy="afterInteractive">
      {TINTIM_BOOTSTRAP}
    </Script>
  )
}
