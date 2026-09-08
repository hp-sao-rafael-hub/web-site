# Tasks — HSR & BBExpress

> Documento de acompanhamento de implementações pendentes.
> Atualizado em sessão com Claude Code.

---

## Registro — Commit e tentativa de abertura do PR (08/09/2026)

- [x] 2026-09-08 — [[03-empresa/pessoas/equipe/enzo|Enzo]] consolidou a correção das fotos do IMD no commit local `2cdb392` (`fix(imd): restore physician photos in specialty cards`), com 19 arquivos alterados, incluindo 15 imagens e os ajustes de dados, tipos e componente. Validação anterior preservada: build concluído, rota do IMD em `200`, 15 imagens em `200` e `git diff --check` sem erros. O `push` para `origin/seo-p0-integration` foi tentado, mas bloqueado pela revisão de segurança por envolver envio de código/imagens ao repositório remoto GitHub; nenhum PR foi aberto. Pendência/bloqueio: aguardar autorização explícita para publicar no destino remoto; `AGENTS.md` permanece fora do commit.

---

## Registro — Restauração das fotos dos médicos do IMD (08/09/2026)

- [x] 2026-09-08 — [[03-empresa/pessoas/equipe/enzo|Enzo]] corrigiu os cards de especialidades do IMD para utilizarem diretamente as fotos da pasta `public/assets/images/medicos/prontas pra LP`, adicionou o mapeamento individual de imagens e textos alternativos, reintroduziu os cards adicionais de Cirurgia Geral e Urologia e restaurou a foto de Neurocirurgia ausente na pasta recebida. Arquivos de código afetados: `src/types/index.ts`, `src/lib/data/especialidades.ts` e `src/components/organisms/specialty-grid.tsx`. Validação: `npm.cmd run build` concluído com sucesso; rota `/pt/servicos/imd/` respondeu `200`; referências das fotos foram encontradas no HTML; 15 URLs de imagens responderam `200`; `git diff --check` sem erros. Observações: o build exibiu apenas avisos preexistentes de lint/Tailwind e export estático. O localhost corrigido está ativo em `http://localhost:3000`. Pendência/bloqueio: alterações ainda não foram commitadas nem abertas em PR; vault do Obsidian indisponível, portanto não houve sincronização externa.

---

## Registro — Inicialização do localhost (08/09/2026)

- [x] 2026-09-08 — [[03-empresa/pessoas/equipe/enzo|Enzo]] iniciou o servidor de desenvolvimento do site com `npm.cmd run dev` após o alias `npm` ser bloqueado pela política de execução do PowerShell. Validação: Next.js iniciou na porta 3000 e informou `http://localhost:3000` e `http://192.168.0.62:3000`; processo permanece ativo nesta sessão. Não houve alteração de código. Pendências/bloqueios: o navegador não foi aberto automaticamente e o vault do Obsidian não está disponível para sincronização externa.

---

## Registro — Análise das últimas mudanças (08/09/2026)

- [x] 2026-09-08 — [[03-empresa/pessoas/equipe/enzo|Enzo]] analisou o estado do workspace e o histórico Git; confirmou que não há alterações de código não commitadas, identificou `TASKS.md` como arquivo local modificado e `AGENTS.md` como não rastreado, e revisou os commits `866f096`, `bec3259`, `a31cce0` e `f1fbd40`. Validação: `git status`, `git log`, `git show` e diffs dos arquivos afetados. Pendência/bloqueio: o vault e a integração do Obsidian não estão disponíveis; este registro é apenas o espelho local e não houve sincronização externa.

---

## Registro — Regra canônica de logs do Codex (04/09/2026)

- [x] 2026-09-04 — [[03-empresa/pessoas/equipe/enzo|Enzo]] definiu que toda rodada finalizada de ajustes ou implementações deve ser registrada no log do Obsidian conforme o padrão existente, sempre com a identificação do executor, resumo completo do trabalho, validações, evidências, pendências e bloqueios.
- [x] 2026-09-04 — [[03-empresa/pessoas/equipe/enzo|Enzo]] pediu que o Codex trate essa regra como canônica; ela foi persistida em `AGENTS.md` para orientar as próximas rodadas.
- [x] 2026-09-04 — [[03-empresa/pessoas/equipe/enzo|Enzo]] e Codex verificaram o workspace, a documentação e o histórico recente; não foi localizado vault/log do Obsidian nem uma integração conectada nesta sessão. Não houve alteração de produto nem evidência de validação visual nesta rodada.
- [x] 2026-09-04 — [[03-empresa/pessoas/equipe/enzo|Enzo]] solicitou a localização da última atualização do Hospital no Obsidian; foi validado que o último registro local está neste `TASKS.md` (linhas 8–12) e que a última atualização de código é o commit `866f096` (`fix(seo): align route URLs in dev integration`, 18:09, branch `dev`). Pendência/bloqueio: o vault e a integração do Obsidian não estão disponíveis nesta sessão; nenhum log externo foi sincronizado.

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
