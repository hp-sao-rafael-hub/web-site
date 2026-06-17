// =============================================================================
// HEADER.TSX — Organismo O01 | Hospital São Rafael
// =============================================================================
// Composição: Logo (A10) + NavLinks (M08[]) + Button CTA (A01)
// Comportamento: sticky, transparente no hero → sólido no scroll, drawer mobile
// =============================================================================

"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import {
  usePathname as useIntlPathname,
  useRouter as useIntlRouter,
} from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/atoms/logo"
import { Button } from "@/components/atoms/button"
import { NavLink } from "@/components/molecules/nav-link"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import type { NavItem, NavCTA, BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface HeaderProps extends BaseComponentProps {
  navItems: NavItem[]
  cta: NavCTA
  /** Threshold de scroll (em px) para mudar de transparente para sólido */
  scrollThreshold?: number
}

// -----------------------------------------------------------------------------
// LANGUAGE TOGGLE — troca rota para o locale selecionado
// -----------------------------------------------------------------------------
const LANG_LABELS: Record<(typeof routing.locales)[number], string> = {
  pt: "PT",
  en: "EN",
}

function LangToggle({ ariaLabel }: { ariaLabel: string }) {
  const currentLocale = useLocale() as (typeof routing.locales)[number]
  const intlPathname = useIntlPathname()
  const intlRouter = useIntlRouter()
  const [isPending, startTransition] = useTransition()

  const handleSwitch = (target: (typeof routing.locales)[number]) => {
    if (target === currentLocale) return
    startTransition(() => {
      intlRouter.replace(intlPathname, { locale: target })
    })
  }

  return (
    <div
      className="flex items-center gap-1 text-xs font-semibold"
      aria-label={ariaLabel}
      aria-busy={isPending}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span className="text-white/20 select-none">|</span>
          )}
          <button
            type="button"
            onClick={() => handleSwitch(l)}
            disabled={isPending}
            className={cn(
              "transition-colors duration-200 px-1 disabled:opacity-60",
              l === currentLocale
                ? "text-white"
                : "text-white/35 hover:text-white/70"
            )}
            aria-pressed={l === currentLocale}
          >
            {LANG_LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  )
}

// IDs das seções monitoradas pelo scroll-spy — home
const HOME_SECTION_IDS = [
  "hero",
  "diferenciais",
  "imd",
  "especialidades",
  "servicos",
  "produtos",
  "jornada",
  "medicos",
  "faq",
]

// IDs das seções monitoradas pelo scroll-spy — páginas de serviço
const SERVICE_SECTION_IDS = [
  "service-hero",
  "estrutura",
  "diferenciais",
  "depoimentos",
  "faq",
]

