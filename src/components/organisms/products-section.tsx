// =============================================================================
// PRODUCTS-SECTION.TSX — Organismo (extensão O05) | Hospital São Rafael
// =============================================================================
// Dobra 6 — Produtos divididos por público com abas de filtro.
// Composição: Kicker + H2 + CategoryTabs + Carousel (filtrado por aba)
// =============================================================================

"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { ProductCard } from "@/components/molecules/product-card"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps, ProdutosData, ProductCategory } from "@/types"

const VISIBLE = 3

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ProductsSectionProps extends BaseComponentProps {
  data: ProdutosData
}

// -----------------------------------------------------------------------------
// COMPONENTE — ABAS
// -----------------------------------------------------------------------------
interface CategoryTabsProps {
  categories: ProductCategory[]
  activeId: string
  onChange: (id: string) => void
}

function CategoryTabs({ categories, activeId, onChange }: CategoryTabsProps) {
  const t = useTranslations("produtos")
  return (
    <div
      role="tablist"
      aria-label={t("tabsAriaLabel")}
      className="flex border-b border-charcoal/10"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={activeId === cat.id}
          aria-controls={`tabpanel-${cat.id}`}
          id={`tab-${cat.id}`}
          onClick={() => onChange(cat.id)}
          className={cn(
            "px-6 py-3 text-sm font-bold",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-inset",
            activeId === cat.id
              ? "text-ouro border-b-2 border-ouro -mb-px"
              : "text-charcoal/40 hover:text-charcoal/70"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------------------------
export function ProductsSection({ data, className }: ProductsSectionProps) {
  const [activeTab, setActiveTab] = useState(data.categories[0]?.id ?? "")
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

  const { kicker, headline, description, categories } = data
  const activeCategory = categories.find((c) => c.id === activeTab)
  const audience = activeTab === "medico" ? "medico" : "paciente"
  const total = activeCategory?.items.length ?? 0

  // Reset carousel position when tab changes
  useEffect(() => {
    setCurrent(0)
    setFading(false)
  }, [activeTab])

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

  const visibleItems = activeCategory
    ? Array.from({ length: Math.min(VISIBLE, total) }, (_, i) =>
        activeCategory.items[(current + i) % total]
      )
    : []

  const showArrows = total > VISIBLE

  return (
    <section
      id="produtos"
      aria-labelledby="produtos-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("w-full py-20 lg:py-30 bg-creme", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div
          className={cn(
            "flex flex-col gap-4 mb-10 max-w-[640px]",
            "transition-all duration-700",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <Kicker color="marrom">{kicker}</Kicker>
          <Heading as="h2" id="produtos-heading">{headline}</Heading>
          {description && <BodyText color="muted">{description}</BodyText>}
        </div>

        {/* Abas de categoria */}
        <div
          className={cn(
            "mb-10 transition-all duration-700 delay-100",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <CategoryTabs
            categories={categories as unknown as ProductCategory[]}
            activeId={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Carrossel de produtos */}
        {activeCategory && (
          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className={cn("relative", showArrows && "px-10 lg:px-12")}
          >
            {/* Seta esquerda */}
            {showArrows && (
              <button
                onClick={() => navigate(-1)}
                aria-label="Produto anterior"
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 z-10",
                  "w-10 h-10 flex items-center justify-center",
                  "rounded-full bg-white border border-neutral-200 shadow-sm",
                  "hover:bg-neutral-50 transition-colors duration-200"
                )}
              >
                <ChevronLeft size={20} className="text-charcoal" />
              </button>
            )}

            {/* Cards */}
            <div
              key={activeTab}
              className={cn(
                "grid gap-6 transition-opacity duration-200",
                visibleItems.length === 1 && "grid-cols-1",
                visibleItems.length === 2 && "grid-cols-1 sm:grid-cols-2",
                visibleItems.length >= 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                fading ? "opacity-0" : "opacity-100"
              )}
            >
              {visibleItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className={cn(
                    "transition-all duration-500",
                    hasIntersected
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  )}
                  style={{ transitionDelay: `${index * 80 + 200}ms` }}
                >
                  <ProductCard
                    product={item as unknown as import("@/types").ProductItem}
                    audience={audience}
                    hideCta
                    className="h-full"
                  />
                </div>
              ))}
            </div>

            {/* Seta direita */}
            {showArrows && (
              <button
                onClick={() => navigate(1)}
                aria-label="Próximo produto"
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 z-10",
                  "w-10 h-10 flex items-center justify-center",
                  "rounded-full bg-white border border-neutral-200 shadow-sm",
                  "hover:bg-neutral-50 transition-colors duration-200"
                )}
              >
                <ChevronRight size={20} className="text-charcoal" />
              </button>
            )}

            {/* Dots */}
            {showArrows && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: total }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => { if (i !== current) navigate(i - current) }}
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
            )}
          </div>
        )}
      </div>
    </section>
  )
}
