// =============================================================================
// LEGAL-CONTENT.TS — Páginas legais (privacidade, termos, etc.) | HSR
// =============================================================================
// Fonte única de conteúdo das páginas legais. Nada hardcoded em componente.
// Itens marcados [PENDENTE CLIENTE] aguardam validação jurídica/diretoria.
// =============================================================================

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
export interface LegalSection {
  /** Slug usado no anchor (#id) */
  id: string
  /** Título exibido como H2 */
  title: string
  /** Parágrafos. Cada item vira um <p>. */
  body: string[]
  /** Lista de bullets exibida após o body. Opcional. */
  list?: string[]
  /** Lista numerada exibida após o body. Opcional. */
  orderedList?: string[]
}

export interface LegalPageData {
  kicker: string
  title: string
  subtitle: string
  effectiveDate: string
  lastUpdate: string
  sections: LegalSection[]
}

// -----------------------------------------------------------------------------
// POLÍTICA DE PRIVACIDADE — v1
// -----------------------------------------------------------------------------
export const PRIVACY_POLICY_DATA: LegalPageData = {
  kicker: "POLÍTICA DE PRIVACIDADE",
  title: "Como tratamos os seus dados pessoais.",
  subtitle:
    "Esta política descreve, de forma transparente, como o Hospital São Rafael coleta, utiliza, armazena e protege as informações dos visitantes deste site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
  effectiveDate: "06 de maio de 2026",
  lastUpdate: "06 de maio de 2026",
  sections: [
    {
      id: "controlador",
      title: "1. Quem é o controlador dos seus dados",
      body: [
        "O controlador dos dados pessoais tratados a partir deste site é o HOSPITAL SAO RAFAEL S.A., pessoa jurídica de direito privado, inscrito no CNPJ sob o nº 41.952.659/0001-25, com sede na Av. Raja Gabaglia, 1380, Gutierrez, Belo Horizonte/MG, CEP 30.441-194.",
        "Para fins desta política, “Hospital São Rafael”, “HSR”, “nós” e “nosso” referem-se à mesma pessoa jurídica acima identificada.",
      ],
    },
    {
      id: "encarregado",
      title: "2. Encarregado de Proteção de Dados (DPO)",
      body: [
        "Em atendimento ao art. 41 da LGPD, o Hospital São Rafael disponibiliza canal direto para o titular exercer seus direitos e esclarecer dúvidas sobre tratamento de dados pessoais.",
        "Contato do Encarregado: [PENDENTE CLIENTE — nome do DPO designado]. E-mail provisório para assuntos de privacidade: relacionamentocliente@hospitalsaorafael.com.",
      ],
    },
    {
      id: "dados-coletados",
      title: "3. Quais dados coletamos",
      body: [
        "Coletamos apenas o mínimo necessário para que o site funcione, para entendermos como ele é utilizado e para podermos atender quem nos procura. Os dados tratados a partir deste site se dividem nas seguintes categorias:",
      ],
      list: [
        "Dados técnicos de navegação: endereço IP (armazenado de forma criptografada por hash, não permitindo identificação direta), agente do navegador (user-agent), página de origem (referrer), data e horário do acesso.",
        "Dados de interação com chamadas para ação (CTAs): identificador do botão clicado (ex.: “falar com atendimento”), permitindo-nos entender quais conteúdos são mais úteis aos visitantes.",
        "Dados fornecidos voluntariamente em canais de contato: ao clicar em botões que direcionam para WhatsApp ou e-mail, o visitante poderá fornecer, fora do ambiente deste site, dados como nome, telefone, e-mail e descrição do motivo do contato.",
        "Dados sensíveis de saúde: este site não solicita nem armazena, em nenhum formulário, dados clínicos, históricos médicos, exames ou qualquer informação sensível de saúde. Eventuais informações desse tipo só serão tratadas em ambiente assistencial próprio do Hospital, sob políticas específicas de prontuário e sigilo médico.",
      ],
    },
    {
      id: "finalidades",
      title: "4. Para que utilizamos seus dados",
      body: [
        "Os dados coletados a partir deste site são utilizados exclusivamente para as seguintes finalidades:",
      ],
      list: [
        "Permitir o funcionamento técnico, a estabilidade e a segurança do site.",
        "Medir e melhorar a experiência de navegação, identificando seções mais acessadas e pontos de melhoria.",
        "Prevenir fraudes, abusos, acessos não autorizados e atividades incompatíveis com o uso regular do site.",
        "Atender solicitações encaminhadas pelos canais de contato (WhatsApp e e-mail) e dar continuidade ao relacionamento iniciado pelo visitante.",
        "Cumprir obrigações legais, regulatórias e responder a requisições de autoridades competentes.",
      ],
    },
    {
      id: "bases-legais",
      title: "5. Bases legais para o tratamento",
      body: [
        "Todo tratamento de dados realizado pelo Hospital São Rafael tem fundamento em uma das hipóteses previstas nos arts. 7º e 11 da LGPD. As bases legais aplicáveis a este site são:",
      ],
      list: [
        "Legítimo interesse (art. 7º, IX): para dados técnicos de navegação e métricas agregadas de uso, visando segurança e melhoria contínua do site.",
        "Consentimento (art. 7º, I): quando o titular interage voluntariamente com canais de contato, fornecendo dados para que o Hospital responda à sua solicitação.",
        "Execução de contrato ou de procedimentos preliminares (art. 7º, V): quando o contato leva a um atendimento, orçamento ou agendamento de procedimento.",
        "Cumprimento de obrigação legal ou regulatória (art. 7º, II): quando o tratamento decorrer de exigência da legislação aplicável a estabelecimentos de saúde.",
      ],
    },
    {
      id: "compartilhamento",
      title: "6. Com quem compartilhamos seus dados",
      body: [
        "O Hospital São Rafael não vende dados pessoais. O compartilhamento ocorre apenas com terceiros estritamente necessários ao funcionamento do site e ao atendimento do titular, sempre sob acordos que asseguram nível adequado de proteção:",
      ],
      list: [
        "Provedores de hospedagem e infraestrutura em nuvem, responsáveis por manter o site no ar e armazenar seus registros de forma segura.",
        "Provedores de banco de dados e serviços de back-end utilizados para registrar interações e gerenciar conteúdos do site.",
        "Provedor de mensageria do WhatsApp, quando o titular opta por iniciar uma conversa por esse canal a partir do site.",
        "Autoridades públicas e órgãos reguladores, quando exigido por lei, ordem judicial ou requisição de autoridade competente.",
        "Empresas e profissionais parceiros do Hospital, exclusivamente quando o atendimento solicitado depender da atuação desses terceiros e mediante salvaguardas contratuais.",
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies e tecnologias similares",
      body: [
        "Este site utiliza tecnologias estritamente necessárias ao seu funcionamento, bem como mecanismos próprios de medição de uso. Não utilizamos cookies de rastreamento publicitário de terceiros sem aviso prévio.",
        "Caso, no futuro, sejam adotadas novas ferramentas de análise ou de mídia (como Google Analytics, Meta Pixel ou similares), esta política será atualizada e, quando aplicável, será solicitado consentimento por meio de aviso de cookies.",
        "O titular pode, a qualquer momento, configurar seu navegador para bloquear ou apagar cookies. A desativação pode impactar funcionalidades do site.",
      ],
    },
    {
      id: "retencao",
      title: "8. Por quanto tempo guardamos os dados",
      body: [
        "Os dados são mantidos apenas pelo tempo necessário ao cumprimento das finalidades para as quais foram coletados ou conforme exigências legais e regulatórias aplicáveis.",
        "Registros técnicos e de interação com o site são, em regra, mantidos pelo prazo necessário para fins de segurança, auditoria e melhoria do serviço, podendo ser anonimizados ou eliminados após o término dessa necessidade.",
        "Dados encaminhados por canais de atendimento que evoluam para um relacionamento clínico ou contratual passam a ser regidos pelas normas específicas de prontuário, contratos e legislação sanitária aplicável.",
      ],
    },
    {
      id: "direitos",
      title: "9. Direitos do titular",
      body: [
        "Nos termos do art. 18 da LGPD, o titular dos dados tem direito a, mediante requisição:",
      ],
      orderedList: [
        "Confirmação da existência de tratamento de seus dados pessoais.",
        "Acesso aos dados pessoais tratados.",
        "Correção de dados incompletos, inexatos ou desatualizados.",
        "Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.",
        "Portabilidade dos dados a outro fornecedor de serviço ou produto, observados os segredos comercial e industrial.",
        "Eliminação dos dados pessoais tratados com base no consentimento, ressalvadas as hipóteses de retenção previstas em lei.",
        "Informação sobre as entidades públicas e privadas com as quais houve compartilhamento.",
        "Informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa.",
        "Revogação do consentimento, quando essa for a base legal aplicável.",
      ],
    },
    {
      id: "exercicio-direitos",
      title: "10. Como exercer seus direitos",
      body: [
        "O titular pode exercer seus direitos a qualquer momento, gratuitamente, por meio do canal indicado na seção “Encarregado de Proteção de Dados (DPO)” desta política.",
        "A solicitação será respondida no menor prazo possível, observados os limites legais. Para garantir a segurança do próprio titular, poderemos solicitar informações adicionais para confirmação de identidade antes de atender ao pedido.",
      ],
    },
    {
      id: "seguranca",
      title: "11. Segurança da informação",
      body: [
        "O Hospital São Rafael adota medidas técnicas e administrativas adequadas para proteger os dados pessoais contra acessos não autorizados, perdas acidentais, destruição, alteração ou qualquer forma de tratamento inadequado.",
        "Entre as práticas adotadas estão: controle de acesso por autenticação, criptografia de identificadores sensíveis (como o endereço IP), uso de provedores reconhecidos no mercado, monitoramento contínuo e revisão periódica de procedimentos de segurança.",
        "Apesar de todos os esforços, nenhum sistema é totalmente imune a falhas. Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares, comunicaremos a Autoridade Nacional de Proteção de Dados (ANPD) e os titulares afetados, nos termos da LGPD.",
      ],
    },
    {
      id: "criancas",
      title: "12. Crianças e adolescentes",
      body: [
        "Este site não é destinado, direta ou primariamente, a crianças e adolescentes. Quando o tratamento envolver titulares menores de idade, ele será realizado em seu melhor interesse e mediante consentimento específico de ao menos um dos pais ou do responsável legal, conforme art. 14 da LGPD.",
      ],
    },
    {
      id: "transferencia-internacional",
      title: "13. Transferência internacional de dados",
      body: [
        "Alguns dos prestadores de serviço utilizados pelo Hospital São Rafael podem manter infraestrutura fora do território brasileiro. Nesses casos, são adotadas salvaguardas contratuais e técnicas adequadas para garantir nível de proteção compatível com a LGPD, conforme art. 33 da legislação.",
      ],
    },
    {
      id: "alteracoes",
      title: "14. Alterações nesta política",
      body: [
        "Esta política poderá ser atualizada para refletir mudanças legais, técnicas ou operacionais. A versão vigente é sempre a publicada nesta página, com a respectiva data de última atualização indicada ao início e ao fim do documento.",
        "Recomenda-se a leitura periódica desta política. Alterações relevantes podem ser comunicadas por meio de aviso em destaque no próprio site.",
      ],
    },
    {
      id: "contato",
      title: "15. Contato",
      body: [
        "Em caso de dúvidas, solicitações ou reclamações relacionadas a esta Política de Privacidade ou ao tratamento de dados pessoais pelo Hospital São Rafael, o titular pode entrar em contato pelos canais abaixo:",
      ],
      list: [
        "E-mail (assuntos de privacidade): relacionamentocliente@hospitalsaorafael.com",
        "Telefone: (31) 2517-0900",
        "Endereço: Av. Raja Gabaglia, 1380, Gutierrez, Belo Horizonte/MG, CEP 30.441-194",
      ],
    },
  ],
}
