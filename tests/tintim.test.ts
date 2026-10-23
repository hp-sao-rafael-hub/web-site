import assert from "node:assert/strict"
import { test } from "node:test"
import vm from "node:vm"
import {
  HSR_TINTIM_ACCOUNT,
  HSR_WHATSAPP_URL,
  IMD_TINTIM_ACCOUNT,
  IMD_WHATSAPP_URL,
  TINTIM_BOOTSTRAP,
  tintimAccountForPath,
  tintimAttribution,
  withTintimAttribution,
} from "../src/lib/tintim"

test("HSR and IMD account selection covers direct, localized and thank-you routes", () => {
  for (const path of ["/", "/pt/", "/en/", "/pt/servicos/centro-cirurgico/", "/pt/privacidade/", "/para-cirurgioes-parceiros/", "/para-cirurgioes-parceiros/obrigado/"]) {
    assert.equal(tintimAccountForPath(path), HSR_TINTIM_ACCOUNT, path)
  }
  for (const path of ["/pt/servicos/imd/", "/en/servicos/imd/", "/servicos/imd", "/pt/especialidades/cardiologia/", "/en/especialidades/ortopedia/", "/pt/imd/obrigado/", "/en/imd/obrigado/"]) {
    assert.equal(tintimAccountForPath(path), IMD_TINTIM_ACCOUNT, path)
  }
  assert.equal(tintimAccountForPath("/pt/servicos/imd-other/"), HSR_TINTIM_ACCOUNT)
  assert.equal(new URL(HSR_WHATSAPP_URL).pathname.split("/")[2], HSR_TINTIM_ACCOUNT)
  assert.equal(new URL(IMD_WHATSAPP_URL).pathname.split("/")[2], IMD_TINTIM_ACCOUNT)
})

test("cross-account URLs retain attribution, preserve destination values and exclude unrelated data", () => {
  const attribution = tintimAttribution("?utm_source=meta&utm_campaign=imd&fbclid=click-id&tintim_fbid=ad-id&email=private@example.test&nome=Private&text=wrong")
  const destination = new URL(withTintimAttribution("https://hospital.test/pt/servicos/imd/?utm_source=google#contato", attribution))
  assert.equal(destination.searchParams.get("utm_source"), "google")
  assert.equal(destination.searchParams.get("utm_campaign"), "imd")
  assert.equal(destination.searchParams.get("fbclid"), "click-id")
  assert.equal(destination.searchParams.get("tintim_fbid"), "ad-id")
  assert.equal(destination.hash, "#contato")
  for (const key of ["email", "nome", "text"]) assert.equal(destination.searchParams.has(key), false)
})

test("body bootstrap initializes the right account before async core loads, once per document", () => {
  for (const pathname of ["/pt/", "/pt/servicos/imd/", "/en/especialidades/urologia/", "/pt/imd/obrigado/"]) {
    const scripts: { async?: number; src?: string }[] = []
    const browser = {
      location: { pathname },
      tt: undefined as { accountCode: string } | undefined,
    }
    const sandbox = {
      window: browser,
      document: {
        getElementsByTagName: () => [{ appendChild(script: { async?: number; src?: string }) {
          assert.equal(browser.tt?.accountCode, tintimAccountForPath(pathname))
          scripts.push(script)
        } }],
        createElement: () => ({}),
      },
    }
    vm.createContext(sandbox)
    vm.runInContext(TINTIM_BOOTSTRAP, sandbox)
    vm.runInContext(TINTIM_BOOTSTRAP, sandbox)
    assert.equal(scripts.length, 1, pathname)
    assert.equal(scripts[0].src, "//s.tintim.app/static/core/tintim-1.0.js")
    assert.equal(scripts[0].async, 1)
    assert.equal(browser.tt?.accountCode, tintimAccountForPath(pathname))
    assert.equal("c" in sandbox, false)
    assert.equal("k" in sandbox, false)
  }
})
