// =============================================================================
// SPECIALTY-GRID.TSX — Organismo O11 | Hospital São Rafael
// =============================================================================
// Carrossel de especialidades (3 por página, avança de 3 em 3). Cada card é
// um link para /especialidades/[id].
// =============================================================================

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight, Check } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps, EspecialidadesData } from "@/types"

// Especialidades COM foto de médico (public/assets/images/especialidades/<id>.jpg).
// As demais (ortopedia, cardiologia, ginecologia) caem no fallback de ícone.
const COM_FOTO = new Set([
  "cabeca-pescoco", "neurocirurgia", "cirurgia-geral", "urologia",
  "otorrinolaringologia", "dermatologia", "cirurgia-vascular",
  "cirurgia-plastica", "mastologia", "clinica-dor",
])

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
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------------------------
export function SpecialtyGrid({ data, className }: SpecialtyGridProps) {
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
    intervalRef.current = setInterval(() => navigate(VISIBLE), INTERVAL_MS)
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
              onClick={() => { navigate(-VISIBLE); resetTimer() }}
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
                <Link
                  key={`${item.id}-${index}`}
                  href={`/especialidades/${item.id}`}
                  aria-label={`Ver especialidade: ${item.title}`}
                  className={cn(
                    "group flex flex-col h-full overflow-hidden rounded-2xl bg-white",
                    "ring-1 ring-cobre/12 shadow-[0_2px_10px_rgba(46,46,46,.04)]",
                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2"
                  )}
                >
                  {/* Foto do médico (ou fallback de ícone) */}
                  <div className="relative h-48 bg-creme overflow-hidden">
                    {COM_FOTO.has(item.id) ? (
                      <Image
                        src={`/assets/images/especialidades/${item.id}.jpg`}
                        alt={`Especialista em ${item.title} — Hospital São Rafael`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: "72% 50%" }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-charcoal/90">
                        <Icon name={resolveIconName(item.icon)} size={44} color="ouro" />
                      </div>
                    )}
                  </div>

                  {/* Corpo: título + tópicos + CTA */}
                  <div className="flex flex-col flex-1 gap-4 p-6">
                    <Heading as="h3" className="!text-xl">
                      {item.title}
                    </Heading>

                    <ul role="list" className="flex flex-col gap-2">
                      {item.procedures.slice(0, 4).map((proc) => (
                        <li key={proc} className="flex items-start gap-2.5 text-sm text-charcoal/75 leading-snug">
                          <Check size={16} className="mt-0.5 shrink-0 text-ouro" aria-hidden />
                          <span>{proc}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-marrom ring-1 ring-ouro/40 bg-ouro/5 transition-colors group-hover:bg-ouro group-hover:text-white group-hover:ring-ouro">
                      Ver especialidade
                      <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Seta direita */}
            <button
              onClick={() => { navigate(VISIBLE); resetTimer() }}
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
    </>
  )
}
