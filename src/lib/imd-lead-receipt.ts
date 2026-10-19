export const IMD_RECEIPT_KEY = "hsr_imd_pending_lead"
const IMD_VIEW_KEY = "hsr_imd_thank_you_view"
const MAX_AGE_MS = 30 * 60 * 1000
export const IMD_UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const

export interface ImdLeadReceipt {
  version: 1
  eventId: string
  specialtySlug: string
  specialtyName: string
  sourcePath: string
  locale: "pt" | "en"
  createdAt: number
  utms: Record<string, string>
}

type ReceiptStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">

export function imdThankYouPath(locale: string): string {
  return `/${locale === "en" ? "en" : "pt"}/imd/obrigado/`
}

// Reconstruct from allowed fields instead of retaining arbitrary values or personal data.
export function parseImdReceipt(raw: string | null, locale: string, now = Date.now()): ImdLeadReceipt | null {
  try {
    const value = JSON.parse(raw || "null")
    if (!value || value.version !== 1 || value.locale !== locale ||
      !["pt", "en"].includes(value.locale) ||
      typeof value.eventId !== "string" || !/^[\w-]{1,100}$/.test(value.eventId) ||
      typeof value.specialtySlug !== "string" || !/^[a-z]+(?:-[a-z]+)*$/.test(value.specialtySlug) ||
      typeof value.specialtyName !== "string" || !value.specialtyName.trim() || value.specialtyName.length > 120 ||
      value.sourcePath !== `/${locale}/especialidades/${value.specialtySlug}/` ||
      !Number.isFinite(value.createdAt) || now < value.createdAt || now - value.createdAt > MAX_AGE_MS) return null
    return {
      version: 1, eventId: value.eventId, specialtySlug: value.specialtySlug,
      specialtyName: value.specialtyName, sourcePath: value.sourcePath,
      locale: value.locale, createdAt: value.createdAt,
      utms: Object.fromEntries(IMD_UTM_KEYS.flatMap(key =>
        typeof value.utms?.[key] === "string" ? [[key, value.utms[key].slice(0, 200)]] : [])),
    }
  } catch { return null }
}

export function saveImdReceipt(receipt: ImdLeadReceipt, storage: ReceiptStorage): boolean {
  try {
    const clean = parseImdReceipt(JSON.stringify(receipt), receipt.locale)
    if (!clean) return false
    storage.setItem(IMD_RECEIPT_KEY, JSON.stringify(clean))
    return true
  } catch { return false }
}

export function consumeImdReceipt(storage: ReceiptStorage, locale: string): ImdLeadReceipt | null {
  try {
    const raw = storage.getItem(IMD_RECEIPT_KEY)
    storage.removeItem(IMD_RECEIPT_KEY)
    const receipt = parseImdReceipt(raw, locale)
    if (receipt) {
      try { storage.setItem(IMD_VIEW_KEY, JSON.stringify(receipt)) } catch { /* Conversion consumption already succeeded. */ }
    }
    return receipt
  } catch { return null }
}

export function readImdView(storage: ReceiptStorage, locale: string): ImdLeadReceipt | null {
  try { return parseImdReceipt(storage.getItem(IMD_VIEW_KEY), locale) } catch { return null }
}

export function imdThankYouUrl(receipt: ImdLeadReceipt, sourceUrl: string): string {
  const source = new URL(sourceUrl)
  const result = new URL(imdThankYouPath(receipt.locale), source.origin)
  // Public page context only. This parameter never authorizes a conversion.
  result.searchParams.set("especialidade", receipt.specialtySlug)
  for (const key of [...IMD_UTM_KEYS, "gclid", "fbclid", "wbraid", "gbraid"]) {
    const value = source.searchParams.get(key) || receipt.utms[key]
    if (value) result.searchParams.set(key, value)
  }
  return result.pathname + result.search
}
