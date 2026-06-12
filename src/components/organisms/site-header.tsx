import { Header } from "./header"
import type { NavItem, NavCTA } from "@/types"

interface SiteHeaderProps {
  navItems: NavItem[]
  cta: NavCTA
}

export function SiteHeader({ navItems, cta }: SiteHeaderProps) {
  return <Header navItems={navItems} cta={cta} />
}
