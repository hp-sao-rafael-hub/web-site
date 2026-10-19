# Página de obrigado das especialidades IMD

Os 13 formulários individuais encaminham para `/pt/imd/obrigado/` após a API responder com HTTP de sucesso e `ok: true`. A versão em inglês usa `/en/imd/obrigado/`. A página segue os tokens institucionais do site, com confirmação, especialidade e retorno opcional. Não há contador, Tintim ou abertura automática do WhatsApp.

## Origem preservada

O contrato existente de `especialidades-lead` permanece: `especialidade`, `especialidade_slug`, `page_url`, `submission_id`, consentimento e UTMs continuam no POST ao backend. O backend já encaminha nome/slug da especialidade ao webhook e inclui a especialidade no rótulo de origem da API DataCrazy. Nenhuma Function foi modificada nesta entrega.

Após a confirmação, o navegador grava um comprovante temporário sem nome, telefone, e-mail ou cidade. Ele contém o ID original do envio, especialidade, caminho interno de origem e UTMs permitidas. A página de obrigado consome o comprovante uma vez antes de reportar a conversão.

O parâmetro público `especialidade` na URL permite mostrar a especialidade mesmo sem sessionStorage. Ele não autoriza uma conversão. O retorno à especialidade só usa slugs do registro canônico; nenhuma URL externa de retorno é aceita.

Um contexto de exibição separado conserva o nome da especialidade no F5 sem repetir o envio do evento. O comprovante e o contexto expiram após 30 minutos. Em armazenamento indisponível, a tentativa de tracking ocorre no formulário confirmado e a página não repete essa tentativa.

## Eventos e plataformas

- `generate_lead`: ID original em `event_id`, origem `imd-especialidades`, `form_id`, especialidade/nome/slug, página de origem e UTMs permitidas.
- `form_lead`: preservado por compatibilidade com a integração atual; agora também recebe `event_id`, slug e caminho de origem.
- Meta direto: preservado, com o mesmo `eventID`. Se a biblioteca ainda estiver carregando, somente a tentativa Meta aguarda brevemente; os eventos e a tentativa Google não ficam retidos por isso.
- Google Ads direto: continua condicionado às variáveis públicas existentes e à disponibilidade de `gtag`; quando houver ID, usa `transaction_id` igual ao identificador do envio.
- Nome, telefone, e-mail e cidade não são copiados para o novo comprovante. Cidade continua no cadastro CRM, mas foi retirada da nova jornada de tracking do formulário de especialidade.

GTM e contas de anúncios não foram alterados. Como a jornada anterior já emitia `generate_lead`, `form_lead` e chamadas diretas, essas interfaces foram preservadas; não configurar os dois eventos como conversões independentes do mesmo formulário. Escolher um único responsável por plataforma e auditar tags existentes. Se GTM assumir o envio antes realizado diretamente, remover ou desabilitar o caminho direto correspondente em mudança coordenada.

Uma futura tag deve ser restrita ao hostname institucional correto e a `origem = imd-especialidades`, evitando interferência em Outubro Rosa e B2B, que usam o mesmo contêiner. Confirmar Pixel e rótulo Google Ads específicos do IMD; não copiar os IDs da campanha Outubro Rosa. Se houver CAPI para especialidades, usar o mesmo Pixel, evento Lead e ID do navegador.

Não contar conversão por uma simples visualização da URL de obrigado. F5, acesso direto e parâmetros da URL não comprovam registro.

## Limites da contagem

A proteção é contra reexecução na mesma sessão/aba. Uma aba aberta com opener pode receber uma cópia de sessionStorage; deduplicação entre abas, tentativas no servidor e pessoas que preenchem novamente exige regras adicionais no destino. O mesmo ID é mantido para viabilizar deduplicação nas plataformas, mas não substitui idempotência comprovada no CRM.

Remover o comprovante evita reenvios cegos; não prova entrega do evento a Meta/Google, especialmente com bloqueadores, saída imediata ou falha de rede. O critério produtivo continua sendo conferência no CRM, Tag Assistant e Meta Test Events.

## Validação e publicação

```sh
npm ci
npm install --prefix azure-functions
npm run test:functions
npm run test:imd-thank-you
npx tsc --noEmit
npm run build
```

Para repetir o teste de navegador com API simulada: `npm run test:imd-browser`. Ele usa Playwright já declarado no projeto e precisa de Chromium instalado; em Linux com Chrome do sistema, usar `CHROME_BIN=/usr/bin/google-chrome npm run test:imd-browser`. Serviços externos são bloqueados pelo teste; capturas ficam na pasta temporária do sistema.

O export deve conter `out/pt/imd/obrigado/index.html` e a rota equivalente em inglês, ambas com noindex/nofollow. A navegação não depende de redirects de Next.js incompatíveis com export estático.

Testar cada especialidade com API simulada; conferir payload, ID, evento e apresentação. Cobrir falha/reenvio, resposta sem `ok: true`, honeypot, F5, retorno, acesso direto, storage bloqueado e interface mobile. Não criar cadastros reais por acidente na prévia.

O site institucional possui workflows acionados por push/PR em main. A publicação não é manual como no Outubro Rosa. Revisar o workflow efetivamente usado antes de push/merge. Nenhuma publicação foi feita nesta entrega.

Após o deploy autorizado: enviar um cadastro controlado, confirmar origem/especialidade e destino no CRM, e validar deduplicação e recebimento nas plataformas.
