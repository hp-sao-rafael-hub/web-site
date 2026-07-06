// =============================================================================
// ESPECIALIDADES-LP.TS — Dados das Landing Pages de Especialidade | HSR
// =============================================================================
// LPs de conversão para tráfego pago (Meta/Google Ads) → WhatsApp único.
// Rota: /especialidades/[slug]. Estrutura baseada em pesquisa de LPs de saúde
// que convertem + conformidade CFM 2.336/2023.
//
// Estrutura (ordem, validada por dados de conversão):
//   1. Hero      — message match c/ anúncio, H1 desfecho, CTA WhatsApp
//   2. Intro     — "o que é / pra quem", linguagem simples (sem jargão)
//   3. Exames    — procedimentos agendáveis (a oferta)
//   4. Indicações— "quando procurar" (isso é pra você?)
//   5. whyHsr    — prova INSTITUCIONAL (números/estrutura, não depoimento)
//   6. FAQ       — objeções (preparo, particular, encaminhamento, prazo)
//
// CFM 2.336/2023: sem promessa de resultado, sem superlativo, sem "melhor".
// Depoimento de paciente só se REAL, consentido e sóbrio → campo opcional,
// omitido por padrão. Prova social default = institucional.
//
// WhatsApp único: https://wa.me/5531971511855 (hardcoded nos organisms
// reutilizados — ServicePageHero / ServiceInlineCta / ServiceStickyCta).
// =============================================================================

import type { FAQData } from "@/types"
import type {
  ServiceHeroData,
  ServiceIntroBlockData,
  ServiceIndicationsData,
  ServiceHighlightsData,
  ServiceTestimonialsData,
} from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

/** Item da lista de exames/procedimentos que o paciente pode agendar. */
export interface EspecialidadeExamItem {
  title: string
  description?: string
}

/** Bloco "exames que você agenda aqui" — coração da conversão da LP. */
export interface EspecialidadeExamsData {
  kicker: string
  headline: string
  description?: string
  items: EspecialidadeExamItem[]
}

/** Estrutura completa de uma LP de especialidade. */
export interface EspecialidadeLPData {
  /** Slug da rota: /especialidades/[slug] */
  slug: string
  /** Termo curto da especialidade (breadcrumb/schema). Ideal = keyword do anúncio. */
  termo: string
  /** SEO */
  meta: { title: string; description: string }
  /** Hero fullscreen (reusa ServicePageHero — CTA WhatsApp já embutido) */
  hero: ServiceHeroData
  /** "O que é / pra quem" (reusa ServiceIntroBlock) */
  intro: ServiceIntroBlockData
  /** Exames/procedimentos agendáveis (a oferta) */
  exams: EspecialidadeExamsData
  /** "Quando procurar" (reusa ServiceIndicationsBlock) */
  indications: ServiceIndicationsData
  /** "Por que HSR" — prova INSTITUCIONAL (reusa ServiceHighlights) */
  whyHsr: ServiceHighlightsData
  /** FAQ curto (reusa FAQSection) */
  faq: FAQData
  /**
   * Depoimentos — OPCIONAL. Só com depoimento REAL, consentido e sóbrio
   * (CFM 2.336/2023). Omitido → bloco não renderiza.
   */
  testimonials?: ServiceTestimonialsData
}

// -----------------------------------------------------------------------------
// COMPARTILHADO
// -----------------------------------------------------------------------------

// [PLACEHOLDER IMAGEM] usado só nas especialidades SEM foto de médico
// (ortopedia, cardiologia, ginecologia). Trocar por foto real quando houver.
const PLACEHOLDER_HERO = "/assets/images/servicos/centro-cirurgico-v2.jpg"

// Foto real do médico da especialidade (parede IMD). Ver public/assets/images/especialidades/.
const docHero = (slug: string) => `/assets/images/especialidades/${slug}.jpg`

// Overlay direcional p/ heros com médico: escurece à esquerda (texto) e
// clareia à direita (médico), mantendo legibilidade + rosto visível.
const OVERLAY_DOC =
  "bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20"

/** Prova institucional do HSR — igual para todas as especialidades. */
const WHY_HSR: ServiceHighlightsData = {
  kicker: "POR QUE O HOSPITAL SÃO RAFAEL",
  headline: "Estrutura de referência a favor do seu cuidado.",
  items: [
    {
      id: "salas",
      metric: "22",
      icon: "building-2",
      title: "Salas cirúrgicas",
      description: "Centro cirúrgico multiespecialidades para procedimentos eletivos.",
    },
    {
      id: "leitos",
      metric: "56",
      icon: "bed",
      title: "Leitos individuais",
      description: "Recuperação com conforto, segurança e privacidade.",
    },
    {
      id: "integrado",
      metric: "1",
      icon: "stethoscope",
      title: "Jornada integrada",
      description: "Consulta, exame e procedimento no mesmo prontuário digital.",
    },
    {
      id: "particular",
      metric: "100%",
      icon: "shield-check",
      title: "Atendimento particular",
      description: "Agilidade no agendamento e acolhimento em cada etapa.",
    },
  ],
}

