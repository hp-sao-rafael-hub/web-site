const { app } = require("@azure/functions")
const crypto = require("node:crypto")

const DATACRAZY_API_URL = "https://api.g1.datacrazy.io/api/v1"
const META_GRAPH_API_URL = "https://graph.facebook.com/v20.0"
const REQUEST_TIMEOUT_MS = 10000

const SPECIALTIES = Object.freeze({
  ortopedia: "Ortopedia",
  cardiologia: "Cardiologia",
  neurocirurgia: "Neurocirurgia",
  urologia: "Urologia",
  ginecologia: "Ginecologia",
  dermatologia: "Dermatologia",
  "cirurgia-geral": "Cirurgia Geral",
  "cirurgia-plastica": "Cirurgia Plástica",
  "cirurgia-vascular": "Cirurgia Vascular",
  "cabeca-pescoco": "Cabeça e Pescoço",
  mastologia: "Mastologia",
  otorrinolaringologia: "Otorrinolaringologia",
  "clinica-dor": "Clínica da Dor",
})

function sanitizeText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function normalizeBrazilianPhone(value) {
  let digits = String(value || "").replace(/\D/g, "")
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55"))
    digits = digits.slice(2)
  if (digits.length !== 10 && digits.length !== 11) return null
  return `+55${digits}`
}

function normalizeEmail(value) {
  const email = sanitizeText(value, 254).toLowerCase()
  if (!email) return null
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : false
}

function normalizePageUrl(value) {
  const rawUrl = sanitizeText(value, 1000)
  if (!rawUrl) return null
  try {
    const parsed = new URL(rawUrl)
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.toString() : null
  } catch {
    return null
  }
}

function specialtySlugFromPageUrl(pageUrl) {
  if (!pageUrl) return null
  try {
    const pathname = new URL(pageUrl).pathname
    return pathname.match(/\/(?:[a-z]{2}\/)?especialidades\/([^/]+)\/?$/i)?.[1] || null
  } catch {
    return null
  }
}

function parseAllowedOrigins(env) {
  return (env.ESPECIALIDADES_ALLOWED_ORIGINS || "http://localhost:3000,http://127.0.0.1:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
}

function buildHeaders(origin, allowedOrigins) {
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  }
  if (origin && allowedOrigins.includes(origin)) headers["Access-Control-Allow-Origin"] = origin
  return headers
}

function jsonResponse(status, body, headers) {
  return { status, headers, body: JSON.stringify(body) }
}

function logError(context, message, details) {
  if (typeof context?.error === "function") return context.error(message, details)
  if (typeof context?.log?.error === "function") return context.log.error(message, details)
  context?.log?.(message, details)
}

function hashForMeta(value) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

