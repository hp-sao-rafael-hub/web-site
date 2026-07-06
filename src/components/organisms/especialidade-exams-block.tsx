// =============================================================================
// ESPECIALIDADE-EXAMS-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Bloco central das LPs de especialidade: lista de exames/procedimentos que o
// paciente pode agendar. Foco em conversão (tráfego pago → WhatsApp).
// Grid de cards com ícone de check + título + descrição curta.
// =============================================================================

"use client"

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Icon } from "@/components/atoms/icon"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps } from "@/types"
import type { EspecialidadeExamsData } from "@/lib/data/especialidades-lp"

interface EspecialidadeExamsBlockProps extends BaseComponentProps {
  data: EspecialidadeExamsData
  sectionId?: string
}

export function EspecialidadeExamsBlock({
  data,
  sectionId = "exames",
  className,
}: EspecialidadeExamsBlockProps) {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })
  const { kicker, headline, description, items } = data

  return (
    <section
      id={sectionId}
      aria-labelledby="exames-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("w-full bg-white pt-10 pb-20 lg:pt-12 lg:pb-28 scroll-mt-24", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div
          className={cn(
            "max-w-[720px] flex flex-col gap-4 transition-all duration-700",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <Kicker color="cobre">{kicker}</Kicker>
          <Heading as="h2" id="exames-heading">
            {headline}
          </Heading>
          {description && (
            <BodyText color="muted" size="base" className="lg:!text-lg">
              {description}
            </BodyText>
          )}
        </div>

        {/* Grid de exames */}
        <ul
          role="list"
          className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "flex items-start gap-4 rounded-2xl bg-creme/60 ring-1 ring-cobre/10",
                "px-5 py-5 lg:px-6 lg:py-6",
                "transition-all duration-700",
                hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${Math.min(index * 80, 480)}ms` }}
            >
              <span
                aria-hidden="true"
                className="shrink-0 mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ouro/12 text-ouro"
              >
                <Icon name="CircleCheck" size={20} color="ouro" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-charcoal leading-snug">
                  {item.title}
                </span>
                {item.description && (
                  <BodyText color="muted" size="sm">
                    {item.description}
                  </BodyText>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
