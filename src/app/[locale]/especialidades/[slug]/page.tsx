// =============================================================================
// /[locale]/especialidades/[slug]/page.tsx — LP dinâmica de especialidade | HSR
// =============================================================================
// Lookup em ESPECIALIDADES_LP estático. notFound() se slug não existir.
// LP de conversão para tráfego pago → WhatsApp.
// =============================================================================

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { EspecialidadeLPTemplate } from "@/components/templates/especialidade-lp-template"
import {
  getAllEspecialidadeLPSlugs,
  getEspecialidadeLPBySlug,
} from "@/lib/structure-especialidade-lp"
import { routing } from "@/i18n/routing"
import { SITE_METADATA } from "@/lib/data/meta"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllEspecialidadeLPSlugs()
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const lp = await getEspecialidadeLPBySlug(slug)

  if (!lp) {
    return { title: "Especialidade não encontrada | Hospital São Rafael" }
  }

  return {
    title: lp.meta.title,
    description: lp.meta.description,
    alternates: {
      canonical: `${SITE_METADATA.url}/${locale}/especialidades/${slug}`,
    },
    openGraph: {
      title: lp.meta.title,
      description: lp.meta.description,
      images: [
        {
          url: lp.hero.backgroundImage,
          width: 1200,
          height: 630,
          alt: lp.hero.headline,
        },
      ],
    },
  }
}

export default async function EspecialidadeLPPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const lp = await getEspecialidadeLPBySlug(slug)

  if (!lp) {
    notFound()
  }

  return (
    <EspecialidadeLPTemplate
      data={lp}
      canonicalUrl={`${SITE_METADATA.url}/${locale}/especialidades/${slug}`}
    />
  )
}
