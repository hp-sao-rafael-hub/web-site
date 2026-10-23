const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

function loadSource(file, dependencies = {}, globals = {}) {
  const source = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  const jsx = (type, props) => ({ type, props });
  vm.runInNewContext(source, {
    exports,
    URL,
    URLSearchParams,
    require(name) {
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      if (Object.hasOwn(dependencies, name)) return dependencies[name];
      throw Error('Unexpected dependency: ' + name);
    },
    ...globals,
  }, { filename: file });
  return exports;
}

const tintim = loadSource('src/lib/tintim.ts');

test('cross-account navigation reloads once; direct visits and same-account navigation keep their document', () => {
  for (const [pathname, installed, expectedReloads] of [
    ['/pt/', undefined, 0],
    ['/pt/servicos/imd/', undefined, 0],
    ['/pt/privacidade/', tintim.HSR_TINTIM_ACCOUNT, 0],
    ['/pt/especialidades/urologia/', tintim.IMD_TINTIM_ACCOUNT, 0],
    ['/pt/imd/obrigado/', tintim.IMD_TINTIM_ACCOUNT, 0],
    ['/pt/servicos/imd/', tintim.HSR_TINTIM_ACCOUNT, 1],
    ['/en/', tintim.IMD_TINTIM_ACCOUNT, 1],
  ]) {
    let reloads = 0;
    const effects = [];
    const { TintimTracking } = loadSource('src/components/TintimTracking.tsx', {
      react: { useEffect: fn => effects.push(fn), useRef: value => ({ current: value }) },
      'next/script': { default: 'Script' },
      'next/navigation': { usePathname: () => pathname },
      '@/lib/tintim': tintim,
    }, { window: { tt: installed ? { accountCode: installed } : undefined, location: { search: '', href: 'https://hospital.test' + pathname, reload: () => reloads++ } } });
    const script = TintimTracking();
    effects.forEach(fn => fn());
    assert.equal(reloads, expectedReloads, pathname);
    assert.equal(script.props.id, 'tintim-tracking');
    assert.equal(script.props.children, tintim.TINTIM_BOOTSTRAP);
  }
});

test('cross-account document replacement carries the original campaign without copying personal query fields', () => {
  let pathname = '/pt/';
  const effects = [], navigations = [], attribution = { current: null };
  const browser = {
    tt: { accountCode: tintim.HSR_TINTIM_ACCOUNT },
    location: { search: '?utm_source=meta&fbclid=click-id&email=private@example.test', href: 'https://hospital.test/pt/?utm_source=meta&fbclid=click-id&email=private@example.test', reload: () => { throw Error('expected replacement with attribution'); }, replace: href => navigations.push(href) },
  };
  const { TintimTracking } = loadSource('src/components/TintimTracking.tsx', {
    react: { useEffect: fn => effects.push(fn), useRef: () => attribution },
    'next/script': { default: 'Script' },
    'next/navigation': { usePathname: () => pathname },
    '@/lib/tintim': tintim,
  }, { window: browser });
  TintimTracking();effects.shift()();
  pathname = '/pt/servicos/imd/';
  browser.location.search = '';
  browser.location.href = 'https://hospital.test' + pathname;
  TintimTracking();effects.shift()();
  assert.equal(navigations.length, 1);
  const destination = new URL(navigations[0]);
  assert.equal(destination.pathname, pathname);
  assert.equal(destination.searchParams.get('utm_source'), 'meta');
  assert.equal(destination.searchParams.get('fbclid'), 'click-id');
  assert.equal(destination.searchParams.has('email'), false);
});

test('institutional header uses the page contact and stays hidden on specialty and thank-you pages', () => {
  for (const [pathname, expectedHref] of [
    ['/pt/', tintim.HSR_WHATSAPP_URL],
    ['/en/servicos/imd/', tintim.IMD_WHATSAPP_URL],
    ['/pt/especialidades/cardiologia/', null],
    ['/en/imd/obrigado/', null],
  ]) {
    const { ConditionalSiteHeader } = loadSource('src/components/molecules/conditional-site-header.tsx', {
      'next/navigation': { usePathname: () => pathname },
      '@/components/organisms/site-header': { SiteHeader: 'SiteHeader' },
      '@/lib/tintim': tintim,
    });
    const header = ConditionalSiteHeader({ navItems: [], cta: { label: 'Atendimento', href: tintim.HSR_WHATSAPP_URL } });
    if (expectedHref) assert.equal(header.props.cta.href, expectedHref, pathname);
    else assert.equal(header, null, pathname);
  }
});

test('delegated WhatsApp conversion still fires for Tintim and ignores unrelated links', () => {
  const effects = [], events = [], listeners = new Map();
  const { WhatsAppTracker } = loadSource('src/components/molecules/whatsapp-tracker.tsx', {
    react: { useEffect: fn => effects.push(fn) },
    '@/lib/tracking': { trackWhatsAppConversion: meta => events.push(meta) },
  }, { document: {
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name, handler) => { assert.equal(listeners.get(name), handler); listeners.delete(name); },
  } });
  WhatsAppTracker({ specialty: 'Cardiologia' });
  const cleanups = effects.map(fn => fn());
  for (const href of [tintim.IMD_WHATSAPP_URL, 'https://wa.me/5511999999999', 'https://api.whatsapp.com/send?phone=5511999999999', 'whatsapp://send?phone=5511999999999', 'https://example.test/', 'https://tintim.link.evil.test/whatsapp/']) {
    listeners.get('click')({ target: { closest: () => ({ getAttribute: () => href, dataset: { ctaLocation: 'hero' } }) } });
  }
  assert.equal(events.length, 4);
  assert.equal(events[0].specialty, 'Cardiologia');
  assert.equal(events[0].href, tintim.IMD_WHATSAPP_URL);
  assert.equal(events[0].location, 'hero');
  cleanups.forEach(fn => fn());
  assert.equal(listeners.size, 0);
});
