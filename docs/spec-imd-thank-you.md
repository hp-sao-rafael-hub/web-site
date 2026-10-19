---
title: Shared IMD specialty thank-you page
type: feature
created: 2026-10-19
status: done
route: oneshot
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent">

## Intent

All 13 existing IMD specialty forms must navigate to a beautiful, simple shared thank-you page after confirmed CRM submission. Preserve the originating specialty and submission identifier in the CRM request and conversion metadata. Prevent conversion replay on refresh or direct visits. Follow the institutional design system, with optional return navigation and no automatic WhatsApp/Tintim redirect. Preserve unrelated work, and do not publish or change external accounts.

</frozen-after-approval>

## Implementation Notes

- Correct baseline found on current origin/main, commit 141d085 (merged specialty forms). Work in /tmp/hsr-imd-obrigado, branch feat/obrigado-especialidades-imd, leaving the original checkout untouched.
- Existing especialidades-lead API already validates specialty/page pairs and forwards specialty name/slug and submission ID. No backend contract changes are needed for this feature.
- Add a route under /[locale]/imd/obrigado, and a short-lived channel-specific receipt containing only conversion metadata, a validated internal source path and attribution. Separate display context from the single-use pending conversion.
- Preserve the existing direct platform calls and legacy form_lead event, moved from the successful form to the receipt consumer; preserve generate_lead with specialty name/slug and the original event ID. Document that GTM must not configure both events as independent conversions.
- Storage failure reports once on the confirmed form path before navigating. Invalid/expired/direct visits never produce conversions. Honeypot responses do not create receipts.
- Use native tests for receipt semantics and mocked browser tests across all specialty forms; run typecheck, function tests and static build. Validate exported localized routes/noindex, failure/retry, reload/back, blocked storage and mobile layout. No real leads.
- Public specialty slug in thank-you URL is display-only fallback; canonical record validates labels/return paths. The parameter cannot authorize conversion.
- Existing specialty CRM payload is unchanged. City remains in CRM but is intentionally omitted from the new receipt and specialty conversion metadata.
- Verification: 41 receipt/tracking tests passed, function regression tests passed, TypeScript passed and the production static build exported both localized thank-you routes. Mocked browser submissions passed for all 13 specialties, failure/retry, strict boolean API success, reload/direct visit, blocked storage, English, noindex/nofollow and 320/390/1440px layout. Existing unrelated build warnings remain unchanged.

## Review Triage Log

- medium / patched: blocked storage hid the specialty; allowlisted display-only specialty slug now preserves UI context without authorizing conversions.
- medium / patched: waiting for Pixel delayed all legacy calls after consuming the receipt; canonical and legacy/Google dispatch are now immediate, with an optional Meta-only retry. Actual delivery remains best effort.
- medium / deferred: tab-cloned sessionStorage can replay a pending receipt across tabs. Scope guarantees same-tab refresh/direct-visit protection, not cross-tab or CRM idempotency. Shared IDs support platform deduplication; stronger server-side idempotency is outside this frontend change.
- low / rejected: removed city tracking is deliberate data minimization, not loss of CRM attribution. City is still in the unchanged CRM request; specialty and ID remain in conversion metadata.
- medium / patched: third-party dataLayer failures could reject the post-success fallback. Canonical dispatch is now isolated and cannot prevent the remaining platform calls or navigation.
- medium / patched on follow-up: an old display receipt could override a new submission when storage writes fail. The current URL's allowlisted display specialty takes precedence over old display-only context; it still cannot authorize conversion.
