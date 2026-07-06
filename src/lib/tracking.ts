// =============================================================================
// TRACKING.TS — Conversão de clique no WhatsApp | Hospital São Rafael
// =============================================================================
// Dispara conversão em TODAS as plataformas disponíveis, de forma defensiva
// (só dispara o que existir no window). Usado pelas LPs de especialidade
// (tráfego pago → WhatsApp).
//
// Plataformas:
//   - Meta Pixel  → fbq('track','Lead', ...)     [já integrado no site]
//   - Google Ads  → gtag('event','conversion')   [requer ID + label via env]
//   - GTM         → dataLayer.push('whatsapp_lead')
//
// CONFIG (opcional, via .env.local):
//   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
//   NEXT_PUBLIC_GADS_WHATSAPP_LABEL=AbC-D_efGhIjK
// Sem esses valores, o Google Ads é simplesmente ignorado (fbq + dataLayer
// continuam funcionando).
// =============================================================================

export const GOOGLE_ADS = {
  /** ID de conversão do Google Ads (formato AW-XXXXXXXXX) */
  conversionId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  /** Label da ação de conversão "clique no WhatsApp" */
  whatsappLabel: process.env.NEXT_PUBLIC_GADS_WHATSAPP_LABEL ?? "",
}

export interface WhatsAppConversionMeta {
  /** Especialidade da LP (ex "Ortopedia") — atribuição por campanha */
  specialty?: string
  /** Origem do clique: hero | inline | sticky | footer | header */
  location?: string
  /** href do link clicado */
  href?: string
}

/**
 * Dispara a conversão de clique no WhatsApp em todas as plataformas presentes.
 * Seguro para SSR (no-op fora do browser) e nunca lança.
 */
export function trackWhatsAppConversion(meta: WhatsAppConversionMeta = {}): void {
  if (typeof window === "undefined") return

  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }

  const payload = {
    content_name: meta.specialty ?? "especialidade",
    content_category: "whatsapp_lead",
    location: meta.location,
    href: meta.href,
  }

  // Meta Pixel — evento Lead
  try {
    w.fbq?.("track", "Lead", payload)
  } catch {
    /* noop */
  }

  // GTM / dataLayer
  try {
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ event: "whatsapp_lead", ...payload })
  } catch {
    /* noop */
  }

  // Google Ads — só se configurado
  try {
    if (w.gtag && GOOGLE_ADS.conversionId && GOOGLE_ADS.whatsappLabel) {
      w.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS.conversionId}/${GOOGLE_ADS.whatsappLabel}`,
      })
    }
  } catch {
    /* noop */
  }
}
