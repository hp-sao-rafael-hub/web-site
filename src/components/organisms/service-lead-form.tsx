"use client"

// =============================================================================
// SERVICE-LEAD-FORM.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Formulário de captação de leads para páginas /servicos/[slug].
// Segue o mesmo padrão visual do ServiceInlineCta: card sobre fundo de seção,
// kicker + headline + divisor, CTA primary. Cantos e transições do DNA HSR.
//
// Campos: nome, WhatsApp, e-mail (opcional), especialidade/procedimento, cidade.
// Envio: POST para a Azure Function de leads (mesma da LP B2B) → CRM DataCrazy.
// Pós-envio: confirmação inline, sem sair da página.
// =============================================================================

import { useId, useState } from "react"
import { ChevronDown, CheckCircle2, MessageCircle, Send } from "lucide-react"

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Button } from "@/components/atoms/button"
import { ESPECIALIDADES_DATA } from "@/lib/constants"
import { trackFormLead } from "@/lib/tracking"
import type { BaseComponentProps } from "@/types"
import type { ServiceLeadFormData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// CONSTANTES
// -----------------------------------------------------------------------------
const DEFAULT_ENDPOINT =
  "https://lp-medicos-leads-hsr-ewdgh3bzhscvaedt.brazilsouth-01.azurewebsites.net/api/medicos-lead"

/** Especialidades atendidas no IMD — fonte única em ESPECIALIDADES_DATA. */
const ESPECIALIDADES = ESPECIALIDADES_DATA.items.map((item) => item.title)

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceLeadFormProps extends BaseComponentProps {
  data: ServiceLeadFormData
  sectionId?: string
  /** Fundo da seção — acompanha o ritmo de cores da página */
  variant?: "creme" | "white" | "charcoal"
  /** WhatsApp de fallback, oferecido junto ao formulário */
  whatsappHref?: string
}

type FormState = "idle" | "submitting" | "success" | "error"

interface FormValues {
  nome: string
  whatsapp: string
  email: string
  especialidade: string
  cidade: string
}

type FieldErrors = Partial<Record<keyof FormValues, string>>

const EMPTY_VALUES: FormValues = {
  nome: "",
  whatsapp: "",
  email: "",
  especialidade: "",
  cidade: "",
}

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

/** Aplica a máscara (31) 9 9999-9999 conforme a pessoa digita. */
function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11)
  if (d.length === 0) return ""
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`
}

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}

  if (values.nome.trim().length < 3) {
    errors.nome = "Informe seu nome completo."
  }

  const digits = values.whatsapp.replace(/\D/g, "")
  if (digits.length < 10 || digits.length > 11) {
    errors.whatsapp = "Informe o WhatsApp com DDD."
  }

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "E-mail inválido."
  }

  if (!values.especialidade) {
    errors.especialidade = "Selecione uma opção."
  }

  if (values.cidade.trim().length < 3) {
    errors.cidade = "Informe sua cidade e estado."
  }

  return errors
}

/** UTMs da URL — repassadas ao CRM para atribuição de origem. */
function readUtms(): Record<string, string> {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
  }
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceLeadForm({
  data,
  sectionId = "agendar",
  variant = "creme",
  whatsappHref = "https://wa.me/5531971511855",
  className,
}: ServiceLeadFormProps) {
  const {
    kicker,
    headline,
    description,
    submitLabel = "Quero agendar",
    successTitle = "Recebemos seu contato.",
    successMessage = "Nossa equipe de relacionamento entra em contato pelo WhatsApp em até 1 hora útil para confirmar o agendamento.",
    note = "Seus dados são tratados conforme a LGPD e usados apenas para o seu atendimento. Nenhum contato comercial sem sua autorização.",
    origem,
    formId = "servico",
    endpoint = DEFAULT_ENDPOINT,
    extraOptions,
  } = data

  const uid = useId()
  const isDark = variant === "charcoal"

  const [values, setValues] = useState<FormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<FormState>("idle")
  const [honeypot, setHoneypot] = useState("")

  function setField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Erro some assim que a pessoa corrige — sem esperar novo submit
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === "submitting") return

    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    // Honeypot preenchido = bot. Simula sucesso sem enviar nada.
    if (honeypot) {
      setState("success")
      return
    }

    setState("submitting")

    const payload = {
      nome: values.nome.trim(),
      whatsapp: values.whatsapp.trim(),
      email: values.email.trim(),
      especialidade: values.especialidade,
      cidade: values.cidade.trim(),
      origem,
      form_id: formId,
      ...readUtms(),
      page: typeof window !== "undefined" ? window.location.pathname : "",
      timestamp: new Date().toISOString(),
    }

    // Conversão (Meta Pixel + GTM + Google Ads). Só metadados: dados pessoais
    // seguem apenas para o CRM.
    trackFormLead({
      origem,
      formId,
      specialty: values.especialidade,
      city: values.cidade.trim(),
    })

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setState("success")
    } catch {
      // Falha de CORS/preflight não deve custar o lead: reenvia em no-cors
      // (opaco, sem leitura de resposta) com keepalive.
      try {
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          keepalive: true,
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload),
        })
        setState("success")
      } catch {
        setState("error")
      }
    }
  }

  // ── Estilos derivados da variante ──────────────────────────────────────────
  const sectionBg = isDark ? "bg-charcoal" : variant === "white" ? "bg-white" : "bg-creme"

  // Quando a seção anterior compartilha o mesmo fundo (a jornada também é creme),
  // as duas leem como um bloco só. Na variante "white" a própria troca de
  // superfície separa; nas demais, uma borda no topo — como no
  // ServiceReferencesBlock.
  const topDivider = isDark
    ? "border-t border-white/10"
    : variant === "white"
      ? ""
      : "border-t border-cobre/20"

  // O card sempre contrasta com o fundo da seção: creme sobre branco,
  // branco sobre creme.
  const cardStyles = isDark
    ? "bg-white/5 ring-1 ring-white/10"
    : variant === "white"
      ? "bg-creme ring-1 ring-cobre/15"
      : "bg-white ring-1 ring-cobre/15 shadow-[0_2px_8px_rgba(46,46,46,0.04)]"

  const labelStyles = cn(
    "block text-xs font-semibold uppercase tracking-wide mb-2",
    isDark ? "text-white/70" : "text-charcoal/70"
  )

  const fieldStyles = cn(
    "w-full rounded-lg px-4 py-3 text-base",
    "border transition-all duration-300 ease-in-out",
    "focus:outline-none focus:ring-2",
    isDark
      ? "bg-white/5 border-white/15 text-white placeholder:text-white/35 focus:border-azul-claro focus:ring-azul-claro/25"
      : "bg-white border-cobre/25 text-charcoal placeholder:text-charcoal/35 focus:border-azul focus:ring-azul/20"
  )

  const errorStyles = isDark
    ? "!border-error focus:!ring-error/30"
    : "!border-error focus:!ring-error/25"

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={cn("w-full py-20 lg:py-30 scroll-mt-24", sectionBg, topDivider, className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-[260px] 2xl:pr-[300px]">
        <div
          className={cn(
            "max-w-[860px] mx-auto rounded-3xl",
            "px-6 py-10 sm:px-8 lg:px-14 lg:py-12",
            cardStyles
          )}
        >
          {state === "success" ? (
            /* ── Confirmação inline ─────────────────────────────────────── */
            <div role="status" aria-live="polite" className="flex flex-col items-start gap-5">
              <span
                className={cn(
                  "flex items-center justify-center w-14 h-14 rounded-full",
                  isDark ? "bg-azul-claro/15" : "bg-azul/10"
                )}
              >
                <CheckCircle2
                  size={28}
                  aria-hidden
                  className={isDark ? "text-azul-claro" : "text-azul"}
                />
              </span>

              <Heading
                as="h2"
                id={`${sectionId}-heading`}
                className={cn("!text-2xl lg:!text-3xl !leading-tight", isDark && "!text-white")}
              >
                {successTitle}
              </Heading>

              <span aria-hidden className={cn("block w-12 h-0.5", isDark ? "bg-ouro" : "bg-cobre")} />

              <BodyText
                color={isDark ? "light-muted" : "muted"}
                size="base"
                className="max-w-[640px]"
              >
                {successMessage}
              </BodyText>

              <div className="pt-2 w-full sm:w-auto">
                <Button
                  variant={isDark ? "primary" : "outline"}
                  size="lg"
                  href={whatsappHref}
                  leftIcon={<MessageCircle size={18} aria-hidden />}
                  className="!whitespace-nowrap w-full sm:w-auto justify-center"
                >
                  Falar agora no WhatsApp
                </Button>
              </div>
            </div>
          ) : (
            /* ── Formulário ─────────────────────────────────────────────── */
            <>
              <header className="flex flex-col items-start gap-4 mb-9 lg:mb-10">
                <Kicker color={isDark ? "ouro" : "cobre"}>{kicker}</Kicker>

                <Heading
                  as="h2"
                  id={`${sectionId}-heading`}
                  className={cn("!text-2xl lg:!text-3xl !leading-tight", isDark && "!text-white")}
                >
                  {headline}
                </Heading>

                <span
                  aria-hidden
                  className={cn("block w-12 h-0.5", isDark ? "bg-ouro" : "bg-cobre")}
                />

                {description && (
                  <BodyText
                    color={isDark ? "light-muted" : "muted"}
                    size="base"
                    className="max-w-[640px]"
                  >
                    {description}
                  </BodyText>
                )}
              </header>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                {/* Honeypot anti-spam — invisível para humanos */}
                <div aria-hidden className="absolute w-px h-px overflow-hidden -m-px opacity-0">
                  <label htmlFor={`${uid}-website`}>Não preencha este campo</label>
                  <input
                    id={`${uid}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Nome */}
                <div>
                  <label htmlFor={`${uid}-nome`} className={labelStyles}>
                    Nome completo
                  </label>
                  <input
                    id={`${uid}-nome`}
                    name="nome"
                    type="text"
                    autoComplete="name"
                    placeholder="Como podemos te chamar?"
                    value={values.nome}
                    onChange={(e) => setField("nome", e.target.value)}
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? `${uid}-nome-error` : undefined}
                    className={cn(fieldStyles, errors.nome && errorStyles)}
                  />
                  <FieldError id={`${uid}-nome-error`} message={errors.nome} />
                </div>

                {/* WhatsApp + E-mail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor={`${uid}-whatsapp`} className={labelStyles}>
                      WhatsApp (com DDD)
                    </label>
                    <input
                      id={`${uid}-whatsapp`}
                      name="whatsapp"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="(31) 9 9999-9999"
                      value={values.whatsapp}
                      onChange={(e) => setField("whatsapp", maskPhone(e.target.value))}
                      aria-invalid={!!errors.whatsapp}
                      aria-describedby={errors.whatsapp ? `${uid}-whatsapp-error` : undefined}
                      className={cn(fieldStyles, errors.whatsapp && errorStyles)}
                    />
                    <FieldError id={`${uid}-whatsapp-error`} message={errors.whatsapp} />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-email`} className={labelStyles}>
                      E-mail{" "}
                      <span className={isDark ? "text-white/40" : "text-charcoal/40"}>
                        (opcional)
                      </span>
                    </label>
                    <input
                      id={`${uid}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="seunome@email.com"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                      className={cn(fieldStyles, errors.email && errorStyles)}
                    />
                    <FieldError id={`${uid}-email-error`} message={errors.email} />
                  </div>
                </div>

                {/* Especialidade / procedimento */}
                <div>
                  <label htmlFor={`${uid}-especialidade`} className={labelStyles}>
                    Especialidade ou procedimento de interesse
                  </label>
                  <div className="relative">
                    <select
                      id={`${uid}-especialidade`}
                      name="especialidade"
                      value={values.especialidade}
                      onChange={(e) => setField("especialidade", e.target.value)}
                      aria-invalid={!!errors.especialidade}
                      aria-describedby={
                        errors.especialidade ? `${uid}-especialidade-error` : undefined
                      }
                      className={cn(
                        fieldStyles,
                        "appearance-none pr-12 cursor-pointer",
                        !values.especialidade && (isDark ? "text-white/35" : "text-charcoal/35"),
                        errors.especialidade && errorStyles
                      )}
                    >
                      <option value="">Selecione uma opção...</option>
                      <optgroup label="Especialidades">
                        {ESPECIALIDADES.map((esp) => (
                          <option key={esp} value={esp}>
                            {esp}
                          </option>
                        ))}
                      </optgroup>
                      {extraOptions && extraOptions.length > 0 && (
                        <optgroup label="Exames e outros">
                          {extraOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                    <ChevronDown
                      size={18}
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2",
                        isDark ? "text-white/50" : "text-cobre"
                      )}
                    />
                  </div>
                  <FieldError id={`${uid}-especialidade-error`} message={errors.especialidade} />
                </div>

                {/* Cidade/Estado */}
                <div>
                  <label htmlFor={`${uid}-cidade`} className={labelStyles}>
                    Cidade / Estado
                  </label>
                  <input
                    id={`${uid}-cidade`}
                    name="cidade"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Ex.: Belo Horizonte / MG"
                    value={values.cidade}
                    onChange={(e) => setField("cidade", e.target.value)}
                    aria-invalid={!!errors.cidade}
                    aria-describedby={errors.cidade ? `${uid}-cidade-error` : undefined}
                    className={cn(fieldStyles, errors.cidade && errorStyles)}
                  />
                  <FieldError id={`${uid}-cidade-error`} message={errors.cidade} />
                </div>

                {/* Erro de envio */}
                {state === "error" && (
                  <p
                    role="alert"
                    className={cn(
                      "text-sm rounded-lg px-4 py-3",
                      isDark
                        ? "bg-error/15 text-white ring-1 ring-error/30"
                        : "bg-error/8 text-error ring-1 ring-error/20"
                    )}
                  >
                    Não conseguimos enviar seu cadastro agora. Tente novamente ou fale direto
                    com a equipe pelo WhatsApp.
                  </p>
                )}

                {/* Submit */}
                <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={state === "submitting"}
                    leftIcon={<Send size={18} aria-hidden />}
                    className="!whitespace-nowrap w-full sm:w-auto justify-center"
                  >
                    {state === "submitting" ? "Enviando..." : submitLabel}
                  </Button>

                  <span
                    className={cn("text-xs leading-relaxed", isDark ? "text-white/55" : "text-charcoal/55")}
                  >
                    Resposta em até 1 hora útil · Atendimento exclusivamente particular
                  </span>
                </div>

                <p
                  className={cn(
                    "text-xs leading-relaxed",
                    isDark ? "text-white/45" : "text-charcoal/50"
                  )}
                >
                  {note}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// -----------------------------------------------------------------------------
// SUBCOMPONENTE — mensagem de erro por campo
// -----------------------------------------------------------------------------
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-medium text-error">
      {message}
    </p>
  )
}
