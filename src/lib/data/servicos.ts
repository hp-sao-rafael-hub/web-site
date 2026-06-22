// NOTA: Serviços são do hospital (infraestrutura).
// Diferente de "Produtos" (experiências adicionais ao paciente/médico).
export const SERVICOS_DATA = {
  kicker: "ESTRUTURA HOSPITALAR",
  headline: "Infraestrutura completa em um único complexo integrado.",
  description:
    "Tudo o que o seu procedimento exige, integrado no mesmo complexo, sem dispersão, sem deslocamento, sem atrito.",
  items: [
    {
      id: "centro-cirurgico",
      title: "Centro Cirúrgico",
      description:
        "22 salas equipadas com tecnologia de última geração para os mais diversos procedimentos cirúrgicos eletivos.",
      icon: "scalpel",
      image: "/assets/images/servicos/centro-cirurgico-v2.jpg",
      href: "/servicos/centro-cirurgico",
    },
    {
      id: "internacao",
      title: "Unidade de Internação",
      description:
        "Acomodações projetadas para conforto e recuperação, com monitoramento contínuo e equipe dedicada.",
      icon: "bed",
      image: "/assets/images/servicos/internacao.jpg",
      href: "/servicos/internacao",
    },
    {
      id: "imd",
      title: "IMD Instituto Médico e Diagnóstico",
      description:
        "O IMD do Hospital São Rafael reúne consultas e exames em um só lugar, com mais precisão, agilidade e muito mais conforto.",
      icon: "microscope",
      image: "/assets/images/servicos/imd2.png",
      href: "/servicos/imd",
    },
    {
      id: "laboratorio",
      title: "Laboratório",
      description:
        "Análises clínicas com agilidade e precisão, integradas ao fluxo pré e pós-operatório.",
      icon: "flask",
      image: "/assets/images/servicos/laboratorio.jpg",
    },
    {
      id: "hiperbarica",
      title: "Terapia Hiperbárica",
      description:
        "Tecnologia de ponta para aceleração da recuperação e prevenção de complicações pós-cirúrgicas.",
      icon: "activity",
      image: "/para-cirurgioes-parceiros/images/hiperbarica.jpg",
      href: "/servicos/hiperbarica",
    },
    {
      id: "centro-convencoes",
      title: "Centro de Convenções",
      description:
        "Espaço dedicado a simpósios, treinamentos, confraternizações técnico-científicas e troca de conhecimento.",
      icon: "presentation",
      image: "/assets/images/servicos/centro-convencoes.jpg",
    },
    {
      id: "praca-alimentacao",
      title: "Praça de Alimentação",
      description:
        "Alimentação de qualidade para pacientes, acompanhantes, equipe médica e público externo dentro do complexo.",
      icon: "utensils",
      image: "/assets/images/servicos/praca-alimentacao.jpg",
    },
  ],
} as const
