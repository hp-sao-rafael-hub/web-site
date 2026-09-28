const assert = require("node:assert/strict")
const test = require("node:test")
const {
  handleEspecialidadesLead,
  normalizeBrazilianPhone,
  normalizeEmail,
  specialtySlugFromPageUrl,
  hashForMeta,
} = require("../especialidades-lead")

function createContext() {
  const entries = []
  const log = (...args) => entries.push(["info", ...args])
  log.error = (...args) => entries.push(["error", ...args])
  return { log, error: (...args) => entries.push(["error", ...args]), entries }
}

function createRequest(body, origin = "https://hospitalsaorafael.com", method = "POST") {
  return { method, headers: new Headers({ origin }), json: async () => body }
}

function response(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => (body ? JSON.stringify(body) : ""),
  }
}

const validBody = {
  nome: "Pessoa de Teste",
  whatsapp: "(31) 9 9999-9999",
  email: "Pessoa@Exemplo.com",
  cidade: "Belo Horizonte / MG",
  especialidade_slug: "cardiologia",
  especialidade: "Cardiologia",
  consentimento: true,
  consentido_em: "2026-09-28T12:00:00.000Z",
  politica_versao: "privacidade-hsr-2026-09",
  submission_id: "bd8b3788-3881-4fd5-985b-1f86e8a4488e",
  page_url: "https://hospitalsaorafael.com/pt/especialidades/cardiologia/?utm_source=meta",
  utm_source: "meta",
  utm_medium: "cpc",
  utm_campaign: "cardiologia-2026",
  utm_content: "video-01",
  utm_term: "cardiologista bh",
}

const baseEnv = {
  ESPECIALIDADES_ALLOWED_ORIGINS: "https://hospitalsaorafael.com",
  DATACRAZY_TOKEN: "token-de-teste",
}

test("normaliza telefone, email e slug da página", () => {
  assert.equal(normalizeBrazilianPhone("(31) 9 9999-9999"), "+5531999999999")
  assert.equal(normalizeBrazilianPhone("123"), null)
  assert.equal(normalizeEmail(" Pessoa@Exemplo.com "), "pessoa@exemplo.com")
  assert.equal(normalizeEmail("invalido"), false)
  assert.equal(specialtySlugFromPageUrl(validBody.page_url), "cardiologia")
})

test("responde preflight apenas para origem permitida", async () => {
  const result = await handleEspecialidadesLead(
    createRequest({}, "https://hospitalsaorafael.com", "OPTIONS"),
    createContext(),
    { env: baseEnv }
  )
  assert.equal(result.status, 204)
  assert.equal(result.headers["Access-Control-Allow-Origin"], "https://hospitalsaorafael.com")
})

test("rejeita origem não autorizada antes do CRM", async () => {
  let calls = 0
  const result = await handleEspecialidadesLead(
    createRequest(validBody, "https://malicioso.example"),
    createContext(),
    {
      env: baseEnv,
      fetchImpl: async () => {
        calls += 1
      },
    }
  )
  assert.equal(result.status, 403)
  assert.equal(calls, 0)
})

test("rejeita consentimento ausente e email inválido", async () => {
  const consent = await handleEspecialidadesLead(
    createRequest({ ...validBody, consentimento: false }),
    createContext(),
    { env: baseEnv, fetchImpl: async () => response(201, {}) }
  )
  const email = await handleEspecialidadesLead(
    createRequest({ ...validBody, email: "email-invalido" }),
    createContext(),
    { env: baseEnv, fetchImpl: async () => response(201, {}) }
  )
  assert.equal(consent.status, 400)
  assert.equal(email.status, 400)
})

test("rejeita especialidade adulterada ou divergente da URL", async () => {
  const labelMismatch = await handleEspecialidadesLead(
    createRequest({ ...validBody, especialidade: "Ortopedia" }),
    createContext(),
    { env: baseEnv, fetchImpl: async () => response(201, {}) }
  )
  const pageMismatch = await handleEspecialidadesLead(
    createRequest({
      ...validBody,
      page_url: "https://hospitalsaorafael.com/pt/especialidades/ortopedia/",
    }),
    createContext(),
    { env: baseEnv, fetchImpl: async () => response(201, {}) }
  )
  assert.equal(labelMismatch.status, 400)
  assert.equal(pageMismatch.status, 400)
})

test("honeypot responde sucesso sem chamar integração", async () => {
  let calls = 0
  const result = await handleEspecialidadesLead(
    createRequest({ ...validBody, website: "spam.example" }),
    createContext(),
    {
      env: baseEnv,
      fetchImpl: async () => {
        calls += 1
      },
    }
  )
  assert.equal(result.status, 200)
  assert.equal(calls, 0)
})

