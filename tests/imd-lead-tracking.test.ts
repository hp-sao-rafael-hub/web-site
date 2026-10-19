import test from 'node:test'
import type { TestContext } from 'node:test'
import assert from 'node:assert/strict'
import { trackConfirmedImdLead, type FormLeadMeta } from '../src/lib/tracking'

const meta = {
  origem: 'imd', formId: 'imd-agendar', specialty: 'Cabeça e Pescoço',
  specialtySlug: 'cabeca-pescoco', sourcePath: '/en/especialidades/cabeca-pescoco/',
  eventId: 'original-event-123',
  utms: { utm_source: 'google', utm_campaign: 'imd', name: 'Private Name', phone: '555123', email: 'private@example.test', city: 'Private City' },
}

function browser(t: TestContext) {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const events: Record<string, unknown>[] = []
  const pixels: unknown[][] = []
  const timers: Array<() => void> = []
  const windowMock: {
    dataLayer: { push: (...values: Record<string, unknown>[]) => number },
    fbq?: (...args: unknown[]) => void,
    setTimeout: (callback: () => void, delay: number) => number,
  } = {
    dataLayer: { push: (...values) => events.push(...values) },
    setTimeout(callback, delay) {
      assert.ok(delay > 0)
      timers.push(callback)
      return timers.length
    },
  }
  Object.defineProperty(globalThis, 'window', { configurable: true, value: windowMock })
  t.after(() => {
    if (original) Object.defineProperty(globalThis, 'window', original)
    else Reflect.deleteProperty(globalThis, 'window')
  })
  return { windowMock, events, pixels, timers, fbq: (...args: unknown[]) => { pixels.push(args) } }
}

function assertEvents(events: Record<string, unknown>[]) {
  assert.deepEqual(events.map(event => event.event), ['generate_lead', 'form_lead'])
  for (const event of events) {
    assert.equal(event.event_id, meta.eventId)
    assert.equal(event.especialidade_slug, meta.specialtySlug)
    assert.equal(event.pagina_origem, meta.sourcePath)
    assert.equal(event.origem, meta.origem)
    assert.equal(event.form_id, meta.formId)
  }
  assert.equal(events[0].especialidade, meta.specialty)
  assert.equal(events[1].content_name, meta.specialty)
  assert.equal(events[0].utm_source, 'google')
  assert.equal(events[0].utm_campaign, 'imd')
}

function assertPixel(pixels: unknown[][]) {
  assert.equal(pixels.length, 1)
  const [command, event, payload, options] = pixels[0]
  assert.equal(command, 'track')
  assert.equal(event, 'Lead')
  assert.deepEqual(options, { eventID: meta.eventId })
  assert.equal((payload as Record<string, unknown>).content_name, meta.specialty)
  assert.equal((payload as Record<string, unknown>).especialidade_slug, meta.specialtySlug)
  assert.equal((payload as Record<string, unknown>).pagina_origem, meta.sourcePath)
  assert.equal((payload as Record<string, unknown>).event_id, meta.eventId)
}

function assertNoPersonalValues(value: unknown) {
  const serialized = JSON.stringify(value) ?? ''
  for (const privateValue of ['Private Name', '555123', 'private@example.test', 'Private City']) {
    assert.ok(!serialized.includes(privateValue), `tracking leaked ${privateValue}`)
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (child !== undefined) assert.ok(!['name', 'phone', 'email', 'city'].includes(key), `tracking included ${key}`)
      assertNoPersonalValues(child)
    }
  }
}

test('canonical and legacy events emit synchronously while Pixel is missing', async t => {
  const { events, timers } = browser(t)
  const pending = trackConfirmedImdLead(meta)
  assertEvents(events)
  assert.equal(timers.length, 1)
  await assert.doesNotReject(pending)
})

test('existing Pixel receives exactly one Lead with original metadata and eventID', async t => {
  const { windowMock, events, pixels, timers, fbq } = browser(t)
  windowMock.fbq = fbq
  const pending = trackConfirmedImdLead(meta)
  assertEvents(events)
  assertPixel(pixels)
  assert.equal(timers.length, 0)
  await assert.doesNotReject(pending)
})

test('throwing dataLayer.push neither rejects nor suppresses Pixel delivery', async t => {
  const { windowMock, pixels, fbq } = browser(t)
  windowMock.fbq = fbq
  let pushes = 0
  windowMock.dataLayer.push = () => { pushes++; throw new Error('third-party failure') }
  await assert.doesNotReject(trackConfirmedImdLead(meta))
  assert.equal(pushes, 2)
  assertPixel(pixels)
})

test('Pixel arriving after a queued retry receives one Lead without repeating dataLayer events', async t => {
  const { windowMock, events, pixels, timers, fbq } = browser(t)
  await trackConfirmedImdLead(meta)
  assertEvents(events)
  assert.equal(pixels.length, 0)
  assert.equal(timers.length, 1)
  timers.shift()!()
  assert.equal(timers.length, 1)
  windowMock.fbq = fbq
  timers.shift()!()
  assertPixel(pixels)
  assert.equal(timers.length, 0)
  assertEvents(events)
})

test('confirmed tracking excludes personal fields from dataLayer and Pixel', async t => {
  const { windowMock, events, pixels, fbq } = browser(t)
  windowMock.fbq = fbq
  const contaminated: FormLeadMeta & { name: string; phone: string; email: string } = {
    ...meta, name: 'Private Name', phone: '555123', email: 'private@example.test', city: 'Private City',
  }
  await trackConfirmedImdLead(contaminated)
  assertNoPersonalValues(events)
  assertNoPersonalValues(pixels)
})

test('delayed Pixel delivery also excludes personal fields', async t => {
  const { windowMock, pixels, timers, fbq } = browser(t)
  await trackConfirmedImdLead({ ...meta, city: 'Private City' })
  windowMock.fbq = fbq
  timers.shift()!()
  assertPixel(pixels)
  assertNoPersonalValues(pixels)
})
