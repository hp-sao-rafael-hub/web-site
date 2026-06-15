// =============================================================================
// PAGE.TSX — Home | Hospital São Rafael
// =============================================================================
// Ponto de entrada da rota "/".
// Delega toda a composição para HomeTemplate (T01).
// Header está em layout.tsx (renderizado fora do <main>).
// =============================================================================

import { setRequestLocale } from "next-intl/server"
import { HomeTemplate } from "@/components/templates/home-template"

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
