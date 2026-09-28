const PRODUCTION_SITE_URL = "https://hospitalsaorafael.com"

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_SITE_URL).replace(/\/+$/, "")

export const SITE_PHONE = "+553125170900"
export const APPOINTMENT_PHONE = "+5531971511855"

export const SITE_METADATA = {
  title: "Hospital São Rafael | Centro de Cirurgias Eletivas Particulares - BH",
  description:
    "Hospital particular em Belo Horizonte para cirurgias programadas, com consultas, exames, internação e acompanhamento conforme a necessidade de cada caso.",
  url: SITE_URL,
  ogImage: "/og-image.png",
  locale: "pt_BR",
  type: "website",
} as const

export const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: "Hospital São Rafael",
  description: SITE_METADATA.description,
  url: SITE_METADATA.url,
  telephone: SITE_PHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Raja Gabáglia, 1380",
    addressLocality: "Belo Horizonte",
    addressRegion: "MG",
    postalCode: "30441-194",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: APPOINTMENT_PHONE,
    contactType: "appointment scheduling",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -19.9437,
    longitude: -43.9582,
  },
  medicalSpecialty: [
    "Ortopedia",
    "Cardiologia",
    "Neurologia",
    "Urologia",
    "Ginecologia",
    "Oftalmologia",
    // [PENDENTE CLIENTE] Completar lista
  ],
  availableService: {
    "@type": "MedicalProcedure",
    name: "Cirurgias Eletivas Particulares",
  },
} as const
