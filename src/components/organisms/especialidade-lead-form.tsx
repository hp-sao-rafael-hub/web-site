"use client"

import { useId, useRef, useState } from "react"
import { CheckCircle2, LockKeyhole, MessageCircle, Send } from "lucide-react"

import { Button } from "@/components/atoms/button"
import { Heading } from "@/components/atoms/heading"
import { Kicker } from "@/components/atoms/kicker"
import { Link } from "@/i18n/navigation"
import { trackFormLead } from "@/lib/tracking"
import { cn } from "@/lib/utils"

const PRODUCTION_ENDPOINT =
  "https://lp-medicos-leads-hsr-ewdgh3bzhscvaedt.brazilsouth-01.azurewebsites.net/api/especialidades-lead"
const LOCAL_ENDPOINT = "http://localhost:7071/api/especialidades-lead"
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const
const UTM_STORAGE_KEY = "hsr_especialidades_lead_utms"
const PRIVACY_POLICY_VERSION = "privacidade-hsr-2026-09"

interface EspecialidadeLeadFormProps {
  specialtySlug: string
  specialtyName: string
  whatsappHref?: string
  className?: string
}

interface FormValues {
  nome: string
  whatsapp: string
  email: string
  cidade: string
  consentimento: boolean
}

type FieldErrors = Partial<Record<keyof FormValues, string>>
type FormState = "idle" | "submitting" | "success" | "error"

const EMPTY_VALUES: FormValues = {
  nome: "",
  whatsapp: "",
  email: "",
  cidade: "",
  consentimento: true,
}

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits ? `(${digits}` : ""
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`
}

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}
  if (values.nome.trim().length < 3) errors.nome = "Informe seu nome completo."

  const phoneDigits = values.whatsapp.replace(/\D/g, "")
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.whatsapp = "Informe um WhatsApp válido com DDD."
  }

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Informe um e-mail válido."
  }

  if (values.cidade.trim().length < 2) errors.cidade = "Informe sua cidade."
  if (!values.consentimento) errors.consentimento = "Você precisa autorizar o contato."
  return errors
}

function createSubmissionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID()
  return `imd-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function captureUtms(): Record<string, string> {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  const fromUrl = Object.fromEntries(
    UTM_KEYS.filter((key) => params.has(key)).map((key) => [key, params.get(key) ?? ""])
  )

  if (Object.keys(fromUrl).length > 0) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl))
    } catch {
      // O envio continua funcionando quando o storage está indisponível.
    }
    return fromUrl
  }

  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || "{}") as Record<string, string>
  } catch {
    return {}
  }
}

function pushDataLayer(event: string, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const target = window as typeof window & { dataLayer?: unknown[] }
  target.dataLayer = target.dataLayer || []
  target.dataLayer.push({ event, ...payload })
}

function resolveEndpoint(): string {
  const configured = process.env.NEXT_PUBLIC_ESPECIALIDADES_LEAD_API_URL?.trim()
  if (configured) return configured
  if (
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ) {
    return LOCAL_ENDPOINT
  }
  return PRODUCTION_ENDPOINT
}