/** FAQ padrão parametrizado pela especialidade. */
function buildFaq(termo: string): FAQData {
  const t = termo.toLowerCase()
  return {
    kicker: "PERGUNTAS FREQUENTES",
    headline: `Tire suas dúvidas sobre ${t} no HSR.`,
    items: [
      {
        id: "faq-agendar",
        question: `Como agendo minha consulta ou exame de ${t}?`,
        answer:
          "O agendamento é feito pelo WhatsApp. Nossa equipe de relacionamento orienta sobre preparo, documentos e o melhor horário para você.",
      },
      {
        id: "faq-particular",
        question: "O atendimento é particular ou por convênio?",
        answer:
          "O atendimento é exclusivamente particular, com agilidade no agendamento e acolhimento em todas as etapas.",
      },
      {
        id: "faq-pedido",
        question: "Preciso de encaminhamento ou pedido médico?",
        answer:
          "Para a consulta, não. Para alguns exames pode ser necessário pedido médico — fale com nossa equipe pelo WhatsApp que orientamos conforme o seu caso.",
      },
      {
        id: "faq-prazo",
        question: "Em quanto tempo recebo retorno?",
        answer: "Nosso time responde em até 1 hora útil após o contato pelo WhatsApp.",
      },
    ],
  }
}

/** Nota padrão de rodapé das indicações (conteúdo informativo). */
const INDIC_NOTE =
  "Este conteúdo é informativo e não substitui a avaliação médica presencial."

// -----------------------------------------------------------------------------
// CONTEÚDO — 13 especialidades
// -----------------------------------------------------------------------------

