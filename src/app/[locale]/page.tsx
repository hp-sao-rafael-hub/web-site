// =============================================================================
// PAGE.TSX — Home | Hospital São Rafael
// =============================================================================
// Ponto de entrada da rota "/".
// Delega toda a composição para HomeTemplate (T01).
// Header está em layout.tsx (renderizado fora do <main>).
// =============================================================================

import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { HomeTemplate } from "@/components/templates/home-template"
import { SITE_URL } from "@/lib/data/meta"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const pageUrl = `${SITE_URL}/${locale}/`

  return {
    alternates: { canonical: `/${locale}/` },
    openGraph: { url: pageUrl },
    robots: {
      index: locale !== "en",
      follow: true,
      googleBot: { index: locale !== "en", follow: true },
    },
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: "<!-- teste deploy 05/05 -->" }} />
      <HomeTemplate />
    </>
  )
}
