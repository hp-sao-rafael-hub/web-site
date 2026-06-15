// =============================================================================
// SERVICE-GALLERY-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Layout split full-bleed: imagem esquerda (carrossel) + conteúdo direito.
// =============================================================================

"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Button } from "@/components/atoms/button"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps } from "@/types"
import type { ServiceGalleryBlockData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceGalleryBlockProps extends BaseComponentProps {
  data: ServiceGalleryBlockData
  /** Reservar gutter direito para TOC sidebar (xl+) */
  reserveRightGutter?: boolean
}

// -----------------------------------------------------------------------------
// COMPONENTE — Carrossel full-bleed
// -----------------------------------------------------------------------------
function ImageCarousel({ images }: { images: ServiceGalleryBlockData["images"] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const goTo = useCallback((index: number) => {
    setIsVisible(false)
    setTimeout(() => {
      setActiveIndex(index)
      setIsVisible(true)
    }, 250)
  }, [])

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      goTo((activeIndex + 1) % images.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [activeIndex, images.length, goTo])

  const currentImage = images[activeIndex]

  return (
    <div className="relative w-full h-full">
      {currentImage && (
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cn(
            "object-cover transition-opacity duration-500",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      {/* dots overlay */}
      {images.length > 1 && (
        <div
          className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 z-10"
          role="tablist"
          aria-label="Navegação de imagens"
        >
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ver imagem ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                i === activeIndex
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------------------------
export function ServiceGalleryBlock({
  data,
  className,
  reserveRightGutter = false,
}: ServiceGalleryBlockProps) {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })
  const { kicker, headline, description, images, features, cta } = data

  return (
    <section
      id="estrutura"
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="gallery-block-heading"
      className={cn(
        "relative w-full flex flex-col lg:grid lg:grid-cols-2 min-h-[85vh]",
        className
      )}
    >
      {/* LEFT: imagem full-bleed */}
      <div className="relative min-h-[56vw] lg:min-h-0">
        <ImageCarousel images={images} />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 pointer-events-none"
        />
      </div>

      {/* RIGHT: conteúdo */}
      <div className="bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-16 py-14 lg:py-20">
        <div
          className={cn(
            "max-w-[520px] flex flex-col gap-5 transition-all duration-700",
            reserveRightGutter && "xl:max-w-[420px]",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <Kicker color="azul" as="span">{kicker}</Kicker>

          <Heading as="h2" id="gallery-block-heading" className="!leading-tight">
            {headline}
          </Heading>

          <BodyText color="muted" size="base">
            {description}
          </BodyText>

          <span aria-hidden className="block w-12 h-0.5 bg-azul" />

          {/* Feature list */}
          <ul className="flex flex-col gap-4" role="list">
            {features.map((feature, index) => (
              <li
                key={feature.title}
                className={cn(
                  "flex gap-4 items-start transition-all duration-700",
                  hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: hasIntersected ? `${200 + index * 80}ms` : "0ms",
                }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <Icon
                    name={resolveIconName(feature.icon)}
                    size={20}
                    color="azul"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-charcoal">
                    {feature.title}
                  </span>
                  <span className="text-sm text-charcoal/60 leading-relaxed">
                    {feature.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="pt-1">
            <Button variant="primary" size="lg" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
