#!/usr/bin/env bash
# =============================================================================
# DEPLOY-FUNCTION.SH — Azure Function de leads | Hospital São Rafael
# =============================================================================
# Publica azure-functions/ no Function App via zip deploy, usando só o Azure
# CLI (não exige o Functions Core Tools).
#
#   ./scripts/deploy-function.sh                      # descobre o app sozinho
#   ./scripts/deploy-function.sh <APP> <RESOURCE_GROUP>
#   DRY_RUN=1 ./scripts/deploy-function.sh            # empacota sem publicar
#
# O deploy da function é independente do deploy do site: um push na main
# publica o Static Web App e não toca aqui. Ver docs/07-DEPLOY-AZURE-FUNCTION.md
# =============================================================================

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/azure-functions"
ENDPOINT_PATH="/api/medicos-lead"

# Filtro para achar o app quando o nome não é informado
APP_NAME_HINT="${APP_NAME_HINT:-lp-medicos-leads-hsr}"

red()  { printf '\033[31m%s\033[0m\n' "$*"; }
grn()  { printf '\033[32m%s\033[0m\n' "$*"; }
ylw()  { printf '\033[33m%s\033[0m\n' "$*"; }
info() { printf '\033[36m▸\033[0m %s\n' "$*"; }

# ── Pré-requisitos ───────────────────────────────────────────────────────────
command -v az   >/dev/null || { red "Azure CLI não encontrado. brew install azure-cli"; exit 1; }
command -v npm  >/dev/null || { red "npm não encontrado."; exit 1; }
command -v zip  >/dev/null || { red "zip não encontrado."; exit 1; }

if [[ "${DRY_RUN:-}" != "1" ]]; then
  if ! az account show >/dev/null 2>&1; then
    red "Não há sessão do Azure ativa."
    echo "Rode primeiro:  az login"
    exit 1
  fi
  ACCOUNT="$(az account show --query "user.name" -o tsv)"
  SUB="$(az account show --query "name" -o tsv)"
  info "Conta: $ACCOUNT  ·  Assinatura: $SUB"
fi

# ── Descoberta do Function App ───────────────────────────────────────────────
# Em DRY_RUN a descoberta é pulada: valida o pacote sem exigir acesso à Azure.
APP="${1:-}"
RG="${2:-}"

if [[ -z "$APP" && "${DRY_RUN:-}" != "1" ]]; then
  info "Procurando o Function App…"
  read -r APP RG <<<"$(az functionapp list \
    --query "[?contains(name, '$APP_NAME_HINT')].[name,resourceGroup] | [0]" \
    -o tsv 2>/dev/null || true)"

  if [[ -z "${APP:-}" ]]; then
    red "Nenhum Function App com \"$APP_NAME_HINT\" nesta assinatura."
    echo
    echo "Function Apps visíveis para $ACCOUNT:"
    az functionapp list --query "[].{nome:name, grupo:resourceGroup}" -o table 2>/dev/null || echo "  (nenhum)"
    echo
    ylw "O app pode estar em outra conta ou assinatura. Verifique com:"
    echo "  az account list --all -o table     # trocar: az account set -s <ID>"
    echo "  az login                           # entrar com outra conta"
    exit 1
  fi
fi

if [[ -z "${RG:-}" && "${DRY_RUN:-}" != "1" ]]; then
  RG="$(az functionapp list --query "[?name=='$APP'].resourceGroup | [0]" -o tsv)"
  [[ -n "$RG" ]] || { red "Resource group de '$APP' não encontrado."; exit 1; }
fi

[[ "${DRY_RUN:-}" == "1" ]] || grn "Alvo: $APP  (resource group: $RG)"

# ── Empacotamento ────────────────────────────────────────────────────────────
BUILD="$(mktemp -d)"
trap 'rm -rf "$BUILD"' EXIT

