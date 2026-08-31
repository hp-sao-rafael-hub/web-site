# Tasks — HSR & BBExpress

> Documento de acompanhamento de implementações pendentes.
> Atualizado em sessão com Claude Code.

---

## Registro — Correções SEO seguras (27/08/2026)

### Concluído nesta etapa

- [x] Removidas promessas absolutas da metadata principal, incluindo “maior estrutura”, “tecnologia de ponta” e “recuperação completa”.
- [x] Ajustada a copy do IMD para não garantir ausência de repetição de exames ou de deslocamentos.
- [x] Ajustada a descrição geral dos serviços e da terapia hiperbárica para linguagem condicional e dependente de avaliação médica.
- [x] Removido “procedimentos realizados com sucesso” dos indicadores; o rótulo agora descreve apenas procedimentos realizados.
- [x] Removido telefone fictício dos schemas de páginas e do schema global.
- [x] Substituído o domínio de homologação `hsr-xi.vercel.app` nos schemas e templates pelo domínio configurado em `SITE_METADATA.url`.
- [x] Adicionado canonical absoluto por idioma nas rotas existentes de serviços e especialidades, sem alterar URLs públicas.
- [x] Passado o mesmo canonical por idioma para os schemas JSON-LD dessas páginas.
- [x] Validação de erros estáticos concluída sem erros nos arquivos alterados.
- [x] Ajustado o copy do diferencial e do IMD para linguagem mais neutra e menos promissória.
- [x] Atualizado o rótulo de estatísticas e CTAs de especialidades para evitar afirmações absolutas e promessas de procedimentos.
- [x] Correções de copy aplicadas diretamente na branch `dev`.

### Ainda pendente de confirmação

- [ ] Confirmar domínio oficial antes de retirar a marca `[PENDENTE CLIENTE]` de `SITE_METADATA.url`.
- [ ] Confirmar salas, leitos, procedimentos, equipamentos, UTI, CME, laboratório e demais dados institucionais.
- [ ] Revisar claims restantes em `services-content.ts`, `especialidades.ts`, `especialidades-lp.ts`, `faq.ts` e `messages/pt.json`.
- [ ] Escolher entre traduzir integralmente `/en/` ou redirecionar/remover essa versão.
- [ ] Definir a arquitetura final `/hospital`, `/imd`, `/cirurgias-e-procedimentos`, `/medicos` e `/para-medicos`.
- [ ] Criar mapa definitivo de redirects 301 a partir das URLs reais indexadas.
- [ ] Criar sitemap e robots.txt depois da decisão final de URLs e idiomas.
- [ ] Validar CRM, RQE, médicos, fotos, depoimentos, preços, horários, formulários e consentimentos LGPD.
- [ ] Instalar dependências e executar `npm run build`; `next` não estava instalado e `npm ci` excedeu dois minutos sem saída nesta sessão. Repetir no ambiente com acesso ao registry.

---

## HSR — Site Geral (Institucional)
**Repo:** `hp-sao-rafael-hub/web-site` · **Branch ativa:** `dev`

### Pendente

- [x] **Oftalmologia** — remover especialidade do IMD (cards + dados)
- [ ] **Hiperbárica** — substituir fotos dos cards pela foto do card "Apoio à Recuperação"
- [ ] **Navbar** — verificar alinhamento vertical, corrigir desalinhamento do item "IMD" (dropdown)
- [ ] **Links globais** — todos os botões/links devem abrir em nova aba (`target="_blank"`)
- [x] **Seção Especialidades** — remover botão "Ver procedimentos" dos cards
- [ ] **Seção Estrutura Hospitalar** — padronizar tamanho dos cards, fotos e texto (simetria)

---

## HSR — Landing Page (Médicos Parceiros)
**Arquivo:** `public/para-cirurgioes-parceiros/index.html`

### Pendente

- [ ] **Seção "Para o Médico Parceiro"** — substituir cards com fotos por cards estilo "Especialidades" do site geral
- [ ] **Seção "Próximo Passo"** — frase "Atendimento conduzido por Simone Ramos..." em tamanho menor (subtítulo sutil)
- [ ] **Seção "Próximo Passo"** — frase "Preenchimento em menos de 1 minuto..." sem quebra ou em duas linhas explícitas
- [ ] **CTA "Próximo Passo"** — trocar copy do botão por "Agende uma visita"
- [ ] **Favicon** — adicionar favicon com logo do HSR (igual ao site geral)
- [ ] **Espaçamento entre seções** — alinhar com o padrão do site geral

---

## BBExpress — LP Catálogo
**Repo:** `bang-bang-hub/catalogo-bbexpress` · **Branch ativa:** `dev`
**URL:** `https://www.bbexpressbh.com`

### Pendente
<!-- tasks BBExpress aqui -->

---

## Concluído
<!-- movido aqui após implementação -->
