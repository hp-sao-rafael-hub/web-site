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
  /** Label da ação de conversão "envio de formulário" */
  formLabel: process.env.NEXT_PUBLIC_GADS_FORM_LABEL ?? "",
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

// -----------------------------------------------------------------------------
// CONVERSÃO — envio de formulário de lead
// -----------------------------------------------------------------------------

export interface FormLeadMeta {
  /** Origem do formulário (ex "imd") — separa as fontes no CRM e no GTM */
  origem: string
  /** Identificador da instância do formulário na página (ex "imd-agendar") */
  formId?: string
  /** Especialidade/procedimento escolhido — atribuição por interesse */
  specialty?: string
  /** Cidade/estado informado — segmentação geográfica */
  city?: string
}

/**
 * Dispara a conversão de envio de formulário em todas as plataformas presentes.
 * Seguro para SSR (no-op fora do browser) e nunca lança.
 *
 * Só trafegam metadados: nome, telefone e e-mail NÃO vão para o dataLayer nem
 * para os pixels — dados pessoais seguem apenas para o CRM, via backend.
 */
export function trackFormLead(meta: FormLeadMeta): void {
  if (typeof window === "undefined") return

  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }

  const payload = {
    content_name: meta.specialty ?? "nao_informado",
    content_category: "form_lead",
    origem: meta.origem,
    form_id: meta.formId,
    city: meta.city,
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
    w.dataLayer.push({ event: "form_lead", ...payload })
  } catch {
    /* noop */
  }

  // Google Ads — só se configurado
  try {
    if (w.gtag && GOOGLE_ADS.conversionId && GOOGLE_ADS.formLabel) {
      w.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS.conversionId}/${GOOGLE_ADS.formLabel}`,
      })
    }
  } catch {
    /* noop */
  }
}
