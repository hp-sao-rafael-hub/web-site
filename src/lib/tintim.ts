export const HSR_TINTIM_ACCOUNT = "91b21cef-3979-4cb9-a940-226ea06882bd"
export const IMD_TINTIM_ACCOUNT = "bc79e3d5-fa1f-4df1-9e09-b9d9c9d151a7"

export const HSR_WHATSAPP_URL =
  `https://tintim.link/whatsapp/${HSR_TINTIM_ACCOUNT}/e6ec7ff4-ccdc-4bd5-8d78-c78f05644db0`
export const IMD_WHATSAPP_URL =
  `https://tintim.link/whatsapp/${IMD_TINTIM_ACCOUNT}/93b72821-06ae-4718-be0d-f3a8767d367b`

// IMD service, specialty landing pages and their shared thank-you destination.
const IMD_PATH = /^\/(?:(?:pt|en)\/)?(?:servicos\/imd(?:\/|$)|especialidades(?:\/|$)|imd(?:\/|$))/

export function tintimAccountForPath(pathname: string): string {
  return IMD_PATH.test(pathname) ? IMD_TINTIM_ACCOUNT : HSR_TINTIM_ACCOUNT
}

export function tintimAttribution(search: string): URLSearchParams {
  const attribution = new URLSearchParams()
  for (const [name, value] of new URLSearchParams(search)) {
    if (/^(utm_[a-z0-9_]+|gclid|gbraid|wbraid|fbclid|msclkid|tintim_[a-z0-9_]+)$/i.test(name)) {
      attribution.set(name, value)
    }
  }
  return attribution
}

export function withTintimAttribution(href: string, attribution: URLSearchParams): string {
  const destination = new URL(href)
  for (const [name, value] of attribution) {
    if (!destination.searchParams.has(name)) destination.searchParams.set(name, value)
  }
  return destination.href
}

// Runs in the body on the browser; account selection happens before loading core.
export const TINTIM_BOOTSTRAP = `(function(window, document, script) {
  var accountCode = ${IMD_PATH}.test(window.location.pathname) ? '${IMD_TINTIM_ACCOUNT}' : '${HSR_TINTIM_ACCOUNT}';
  if (!window.tt) {
    window.tt = {};
    window.tt.accountCode = accountCode;
    var c = document.getElementsByTagName('head')[0];
    var k = document.createElement('script');
    k.async = 1;
    k.src = script;
    c.appendChild(k);
  }
  window.tt.accountCode = accountCode;
})(window, document, '//s.tintim.app/static/core/tintim-1.0.js');`
