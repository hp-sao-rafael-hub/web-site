"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"

const STORAGE_KEY = "hsr-lang-suggest-dismissed"

const COPY = {
  en: {
    message: "This site is also available in English.",
    cta: "View in English",
    dismiss: "Dismiss",
  },
  pt: {
    message: "Este site também está disponível em português.",
    cta: "Ver em português",
    dismiss: "Fechar",
  },
} as const

type Target = keyof typeof COPY

export function LangSuggestBanner() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [target, setTarget] = useState<Target | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const browserLang = (navigator.language || "").toLowerCase()
    const prefersEn = browserLang.startsWith("en")
    const prefersPt = browserLang.startsWith("pt")

    if (prefersEn && locale === "pt") setTarget("en")
    else if (prefersPt && locale === "en") setTarget("pt")
  }, [locale])

  if (!target) return null

  const copy = COPY[target]

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1")
    setTarget(null)
  }

  const accept = () => {
    sessionStorage.setItem(STORAGE_KEY, "1")
    router.replace(pathname, { locale: target })
  }

  return (
    <div
      role="region"
      aria-label={copy.message}
      className="fixed bottom-4 left-1/2 z-50 flex w-[min(92vw,560px)] -translate-x-1/2 items-center gap-3 rounded-full border border-charcoal/10 bg-white px-4 py-3 shadow-lg"
    >
      <span className="flex-1 text-sm text-charcoal">{copy.message}</span>
      <button
        type="button"
        onClick={accept}
        className="rounded-full bg-[#FFB800] px-4 py-1.5 text-sm font-semibold text-charcoal transition-colors hover:bg-[#E6A600]"
      >
        {copy.cta}
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label={copy.dismiss}
        className="rounded-full p-1 text-charcoal/60 transition-colors hover:bg-charcoal/5 hover:text-charcoal"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
