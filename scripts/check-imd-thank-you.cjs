const { chromium } = require('playwright');
const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../out');
const specialties = ['ortopedia', 'cardiologia', 'neurocirurgia', 'urologia', 'ginecologia', 'dermatologia', 'cirurgia-geral', 'cirurgia-plastica', 'cirurgia-vascular', 'cabeca-pescoco', 'mastologia', 'otorrinolaringologia', 'clinica-dor'];
const server = createServer(async (req,res) => {
  let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (name.endsWith('/')) name += 'index.html';
  try {
    const content = await readFile(path.join(root, name));
    res.writeHead(200, { 'Content-Type': { '.html': 'text/html', '.txt': 'text/x-component', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.ttf': 'font/ttf' }[path.extname(name)] || 'application/octet-stream' }); res.end(content);
  } catch { res.writeHead(404); res.end(); }
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}), headless: true });
  try {
    const context = await browser.newContext({ locale: 'pt-BR', viewport: { width: 1440, height: 1000 } });
    await context.addInitScript(() => {
      window.__pixels = []; window.__ads = [];
      window.fbq = (...args) => window.__pixels.push(args);
      window.gtag = (...args) => window.__ads.push(args);
    });
    let status = 200, responseBody = { ok: true }, body;
    await context.route('**/*', route => {
      const url = route.request().url();
      if (url.includes('/api/especialidades-lead')) {
        body = route.request().postDataJSON();
        return route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(responseBody) });
      }
      if (!url.startsWith(origin)) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    async function fillAndSend(target = page) {
      const form = target.locator('#formulario form');
      await form.locator('input[name=nome]').fill('Teste Local IMD');
      await form.locator('input[name=whatsapp]').fill('31999999999');
      await form.locator('input[name=cidade]').fill('Belo Horizonte / MG');
      await form.locator('input[type=checkbox]').check();
      await form.locator('button[type=submit]').click();
    }
    for (const slug of specialties) {
      await page.goto(`${origin}/pt/especialidades/${slug}/?utm_source=meta&utm_content=creative-test&email=never-copy`);
      await fillAndSend();
      await page.waitForURL(url => url.pathname === '/pt/imd/obrigado/');
      await page.locator(`[data-specialty="${slug}"]`).waitFor();
      const events = await page.evaluate(() => window.dataLayer.filter(e => e.event === 'generate_lead'));
      assert.equal(events.length, 1, slug);
      assert.equal(events[0].especialidade_slug, slug);
      assert.equal(events[0].especialidade, body.especialidade);
      assert.equal(events[0].event_id, body.submission_id);
      assert.equal(events[0].pagina_origem, `/pt/especialidades/${slug}/`);
      assert.equal(events[0].utm_source, 'meta');
      assert.equal(body.especialidade_slug, slug);
      assert.equal(new URL(body.page_url).pathname, `/pt/especialidades/${slug}/`);
      assert.equal(new URL(page.url()).searchParams.has('email'), false);
      assert.equal(await page.evaluate(() => window.dataLayer.filter(e => e.event === 'form_lead').length), 1);
      assert.equal(await page.evaluate(() => window.__pixels.filter(e => e[1] === 'Lead').length), 1);
      assert.equal(await page.evaluate(() => sessionStorage.getItem('hsr_imd_pending_lead')), null);
      console.log('PASS specialty:', slug);
    }
    for (const [width,height] of [[1440,1000],[390,844],[320,640]]) {
      await page.setViewportSize({width,height});
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.screenshot({path:path.join(require('node:os').tmpdir(), `imd-obrigado-${width}.png`),fullPage:true});
    }
    await page.reload();
    assert.equal(await page.evaluate(() => window.dataLayer.filter(e => e.event === 'generate_lead').length), 0);
    await page.locator('[data-specialty=clinica-dor]').waitFor();
    await page.goto(origin + '/pt/imd/obrigado/?especialidade=cardiologia');
    await page.locator('[data-specialty=cardiologia]').waitFor();
    assert.equal(await page.evaluate(() => window.dataLayer.filter(e => e.event === 'generate_lead').length), 0);
    status = 502; responseBody = {ok:false};
    await page.goto(origin + '/pt/especialidades/cardiologia/');
    await fillAndSend();
    await page.locator('#formulario [role=alert]').waitFor();
    assert.equal(new URL(page.url()).pathname, '/pt/especialidades/cardiologia/');
    assert.equal(await page.evaluate(() => window.dataLayer.filter(e => e.event === 'generate_lead').length), 0);
    const failedId = body.submission_id;
    status = 200; responseBody = {ok:true};
    await page.locator('#formulario button[type=submit]').click();
    await page.waitForURL(url => url.pathname === '/pt/imd/obrigado/');
    assert.equal(body.submission_id, failedId);
    // A truthy non-boolean ok must not be treated as successful registration.
    await page.goto(origin + '/pt/especialidades/urologia/');
    responseBody = {ok:'false'};
    await fillAndSend(); await page.locator('#formulario [role=alert]').waitFor();
    assert.equal(new URL(page.url()).pathname, '/pt/especialidades/urologia/');
    responseBody = {ok:true};
    const blocked = await context.newPage();
    const blockedErrors=[]; blocked.on('pageerror',e=>blockedErrors.push(e.message));
    await blocked.addInitScript(() => {
      Storage.prototype.getItem = Storage.prototype.setItem = Storage.prototype.removeItem = () => { throw Error('Storage blocked'); };
    });
    await blocked.goto(origin + '/pt/especialidades/ortopedia/');
    await fillAndSend(blocked); await blocked.waitForURL(url => url.pathname === '/pt/imd/obrigado/');
    await blocked.locator('[data-specialty=ortopedia]').waitFor();
    assert.equal(await blocked.evaluate(() => window.dataLayer.filter(e => e.event === 'generate_lead').length), 1);
    assert.equal(await blocked.evaluate(() => window.__pixels.filter(e => e[1] === 'Lead').length), 1);
    await blocked.reload();
    assert.equal(await blocked.evaluate(() => (window.dataLayer || []).filter(e => e.event === 'generate_lead').length), 0);
    assert.deepEqual(blockedErrors, []);
    // English routes use the same specialty contract and localized thank-you path.
    await page.goto(origin + '/en/especialidades/cardiologia/');
    await fillAndSend(); await page.waitForURL(url => url.pathname === '/en/imd/obrigado/');
    await page.locator('[data-specialty=cardiologia]').waitFor();
    assert.match(await page.locator('h1').textContent(), /received your request/);
    assert.deepEqual(errors, []);
    const robots = await page.locator('meta[name=robots]').getAttribute('content');
    assert.match(robots,/noindex/); assert.match(robots,/nofollow/);
    console.log('PASS: all 13 mapped forms, stable event IDs, direct/reload, failure/retry, strict ok, blocked storage, English, noindex, 320/390/1440px. External services blocked; no real leads.');
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode=1; });
