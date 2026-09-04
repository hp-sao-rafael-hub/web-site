import { SITE_PHONE } from "./meta"

export const FOOTER_DATA = {
  description:
    "Excelência em saúde com infraestrutura completa e atendimento humanizado em Belo Horizonte.",
  stats: [
    { label: "Leitos", value: 56 },
    { label: "Salas Cirúrgicas", value: 22 },
    { label: "Taxa de infecção", value: "0,33%" },
  ],
  navigation: {
    pacientes: {
      title: "PARA PACIENTES",
      links: [
        { label: "Marcar consulta", href: "#" },
        { label: "Marcar exame", href: "#" },
        { label: "Resultado de exames", href: "#" },
        { label: "Emergências", href: "#" },
        { label: "Encontre um médico", href: "#" },
      ],
    },
    hospital: {
      title: "O HOSPITAL",
      links: [
        { label: "Nossa história", href: "#" },
        { label: "Especialidades", href: "#especialidades" },
        { label: "Centro médico", href: "#servicos" },
        { label: "Qualidade", href: "#" },
        { label: "Trabalhe conosco", href: "#" },
        { label: "Ouvidoria", href: "#" },
      ],
    },
  },
  contact: {
    address: {
      street: "Av. Raja Gabáglia, 1380",
      neighborhood: "Gutierrez, BH / MG",
      cep: "CEP 30441-194",
    },
    phone: "(31) 2517-0900",
    email: "relacionamentocliente@hospitalsaorafael.com",
  },
  social: [
    { platform: "instagram", url: "https://www.instagram.com/hospitalsaorafaelmg/", icon: "instagram" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/hospitalsaorafaelmg/", icon: "linkedin" },
    { platform: "youtube", url: "https://www.youtube.com/@hospitalsaorafaelmg", icon: "youtube" },
    { platform: "tiktok", url: "https://www.tiktok.com/@hospitalsaorafaelmg", icon: "tiktok" },
  ],
  emergency: {
    label: "Urgências pós-cirúrgicas", // [PENDENTE CLIENTE] Validar texto — hospital eletivo, sem pronto-socorro
    href: `tel:${SITE_PHONE}`,
  },
} as const
