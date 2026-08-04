# 07 — Deploy da Azure Function de Leads

> Guia operacional para publicar alterações em `azure-functions/medicos-lead.js`.
> **Este deploy é manual e independente do deploy do site.** Um push na `main`
> publica o site no Azure Static Web Apps e **não** toca na function.

---

## 1. Por que é manual

Os workflows em `.github/workflows/` (`azure-deploy.yml`, `azure-static-web-apps.yml`,
`azure-static-web-apps-purple-dune-012e88a0f.yml`) publicam apenas o site estático —
todos declaram `api_location: ""`.

A pasta `azure-functions/` é **cópia de referência** do código que roda no Function App,
versionada desde `364356c` ("adiciona código Azure Function no repo para deploy via
Cloud Shell"). Ela não contém `host.json` nem `package.json`, então não é publicável
como está: a estrutura mínima é montada na hora do deploy (ver §4).

> Para eliminar este passo manual, ver §7 — Automação futura.

---

## 2. O que a function faz

Recebe o POST dos formulários de captação e cria o lead no CRM DataCrazy.

| Item | Valor |
|---|---|
| **Function App** | `lp-medicos-leads-hsr…` (Brazil South) |
| **Função** | `medicos-lead` |
| **Endpoint** | `https://lp-medicos-leads-hsr-ewdgh3bzhscvaedt.brazilsouth-01.azurewebsites.net/api/medicos-lead` |
| **Destino** | `https://api.g1.datacrazy.io/api/v1/leads` |
| **Auth** | `anonymous` (CORS liberado, trata `OPTIONS`) |

Confirme o nome exato do app antes de publicar — o sufixo `-ewdgh3bzhscvaedt` da URL é
hostname gerado, não necessariamente parte do nome:

```bash
az functionapp list -o table
```

### Consumidores do endpoint

| Origem | Onde vive | `origem` enviada |
|---|---|---|
| LP B2B de médicos | `public/para-cirurgioes-parceiros/index.html` | `lp-medicos` |
| Formulário do IMD | `src/components/organisms/service-lead-form.tsx` | `imd` |

### Variáveis de ambiente

Já configuradas no Function App, **não mudam entre deploys**:

- `DATACRAZY_TOKEN` — bearer da API do CRM
- `DATACRAZY_WEBHOOK` — webhook opcional, disparado após criar o lead

---

## 3. Caminho A — Portal (mais simples)

Use para alterações pequenas, como a de um arquivo só.

1. `portal.azure.com` → buscar o Function App pelo nome
2. Menu lateral → **Functions** → `medicos-lead`
3. Aba **Code + Test**
4. Substituir o conteúdo pelo de `azure-functions/medicos-lead.js`
5. **Save** — o restart é automático, leva alguns segundos

> **Editor somente leitura?** O app está publicado em modo pacote
> (`WEBSITE_RUN_FROM_PACKAGE=1`) e o portal não permite editar. Use o Caminho B.

---

## 4. Caminho B — Cloud Shell

Método usado nos deploys anteriores. No Cloud Shell (bash), montar a estrutura que o
runtime Node v4 exige:

```bash
mkdir -p ~/hsr-func/src/functions && cd ~/hsr-func

cat > host.json <<'EOF'
{
  "version": "2.0",
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"
  }
}
EOF

cat > package.json <<'EOF'
{
  "name": "lp-medicos-leads-hsr",
  "version": "1.0.0",
  "main": "src/functions/*.js",
  "dependencies": { "@azure/functions": "^4.0.0" }
}
EOF
```

Colar o conteúdo de `azure-functions/medicos-lead.js` em `src/functions/medicos-lead.js`
e publicar:

```bash
npm install
func azure functionapp publish <NOME-DO-FUNCTION-APP> --javascript
```

---

## 5. Validação pós-deploy

```bash
curl -X POST "https://lp-medicos-leads-hsr-ewdgh3bzhscvaedt.brazilsouth-01.azurewebsites.net/api/medicos-lead" \
  -H "Content-Type: application/json" \
  -d '{"nome":"TESTE DEPLOY IMD","whatsapp":"(31) 9 0000-0000","email":"teste@exemplo.com","especialidade":"Cardiologia","cidade":"Belo Horizonte / MG","origem":"imd"}'
```

**Esperado:** `{"ok":true}`, e no DataCrazy um lead com e-mail preenchido e
`source` = `Site HSR | IMD | Cardiologia`.

> ⚠️ **Isso cria um lead real no CRM.** Use nome em caixa alta para localizar e apagar
> depois do teste.

Checar também o CORS, que é o que faz o formulário do site funcionar:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X OPTIONS \
  "https://lp-medicos-leads-hsr-ewdgh3bzhscvaedt.brazilsouth-01.azurewebsites.net/api/medicos-lead"
# esperado: 200
```

Logs em tempo real: portal → Function App → **Log stream**, ou
`az webapp log tail --name <NOME> --resource-group <RG>`.

---

## 6. Contrato do payload

A function aceita `application/json` e `text/plain` (o segundo evita preflight CORS).

| Campo | Obrigatório | Destino no CRM |
|---|---|---|
| `nome` | ✅ | `name` |
| `whatsapp` | ✅ | `phone` |
| `email` | — | `email` (omitido se vazio) |
| `especialidade` | — | sufixo de `source` |
| `cidade` | — | `address.city` |
| `origem` | — | rótulo de `source` (ver tabela abaixo) |
| `utm_source` | — | tem prioridade sobre `origem` no `source` |

Sem `nome` ou `whatsapp`, retorna `400`.

### Rótulos de origem

| `origem` | `source` no CRM |
|---|---|
| `lp-medicos` | `LP B2B HSR` |
| `imd` | `Site HSR \| IMD` |
| ausente/desconhecida | `LP B2B HSR` (fallback) |

> Ao adicionar um novo formulário, inclua o rótulo no mapa `ORIGENS` da function.
> **Não altere o rótulo de `lp-medicos`** — quebraria a segmentação histórica no CRM.

---

## 7. Automação futura

Para eliminar o passo manual, adicionar ao repo:

- `host.json`, `package.json` e `.funcignore` dentro de `azure-functions/`
- Workflow com `Azure/functions-action@v1`, autenticado pelo secret
  `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` (baixado em Function App → **Get publish profile**)

Assim a function passa a ser publicada junto com o site a cada push na `main`.

---

## 8. Ordem ao subir formulário novo

Publicar a function **antes** do merge do PR que sobe o formulário. Na ordem inversa,
os leads captados entre o merge e o deploy chegam sem os campos novos — nada quebra,
mas o dado se perde e não há como recuperá-lo depois.