test("cria lead via API com campos normalizados e origem estável", async () => {
  const calls = []
  const result = await handleEspecialidadesLead(createRequest(validBody), createContext(), {
    env: baseEnv,
    fetchImpl: async (url, options) => {
      calls.push({ url, options })
      return response(201, { id: "lead-1" })
    },
  })
  assert.equal(result.status, 200)
  const payload = JSON.parse(calls[0].options.body)
  assert.equal(payload.phone, "+5531999999999")
  assert.equal(payload.email, "pessoa@exemplo.com")
  assert.equal(payload.address.city, "Belo Horizonte / MG")
  assert.match(payload.source, /^Site HSR \| IMD \| Cardiologia/)
  assert.match(payload.source, /Origem: meta/)
})

test("webhook preserva consentimento, especialidade, UTMs e submission id", async () => {
  const calls = []
  const env = {
    ESPECIALIDADES_ALLOWED_ORIGINS: baseEnv.ESPECIALIDADES_ALLOWED_ORIGINS,
    ESPECIALIDADES_DATACRAZY_WEBHOOK_URL: "https://api.datacrazy.io/webhook/teste",
  }
  const result = await handleEspecialidadesLead(createRequest(validBody), createContext(), {
    env,
    fetchImpl: async (url, options) => {
      calls.push({ url, options })
      return response(200, { ok: true })
    },
  })
  assert.equal(result.status, 200)
  const payload = JSON.parse(calls[0].options.body)
  assert.equal(payload.title, "Pessoa de Teste - Cardiologia")
  assert.equal(payload.board_key, "comercial")
  assert.equal(payload.value, null)
  assert.equal(payload.contact.name, validBody.nome)
  assert.equal(payload.contact.phone, "+5531999999999")
  assert.equal(payload.specialty.slug, "cardiologia")
  assert.equal(payload.specialty.name, "Cardiologia")
  assert.deepEqual(payload.tags, ["Cardiologia"])
  assert.equal(payload.consent.at, validBody.consentido_em)
  assert.equal(payload.consent.policy_version, validBody.politica_versao)
  assert.equal(payload.attribution.submission_id, validBody.submission_id)
  assert.equal(payload.attribution.utm.term, validBody.utm_term)
})

test("usa API autenticada como contingência quando o webhook falha", async () => {
  const calls = []
  const env = {
    ...baseEnv,
    ESPECIALIDADES_DATACRAZY_WEBHOOK_URL: "https://api.datacrazy.io/webhook/inativo",
  }
  const result = await handleEspecialidadesLead(createRequest(validBody), createContext(), {
    env,
    fetchImpl: async (url, options) => {
      calls.push({ url, options })
      return url.includes("/webhook/")
        ? response(404, { message: "Not Found" })
        : response(201, { id: "lead-fallback-1" })
    },
  })
  assert.equal(result.status, 200)
  assert.equal(calls.length, 2)
  assert.match(calls[1].url, /\/leads$/)
  assert.equal(JSON.parse(calls[1].options.body).name, validBody.nome)
})

test("cria negócio com externalId quando etapa está configurada", async () => {
  const calls = []
  const env = {
    ...baseEnv,
    ESPECIALIDADES_DATACRAZY_STAGE_ID: "stage-1",
    ESPECIALIDADES_DATACRAZY_ATTENDANT_ID: "attendant-1",
  }
  const result = await handleEspecialidadesLead(createRequest(validBody), createContext(), {
    env,
    fetchImpl: async (url, options) => {
      calls.push({ url, options })
      return url.endsWith("/leads")
        ? response(201, { id: "lead-1" })
        : response(201, { id: "business-1" })
    },
  })
  assert.equal(result.status, 200)
  assert.deepEqual(JSON.parse(calls[1].options.body), {
    leadId: "lead-1",
    stageId: "stage-1",
    attendantId: "attendant-1",
    externalId: validBody.submission_id,
  })
})

test("Meta CAPI usa hashes e sua falha não perde o lead", async () => {
  const calls = []
  const env = {
    ...baseEnv,
    ESPECIALIDADES_META_PIXEL_ID: "pixel-1",
    ESPECIALIDADES_META_CAPI_TOKEN: "capi-token",
  }
  const result = await handleEspecialidadesLead(createRequest(validBody), createContext(), {
    env,
    fetchImpl: async (url, options) => {
      calls.push({ url, options })
      return url.includes("graph.facebook.com")
        ? response(500, {})
        : response(201, { id: "lead-1" })
    },
  })
  assert.equal(result.status, 200)
  const metaPayload = JSON.parse(calls[1].options.body)
  assert.equal(metaPayload.data[0].event_id, validBody.submission_id)
  assert.equal(metaPayload.data[0].user_data.ph[0], hashForMeta("5531999999999"))
  assert.equal(metaPayload.data[0].user_data.em[0], hashForMeta("pessoa@exemplo.com"))
})

test("não expõe detalhes internos quando o CRM falha", async () => {
  const result = await handleEspecialidadesLead(createRequest(validBody), createContext(), {
    env: baseEnv,
    fetchImpl: async () => response(429, { secret: "não vazar" }),
  })
  assert.equal(result.status, 502)
  assert.deepEqual(JSON.parse(result.body), { ok: false, error: "crm_unavailable" })
})
