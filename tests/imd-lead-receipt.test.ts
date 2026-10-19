import test from 'node:test'
import assert from 'node:assert/strict'
import type { EspecialidadeLPData } from '../src/lib/data/especialidades-lp'
import {
  type ImdLeadReceipt,
  IMD_RECEIPT_KEY,
  saveImdReceipt,
  consumeImdReceipt,
  readImdView,
  parseImdReceipt,
  imdThankYouUrl,
} from '../src/lib/imd-lead-receipt'

// Explicit fixtures keep the content module out of the runtime dependency graph.
const specialties: Array<Pick<EspecialidadeLPData, 'slug' | 'termo'>> = [
  { slug: 'ortopedia', termo: 'Ortopedia' },
  { slug: 'cardiologia', termo: 'Cardiologia' },
  { slug: 'neurocirurgia', termo: 'Neurocirurgia' },
  { slug: 'urologia', termo: 'Urologia' },
  { slug: 'ginecologia', termo: 'Ginecologia' },
  { slug: 'dermatologia', termo: 'Dermatologia' },
  { slug: 'cirurgia-geral', termo: 'Cirurgia Geral' },
  { slug: 'cirurgia-plastica', termo: 'Cirurgia Plástica' },
  { slug: 'cirurgia-vascular', termo: 'Cirurgia Vascular' },
  { slug: 'cabeca-pescoco', termo: 'Cabeça e Pescoço' },
  { slug: 'mastologia', termo: 'Mastologia' },
  { slug: 'otorrinolaringologia', termo: 'Otorrinolaringologia' },
  { slug: 'clinica-dor', termo: 'Clínica da Dor' },
]

class MemoryStorage {
  values = new Map<string, string>()
  getItem(key: string): string | null { return this.values.get(key) ?? null }
  setItem(key: string, value: string): void { this.values.set(key, value) }
  removeItem(key: string): void { this.values.delete(key) }
}

function receipt(overrides: Partial<ImdLeadReceipt> = {}): ImdLeadReceipt {
  return {
    version: 1, eventId: 'lead-123_abc', specialtySlug: 'ortopedia',
    specialtyName: 'Ortopedia', sourcePath: '/pt/especialidades/ortopedia/',
    locale: 'pt', createdAt: Date.now(), utms: { utm_source: 'google' },
    ...overrides,
  }
}

for (const { slug, termo } of specialties) {
  for (const locale of ['pt', 'en'] as const) {
    test(`${locale}: ${slug}/${termo} survives consumption and repeated mounts`, () => {
      const storage = new MemoryStorage()
      const value = receipt({ specialtySlug: slug, specialtyName: termo, locale,
        sourcePath: `/${locale}/especialidades/${slug}/` })
      assert.deepEqual(parseImdReceipt(JSON.stringify(value), locale), value)
      assert.equal(saveImdReceipt(value, storage), true)
      assert.deepEqual(consumeImdReceipt(storage, locale), value)
      assert.equal(storage.getItem(IMD_RECEIPT_KEY), null)
      for (let mount = 0; mount < 3; mount++) {
        assert.equal(consumeImdReceipt(storage, locale), null)
        assert.deepEqual(readImdView(storage, locale), value)
      }
      assert.equal(readImdView(storage, locale === 'pt' ? 'en' : 'pt'), null)
      const url = new URL(imdThankYouUrl(value, `https://hospital.example${value.sourcePath}`), 'https://hospital.example')
      assert.equal(url.pathname, `/${locale}/imd/obrigado/`)
      assert.equal(url.searchParams.get("especialidade"), slug)
    })
  }
}

test('age boundaries accept 30 minutes and reject expired or future receipts', () => {
  const now = 2_000_000_000_000
  for (const age of [0, 30 * 60 * 1000]) {
    const value = receipt({ createdAt: now - age })
    assert.deepEqual(parseImdReceipt(JSON.stringify(value), 'pt', now), value)
  }
  for (const createdAt of [now + 1, now - 30 * 60 * 1000 - 1]) {
    assert.equal(parseImdReceipt(JSON.stringify(receipt({ createdAt })), 'pt', now), null)
  }
})

test('malformed payloads and invalid fields are rejected', () => {
  for (const raw of [null, '', '{', 'null', '[]', 'true', '42', '"text"']) {
    assert.equal(parseImdReceipt(raw, 'pt'), null, String(raw))
  }
  for (const patch of [
    { version: 2 }, { eventId: '' }, { eventId: '../bad' }, { eventId: 'x'.repeat(101) },
    { specialtySlug: '../ortopedia' }, { specialtySlug: 'Ortopedia' },
    { specialtyName: '' }, { specialtyName: '  ' }, { specialtyName: 'x'.repeat(121) },
    { createdAt: null }, { createdAt: '123' }, { locale: 'fr' },
  ]) {
    assert.equal(parseImdReceipt(JSON.stringify({ ...receipt(), ...patch }), 'pt'), null, JSON.stringify(patch))
  }
  assert.equal(parseImdReceipt(JSON.stringify(receipt()), 'en'), null)
})

