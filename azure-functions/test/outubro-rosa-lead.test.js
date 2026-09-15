const assert = require('node:assert/strict');
const test = require('node:test');
const { handleOutubroRosaLead, normalizeBrazilianPhone } = require('../outubro-rosa-lead');

function createContext() {
  const entries = [];
  const log = (...args) => entries.push(['info', ...args]);
  log.error = (...args) => entries.push(['error', ...args]);
  return { log, entries };
}

function createRequest(body, origin = 'https://outubrorosa.hospitalsaorafael.com.br') {
  return {
    method: 'POST',
    headers: new Headers({ origin }),
    json: async () => body,
  };
}

function response(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => (body ? JSON.stringify(body) : ''),
  };
}

const validBody = {
  nome: 'Pessoa de Teste',
  whatsapp: '(31) 9 9999-9999',
  procedimento: 'mastopexia-com-protese',
  consentimento: true,
  submission_id: 'bd8b3788-3881-4fd5-985b-1f86e8a4488e',
  page_url: 'https://outubrorosa.hospitalsaorafael.com.br/?utm_source=meta',
  utm_source: 'meta',
};

const baseEnv = {
  OUTUBRO_ROSA_ALLOWED_ORIGINS: 'https://outubrorosa.hospitalsaorafael.com.br',
  DATACRAZY_TOKEN: 'token-de-teste',
};

test('normaliza telefones brasileiros válidos', () => {
  assert.equal(normalizeBrazilianPhone('(31) 9 9999-9999'), '+5531999999999');
  assert.equal(normalizeBrazilianPhone('+55 31 3333-3333'), '+553133333333');
  assert.equal(normalizeBrazilianPhone('123'), null);
});

test('rejeita origem não autorizada antes de chamar o CRM', async () => {
  let calls = 0;
  const result = await handleOutubroRosaLead(
    createRequest(validBody, 'https://site-malicioso.example'),
    createContext(),
    { env: baseEnv, fetchImpl: async () => { calls += 1; } },
  );
  assert.equal(result.status, 403);
  assert.equal(calls, 0);
});

test('valida nome, WhatsApp, procedimento e consentimento', async () => {
  const result = await handleOutubroRosaLead(
    createRequest({ ...validBody, consentimento: false }),
    createContext(),
    { env: baseEnv, fetchImpl: async () => response(201, {}) },
  );
  assert.equal(result.status, 400);
});

test('cria lead com origem da campanha sem expor o token', async () => {
  const calls = [];
  const result = await handleOutubroRosaLead(
    createRequest(validBody),
    createContext(),
    {
      env: baseEnv,
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        return response(201, { id: 'lead-1' });
      },
    },
  );

  assert.equal(result.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.g1.datacrazy.io/api/v1/leads');
  const payload = JSON.parse(calls[0].options.body);
  assert.equal(payload.phone, '+5531999999999');
  assert.match(payload.source, /LP Outubro Rosa HSR/);
  assert.match(payload.source, /Mastopexia com prótese/);
  assert.equal(calls[0].options.headers.Authorization, 'Bearer token-de-teste');
});

test('usa o webhook configurado sem enviar token ao navegador', async () => {
  const calls = [];
  const env = {
    OUTUBRO_ROSA_ALLOWED_ORIGINS: baseEnv.OUTUBRO_ROSA_ALLOWED_ORIGINS,
    OUTUBRO_ROSA_DATACRAZY_WEBHOOK_URL: 'https://api.datacrazy.io/v1/crm/api/crm/flows/webhooks/test/test',
  };
  const result = await handleOutubroRosaLead(
    createRequest(validBody),
    createContext(),
    {
      env,
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        return response(200, { ok: true });
      },
    },
  );

  assert.equal(result.status, 200);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /api\.datacrazy\.io\/v1\/crm\/api\/crm\/flows\/webhooks/);
  assert.equal(calls[0].options.headers.Authorization, undefined);
  const payload = JSON.parse(calls[0].options.body);
  assert.equal(payload.name, 'Pessoa de Teste');
  assert.equal(payload.phone, '+5531999999999');
  assert.equal(payload.procedureId, 'mastopexia-com-protese');
});

test('cria negócio na etapa configurada sem alterar outras funções', async () => {
  const calls = [];
  const env = {
    ...baseEnv,
    OUTUBRO_ROSA_DATACRAZY_STAGE_ID: 'stage-outubro-rosa',
    OUTUBRO_ROSA_DATACRAZY_ATTENDANT_ID: 'atendente-outubro-rosa',
  };

  const result = await handleOutubroRosaLead(
    createRequest(validBody),
    createContext(),
    {
      env,
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        return url.endsWith('/leads') ? response(201, { id: 'lead-1' }) : response(200, { id: 'business-1' });
      },
    },
  );

  assert.equal(result.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, 'https://api.g1.datacrazy.io/api/v1/businesses');
  assert.deepEqual(JSON.parse(calls[1].options.body), {
    leadId: 'lead-1',
    stageId: 'stage-outubro-rosa',
    attendantId: 'atendente-outubro-rosa',
    externalId: validBody.submission_id,
  });
});

test('não devolve detalhes internos quando o DataCrazy falha', async () => {
  const result = await handleOutubroRosaLead(
    createRequest(validBody),
    createContext(),
    { env: baseEnv, fetchImpl: async () => response(429, { secret: 'não deve vazar' }) },
  );
  assert.equal(result.status, 502);
  assert.deepEqual(JSON.parse(result.body), { ok: false, error: 'crm_unavailable' });
});
