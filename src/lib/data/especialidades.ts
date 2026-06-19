// [PENDENTE CLIENTE] Documento com procedimentos por especialidade (13/mar)
// deve ser reencaminhado para completar esta seção.
export const ESPECIALIDADES_DATA = {
  kicker: "ESPECIALIDADES",
  headline: "Excelência em cada área de atuação.",
  description:
    "Conheça as especialidades atendidas no Instituto Médico e Diagnóstico do Hospital São Rafael.",
  items: [
    {
      id: "ortopedia",
      title: "Ortopedia",
      description:
        "Equipe especializada em artroscopia, artroplastias totais e cirurgias da coluna vertebral com técnicas minimamente invasivas. Centro cirúrgico equipado com arcos cirúrgicos dedicados, implantes de última geração e protocolos de recuperação acelerada (ERAS). Indicado para cirurgias eletivas de joelho, quadril, ombro e tratamento de fraturas complexas.",
      icon: "bone",
      procedures: [
        "Artroplastia total de joelho",
        "Artroplastia total de quadril",
        "Artroscopia de joelho e ombro",
        "Reconstrução do LCA",
        "Cirurgia da coluna vertebral",
        "Tratamento de fraturas complexas",
      ],
    },
    {
      id: "cardiologia",
      title: "Cardiologia",
      description:
        "Suporte cardiológico completo para avaliação de risco pré-operatório, monitoramento durante a internação e acompanhamento pós-cirúrgico. A equipe realiza cateterismo, angioplastia, implante de marcapasso e cirurgia de revascularização miocárdica. Estrutura com centro cirúrgico cardiovascular e UTI de alta complexidade.",
      icon: "heart-pulse",
      procedures: [
        "Cateterismo cardíaco",
        "Angioplastia coronária",
        "Implante de stent",
        "Implante de marcapasso",
        "Ablação por cateter",
        "Cirurgia de revascularização",
      ],
    },
    {
      id: "neurocirurgia",
      title: "Neurocirurgia",
      description:
        "Tratamento cirúrgico de patologias do sistema nervoso central e periférico, com foco em hérnia discal, tumores cerebrais e estenose do canal vertebral. Abordagem minimamente invasiva sempre que possível, com monitoração neurofisiológica intraoperatória. Referência para casos de coluna cervical, lombar e neurocirurgia oncológica.",
      icon: "brain",
      procedures: [
        "Ressecção de tumores cerebrais",
        "Cirurgia minimamente invasiva da coluna",
        "Microcirurgia de hérnia discal",
        "Derivação ventrículo-peritoneal",
        "Neurocirurgia da coluna cervical",
        "Tratamento de estenose do canal",
      ],
    },
    {
      id: "urologia",
      title: "Urologia",
      description:
        "Diagnóstico e tratamento endoscópico e laparoscópico de patologias urológicas — próstata, rins, bexiga e vias urinárias. Estrutura completa para prostatectomia, nefrectomia, cistoscopia e litotripsia com equipamentos de última geração. Abordagem minimamente invasiva com foco em recuperação rápida e qualidade de vida.",
      icon: "stethoscope",
      procedures: [
        "Prostatectomia",
        "Nefrectomia",
        "Litotripsia e ureteroscopia",
        "Cistoscopia e RTU",
        "Cirurgia de cálculos renais",
        "Cirurgia de cálculos renais",
      ],
    },
    {
      id: "ginecologia",
      title: "Ginecologia",
      description:
        "Cirurgias ginecológicas por via laparoscópica com mínima invasão e recuperação acelerada. Especialidade completa para histerectomia, miomectomia, tratamento cirúrgico de endometriose e correção de prolapso pélvico. Ambiente hospitalar estruturado para cirurgias de alta complexidade com cuidado humanizado.",
      icon: "uterus",
      procedures: [
        "Histerectomia laparoscópica",
        "Miomectomia",
        "Cirurgia de endometriose",
        "Ooforectomia",
        "Correção de prolapso pélvico",
        "Salpingectomia",
      ],
    },
    {
      id: "oftalmologia",
      title: "Oftalmologia",
      description:
        "Centro oftalmológico com tecnologia de ponta para facoemulsificação de catarata, cirurgia refrativa a laser e vitreoretina. Equipe experiente em trabeculectomia para glaucoma, vitrectomia posterior e transplante de córnea. Sala cirúrgica dedicada com microscópios e equipamentos de imagem de alta resolução.",
      icon: "eye",
      procedures: [
        "Facoemulsificação (catarata)",
        "Trabeculectomia (glaucoma)",
        "Vitrectomia posterior",
        "Cirurgia refrativa a laser",
        "Transplante de córnea",
        "Correção de estrabismo",
      ],
    },
    {
      id: "dermatologia",
      title: "Dermatologia",
      description:
        "Cirurgia dermatológica com diagnóstico histopatológico integrado no próprio complexo hospitalar. Especialidade indicada para exérese de lesões cutâneas, cirurgia de Mohs para carcinomas e reconstruções cutâneas após ressecção oncológica. Fluxo ágil entre diagnóstico, biópsia e procedimento cirúrgico.",
      icon: "scan",
      procedures: [
        "Exérese de lesões cutâneas",
        "Cirurgia de Mohs",
        "Reconstrução cutânea",
        "Biópsias e histopatologia",
        "Ressecção de carcinomas",
        "Eletrocirurgia dermatológica",
      ],
    },
    {
      id: "cirurgia-geral",
      title: "Cirurgia Geral",
      description:
        "Cirurgias abdominais de média e alta complexidade por via laparoscópica e aberta. Do planejamento ao pós-operatório, a equipe cobre colecistectomia, herniorrafias, ressecções intestinais e cirurgia antirrefluxo. Integração com UTI e equipe de anestesiologia para casos complexos.",
      icon: "scissors",
      procedures: [
        "Colecistectomia",
        "Apendicectomia",
        "Herniorrafia inguinal e ventral",
        "Ressecção intestinal",
        "Fundoplicatura",
        "Cirurgia de refluxo gastroesofágico",
      ],
    },
    {
      id: "cirurgia-plastica",
      title: "Cirurgia Plástica",
      description:
        "Procedimentos estéticos e reconstrutivos com resultados naturais e seguros em ambiente hospitalar de alta complexidade. Equipe especializada em mamoplastias, rinoplastia, lipoaspiração e reconstrução mamária pós-mastectomia. Integração com mastologia e oncologia para abordagem oncoplástica completa.",
      icon: "sparkles",
      procedures: [
        "Mamoplastia de aumento e redução",
        "Rinoplastia",
        "Lipoaspiração",
        "Abdominoplastia",
        "Ritidoplastia (lifting facial)",
        "Reconstrução mamária pós-mastectomia",
      ],
    },
    {
      id: "cirurgia-vascular",
      title: "Cirurgia Vascular",
      description:
        "Tratamento de patologias arteriais e venosas com abordagem endovascular e cirurgia aberta. Estrutura com angiógrafo intraoperatório para revascularização de membros, correção de aneurismas e tratamento de insuficiência venosa crônica. Equipe experiente em fístulas arteriovenosas e angioplastia periférica.",
      icon: "waves",
      procedures: [
        "Revascularização arterial",
        "Correção de aneurisma",
        "Safenectomia e flebectomia",
        "Fístula arteriovenosa",
        "Angioplastia periférica",
        "Trombectomia",
      ],
    },
    {
      id: "cabeca-pescoco",
      title: "Cabeça e Pescoço",
      description:
        "Ressecções oncológicas e reconstruções complexas da região craniofacial com equipe multidisciplinar integrada. Especialidade completa para tireoidectomia, paratireoidectomia, esvaziamento cervical e tumores parotídeos. Reconstrução por retalhos microvascularizados com suporte de microcirurgia no próprio complexo.",
      icon: "user",
      procedures: [
        "Tireoidectomia total e parcial",
        "Paratireoidectomia",
        "Esvaziamento cervical",
        "Ressecção de tumor parotídeo",
        "Laringectomia",
        "Reconstrução com retalhos microvascularizados",
      ],
    },
    {
      id: "mastologia",
      title: "Mastologia",
      description:
        "Diagnóstico e tratamento cirúrgico de patologias da mama com abordagem oncoplástica que preserva forma e função. Equipe integrada com oncologia para nodulectomia, mastectomia, biópsia guiada e reconstrução mamária. Ambiente humanizado com suporte psicológico e acompanhamento em cada etapa do tratamento.",
      icon: "ribbon",
      procedures: [
        "Nodulectomia",
        "Setorectomia",
        "Mastectomia",
        "Biópsia mamária",
        "Reconstrução mamária",
        "Cirurgia oncoplástica",
      ],
    },
    {
      id: "otorrinolaringologia",
      title: "Otorrinolaringologia",
      description:
        "Cirurgias do ouvido, nariz e garganta com técnicas modernas e estrutura hospitalar completa. Indicada para septoplastia, amigdalectomia, cirurgias endoscópicas nasossinusais (CENS) e procedimentos otológicos como timpanoplastia. Foco em resultados funcionais com mínimo tempo de internação.",
      icon: "ear",
      procedures: [
        "Septoplastia",
        "Amigdalectomia",
        "Adenoidectomia",
        "Cirurgia dos seios da face",
        "Timpanoplastia",
        "Turbinectomia",
      ],
    },
    {
      id: "clinica-dor",
      title: "Clínica da Dor",
      description:
        "Avaliação multidisciplinar e tratamento intervencionista de dores agudas e crônicas refratárias. Procedimentos guiados por imagem como bloqueios anestésicos, infiltrações, radiofrequência e neuroestimulação. Indicada para dor lombar, neuropatias, fibromialgia e manejo pós-cirúrgico de dor persistente.",
      icon: "syringe",
      procedures: [
        "Bloqueios anestésicos",
        "Infiltrações guiadas",
        "Radiofrequência",
        "Procedimentos minimamente invasivos",
        "Manejo da dor crônica",
        "Avaliação multidisciplinar",
      ],
    },
    // [PENDENTE CLIENTE] Completar lista com todas as especialidades do documento de 13/mar
  ],
} as const
