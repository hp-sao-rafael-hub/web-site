export const SITE_METADATA = {
  title: "Hospital São Rafael | Centro de Cirurgias Eletivas Particulares - BH",
  description:
    "A maior estrutura de cirurgias eletivas particulares do Brasil. Tecnologia de ponta, agilidade e acolhimento do diagnóstico à recuperação completa.",
  url: "https://hospitalsaorafael.com", // [PENDENTE CLIENTE] URL final do domínio
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
  telephone: "(31) 2517-XXXX", // [PENDENTE CLIENTE] Número real
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Raja Gabáglia, 1380",
    addressLocality: "Belo Horizonte",
    addressRegion: "MG",
    postalCode: "30441-194",
    addressCountry: "BR",
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
