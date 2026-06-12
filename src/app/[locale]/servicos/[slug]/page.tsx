// =============================================================================
// /[locale]/servicos/[slug]/page.tsx — Página dinâmica de serviço | HSR
// =============================================================================
// Lookup em SERVICES_CONTENT estático. notFound() se slug não existir.
// =============================================================================

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { ServiceDetailTemplate } from "@/components/templates/service-detail-template"
import {
  getAllServiceSlugs,
  getServiceDataBySlug,
} from "@/lib/structure-service-data"
import { routing } from "@/i18n/routing"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export const dynamicParams = true

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceDataBySlug(slug)

  if (!service) {
    return {
      title: "Serviço não encontrado | Hospital São Rafael",
    }
  }

  return {
    title: service.meta.title,
    description: service.meta.description,
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      images: [
        {
          url: service.hero.backgroundImage,
          width: 1200,
          height: 630,
          alt: service.hero.headline,
        },
      ],
    },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const service = await getServiceDataBySlug(slug)

  if (!service) {
    notFound()
  }

  return <ServiceDetailTemplate data={service} />
}