test('source paths must exactly match locale and specialty without redirects or queries', () => {
  for (const sourcePath of [
    '/en/especialidades/ortopedia/', '/pt/especialidades/cardiologia/',
    '/pt/especialidades/ortopedia', 'https://evil.example/pt/especialidades/ortopedia/',
    '//evil.example/pt/especialidades/ortopedia/', '/pt/especialidades/../ortopedia/',
    '/pt/especialidades/%2e%2e/ortopedia/', '/pt/especialidades/ortopedia/?name=Ana',
    '/pt/especialidades/ortopedia/#fragment', '/pt\\especialidades\\ortopedia\\',
  ]) {
    const value = receipt({ sourcePath })
    assert.equal(parseImdReceipt(JSON.stringify(value), 'pt'), null, sourcePath)
    assert.equal(saveImdReceipt(value, new MemoryStorage()), false, sourcePath)
  }
})

test('invalid pending receipts are discarded and never become a view', () => {
  for (const value of [receipt({ createdAt: Date.now() - 1_800_001 }), receipt({ createdAt: Date.now() + 60_000 }), receipt({ sourcePath: '/unsafe/' }), receipt({ locale: 'en', sourcePath: '/en/especialidades/ortopedia/' })]) {
    const storage = new MemoryStorage()
    storage.setItem(IMD_RECEIPT_KEY, JSON.stringify(value))
    assert.equal(consumeImdReceipt(storage, 'pt'), null)
    assert.equal(storage.getItem(IMD_RECEIPT_KEY), null)
    assert.equal(readImdView(storage, 'pt'), null)
  }
})

test('disabled storage operations return safe results without throwing', () => {
  const disabled = {
    getItem(): never { throw new Error('disabled') },
    setItem(): never { throw new Error('disabled') },
    removeItem(): never { throw new Error('disabled') },
  }
  assert.equal(saveImdReceipt(receipt(), disabled), false)
  assert.equal(consumeImdReceipt(disabled, 'pt'), null)
  assert.equal(readImdView(disabled, 'pt'), null)
  const storage = new MemoryStorage()
  assert.equal(saveImdReceipt(receipt(), storage), true)
  storage.removeItem = () => { throw new Error('remove disabled') }
  assert.equal(consumeImdReceipt(storage, 'pt'), null)
})

test('view persistence failure still consumes conversion exactly once', () => {
  const storage = new MemoryStorage()
  const value = receipt()
  assert.equal(saveImdReceipt(value, storage), true)
  storage.setItem = () => { throw new Error('quota exceeded') }
  assert.deepEqual(consumeImdReceipt(storage, 'pt'), value)
  assert.equal(consumeImdReceipt(storage, 'pt'), null)
  assert.equal(readImdView(storage, 'pt'), null)
})

test('parsing and saving retain only allowed receipt fields and bounded UTM strings', () => {
  const value = { ...receipt(), name: 'Ana', phone: '555123', sourceUrl: 'https://example.test/?name=Ana',
    utms: { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'imd', utm_content: 'x'.repeat(201), utm_term: 'consulta', name: 'Ana', phone: '555123', gclid: 'click', invalid: 42 } }
  const expected = receipt({ createdAt: value.createdAt, utms: {
    utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'imd', utm_content: 'x'.repeat(200), utm_term: 'consulta',
  } })
  assert.deepEqual(parseImdReceipt(JSON.stringify(value), 'pt'), expected)
  const storage = new MemoryStorage()
  assert.equal(saveImdReceipt(value as unknown as ImdLeadReceipt, storage), true)
  assert.deepEqual(JSON.parse(storage.getItem(IMD_RECEIPT_KEY)!), expected)
  assert.deepEqual(consumeImdReceipt(storage, 'pt'), expected)
  assert.deepEqual(readImdView(storage, 'pt'), expected)
  assert.deepEqual(parseImdReceipt(JSON.stringify(receipt({ utms: { utm_source: 42 } as unknown as Record<string, string> })), 'pt')?.utms, {})
})

test('thank-you URLs copy only attribution, prefer source attribution, and stay internal', () => {
  const value = receipt({ utms: { utm_source: 'fallback', utm_campaign: 'receipt campaign', name: 'Ana', phone: '555' } })
  const result = imdThankYouUrl(value, 'https://evil.example/anything?utm_source=google&utm_medium=cpc&utm_content=hero&utm_term=consulta&gclid=g&fbclid=f&wbraid=w&gbraid=b&name=Ana&phone=555&sourceUrl=https%3A%2F%2Fevil.example&next=%2F%2Fevil.example#private')
  assert.ok(result.startsWith('/pt/imd/obrigado/?'))
  assert.ok(!result.startsWith('//'))
  const url = new URL(result, 'https://hospital.example')
  assert.equal(url.origin, 'https://hospital.example')
  assert.equal(url.hash, '')
  assert.deepEqual(Object.fromEntries(url.searchParams), {
    especialidade: 'ortopedia', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'receipt campaign',
    utm_content: 'hero', utm_term: 'consulta', gclid: 'g', fbclid: 'f', wbraid: 'w', gbraid: 'b',
  })
})

test('public specialty fallback alone never authorizes a conversion', () => {
  const storage = new MemoryStorage()
  const url = new URL(imdThankYouUrl(receipt(), 'https://hospital.example/?especialidade=cardiologia'), 'https://hospital.example')
  assert.equal(url.searchParams.get('especialidade'), 'ortopedia')
  assert.equal(consumeImdReceipt(storage, 'pt'), null)
  assert.equal(readImdView(storage, 'pt'), null)
  assert.equal(parseImdReceipt(JSON.stringify(Object.fromEntries(url.searchParams)), 'pt'), null)
})
