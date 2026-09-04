import type { MetadataRoute } from "next"
import { getAllEspecialidadeLPSlugs } from "@/lib/structure-especialidade-lp"
import { getAllServiceSlugs } from "@/lib/structure-service-data"
import { SITE_URL } from "@/lib/data/meta"

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [specialtySlugs, serviceSlugs] = await Promise.all([
    getAllEspecialidadeLPSlugs(),
    getAllServiceSlugs(),
  ])

  return [
    { url: `${SITE_URL}/pt/` },
    ...specialtySlugs.map((slug) => ({
      url: `${SITE_URL}/pt/especialidades/${slug}/`,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${SITE_URL}/pt/servicos/${slug}/`,
    })),
    { url: `${SITE_URL}/pt/privacidade/` },
  ]
}
