- source_spec: docs/spec-imd-thank-you.md
  summary: Define stronger deduplication across tabs and confirmed backend retries if required by campaign operations.
  evidence: Same-origin opener windows may clone sessionStorage. The receipt provides same-tab consume-once behavior; platforms receive the same event ID, but CRM idempotency requires an explicit backend/destination contract.
