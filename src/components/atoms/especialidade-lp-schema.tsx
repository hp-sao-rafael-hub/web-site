// =============================================================================
// ESPECIALIDADE-LP-SCHEMA.TSX — Átomo | Hospital São Rafael
// =============================================================================
// JSON-LD para LPs de especialidade. Schemas: MedicalWebPage (wrapper),
// MedicalClinic (especialidade), BreadcrumbList, FAQPage.
// Gerado server-side. Melhora SEO on-page p/ tráfego pago (rich results +
// relevância → Quality Score).
// =============================================================================

import type { EspecialidadeLPData } from "@/lib/data/especialidades-lp"

const SITE_URL = "https://hsr-xi.vercel.app"

const HSR_HOSPITAL = {
  "@type": "Hospital",
  "@id": `${SITE_URL}/#hospital`,
  name: "Hospital São Rafael",
  url: SITE_URL,
  telephone: "+55-31-2517-0000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Raja Gabáglia, 1380",
    addressLocality: "Belo Horizonte",
    addressRegion: "MG",
    postalCode: "30441-194",
    addressCountry: "BR",
  },
}

interface EspecialidadeLPSchemaProps {
  data: EspecialidadeLPData
  canonicalUrl: string
}

export function EspecialidadeLPSchema({
  data,
  canonicalUrl,
}: EspecialidadeLPSchemaProps) {
  const graph = [
    {
      "@type": "MedicalWebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: data.meta.title,
      description: data.meta.description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "MedicalClinic",
        name: `${data.termo} — Hospital São Rafael`,
        medicalSpecialty: data.termo,
        parentOrganization: HSR_HOSPITAL,
        availableService: data.exams.items.map((exam) => ({
          "@type": "MedicalProcedure",
          name: exam.title,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Especialidades",
          item: `${SITE_URL}/especialidades`,
        },
        { "@type": "ListItem", position: 3, name: data.termo, item: canonicalUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: data.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  )
}
