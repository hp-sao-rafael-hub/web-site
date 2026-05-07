import { cache } from "react"
import { SERVICES_CONTENT } from "@/lib/services-content"
import type { ServiceDetailData } from "@/lib/services-content"

export const getServiceDataBySlug = cache(
  async (slug: string): Promise<ServiceDetailData | null> => {
    return SERVICES_CONTENT[slug] ?? null
  }
)

export const getAllServiceSlugs = cache(async (): Promise<string[]> => {
  return Object.keys(SERVICES_CONTENT)
})