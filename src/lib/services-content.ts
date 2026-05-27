// =============================================================================
// SERVICES-CONTENT.TS — Dados das páginas de serviço | Hospital São Rafael
// =============================================================================
// Fonte de verdade para todas as páginas /servicos/[slug].
// Cada entrada segue o ServiceDetailData interface.
// =============================================================================

import type { FAQData } from "@/types"

// -----------------------------------------------------------------------------
// TIPOS
// -----------------------------------------------------------------------------

export interface ServiceHeroData {
  kicker: string
  headline: string
  subheadline: string
  backgroundImage: string
  pills: string[]
}

export interface ServiceGalleryImage {
  src: string
  alt: string
}

export interface ServiceFeature {
  icon: string
  title: string
  description: string
}

export interface ServiceGalleryBlockData {
  kicker: string
  headline: string
  description: string
  images: ServiceGalleryImage[]
  features: ServiceFeature[]
  cta: {
    label: string
    href: string
  }
}

export interface ServiceHighlightItem {
  id: string
  metric: string
  icon: string
  title: string
  description: string
}

export interface ServiceHighlightsData {
  kicker: string
  headline: string
  items: ServiceHighlightItem[]
}

export interface ServiceTestimonialItem {
  id: string
  quote: string
  author: string
  role: string
  image: string
}

export interface ServiceTestimonialsData {
  headline: string
  items: ServiceTestimonialItem[]
}

// -----------------------------------------------------------------------------
// TYPES — novos blocos (SEO expansion)
// -----------------------------------------------------------------------------

export interface ServiceNavSection {
  id: string
  label: string
}

export interface ServiceIntroSubsection {
  id: string
  title: string
  paragraphs: string[]
}

export interface ServiceIntroBlockData {
  kicker: string
  headline: string
  paragraphs: string[]
  subsections?: ServiceIntroSubsection[]
}

export interface ServiceIndicationItem {
  id: string
  icon: string
  title: string
  description: string
  highlighted?: boolean
}

export interface ServiceIndicationsData {
  kicker: string
  headline: string
  intro?: string
  items: ServiceIndicationItem[]
  note?: string
}

export interface ServiceEquipmentItem {
  icon: string
  title: string
  description: string
}

export interface ServiceEquipmentData {
  kicker: string
  headline: string
  description?: string
  items: ServiceEquipmentItem[]
}

export interface ServiceProtocolItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface ServiceProtocolsData {
  kicker: string
  headline: string
  intro?: string
  items: ServiceProtocolItem[]
  certifications?: string[]
}

export interface ServiceJourneyStep {
  number: string
  title: string
  description: string
}

export interface ServiceJourneyData {
  kicker: string
  headline: string
  intro?: string
  steps: ServiceJourneyStep[]
}

export interface ServiceRelatedItem {
  slug: string
  title: string
  description: string
  image: string
  icon: string
}

export interface ServiceRelatedData {
  kicker?: string
  headline: string
  items: ServiceRelatedItem[]
}

// -----------------------------------------------------------------------------
// TYPES — blocos híbridos de persona (médico assistente / acompanhante)
// -----------------------------------------------------------------------------

export interface ServicePersonaBenefit {
  icon: string
  title: string
  description: string
}

export interface ServiceMedicoBlockData {
  /** Kicker default: "PARA O MÉDICO ASSISTENTE" */
  kicker: string
  headline: string
  description?: string
  benefits: ServicePersonaBenefit[]
  /** Bloco opcional com lista de documentos (ex: credenciamento) */
  documentation?: {
    title: string
    items: string[]
  }
  /** Label do CTA secundário do bloco. Default: "Falar com Consultoria Médica" */
  ctaLabel?: string
  /** Canal exclusivo p/ médico parceiro. Default: WhatsApp comercial padrão */
  ctaHref?: string
  note?: string
}

export interface ServiceAcompanhanteBlockData {
  /** Kicker default: "PARA QUEM ESTÁ COM VOCÊ" */
  kicker: string
  headline: string
  description?: string
  amenities: ServicePersonaBenefit[]
  /** Linha extra (ex: regra de voucher, horário visitação) */
  note?: string
}

// -----------------------------------------------------------------------------
// TYPES — E-E-A-T (referências + revisão clínica)
// -----------------------------------------------------------------------------

export interface ServiceReferenceItem {
  label: string
  href: string
}

