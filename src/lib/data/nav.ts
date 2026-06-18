export const NAV_ITEMS = [
  { label: "Início", href: "#hero" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Produtos", href: "#produtos" },
  { label: "IMD", href: "#imd", children: [{ label: "Especialidades", href: "#especialidades" }] },
  { label: "Serviços", href: "#servicos" },
  { label: "Jornada", href: "#jornada" },
  { label: "Médicos", href: "#medicos" },
  { label: "FAQ", href: "#faq" },
] as const

export const NAV_CTA = {
  label: "Falar com Atendimento",
  href: "https://wa.me/message/NZIPXRZ4SKUHM1",
} as const
