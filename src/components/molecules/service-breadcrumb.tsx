// =============================================================================
// SERVICE-BREADCRUMB.TSX — Breadcrumb | Hospital São Rafael
// =============================================================================
// Navegação hierárquica sobre fundo charcoal. Usado em páginas internas
// (serviços, legais). Último item sem link, em destaque.
// =============================================================================

import Link from "next/link"

export interface BreadcrumbItem {
  label: string
  href: string
}

interface ServiceBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function ServiceBreadcrumb({ items, className = "" }: ServiceBreadcrumbProps) {
  return (
    <nav
      aria-label="Navegação estrutural"
      className={`w-full bg-charcoal border-b border-white/10 ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-white/70">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-white font-semibold">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-ouro transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <span aria-hidden className="text-ouro/60">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
