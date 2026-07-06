// =============================================================================
// ESPECIALIDADE-LP-HEADER.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Header MINIMALISTA para LPs de especialidade. Sem menu de navegação (reduz
// distração / fuga da conversão — boa prática de LP de tráfego pago).
// Apenas: logo (→ home) + CTA único de WhatsApp.
// =============================================================================

"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/atoms/logo"

interface EspecialidadeLPHeaderProps {
  whatsappHref?: string
}

export function EspecialidadeLPHeader({
  whatsappHref = "https://wa.me/5531971511855",
}: EspecialidadeLPHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-white/95 backdrop-blur-sm border-b border-cobre/10",
        "shadow-[0_1px_8px_rgba(46,46,46,0.04)]"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Hospital São Rafael — página inicial"
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro rounded"
        >
          <Logo height={38} />
        </Link>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-location="header"
          className={cn(
            "inline-flex items-center gap-2 shrink-0",
            "rounded-full px-4 py-2 lg:px-5 lg:py-2.5",
            "bg-ouro text-white font-bold text-xs lg:text-sm",
            "hover:bg-ouro-hover transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2"
          )}
        >
          <MessageCircle size={16} aria-hidden />
          <span className="hidden sm:inline">Falar no WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  )
}
