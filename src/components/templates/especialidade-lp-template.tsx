// =============================================================================
// ESPECIALIDADE-LP-TEMPLATE.TSX — Template | Hospital São Rafael
// =============================================================================
// Landing page de conversão para especialidades. Tráfego pago → WhatsApp.
// Estrutura baseada em pesquisa de LPs de saúde que convertem + CFM 2.336/2023.
//
// Ordem dos blocos (validada por dados de conversão):
//   0. JSON-LD (SEO on-page p/ pago)
//   1. Hero            — message match, H1 desfecho, CTA WhatsApp embutido
//   2. ServiceIntroBlock       — "o que é / pra quem" (educativo)
//   3. EspecialidadeExamsBlock — exames agendáveis (a oferta)
//   4. ServiceInlineCta        — CTA quente (creme)
//   5. ServiceIndicationsBlock — "quando procurar"
//   6. ServiceInlineCta        — CTA (charcoal)
//   7. ServiceHighlights       — por que HSR (prova INSTITUCIONAL)
//   8. TestimonialsCarousel    — opcional, só se depoimento real/CFM
//   9. FAQSection              — objeções
//  10. ServiceInlineCta        — CTA final (charcoal)
//  11. Footer + ServiceStickyCta
// =============================================================================

import { EspecialidadeLPHeader } from "@/components/organisms/especialidade-lp-header"
import { WhatsAppTracker } from "@/components/molecules/whatsapp-tracker"
import { ServicePageHero } from "@/components/organisms/service-page-hero"
import { ServiceIntroBlock } from "@/components/organisms/service-intro-block"
import { EspecialidadeExamsBlock } from "@/components/organisms/especialidade-exams-block"
import { EspecialidadeLeadForm } from "@/components/organisms/especialidade-lead-form"
import { ServiceIndicationsBlock } from "@/components/organisms/service-indications-block"
import { ServiceInlineCta } from "@/components/organisms/service-inline-cta"
import { ServiceHighlights } from "@/components/organisms/service-highlights"
import { TestimonialsCarousel } from "@/components/organisms/testimonials-carousel"
import { FAQSection } from "@/components/organisms/faq-section"
import { ServiceStickyCta } from "@/components/molecules/service-sticky-cta"
import { EspecialidadeLPSchema } from "@/components/atoms/especialidade-lp-schema"
import { Footer } from "@/components/organisms/footer"

import { FOOTER_DATA } from "@/lib/constants"
import { SITE_URL } from "@/lib/data/meta"
import type { FooterData } from "@/types"
import type { EspecialidadeLPData } from "@/lib/data/especialidades-lp"

const IMD_WHATSAPP_URL =
  "https://wa.me/5531971511855?text=Ol%C3%A1%2C%20vim%20pelo%20formul%C3%A1rio%20do%20IMD%2C%20gostaria%20de%20saber%20mais%21"

interface EspecialidadeLPTemplateProps {
  data: EspecialidadeLPData
  /** URL canônica (schema JSON-LD) */
  canonicalUrl?: string
}

export function EspecialidadeLPTemplate({
  data,
  canonicalUrl = `${SITE_URL}/especialidades/${data.slug}/`,
}: EspecialidadeLPTemplateProps) {
  const { hero, intro, exams, indications, whyHsr, testimonials, faq } = data

  return (
    <>
      {/* 0. SEO structured data */}
      <EspecialidadeLPSchema data={data} canonicalUrl={canonicalUrl} />

      {/* Tracking de conversão — captura todo clique em WhatsApp na LP */}
      <WhatsAppTracker specialty={data.termo} />

      {/* Header minimalista (sem nav) — reduz distração p/ tráfego pago */}
      <EspecialidadeLPHeader whatsappHref={IMD_WHATSAPP_URL} />

      {/* 1. Hero — CTA WhatsApp único já embutido no organism */}
      <ServicePageHero data={hero} pills2x2 whatsappHref={IMD_WHATSAPP_URL} />

      {/* 2. O que é / pra quem (pb reduzido — cola melhor no bloco de exames) */}
      <ServiceIntroBlock data={intro} sectionId="sobre" className="!pb-10 lg:!pb-14" />

      {/* 3. Exames agendáveis (a oferta) */}
      <EspecialidadeExamsBlock data={exams} />

      {/* 4. CTA quente */}
      <ServiceInlineCta
        kicker="AGENDE PELO WHATSAPP"
        headline="Fale agora com nossa equipe e agende sua avaliação."
        description="Atendimento particular, humano e rápido. Resposta em até 1 hora útil."
        variant="creme"
        whatsappHref={IMD_WHATSAPP_URL}
      />

      {/* 5. Quando procurar (indicações) */}
      <ServiceIndicationsBlock
        data={indications}
        sectionId="quando-procurar"
        reserveRightGutter={false}
      />

      {/* 6. CTA */}
      <ServiceInlineCta
        kicker="NA DÚVIDA, FALE COM A EQUIPE"
        headline="Descubra se é hora de agendar sua avaliação."
        description="Sem compromisso. Nossa equipe orienta o próximo passo conforme o seu caso."
        variant="charcoal"
        whatsappHref={IMD_WHATSAPP_URL}
      />

      {/* 7. Por que HSR (prova institucional) */}
      <div id="numeros" className="scroll-mt-24">
        <ServiceHighlights data={whyHsr} />
      </div>

      {/* 8. Prova social — só renderiza com depoimento real/consentido (CFM) */}
      {testimonials && (
        <div id="depoimentos" className="scroll-mt-24">
          <TestimonialsCarousel data={testimonials} />
        </div>
      )}

      {/* 9. FAQ */}
      <div id="faq" className="scroll-mt-24">
        <FAQSection data={faq} background="white" />
      </div>

      {/* 10. Formulário compartilhado — especialidade fixa conforme a página */}
      <EspecialidadeLeadForm
        specialtySlug={data.slug}
        specialtyName={data.termo}
        whatsappHref={IMD_WHATSAPP_URL}
      />

      {/* Footer + sticky CTA mobile */}
      <Footer data={FOOTER_DATA as unknown as FooterData} />
      <ServiceStickyCta whatsappHref={IMD_WHATSAPP_URL} />
    </>
  )
}
