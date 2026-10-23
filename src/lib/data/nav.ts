import { HSR_WHATSAPP_URL } from "@/lib/tintim"

export const NAV_ITEMS = [
  { label: "Início", href: "#hero" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Produtos", href: "#produtos" },
  { label: "IMD", href: "#imd" },
  { label: "Jornada", href: "#jornada" },
  { label: "Serviços", href: "#servicos" },
  { label: "Médicos", href: "#medicos" },
  { label: "FAQ", href: "#faq" },
] as const

export const NAV_CTA = {
  label: "Falar com Atendimento",
  href: HSR_WHATSAPP_URL,
} as const