// hrefs das páginas de serviço — labels vêm de useTranslations
const SERVICE_NAV_HREFS: { key: string; href: string }[] = [
  { key: "inicio",       href: "/"            },
  { key: "estrutura",    href: "#estrutura"   },
  { key: "diferenciais", href: "#diferenciais"},
  { key: "depoimentos",  href: "#depoimentos" },
  { key: "faq",          href: "#faq"         },
]

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function Header({
  navItems,
  cta,
  scrollThreshold = 80,
  className,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null)

  const intlPathname = useIntlPathname()
  const router = useRouter()
  const t = useTranslations("nav")
  const isServicePage = intlPathname.startsWith("/servicos/")

  const serviceNavItems: NavItem[] = SERVICE_NAV_HREFS.map((item) => ({
    href: item.href,
    label: t(`serviceItems.${item.key}`),
  }))

  const activeNavItems = isServicePage ? serviceNavItems : navItems
  const sectionIds = isServicePage ? SERVICE_SECTION_IDS : HOME_SECTION_IDS

  const { activeSection, scrollTo } = useScrollSpy({
    sectionIds,
    offset: 80,
  })

  // Detectar scroll para mudar aparência do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold)
    }

    handleScroll() // checar estado inicial
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollThreshold])

  // Fechar drawer no resize para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setDrawerOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Bloquear scroll do body quando drawer aberto
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [drawerOpen])

  const handleNavClick = (href: string) => {
    setDrawerOpen(false)
    if (!href.startsWith("#")) {
      router.push(href)
      return
    }
    const sectionId = href.replace("#", "")
    scrollTo(sectionId)
  }

  return (
    <>
      {/* Skip to content — acessibilidade */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-ouro focus:text-charcoal focus:font-bold"
      >
        {t("skipToContent")}
      </a>

      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-[20]",
          "w-[calc(100%-3rem)] max-w-[1200px]",
          "transition-all duration-500 ease-in-out",
          "bg-charcoal/85 backdrop-blur-[18px]",
          "border border-azul-claro/20 rounded-[20px] shadow-lg",
          className
        )}
        role="banner"
      >
        <nav
          className={cn(
            "px-4 sm:px-6",
            "flex items-center justify-between",
            "h-14 lg:h-16",
          )}
          aria-label={t("primaryNavAriaLabel")}
        >
          {/* Logo */}
          <a
            href={isServicePage ? "/" : "#hero"}
            onClick={(e) => { e.preventDefault(); handleNavClick(isServicePage ? "/" : "#hero") }}
            aria-label={t("logoAriaLabel")}
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
          >
            <Logo variant="light" height={40} />
          </a>

          {/* Navegação desktop */}
          <ul
            className="hidden lg:flex items-center gap-5"
            role="list"
            aria-label={t("linksAriaLabel")}
          >
            {activeNavItems.map((item) => {
              const sectionId = item.href.replace("#", "")
              const hasChildren = item.children && item.children.length > 0
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => hasChildren ? setOpenDropdown(item.href) : undefined}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <NavLink
                    href={item.href}
                    isActive={activeSection === sectionId}
                    onClick={() => handleNavClick(item.href)}
                    className={hasChildren ? "flex items-center gap-1" : undefined}
                  >
                    {item.label}
                    {hasChildren && <ChevronDown size={12} className={cn("transition-transform duration-200", openDropdown === item.href && "rotate-180")} />}
                  </NavLink>
                  {hasChildren && openDropdown === item.href && (
                    <ul className="absolute top-full left-0 mt-2 bg-charcoal/95 backdrop-blur-md border border-white/10 rounded-xl shadow-lg min-w-[160px] py-1 z-10">
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            onClick={(e) => { e.preventDefault(); setOpenDropdown(null); handleNavClick(child.href) }}
                            className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language switcher */}
            <LangToggle ariaLabel={t("languageAriaLabel")} />

            <Button
              variant="primary"
              size="sm"
              href={cta.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(cta.href)
              }}
            >
              {cta.label}
            </Button>
          </div>

          {/* Botão hamburger mobile */}
          <button
            type="button"
            aria-label={drawerOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen((prev) => !prev)}
            className={cn(
              "lg:hidden p-2 text-white",
              "transition-colors duration-200 hover:text-ouro",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
            )}
          >
            {drawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* DRAWER MOBILE                                                       */}
      {/* ------------------------------------------------------------------ */}
      {/* Overlay */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[25] bg-charcoal/60 backdrop-blur-sm lg:hidden",
          "transition-opacity duration-300",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Painel */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t("drawerAriaLabel")}
        className={cn(
          "fixed top-0 right-0 bottom-0 z-[30] w-[280px] lg:hidden",
          "bg-charcoal flex flex-col",
          "transition-transform duration-300 ease-in-out",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Cabeçalho do drawer */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <Logo variant="light" height={36} />
          <button
            type="button"
            aria-label={t("closeMenu")}
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-6" aria-label={t("mobileNavAriaLabel")}>
          <ul className="flex flex-col gap-1" role="list">
            {activeNavItems.map((item) => {
              const sectionId = item.href.replace("#", "")
              const isActive = activeSection === sectionId
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = expandedMobileItem === item.href
              return (
                <li key={item.href}>
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpandedMobileItem(isExpanded ? null : item.href)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 text-sm font-semibold",
                          "transition-colors duration-200 rounded-sm",
                          isActive ? "text-ouro bg-ouro/10" : "text-white/70 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {item.label}
                        <ChevronDown size={14} className={cn("transition-transform duration-200", isExpanded && "rotate-180")} />
                      </button>
                      {isExpanded && (
                        <ul className="pl-4 mt-1 flex flex-col gap-1">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <a
                                href={child.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(child.href) }}
                                className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-sm"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                      className={cn(
                        "block px-4 py-3 text-sm font-semibold",
                        "transition-colors duration-200 rounded-sm",
                        isActive
                          ? "text-ouro bg-ouro/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA mobile */}
        <div className="px-6 py-6 border-t border-white/10">
          <Button
            variant="primary"
            size="md"
            href={cta.href}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(cta.href)
            }}
            className="w-full justify-center"
          >
            {cta.label}
          </Button>
        </div>
      </aside>
    </>
  )
}
