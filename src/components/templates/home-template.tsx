// =============================================================================
// HOME-TEMPLATE.TSX — Template T01 | Hospital São Rafael
// =============================================================================
// Composição das 10 dobras na ordem aprovada em reunião.
// Todos os dados vêm de lib/constants.ts via props.
//
// Ordem:
//   1. Hero (O02)
//   2. Stats Bar (O03)
//   3. Diferenciais (O04)
//   4. Serviços (O05 — services)
//   5. Especialidades (O11 — SpecialtyGrid + modais)
//   6. Produtos (ProductsSection — tabs Paciente/Médico)
//   7. Jornada (O07)
//   8. Área do Médico — B2B (O06)
//   9. FAQ (O08)
//  10. Footer (O09)
// =============================================================================

import { getTranslations } from "next-intl/server"

import { HeroSection } from "@/components/organisms/hero-section"
import { StatsBar } from "@/components/organisms/stats-bar"
import { ContentBlock } from "@/components/organisms/content-block"
import { CardGrid } from "@/components/organisms/card-grid"
import { ServicosCarousel } from "@/components/organisms/servicos-carousel"
import { SpecialtyGrid } from "@/components/organisms/specialty-grid"
import { ProductsSection } from "@/components/organisms/products-section"
import { JourneyTimeline } from "@/components/organisms/journey-timeline"
import { B2BSection } from "@/components/organisms/b2b-section"
import { FAQSection } from "@/components/organisms/faq-section"
import { Footer } from "@/components/organisms/footer"

import {
  HERO_DATA,
  STATS_DATA,
  DIFERENCIAIS_DATA,
  SERVICOS_DATA,
  ESPECIALIDADES_DATA,
  PRODUTOS_DATA,
  JORNADA_DATA,
  B2B_DATA,
  FAQ_DATA,
  FOOTER_DATA,
} from "@/lib/constants"

