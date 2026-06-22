"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { ServiceCard } from "@/components/molecules/service-card"
import { useIntersection } from "@/hooks/use-intersection"
import type { ServiceItem } from "@/types"

const VISIBLE = 3
const INTERVAL_MS = 6000

interface ServicosCarouselProps {
  kicker: string
  headline: string
  description?: string
  id?: string
  items: ServiceItem[]
}

export function ServicosCarousel({
  kicker,
  headline,
  description,
  id,
  items,
}: ServicosCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [resetTimer])

  const visibleItems = Array.from({ length: VISIBLE }, (_, i) =>
    items[(current + i) % total]
  )

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full py-20 lg:py-30 bg-white"
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
          <Heading as="h2" id={id ? `${id}-heading` : undefined}>
            {headline}
          </Heading>
          {description && <BodyText color="muted">{description}</BodyText>}
        </div>

        {/* Carrossel */}
        <div className="relative px-10 lg:px-12">
          {/* Seta esquerda */}
          <button
            onClick={() => { navigate(-1); resetTimer() }}
            aria-label="Item anterior"
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
              <div key={`${item.id}-${index}`} className="h-[380px] overflow-hidden">
                <ServiceCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  image={item.image}
                  href={item.href}
                  hideCta
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Seta direita */}
          <button
            onClick={() => { navigate(1); resetTimer() }}
            aria-label="Próximo item"
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

        {/* Indicadores (dots) */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (i !== current) { navigate(i - current); resetTimer() } }}
              aria-label={`Ir para item ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current
                  ? "w-6 bg-ouro"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
