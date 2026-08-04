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
cp "$SRC/host.json" "$SRC/package.json" "$SRC"/*.js "$BUILD/"
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

# ── Publicação ───────────────────────────────────────────────────────────────
info "Publicando… (pode levar 1-2 min)"
az functionapp deployment source config-zip \
  --name "$APP" \
  --resource-group "$RG" \
  --src "$ZIP" \
  --build-remote false \
  --output none

grn "Publicado."

# ── Verificação ──────────────────────────────────────────────────────────────
HOST="$(az functionapp show --name "$APP" --resource-group "$RG" --query defaultHostName -o tsv)"
URL="https://$HOST$ENDPOINT_PATH"

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
