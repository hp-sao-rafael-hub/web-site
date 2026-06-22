export const JORNADA_DATA = {
  kicker: "O COMPLEXO INTEGRADO SÃO RAFAEL & IMD",
  headline:
    "Do diagnóstico de precisão à recuperação total, sem sair do nosso complexo integrado.",
  description:
    "A descontinuidade do cuidado médico gera atrito. Aqui, o IMD e o centro cirúrgico operam como uma única estrutura completa, previsível para o seu médico, seguro e confortável para você.",
  steps: [
    {
      id: "consulta",
      number: 1,
      title: "Consulta e Diagnóstico",
      subtitle: "IMD",
      description:
        "Diagnóstico de precisão no IMD antes de qualquer decisão cirúrgica.",
      icon: "/assets/icons/jornada-consulta.svg",
      relatedLinks: [
        { label: "Conheça o IMD", href: "#servicos" },
      ],
    },
    {
      id: "preparo",
      number: 2,
      title: "Preparo Cirúrgico",
      subtitle: "",
      description:
        "Protocolos de segurança integrados para mitigar riscos e reduzir a ansiedade.",
      icon: "/assets/icons/jornada-preparo.svg",
      relatedLinks: [
        { label: "Consulta Pré-Anestésica", href: "#produtos" },
      ],
    },
    {
      id: "procedimento",
      number: 3,
      title: "O Procedimento",
      subtitle: "",
      description:
        "Rigor clínico máximo no centro de alta performance.",
      icon: "/assets/icons/jornada-procedimento.svg",
      relatedLinks: [
        { label: "Centro Cirúrgico", href: "#servicos" },
      ],
    },
    {
      id: "recuperacao",
      number: 4,
      title: "Recuperação Acelerada",
      subtitle: "",
      description:
        "Terapia Hiperbárica integrada para acelerar a recuperação e reduzir a inatividade.",
      icon: "/assets/icons/jornada-recuperacao.svg",
      relatedLinks: [
        { label: "Terapia Hiperbárica", href: "#servicos" },
        { label: "Upgrade de Acomodação", href: "#produtos" },
      ],
    },
    {
      id: "alta",
      number: 5,
      title: "Unidade de Transição e Alta",
      subtitle: "",
      description:
        "Monitorização contínua na Unidade de Transição até o regresso seguro à rotina.",
      icon: "/assets/icons/jornada-alta.svg",
      relatedLinks: [
        { label: "Unidade de Transição", href: "#produtos" },
        { label: "Extensão de Diária", href: "#produtos" },
      ],
    },
  ],
} as const