// -----------------------------------------------------------------------------
// TYPE PRINCIPAL — campos novos opcionais (retrocompat)
// -----------------------------------------------------------------------------

export interface ServiceDetailData {
  slug: string
  meta: {
    title: string
    description: string
  }
  /** Seções para sidebar scroll-spy. Se undefined, sidebar esconde. */
  navSections?: ServiceNavSection[]
  hero: ServiceHeroData
  /** Bloco long-form "O que é" — 300-500 palavras */
  intro?: ServiceIntroBlockData
  /** Indicações/aplicações do serviço (grid) */
  indications?: ServiceIndicationsData
  /** Bloco híbrido p/ médico assistente — captura persona secundária em páginas B2C */
  medico?: ServiceMedicoBlockData
  galleryBlock: ServiceGalleryBlockData
  /** Equipamentos e tecnologia */
  equipment?: ServiceEquipmentData
  highlights: ServiceHighlightsData
  /** Protocolos, segurança e certificações */
  protocols?: ServiceProtocolsData
  /** Jornada passo-a-passo do paciente */
  journey?: ServiceJourneyData
  /** Bloco p/ acompanhante/família — decisor sombra, principal em internação/alimentação */
  acompanhante?: ServiceAcompanhanteBlockData
  testimonials: ServiceTestimonialsData
  faq: FAQData
  /** Conteúdo relacionado (cross-link outros serviços) */
  related?: ServiceRelatedData
  /** Tipo do schema principal — MedicalProcedure p/ tratamento, MedicalClinic p/ infraestrutura */
  schemaType?: "MedicalProcedure" | "MedicalClinic"
  /** Data ISO da última revisão clínica (E-E-A-T YMYL) */
  lastReviewed?: string
  /** Fontes externas/referências (E-E-A-T YMYL) */
  references?: ServiceReferenceItem[]
}

// -----------------------------------------------------------------------------
// CONTEÚDO — Centro Cirúrgico
// -----------------------------------------------------------------------------

