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
  /** Label do CTA secundário do bloco. Default: "Falar com Relacionamento Médico" */
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
  /** Quando true, renderiza highlights após jornada em vez de após equipamentos */
  highlightsAfterJourney?: boolean
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
  navSections: [
    { id: "para-o-medico", label: "Para o médico" },
    { id: "infraestrutura", label: "Estrutura" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Como funciona" },
    { id: "acompanhante", label: "Acompanhante" },
    { id: "numeros", label: "Números" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Perguntas frequentes" },
  ],
  highlightsAfterJourney: true,
  meta: {
    title: "Centro Cirúrgico | Hospital São Rafael, 22 salas para cirurgias eletivas",
    description:
      "Centro cirúrgico planejado para procedimentos eletivos multiespecialidades, com 22 salas, CME própria e equipe alinhada ao seu procedimento. Conheça o Centro Cirúrgico do Hospital São Rafael em BH.",
  },
  hero: {
    kicker: "CENTRO CIRÚRGICO",
    headline: "Um centro cirúrgico planejado para procedimentos eletivos multiespecialidades.",
    subheadline:
      "Salas integradas, monitorização anestésica e equipe de enfermagem alinhada ao procedimento, para o sucesso da sua cirurgia, nas mais diversas especialidades.",
    backgroundImage: "/assets/images/servicos/centro-cirurgico-v2.jpg",
    pills: [
      "22 Salas Cirúrgicas",
      "CME Própria",
      "Multiespecialidades Eletivas",
      "Engenharia Clínica",
    ],
  },
  galleryBlock: {
    kicker: "ESTRUTURA",
    headline: "Projetado para o controle total do ambiente cirúrgico.",
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
        title: "Salas integradas com sistemas de imagem",
        description: "Estrutura integrada ao fluxo cirúrgico, com torre de vídeo e arco cirúrgico",
      },
      {
        icon: "check-circle",
        title: "Monitorização anestésica avançada",
        description: "Acompanhamento contínuo durante todo o ato cirúrgico",
      },
      {
        icon: "check-circle",
        title: "Intervalo entre cirurgias otimizado",
        description: "Processos planejados para maior agilidade e eficiência entre os procedimentos",
      },
      {
        icon: "check-circle",
        title: "Equipe de enfermagem alinhada ao procedimento",
        description: "Suporte da equipe de enfermagem em cada etapa da cirurgia",
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
          "Todas equipadas com tecnologia de última geração para os mais diversos procedimentos cirúrgicos eletivos.",
      },
      {
        id: "cme",
        metric: "CME",
        icon: "git-merge",
        title: "Central de Esterilização Própria",
        description:
          "CME própria, com rastreabilidade de materiais e medicamentos no prontuário digital e engenharia clínica que avalia os equipamentos antes de cada cirurgia.",
      },
      {
        id: "experiencia",
        metric: "+12.000",
        icon: "activity",
        title: "Procedimentos Realizados",
        description:
          "Uma base de experiência clínica sólida que sustenta cada decisão do nosso time médico e operacional.",
      },
      {
        id: "infeccao",
        metric: "0,33%",
        icon: "shield-check",
        title: "Taxa de Infecção",
        description:
          "Nossa taxa de infecção de 0,33% reflete uma cultura de segurança presente em cada protocolo: antissepsia, esterilização, controle de fluxo, temperatura e umidade e checklists obrigatórios.",
      },
    ],
  },
  protocols: {
    kicker: "SEGURANÇA EM CADA ETAPA",
    headline: "Protocolos que sustentam cada cirurgia.",
    intro: "Toda a estrutura do centro cirúrgico trabalha em torno de protocolos rígidos, reunidos em uma única cultura de segurança.",
    items: [
      { id: "cirurgia-segura", icon: "clipboard-check", title: "Protocolo de cirurgia segura", description: "Checklists obrigatórios em cada etapa, da entrada na sala à recuperação." },
      { id: "antibiotico", icon: "clock", title: "Antibiótico no tempo certo", description: "Administração no momento adequado para reduzir riscos e proteger o paciente." },
      { id: "rastreabilidade", icon: "git-merge", title: "Rastreabilidade total", description: "Materiais e medicamentos registrados no prontuário digital, com rastreio completo." },
      { id: "controle-fluxo", icon: "shield-check", title: "Esterilização e controle de fluxo", description: "Antissepsia, esterilização e controle de temperatura, umidade e circulação no bloco." },
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Da consulta à alta, cada etapa coordenada.",
    steps: [
      { number: "01", title: "Consulta e indicação médica", description: "Seu médico indica o procedimento e orienta sobre os próximos passos e documentação necessária." },
      { number: "02", title: "Indicação e exames pré-operatórios", description: "Realização dos exames necessários no IMD integrado, sem deslocamento entre endereços." },
      { number: "03", title: "Avaliação pré-anestésica", description: "Consulta com o anestesiologista para personalizar o protocolo anestésico e mitigar riscos." },
      { number: "04", title: "Admissão", description: "Você é recebido e preparado para o procedimento com calma e segurança." },
      { number: "05", title: "Procedimento cirúrgico", description: "A cirurgia é realizada em uma das 22 salas equipadas, com equipe alinhada ao seu procedimento." },
      { number: "06", title: "SRPA", description: "Acompanhamento na sala de recuperação pós-anestésica, ainda no bloco cirúrgico." },
      { number: "07", title: "Internação", description: "Transferência para acomodação individual, com equipe de enfermagem presente." },
      { number: "08", title: "Alta", description: "Alta com orientações claras para a continuidade do cuidado em casa." },
    ],
  },
  medico: {
    kicker: "PARA O MÉDICO",
    headline: "Tudo o que você precisa para operar com autonomia.",
    description: "Estrutura completa dentro de um único complexo, para que o cirurgião opere com segurança, agilidade e suporte em cada etapa.",
    benefits: [
      { icon: "settings-2", title: "Tecnologia e equipamentos próprios", description: "Parque tecnológico disponível, com possibilidade de locação de equipamentos conforme o procedimento." },
      { icon: "git-merge", title: "CME própria", description: "Central de esterilização interna, com rastreabilidade de materiais no prontuário digital." },
      { icon: "clipboard-check", title: "Prontuário integrado", description: "Exames e laudos do IMD chegam ao bloco cirúrgico em um único prontuário digital." },
      { icon: "wrench", title: "Engenharia clínica", description: "Manutenção preventiva e avaliação dos equipamentos antes de cada cirurgia." },
      { icon: "heart-pulse", title: "Bolsa de sangue e anatomopatológico", description: "Apoio de hemoterapia e exames anatomopatológicos dentro do complexo." },
      { icon: "flask", title: "Farmácia satélite", description: "Farmácia próxima ao bloco, com dispensação ágil de medicamentos e materiais." },
      { icon: "shield-check", title: "CCIH e treinamentos", description: "Comissão de controle de infecção atuante e equipe em treinamento contínuo." },
    ],
    ctaLabel: "Falar com Relacionamento Médico",
  },
  schemaType: "MedicalClinic",
  lastReviewed: "2026-06-11",
  testimonials: {
    headline: "O que dizem nossos pacientes",
    items: [
      {
        id: "t1",
        quote:
          "A estrutura do Hospital São Rafael é impressionante. Me senti seguro e bem cuidado em todas as etapas, do pré-operatório à alta. A equipe foi extraordinária.",
        author: "Carlos Eduardo M.",
        role: "Paciente, Cirurgia de Joelho",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Minha cirurgia foi realizada com total tranquilidade. A integração entre o IMD e o centro cirúrgico fez toda a diferença no meu processo de preparo e recuperação.",
        author: "Ana Lucia S.",
        role: "Paciente, Cirurgia Abdominal",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Como cirurgião, encontrei aqui tudo que preciso para operar com confiança: infraestrutura moderna, equipe alinhada ao procedimento e um intervalo entre cirurgias que me permite atender mais pacientes com qualidade.",
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
          "São procedimentos cirúrgicos planejados com antecedência, que não necessitam de urgência, realizados em regime particular. No Hospital São Rafael, o agendamento é ágil e a internação ocorre em um ambiente confortável e seguro, sem filas nem burocracia.",
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
          "Apenas médicos credenciados podem realizar procedimentos no Hospital São Rafael. Médicos ainda não credenciados podem entrar em contato com nossa equipe de Relacionamento Médico para iniciar o processo de credenciamento e conhecer os recursos disponíveis para cada especialidade.",
      },
      {
        id: "cc-faq-4",
        question: "Quais cirurgias são realizadas no Centro Cirúrgico?",
        answer:
          "O Centro Cirúrgico do Hospital São Rafael é preparado para procedimentos eletivos de múltiplas especialidades. Nossas 22 salas atendem cirurgias eletivas de múltiplas especialidades, com estrutura, equipe e protocolos alinhados a cada procedimento.",
      },
      {
        id: "cc-faq-5",
        question: "Qual é o suporte disponível no pós-operatório?",
        answer:
          "Contamos com internação confortável, Unidade de Transição para acompanhamento pós-cirúrgico, Terapia Hiperbárica para recuperação acelerada e protocolo de alta segura. Cada etapa é monitorada pela nossa equipe multidisciplinar.",
      },
    ],
  },
  acompanhante: {
    kicker: "PARA QUEM ESTÁ COM VOCÊ",
    headline: "O acompanhante informado em cada etapa.",
    description: "Enquanto o procedimento acontece no bloco, o acompanhante tem suporte, conforto e comunicação ativa da nossa equipe.",
    amenities: [
      { icon: "clock", title: "Atualização a cada 2 horas", description: "Nossa equipe entra em contato com o acompanhante a cada 2 horas para informar o andamento do procedimento cirúrgico." },
      { icon: "sofa", title: "Sala de espera confortável", description: "Ambiente dedicado para aguardar com conforto e privacidade durante o procedimento." },
      { icon: "utensils", title: "Acesso às comodidades", description: "Praça de alimentação e demais comodidades do complexo disponíveis durante a espera." },
      { icon: "phone", title: "Canal direto com a equipe", description: "Contato disponível para esclarecer dúvidas durante o procedimento, sem precisar aguardar atualizações passivamente." },
    ],
    note: "O acompanhante é acionado imediatamente quando o paciente é transferido do bloco para a internação.",
  },
}