import type {
  HeroData,
  StatsData,
  ContentBlockData,
  EspecialidadesData,
  ProdutosData,
  JornadaData,
  B2BData,
  FAQData,
  FooterData,
  ServiceItem,
} from "@/types"

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export async function HomeTemplate() {
  const [tHero, tStats, tFooter, tDiferenciais, tServicos, tB2B, tEspec, tProdutos, tJornada, tFaq] = await Promise.all([
    getTranslations("hero"),
    getTranslations("stats"),
    getTranslations("footer"),
    getTranslations("diferenciais"),
    getTranslations("servicos"),
    getTranslations("b2b"),
    getTranslations("especialidades"),
    getTranslations("produtos"),
    getTranslations("jornada"),
    getTranslations("faq"),
  ])

  const heroCta = { label: tHero("ctaLabel"), href: HERO_DATA.ctaPrimary.href }
  const b2bCta = { label: tB2B("ctaLabel"), href: B2B_DATA.cta.href }

  const heroData: HeroData = {
    kicker: tHero("kicker"),
    headline: tHero("headline"),
    subheadline: tHero.raw("subheadline") as readonly string[],
    ctaPrimary: heroCta,
    video: { ...HERO_DATA.video, alt: tHero("videoAlt") },
  }
  const statsData: StatsData = {
    headline: tStats("headline"),
    items: STATS_DATA.items.map((item) => ({
      ...item,
      label: tStats(`items.${item.id}.label`),
      description: tStats(`items.${item.id}.description`),
    })),
  }

  const PACIENTES_LINK_KEYS = ["consulta", "exame", "resultado", "emergencias", "medico"] as const
  const HOSPITAL_LINK_KEYS = ["historia", "especialidades", "centro", "qualidade", "trabalheConosco", "ouvidoria"] as const
  const footerData: FooterData = {
    description: tFooter("description"),
    stats: [
      { label: tFooter("stats.leitos"), value: FOOTER_DATA.stats[0].value },
      { label: tFooter("stats.salas"), value: FOOTER_DATA.stats[1].value },
    ],
    navigation: {
      pacientes: {
        title: tFooter("navigation.pacientes.title"),
        links: PACIENTES_LINK_KEYS.map((k, i) => ({
          label: tFooter(`navigation.pacientes.links.${k}`),
          href: FOOTER_DATA.navigation.pacientes.links[i].href,
        })),
      },
      hospital: {
        title: tFooter("navigation.hospital.title"),
        links: HOSPITAL_LINK_KEYS.map((k, i) => ({
          label: tFooter(`navigation.hospital.links.${k}`),
          href: FOOTER_DATA.navigation.hospital.links[i].href,
        })),
      },
    },
    contact: FOOTER_DATA.contact,
    social: [...FOOTER_DATA.social],
    emergency: {
      label: tFooter("emergencyLabel"),
      href: FOOTER_DATA.emergency.href,
    },
  }

  const diferenciaisData: ContentBlockData = {
    kicker: tDiferenciais("kicker"),
    headline: tDiferenciais("headline"),
    description: tDiferenciais.raw("description") as readonly string[],
    ctas: [
      { label: tDiferenciais("ctas.especialidades"), href: DIFERENCIAIS_DATA.ctas[0].href },
      { label: tDiferenciais("ctas.servicos"), href: DIFERENCIAIS_DATA.ctas[1].href },
    ],
    image: { ...DIFERENCIAIS_DATA.image, alt: tDiferenciais("imageAlt") },
  }

  const jornadaData: JornadaData = {
    kicker: tJornada("kicker"),
    headline: tJornada("headline"),
    description: tJornada("description"),
    steps: JORNADA_DATA.steps.map((step) => {
      const labels = tJornada.raw(`steps.${step.id}.links`) as string[]
      return {
        ...step,
        title: tJornada(`steps.${step.id}.title`),
        subtitle: tJornada(`steps.${step.id}.subtitle`),
        description: tJornada(`steps.${step.id}.description`),
        relatedLinks: step.relatedLinks.map((link, i) => ({
          label: labels[i] ?? link.label,
          href: link.href,
        })),
      }
    }),
  }

  const produtosData: ProdutosData = {
    kicker: tProdutos("kicker"),
    headline: tProdutos("headline"),
    description: tProdutos("description"),
    categories: PRODUTOS_DATA.categories.map((cat) => ({
      id: cat.id,
      label: tProdutos(`categories.${cat.id}.label`),
      items: cat.items.map((it) => ({
        ...it,
        title: tProdutos(`categories.${cat.id}.items.${it.id}.title`),
        description: tProdutos(`categories.${cat.id}.items.${it.id}.description`),
      })),
    })),
  }

  const especialidadesData: EspecialidadesData = {
    kicker: tEspec("kicker"),
    headline: tEspec("headline"),
    description: tEspec("description"),
    items: ESPECIALIDADES_DATA.items.map((item) => ({
      ...item,
      title: tEspec(`items.${item.id}.title`),
      description: tEspec(`items.${item.id}.description`),
      procedures: tEspec.raw(`items.${item.id}.procedures`) as string[],
    })),
  }

  const servicosItems: ServiceItem[] = SERVICOS_DATA.items.map((item) => ({
    ...item,
    title: tServicos(`items.${item.id}.title`),
    description: tServicos(`items.${item.id}.description`),
  }))

  const b2bData: B2BData = {
    kicker: tB2B("kicker"),
    headline: tB2B("headline"),
    subheadline: tB2B("subheadline"),
    description: tB2B("description"),
    features: B2B_DATA.features.map((f) => ({
      ...f,
      title: tB2B(`features.${f.id}.title`),
      description: tB2B(`features.${f.id}.description`),
    })),
    testimonials: B2B_DATA.testimonials.map((tst) => ({
      ...tst,
      quote: tB2B(`testimonials.${tst.id}.quote`),
      role: tB2B(`testimonials.${tst.id}.role`),
    })),
    cta: b2bCta,
  }
  const faqData: FAQData = {
    kicker: tFaq("kicker"),
    headline: tFaq("headline"),
    items: FAQ_DATA.items.map((item) => ({
      id: item.id,
      question: tFaq(`items.${item.id}.question`),
      answer: tFaq(`items.${item.id}.answer`),
    })),
  }

  return (
    <>
      {/* ================================================================= */}
      {/* DOBRA 1 — HERO                                                    */}
      {/* Vídeo fullscreen, headline revisada, CTA principal                */}
      {/* ================================================================= */}
      <HeroSection data={heroData} />

      {/* ================================================================= */}
      {/* DOBRA 2 — NÚMEROS DE CREDIBILIDADE                                */}
      {/* Métricas com counter-up ao entrar no viewport                     */}
      {/* ================================================================= */}
      <StatsBar
        data={statsData}
        theme="light"
      />

      {/* ================================================================= */}
      {/* DOBRA 3 — DIFERENCIAIS                                            */}
      {/* Rigor científico + conforto + integração com o IMD. Layout assimétrico */}
      {/* ================================================================= */}
      <ContentBlock
        data={diferenciaisData}
        imagePosition="right"
        background="white"
        id="diferenciais"
      />

      {/* ================================================================= */}
      {/* DOBRA 4 — SERVIÇOS                                                */}
      {/* Infraestrutura do hospital: CC, IMD, laboratório, hiperbárica...  */}
      {/* ================================================================= */}
      <ServicosCarousel
        kicker={tServicos("kicker")}
        headline={tServicos("headline")}
        description={tServicos("description")}
        items={servicosItems}
        id="servicos"
      />

      {/* ================================================================= */}
      {/* DOBRA 5 — ESPECIALIDADES                                          */}
      {/* Grid com modais de detalhamento por especialidade                 */}
      {/* ================================================================= */}
      <SpecialtyGrid
        data={especialidadesData}
      />

      {/* ================================================================= */}
      {/* DOBRA 6 — PRODUTOS                                                */}
      {/* Divididos por público (Paciente / Médico) com abas de filtro      */}
      {/* ================================================================= */}
      <ProductsSection
        data={produtosData}
      />

      {/* ================================================================= */}
      {/* DOBRA 7 — JORNADA DO PACIENTE                                     */}
      {/* Timeline do diagnóstico à alta. Links para serviços por etapa     */}
      {/* ================================================================= */}
      <JourneyTimeline
        data={jornadaData}
      />

      {/* ================================================================= */}
      {/* DOBRA 8 — ÁREA DO MÉDICO (B2B)                                    */}
      {/* Fundo charcoal. Feature cards + depoimentos + CTA consultoria     */}
      {/* ================================================================= */}
      <B2BSection
        data={b2bData}
      />

      {/* ================================================================= */}
      {/* DOBRA 9 — FAQ                                                     */}
      {/* Layout 2 colunas: heading sticky + accordion                      */}
      {/* ================================================================= */}
      <FAQSection
        data={faqData}
        background="creme"
      />

      {/* ================================================================= */}
      {/* DOBRA 10 — FOOTER                                                 */}
      {/* Logo + descrição + navegação + contato + social + emergência      */}
      {/* ================================================================= */}
      <Footer
        data={footerData}
      />
    </>
  )
}
