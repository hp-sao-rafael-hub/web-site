// =============================================================================
// /servicos/[slug]/page.tsx — Página dinâmica de serviço | Hospital São Rafael
// =============================================================================
// Lookup em hospital_structure (Supabase) primeiro; fallback para
// SERVICES_CONTENT estático. notFound() se nenhum cobre o slug.
// =============================================================================

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ServiceDetailTemplate } from "@/components/templates/service-detail-template"
import {
  getAllServiceSlugs,
  getServiceDataBySlug,
} from "@/lib/structure-service-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  console.log("[META] start", slug)
  let service
  try {
    service = await getServiceDataBySlug(slug)
  } catch (err) {
    console.error("[META] " + slug + " threw:", err)
    throw err
  }
  console.log("[META] got service?", slug, !!service)

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
  const { slug } = await params
  let service
  try {
    service = await getServiceDataBySlug(slug)
  } catch (err) {
    console.error("[/servicos/" + slug + "] getServiceDataBySlug threw:", err)
    throw err
  }

  if (!service) {
    console.error("[/servicos/" + slug + "] service is null/undefined — calling notFound()")
    notFound()
  }

  try {
    return <ServiceDetailTemplate data={service} />
  } catch (err) {
    console.error("[/servicos/" + slug + "] template render threw:", err)
    throw err
  }
}
