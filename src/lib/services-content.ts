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
    title: "Internação Particular em Belo Horizonte | Hospital São Rafael",
    description:
      "65 leitos individuais com monitoramento 24h, equipe multidisciplinar e estrutura para acompanhante. Internação exclusivamente particular para cirurgias eletivas no HSR, BH.",
  },
  navSections: [
    { id: "intro", label: "A internação" },
    { id: "indicacoes", label: "Quem internamos" },
    { id: "infraestrutura", label: "Infraestrutura" },
    { id: "equipamentos", label: "Equipamentos" },
    { id: "numeros", label: "Números" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Como funciona" },
    { id: "acompanhante", label: "Acompanhante" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Dúvidas" },
  ],
  hero: {
    kicker: "UNIDADE DE INTERNAÇÃO",
    headline: "Recuperação no conforto que você merece, com a segurança que precisa.",
    subheadline:
      "65 leitos individuais, monitoramento 24h, equipe multidisciplinar e integração com centro cirúrgico, IMD e UTI. Estrutura pensada também para o acompanhante. Atendimento exclusivamente particular.",
    backgroundImage: "/assets/images/servicos/internacao.jpg",
    pills: [
      "65 leitos individuais",
      "Monitoramento 24h",
      "Estrutura p/ acompanhante",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Uma internação pensada para a sua recuperação e para quem está com você",
    paragraphs: [
      "A Unidade de Internação do Hospital São Rafael foi planejada para que você se concentre apenas em uma coisa: se recuperar bem. São 65 leitos individuais, todos com banheiro privativo, poltrona reclinável para o acompanhante e monitorização à beira do leito 24 horas por dia.",
      "Estamos integrados ao centro cirúrgico, ao IMD e à UTI no mesmo complexo, com prontuário único e equipe multidisciplinar de enfermagem, fisioterapia, nutrição e farmácia clínica acompanhando cada paciente. Essa integração elimina a fragmentação do cuidado — do bloco operatório à alta hospitalar, todos os profissionais conversam entre si com base no mesmo plano clínico.",
      "Como hospital exclusivamente particular dedicado a cirurgias eletivas, organizamos a internação para acolher também o acompanhante: alimentação no complexo, Wi-Fi, regras de visitação claras e suporte da equipe sempre que necessário. Sabemos que recuperação acontece com quem cuida ao lado.",
    ],
  },
  indications: {
    kicker: "QUEM INTERNAMOS",
    headline: "Internação para cirurgias eletivas particulares",
    intro:
      "Recebemos pacientes em recuperação de procedimentos eletivos realizados no nosso centro cirúrgico, em diversas especialidades.",
    items: [
      {
        id: "pos-cirurgico",
        icon: "scalpel",
        title: "Pós-cirúrgico eletivo",
        description:
          "Recuperação de procedimentos cirúrgicos eletivos com monitoramento contínuo e plano de cuidado personalizado.",
        highlighted: true,
      },
      {
        id: "ortopedica",
        icon: "bone",
        title: "Recuperação ortopédica",
        description:
          "Pós-operatório de artroplastias, artroscopias e cirurgias de coluna com fisioterapia integrada.",
      },
      {
        id: "cardiologica",
        icon: "activity",
        title: "Recuperação cardiológica",
        description:
          "Pacientes pós-procedimentos cardíacos eletivos com acompanhamento intensivo até alta.",
      },
      {
        id: "bariatrica",
        icon: "shield-check",
        title: "Pós-bariátrica",
        description:
          "Recuperação especializada de cirurgias bariátricas e metabólicas com nutrição clínica dedicada.",
      },
      {
        id: "transicao",
        icon: "heart-handshake",
        title: "Unidade de Transição",
        description:
          "Acompanhamento entre alta hospitalar e retorno domiciliar para pacientes que precisam de suporte intermediário.",
      },
      {
        id: "outras",
        icon: "stethoscope",
        title: "Demais especialidades",
        description:
          "Internações eletivas pós-procedimentos de urologia, ginecologia, otorrino, oftalmo e demais especialidades.",
      },
    ],
  },
  galleryBlock: {
    kicker: "INFRAESTRUTURA",
    headline: "Um ambiente projetado para a sua recuperação",
    description:
      "Quartos individuais com banheiro privativo, decoração acolhedora e tecnologia para monitorização contínua. Postos de enfermagem distribuídos para resposta rápida e copa interna para refeições do paciente e acompanhante.",
    images: [
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Quarto individual da unidade de internação do Hospital São Rafael",
      },
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Posto de enfermagem na unidade de internação HSR",
      },
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Quarto com espaço dedicado ao acompanhante no HSR",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Quartos individuais com banheiro privativo",
        description: "Privacidade e conforto para paciente e acompanhante durante toda a internação.",
      },
      {
        icon: "check-circle",
        title: "Monitorização à beira do leito",
        description: "Sinais vitais acompanhados em tempo real e alarmes integrados ao posto de enfermagem.",
      },
      {
        icon: "check-circle",
        title: "Equipe multidisciplinar",
        description: "Enfermagem, fisioterapia, nutrição e farmácia clínica integrados no plano de cuidado.",
      },
      {
        icon: "check-circle",
        title: "Integração com centro cirúrgico, IMD e UTI",
        description: "Prontuário único e fluxo direto entre setores no mesmo complexo.",
      },
    ],
    cta: { label: "Falar no WhatsApp", href: "https://wa.me/message/NZIPXRZ4SKUHM1" },
  },
  equipment: {
    kicker: "TECNOLOGIA",
    headline: "Tecnologia que sustenta o cuidado",
    description:
      "A unidade conta com equipamentos modernos de monitorização e sistemas digitais que garantem segurança e rastreabilidade do cuidado em cada turno.",
    items: [
      {
        icon: "activity",
        title: "Monitorização à beira do leito",
        description:
          "Frequência cardíaca, saturação, pressão e demais parâmetros conectados ao posto de enfermagem.",
      },
      {
        icon: "headset",
        title: "Sistema de chamada inteligente",
        description:
          "Botões e dispositivos com priorização clínica e resposta rastreável.",
      },
      {
        icon: "clipboard-check",
        title: "Prontuário eletrônico integrado",
        description:
          "Registro digital ponta a ponta — bloco cirúrgico, IMD, internação e UTI no mesmo histórico.",
      },
      {
        icon: "shield-check",
        title: "Bombas de infusão e medicação rastreada",
        description:
          "Administração de medicamentos com dupla checagem e rastreabilidade do dispensário ao paciente.",
      },
    ],
  },
  highlights: {
    kicker: "NÚMEROS",
    headline: "Internação em dados",
    items: [
      {
        id: "leitos",
        metric: "65",
        icon: "bed",
        title: "Leitos individuais",
        description:
          "Capacidade para atender cirurgias eletivas de baixa a altíssima complexidade com disponibilidade.",
      },
      {
        id: "monitor",
        metric: "24h",
        icon: "activity",
        title: "Monitoramento contínuo",
        description:
          "Enfermagem e equipe médica presentes 24h, com sistemas de chamada e protocolos de resposta rápida.",
      },
      {
        id: "uti",
        metric: "UTI",
        icon: "shield-check",
        title: "Suporte intensivo integrado",
        description:
          "UTI no mesmo complexo, com transferência ágil e equipe já familiarizada com o caso.",
      },
      {
        id: "prontuario",
        metric: "100%",
        icon: "git-merge",
        title: "Prontuário integrado",
        description:
          "IMD, bloco cirúrgico, internação e UTI no mesmo prontuário digital — rastreabilidade ponta a ponta.",
      },
    ],
  },
  protocols: {
    kicker: "SEGURANÇA",
    headline: "Protocolos de internação alinhados a referências internacionais",
    intro:
      "Cada turno e cada profissional segue protocolos institucionais que reduzem risco e elevam a qualidade percebida pelo paciente.",
    items: [
      {
        id: "infeccao",
        icon: "shield-check",
        title: "Controle de infecção hospitalar",
        description:
          "Protocolos rigorosos de antissepsia, isolamento, antibioticoprofilaxia e auditoria contínua.",
      },
      {
        id: "queda",
        icon: "user-check",
        title: "Prevenção de quedas",
        description:
          "Avaliação de risco em cada admissão e medidas individualizadas durante toda a internação.",
      },
      {
        id: "ulcera",
        icon: "heart-handshake",
        title: "Prevenção de lesão por pressão",
        description:
          "Mudança de decúbito, colchões especiais e avaliação periódica conforme escala de Braden.",
      },
      {
        id: "medicamento",
        icon: "clipboard-check",
        title: "Segurança medicamentosa",
        description:
          "Dupla checagem, rastreabilidade do dispensário ao paciente e dispensação por dose unitária.",
      },
      {
        id: "alta",
        icon: "git-merge",
        title: "Alta segura",
        description:
          "Plano de cuidado domiciliar entregue por escrito, retorno agendado e contato direto em caso de dúvida.",
      },
    ],
    certifications: [
      "ANVISA",
      "CFM — Conselho Federal de Medicina",
      "OMS — Metas internacionais de segurança do paciente",
      "[PENDENTE CLIENTE] Acreditação ONA / outros selos",
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Sua internação no HSR, do início ao fim",
    intro:
      "Cada etapa coordenada por uma equipe dedicada para que você e seu acompanhante saibam exatamente o que esperar.",
    steps: [
      {
        number: "1",
        title: "Admissão",
        description:
          "Recepção, conferência de documentos e exames pré-op, apresentação do quarto e da equipe responsável pelo turno.",
      },
      {
        number: "2",
        title: "Pós-operatório imediato",
        description:
          "Vinda do bloco cirúrgico ou da recuperação anestésica, com monitorização contínua e equipe atenta a cada parâmetro.",
      },
      {
        number: "3",
        title: "Recuperação",
        description:
          "Plano de cuidado individualizado, com fisioterapia, nutrição e enfermagem coordenados pelo seu cirurgião.",
      },
      {
        number: "4",
        title: "Alta segura",
        description:
          "Avaliação clínica, plano de cuidado domiciliar por escrito, prescrição de medicamentos e retorno agendado.",
      },
      {
        number: "5",
        title: "Acompanhamento pós-alta",
        description:
          "Canal aberto para dúvidas, retorno ao consultório do seu médico e suporte da equipe HSR se necessário.",
      },
    ],
  },
  acompanhante: {
    kicker: "PARA QUEM ESTÁ COM VOCÊ",
    headline: "Quem cuida de você também precisa de cuidado.",
    description:
      "A presença de quem está com você faz parte da recuperação. Por isso, organizamos a Unidade de Internação para acolher o acompanhante com conforto, informação clara e suporte sempre que necessário.",
    amenities: [
      {
        icon: "sofa",
        title: "Poltrona reclinável no quarto",
        description:
          "Espaço dedicado ao descanso do acompanhante, com poltrona reclinável e roupa de cama disponível.",
      },
      {
        icon: "shield-check",
        title: "Banheiro privativo",
        description:
          "Cada quarto tem banheiro privativo, com itens de higiene básicos disponíveis.",
      },
      {
        icon: "utensils",
        title: "Voucher de alimentação para o acompanhante",
        description:
          "Cada paciente internado recebe automaticamente 1 voucher por internação para o acompanhante. O voucher dá direito a 1 refeição completa, 1 sobremesa (bombom ou brigadeiro) e 1 açaí na Praça de Alimentação do complexo. As refeições do paciente já estão incluídas.",
      },
      {
        icon: "headset",
        title: "Wi-Fi e suporte",
        description:
          "Conexão estável em todos os quartos e equipe disponível para qualquer dúvida no turno.",
      },
      {
        icon: "heart-handshake",
        title: "Regras de visitação claras",
        description:
          "Horários, número de visitantes e cuidados de higiene apresentados na admissão.",
      },
      {
        icon: "user-check",
        title: "Suporte se algo mudar",
        description:
          "Acesso direto à equipe médica e à UTI no mesmo complexo, em qualquer intercorrência.",
      },
    ],
    note: "O voucher é entregue automaticamente na admissão. É 1 voucher por internação, independentemente do tempo de permanência. Horários de visitação e regras adicionais são apresentados na recepção.",
  },
  testimonials: {
    headline: "O que dizem nossos pacientes e acompanhantes",
    items: [
      {
        id: "t1",
        quote:
          "A equipe de enfermagem foi excepcional. Atenção e cuidado de dia e de noite. Me senti seguro durante toda a internação.",
        author: "Paciente HSR",
        role: "Cirurgia ortopédica",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Pude ficar com meu marido o tempo todo, com conforto e respeito. Fez muita diferença para a recuperação dele.",
        author: "Acompanhante HSR",
        role: "Esposa de paciente cirúrgico",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Como cirurgião, fico tranquilo sabendo que meus pacientes estão em uma unidade preparada e bem coordenada.",
        author: "Cirurgião parceiro HSR",
        role: "Especialista bariátrico",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Dúvidas frequentes sobre a internação",
    items: [
      {
        id: "int-faq-1",
        question: "Como funciona a internação no Hospital São Rafael?",
        answer:
          "A internação é programada junto com o agendamento da cirurgia. Você é recebido na recepção, passa pela admissão e é conduzido ao quarto. A equipe apresenta a unidade e inicia o plano de cuidado individualizado.",
      },
      {
        id: "int-faq-2",
        question: "O HSR aceita convênios ou planos de saúde para internação?",
        answer:
          "Não. O Hospital São Rafael é exclusivamente particular. Os valores de internação são apresentados de forma clara no agendamento da cirurgia, junto ao plano cirúrgico.",
      },
      {
        id: "int-faq-3",
        question: "O acompanhante pode ficar durante toda a internação?",
        answer:
          "Sim. Quartos individuais com poltrona reclinável e banheiro privativo, com Wi-Fi, alimentação no complexo e regras de visitação claras. Em casos clínicos específicos, a equipe pode indicar restrições temporárias.",
      },
      {
        id: "int-faq-4",
        question: "Quanto tempo dura a internação?",
        answer:
          "Depende do tipo de cirurgia e da evolução clínica. Cirurgias minimamente invasivas costumam ter alta em 24 a 48 horas; procedimentos de maior complexidade podem exigir 3 a 7 dias. Seu cirurgião informa a estimativa no pré-operatório.",
      },
      {
        id: "int-faq-5",
        question: "Como funciona a alimentação durante a internação?",
        answer:
          "As refeições do paciente são incluídas e adaptadas pela equipe de nutrição clínica conforme as necessidades pós-cirúrgicas. Para o acompanhante, cada internação dá direito automaticamente a 1 voucher (1 voucher por internação, independente do tempo de permanência), com 1 refeição, 1 sobremesa (bombom ou brigadeiro) e 1 açaí na Praça de Alimentação do complexo.",
      },
      {
        id: "int-faq-6",
        question: "E se eu precisar de UTI?",
        answer:
          "A UTI fica no mesmo complexo, com transferência ágil e equipe já familiarizada com o caso pelo prontuário único. Protocolos institucionais garantem resposta rápida em qualquer intercorrência.",
      },
      {
        id: "int-faq-7",
        question: "Posso receber visitas?",
        answer:
          "Sim. As regras de horário e número de visitantes são apresentadas na admissão e podem variar conforme o caso clínico, sempre priorizando o descanso e a recuperação do paciente.",
      },
      {
        id: "int-faq-8",
        question: "Como funciona a alta?",
        answer:
          "A alta é planejada com seu cirurgião e equipe multidisciplinar. Você recebe plano de cuidado domiciliar por escrito, prescrição de medicamentos, retorno agendado e canal direto para dúvidas.",
      },
      {
        id: "int-faq-9",
        question: "Existe Unidade de Transição?",
        answer:
          "Sim. Para pacientes que precisam de suporte entre alta hospitalar e retorno completo ao domicílio, oferecemos Unidade de Transição com cuidado intermediário.",
      },
      {
        id: "int-faq-10",
        question: "Como agendo internação no HSR?",
        answer:
          "A internação é agendada junto com a cirurgia. Após a indicação do seu médico, fale com a nossa equipe pelo WhatsApp para coordenar exames pré-op no IMD, consulta pré-anestésica e a data da cirurgia.",
      },
    ],
  },
  schemaType: "MedicalProcedure",
  lastReviewed: "2026-04-28",
  references: [
    {
      label: "OMS — Metas internacionais de segurança do paciente",
      href: "https://www.who.int/teams/integrated-health-services/patient-safety",
    },
    {
      label: "ANVISA — Boas práticas em internação hospitalar",
      href: "https://www.gov.br/anvisa/pt-br",
    },
    {
      label: "CFM — Conselho Federal de Medicina",
      href: "https://portal.cfm.org.br/",
    },
  ],
}

// -----------------------------------------------------------------------------
// MAPA DE SERVIÇOS — indexado por slug
// -----------------------------------------------------------------------------

export const SERVICES_CONTENT: Record<string, ServiceDetailData> = {
  "centro-cirurgico": CENTRO_CIRURGICO,
  "internacao": INTERNACAO,
}
