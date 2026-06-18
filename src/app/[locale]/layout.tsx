// =============================================================================
// LAYOUT.TSX — Layout raiz | Hospital São Rafael
// =============================================================================
// Configuração global: fonte Montserrat, metadata SEO, schema JSON-LD,
// Header global (fora do <main> — semântica correta), providers.
// =============================================================================

import type { Metadata, Viewport } from "next"
import { SITE_METADATA, SCHEMA_DATA, NAV_ITEMS, NAV_CTA } from "@/lib/constants"
import { SiteHeader } from "@/components/organisms/site-header"
import FacebookPixel from "@/components/FacebookPixel"
import { LangSuggestBanner } from "@/components/molecules/lang-suggest-banner"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const BCP47: Record<string, string> = { pt: "pt-BR", en: "en-US" }

const NAV_KEY_BY_HREF: Record<string, string> = {
  "#hero": "inicio",
  "#diferenciais": "diferenciais",
  "#imd": "imd",
  "#servicos": "servicos",
  "#especialidades": "especialidades",
  "#produtos": "produtos",
  "#jornada": "jornada",
  "#medicos": "medicos",
  "#faq": "faq",
}

// -----------------------------------------------------------------------------
// METADATA — SEO (Next.js App Router)
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s | Hospital São Rafael`,
  },
  description: SITE_METADATA.description,
  metadataBase: new URL(SITE_METADATA.url),

  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
    siteName: "Hospital São Rafael",
    locale: SITE_METADATA.locale,
    type: "website",
    images: [
      {
        url: SITE_METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: "Hospital São Rafael — Centro de Cirurgias Eletivas Particulares",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.ogImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.png",
  },

  alternates: {
    canonical: SITE_METADATA.url,
    languages: {
      "pt-BR": `${SITE_METADATA.url}/pt`,
      "en-US": `${SITE_METADATA.url}/en`,
      "x-default": `${SITE_METADATA.url}/pt`,
    },
  },

  verification: {
    other: {
      "facebook-domain-verification": "n44vz2c3l4nzf8gujqbxh8chpx7bv2",
    },
  },
}



// -----------------------------------------------------------------------------
// VIEWPORT
// -----------------------------------------------------------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FDF1E7",
}

// -----------------------------------------------------------------------------
// SCHEMA JSON-LD — Dados estruturados para Google
// -----------------------------------------------------------------------------
function SchemaJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_DATA) }}
    />
  )
}

// -----------------------------------------------------------------------------
// LAYOUT RAIZ
// -----------------------------------------------------------------------------
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()
  const tNav = await getTranslations("nav")

  const translatedNavItems = NAV_ITEMS.map((item) => ({
    href: item.href,
    label: tNav(`items.${NAV_KEY_BY_HREF[item.href] ?? "inicio"}`),
    ...('children' in item && item.children ? {
      children: item.children.map((child) => ({
        href: child.href,
        label: tNav(`items.${NAV_KEY_BY_HREF[child.href] ?? child.label}`),
      })),
    } : {}),
  }))
  const navCta = { label: tNav("ctaLabel"), href: NAV_CTA.href }

  return (
    <NextIntlClientProvider messages={messages}>
      <SchemaJsonLd />

      {/* Header — fora do <main> para semântica correta */}
      <SiteHeader
        navItems={translatedNavItems}
        cta={navCta}
      />

      {/* Conteúdo principal */}
      <main id="main-content">
        {children}
      </main>

      <FacebookPixel />
      <LangSuggestBanner />

    </NextIntlClientProvider>
  )
}