export function EspecialidadeLeadForm({
  specialtySlug,
  specialtyName,
  whatsappHref = "https://wa.me/5531971511855",
  className,
}: EspecialidadeLeadFormProps) {
  const uid = useId()
  const submissionIdRef = useRef<string | null>(null)
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<FormState>("idle")
  const [honeypot, setHoneypot] = useState("")

  function setField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === "submitting") return

    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (honeypot) {
      setState("success")
      return
    }

    const submissionId = submissionIdRef.current || createSubmissionId()
    submissionIdRef.current = submissionId
    const utms = captureUtms()
    const endpoint = resolveEndpoint()
    const consentedAt = new Date().toISOString()

    pushDataLayer("form_submit", {
      form_id: "especialidade-agendar",
      especialidade: specialtyName,
      especialidade_slug: specialtySlug,
      ...utms,
    })
    setState("submitting")

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12_000)

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        signal: controller.signal,
        body: JSON.stringify({
          nome: values.nome.trim(),
          whatsapp: values.whatsapp.trim(),
          email: values.email.trim(),
          cidade: values.cidade.trim(),
          especialidade_slug: specialtySlug,
          especialidade: specialtyName,
          consentimento: true,
          consentido_em: consentedAt,
          politica_versao: PRIVACY_POLICY_VERSION,
          submission_id: submissionId,
          website: "",
          page_url: window.location.href,
          ...Object.fromEntries(UTM_KEYS.map((key) => [key, utms[key] || ""])),
        }),
      })

      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!response.ok || !result.ok) {
        const requestError = new Error(result.error || "crm_error")
        requestError.name = result.error || "crm_error"
        throw requestError
      }

      trackFormLead({
        origem: "imd-especialidades",
        formId: "especialidade-agendar",
        specialty: specialtyName,
        city: values.cidade.trim(),
        eventId: submissionId,
      })
      pushDataLayer("generate_lead", {
        form_id: "especialidade-agendar",
        especialidade: specialtyName,
        especialidade_slug: specialtySlug,
        event_id: submissionId,
        ...utms,
      })

      submissionIdRef.current = null
      setValues(EMPTY_VALUES)
      setErrors({})
      setState("success")
    } catch (error) {
      const reason = error instanceof Error && error.name === "AbortError" ? "timeout" : "crm_error"
      pushDataLayer("form_error", {
        form_id: "especialidade-agendar",
        especialidade_slug: specialtySlug,
        reason,
        ...utms,
      })
      setState("error")
    } finally {
      window.clearTimeout(timeout)
    }
  }

  const inputStyles = cn(
    "w-full rounded-lg border border-cobre/25 bg-white px-4 py-3 text-base text-charcoal",
    "placeholder:text-charcoal/35 transition-all duration-300",
    "focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/20"
  )

  return (
    <section
      id="formulario"
      aria-labelledby="especialidade-form-heading"
      className={cn("w-full scroll-mt-24 bg-creme py-20 lg:py-30", className)}
    >
      <div className="mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-5 text-center lg:mb-12">
          <Kicker color="cobre">FALE COM A GENTE</Kicker>
          <Heading as="h2" id="especialidade-form-heading" className="!text-3xl lg:!text-4xl">
            Agende seu atendimento em {specialtyName}.
          </Heading>
          <span aria-hidden className="block h-0.5 w-12 bg-cobre" />
          <p className="max-w-[680px] text-base leading-relaxed text-charcoal/75 lg:text-lg">
            Preencha seus dados. Nossa equipe entrará em contato pelo WhatsApp para orientar os
            próximos passos do seu atendimento particular.
          </p>
          <div className="flex max-w-[680px] items-start gap-3 rounded-2xl border border-cobre/15 bg-white/60 p-4 text-left text-sm leading-relaxed text-charcoal/65">
            <LockKeyhole className="mt-0.5 shrink-0 text-cobre" size={18} aria-hidden />
            <span>
              Seus dados seguem com segurança apenas para a equipe responsável pelo atendimento.
            </span>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(46,46,46,0.08)] ring-1 ring-cobre/15 sm:p-8 lg:p-10">
          {state === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="flex min-h-[360px] flex-col items-start justify-center gap-5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-azul/10">
                <CheckCircle2 className="text-azul" size={28} aria-hidden />
              </span>
              <Heading as="h3" className="!text-2xl lg:!text-3xl">
                Dados recebidos.
              </Heading>
              <p className="max-w-[560px] leading-relaxed text-charcoal/70">
                Nossa equipe entrará em contato pelo WhatsApp em breve para orientar seu atendimento
                em {specialtyName}.
              </p>
              <Button
                href={whatsappHref}
                variant="outline"
                size="lg"
                leftIcon={<MessageCircle size={18} aria-hidden />}
              >
                Falar agora no WhatsApp
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <input type="hidden" name="especialidade" value={specialtyName} />
              <input type="hidden" name="especialidade_slug" value={specialtySlug} />
              <div aria-hidden className="absolute -m-px h-px w-px overflow-hidden opacity-0">
                <label htmlFor={`${uid}-website`}>Não preencha este campo</label>
                <input
                  id={`${uid}-website`}
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              <FormField id={`${uid}-nome`} label="Nome completo" error={errors.nome}>
                <input
                  id={`${uid}-nome`}
                  name="nome"
                  type="text"
                  autoComplete="name"
                  minLength={3}
                  maxLength={120}
                  required
                  value={values.nome}
                  onChange={(event) => setField("nome", event.target.value)}
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? `${uid}-nome-error` : undefined}
                  className={cn(inputStyles, errors.nome && "!border-error !ring-error/20")}
                />
              </FormField>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField id={`${uid}-whatsapp`} label="WhatsApp" error={errors.whatsapp}>
                  <input
                    id={`${uid}-whatsapp`}
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(31) 9 0000-0000"
                    required
                    value={values.whatsapp}
                    onChange={(event) => setField("whatsapp", maskPhone(event.target.value))}
                    aria-invalid={!!errors.whatsapp}
                    aria-describedby={errors.whatsapp ? `${uid}-whatsapp-error` : undefined}
                    className={cn(inputStyles, errors.whatsapp && "!border-error !ring-error/20")}
                  />
                </FormField>
                <FormField id={`${uid}-email`} label="E-mail (opcional)" error={errors.email}>
                  <input
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    value={values.email}
                    onChange={(event) => setField("email", event.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                    className={cn(inputStyles, errors.email && "!border-error !ring-error/20")}
                  />
                </FormField>
              </div>

              <FormField id={`${uid}-cidade`} label="Cidade" error={errors.cidade}>
                <input
                  id={`${uid}-cidade`}
                  name="cidade"
                  type="text"
                  autoComplete="address-level2"
                  minLength={2}
                  maxLength={100}
                  required
                  placeholder="Ex.: Belo Horizonte / MG"
                  value={values.cidade}
                  onChange={(event) => setField("cidade", event.target.value)}
                  aria-invalid={!!errors.cidade}
                  aria-describedby={errors.cidade ? `${uid}-cidade-error` : undefined}
                  className={cn(inputStyles, errors.cidade && "!border-error !ring-error/20")}
                />
              </FormField>

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-charcoal/65">
                  <input
                    type="checkbox"
                    name="consentimento"
                    required
                    checked={values.consentimento}
                    onChange={(event) => setField("consentimento", event.target.checked)}
                    aria-invalid={!!errors.consentimento}
                    aria-describedby={
                      errors.consentimento ? `${uid}-consentimento-error` : undefined
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-azul"
                  />
                  <span>
                    Autorizo a equipe do Hospital São Rafael a entrar em contato pelo WhatsApp e a
                    tratar meus dados conforme a{" "}
                    <Link
                      href="/privacidade"
                      className="font-semibold text-azul underline underline-offset-2 hover:text-azul/75"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </span>
                </label>
                <FieldError id={`${uid}-consentimento-error`} message={errors.consentimento} />
              </div>

              {state === "error" && (
                <p
                  role="alert"
                  className="bg-error/8 rounded-lg px-4 py-3 text-sm text-error ring-1 ring-error/20"
                >
                  Não conseguimos registrar seus dados agora. Confira sua conexão e tente novamente
                  ou fale com a equipe pelo WhatsApp.
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={state === "submitting"}
                leftIcon={<Send size={18} aria-hidden />}
                className="w-full sm:w-fit"
              >
                {state === "submitting"
                  ? "Enviando com segurança..."
                  : "Quero agendar meu atendimento"}
              </Button>
              <p className="text-xs leading-relaxed text-charcoal/50">
                Atendimento exclusivamente particular. O envio não confirma consulta nem
                procedimento.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-wide text-charcoal/70"
      >
        {label}
      </label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-medium text-error">
      {message}
    </p>
  )
}