async function requestWithTimeout(url, options, fetchImpl) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    return await fetchImpl(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

async function postDataCrazy(path, payload, token, fetchImpl) {
  const response = await requestWithTimeout(
    `${DATACRAZY_API_URL}${path}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    fetchImpl
  )
  const text = await response.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = null
    }
  }
  if (!response.ok) {
    const error = new Error("datacrazy_request_failed")
    error.status = response.status
    throw error
  }
  return data
}

async function postWebhook(payload, webhookUrl, fetchImpl) {
  const response = await requestWithTimeout(
    webhookUrl,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    fetchImpl
  )
  if (!response.ok) {
    const error = new Error("datacrazy_webhook_failed")
    error.status = response.status
    throw error
  }
}

async function postMetaCapi(
  { phone, email, city, pageUrl, submissionId },
  pixelId,
  accessToken,
  fetchImpl
) {
  const userData = { ph: [hashForMeta(phone.replace("+", ""))] }
  if (email) userData.em = [hashForMeta(email)]
  if (city) userData.ct = [hashForMeta(city)]

  const response = await requestWithTimeout(
    `${META_GRAPH_API_URL}/${pixelId}/events`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: submissionId || undefined,
            action_source: "website",
            event_source_url: pageUrl || undefined,
            user_data: userData,
          },
        ],
        access_token: accessToken,
      }),
    },
    fetchImpl
  )

  if (!response.ok) {
    const error = new Error("meta_capi_request_failed")
    error.status = response.status
    throw error
  }
}

function extractLeadId(payload) {
  return payload?.id || payload?.lead?.id || payload?.data?.id || null
}

async function handleEspecialidadesLead(request, context, dependencies = {}) {
  const env = dependencies.env || process.env
  const fetchImpl = dependencies.fetchImpl || globalThis.fetch
  const origin = request.headers?.get?.("origin") || ""
  const allowedOrigins = parseAllowedOrigins(env)
  const headers = buildHeaders(origin, allowedOrigins)

  if (origin && !allowedOrigins.includes(origin)) {
    return jsonResponse(403, { ok: false, error: "origin_not_allowed" }, headers)
  }
  if (request.method === "OPTIONS") return { status: 204, headers }

  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse(400, { ok: false, error: "invalid_json" }, headers)
  }

  if (sanitizeText(body.website, 200)) return jsonResponse(200, { ok: true }, headers)

  const name = sanitizeText(body.nome, 120)
  const phone = normalizeBrazilianPhone(body.whatsapp)
  const email = normalizeEmail(body.email)
  const city = sanitizeText(body.cidade, 100)
  const specialtySlug = sanitizeText(body.especialidade_slug, 80)
  const specialty = SPECIALTIES[specialtySlug]
  const receivedSpecialty = sanitizeText(body.especialidade, 120)
  const pageUrl = normalizePageUrl(body.page_url)
  const pageSpecialtySlug = specialtySlugFromPageUrl(pageUrl)
  const consentedAt = sanitizeText(body.consentido_em, 40)
  const privacyVersion = sanitizeText(body.politica_versao, 80)
  const validConsentDate = consentedAt && !Number.isNaN(Date.parse(consentedAt))

  if (
    name.length < 3 ||
    !phone ||
    email === false ||
    city.length < 2 ||
    !specialty ||
    receivedSpecialty !== specialty ||
    pageSpecialtySlug !== specialtySlug ||
    body.consentimento !== true ||
    !validConsentDate ||
    !privacyVersion
  ) {
    return jsonResponse(400, { ok: false, error: "invalid_fields" }, headers)
  }

  const token = sanitizeText(env.DATACRAZY_TOKEN, 500)
  const webhookUrl = sanitizeText(env.ESPECIALIDADES_DATACRAZY_WEBHOOK_URL, 2000)
  if ((!token && !webhookUrl) || typeof fetchImpl !== "function") {
    logError(context, "Configuração do DataCrazy ausente na função de especialidades.")
    return jsonResponse(500, { ok: false, error: "integration_not_configured" }, headers)
  }

  const sourceLabel = sanitizeText(env.ESPECIALIDADES_SOURCE_LABEL, 120) || "Site HSR | IMD"
  const utmSource = sanitizeText(body.utm_source, 80)
  const submissionId = sanitizeText(body.submission_id, 100)
  const stageId = sanitizeText(env.ESPECIALIDADES_DATACRAZY_STAGE_ID, 100)
  const attendantId = sanitizeText(env.ESPECIALIDADES_DATACRAZY_ATTENDANT_ID, 100)
  const source = [sourceLabel, specialty, city, utmSource && `Origem: ${utmSource}`]
    .filter(Boolean)
    .join(" | ")

  const webhookPayload = {
    name,
    nome: name,
    phone,
    whatsapp: phone,
    email: email || null,
    city,
    cidade: city,
    specialty,
    especialidade: specialty,
    specialtySlug,
    especialidadeSlug: specialtySlug,
    source,
    pageUrl,
    submissionId: submissionId || null,
    consent: true,
    consentimento: true,
    consentedAt,
    consentidoEm: consentedAt,
    privacyPolicyVersion: privacyVersion,
    politicaVersao: privacyVersion,
    utm: {
      source: utmSource || null,
      medium: sanitizeText(body.utm_medium, 80) || null,
      campaign: sanitizeText(body.utm_campaign, 120) || null,
      content: sanitizeText(body.utm_content, 120) || null,
      term: sanitizeText(body.utm_term, 120) || null,
    },
  }

  const lead = { name, phone, source, address: { country: "BR", city } }
  if (email) lead.email = email
  if (pageUrl) lead.sourceReferral = { sourceUrl: pageUrl }
  if (attendantId) lead.attendant = { id: attendantId }

  async function reportToMeta() {
    const pixelId = sanitizeText(env.ESPECIALIDADES_META_PIXEL_ID, 60)
    const accessToken = sanitizeText(env.ESPECIALIDADES_META_CAPI_TOKEN, 1000)
    if (!pixelId || !accessToken) return
    try {
      await postMetaCapi(
        { phone, email: email || null, city, pageUrl, submissionId },
        pixelId,
        accessToken,
        fetchImpl
      )
      context.log("Lead de especialidade reportado à Meta CAPI.")
    } catch (error) {
      logError(context, "Falha ao reportar lead de especialidade à Meta CAPI.", {
        status: error.status || null,
        type: error.name,
      })
    }
  }

  try {
    if (webhookUrl) {
      await postWebhook(webhookPayload, webhookUrl, fetchImpl)
      context.log("Lead de especialidade enviado ao webhook do DataCrazy.")
      await reportToMeta()
      return jsonResponse(200, { ok: true }, headers)
    }

    const leadResult = await postDataCrazy("/leads", lead, token, fetchImpl)
    if (stageId) {
      const leadId = extractLeadId(leadResult)
      if (!leadId) return jsonResponse(502, { ok: false, error: "crm_stage_not_created" }, headers)
      const business = { leadId, stageId }
      if (attendantId) business.attendantId = attendantId
      if (submissionId) business.externalId = submissionId
      await postDataCrazy("/businesses", business, token, fetchImpl)
    }
    await reportToMeta()
    return jsonResponse(200, { ok: true }, headers)
  } catch (error) {
    logError(context, "Falha ao registrar lead de especialidade no DataCrazy.", {
      status: error.status || null,
      type: error.name,
    })
    const status = error.name === "AbortError" ? 504 : 502
    return jsonResponse(
      status,
      { ok: false, error: status === 504 ? "crm_timeout" : "crm_unavailable" },
      headers
    )
  }
}

app.http("especialidades-lead", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  handler: (request, context) => handleEspecialidadesLead(request, context),
})

module.exports = {
  SPECIALTIES,
  handleEspecialidadesLead,
  normalizeBrazilianPhone,
  normalizeEmail,
  specialtySlugFromPageUrl,
  hashForMeta,
}
