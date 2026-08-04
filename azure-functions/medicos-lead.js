const { app } = require('@azure/functions');

app.http('medicos-lead', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const cors = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };

        if (request.method === 'OPTIONS') {
            return { status: 200, headers: cors };
        }

        let body;
        try { body = await request.json(); }
        catch { try { body = JSON.parse(await request.text()); } catch { body = {}; } }

        const { nome, whatsapp, email, especialidade, cidade, origem, utm_source } = body;

        if (!nome || !whatsapp) {
            return { status: 400, headers: cors, body: JSON.stringify({ error: 'campos obrigatorios ausentes' }) };
        }

        // Rotulo de origem por formulario. 'lp-medicos' mantem o valor historico
        // para nao quebrar a segmentacao ja existente no CRM.
        const ORIGENS = {
            'lp-medicos': 'LP B2B HSR',
            'imd': 'Site HSR | IMD'
        };

        const lead = {
            name: nome,
            phone: whatsapp,
            source: (utm_source || ORIGENS[origem] || 'LP B2B HSR') + (especialidade ? ' | ' + especialidade : ''),
            address: { city: cidade || '', country: 'BR' }
        };

        if (email) lead.email = email;

        try {
            const r = await fetch('https://api.g1.datacrazy.io/api/v1/leads', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + process.env.DATACRAZY_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lead)
            });
            const txt = await r.text();
            context.log('DataCrazy:', r.status, txt);

            if (r.ok && process.env.DATACRAZY_WEBHOOK) {
                fetch(process.env.DATACRAZY_WEBHOOK, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(lead)
                }).catch(e => context.log.error('Webhook error:', e.message));
            }

            return {
                status: r.ok ? 200 : 502,
                headers: cors,
                body: JSON.stringify(r.ok ? { ok: true } : { error: txt })
            };
        } catch (e) {
            context.log.error(e.message);
            return { status: 500, headers: cors, body: JSON.stringify({ error: e.message }) };
        }
    }
});
