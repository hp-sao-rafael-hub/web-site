// =============================================================================
// CONDITIONAL-SITE-HEADER.TSX — Molécula | Hospital São Rafael
// =============================================================================
// Renderiza o SiteHeader global, EXCETO nas LPs de especialidade
// (/especialidades/[slug]), que usam header minimalista próprio para reduzir
// distração e maximizar conversão do tráfego pago.
// =============================================================================

"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/organisms/site-header"
import type { NavItem, NavCTA } from "@/types"

interface ConditionalSiteHeaderProps {
  navItems: NavItem[]
  cta: NavCTA
}

export function ConditionalSiteHeader({ navItems, cta }: ConditionalSiteHeaderProps) {
  const pathname = usePathname()

  // Esconde o header institucional nas LPs de especialidade.
  // Ex: /pt/especialidades/ortopedia, /en/especialidades/cardiologia
  if (pathname && /\/especialidades\/[^/]+/.test(pathname)) {
    return null
  }

  return <SiteHeader navItems={navItems} cta={cta} />
}
