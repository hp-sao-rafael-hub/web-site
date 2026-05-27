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
    title: "Centro Cirúrgico Particular em Belo Horizonte | Cirurgias Eletivas",
    description:
      "22 salas para cirurgias eletivas particulares no Hospital São Rafael, BH. Tecnologia robótica, laparoscopia avançada, taxa de infecção 0,33% e atendimento exclusivamente particular.",
  },
  navSections: [
    { id: "intro", label: "O Centro Cirúrgico" },
    { id: "indicacoes", label: "Especialidades" },
    { id: "para-o-medico", label: "Para o médico" },
    { id: "infraestrutura", label: "Infraestrutura" },
    { id: "equipamentos", label: "Tecnologia" },
    { id: "numeros", label: "Números" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Como funciona" },
    { id: "acompanhante", label: "Acompanhante" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Dúvidas" },
  ],
  hero: {
    kicker: "CENTRO CIRÚRGICO",
    headline: "Cirurgia eletiva particular onde cada detalhe é planejado para o seu sucesso.",
    subheadline:
      "22 salas integradas, tecnologia robótica e laparoscopia avançada, equipe multidisciplinar e taxa de infecção entre as mais baixas do país. Atendimento exclusivamente particular.",
    backgroundImage: "/assets/images/servicos/centro-cirurgico-v2.jpg",
    pills: [
      "22 salas integradas",
      "Robótica e laparoscopia",
      "Taxa de infecção 0,33%",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Um centro cirúrgico planejado para procedimentos eletivos de alta complexidade",
    paragraphs: [
      "O Centro Cirúrgico do Hospital São Rafael foi projetado para oferecer aos pacientes e médicos parceiros um ambiente de altíssima qualidade técnica, com 22 salas equipadas para cirurgias de baixa, média e alta complexidade. Cada detalhe — do fluxo de admissão à recuperação pós-anestésica — segue protocolos rigorosos validados internacionalmente, com foco em previsibilidade, segurança e experiência diferenciada.",
      "Como hospital exclusivamente particular dedicado a cirurgias eletivas, organizamos o complexo para reduzir desperdício de tempo do cirurgião e ansiedade do paciente. Salas integradas a sistemas de imagem, monitorização anestésica avançada, instrumentadores especializados e giro de sala otimizado em 40 minutos são alguns dos elementos que sustentam essa promessa.",
      "Nossa taxa de infecção de 0,33% — muito abaixo da média nacional de hospitais de grande porte — reflete uma cultura de segurança implementada em cada protocolo: antissepsia, esterilização, controle de fluxo de pessoas, manutenção da temperatura e umidade das salas, e checklists obrigatórios pré-incisão validados pela equipe.",
    ],
    subsections: [
      {
        id: "complexo-integrado",
        title: "Um complexo integrado, sem fragmentação do cuidado",
        paragraphs: [
          "Centro cirúrgico, IMD (consultas e exames), unidade de internação, UTI, terapia hiperbárica e estrutura para acompanhante operam como um único organismo. O paciente faz exames pré-operatórios, é admitido, operado, internado e recebe alta dentro do mesmo complexo — sem deslocamentos, sem perda de informação clínica, sem retrabalho de prontuário.",
          "Para o cirurgião, isso significa previsibilidade total: a sala marcada estará pronta, o instrumentador chegará treinado no procedimento, os exames pré-op estarão integrados ao prontuário e a equipe de internação receberá o paciente já com plano cirúrgico em mãos.",
        ],
      },
    ],
  },
  indications: {
    kicker: "ESPECIALIDADES",
    headline: "Cirurgias eletivas multiespecialidades em alta complexidade",
    intro:
      "Atendemos cirurgias eletivas particulares de baixa, média e alta complexidade em diversas especialidades. As mais comuns no nosso centro:",
    items: [
      {
        id: "ortopedia",
        icon: "bone",
        title: "Ortopedia",
        description:
          "Artroplastia de joelho e quadril, artroscopia, reconstrução ligamentar, cirurgia de coluna minimamente invasiva.",
        highlighted: true,
      },
      {
        id: "cardio",
        icon: "activity",
        title: "Cardiovascular",
        description:
          "Procedimentos eletivos cardíacos com equipe multidisciplinar e suporte de UTI no mesmo complexo.",
      },
      {
        id: "bariatrica",
        icon: "scalpel",
        title: "Bariátrica e metabólica",
        description:
          "Bypass gástrico, sleeve e cirurgias metabólicas conduzidas por equipe especializada e protocolo ERAS.",
      },
      {
        id: "urologia",
        icon: "shield-check",
        title: "Urologia",
        description:
          "Cirurgias urológicas robóticas e laparoscópicas, incluindo prostatectomia radical e nefrectomia parcial.",
      },
      {
        id: "ginecologia",
        icon: "heart-handshake",
        title: "Ginecologia",
        description:
          "Histerectomias, laparoscopia ginecológica e cirurgias de assoalho pélvico com técnicas minimamente invasivas.",
      },
      {
        id: "oncologica",
        icon: "shield-check",
        title: "Oncológica",
        description:
          "Procedimentos oncológicos eletivos integrados a serviços de patologia e diagnóstico do IMD.",
      },
      {
        id: "coluna",
        icon: "bone",
        title: "Coluna",
        description:
          "Cirurgias de coluna com técnicas percutâneas, neuromonitorização intraoperatória e equipe dedicada.",
      },
      {
        id: "oftalmo",
        icon: "sparkles",
        title: "Oftalmológica",
        description:
          "Catarata, refrativa e procedimentos oculares de alta precisão com equipamentos modernos.",
      },
      {
        id: "otorrino",
        icon: "headset",
        title: "Otorrinolaringologia",
        description:
          "Cirurgias endoscópicas nasais, septoplastias e procedimentos otológicos eletivos.",
      },
    ],
    note: "[REVISAR DIRETORIA] lista de especialidades para alinhamento com a oferta atual da casa.",
  },
  medico: {
    kicker: "PARA O MÉDICO ASSISTENTE",
    headline: "A estrutura que o cirurgião precisa para operar no seu melhor.",
    description:
      "Médicos credenciados e não credenciados podem operar no Hospital São Rafael. Nossa Consultoria Médica Institucional acompanha cada cirurgião em todas as etapas — do credenciamento à execução — com canais diretos, instrumentadores treinados, salas robóticas e suporte de engenharia clínica 24/7.",
    benefits: [
      {
        icon: "clipboard-check",
        title: "Credenciamento ágil",
        description:
          "Processo de habilitação simplificado, com acompanhamento da Consultoria Médica do início ao fim.",
      },
      {
        icon: "scalpel",
        title: "Sala robótica e laparoscopia",
        description:
          "Tecnologia disponível e instrumentadores especializados em cada procedimento minimamente invasivo.",
      },
      {
        icon: "timer",
        title: "Giro de sala em 40 minutos",
        description:
          "Processos otimizados que aumentam previsibilidade da sua agenda e reduzem ociosidade.",
      },
      {
        icon: "wrench",
        title: "Instrumentador exclusivo",
        description:
          "Profissionais treinados nos seus protocolos, prontos para antecipar cada movimento da cirurgia.",
      },
      {
        icon: "settings-2",
        title: "Engenharia clínica 24/7",
        description:
          "Equipamentos sempre disponíveis e calibrados, com suporte técnico imediato em qualquer turno.",
      },
      {
        icon: "sofa",
        title: "Conforto Médico",
        description:
          "Área exclusiva de descanso, preparação e conveniência entre procedimentos, com privacidade.",
      },
    ],
    documentation: {
      title: "Documentação para credenciamento médico",
      items: [
        "Ficha de cadastro preenchida e assinada",
        "Contrato HSR",
        "Foto de rosto atual (digital)",
        "Carteira do CRM digitalizada (frente e verso)",
        "Certidão de quitação da anuidade do conselho",
        "Título de especialista (RQE)",
        "Comprovante de endereço residencial",
        "Cartão de vacina atualizado",
      ],
    },
    ctaLabel: "Falar com a Consultoria Médica",
    note: "Para informações sobre credenciamento, agenda cirúrgica e parceria, fale com a Consultoria Médica Institucional.",
  },
  galleryBlock: {
    kicker: "INFRAESTRUTURA",
    headline: "Cada sala projetada para zero imprevistos.",
    description:
      "22 salas distribuídas em fluxos otimizados — entrada de paciente, área limpa, área contaminada, recuperação pós-anestésica — com controle ambiental rigoroso, sistemas de imagem integrados e tecnologia para procedimentos de baixa a altíssima complexidade.",
    images: [
      {
        // [PENDENTE CLIENTE] foto real da sala equipada
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Sala cirúrgica equipada com tecnologia de última geração no Hospital São Rafael",
      },
      {
        // [PENDENTE CLIENTE] foto da equipe em procedimento
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Equipe multidisciplinar em procedimento eletivo no Centro Cirúrgico HSR",
      },
      {
        // [PENDENTE CLIENTE] foto da recuperação pós-anestésica
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Sala de recuperação pós-anestésica do Hospital São Rafael",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Salas para laparoscopia e cirurgia robótica",
        description: "Equipamentos de última geração integrados ao fluxo cirúrgico.",
      },
      {
        icon: "check-circle",
        title: "Monitorização intraoperatória contínua",
        description: "Sinais vitais e parâmetros anestésicos em tempo real durante todo o procedimento.",
      },
      {
        icon: "check-circle",
        title: "Controle ambiental rigoroso",
        description: "Pressão, temperatura e umidade controladas conforme normas internacionais.",
      },
      {
        icon: "check-circle",
        title: "Recuperação pós-anestésica integrada",
        description: "Saída da sala direto para área de monitorização especializada antes da internação.",
      },
    ],
    cta: { label: "Falar no WhatsApp", href: "https://wa.me/message/NZIPXRZ4SKUHM1" },
  },
  equipment: {
    kicker: "TECNOLOGIA",
    headline: "Equipamentos e recursos cirúrgicos de referência",
    description:
      "Tecnologia escolhida para dar ao cirurgião precisão e ao paciente segurança. Cada equipamento é mantido pela engenharia clínica do HSR e revisado em ciclos rígidos de calibração.",
    items: [
      {
        icon: "scalpel",
        title: "Plataforma robótica [modelo a confirmar]",
        description:
          "[REVISAR DIRETORIA] confirmar modelo. Cirurgias robóticas em urologia, ginecologia e cirurgia geral com precisão sub-milimétrica.",
      },
      {
        icon: "activity",
        title: "Torres de laparoscopia em alta definição",
        description:
          "Imagem 4K, fontes de luz LED e equipamentos de coagulação avançada para cirurgias minimamente invasivas.",
      },
      {
        icon: "shield-check",
        title: "Monitorização anestésica completa",
        description:
          "Capnografia, BIS, monitorização hemodinâmica e neuromuscular em todas as salas.",
      },
      {
        icon: "clipboard-check",
        title: "Imagem intraoperatória",
        description:
          "Arco em C, fluoroscopia digital e neuromonitorização disponíveis conforme procedimento.",
      },
      {
        icon: "settings-2",
        title: "Esterilização CME própria",
        description:
          "Central de Material e Esterilização integrada ao bloco, com rastreabilidade ponta a ponta.",
      },
    ],
  },
  highlights: {
    kicker: "NÚMEROS QUE COMPROVAM",
    headline: "Excelência cirúrgica medida em dados.",
    items: [
      {
        id: "salas",
        metric: "22",
        icon: "building-2",
        title: "Salas cirúrgicas",
        description:
          "Estrutura para procedimentos de baixa, média e alta complexidade em diversas especialidades.",
      },
      {
        id: "giro",
        metric: "40min",
        icon: "timer",
        title: "Giro de sala",
        description:
          "Processos ágeis que aumentam previsibilidade da agenda e reduzem ociosidade do cirurgião.",
      },
      {
        id: "infeccao",
        metric: "0,33%",
        icon: "shield-check",
        title: "Taxa de infecção",
        description:
          "Indicador entre os mais rigorosos do setor, muito abaixo da média nacional de hospitais de grande porte.",
      },
      {
        id: "experiencia",
        metric: "+12.000",
        icon: "activity",
        title: "Procedimentos realizados",
        description:
          "Base de experiência clínica que sustenta cada decisão da nossa equipe.",
      },
    ],
  },
  protocols: {
    kicker: "SEGURANÇA",
    headline: "Protocolos validados, segurança em cada etapa",
    intro:
      "Da admissão à alta, cada etapa segue protocolos institucionais alinhados a referências internacionais de segurança cirúrgica.",
    items: [
      {
        id: "checklist",
        icon: "clipboard-check",
        title: "Checklist de cirurgia segura",
        description:
          "Protocolo OMS de cirurgia segura aplicado em 100% dos procedimentos, com confirmação ativa da equipe.",
      },
      {
        id: "antibiotico",
        icon: "shield-check",
        title: "Antibioticoprofilaxia padronizada",
        description:
          "Administração rigorosa do antibiótico no tempo correto, reduzindo risco de infecção do sítio cirúrgico.",
      },
      {
        id: "rastreabilidade",
        icon: "git-merge",
        title: "Rastreabilidade total",
        description:
          "Cada material, instrumento e profissional registrado no prontuário digital — auditoria completa por procedimento.",
      },
      {
        id: "emergencia",
        icon: "activity",
        title: "Resposta rápida integrada",
        description:
          "UTI, banco de sangue e equipe de hemodinâmica disponíveis no mesmo complexo para qualquer intercorrência.",
      },
      {
        id: "pos-anestesica",
        icon: "heart-handshake",
        title: "Recuperação pós-anestésica especializada",
        description:
          "Equipe dedicada e monitorização contínua até alta para o quarto de internação ou domiciliar.",
      },
      {
        id: "controle-ambiental",
        icon: "sparkles",
        title: "Controle ambiental das salas",
        description:
          "Pressão positiva, filtragem HEPA, temperatura e umidade monitoradas continuamente.",
      },
    ],
    certifications: [
      "ANVISA",
      "CFM — Conselho Federal de Medicina",
      "OMS — Cirurgia Segura Salva Vidas",
      "[PENDENTE CLIENTE] Acreditação ONA / outros selos",
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Sua jornada cirúrgica, passo a passo",
    intro:
      "Da indicação do seu médico ao retorno para casa, cada etapa é coordenada por uma equipe dedicada para que você se concentre apenas em se recuperar.",
    steps: [
      {
        number: "1",
        title: "Indicação e exames pré-operatórios",
        description:
          "Após a indicação do seu médico, agendamos consultas e exames pré-op no IMD, integrados ao centro cirúrgico, sem deslocamento externo.",
      },
      {
        number: "2",
        title: "Avaliação pré-anestésica",
        description:
          "Consulta com anestesiologista para revisão do histórico, otimização clínica e definição do protocolo anestésico personalizado.",
      },
      {
        number: "3",
        title: "Admissão hospitalar",
        description:
          "Recebimento na unidade de internação, conferência de documentos e exames, orientações finais ao paciente e ao acompanhante.",
      },
      {
        number: "4",
        title: "Procedimento cirúrgico",
        description:
          "Cirurgia conduzida pelo seu cirurgião com nossa equipe multidisciplinar de apoio. Comunicação contínua com o acompanhante na sala de espera.",
      },
      {
        number: "5",
        title: "Recuperação e alta",
        description:
          "Sala de recuperação pós-anestésica, internação no quarto, acompanhamento médico e alta com plano de cuidado domiciliar e retorno agendado.",
      },
    ],
  },
  acompanhante: {
    kicker: "PARA QUEM ESTÁ COM VOCÊ",
    headline: "Acompanhante informado, paciente mais tranquilo.",
    description:
      "Sabemos que quem está com você vive a cirurgia ao seu lado. Por isso, organizamos a estrutura para que o acompanhante tenha conforto durante a espera, comunicação ativa com a equipe e suporte em cada etapa.",
    amenities: [
      {
        icon: "sofa",
        title: "Sala de espera dedicada",
        description:
          "Ambiente climatizado, com Wi-Fi e estação de café, próximo ao bloco cirúrgico.",
      },
      {
        icon: "headset",
        title: "Comunicação ativa durante a cirurgia",
        description:
          "Equipe dá retornos periódicos e contato direto em qualquer mudança de cronograma.",
      },
      {
        icon: "heart-handshake",
        title: "Aviso assim que sair da sala",
        description:
          "Notificação imediata na recuperação pós-anestésica e orientação sobre quando ir ao quarto.",
      },
      {
        icon: "utensils",
        title: "Voucher de alimentação para o acompanhante",
        description:
          "Cada paciente internado recebe automaticamente 1 voucher por internação, válido por todo o período. O voucher dá direito a 1 refeição completa, 1 sobremesa (bombom ou brigadeiro) e 1 açaí na Praça de Alimentação do complexo.",
      },
      {
        icon: "bed",
        title: "Pernoite no quarto",
        description:
          "Quartos individuais com poltrona reclinável, banheiro privativo e Wi-Fi para o acompanhante.",
      },
      {
        icon: "shield-check",
        title: "Suporte se algo mudar",
        description:
          "Acesso direto à equipe médica e à UTI no mesmo complexo, em qualquer intercorrência.",
      },
    ],
    note: "As refeições do paciente já estão incluídas. O voucher é um benefício adicional para o acompanhante e é entregue na admissão.",
  },
  testimonials: {
    headline: "O que dizem nossos pacientes e médicos",
    items: [
      {
        id: "t1",
        // [PENDENTE CLIENTE] testimonials reais autorizados
        quote:
          "A estrutura do Hospital São Rafael é impressionante. Me senti seguro e bem cuidado em todas as etapas, do pré-operatório à alta.",
        author: "Paciente HSR",
        role: "Cirurgia ortopédica",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Como cirurgião, encontro aqui a infraestrutura que preciso para operar com confiança: tecnologia, equipe treinada e processos previsíveis.",
        author: "Cirurgião parceiro HSR",
        role: "Especialista urológico",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Minha cirurgia foi conduzida com total tranquilidade. O acolhimento da equipe e o conforto do quarto fizeram toda a diferença.",
        author: "Paciente HSR",
        role: "Cirurgia ginecológica",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Dúvidas frequentes sobre cirurgias eletivas particulares no HSR",
    items: [
      {
        id: "cc-faq-1",
        question: "O que são cirurgias eletivas particulares?",
        answer:
          "São procedimentos cirúrgicos planejados com antecedência, sem caráter de urgência, realizados em regime exclusivamente particular. No Hospital São Rafael, o agendamento é ágil e a internação ocorre em ambiente confortável, sem filas ou intermediários.",
      },
      {
        id: "cc-faq-2",
        question: "Como funciona o atendimento e o pagamento das cirurgias no HSR?",
        answer:
          "O Hospital São Rafael é uma instituição exclusivamente particular. Não trabalhamos com convênios, planos de saúde ou SUS. Os valores e formas de pagamento são apresentados de forma clara durante a avaliação, junto ao plano cirúrgico e à estimativa de internação.",
      },
      {
        id: "cc-faq-3",
        question: "Meu cirurgião pode operar no Hospital São Rafael?",
        answer:
          "Sim. Médicos credenciados e não credenciados podem operar no nosso centro cirúrgico. Nossa Consultoria Médica Institucional conduz o processo de credenciamento e orienta sobre os recursos disponíveis para cada especialidade.",
      },
      {
        id: "cc-faq-4",
        question: "Quais especialidades são atendidas no Centro Cirúrgico?",
        answer:
          "Atendemos cirurgias eletivas de Ortopedia, Cardiologia, Neurocirurgia, Urologia, Ginecologia, Bariátrica, Oncológica, Coluna, Oftalmologia, Otorrinolaringologia e outras. As 22 salas suportam procedimentos de baixa a altíssima complexidade, incluindo robótica e laparoscópica.",
      },
      {
        id: "cc-faq-5",
        question: "Como é feita a avaliação pré-operatória?",
        answer:
          "Os exames pré-op podem ser feitos no IMD, integrado ao Centro Cirúrgico. A consulta pré-anestésica avalia o histórico, otimiza condições clínicas e define o protocolo anestésico personalizado.",
      },
      {
        id: "cc-faq-6",
        question: "Quanto tempo dura a internação após a cirurgia?",
        answer:
          "Depende do tipo de procedimento e da evolução clínica. Cirurgias minimamente invasivas costumam ter alta em 24 a 48 horas; procedimentos de maior complexidade podem exigir 3 a 7 dias. Seu cirurgião informará a estimativa no pré-operatório.",
      },
      {
        id: "cc-faq-7",
        question: "Existe estrutura para o meu acompanhante?",
        answer:
          "Sim. Quartos individuais com poltrona reclinável e banheiro privativo, sala de espera durante a cirurgia, Wi-Fi e Praça de Alimentação no complexo. Cada paciente internado recebe automaticamente 1 voucher por internação para o acompanhante, com direito a 1 refeição, 1 sobremesa (bombom ou brigadeiro) e 1 açaí.",
      },
      {
        id: "cc-faq-8",
        question: "Como funciona o suporte se houver intercorrência?",
        answer:
          "UTI, banco de sangue, hemodinâmica e equipe de resposta rápida estão disponíveis no mesmo complexo, com transferência ágil e equipe já familiarizada com o caso pelo prontuário único.",
      },
      {
        id: "cc-faq-9",
        question: "Quais protocolos de segurança são aplicados?",
        answer:
          "Aplicamos checklist de cirurgia segura da OMS, antibioticoprofilaxia padronizada, rastreabilidade total de materiais, controle ambiental rigoroso das salas e protocolos institucionais alinhados a referências internacionais.",
      },
      {
        id: "cc-faq-10",
        question: "Como agendo uma cirurgia no Hospital São Rafael?",
        answer:
          "Entre em contato com nossa equipe pelo WhatsApp. Após a indicação do seu médico, agendamos exames pré-op no IMD, consulta pré-anestésica e a data da cirurgia, coordenando todas as etapas em um único ponto de contato.",
      },
    ],
  },
  schemaType: "MedicalProcedure",
  lastReviewed: "2026-04-28",
  references: [
    {
      label: "OMS — Cirurgia Segura Salva Vidas (Checklist)",
      href: "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
    },
    {
      label: "ANVISA — Boas práticas em centro cirúrgico",
      href: "https://www.gov.br/anvisa/pt-br",
    },
    {
      label: "CFM — Conselho Federal de Medicina",
      href: "https://portal.cfm.org.br/",
    },
  ],
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

export const SERVICES_CONTENT: Record<string, ServiceDetailData> = {
  "centro-cirurgico": CENTRO_CIRURGICO,
  "internacao": INTERNACAO,
}
