// =============================================================================
// PAGE.TSX — Home | Hospital São Rafael
// =============================================================================
// Ponto de entrada da rota "/".
// Delega toda a composição para HomeTemplate (T01).
// Header está em layout.tsx (renderizado fora do <main>).
// =============================================================================

import { setRequestLocale } from "next-intl/server"
import { HomeTemplate } from "@/components/templates/home-template"
import { routing } from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HomeTemplate />
}
