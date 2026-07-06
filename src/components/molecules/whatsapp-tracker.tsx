// =============================================================================
// WHATSAPP-TRACKER.TSX — Molécula | Hospital São Rafael
// =============================================================================
// Listener delegado que captura QUALQUER clique em link de WhatsApp dentro da
// página (hero, CTAs inline, sticky, footer) e dispara a conversão. Evita ter
// de instrumentar cada botão individualmente.
//
// Origem do clique (data-cta-location) é lida quando presente.
// =============================================================================

"use client"

import { useEffect } from "react"
import { trackWhatsAppConversion } from "@/lib/tracking"

const WHATSAPP_RE = /wa\.me|api\.whatsapp\.com|whatsapp:/i

interface WhatsAppTrackerProps {
  /** Especialidade da LP — usada na atribuição da conversão */
  specialty?: string
}

export function WhatsAppTracker({ specialty }: WhatsAppTrackerProps) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute("href") ?? ""
      if (!WHATSAPP_RE.test(href)) return

      trackWhatsAppConversion({
        specialty,
        href,
        location: anchor.dataset.ctaLocation,
      })
    }

    // capture:true garante disparo antes de navegação/target=_blank
    document.addEventListener("click", handler, { capture: true })
    return () => document.removeEventListener("click", handler, { capture: true })
  }, [specialty])

  return null
}
