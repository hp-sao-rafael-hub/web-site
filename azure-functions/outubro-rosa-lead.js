const { app } = require('@azure/functions');

const DATACRAZY_API_URL = 'https://api.g1.datacrazy.io/api/v1';
const SOURCE_LABEL = 'LP Outubro Rosa HSR';
const REQUEST_TIMEOUT_MS = 10000;

const PROCEDURES = Object.freeze({
  'mastopexia-com-protese': 'Mastopexia com prótese',
  'mastopexia-sem-protese': 'Mastopexia sem prótese',
  'mamoplastia-de-aumento': 'Mamoplastia de aumento',
});

function parseAllowedOrigins(env) {
  return (env.OUTUBRO_ROSA_ALLOWED_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function buildHeaders(origin, allowedOrigins) {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    Vary: 'Origin',
  };
  if (origin && allowedOrigins.includes(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function jsonResponse(status, body, headers) {
  return { status, headers, body: JSON.stringify(body) };
}

function sanitizeText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function normalizeBrazilianPhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) digits = digits.slice(2);
  if (digits.length !== 10 && digits.length !== 11) return null;
  return `+55${digits}`;
}

function normalizePageUrl(value) {
  const rawUrl = sanitizeText(value, 1000);
  if (!rawUrl) return null;
  try {
    const parsed = new URL(rawUrl);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.toString() : null;
  } catch {
    return null;
  }
}

function extractLeadId(payload) {
  return payload?.id || payload?.lead?.id || payload?.data?.id || null;
}

async function postDataCrazy(path, payload, token, fetchImpl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetchImpl(`${DATACRAZY_API_URL}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const text = await response.text();
    let data = null;
    if (text) {
      try { data = JSON.parse(text); }
      catch { data = null; }
    }
    if (!response.ok) {
      const error = new Error('datacrazy_request_failed');
      error.status = response.status;
      throw error;
    }
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

async function postDataCrazyWebhook(payload, webhookUrl, fetchImpl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetchImpl(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) {
      const error = new Error('datacrazy_webhook_failed');
      error.status = response.status;
      throw error;
    }
  } finally {
    clearTimeout(timeout);
  }
}

async function handleOutubroRosaLead(request, context, dependencies = {}) {
  const env = dependencies.env || process.env;
  const fetchImpl = dependencies.fetchImpl || globalThis.fetch;
  const origin = request.headers?.get?.('origin') || '';
  const allowedOrigins = parseAllowedOrigins(env);
  const headers = buildHeaders(origin, allowedOrigins);

  if (origin && !allowedOrigins.includes(origin)) {
    return jsonResponse(403, { ok: false, error: 'origin_not_allowed' }, headers);
  }

  if (request.method === 'OPTIONS') return { status: 204, headers };

  let body;
  try { body = await request.json(); }
  catch { return jsonResponse(400, { ok: false, error: 'invalid_json' }, headers); }

  if (sanitizeText(body.website, 200)) return jsonResponse(200, { ok: true }, headers);

  const name = sanitizeText(body.nome, 120);
  const phone = normalizeBrazilianPhone(body.whatsapp);
  const procedureLabel = PROCEDURES[body.procedimento];

  if (name.length < 3 || !phone || !procedureLabel || body.consentimento !== true) {
    return jsonResponse(400, { ok: false, error: 'invalid_fields' }, headers);
  }

  const token = sanitizeText(env.DATACRAZY_TOKEN, 500);
  const webhookUrl = sanitizeText(env.OUTUBRO_ROSA_DATACRAZY_WEBHOOK_URL, 2000);
  if ((!token && !webhookUrl) || typeof fetchImpl !== 'function') {
    context.log.error('Configuração do DataCrazy ausente na função Outubro Rosa.');
    return jsonResponse(500, { ok: false, error: 'integration_not_configured' }, headers);
  }

  const utmSource = sanitizeText(body.utm_source, 80);
  const pageUrl = normalizePageUrl(body.page_url);
  const attendantId = sanitizeText(env.OUTUBRO_ROSA_DATACRAZY_ATTENDANT_ID, 100);
  const stageId = sanitizeText(env.OUTUBRO_ROSA_DATACRAZY_STAGE_ID, 100);
  const submissionId = sanitizeText(body.submission_id, 100);
  const source = [SOURCE_LABEL, procedureLabel, utmSource && `Origem: ${utmSource}`].filter(Boolean).join(' | ');

  const webhookPayload = {
    name,
    nome: name,
    phone,
    whatsapp: phone,
    procedure: procedureLabel,
    procedureId: sanitizeText(body.procedimento, 80),
    procedimento: sanitizeText(body.procedimento, 80),
    source,
    pageUrl,
    submissionId: submissionId || null,
    consent: body.consentimento === true,
    consentimento: true,
    utm: {
      source: sanitizeText(body.utm_source, 80) || null,
      medium: sanitizeText(body.utm_medium, 80) || null,
      campaign: sanitizeText(body.utm_campaign, 120) || null,
    },
  };

  const lead = {
    name,
    phone,
    source,
    address: { country: 'BR' },
  };
  if (pageUrl) lead.sourceReferral = { sourceUrl: pageUrl };
  if (attendantId) lead.attendant = { id: attendantId };

  try {
    if (webhookUrl) {
      await postDataCrazyWebhook(webhookPayload, webhookUrl, fetchImpl);
      context.log('Lead Outubro Rosa enviado ao webhook do DataCrazy.');
      return jsonResponse(200, { ok: true }, headers);
    }

    const leadResult = await postDataCrazy('/leads', lead, token, fetchImpl);
    let businessCreated = false;

    if (stageId) {
      const leadId = extractLeadId(leadResult);
      if (!leadId) {
        context.log.error('DataCrazy não retornou o ID necessário para criar o negócio da campanha.');
        return jsonResponse(502, { ok: false, error: 'crm_stage_not_created' }, headers);
      }
      const business = { leadId, stageId };
      if (attendantId) business.attendantId = attendantId;
      if (submissionId) business.externalId = submissionId;
      await postDataCrazy('/businesses', business, token, fetchImpl);
      businessCreated = true;
    }

    context.log('Lead Outubro Rosa registrado no DataCrazy.', { businessCreated });
    return jsonResponse(200, { ok: true }, headers);
  } catch (error) {
    context.log.error('Falha ao registrar lead Outubro Rosa no DataCrazy.', {
      status: error.status || null,
      type: error.name,
    });
    const status = error.name === 'AbortError' ? 504 : 502;
    return jsonResponse(status, { ok: false, error: status === 504 ? 'crm_timeout' : 'crm_unavailable' }, headers);
  }
}

app.http('outubro-rosa-lead', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: (request, context) => handleOutubroRosaLead(request, context),
});

module.exports = {
  PROCEDURES,
  handleOutubroRosaLead,
  normalizeBrazilianPhone,
};
