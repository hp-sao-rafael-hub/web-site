// =============================================================================
// LEGAL-PAGE-TEMPLATE.TSX — Template para páginas legais | Hospital São Rafael
// =============================================================================
// Layout reutilizável para páginas como /privacidade, /termos, /cookies.
//
// Estrutura:
//   1. Breadcrumb (charcoal, mesmo das páginas de serviço)
//   2. Hero textual (charcoal → fade para creme): kicker + H1 + subtítulo + datas
//   3. Sumário (anchors para cada seção)
//   4. Corpo: H2 + parágrafos + bullets + lista numerada
//   5. Footer global
// =============================================================================

import Link from "next/link"
import { Footer } from "@/components/organisms/footer"
import { ServiceBreadcrumb } from "@/components/molecules/service-breadcrumb"
import { FOOTER_DATA } from "@/lib/constants"
import type { FooterData } from "@/types"
import type { LegalPageData } from "@/lib/legal-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface LegalPageTemplateProps {
  data: LegalPageData
  /** Label da página no 3º nível do breadcrumb (ex: "Política de Privacidade"). */
  breadcrumbLabel: string
  /** Path da página (ex: "/privacidade"). */
  pagePath: string
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function LegalPageTemplate({
  data,
  breadcrumbLabel,
  pagePath,
}: LegalPageTemplateProps) {
  const { kicker, title, subtitle, effectiveDate, lastUpdate, sections } = data

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: breadcrumbLabel, href: pagePath },
  ]

  return (
    <>
      {/* Bloco superior unificado (charcoal): breadcrumb + hero textual.
          Padding-top compensa header sticky transparente. */}
      <div className="w-full bg-charcoal pt-20 lg:pt-24">
        <ServiceBreadcrumb items={breadcrumbItems} className="border-b-0" />
      </div>

      {/* HERO TEXTUAL — fundo charcoal (segue mesmo bloco) */}
      <section
        aria-labelledby="legal-page-title"
        className="w-full bg-charcoal text-white pt-10 pb-20 lg:pt-14 lg:pb-28"
      >
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-[14px] font-extrabold tracking-[0.2em] uppercase text-ouro mb-6">
            {kicker}
          </span>
          <h1
            id="legal-page-title"
            className="text-[32px] leading-tight sm:text-[40px] lg:text-[52px] lg:leading-[1.1] font-extrabold tracking-tight text-white"
          >
            {title}
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/80 max-w-[760px]">
            {subtitle}
          </p>
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70 max-w-[560px]">
            <div>
              <dt className="font-semibold uppercase tracking-wider text-white/50 text-[11px]">
                Vigência desde
              </dt>
              <dd className="mt-1 text-white">{effectiveDate}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wider text-white/50 text-[11px]">
                Última atualização
              </dt>
              <dd className="mt-1 text-white">{lastUpdate}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* CORPO */}
      <section
        aria-label="Conteúdo da política"
        className="w-full bg-creme text-charcoal py-16 lg:py-24"
      >
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[220px_1fr] gap-12">
          {/* SUMÁRIO (sticky em desktop) */}
          <aside aria-label="Sumário" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-charcoal/50 mb-4">
                Sumário
              </p>
              <nav>
                <ol className="space-y-2 text-sm text-charcoal/70">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`#${s.id}`}
                        className="hover:text-ouro transition-colors block leading-snug"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* CONTEÚDO */}
          <article className="min-w-0">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="scroll-mt-28 mb-14 last:mb-0"
              >
                <h2
                  id={`${s.id}-title`}
                  className="text-[22px] sm:text-[26px] lg:text-[28px] font-extrabold tracking-tight text-charcoal mb-5"
                >
                  {s.title}
                </h2>

                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-base sm:text-[17px] leading-[1.7] text-charcoal/85 mb-4 last:mb-0"
                  >
                    {p}
                  </p>
                ))}

                {s.list && s.list.length > 0 && (
                  <ul className="mt-4 space-y-3 list-none">
                    {s.list.map((item, i) => (
                      <li
                        key={i}
                        className="relative pl-6 text-base sm:text-[17px] leading-[1.7] text-charcoal/85"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-[0.7em] w-2.5 h-[2px] bg-ouro"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {s.orderedList && s.orderedList.length > 0 && (
                  <ol className="mt-4 space-y-3 list-decimal pl-5 marker:text-ouro marker:font-extrabold">
                    {s.orderedList.map((item, i) => (
                      <li
                        key={i}
                        className="text-base sm:text-[17px] leading-[1.7] text-charcoal/85 pl-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}

            {/* Rodapé do conteúdo — reforço da data de atualização */}
            <p className="mt-16 pt-6 border-t border-charcoal/15 text-sm text-charcoal/60">
              Última atualização: <strong className="text-charcoal/80">{lastUpdate}</strong>.
            </p>
          </article>
        </div>
      </section>

      {/* Footer global */}
      <Footer data={FOOTER_DATA as unknown as FooterData} />
    </>
  )
}
