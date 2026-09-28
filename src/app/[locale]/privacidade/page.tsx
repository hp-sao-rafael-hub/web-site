// =============================================================================
// PAGE.TSX — /[locale]/privacidade | Hospital São Rafael
// =============================================================================
// Política de Privacidade. v1 — base genérica para refinamento jurídico futuro.
// Conteúdo em src/lib/legal-content.ts. Layout em LegalPageTemplate.
// =============================================================================

import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { LegalPageTemplate } from "@/components/templates/legal-page-template"
import { PRIVACY_POLICY_DATA } from "@/lib/legal-content"
import { routing } from "@/i18n/routing"
import { SITE_URL } from "@/lib/data/meta"

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: "Política de Privacidade",
    description:
      "Como o Hospital São Rafael coleta, utiliza, armazena e protege os dados pessoais dos visitantes deste site, em conformidade com a LGPD.",
    alternates: {
      canonical: `/${locale}/privacidade/`,
    },
    openGraph: {
      url: `${SITE_URL}/${locale}/privacidade/`,
    },
    robots: {
      index: locale !== "en",
      follow: true,
      googleBot: { index: locale !== "en", follow: true },
    },
  }
}

export default async function PrivacidadePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <LegalPageTemplate
      data={PRIVACY_POLICY_DATA}
      breadcrumbLabel="Política de Privacidade"
      pagePath={`/${locale}/privacidade`}
    />
  )
}
