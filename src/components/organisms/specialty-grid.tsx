// =============================================================================
// SPECIALTY-GRID.TSX — Organismo O11 | Hospital São Rafael
// =============================================================================
// Variação do CardGrid (O05) com abertura de ModalOverlay (O10)
// ao clicar em "Ver procedimentos" de cada especialidade.
// =============================================================================

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { ServiceCard } from "@/components/molecules/service-card"
import { ModalOverlay } from "@/components/organisms/modal-overlay"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps, EspecialidadesData, EspecialidadeItem } from "@/types"

const VISIBLE = 3
const INTERVAL_MS = 6000

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface SpecialtyGridProps extends BaseComponentProps {
  data: EspecialidadesData
  hideCta?: boolean
}

// -----------------------------------------------------------------------------
// CONTEÚDO INTERNO DO MODAL DE ESPECIALIDADE
// -----------------------------------------------------------------------------
function SpecialtyModalContent({ item }: { item: EspecialidadeItem }) {
  const t = useTranslations("especialidades")
  return (
    <div className="flex flex-col gap-6">
      {/* Descrição */}
      <BodyText color="muted">{item.description}</BodyText>

      {/* Procedimentos (se houver) */}
      {item.procedures && item.procedures.length > 0 ? (
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal/50 mb-4">
            {t("modalProceduresTitle")}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
            {item.procedures.map((procedure) => (
              <li
                key={procedure}
                className="flex items-center gap-2 text-sm text-charcoal/80"
              >
                <span
                  className="w-1 h-1 rounded-full bg-ouro flex-shrink-0"
                  aria-hidden
                />
                {procedure}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-charcoal/40 italic">
          {t("modalProceduresPending")}
        </p>
      )}

      {/* CTA */}
      <div className="pt-4 border-t border-charcoal/10">
        <a
          href="https://wa.me/5531971511855"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center px-6 py-3 rounded-full",
            "bg-ouro text-white font-bold text-sm",
            "transition-colors duration-300 hover:bg-ouro-hover",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
          )}
        >
          {t("modalCtaLabel")}
        </a>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------------------------
export function SpecialtyGrid({ data, hideCta, className }: SpecialtyGridProps) {
  const t = useTranslations("especialidades")
  const [activeSpecialty, setActiveSpecialty] = useState<EspecialidadeItem | null>(null)
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

  const { kicker, headline, description, items } = data
  const total = items.length

  const navigate = useCallback(
    (delta: number) => {
      setFading(true)
      setTimeout(() => {
        setCurrent(c => ((c + delta) % total + total) % total)
        setFading(false)
      }, 200)
    },
    [total]
  )

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => navigate(1), INTERVAL_MS)
  }, [navigate])

  useEffect(() => {
    resetTimer()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [resetTimer])

  const visibleItems = Array.from({ length: VISIBLE }, (_, i) =>
    items[(current + i) % total]
  )

  return (
    <>
      <section
        id="especialidades"
        aria-labelledby="especialidades-heading"
        ref={ref as React.RefObject<HTMLElement>}
        className={cn("w-full py-20 lg:py-30 bg-creme", className)}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Cabeçalho */}
          <div
            className={cn(
              "flex flex-col gap-4 mb-12 lg:mb-16 max-w-[640px]",
              "transition-all duration-700",
              hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Kicker color="marrom">{kicker}</Kicker>
            <Heading as="h2" id="especialidades-heading" className="whitespace-nowrap">
              {headline}
            </Heading>
            {description && (
              <BodyText color="muted">{description}</BodyText>
            )}
          </div>

          {/* Carrossel de especialidades */}
          <div className="relative px-10 lg:px-12">
            {/* Seta esquerda */}
            <button
              onClick={() => { navigate(-1); resetTimer() }}
              aria-label="Especialidade anterior"
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10",
                "w-10 h-10 flex items-center justify-center",
                "rounded-full bg-white border border-neutral-200 shadow-sm",
                "hover:bg-neutral-50 transition-colors duration-200"
              )}
            >
              <ChevronLeft size={20} className="text-charcoal" />
            </button>

            {/* Cards */}
            <div
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                "transition-opacity duration-200",
                fading ? "opacity-0" : "opacity-100"
              )}
            >
              {visibleItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="min-h-[220px]">
                  <ServiceCard
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    variant="icon-only"
                    ctaLabel={t("viewProcedures")}
                    onLearnMore={() => setActiveSpecialty(item)}
                    hideCta={hideCta}
                  />
                </div>
              ))}
            </div>

            {/* Seta direita */}
            <button
              onClick={() => { navigate(1); resetTimer() }}
              aria-label="Próxima especialidade"
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10",
                "w-10 h-10 flex items-center justify-center",
                "rounded-full bg-white border border-neutral-200 shadow-sm",
                "hover:bg-neutral-50 transition-colors duration-200"
              )}
            >
              <ChevronRight size={20} className="text-charcoal" />
            </button>
          </div>

          {/* Contador de posição */}
          <p className="text-center text-xs text-charcoal/40 mt-6">
            {current + 1} – {Math.min(current + VISIBLE, total)} de {total}
          </p>
        </div>
      </section>

      {/* Modal de especialidade */}
      <ModalOverlay
        isOpen={activeSpecialty !== null}
        onClose={() => setActiveSpecialty(null)}
        title={activeSpecialty?.title ?? ""}
        maxWidth="lg"
      >
        {activeSpecialty && (
          <SpecialtyModalContent item={activeSpecialty} />
        )}
      </ModalOverlay>
    </>
  )
}
