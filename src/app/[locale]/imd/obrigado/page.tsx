import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { ImdThankYou } from "@/components/organisms/imd-thank-you"
import { ESPECIALIDADES_LP } from "@/lib/data/especialidades-lp"

export const metadata: Metadata = {
  title: "Solicitação recebida | IMD",
  description: "Confirmação de solicitação de atendimento no Instituto Médico e Diagnóstico do Hospital São Rafael.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default async function ImdThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const specialties = Object.fromEntries(Object.values(ESPECIALIDADES_LP).map(({ slug, termo }) => [slug, termo]))
  return <ImdThankYou locale={locale} specialties={specialties} />
}
