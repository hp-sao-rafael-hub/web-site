// =============================================================================
// PAGE.TSX — /privacidade | Hospital São Rafael
// =============================================================================
// Política de Privacidade. v1 — base genérica para refinamento jurídico futuro.
// Conteúdo em src/lib/legal-content.ts. Layout em LegalPageTemplate.
// =============================================================================

import type { Metadata } from "next"
import { LegalPageTemplate } from "@/components/templates/legal-page-template"
import { PRIVACY_POLICY_DATA } from "@/lib/legal-content"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Hospital São Rafael coleta, utiliza, armazena e protege os dados pessoais dos visitantes deste site, em conformidade com a LGPD.",
  alternates: {
    canonical: "/privacidade",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacidadePage() {
  return (
    <LegalPageTemplate
      data={PRIVACY_POLICY_DATA}
      breadcrumbLabel="Política de Privacidade"
      pagePath="/privacidade"
    />
  )
}
