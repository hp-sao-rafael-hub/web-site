export const STATS_DATA = {
  headline: "A segurança da sua cirurgia medida em resultados reais.",
  items: [
    {
      id: "cirurgias",
      value: 12000,
      prefix: "+",
      label: "Procedimentos realizados",
      description:
        "Número institucional que deve ser atualizado com período, fonte e metodologia aprovados.",
    },
    {
      id: "salas",
      value: 22,
      label: "Salas Cirúrgicas",
      description:
        "Quantidade e recursos devem ser apresentados conforme os procedimentos confirmados pela instituição.",
    },
    {
      id: "investimento",
      value: 170,
      prefix: "R$ ",
      suffix: " mi",
      label: "De reais em inovação",
      description:
        "Aplicados em parque tecnológico e expansão estrutural para o seu conforto.",
    },
    {
      id: "hiperbarica",
      value: 10000,
      prefix: "+",
      label: "Sessões de Hiperbárica",
      // [PENDENTE CLIENTE] Número em levantamento — valor simbólico provisório
      description:
        "Número institucional sujeito a atualização e validação pela equipe responsável pelo serviço.",
    },
  ],
} as const
