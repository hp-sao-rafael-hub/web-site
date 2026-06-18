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
        "Artroscopia, artroplastias de joelho e quadril e cirurgias de coluna com técnicas minimamente invasivas e protocolos de recuperação acelerada.",
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
        "Avaliação cardiológica, exames e acompanhamento clínico para a sua segurança no pré e no pós-operatório.",
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
        "Diagnóstico e tratamento de condições da coluna e do sistema nervoso, com cuidado individualizado.",
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
        "Diagnóstico e tratamento de condições urológicas, com foco em segurança e recuperação confortável.",
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
        "Histerectomia laparoscópica, miomectomia e tratamento da endometriose com precisão minimamente invasiva e protocolos de recuperação rápida.",
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
        "Facoemulsificação de catarata, tratamento cirúrgico de glaucoma e vitrectomia com tecnologia de última geração em centro oftalmológico especializado.",
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
        "Exérese de lesões, cirurgia de Mohs para carcinomas e reconstruções cutâneas com precisão cirúrgica e diagnóstico histopatológico integrado.",
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
        "Avaliação e tratamento de condições cirúrgicas do abdome, com protocolos de recuperação cuidadosos.",
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
        "Mamoplastias, rinoplastia e reconstrução pós-oncológica com resultados naturais, seguros e protocolos de reabilitação integrada.",
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
        "Revascularização arterial, correção de aneurismas e tratamento de varizes com abordagem endovascular e tecnologia de imagem intraoperatória.",
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
        "Tireoidectomia, esvaziamento cervical e ressecção oncológica craniofacial com reconstrução por retalhos microvascularizados.",
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
        "Diagnóstico e tratamento de doenças da mama, com cuidado dedicado e acompanhamento em cada etapa.",
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
        "Avaliação e tratamento de condições do ouvido, nariz e garganta, com cuidado individualizado.",
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
        "Avaliação e tratamento de dores crônicas e agudas, com abordagem individualizada para o seu bem-estar.",
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
