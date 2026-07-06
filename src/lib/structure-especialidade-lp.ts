import { cache } from "react"
import { ESPECIALIDADES_LP } from "@/lib/data/especialidades-lp"
import type { EspecialidadeLPData } from "@/lib/data/especialidades-lp"

export const getEspecialidadeLPBySlug = cache(
  async (slug: string): Promise<EspecialidadeLPData | null> => {
    return ESPECIALIDADES_LP[slug] ?? null
  }
)

export const getAllEspecialidadeLPSlugs = cache(async (): Promise<string[]> => {
  return Object.keys(ESPECIALIDADES_LP)
})