// -----------------------------------------------------------------------------
// CONTEÚDO — Internação
// -----------------------------------------------------------------------------

const INTERNACAO: ServiceDetailData = {
  slug: "internacao",
  navSections: [
    { id: "intro", label: "Prepare-se" },
    { id: "infraestrutura", label: "Estrutura" },
    { id: "numeros", label: "Números" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Sua jornada" },
    { id: "acompanhante", label: "Acompanhante" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Perguntas frequentes" },
  ],
  meta: {
    title: "Internação | Hospital São Rafael, conforto e segurança na recuperação",
    description:
      "Acomodações individuais projetadas para recuperação pós-cirúrgica com acompanhamento próximo da equipe de enfermagem e protocolos rigorosos de segurança. Internação particular no Hospital São Rafael, BH.",
  },
  intro: {
    kicker: "PREPARE-SE PARA A INTERNAÇÃO",
    headline: "Tudo o que você precisa saber antes de chegar.",
    paragraphs: [
      "Nossa equipe de relacionamento entra em contato antes da sua chegada para orientar sobre documentos, horário de admissão e o que trazer. Com tudo organizado com antecedência, a admissão é rápida e o cuidado começa sem atraso.",
    ],
    subsections: [
      {
        id: "preparo",
        title: "Como se preparar",
        paragraphs: [
          "Traga documentos pessoais (RG e CPF) e o pedido médico de internação. Roupas confortáveis são recomendadas. Itens de higiene pessoal e entretenimento podem ser trazidos. Para cirurgias com jejum, siga rigorosamente as instruções do seu médico — nossa equipe reforça as orientações no contato prévio.",
        ],
      },
      {
        id: "visitacao",
        title: "Regras de visitação",
        paragraphs: [
          "Cada paciente pode ter um acompanhante durante toda a internação, com espaço e comodidades dedicados. Visitas adicionais são bem-vindas nos horários estabelecidos pela equipe. Em situações que exijam restrição por critério clínico, a enfermagem orienta o acompanhante com clareza e antecedência.",
        ],
      },
    ],
  },
  hero: {
    kicker: "INTERNAÇÃO",
    headline: "Recuperação segura em um ambiente desenhado para o seu bem-estar.",
    subheadline:
      "Acomodações confortáveis, equipe de enfermagem presente 24 horas e estrutura pensada também para o seu acompanhante, para que você se dedique apenas a recuperar.",
    backgroundImage: "/assets/images/servicos/internacao.jpg",
    pills: [
      "56 Leitos Individuais",
      "30 Suítes Luxo + 26 Standard",
      "Estrutura para Acompanhante",
      "Prontuário Único",
    ],
  },
  galleryBlock: {
    kicker: "ESTRUTURA",
    headline: "Um ambiente projetado para a sua recuperação.",
    description:
      "Cada detalhe das nossas acomodações foi pensado para unir conforto e segurança clínica. Quartos individuais, acompanhamento próximo da equipe de enfermagem e processos integrados ao centro cirúrgico e ao IMD garantem que a sua recuperação seja a mais tranquila e segura possível.",
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
        title: "56 leitos individuais: 30 suítes luxo e 26 standard",
        description: "Suítes luxo com banheiro privativo, sofá-cama, TV e frigobar; standard com banheiro compartilhado e higienização conforme protocolos da Anvisa",
      },
      {
        icon: "check-circle",
        title: "Acompanhamento próximo da equipe de enfermagem",
        description: "Equipe presente à beira do leito durante toda a sua permanência",
      },
      {
        icon: "check-circle",
        title: "Equipe de enfermagem dedicada",
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
        metric: "56",
        icon: "bed",
        title: "Leitos Individuais",
        description:
          "30 suítes luxo com banheiro privativo e 26 leitos standard com banheiro compartilhado, para atender cirurgias eletivas com conforto e disponibilidade.",
      },
      {
        id: "equipe",
        metric: "24h",
        icon: "activity",
        title: "Equipe Presente",
        description:
          "Enfermagem e equipe médica presentes ao longo de toda a sua permanência, com acompanhamento próximo e protocolos de resposta rápida.",
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
        id: "estabilizacao",
        metric: "Segurança",
        icon: "shield-check",
        title: "Unidade de Estabilização Integrada",
        description:
          "Unidade de estabilização no mesmo complexo para casos que exijam suporte adicional, com transferência ágil e equipe já familiarizada com o histórico do paciente.",
      },
    ],
  },
  protocols: {
    kicker: "PROTOCOLOS DE SEGURANÇA",
    headline: "Padrões internacionais aplicados em cada detalhe.",
    intro: "A internação no Hospital São Rafael segue protocolos baseados em referências internacionais, com foco em segurança clínica e conforto.",
    items: [
      { id: "infeccao", icon: "shield-check", title: "Controle de infecção", description: "Protocolos rigorosos de higienização, paramentação e controle de fluxo para zero tolerância a infecções relacionadas à assistência." },
      { id: "quedas", icon: "alert-triangle", title: "Prevenção de quedas", description: "Avaliação de risco na admissão, sinalização visual e barreiras físicas para proteger o paciente em todos os momentos." },
      { id: "lesao-pressao", icon: "layers", title: "Prevenção de lesão por pressão", description: "Escala de avaliação aplicada a cada paciente, com reposicionamento programado e superfícies especiais quando indicadas." },
      { id: "medicamentos", icon: "flask", title: "Segurança medicamentosa", description: "Dispensação via farmácia satélite com dupla checagem e registro integrado ao prontuário digital, eliminando erros de medicação." },
      { id: "hotelaria", icon: "sparkles", title: "Higienização e hotelaria premium", description: "Equipe treinada em protocolos da Anvisa para higienização de superfícies e enxoval. Limpeza terminal entre internações." },
      { id: "referencias", icon: "book-open", title: "Referências internacionais", description: "Protocolos alinhados às recomendações do Joint Commission International (JCI), ANVISA e melhores práticas da medicina baseada em evidências." },
    ],
  },
  journey: {
    kicker: "SUA JORNADA",
    headline: "Cada etapa pensada para a sua recuperação.",
    intro: "Da chegada à alta, você é acompanhado em um único complexo, sem deslocamento entre endereços.",
    steps: [
      { number: "01", title: "Acolhimento", description: "Recepção e orientação sobre cada etapa da sua permanência." },
      { number: "02", title: "Admissão no quarto", description: "Acomodação na suíte, com apresentação da estrutura e da equipe." },
      { number: "03", title: "Centro cirúrgico", description: "Encaminhamento ao bloco para o seu procedimento, no mesmo complexo." },
      { number: "04", title: "Recuperação (SRPA)", description: "Acompanhamento na sala de recuperação pós-anestésica." },
      { number: "05", title: "Retorno à internação", description: "Volta ao quarto para a recuperação, com a equipe de enfermagem por perto." },
      { number: "06", title: "Unidade de Transição e Hiperbárica (quando indicada)", description: "Quando indicado pelo médico, o paciente segue para a Unidade de Transição e pode realizar sessões de Terapia Hiperbárica para acelerar a recuperação — tudo no mesmo complexo, sem deslocamento." },
      { number: "07", title: "Alta", description: "Alta com orientações claras para a continuidade do cuidado em casa." },
    ],
  },
  acompanhante: {
    kicker: "PARA QUEM ESTÁ COM VOCÊ",
    headline: "Conforto também para o seu acompanhante.",
    description: "Pensamos em quem fica ao seu lado durante a recuperação, com estrutura e comodidades para o acompanhante.",
    amenities: [
      { icon: "sofa", title: "Sofá-cama no quarto", description: "Espaço confortável para o acompanhante descansar ao seu lado." },
      { icon: "utensils", title: "Voucher de alimentação", description: "Voucher de alimentação para o acompanhante durante a internação." },
      { icon: "users", title: "Acesso às comodidades", description: "Praça de alimentação e demais comodidades do complexo à disposição." },
    ],
    note: "O voucher de alimentação do acompanhante está incluso. Em casos específicos, a equipe médica pode indicar restrições por critério clínico.",
  },
  schemaType: "MedicalClinic",
  lastReviewed: "2026-06-11",
  testimonials: {
    headline: "O que dizem nossos pacientes",
    items: [
      {
        id: "t1",
        quote:
          "A equipe de enfermagem foi excepcional. Atenção e cuidado em cada momento, de dia e de noite. Me senti seguro e bem assistido durante toda a internação. Voltaria sem hesitar.",
        author: "Roberto Almeida S.",
        role: "Paciente, Cirurgia de Quadril",
        image: "",
      },
      {
        id: "t2",
        quote:
          "O quarto era muito confortável e tinha espaço para minha esposa ficar comigo. A integração com o centro cirúrgico foi perfeita: do pós-operatório direto para a internação, sem burocracia.",
        author: "Marcos Paulo V.",
        role: "Paciente, Cirurgia de Coluna", // [PENDENTE CLIENTE] Substituir por depoimento aprovado
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
          "Sim. Nossos quartos individuais são projetados para acomodar um acompanhante com conforto: as suítes luxo contam com sofá-cama, e as acomodações standard com poltrona reclinável. O acompanhante tem acesso a alimentação, Wi-Fi e todas as comodidades do hospital. Em casos especiais, a equipe médica pode indicar restrições por critério clínico.",
      },
      {
        id: "int-faq-3",
        question: "Qual é o tempo médio de internação para cirurgias eletivas?",
        answer:
          "O tempo de internação varia conforme o tipo de procedimento e a evolução clínica de cada paciente. Cirurgias minimamente invasivas costumam ter alta em 24 a 48 horas. Procedimentos de maior complexidade podem exigir 3 a 5 dias. Seu cirurgião informará o tempo estimado no pré-operatório.",
      },
      {
        id: "int-faq-4",
        question: "Como funciona a alimentação durante a permanência?",
        answer:
          "As refeições são preparadas no hospital, com opções para restrições alimentares e preferências do paciente, sempre seguindo a orientação clínica do seu médico. Os acompanhantes têm acesso à praça de alimentação do complexo.",
      },
      {
        id: "int-faq-5",
        question: "O que acontece em caso de necessidade de suporte adicional?",
        answer:
          "O Hospital São Rafael conta com unidade de estabilização integrada ao complexo. Em caso de necessidade, a transferência é feita de forma ágil e segura, com a equipe já familiarizada com o histórico do paciente por conta do prontuário único. Nossos protocolos garantem que qualquer intercorrência seja tratada com rapidez e precisão.",
      },
    ],
  },
}