const CENTRO_CIRURGICO: ServiceDetailData = {
  slug: "centro-cirurgico",
  meta: {
    title: "Centro Cirúrgico | Hospital São Rafael — 22 Salas para Cirurgias Eletivas",
    description:
      "22 salas cirúrgicas com tecnologia robótica, laparoscopia avançada e taxa de infecção de 0,33%. Conheça o Centro Cirúrgico do Hospital São Rafael em BH.",
  },
  hero: {
    kicker: "CENTRO CIRÚRGICO",
    headline: "22 salas para o mais alto padrão em cirurgias eletivas.",
    subheadline:
      "Tecnologia robótica, laparoscopia avançada e equipe multidisciplinar integrada para o sucesso do seu procedimento.",
    backgroundImage: "/assets/images/servicos/centro-cirurgico-v2.jpg",
    pills: [
      "22 Salas Cirúrgicas",
      "Tecnologia Robótica",
      "Giro de Sala 40min",
      "0,33% Taxa de Infecção",
    ],
  },
  galleryBlock: {
    kicker: "ESTRUTURA",
    headline: "Projetado para zero imprevistos.",
    description:
      "Cada detalhe das nossas salas foi planejado para dar ao cirurgião controle total sobre o ambiente e ao paciente máxima segurança. Da entrada no centro cirúrgico à sala de recuperação, tudo é gerenciado por protocolos rígidos de qualidade.",
    images: [
      {
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Sala cirúrgica equipada com tecnologia de última geração",
      },
      {
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Bloco cirúrgico com equipe médica",
      },
      {
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Área de recuperação pós-operatória",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Salas para laparoscopia e cirurgia robótica",
        description: "Equipamentos de última geração integrados ao fluxo cirúrgico",
      },
      {
        icon: "check-circle",
        title: "Monitorização intraoperatória contínua",
        description: "Segurança máxima durante todo o ato cirúrgico",
      },
      {
        icon: "check-circle",
        title: "Giro de sala de 40 minutos",
        description: "Processos ágeis que otimizam a agenda do cirurgião",
      },
      {
        icon: "check-circle",
        title: "Equipe de instrumentadores exclusiva",
        description: "Suporte técnico especializado em cada procedimento",
      },
    ],
    cta: {
      label: "Falar com Atendimento",
      href: "#contato",
    },
  },
  highlights: {
    kicker: "NÚMEROS QUE COMPROVAM",
    headline: "Excelência que se mede em dados.",
    items: [
      {
        id: "salas",
        metric: "22",
        icon: "building-2",
        title: "Salas Cirúrgicas",
        description:
          "Todas equipadas com tecnologia de última geração para procedimentos de baixa a altíssima complexidade.",
      },
      {
        id: "giro",
        metric: "40min",
        icon: "timer",
        title: "Giro de Sala",
        description:
          "Processos ágeis que reduzem a ociosidade e maximizam a previsibilidade da sua agenda cirúrgica.",
      },
      {
        id: "infeccao",
        metric: "0,33%",
        icon: "shield-check",
        title: "Taxa de Infecção",
        description:
          "Um dos indicadores mais rigorosos do setor, muito abaixo da média nacional de hospitais de grande porte.",
      },
      {
        id: "experiencia",
        metric: "+12.000",
        icon: "activity",
        title: "Procedimentos Realizados",
        description:
          "Uma base de experiência clínica sólida que sustenta cada decisão do nosso time médico e operacional.",
      },
    ],
  },
  testimonials: {
    headline: "O que dizem nossos pacientes",
    items: [
      {
        id: "t1",
        quote:
          "A estrutura do Hospital São Rafael é impressionante. Me senti seguro e bem cuidado em todas as etapas, do pré-operatório à alta. A equipe foi extraordinária.",
        author: "Carlos Eduardo M.",
        role: "Paciente — Cirurgia de Joelho",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Minha cirurgia foi realizada com total tranquilidade. A integração entre o IMD e o centro cirúrgico fez toda a diferença no meu processo de preparo e recuperação.",
        author: "Ana Lucia S.",
        role: "Paciente — Cirurgia Abdominal",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Como cirurgião, encontrei aqui tudo que preciso para operar com confiança: infraestrutura moderna, equipe treinada e um giro de sala que me permite atender mais pacientes com qualidade.",
        author: "Dr. Rodrigo F.",
        role: "Cirurgião Ortopédico Parceiro",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Perguntas frequentes sobre o Centro Cirúrgico",
    items: [
      {
        id: "cc-faq-1",
        question: "O que são cirurgias eletivas particulares?",
        answer:
          "São procedimentos cirúrgicos planejados com antecedência, que não necessitam de urgência, realizados em regime particular. No Hospital São Rafael, o agendamento é ágil e a internação ocorre em um ambiente confortável e seguro, sem filas ou imprevistos burocráticos.",
      },
      {
        id: "cc-faq-2",
        question: "Como funciona o agendamento de uma cirurgia?",
        answer:
          "Após a indicação do seu médico, nossa equipe de relacionamento coordena todos os detalhes: agendamento da sala cirúrgica, exames pré-operatórios no IMD integrado e reserva de acomodação. Um único ponto de contato para todo o processo.",
      },
      {
        id: "cc-faq-3",
        question: "Meu cirurgião pode realizar o procedimento no HSR?",
        answer:
          "Sim. Médicos credenciados e não credenciados podem operar em nosso centro. Entre em contato com nossa Consultoria Médica Institucional para conhecer o processo de credenciamento e os recursos disponíveis para cada especialidade.",
      },
      {
        id: "cc-faq-4",
        question: "Quais especialidades são atendidas no Centro Cirúrgico?",
        answer:
          "Atendemos cirurgias eletivas de Ortopedia, Cardiologia, Neurologia, Urologia, Ginecologia, Oftalmologia e outras especialidades. Nossas 22 salas estão preparadas para procedimentos de baixa a altíssima complexidade, incluindo cirurgias robóticas e laparoscópicas.",
      },
      {
        id: "cc-faq-5",
        question: "Qual é o suporte disponível no pós-operatório?",
        answer:
          "Contamos com internação confortável, Unidade de Transição para acompanhamento pós-cirúrgico, Terapia Hiperbárica para recuperação acelerada e protocolo de alta segura. Cada etapa é monitorada pela nossa equipe multidisciplinar.",
      },
    ],
  },
}

// -----------------------------------------------------------------------------
// CONTEÚDO — Internação
// -----------------------------------------------------------------------------

const INTERNACAO: ServiceDetailData = {
  slug: "internacao",
  meta: {
    title: "Internação | Hospital São Rafael — Conforto e Segurança na Recuperação",
    description:
      "Acomodações individuais projetadas para recuperação pós-cirúrgica com monitoramento contínuo, equipe dedicada e protocolos rigorosos de segurança. Internação particular no Hospital São Rafael, BH.",
  },
  hero: {
    kicker: "INTERNAÇÃO",
    headline: "Recuperação segura em um ambiente desenhado para o seu bem-estar.",
    subheadline:
      "Acomodações confortáveis, monitoramento 24 horas e equipe multidisciplinar integrada para que você se dedique apenas a recuperar.",
    backgroundImage: "/assets/images/servicos/internacao.jpg",
    pills: [
      "65 Leitos",
      "Monitoramento 24h",
      "Equipe Multidisciplinar",
      "UTI Integrada",
    ],
  },
  galleryBlock: {
    kicker: "ESTRUTURA",
    headline: "Um ambiente projetado para a sua recuperação.",
    description:
      "Cada detalhe das nossas acomodações foi pensado para unir conforto e segurança clínica. Quartos individuais com monitoramento contínuo, equipe de enfermagem exclusiva e processos integrados ao centro cirúrgico e ao IMD garantem que o período de internação seja o mais tranquilo e seguro possível.",
    images: [
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Acomodação individual do Hospital São Rafael",
      },
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Posto de enfermagem com monitoramento contínuo",
      },
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Quarto com espaço para acompanhante",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Quartos individuais com banheiro privativo",
        description: "Privacidade e conforto para paciente e acompanhante durante toda a internação",
      },
      {
        icon: "check-circle",
        title: "Monitorização contínua à beira do leito",
        description: "Equipamentos modernos que acompanham os sinais vitais em tempo real",
      },
      {
        icon: "check-circle",
        title: "Equipe de enfermagem exclusiva",
        description: "Profissionais treinados e dedicados ao cuidado individualizado de cada paciente",
      },
      {
        icon: "check-circle",
        title: "Integração total com centro cirúrgico e IMD",
        description: "Prontuário único compartilhado entre todos os setores, sem perda de informação",
      },
    ],
    cta: {
      label: "Falar com Atendimento",
      href: "#contato",
    },
  },
  highlights: {
    kicker: "NÚMEROS QUE COMPROVAM",
    headline: "Segurança e conforto medidos em resultados.",
    items: [
      {
        id: "leitos",
        metric: "65",
        icon: "bed",
        title: "Leitos Disponíveis",
        description:
          "Estrutura robusta para atender cirurgias eletivas de baixa a altíssima complexidade com total disponibilidade e sem imprevistos de ocupação.",
      },
      {
        id: "monitoramento",
        metric: "24h",
        icon: "activity",
        title: "Monitoramento Contínuo",
        description:
          "Enfermagem e equipe médica presentes ininterruptamente, com sistemas de chamada imediata e protocolos de resposta rápida.",
      },
      {
        id: "integracao",
        metric: "100%",
        icon: "git-merge",
        title: "Integração Prontuário",
        description:
          "Informações do IMD, bloco cirúrgico e internação em um único prontuário digital, garantindo rastreabilidade e continuidade do cuidado.",
      },
      {
        id: "uti",
        metric: "UTI",
        icon: "shield-check",
        title: "Suporte Intensivo Integrado",
        description:
          "UTI disponível no mesmo complexo para casos que exijam suporte intensivo, com transferência ágil e equipe já familiarizada com o histórico do paciente.",
      },
    ],
  },
  testimonials: {
    headline: "O que dizem nossos pacientes",
    items: [
      {
        id: "t1",
        quote:
          "A equipe de enfermagem foi excepcional. Atenção e cuidado em cada momento, de dia e de noite. Me senti seguro e bem assistido durante toda a internação. Voltaria sem hesitar.",
        author: "Roberto Almeida S.",
        role: "Paciente — Cirurgia de Quadril",
        image: "",
      },
      {
        id: "t2",
        quote:
          "O quarto era muito confortável e tinha espaço para minha esposa ficar comigo. A integração com o centro cirúrgico foi perfeita — do pós-op direto para a internação, sem burocracia e sem atrito.",
        author: "Marcos Paulo V.",
        role: "Paciente — Cirurgia Cardíaca Eletiva",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Como cirurgiã, fico tranquila sabendo que meus pacientes estão em boas mãos depois da cirurgia. A equipe de internação é treinada, os protocolos são rigorosos e a comunicação comigo é rápida e clara.",
        author: "Dra. Patrícia Souza",
        role: "Cirurgiã Ginecológica Parceira",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Perguntas frequentes sobre a Internação",
    items: [
      {
        id: "int-faq-1",
        question: "Como funciona o processo de internação no Hospital São Rafael?",
        answer:
          "A internação é programada junto com o agendamento da cirurgia. Nossa equipe de relacionamento orienta o paciente sobre todos os documentos necessários, horário de chegada e o que trazer. Na admissão, um enfermeiro dedicado realiza a triagem e apresenta todas as instalações. O objetivo é que o paciente se sinta acolhido desde o primeiro momento.",
      },
      {
        id: "int-faq-2",
        question: "Acompanhante pode ficar durante toda a internação?",
        answer:
          "Sim. Nossos quartos individuais são projetados para acomodar um acompanhante com conforto, incluindo poltrona reclinável para descanso. O acompanhante tem acesso a alimentação, Wi-Fi e todas as comodidades do hospital. Em casos especiais, a equipe médica pode indicar restrições por critério clínico.",
      },
      {
        id: "int-faq-3",
        question: "Qual é o tempo médio de internação para cirurgias eletivas?",
        answer:
          "O tempo de internação varia conforme o tipo de procedimento e a evolução clínica de cada paciente. Cirurgias minimamente invasivas costumam ter alta em 24 a 48 horas. Procedimentos de maior complexidade podem exigir 3 a 5 dias. Seu cirurgião informará o tempo estimado no pré-operatório.",
      },
      {
        id: "int-faq-4",
        question: "Como é o suporte nutricional durante a internação?",
        answer:
          "Contamos com equipe de nutrição clínica que avalia e acompanha cada paciente, adaptando a dieta às necessidades pós-cirúrgicas. As refeições são preparadas no hospital, com opções para restrições alimentares e preferências do paciente. Acompanhantes têm acesso à praça de alimentação do complexo.",
      },
      {
        id: "int-faq-5",
        question: "O que acontece em caso de necessidade de UTI?",
        answer:
          "O Hospital São Rafael conta com UTI integrada ao complexo. Em caso de necessidade, a transferência é feita de forma ágil e segura, com a equipe já familiarizada com o histórico do paciente por conta do prontuário único. Nossos protocolos garantem que qualquer intercorrência seja tratada com rapidez e precisão.",
      },
    ],
  },
}

// -----------------------------------------------------------------------------
// MAPA DE SERVIÇOS — indexado por slug
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// CONTEÚDO — Imd
// -----------------------------------------------------------------------------

const IMD: ServiceDetailData = {
  slug: "imd",
  meta: {
    title: "IMD — Consultas e Exames Particulares em Belo Horizonte",
    description:
      "Instituto Médico e Diagnóstico do Hospital São Rafael: consultas com especialistas, exames de imagem e laboratoriais integrados ao centro cirúrgico. Atendimento exclusivamente particular em BH.",
  },
  navSections: [
    { id: "intro", label: "O IMD" },
    { id: "indicacoes", label: "Serviços" },
    { id: "para-o-medico", label: "Para o médico" },
    { id: "infraestrutura", label: "Infraestrutura" },
    { id: "equipamentos", label: "Tecnologia" },
    { id: "numeros", label: "Números" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Como funciona" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Dúvidas" },
  ],
  hero: {
    kicker: "IMD — INSTITUTO MÉDICO E DIAGNÓSTICO",
    headline: "Consultas e exames particulares com a precisão e o conforto do São Rafael.",
    subheadline:
      "Especialistas com agenda ágil, exames de imagem e laboratoriais integrados ao centro cirúrgico. Tudo em um único complexo, com atendimento exclusivamente particular.",
    backgroundImage: "/assets/images/servicos/imd.jpg",
    pills: [
      "Consulta com especialistas",
      "Imagem e laboratório",
      "Integrado ao cirúrgico",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "O Instituto Médico e Diagnóstico do Hospital São Rafael",
    paragraphs: [
      "O IMD é o braço de consultas, exames de imagem e diagnósticos do Hospital São Rafael. Foi pensado para reunir, em um único endereço, o que normalmente exige deslocamento entre consultórios, laboratórios e centros de imagem — entregando ao paciente e ao médico assistente uma experiência integrada, com agilidade e segurança clínica.",
      "Por estar dentro do mesmo complexo do centro cirúrgico, da unidade de internação e da UTI, o IMD oferece um diferencial clínico raro: o exame que apoia uma decisão cirúrgica chega ao prontuário em minutos, e o paciente pode passar do diagnóstico ao tratamento sem fragmentação ou retrabalho.",
      "Atendimento exclusivamente particular, com agenda ágil para consultas e exames eletivos. Pacientes acompanhados por médicos próprios ou por médicos parceiros que utilizam o IMD como apoio diagnóstico.",
    ],
  },
  indications: {
    kicker: "SERVIÇOS",
    headline: "O que você encontra no IMD",
    intro:
      "Diferentes serviços diagnósticos e ambulatoriais reunidos em um único endereço, com integração total ao prontuário hospitalar.",
    items: [
      {
        id: "pre-op",
        icon: "clipboard-check",
        title: "Avaliação pré-operatória completa",
        description:
          "Exames laboratoriais, de imagem e avaliação cardiológica/anestésica em um único agendamento.",
        highlighted: true,
      },
      {
        id: "consulta",
        icon: "stethoscope",
        title: "Consultas com especialistas",
        description:
          "Agenda ágil em diversas especialidades médicas, com integração ao centro cirúrgico quando indicado.",
      },
      {
        id: "ressonancia",
        icon: "activity",
        title: "Ressonância magnética",
        description:
          "Equipamento moderno para diagnósticos neurológicos, ortopédicos, abdominais e cardíacos.",
      },
      {
        id: "tomografia",
        icon: "scan",
        title: "Tomografia computadorizada",
        description:
          "Tomógrafo multislice de alta resolução para diagnósticos rápidos e precisos.",
      },
      {
        id: "ultrassom",
        icon: "activity",
        title: "Ultrassonografia",
        description:
          "USG abdominal, vascular, obstétrica e musculoesquelética com profissionais especializados.",
      },
      {
        id: "lab",
        icon: "flask",
        title: "Laboratório clínico",
        description:
          "Análises clínicas com agilidade e integração direta ao prontuário hospitalar.",
      },
      {
        id: "cardio",
        icon: "heart-handshake",
        title: "Avaliação cardiológica",
        description:
          "ECG, ecocardiograma, MAPA, Holter e teste ergométrico conduzidos por equipe especializada.",
      },
      {
        id: "raiox",
        icon: "scan",
        title: "Radiografia digital",
        description:
          "Raio-X digital com laudo rápido integrado ao prontuário eletrônico.",
      },
    ],
    note: "[REVISAR DIRETORIA] lista exata de modalidades disponíveis hoje no IMD.",
  },
  medico: {
    kicker: "PARA O MÉDICO ASSISTENTE",
    headline: "Apoio diagnóstico ágil e integrado para o seu paciente",
    description:
      "O IMD foi pensado também para o médico assistente que indica exames ou consultas e quer um parceiro confiável, com laudo digital ágil e canal direto para alinhamento clínico.",
    benefits: [
      {
        icon: "clipboard-check",
        title: "Laudo digital em prazo curto",
        description:
          "Exames de imagem e laboratoriais com laudos disponíveis no portal e prontuário em prazo curto.",
      },
      {
        icon: "git-merge",
        title: "Integração com cirurgia",
        description:
          "Se o caso evoluir para cirurgia eletiva no HSR, todo o histórico migra automaticamente para o pré-op.",
      },
      {
        icon: "headset",
        title: "Canal direto com radiologista",
        description:
          "Discussão de casos complexos com radiologista responsável pelo laudo, quando necessário.",
      },
      {
        icon: "shield-check",
        title: "Equipe especializada",
        description:
          "Profissionais com experiência em laudos cirúrgicos e oncológicos, alinhados às demandas do médico solicitante.",
      },
    ],
    ctaLabel: "Falar com a Consultoria Médica",
  },
  galleryBlock: {
    kicker: "INFRAESTRUTURA",
    headline: "Um diagnóstico tão cuidado quanto o tratamento",
    description:
      "Salas de exame e consultórios projetados para conforto e privacidade, com equipamentos de referência e fluxos otimizados para reduzir tempo de espera e ansiedade do paciente.",
    images: [
      {
        src: "/assets/images/servicos/imd.jpg",
        alt: "Recepção do IMD — Hospital São Rafael, Belo Horizonte",
      },
      {
        src: "/assets/images/servicos/imd.jpg",
        alt: "Sala de exame de imagem do IMD HSR",
      },
      {
        src: "/assets/images/servicos/imd.jpg",
        alt: "Consultório de especialista no IMD HSR",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Equipamentos modernos",
        description: "Imagem em alta resolução e laboratório com automação completa.",
      },
      {
        icon: "check-circle",
        title: "Agenda ágil",
        description: "Atendimento com horários otimizados e baixa espera para consulta e exame.",
      },
      {
        icon: "check-circle",
        title: "Prontuário único integrado",
        description: "Resultados disponíveis no mesmo prontuário do centro cirúrgico e da internação.",
      },
      {
        icon: "check-circle",
        title: "Equipe especializada",
        description: "Radiologistas, técnicos e enfermagem treinados em demandas clínicas e cirúrgicas.",
      },
    ],
    cta: { label: "Falar no WhatsApp", href: "https://wa.me/message/NZIPXRZ4SKUHM1" },
  },
  highlights: {
    kicker: "NÚMEROS",
    headline: "O IMD em dados",
    items: [
      {
        id: "especialidades",
        metric: "+20",
        icon: "stethoscope",
        title: "Especialidades médicas",
        description:
          "[REVISAR DIRETORIA] confirmar número de especialidades clínicas disponíveis no IMD.",
      },
      {
        id: "modalidades",
        metric: "+10",
        icon: "scan",
        title: "Modalidades de exame",
        description:
          "Imagem, laboratório, cardiológicos e endoscópicos em um mesmo endereço.",
      },
      {
        id: "integracao",
        metric: "100%",
        icon: "git-merge",
        title: "Integração com cirurgia",
        description:
          "Resultados disponíveis automaticamente no prontuário cirúrgico do HSR.",
      },
      {
        id: "tempo",
        metric: "Curto",
        icon: "timer",
        title: "Tempo médio de laudo",
        description:
          "[REVISAR DIRETORIA] confirmar SLA real de laudo por modalidade.",
      },
    ],
  },
  protocols: {
    kicker: "QUALIDADE",
    headline: "Padrões de qualidade em diagnóstico",
    intro:
      "Cada exame e consulta segue protocolos institucionais alinhados a referências brasileiras e internacionais.",
    items: [
      {
        id: "calibracao",
        icon: "settings-2",
        title: "Calibração e manutenção rigorosa",
        description:
          "Equipamentos mantidos pela engenharia clínica em ciclos rígidos de calibração e validação.",
      },
      {
        id: "biosseguranca",
        icon: "shield-check",
        title: "Biossegurança",
        description:
          "Protocolos rigorosos de antissepsia, descarte e fluxo de pacientes em todas as salas.",
      },
      {
        id: "rastreabilidade",
        icon: "git-merge",
        title: "Rastreabilidade do exame",
        description:
          "Cada exame tem registro completo: técnico, equipamento, parâmetros e laudo arquivados no prontuário.",
      },
      {
        id: "laudo",
        icon: "clipboard-check",
        title: "Dupla checagem em laudos críticos",
        description:
          "Casos oncológicos e cirúrgicos passam por revisão por segundo radiologista, quando indicado.",
      },
    ],
    certifications: [
      "ANVISA",
      "CFM — Conselho Federal de Medicina",
      "[PENDENTE CLIENTE] CBR — Colégio Brasileiro de Radiologia",
      "[PENDENTE CLIENTE] Acreditação ONA / outros selos",
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Seu atendimento no IMD, em 5 passos",
    intro:
      "Do agendamento ao laudo, organizamos o processo para reduzir tempo de espera e dar clareza em cada etapa.",
    steps: [
      {
        number: "1",
        title: "Agendamento direto",
        description:
          "Solicite consulta ou exame pelo WhatsApp. Equipe de relacionamento orienta sobre preparo, documentos e horário.",
      },
      {
        number: "2",
        title: "Preparo orientado",
        description:
          "Você recebe instruções claras de jejum, medicação, vestimenta e demais cuidados específicos do exame.",
      },
      {
        number: "3",
        title: "Atendimento no IMD",
        description:
          "Recepção ágil, salas confortáveis, equipe técnica especializada e tempo de exame conforme protocolo clínico.",
      },
      {
        number: "4",
        title: "Laudo e integração",
        description:
          "Laudo elaborado por especialista e disponibilizado no portal. Em caso de cirurgia futura no HSR, dados migram automaticamente.",
      },
      {
        number: "5",
        title: "Continuidade do cuidado",
        description:
          "Se houver indicação cirúrgica, agendamos próximas etapas (consulta pré-anestésica, cirurgia eletiva) no mesmo complexo.",
      },
    ],
  },
  testimonials: {
    headline: "O que dizem nossos pacientes e médicos",
    items: [
      {
        id: "t1",
        quote:
          "Fiz toda a investigação no IMD e a cirurgia depois no mesmo complexo. Foi muito mais rápido do que eu esperava — e tudo conversava entre si.",
        author: "Paciente HSR",
        role: "Investigação cardiológica e cirurgia",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Como cardiologista, encaminho meus pacientes ao IMD pela qualidade do laudo e pela integração com o centro cirúrgico — economiza tempo e evita retrabalho.",
        author: "Médico parceiro HSR",
        role: "Cardiologista",
        image: "",
      },
      {
        id: "t3",
        quote:
          "O atendimento foi rápido e os resultados saíram no prazo. Me senti acolhida em todos os exames.",
        author: "Paciente HSR",
        role: "Avaliação pré-operatória",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Dúvidas frequentes sobre o IMD",
    items: [
      {
        id: "imd-faq-1",
        question: "Como funciona o atendimento no IMD?",
        answer:
          "O IMD oferece consultas com especialistas, exames de imagem e laboratoriais em regime exclusivamente particular. O agendamento é feito diretamente pela nossa equipe de relacionamento, com agenda ágil e atendimento humanizado.",
      },
      {
        id: "imd-faq-2",
        question: "O IMD aceita convênios ou planos de saúde?",
        answer:
          "Não. O Hospital São Rafael e seus serviços, incluindo o IMD, são exclusivamente particulares. Os valores são apresentados de forma clara no agendamento, com pagamento à vista ou conforme condições combinadas.",
      },
      {
        id: "imd-faq-3",
        question: "Quais especialidades atendem no IMD?",
        answer:
          "[REVISAR DIRETORIA] Atendemos diversas especialidades médicas. Consulte nossa equipe para confirmar disponibilidade da especialidade que você precisa.",
      },
      {
        id: "imd-faq-4",
        question: "Quais exames o IMD realiza?",
        answer:
          "Ressonância magnética, tomografia, ultrassonografia, raio-X digital, exames laboratoriais, ECG, ecocardiograma, MAPA, Holter, teste ergométrico e outros. [REVISAR DIRETORIA] confirmar lista exata.",
      },
      {
        id: "imd-faq-5",
        question: "Quanto tempo demora o laudo?",
        answer:
          "Depende da modalidade. Exames laboratoriais e de rotina costumam ter resultado no mesmo dia. Imagens e laudos especializados seguem prazos clínicos rigorosos. Sua equipe de relacionamento informa o prazo no agendamento.",
      },
      {
        id: "imd-faq-6",
        question: "Posso fazer pré-operatório completo no IMD?",
        answer:
          "Sim. O IMD foi planejado especialmente para pacientes que farão cirurgia no Hospital São Rafael — exames laboratoriais, de imagem, cardiológicos e a consulta pré-anestésica em um único agendamento integrado.",
      },
      {
        id: "imd-faq-7",
        question: "Meu médico pode receber o laudo direto?",
        answer:
          "Sim. Disponibilizamos laudos pelo portal e enviamos cópia ao médico solicitante, com canal direto ao radiologista para discussão de casos quando necessário.",
      },
      {
        id: "imd-faq-8",
        question: "Como agendo consulta ou exame no IMD?",
        answer:
          "Pelo WhatsApp da nossa equipe de relacionamento. Você recebe orientação completa de preparo, documentos necessários, horário e estimativa de duração.",
      },
    ],
  },
  schemaType: "MedicalProcedure",
  lastReviewed: "2026-04-28",
  references: [
    {
      label: "ANVISA — Boas práticas em diagnóstico por imagem",
      href: "https://www.gov.br/anvisa/pt-br",
    },
    {
      label: "CFM — Resoluções sobre exames complementares",
      href: "https://portal.cfm.org.br/",
    },
    {
      label: "Colégio Brasileiro de Radiologia (CBR)",
      href: "https://cbr.org.br/",
    },
  ],
}

export const SERVICES_CONTENT: Record<string, ServiceDetailData> = {
  "centro-cirurgico": CENTRO_CIRURGICO,
  "internacao": INTERNACAO,
  "imd": IMD,
}