const ORTOPEDIA: EspecialidadeLPData = {
  slug: "ortopedia",
  termo: "Ortopedia",
  meta: {
    title: "Ortopedia | Agende sua consulta e exames no Hospital São Rafael",
    description:
      "Consulta e exames de ortopedia no Hospital São Rafael: avaliação, diagnóstico e cirurgia integrados. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "ORTOPEDIA",
    headline: "Dor no joelho, quadril ou coluna? Agende sua avaliação com ortopedista.",
    subheadline:
      "Consulta, exames de imagem e cirurgia de ortopedia num só lugar. Atendimento particular, ágil e humano — do diagnóstico à recuperação.",
    backgroundImage: PLACEHOLDER_HERO,
    pills: [
      "Consulta com ortopedista",
      "Exames de imagem no local",
      "Cirurgia quando indicada",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Ortopedia: cuidado completo para ossos, articulações e coluna.",
    paragraphs: [
      "A ortopedia trata dores e lesões de ossos, músculos, articulações e coluna — de um desconforto que não passa a uma fratura ou desgaste que limita o dia a dia. No Hospital São Rafael, você encontra consulta, exames e cirurgia no mesmo complexo.",
      "Ao concentrar avaliação, diagnóstico e procedimento num só endereço, o resultado do exame já alimenta o seu prontuário — sem repetir exame e sem correr de uma clínica para outra.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta, exames e procedimentos de ortopedia num só endereço.",
    description:
      "Estrutura completa para avaliar, diagnosticar e tratar — sem deslocamento entre clínicas.",
    items: [
      { title: "Consulta com ortopedista", description: "Avaliação do seu caso e orientação do próximo passo." },
      { title: "Exames de imagem", description: "Raio-X, ultrassom e ressonância para diagnóstico preciso." },
      { title: "Artroscopia de joelho e ombro", description: "Cirurgia minimamente invasiva, recuperação mais rápida." },
      { title: "Artroplastia de joelho e quadril", description: "Substituição da articulação em artrose avançada." },
      { title: "Cirurgia da coluna vertebral", description: "Procedimentos eletivos com técnicas modernas." },
      { title: "Tratamento de fraturas", description: "Equipe e centro cirúrgico preparados para casos complexos." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você sente:",
    intro: "Sinais que merecem avaliação de um ortopedista. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "dor", icon: "activity", title: "Dor que não passa", description: "Dor em joelho, quadril, ombro ou coluna há semanas." },
      { id: "mobilidade", icon: "bone", title: "Dificuldade de movimento", description: "Rigidez, travamento ou perda de força ao caminhar." },
      { id: "lesao", icon: "shield-check", title: "Lesão ou trauma", description: "Torção, queda ou impacto com inchaço e limitação." },
      { id: "exame", icon: "clipboard-check", title: "Exame alterado", description: "Achado ortopédico que precisa de avaliação." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Ortopedia"),
}

const CARDIOLOGIA: EspecialidadeLPData = {
  slug: "cardiologia",
  termo: "Cardiologia",
  meta: {
    title: "Cardiologia | Consulta e exames do coração no Hospital São Rafael",
    description:
      "Consulta cardiológica e exames do coração no Hospital São Rafael: eletrocardiograma, ecocardiograma e mais. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "CARDIOLOGIA",
    headline: "Cuide do seu coração com avaliação cardiológica completa.",
    subheadline:
      "Consulta com cardiologista, exames do coração e procedimentos num só complexo hospitalar. Atendimento particular, do check-up ao acompanhamento.",
    backgroundImage: PLACEHOLDER_HERO,
    pills: [
      "Consulta com cardiologista",
      "Exames do coração",
      "UTI de alta complexidade",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Cardiologia: prevenção, diagnóstico e cuidado do coração.",
    paragraphs: [
      "A cardiologia avalia e cuida da saúde do coração e da circulação — de um check-up preventivo ao acompanhamento de quem já convive com pressão alta, arritmia ou risco cardíaco. No Hospital São Rafael, consulta, exames e procedimentos ficam no mesmo lugar.",
      "Com centro cirúrgico cardiovascular e UTI de alta complexidade, avaliação e tratamento seguem uma jornada contínua, com resultados integrados ao seu prontuário.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta, exames do coração e procedimentos cardiológicos.",
    description: "Do diagnóstico ao tratamento, com estrutura hospitalar completa.",
    items: [
      { title: "Consulta com cardiologista", description: "Avaliação de risco e saúde do coração." },
      { title: "Eletrocardiograma e ecocardiograma", description: "Exames para avaliar ritmo e estrutura cardíaca." },
      { title: "Teste ergométrico", description: "Avaliação do coração sob esforço físico." },
      { title: "Cateterismo e angioplastia", description: "Diagnóstico e desobstrução de artérias coronárias." },
      { title: "Implante de marcapasso", description: "Correção de alterações do ritmo cardíaco." },
      { title: "Ablação por cateter", description: "Tratamento de arritmias cardíacas." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você percebe:",
    intro: "Sinais que merecem avaliação cardiológica. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "dor-peito", icon: "heart-pulse", title: "Dor ou aperto no peito", description: "Desconforto no peito, principalmente a esforços." },
      { id: "falta-ar", icon: "activity", title: "Falta de ar ou cansaço", description: "Cansaço fácil, falta de ar ou palpitações." },
      { id: "pressao", icon: "shield-check", title: "Pressão alta ou risco", description: "Histórico de pressão alta, diabetes ou colesterol." },
      { id: "checkup", icon: "clipboard-check", title: "Check-up do coração", description: "Avaliação preventiva ou pré-operatória." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Cardiologia"),
}

const NEUROCIRURGIA: EspecialidadeLPData = {
  slug: "neurocirurgia",
  termo: "Neurocirurgia",
  meta: {
    title: "Neurocirurgia | Coluna e sistema nervoso no Hospital São Rafael",
    description:
      "Avaliação e cirurgia de coluna e sistema nervoso no Hospital São Rafael: hérnia de disco, estenose e mais. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "NEUROCIRURGIA",
    headline: "Dor na coluna ou hérnia de disco? Agende sua avaliação com neurocirurgião.",
    subheadline:
      "Avaliação, exames de imagem e cirurgia de coluna e sistema nervoso, com técnicas minimamente invasivas sempre que possível. Atendimento particular.",
    backgroundImage: docHero("neurocirurgia"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Consulta com neurocirurgião",
      "Cirurgia minimamente invasiva",
      "Monitoração intraoperatória",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Neurocirurgia: tratamento da coluna, cérebro e nervos.",
    paragraphs: [
      "A neurocirurgia cuida de doenças da coluna e do sistema nervoso — de uma hérnia de disco que causa dor e formigamento a casos que exigem cirurgia cerebral. No Hospital São Rafael, avaliação, exames e procedimento ficam integrados.",
      "Sempre que possível, a equipe usa técnicas minimamente invasivas, com monitoração neurofisiológica durante a cirurgia para mais segurança.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta, exames e cirurgia de coluna e sistema nervoso.",
    description: "Diagnóstico e tratamento com estrutura hospitalar de alta complexidade.",
    items: [
      { title: "Consulta com neurocirurgião", description: "Avaliação de dor, formigamento ou perda de força." },
      { title: "Exames de imagem", description: "Ressonância e tomografia de coluna e crânio." },
      { title: "Microcirurgia de hérnia discal", description: "Tratamento da hérnia de disco com mínima invasão." },
      { title: "Cirurgia da coluna cervical", description: "Procedimentos para dor e compressão na cervical." },
      { title: "Tratamento de estenose do canal", description: "Alívio da compressão do canal vertebral." },
      { title: "Ressecção de tumores", description: "Cirurgia de tumores do sistema nervoso." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você sente:",
    intro: "Sinais que merecem avaliação neurocirúrgica. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "dor-irradiada", icon: "activity", title: "Dor que irradia", description: "Dor na coluna que desce para braço ou perna." },
      { id: "formigamento", icon: "brain", title: "Formigamento ou dormência", description: "Perda de sensibilidade em mãos, braços ou pernas." },
      { id: "forca", icon: "bone", title: "Perda de força", description: "Fraqueza em membros ou dificuldade de movimento." },
      { id: "exame", icon: "clipboard-check", title: "Exame alterado", description: "Ressonância com hérnia, estenose ou lesão." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Neurocirurgia"),
}

const UROLOGIA: EspecialidadeLPData = {
  slug: "urologia",
  termo: "Urologia",
  meta: {
    title: "Urologia | Consulta e exames urológicos no Hospital São Rafael",
    description:
      "Consulta e tratamento urológico no Hospital São Rafael: próstata, cálculo renal, bexiga e vias urinárias. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "UROLOGIA",
    headline: "Próstata, cálculo renal ou vias urinárias? Agende com urologista.",
    subheadline:
      "Consulta, exames e cirurgia urológica com técnicas minimamente invasivas e foco em recuperação rápida. Atendimento particular.",
    backgroundImage: docHero("urologia"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Consulta com urologista",
      "Exames urológicos",
      "Cirurgia minimamente invasiva",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Urologia: saúde da próstata, rins, bexiga e vias urinárias.",
    paragraphs: [
      "A urologia cuida do trato urinário e da saúde do homem — de um check-up de próstata ao tratamento de cálculo renal, infecções de repetição e alterações urinárias. No Hospital São Rafael, consulta, exame e cirurgia ficam integrados.",
      "A equipe prioriza técnicas endoscópicas e laparoscópicas, minimamente invasivas, para recuperação mais rápida e mais qualidade de vida.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta, exames e cirurgia urológica num só endereço.",
    description: "Do diagnóstico ao tratamento, com estrutura hospitalar completa.",
    items: [
      { title: "Consulta com urologista", description: "Avaliação da próstata e das vias urinárias." },
      { title: "Exames urológicos", description: "Ultrassom, cistoscopia e avaliação da próstata." },
      { title: "Litotripsia e ureteroscopia", description: "Tratamento de cálculo renal e ureteral." },
      { title: "Prostatectomia", description: "Cirurgia de próstata com abordagem minimamente invasiva." },
      { title: "Nefrectomia", description: "Cirurgia dos rins quando indicada." },
      { title: "Cistoscopia e RTU", description: "Diagnóstico e tratamento de bexiga e próstata." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você percebe:",
    intro: "Sinais que merecem avaliação urológica. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "urinar", icon: "activity", title: "Alterações ao urinar", description: "Dor, ardência, urgência ou jato fraco." },
      { id: "dor-lombar", icon: "shield-check", title: "Dor lombar ou cálculo", description: "Dor forte nas costas ou histórico de pedra nos rins." },
      { id: "prostata", icon: "user-check", title: "Check-up da próstata", description: "Avaliação preventiva a partir dos 45–50 anos." },
      { id: "exame", icon: "clipboard-check", title: "Exame alterado", description: "PSA ou ultrassom com achado a investigar." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Urologia"),
}

const GINECOLOGIA: EspecialidadeLPData = {
  slug: "ginecologia",
  termo: "Ginecologia",
  meta: {
    title: "Ginecologia | Consulta e cirurgia no Hospital São Rafael",
    description:
      "Consulta ginecológica e cirurgia no Hospital São Rafael: mioma, endometriose e mais, por laparoscopia. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "GINECOLOGIA",
    headline: "Cuide da sua saúde da mulher com avaliação ginecológica completa.",
    subheadline:
      "Consulta, exames e cirurgia ginecológica por laparoscopia, com mínima invasão e cuidado humanizado. Atendimento particular.",
    backgroundImage: PLACEHOLDER_HERO,
    pills: [
      "Consulta com ginecologista",
      "Cirurgia por laparoscopia",
      "Cuidado humanizado",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Ginecologia: cuidado integral da saúde da mulher.",
    paragraphs: [
      "A ginecologia acompanha a saúde da mulher em todas as fases — de consultas de rotina ao tratamento de miomas, endometriose e outras condições que afetam o bem-estar e a qualidade de vida. No Hospital São Rafael, consulta, exame e cirurgia ficam integrados.",
      "As cirurgias priorizam a via laparoscópica, minimamente invasiva, o que costuma significar menos dor e recuperação mais rápida, em ambiente hospitalar estruturado.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta, exames e cirurgia ginecológica num só endereço.",
    description: "Do diagnóstico ao tratamento, com cuidado humanizado.",
    items: [
      { title: "Consulta com ginecologista", description: "Avaliação de saúde da mulher e orientação." },
      { title: "Exames ginecológicos", description: "Ultrassom e exames para diagnóstico preciso." },
      { title: "Histerectomia laparoscópica", description: "Cirurgia do útero com mínima invasão." },
      { title: "Miomectomia", description: "Retirada de miomas preservando o útero." },
      { title: "Cirurgia de endometriose", description: "Tratamento cirúrgico da endometriose." },
      { title: "Correção de prolapso pélvico", description: "Tratamento da queda dos órgãos pélvicos." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você percebe:",
    intro: "Sinais que merecem avaliação ginecológica. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "dor-pelvica", icon: "activity", title: "Dor pélvica", description: "Dor no baixo ventre ou cólicas fora do normal." },
      { id: "sangramento", icon: "shield-check", title: "Sangramento irregular", description: "Menstruação intensa, irregular ou fora do ciclo." },
      { id: "mioma", icon: "clipboard-check", title: "Mioma ou endometriose", description: "Diagnóstico prévio que precisa de acompanhamento." },
      { id: "rotina", icon: "user-check", title: "Consulta de rotina", description: "Check-up e prevenção da saúde da mulher." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Ginecologia"),
}

const DERMATOLOGIA: EspecialidadeLPData = {
  slug: "dermatologia",
  termo: "Dermatologia",
  meta: {
    title: "Dermatologia | Cirurgia de pele no Hospital São Rafael",
    description:
      "Avaliação e cirurgia dermatológica no Hospital São Rafael: lesões de pele, biópsia e cirurgia de Mohs. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "DERMATOLOGIA",
    headline: "Lesão ou pinta suspeita na pele? Agende sua avaliação dermatológica.",
    subheadline:
      "Avaliação, biópsia e cirurgia de pele com diagnóstico integrado no próprio complexo hospitalar. Fluxo ágil entre exame e procedimento. Atendimento particular.",
    backgroundImage: docHero("dermatologia"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Consulta com dermatologista",
      "Biópsia e histopatologia",
      "Cirurgia de pele",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Dermatologia cirúrgica: cuidado com lesões e tumores de pele.",
    paragraphs: [
      "A dermatologia cirúrgica avalia e trata lesões de pele — de uma pinta que mudou de cor ou tamanho à remoção de tumores cutâneos. No Hospital São Rafael, o diagnóstico histopatológico é integrado ao próprio complexo.",
      "Isso significa um fluxo ágil entre avaliação, biópsia e cirurgia, sem repetir etapas e sem correr entre clínicas diferentes.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta, biópsia e cirurgia de pele num só endereço.",
    description: "Diagnóstico e tratamento integrados, com histopatologia no local.",
    items: [
      { title: "Consulta com dermatologista", description: "Avaliação de lesões, pintas e manchas de pele." },
      { title: "Biópsia e histopatologia", description: "Análise da lesão para diagnóstico preciso." },
      { title: "Exérese de lesões cutâneas", description: "Retirada de lesões de pele com segurança." },
      { title: "Cirurgia de Mohs", description: "Técnica para carcinomas com preservação de tecido." },
      { title: "Ressecção de carcinomas", description: "Tratamento cirúrgico de tumores de pele." },
      { title: "Reconstrução cutânea", description: "Reconstrução após remoção de lesão." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você percebe:",
    intro: "Sinais que merecem avaliação dermatológica. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "pinta", icon: "scan", title: "Pinta que mudou", description: "Lesão que cresceu, mudou de cor ou formato." },
      { id: "ferida", icon: "shield-check", title: "Ferida que não cicatriza", description: "Lesão que não fecha ou sangra com facilidade." },
      { id: "lesao-nova", icon: "activity", title: "Lesão nova ou suspeita", description: "Mancha ou nódulo que apareceu na pele." },
      { id: "exame", icon: "clipboard-check", title: "Indicação de cirurgia", description: "Lesão com indicação de retirada ou biópsia." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Dermatologia"),
}

const CIRURGIA_GERAL: EspecialidadeLPData = {
  slug: "cirurgia-geral",
  termo: "Cirurgia Geral",
  meta: {
    title: "Cirurgia Geral | Vesícula, hérnia e mais no Hospital São Rafael",
    description:
      "Avaliação e cirurgia geral no Hospital São Rafael: vesícula, hérnia, refluxo e mais, por laparoscopia. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "CIRURGIA GERAL",
    headline: "Pedra na vesícula, hérnia ou refluxo? Agende sua avaliação cirúrgica.",
    subheadline:
      "Avaliação e cirurgia abdominal por laparoscopia ou aberta, com integração de UTI e anestesiologia para casos complexos. Atendimento particular.",
    backgroundImage: docHero("cirurgia-geral"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Consulta com cirurgião geral",
      "Cirurgia por laparoscopia",
      "Integração com UTI",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Cirurgia geral: tratamento de doenças do abdome.",
    paragraphs: [
      "A cirurgia geral trata condições do abdome — de uma pedra na vesícula ou hérnia que incomoda ao tratamento do refluxo que não melhora com remédio. No Hospital São Rafael, avaliação, exames e cirurgia ficam integrados.",
      "As cirurgias priorizam a via laparoscópica, minimamente invasiva, com suporte de UTI e anestesiologia para casos de maior complexidade.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta e cirurgia abdominal num só endereço.",
    description: "Do diagnóstico ao tratamento, com estrutura hospitalar completa.",
    items: [
      { title: "Consulta com cirurgião geral", description: "Avaliação do seu caso e do melhor tratamento." },
      { title: "Colecistectomia", description: "Cirurgia de retirada da vesícula (pedra na vesícula)." },
      { title: "Herniorrafia", description: "Correção de hérnia inguinal e da parede abdominal." },
      { title: "Cirurgia de refluxo (fundoplicatura)", description: "Tratamento do refluxo gastroesofágico." },
      { title: "Apendicectomia", description: "Cirurgia de apendicite." },
      { title: "Ressecção intestinal", description: "Cirurgia do intestino quando indicada." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você percebe:",
    intro: "Sinais que merecem avaliação cirúrgica. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "dor-abdominal", icon: "activity", title: "Dor abdominal recorrente", description: "Dor na barriga que volta, principalmente após comer." },
      { id: "hernia", icon: "shield-check", title: "Abaulamento ou hérnia", description: "Caroço na virilha ou barriga que aumenta ao esforço." },
      { id: "refluxo", icon: "heart-pulse", title: "Refluxo persistente", description: "Azia e refluxo que não melhoram com remédio." },
      { id: "exame", icon: "clipboard-check", title: "Exame com indicação", description: "Ultrassom ou exame com achado cirúrgico." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Cirurgia Geral"),
}

const CIRURGIA_PLASTICA: EspecialidadeLPData = {
  slug: "cirurgia-plastica",
  termo: "Cirurgia Plástica",
  meta: {
    title: "Cirurgia Plástica | Estética e reconstrutiva no Hospital São Rafael",
    description:
      "Avaliação em cirurgia plástica estética e reconstrutiva no Hospital São Rafael, em ambiente hospitalar. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "CIRURGIA PLÁSTICA",
    headline: "Cirurgia plástica com segurança de ambiente hospitalar.",
    subheadline:
      "Avaliação e procedimentos estéticos e reconstrutivos em centro cirúrgico de alta complexidade, com equipe especializada. Atendimento particular.",
    backgroundImage: docHero("cirurgia-plastica"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Consulta com cirurgião plástico",
      "Ambiente hospitalar",
      "Estética e reconstrutiva",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Cirurgia plástica estética e reconstrutiva.",
    paragraphs: [
      "A cirurgia plástica engloba procedimentos estéticos e reconstrutivos — de cirurgias que harmonizam o corpo à reconstrução após uma mastectomia. No Hospital São Rafael, tudo acontece em ambiente hospitalar de alta complexidade.",
      "A integração com mastologia e oncologia permite uma abordagem oncoplástica completa, com foco em resultados naturais e na segurança do procedimento.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta e cirurgia plástica em ambiente hospitalar.",
    description: "Procedimentos estéticos e reconstrutivos com segurança.",
    items: [
      { title: "Consulta com cirurgião plástico", description: "Avaliação e planejamento do procedimento." },
      { title: "Mamoplastia de aumento e redução", description: "Cirurgias da mama estéticas." },
      { title: "Rinoplastia", description: "Cirurgia do nariz, estética e funcional." },
      { title: "Lipoaspiração e abdominoplastia", description: "Contorno corporal em ambiente hospitalar." },
      { title: "Ritidoplastia (lifting facial)", description: "Rejuvenescimento facial cirúrgico." },
      { title: "Reconstrução mamária", description: "Reconstrução da mama após mastectomia." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "Agende sua avaliação se você quer:",
    intro: "Motivos comuns para uma consulta de cirurgia plástica. Fale com nossa equipe.",
    items: [
      { id: "estetica", icon: "sparkles", title: "Avaliar um procedimento estético", description: "Entender opções, indicações e cuidados." },
      { id: "reconstrucao", icon: "heart-handshake", title: "Reconstrução", description: "Reconstrução mamária ou após outras cirurgias." },
      { id: "seguranca", icon: "shield-check", title: "Segurança hospitalar", description: "Realizar o procedimento em ambiente hospitalar." },
      { id: "orientacao", icon: "user-check", title: "Orientação profissional", description: "Tirar dúvidas com especialista antes de decidir." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Cirurgia Plástica"),
}

const CIRURGIA_VASCULAR: EspecialidadeLPData = {
  slug: "cirurgia-vascular",
  termo: "Cirurgia Vascular",
  meta: {
    title: "Cirurgia Vascular | Varizes e circulação no Hospital São Rafael",
    description:
      "Avaliação e tratamento vascular no Hospital São Rafael: varizes, circulação e aneurismas. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "CIRURGIA VASCULAR",
    headline: "Varizes ou má circulação nas pernas? Agende com cirurgião vascular.",
    subheadline:
      "Avaliação, exames e tratamento de doenças das artérias e veias, com abordagem endovascular e cirúrgica. Atendimento particular.",
    backgroundImage: docHero("cirurgia-vascular"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Consulta com cirurgião vascular",
      "Exames vasculares",
      "Tratamento endovascular",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Cirurgia vascular: saúde das artérias e veias.",
    paragraphs: [
      "A cirurgia vascular cuida da circulação — de varizes e sensação de peso nas pernas ao tratamento de aneurismas e obstruções arteriais. No Hospital São Rafael, avaliação, exames e tratamento ficam integrados.",
      "A estrutura permite abordagem endovascular e cirurgia aberta, escolhendo a técnica mais adequada para cada caso, com foco em segurança e recuperação.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta, exames e tratamento vascular num só endereço.",
    description: "Do diagnóstico ao tratamento das artérias e veias.",
    items: [
      { title: "Consulta com cirurgião vascular", description: "Avaliação da circulação e das pernas." },
      { title: "Exames vasculares (doppler)", description: "Ultrassom das artérias e veias." },
      { title: "Tratamento de varizes", description: "Safenectomia e flebectomia." },
      { title: "Angioplastia periférica", description: "Desobstrução de artérias das pernas." },
      { title: "Correção de aneurisma", description: "Tratamento de dilatação da artéria." },
      { title: "Fístula arteriovenosa", description: "Acesso para hemodiálise." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você percebe:",
    intro: "Sinais que merecem avaliação vascular. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "varizes", icon: "waves", title: "Varizes e peso nas pernas", description: "Veias saltadas, inchaço ou cansaço nas pernas." },
      { id: "dor-caminhar", icon: "activity", title: "Dor ao caminhar", description: "Dor nas panturrilhas que melhora ao parar." },
      { id: "feridas", icon: "shield-check", title: "Feridas que não cicatrizam", description: "Lesões nas pernas ou pés de difícil cicatrização." },
      { id: "exame", icon: "clipboard-check", title: "Exame alterado", description: "Doppler ou exame com achado a tratar." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Cirurgia Vascular"),
}

const CABECA_PESCOCO: EspecialidadeLPData = {
  slug: "cabeca-pescoco",
  termo: "Cabeça e Pescoço",
  meta: {
    title: "Cirurgia de Cabeça e Pescoço | Tireoide no Hospital São Rafael",
    description:
      "Avaliação e cirurgia de cabeça e pescoço no Hospital São Rafael: tireoide, pescoço e mais. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "CABEÇA E PESCOÇO",
    headline: "Nódulo na tireoide ou no pescoço? Agende sua avaliação.",
    subheadline:
      "Avaliação, exames e cirurgia da tireoide e da região do pescoço, com equipe multidisciplinar integrada. Atendimento particular.",
    backgroundImage: docHero("cabeca-pescoco"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Consulta especializada",
      "Cirurgia de tireoide",
      "Equipe multidisciplinar",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Cirurgia de cabeça e pescoço: tireoide, pescoço e glândulas.",
    paragraphs: [
      "A especialidade trata condições da região da cabeça e pescoço — de um nódulo na tireoide a tumores e alterações das glândulas salivares. No Hospital São Rafael, avaliação, exames e cirurgia ficam integrados.",
      "Com equipe multidisciplinar e suporte de microcirurgia no próprio complexo, casos que exigem reconstrução são conduzidos com segurança.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta, exames e cirurgia num só endereço.",
    description: "Do diagnóstico ao tratamento da região de cabeça e pescoço.",
    items: [
      { title: "Consulta especializada", description: "Avaliação de nódulos e alterações no pescoço." },
      { title: "Exames de imagem", description: "Ultrassom e exames da tireoide e do pescoço." },
      { title: "Tireoidectomia", description: "Cirurgia da tireoide, total ou parcial." },
      { title: "Paratireoidectomia", description: "Cirurgia das glândulas paratireoides." },
      { title: "Esvaziamento cervical", description: "Tratamento de linfonodos do pescoço." },
      { title: "Ressecção de tumor parotídeo", description: "Cirurgia de glândula salivar." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você percebe:",
    intro: "Sinais que merecem avaliação. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "nodulo", icon: "user", title: "Nódulo no pescoço", description: "Caroço na tireoide ou no pescoço." },
      { id: "voz", icon: "activity", title: "Alterações persistentes", description: "Rouquidão ou dificuldade para engolir que não passa." },
      { id: "tireoide", icon: "clipboard-check", title: "Alteração da tireoide", description: "Exame de tireoide com achado a investigar." },
      { id: "encaminhamento", icon: "shield-check", title: "Indicação cirúrgica", description: "Caso com indicação de cirurgia especializada." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Cabeça e Pescoço"),
}

const MASTOLOGIA: EspecialidadeLPData = {
  slug: "mastologia",
  termo: "Mastologia",
  meta: {
    title: "Mastologia | Saúde da mama no Hospital São Rafael",
    description:
      "Avaliação e cirurgia da mama no Hospital São Rafael: nódulo, biópsia e reconstrução, com abordagem oncoplástica. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "MASTOLOGIA",
    headline: "Nódulo na mama ou exame alterado? Agende sua avaliação com mastologista.",
    subheadline:
      "Avaliação, biópsia e cirurgia da mama com abordagem que preserva forma e função, em ambiente humanizado. Atendimento particular.",
    backgroundImage: docHero("mastologia"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Consulta com mastologista",
      "Biópsia mamária",
      "Cirurgia oncoplástica",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Mastologia: cuidado com a saúde da mama.",
    paragraphs: [
      "A mastologia cuida da saúde da mama — de um nódulo ou exame alterado ao tratamento cirúrgico com abordagem oncoplástica, que busca preservar forma e função. No Hospital São Rafael, avaliação, biópsia e cirurgia ficam integradas.",
      "Com equipe integrada à oncologia e suporte psicológico, o cuidado acontece em ambiente humanizado, acompanhando cada etapa do tratamento.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta, exames e cirurgia da mama num só endereço.",
    description: "Do diagnóstico ao tratamento, com cuidado humanizado.",
    items: [
      { title: "Consulta com mastologista", description: "Avaliação da mama e orientação do próximo passo." },
      { title: "Exames de imagem", description: "Mamografia e ultrassom da mama." },
      { title: "Biópsia mamária", description: "Análise de nódulos para diagnóstico." },
      { title: "Nodulectomia e setorectomia", description: "Retirada de nódulo preservando a mama." },
      { title: "Mastectomia", description: "Cirurgia da mama quando indicada." },
      { title: "Reconstrução mamária", description: "Reconstrução da mama após cirurgia." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você percebe:",
    intro: "Sinais que merecem avaliação. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "nodulo", icon: "ribbon", title: "Nódulo na mama", description: "Caroço ou alteração ao apalpar a mama." },
      { id: "exame", icon: "clipboard-check", title: "Exame alterado", description: "Mamografia ou ultrassom com achado a investigar." },
      { id: "mudancas", icon: "activity", title: "Mudanças na mama", description: "Alteração na pele, no mamilo ou secreção." },
      { id: "rotina", icon: "user-check", title: "Acompanhamento", description: "Rotina de prevenção da saúde da mama." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Mastologia"),
}

const OTORRINO: EspecialidadeLPData = {
  slug: "otorrinolaringologia",
  termo: "Otorrinolaringologia",
  meta: {
    title: "Otorrinolaringologia | Ouvido, nariz e garganta no Hospital São Rafael",
    description:
      "Consulta e cirurgia de ouvido, nariz e garganta no Hospital São Rafael: sinusite, desvio de septo, amígdalas. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "OTORRINOLARINGOLOGIA",
    headline: "Sinusite, desvio de septo ou ronco? Agende com otorrinolaringologista.",
    subheadline:
      "Avaliação e cirurgia de ouvido, nariz e garganta com técnicas modernas e mínimo tempo de internação. Atendimento particular.",
    backgroundImage: docHero("otorrinolaringologia"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Consulta com otorrino",
      "Cirurgia de nariz e garganta",
      "Técnicas modernas",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Otorrinolaringologia: ouvido, nariz e garganta.",
    paragraphs: [
      "A otorrinolaringologia trata condições de ouvido, nariz e garganta — de uma sinusite de repetição e desvio de septo que atrapalham a respiração a amígdalas e problemas de audição. No Hospital São Rafael, avaliação e cirurgia ficam integradas.",
      "As cirurgias usam técnicas modernas, muitas por via endoscópica, com foco em resultado funcional e no menor tempo possível de internação.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Consulta e cirurgia de ouvido, nariz e garganta.",
    description: "Do diagnóstico ao tratamento, com estrutura hospitalar completa.",
    items: [
      { title: "Consulta com otorrino", description: "Avaliação de ouvido, nariz e garganta." },
      { title: "Septoplastia", description: "Correção do desvio de septo nasal." },
      { title: "Cirurgia dos seios da face", description: "Tratamento da sinusite crônica (endoscópica)." },
      { title: "Amigdalectomia e adenoidectomia", description: "Cirurgia de amígdalas e adenoides." },
      { title: "Timpanoplastia", description: "Cirurgia do tímpano e do ouvido." },
      { title: "Turbinectomia", description: "Tratamento da obstrução nasal." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você percebe:",
    intro: "Sinais que merecem avaliação. Na dúvida, fale com nossa equipe.",
    items: [
      { id: "nariz", icon: "wind", title: "Nariz entupido crônico", description: "Dificuldade para respirar pelo nariz ou sinusite." },
      { id: "garganta", icon: "activity", title: "Dores de garganta de repetição", description: "Amigdalites frequentes ou ronco intenso." },
      { id: "ouvido", icon: "ear", title: "Problemas de ouvido", description: "Dor de ouvido, zumbido ou queda de audição." },
      { id: "exame", icon: "clipboard-check", title: "Indicação cirúrgica", description: "Caso com indicação de cirurgia de otorrino." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Otorrinolaringologia"),
}

const CLINICA_DOR: EspecialidadeLPData = {
  slug: "clinica-dor",
  termo: "Clínica da Dor",
  meta: {
    title: "Clínica da Dor | Tratamento de dor crônica no Hospital São Rafael",
    description:
      "Avaliação e tratamento de dor crônica no Hospital São Rafael: bloqueios, infiltrações e radiofrequência. Atendimento particular. Agende pelo WhatsApp.",
  },
  hero: {
    kicker: "CLÍNICA DA DOR",
    headline: "Dor crônica que não passa? Agende avaliação na Clínica da Dor.",
    subheadline:
      "Avaliação multidisciplinar e tratamento intervencionista de dores persistentes, com procedimentos guiados por imagem. Atendimento particular.",
    backgroundImage: docHero("clinica-dor"),
    overlayClassName: OVERLAY_DOC,
    imagePosition: "72% 50%",
    pills: [
      "Avaliação multidisciplinar",
      "Procedimentos guiados por imagem",
      "Manejo da dor crônica",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Clínica da Dor: tratamento de dores crônicas e persistentes.",
    paragraphs: [
      "A Clínica da Dor cuida de quem convive com dor que não passa — dor lombar, neuropatias, fibromialgia e dor persistente após cirurgia. No Hospital São Rafael, a avaliação é multidisciplinar e integrada.",
      "O tratamento pode incluir procedimentos minimamente invasivos guiados por imagem, como bloqueios e infiltrações, buscando alívio da dor e mais qualidade de vida.",
    ],
  },
  exams: {
    kicker: "O QUE VOCÊ AGENDA AQUI",
    headline: "Avaliação e procedimentos para tratamento da dor.",
    description: "Abordagem multidisciplinar da dor crônica, num só endereço.",
    items: [
      { title: "Avaliação multidisciplinar", description: "Análise da sua dor e do melhor tratamento." },
      { title: "Bloqueios anestésicos", description: "Alívio da dor com bloqueio guiado." },
      { title: "Infiltrações guiadas", description: "Aplicação precisa guiada por imagem." },
      { title: "Radiofrequência", description: "Tratamento de dor crônica por radiofrequência." },
      { title: "Procedimentos minimamente invasivos", description: "Técnicas de alívio com mínima invasão." },
      { title: "Manejo da dor pós-cirúrgica", description: "Controle da dor persistente após cirurgia." },
    ],
  },
  indications: {
    kicker: "QUANDO PROCURAR",
    headline: "É hora de agendar se você convive com:",
    intro: "Situações que merecem avaliação especializada da dor. Fale com nossa equipe.",
    items: [
      { id: "dor-cronica", icon: "syringe", title: "Dor que não passa", description: "Dor persistente há mais de três meses." },
      { id: "lombar", icon: "activity", title: "Dor lombar ou na coluna", description: "Dor nas costas que limita o dia a dia." },
      { id: "neuropatia", icon: "shield-check", title: "Dor em queimação ou choque", description: "Dor neuropática, formigamento ou fisgadas." },
      { id: "pos-cirurgia", icon: "clipboard-check", title: "Dor após cirurgia", description: "Dor que persiste depois de um procedimento." },
    ],
    note: INDIC_NOTE,
  },
  whyHsr: WHY_HSR,
  faq: buildFaq("Clínica da Dor"),
}

// -----------------------------------------------------------------------------
// REGISTRO — keyed por slug
// -----------------------------------------------------------------------------

export const ESPECIALIDADES_LP: Record<string, EspecialidadeLPData> = {
  ortopedia: ORTOPEDIA,
  cardiologia: CARDIOLOGIA,
  neurocirurgia: NEUROCIRURGIA,
  urologia: UROLOGIA,
  ginecologia: GINECOLOGIA,
  dermatologia: DERMATOLOGIA,
  "cirurgia-geral": CIRURGIA_GERAL,
  "cirurgia-plastica": CIRURGIA_PLASTICA,
  "cirurgia-vascular": CIRURGIA_VASCULAR,
  "cabeca-pescoco": CABECA_PESCOCO,
  mastologia: MASTOLOGIA,
  otorrinolaringologia: OTORRINO,
  "clinica-dor": CLINICA_DOR,
}