// -----------------------------------------------------------------------------
// CONTEÚDO — IMD (Instituto Médico e Diagnóstico)
// -----------------------------------------------------------------------------

const IMD: ServiceDetailData = {
  slug: "imd",
  meta: {
    title: "IMD | Instituto Médico e Diagnóstico do Hospital São Rafael",
    description:
      "Consultas, exames de imagem, laboratório e check-up em um só lugar, integrados ao centro cirúrgico. Atendimento particular com laudo em até 24h. Conheça o IMD do Hospital São Rafael, em BH.",
  },
  navSections: [
    { id: "intro", label: "O que é o IMD" },
    { id: "equipamentos", label: "O que oferecemos" },
    { id: "para-o-medico", label: "Para o médico" },
    { id: "infraestrutura", label: "Estrutura" },
    { id: "numeros", label: "Números" },
    { id: "jornada", label: "Como funciona" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Perguntas frequentes" },
  ],
  hero: {
    kicker: "INSTITUTO MÉDICO E DIAGNÓSTICO",
    headline: "Consultas e exames reunidos em um só lugar, integrados à sua cirurgia.",
    subheadline:
      "Consultas com especialistas, exames de imagem, laboratório, check-up e terapia hiperbárica em um único instituto, integrado ao centro cirúrgico e com atendimento exclusivamente particular.",
    backgroundImage: "/assets/images/servicos/imd.jpg",
    pills: [
      "14 Especialidades",
      "Consultas e Exames",
      "Laudo em até 24h",
      "Atendimento Particular",
    ],
  },
  intro: {
    kicker: "O QUE É O IMD",
    headline: "Um instituto pensado para reunir todo o seu diagnóstico.",
    paragraphs: [
      "O Instituto Médico e Diagnóstico (IMD) do Hospital São Rafael reúne consultas, exames de imagem, laboratório e check-up em um mesmo espaço, com atendimento exclusivamente particular.",
      "Por funcionar dentro do mesmo complexo do centro cirúrgico, o IMD conecta avaliação, diagnóstico e procedimento em uma jornada contínua: os resultados e laudos alimentam o prontuário digital, sem repetição de exames e sem deslocamento entre endereços.",
      "Os laudos ficam disponíveis em até 24 horas, dando agilidade para a próxima etapa do seu cuidado.",
    ],
    subsections: [
      {
        id: "especialidades",
        title: "14 especialidades atendidas",
        paragraphs: [
          "Cardiologia, Cabeça e Pescoço, Dermatologia, Urologia, Ginecologia, Mastologia, Cirurgia Geral, Neurocirurgia, Ortopedia, Cirurgia Plástica, Cirurgia Vascular, Otorrinolaringologia, Oftalmologia e Clínica da Dor.",
        ],
      },
    ],
  },
  equipment: {
    kicker: "O QUE OFERECEMOS",
    headline: "Tudo o que o seu diagnóstico precisa, em um só lugar.",
    description:
      "Da avaliação pré-operatória ao check-up completo, com equipe e tecnologia integradas ao centro cirúrgico.",
    items: [
      { icon: "clipboard-check", title: "Avaliação pré-operatória", description: "Consultas e exames que preparam você para a cirurgia com segurança e previsibilidade." },
      { icon: "stethoscope", title: "Consultas com especialistas", description: "Atendimento com médicos das 14 especialidades atendidas no instituto." },
      { icon: "heart-pulse", title: "Teste ergométrico", description: "Avaliação do seu desempenho cardiológico sob esforço, com acompanhamento especializado." },
      { icon: "scan", title: "Tomografia computadorizada", description: "Exames de imagem de alta definição para um diagnóstico preciso." },
      { icon: "waves", title: "Ultrassonografia", description: "Exames de ultrassom para diferentes regiões, com agilidade na liberação do laudo." },
      { icon: "activity", title: "Raio-X digital", description: "Imagens digitais com qualidade e rapidez na entrega dos resultados." },
      { icon: "flask", title: "Laboratório clínico", description: "Coleta e análises laboratoriais integradas ao seu prontuário." },
      { icon: "user-check", title: "Check-up", description: "Avaliação completa da sua saúde, reunida em um único atendimento." },
    ],
  },
  medico: {
    kicker: "PARA O MÉDICO",
    headline: "Diagnóstico ágil e integrado ao seu paciente cirúrgico.",
    description:
      "O IMD trabalha conectado ao bloco cirúrgico, dando ao médico assistente agilidade e rastreabilidade em cada etapa.",
    benefits: [
      { icon: "clock", title: "Laudo digital em até 24h", description: "Resultados disponíveis no prontuário com rapidez para a sua decisão clínica." },
      { icon: "building-2", title: "Consultório no IMD", description: "Estrutura para o atendimento dos seus pacientes dentro do mesmo complexo." },
      { icon: "git-merge", title: "Integração com o bloco cirúrgico", description: "Exames e laudos alimentam o prontuário do centro cirúrgico, sem retrabalho." },
      { icon: "activity", title: "Agilidade no diagnóstico", description: "Da avaliação ao procedimento, sem espera entre as etapas." },
    ],
    ctaLabel: "Falar com Relacionamento Médico",
  },
  galleryBlock: {
    kicker: "ESTRUTURA",
    headline: "Um instituto preparado para acolher você.",
    description:
      "Ambientes confortáveis para consultas e exames, com equipe dedicada e tecnologia integrada ao centro cirúrgico.",
    images: [
      { src: "/assets/images/servicos/imd.jpg", alt: "Recepção do Instituto Médico e Diagnóstico" },
      { src: "/assets/images/servicos/imd.jpg", alt: "Sala de exames de imagem do IMD" },
      { src: "/assets/images/servicos/imd.jpg", alt: "Consultório do IMD" },
    ],
    features: [
      { icon: "check-circle", title: "14 especialidades atendidas", description: "Consultas com especialistas reunidas em um único instituto" },
      { icon: "check-circle", title: "Laudo em até 24h", description: "Resultados liberados com agilidade para a próxima etapa do cuidado" },
      { icon: "check-circle", title: "Integrado ao centro cirúrgico", description: "Diagnóstico e procedimento conectados pelo prontuário digital" },
      { icon: "check-circle", title: "Atendimento particular", description: "Agendamento ágil e acolhimento em cada etapa" },
    ],
    cta: { label: "Falar com Atendimento", href: "#contato" },
  },
  highlights: {
    kicker: "NÚMEROS QUE COMPROVAM",
    headline: "Diagnóstico que adianta o seu cuidado.",
    items: [
      { id: "especialidades", metric: "14", icon: "stethoscope", title: "Especialidades", description: "Consultas com especialistas reunidas no mesmo instituto, para avaliar você com profundidade." },
      { id: "laudo", metric: "24h", icon: "clock", title: "Laudo em até 24h", description: "Resultados liberados com agilidade, sem prolongar a espera entre diagnóstico e procedimento." },
      { id: "exames", metric: "8", icon: "scan", title: "Áreas de Exame", description: "Consultas, imagem, laboratório e check-up reunidos em um único atendimento." },
      { id: "integracao", metric: "100%", icon: "git-merge", title: "Integração com o Bloco", description: "Exames e laudos no mesmo prontuário do centro cirúrgico, com rastreabilidade total." },
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Do agendamento ao laudo, sem complicação.",
    intro: "Um fluxo pensado para integrar diagnóstico e procedimento em uma jornada contínua.",
    steps: [
      { number: "01", title: "Agendamento direto", description: "Agende pelo WhatsApp ou pelo time de relacionamento. Nossa equipe orienta sobre preparo, documentos e horário." },
      { number: "02", title: "Preparo orientado", description: "Você recebe todas as instruções específicas para cada consulta ou exame, com clareza e antecedência." },
      { number: "03", title: "Atendimento no IMD", description: "Consultas com especialistas e exames realizados no mesmo instituto, sem deslocamento entre endereços." },
      { number: "04", title: "Laudo e integração", description: "Resultados disponíveis em até 24 horas, registrados no prontuário digital e acessíveis ao médico assistente." },
      { number: "05", title: "Continuidade do cuidado", description: "Diagnóstico conectado ao centro cirúrgico: do IMD direto para o planejamento cirúrgico, sem retrabalho." },
    ],
  },
  testimonials: {
    headline: "O que dizem nossos pacientes",
    items: [
      { id: "t1", quote: "Fiz todos os exames pré-operatórios em um só lugar e em um dia. Quando cheguei para a cirurgia, estava tudo pronto. Praticidade e tranquilidade do início ao fim.", author: "Fernanda L.", role: "Paciente, Avaliação Pré-operatória", image: "" },
      { id: "t2", quote: "Os laudos saíram rápido e meu médico já tinha tudo em mãos. Não precisei repetir nenhum exame nem correr atrás de papel.", author: "Júlio C.", role: "Paciente, Check-up", image: "" },
      { id: "t3", quote: "Como médica, ter o IMD integrado ao bloco cirúrgico faz toda a diferença: recebo os exames no prontuário e ganho agilidade para decidir.", author: "Dra. Helena M.", role: "Cirurgiã Parceira", image: "" },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Perguntas frequentes sobre o IMD",
    items: [
      { id: "imd-faq-1", question: "O atendimento do IMD é particular?", answer: "Sim. O Instituto Médico e Diagnóstico atende exclusivamente em regime particular. Nossa equipe de relacionamento orienta sobre valores, preparo e agendamento de cada consulta ou exame." },
      { id: "imd-faq-2", question: "Em quanto tempo recebo o resultado dos exames?", answer: "Os laudos ficam disponíveis em até 24 horas, conforme o tipo de exame. Os resultados são registrados no prontuário digital, o que dá agilidade para a próxima etapa do seu cuidado." },
      { id: "imd-faq-3", question: "Como agendar uma consulta ou exame?", answer: "O agendamento é feito pelo WhatsApp. Nossa equipe de relacionamento orienta sobre o preparo necessário, os documentos e o melhor horário para você." },
      { id: "imd-faq-4", question: "O IMD é integrado ao centro cirúrgico?", answer: "Sim. O IMD funciona dentro do mesmo complexo do centro cirúrgico. Consultas, exames e laudos alimentam o prontuário digital, sem repetição de exames e sem deslocamento entre endereços." },
      { id: "imd-faq-5", question: "Quais especialidades são atendidas?", answer: "São 14 especialidades: Cardiologia, Cabeça e Pescoço, Dermatologia, Urologia, Ginecologia, Mastologia, Cirurgia Geral, Neurocirurgia, Ortopedia, Cirurgia Plástica, Cirurgia Vascular, Otorrinolaringologia, Oftalmologia e Clínica da Dor." },
      { id: "imd-faq-6", question: "Quais exames o IMD realiza?", answer: "O IMD realiza tomografia computadorizada, ultrassonografia, raio-X digital, exames laboratoriais, ECG, ecocardiograma, teste ergométrico e outros exames conforme indicação médica. Todos os resultados são integrados ao prontuário digital." },
      { id: "imd-faq-7", question: "Posso fazer o pré-operatório no IMD?", answer: "Sim. O IMD é o local ideal para a avaliação pré-operatória: consultas com especialistas e todos os exames necessários são realizados no mesmo instituto, com os resultados integrados ao prontuário do centro cirúrgico. Nossa equipe coordena o agendamento de cada etapa." },
      { id: "imd-faq-8", question: "Meu médico pode receber o laudo direto?", answer: "Sim. Os laudos ficam disponíveis no prontuário digital compartilhado, acessíveis ao médico assistente em até 24 horas. O médico também pode solicitar que a equipe envie os resultados por canais diretos. A integração elimina a necessidade de o paciente transportar exames físicos." },
    ],
  },
  related: {
    kicker: "EXPLORE O COMPLEXO",
    headline: "Conheça as outras estruturas do Hospital São Rafael",
    items: [
      { slug: "centro-cirurgico", title: "Centro Cirúrgico", description: "22 salas para procedimentos eletivos multiespecialidades.", image: "/assets/images/servicos/centro-cirurgico-v2.jpg", icon: "building-2" },
      { slug: "internacao", title: "Internação", description: "56 leitos individuais para uma recuperação confortável e segura.", image: "/assets/images/servicos/internacao.jpg", icon: "bed" },
      { slug: "hiperbarica", title: "Terapia Hiperbárica", description: "Oxigenoterapia que apoia a sua recuperação.", image: "/assets/images/servicos/hiperbarica.jpeg", icon: "waves" },
    ],
  },
  schemaType: "MedicalClinic",
  lastReviewed: "2026-06-11",
}

// -----------------------------------------------------------------------------
// CONTEÚDO — Terapia Hiperbárica
// -----------------------------------------------------------------------------

const HIPERBARICA: ServiceDetailData = {
  slug: "hiperbarica",
  meta: {
    title: "Terapia Hiperbárica | Oxigenoterapia no Hospital São Rafael",
    description:
      "Oxigenoterapia hiperbárica em 5 câmaras individuais transparentes, com sessões de 90 minutos a até 2,4 atm. Tratamento reconhecido pelo CFM, integrado ao centro cirúrgico, à internação e ao IMD. Conheça em BH.",
  },
  navSections: [
    { id: "intro", label: "O que é" },
    { id: "indicacoes", label: "Benefícios" },
    { id: "equipamentos", label: "As câmaras" },
    { id: "infraestrutura", label: "Estrutura" },
    { id: "numeros", label: "Números" },
    { id: "jornada", label: "Como funciona" },
    { id: "para-o-medico", label: "Para o médico" },
    { id: "acompanhante", label: "Acompanhante" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Perguntas frequentes" },
  ],
  hero: {
    kicker: "TERAPIA HIPERBÁRICA",
    headline: "Mais oxigênio para a sua recuperação, em cada etapa do cuidado.",
    subheadline:
      "Oxigenoterapia hiperbárica em câmaras individuais transparentes, integrada ao centro cirúrgico, à internação e ao IMD, a partir da indicação do seu médico.",
    backgroundImage: "/assets/images/servicos/hiperbarica.jpeg",
    pills: [
      "5 Câmaras Transparentes",
      "Sessão de 90 min",
      "Até 2,4 atm",
      "14 Indicações (CFM)",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Oxigenoterapia hiperbárica, explicada de forma simples.",
    paragraphs: [
      "A oxigenoterapia hiperbárica consiste em respirar oxigênio em alta concentração dentro de uma câmara pressurizada. Esse aumento de oxigênio no sangue favorece a recuperação dos tecidos e potencializa os mecanismos naturais de cura do corpo.",
      "No Hospital São Rafael, a terapia não se limita ao pós-operatório: atende tanto pacientes do hospital quanto pacientes externos, sempre a partir da indicação médica, e se integra ao centro cirúrgico, à internação e ao IMD.",
      "Cada sessão dura cerca de 90 minutos, com pressão de até 2,4 atmosferas, conduzida por uma equipe de enfermagem e técnicos capacitados.",
    ],
  },
  indications: {
    kicker: "BENEFÍCIOS",
    headline: "Como a oxigenoterapia hiperbárica apoia a sua recuperação.",
    intro: "A partir da indicação do seu médico, a terapia pode contribuir de diferentes formas:",
    items: [
      { id: "cicatrizacao", icon: "sparkles", title: "Favorece a cicatrização", description: "O aumento de oxigênio nos tecidos estimula a recuperação de feridas e a cicatrização." },
      { id: "infeccoes", icon: "shield-check", title: "Auxilia no combate a infecções", description: "Ambientes ricos em oxigênio ajudam o organismo a controlar processos infecciosos." },
      { id: "edema", icon: "waves", title: "Reduz o edema e o inchaço", description: "Contribui para a diminuição do inchaço e do desconforto no pós-operatório." },
      { id: "regeneracao", icon: "heart-pulse", title: "Estimula a regeneração de tecidos", description: "Apoia a formação de novos vasos e a recuperação de tecidos lesionados." },
    ],
    note: "São 14 indicações reconhecidas pelo CFM. A indicação e o número de sessões são sempre definidos pelo seu médico, após avaliação.",
  },
  equipment: {
    kicker: "AS CÂMARAS",
    headline: "Cinco câmaras individuais e totalmente transparentes.",
    description:
      "Câmaras monoplace projetadas para o seu conforto, com visão ampla do ambiente durante toda a sessão.",
    items: [
      { icon: "eye", title: "5 câmaras transparentes", description: "Câmaras individuais inteiramente transparentes, para você acompanhar todo o ambiente ao redor." },
      { icon: "presentation", title: "Conforto durante a sessão", description: "TV e entretenimento durante a sessão, com canal de comunicação direto com a equipe e orientação de manobras para equalizar o ouvido." },
      { icon: "clock", title: "Sessão de 90 minutos", description: "Sessões de cerca de 90 minutos, com uma descompressão suave de 15 a 20 minutos ao final." },
      { icon: "user-check", title: "Equipe capacitada", description: "Enfermagem e técnicos treinados acompanham cada sessão, com plantonista disponível." },
    ],
  },
  galleryBlock: {
    kicker: "ESTRUTURA",
    headline: "Um ambiente pensado para a sua tranquilidade.",
    description:
      "Câmaras individuais transparentes, equipe capacitada e integração com os demais setores do hospital tornam a sua sessão segura e confortável.",
    images: [
      { src: "/assets/images/servicos/hiperbarica.jpeg", alt: "Câmara hiperbárica monoplace transparente" },
      { src: "/assets/images/servicos/hiperbarica.jpeg", alt: "Sala de terapia hiperbárica do Hospital São Rafael" },
      { src: "/assets/images/servicos/hiperbarica.jpeg", alt: "Equipe de enfermagem acompanhando a sessão" },
    ],
    features: [
      { icon: "check-circle", title: "5 câmaras monoplace transparentes", description: "Câmaras individuais com visão ampla do ambiente" },
      { icon: "check-circle", title: "Sessão de 90 minutos a até 2,4 atm", description: "Protocolo conduzido por equipe capacitada" },
      { icon: "check-circle", title: "Integrada ao complexo", description: "Conectada ao centro cirúrgico, à internação e ao IMD" },
      { icon: "check-circle", title: "Equipe de enfermagem e técnicos", description: "Acompanhamento próximo durante toda a sessão" },
      { icon: "check-circle", title: "Certificação SBMH e Anvisa", description: "Câmaras e protocolos em conformidade com a Sociedade Brasileira de Medicina Hiperbárica e normas da Anvisa" },
      { icon: "check-circle", title: "Leito de estabilização integrado", description: "Em caso de intercorrência, transferência ágil para a unidade de estabilização dentro do próprio complexo" },
    ],
    cta: { label: "Falar com Atendimento", href: "#contato" },
  },
  highlights: {
    kicker: "NÚMEROS QUE COMPROVAM",
    headline: "Uma estrutura completa de oxigenoterapia.",
    items: [
      { id: "camaras", metric: "5", icon: "eye", title: "Câmaras Transparentes", description: "Câmaras monoplace individuais e inteiramente transparentes, para o seu conforto." },
      { id: "sessao", metric: "90 min", icon: "clock", title: "Duração da Sessão", description: "Tempo de sessão pensado para conciliar a eficácia do tratamento e o seu bem-estar." },
      { id: "pressao", metric: "2,4 atm", icon: "activity", title: "Pressão Máxima", description: "Pressurização conduzida com segurança por equipe capacitada." },
      { id: "indicacoes", metric: "14", icon: "clipboard-check", title: "Indicações (CFM)", description: "Indicações reconhecidas pelo Conselho Federal de Medicina, sempre definidas pelo seu médico." },
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Cada sessão, passo a passo.",
    intro: "A partir da indicação do seu médico, a jornada é simples e organizada.",
    steps: [
      { number: "01", title: "Indicação médica", description: "Seu médico avalia o quadro clínico e indica a oxigenoterapia hiperbárica, definindo o número de sessões." },
      { number: "02", title: "Orientação pré-tratamento", description: "Nossa equipe orienta sobre o preparo, itens não permitidos na câmara e o que esperar durante a sessão." },
      { number: "03", title: "Recepção e apresentação", description: "Na chegada, você é recebido, troca a vestimenta adequada e conhece a câmara antes do início da sessão." },
      { number: "04", title: "Sessão de 90 minutos", description: "Você permanece na câmara por cerca de 90 minutos, com orientações de manobras para equalizar o ouvido e equipe acompanhando ao lado." },
      { number: "05", title: "Avaliação pós-sessão e retorno", description: "Ao final, a equipe avalia como você se sentiu e orienta sobre a próxima sessão e eventuais cuidados." },
    ],
  },
  medico: {
    kicker: "PARA O MÉDICO",
    headline: "Integração completa para o seu paciente cirúrgico.",
    description: "A Terapia Hiperbárica do Hospital São Rafael é integrada ao pós-operatório e à internação, com agendamento ágil e protocolos reconhecidos.",
    benefits: [
      { icon: "git-merge", title: "Integração com pós-operatório e internação", description: "Pacientes internados ou em recuperação têm acesso direto à terapia, sem necessidade de deslocamento externo." },
      { icon: "clipboard-check", title: "Protocolos SBMH e Anvisa", description: "14 indicações reconhecidas pelo CFM, com protocolos em conformidade com a Sociedade Brasileira de Medicina Hiperbárica e a Anvisa." },
      { icon: "clock", title: "Agendamento ágil", description: "Atendimento de segunda a segunda com agendamento coordenado pela equipe de relacionamento." },
      { icon: "users", title: "Público interno e externo", description: "Atende pacientes do próprio complexo e pacientes externos, sempre a partir da indicação médica." },
      { icon: "shield-check", title: "Leito de estabilização integrado", description: "Em caso de intercorrência, o paciente é transferido com agilidade para a unidade de estabilização dentro do mesmo complexo." },
    ],
    ctaLabel: "Falar com Relacionamento Médico",
  },
  acompanhante: {
    kicker: "PARA QUEM ESTÁ COM VOCÊ",
    headline: "Sessões previsíveis com tranquilidade para o acompanhante.",
    description: "Cada sessão dura cerca de 90 minutos. Enquanto isso, o acompanhante tem estrutura e conforto no complexo.",
    amenities: [
      { icon: "sofa", title: "Sala de espera dedicada", description: "Espaço confortável e reservado para o acompanhante durante a sessão." },
      { icon: "clock", title: "Sessões previsíveis", description: "90 minutos de duração permitem planejar a visita com clareza e sem imprevistos." },
      { icon: "utensils", title: "Refeições na praça de alimentação", description: "Acesso à praça de alimentação do complexo durante a espera." },
      { icon: "shield-check", title: "Segurança em caso de intercorrência", description: "Em situações que exijam suporte adicional, a unidade de estabilização está dentro do próprio hospital." },
    ],
    note: "A equipe orienta o acompanhante antes de cada sessão sobre o protocolo e o que esperar.",
  },
  testimonials: {
    headline: "O que dizem nossos pacientes",
    items: [
      { id: "t1", quote: "As sessões foram tranquilas e a câmara transparente me deixou muito mais à vontade. A equipe explicou cada passo e fiquei segura o tempo todo.", author: "Cláudia R.", role: "Paciente, Recuperação Pós-cirúrgica", image: "" },
      { id: "t2", quote: "Senti diferença na cicatrização e no inchaço. Poder ver tudo ao redor e conversar com a equipe fez a sessão passar rápido.", author: "Anderson P.", role: "Paciente, Terapia Hiperbárica", image: "" },
      { id: "t3", quote: "Indico a hiperbárica para alguns dos meus pacientes, e a integração com a internação e o centro cirúrgico facilita muito o acompanhamento.", author: "Dr. Vinícius A.", role: "Cirurgião Parceiro", image: "" },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Perguntas frequentes sobre a Terapia Hiperbárica",
    items: [
      { id: "hb-faq-1", question: "A terapia é só para quem fez cirurgia?", answer: "Não. Além de apoiar a recuperação pós-cirúrgica, a oxigenoterapia hiperbárica atende pacientes externos, sempre a partir da indicação de um médico. Ela se integra ao centro cirúrgico, à internação e ao IMD." },
      { id: "hb-faq-2", question: "Vou me sentir preso ou desconfortável na câmara?", answer: "As câmaras são individuais e totalmente transparentes, o que dá uma ampla visão do ambiente e ajuda a manter a sensação de tranquilidade. Você fica em contato direto com a equipe durante toda a sessão e, se houver ansiedade, o plantonista pode avaliar a melhor conduta." },
      { id: "hb-faq-3", question: "Quanto tempo dura cada sessão?", answer: "Cada sessão dura cerca de 90 minutos, com pressão de até 2,4 atmosferas e uma descompressão suave de 15 a 20 minutos ao final. O número de sessões é definido pelo seu médico, conforme a sua condição." },
      { id: "hb-faq-4", question: "O que devo evitar antes da sessão?", answer: "Por segurança, alguns itens não são permitidos dentro da câmara, como adornos metálicos, cílios postiços, mega hair e unhas de gel. A equipe orienta com antecedência tudo o que você precisa saber para a sua sessão." },
      { id: "hb-faq-5", question: "E se faltar energia durante a sessão?", answer: "A unidade conta com gerador próprio, garantindo a continuidade e a segurança da sessão mesmo em caso de queda de energia. Toda a sessão é acompanhada por equipe de enfermagem e técnicos capacitados." },
      { id: "hb-faq-6", question: "Quantas sessões são necessárias?", answer: "O número de sessões é definido pelo médico solicitante conforme a condição clínica. Para casos agudos, o protocolo costuma ser mais curto. Para condições crônicas, ciclos de 20 a 40 sessões são comuns, com acompanhamento e reavaliação periódica. Nossa equipe coordena o agendamento de todo o ciclo." },
    ],
  },
  related: {
    kicker: "EXPLORE O COMPLEXO",
    headline: "Conheça as outras estruturas do Hospital São Rafael",
    items: [
      { slug: "centro-cirurgico", title: "Centro Cirúrgico", description: "22 salas para procedimentos eletivos multiespecialidades.", image: "/assets/images/servicos/centro-cirurgico-v2.jpg", icon: "building-2" },
      { slug: "internacao", title: "Internação", description: "56 leitos individuais para uma recuperação confortável e segura.", image: "/assets/images/servicos/internacao.jpg", icon: "bed" },
      { slug: "imd", title: "IMD", description: "Consultas, exames e check-up integrados ao centro cirúrgico.", image: "/assets/images/servicos/imd.jpg", icon: "stethoscope" },
    ],
  },
  schemaType: "MedicalProcedure",
  lastReviewed: "2026-06-11",
}

// -----------------------------------------------------------------------------
// MAPA DE SERVIÇOS — indexado por slug
// -----------------------------------------------------------------------------

export const SERVICES_CONTENT: Record<string, ServiceDetailData> = {
  "centro-cirurgico": CENTRO_CIRURGICO,
  "internacao": INTERNACAO,
  "imd": IMD,
  "hiperbarica": HIPERBARICA,
}