info "Preparando o pacote…"
# O layout do pacote espelha o que roda em produção: handlers em
# src/functions/, conforme o "main" do package.json. No repo os handlers ficam
# na raiz de azure-functions/ para manter os caminhos da documentação.
mkdir -p "$BUILD/src/functions"
cp "$SRC/host.json" "$SRC/package.json" "$BUILD/"
cp "$SRC"/*.js "$BUILD/src/functions/"
[[ -f "$SRC/.funcignore" ]] && cp "$SRC/.funcignore" "$BUILD/"

# node_modules vai no zip: dispensa build remoto e torna o deploy reprodutível
( cd "$BUILD" && npm install --omit=dev --silent --no-audit --no-fund )

ZIP="$BUILD/function.zip"
( cd "$BUILD" && zip -qr "$ZIP" . -x '*.zip' )
info "Pacote: $(du -h "$ZIP" | cut -f1)"

if [[ "${DRY_RUN:-}" == "1" ]]; then
  KEEP="$ROOT/function-deploy.zip"
  cp "$ZIP" "$KEEP"
  ylw "DRY_RUN: nada foi publicado. Pacote salvo em $KEEP"
  exit 0
fi

# ── Identificação do plano ───────────────────────────────────────────────────
# Flex Consumption e plano clássico publicam por caminhos diferentes. O Flex se
# identifica pela presença de properties.functionAppConfig no recurso ARM.
SUB_ID="$(az account show --query id -o tsv)"
SITE_JSON="$(az rest --method get \
  --url "https://management.azure.com/subscriptions/$SUB_ID/resourceGroups/$RG/providers/Microsoft.Web/sites/$APP?api-version=2023-12-01" \
  -o json 2>/dev/null)"

read -r IS_FLEX HOST SCM_HOST <<<"$(printf '%s' "$SITE_JSON" | python3 -c "
import sys, json
p = json.load(sys.stdin).get('properties', {})
host = p.get('defaultHostName', '')
scm = next((h for h in (p.get('enabledHostNames') or []) if '.scm.' in h), '')
if not scm and host:                       # deriva o SCM quando não vem listado
    a, _, b = host.partition('.')
    scm = f'{a}.scm.{b}'
print('flex' if p.get('functionAppConfig') else 'classic', host, scm)
")"

URL="https://$HOST$ENDPOINT_PATH"

# ── Publicação ───────────────────────────────────────────────────────────────
info "Publicando… (plano: $IS_FLEX · pode levar 1-2 min)"

if [[ "$IS_FLEX" == "flex" ]]; then
  # Em Flex Consumption, 'deployment source config-zip' não funciona e
  # 'az functionapp deploy' devolve 415. O caminho suportado é o endpoint
  # /api/publish do SCM, autenticado por token AAD (basic auth vem desabilitado).
  TOKEN="$(az account get-access-token --resource https://management.core.windows.net/ --query accessToken -o tsv)"

  CODE="$(curl -s -o /dev/null -w '%{http_code}' -X POST \
    "https://$SCM_HOST/api/publish?RemoteBuild=false" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/zip" \
    --data-binary "@$ZIP" --max-time 300)"

  [[ "$CODE" =~ ^20[02]$ ]] || { red "Publicação recusada (HTTP $CODE)."; exit 1; }
  info "Pacote aceito (HTTP $CODE). Aguardando o processamento…"

  # status do Kudu: 3 = falha, 4 = sucesso
  for _ in $(seq 1 20); do
    ST="$(curl -s -H "Authorization: Bearer $TOKEN" \
      "https://$SCM_HOST/api/deployments/latest" --max-time 40 2>/dev/null \
      | python3 -c "import sys,json;print(json.load(sys.stdin).get('status',''))" 2>/dev/null || echo "")"
    [[ "$ST" == "4" ]] && break
    [[ "$ST" == "3" ]] && { red "Deploy falhou (status 3). Veja https://$SCM_HOST/api/deployments/latest"; exit 1; }
    sleep 12
  done
  [[ "$ST" == "4" ]] || { red "Deploy não confirmou sucesso (último status: ${ST:-desconhecido})."; exit 1; }
else
  az functionapp deployment source config-zip \
    --name "$APP" --resource-group "$RG" --src "$ZIP" --output none
fi

grn "Publicado."

# ── Verificação ──────────────────────────────────────────────────────────────

info "Aguardando o restart…"
for i in $(seq 1 12); do
  CODE="$(curl -s -o /dev/null -w '%{http_code}' -X OPTIONS "$URL" --max-time 20 || echo 000)"
  if [[ "$CODE" == "200" ]]; then
    grn "Endpoint no ar: $URL  (CORS OPTIONS 200)"
    echo
    echo "Teste de ponta a ponta — ATENÇÃO: cria um lead real no CRM:"
    echo "  curl -X POST \"$URL\" \\"
    echo "    -H 'Content-Type: application/json' \\"
    echo "    -d '{\"nome\":\"TESTE DEPLOY\",\"whatsapp\":\"(31) 9 0000-0000\",\"email\":\"teste@exemplo.com\",\"especialidade\":\"Cardiologia\",\"cidade\":\"Belo Horizonte / MG\",\"origem\":\"imd\"}'"
    exit 0
  fi
  sleep 10
done

ylw "O endpoint ainda não respondeu 200 (último status: $CODE)."
echo "O deploy foi aceito; o app pode estar reiniciando. Verifique em:"
echo "  az webapp log tail --name $APP --resource-group $RG"
exit 1
