// NOTA: Produtos são experiências/upgrades adicionais.
// Diferente de "Serviços" (infraestrutura do hospital).
export const PRODUTOS_DATA = {
  kicker: "PRODUTOS E EXPERIÊNCIAS",
  headline: "Soluções que elevam cada etapa da sua jornada.",
  description:
    "Além da infraestrutura hospitalar, oferecemos produtos pensados para maximizar o conforto do paciente e a eficiência do cirurgião.",
  categories: [
    {
      id: "paciente",
      label: "Para Pacientes",
      items: [
        {
          id: "upgrade-acomodacao",
          title: "Upgrade de Acomodação",
          description:
            "Conforto, privacidade e atendimento exclusivo. Transforme o período pós-cirúrgico em uma experiência de recuperação diferenciada.",
          icon: "crown",
          image: "/assets/images/produtos/upgrade-acomodacao.jpg",
        },
        {
          id: "extensao-diaria",
          title: "Extensão de Diária",
          description:
            "Flexibilidade no tempo de internação para uma recuperação sem pressa e com total suporte médico.",
          icon: "clock",
          image: "/assets/images/produtos/extensao-diaria.jpg",
        },
        {
          id: "unidade-transicao",
          title: "Unidade de Transição",
          description:
            "O elo seguro entre a alta hospitalar e o regresso a casa. Monitorização contínua e reabilitação assistida.",
          icon: "shield-check",
          image: "/assets/images/produtos/unidade-transicao.jpg",
        },
        {
          id: "consulta-pre-anestesica",
          title: "Consulta Pré-Anestésica",
          description:
            "Avaliação especializada antes do procedimento para mitigar riscos e personalizar o protocolo anestésico.",
          icon: "clipboard-check",
          image: "/assets/images/produtos/consulta-pre-anestesica.jpg",
        },
        {
          id: "tecnico-enfermagem",
          title: "Técnico de Enfermagem Exclusivo",
          description:
            "Técnico de enfermagem dedicado exclusivamente ao seu cuidado, com acompanhamento contínuo, segurança e atenção personalizada durante toda a internação.",
          icon: "heart-handshake",
          image: "/assets/images/produtos/tecnico-enfermagem-v4.jpg",
        },
      ],
    },
    {
      id: "medico",
      label: "Para Médicos",
      items: [
        {
          id: "enfermagem-dedicada",
          title: "Equipe de Enfermagem Dedicada",
          // [PENDENTE CLIENTE] Validar se instrumentador é diferencial por especialidade
          description:
            "Equipe de enfermagem alinhada ao seu procedimento, com acompanhamento contínuo e atenção aos detalhes do seu caso.",
          icon: "wrench",
          image: "/assets/images/produtos/instrumentador-v2.jpg",
        },
        {
          id: "academia",
          title: "Academia",
          description:
            "Espaço de atividade física e bem-estar exclusivo para médicos e equipe cirúrgica, com equipamentos modernos e estrutura completa dentro do complexo.",
          icon: "dumbbell",
          image: "/assets/images/produtos/academia.jpg",
        },
        {
          id: "conforto-medico",
          title: "Conforto Médico",
          description:
            "Área exclusiva de descanso e conveniência para médicos, com estrutura pensada para preparação e recuperação entre procedimentos com privacidade e comodidade.",
          icon: "sofa",
          image: "/assets/images/produtos/conforto-medico.jpg",
        },
        {
          id: "engenharia-clinica",
          title: "Engenharia Clínica",
          description:
            "Suporte técnico especializado em manutenção e operação de equipamentos médico-hospitalares, garantindo máxima disponibilidade e performance dos recursos cirúrgicos.",
          icon: "settings-2",
          image: "/assets/images/produtos/engenharia-clinica.jpg",
        },
      ],
    },
  ],
} as const
