"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Check, Heart } from "lucide-react"
import { Logo } from "@/components/atoms/logo"
import { Heading } from "@/components/atoms/heading"
import { consumeImdReceipt, readImdView, type ImdLeadReceipt } from "@/lib/imd-lead-receipt"
import { trackConfirmedImdLead } from "@/lib/tracking"

export function ImdThankYou({ locale, specialties }: {
  locale: string
  specialties: Record<string, string>
}) {
  const [view, setView] = useState<ImdLeadReceipt | null>(null)
  const [publicSpecialty, setPublicSpecialty] = useState<string | null>(null)
  const en = locale === "en"

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("especialidade")
    if (slug && Object.hasOwn(specialties, slug)) setPublicSpecialty(slug)
    try {
      const pending = consumeImdReceipt(window.sessionStorage, locale)
      const valid = (receipt: ImdLeadReceipt | null) =>
        receipt && Object.hasOwn(specialties, receipt.specialtySlug) &&
        specialties[receipt.specialtySlug] === receipt.specialtyName ? receipt : null
      setView(valid(pending) || valid(readImdView(window.sessionStorage, locale)))
      const receipt = valid(pending)
      if (receipt) {
        void trackConfirmedImdLead({
          origem: "imd-especialidades", formId: "especialidade-agendar",
          specialty: receipt.specialtyName, specialtySlug: receipt.specialtySlug,
          sourcePath: receipt.sourcePath, eventId: receipt.eventId, utms: receipt.utms,
        })
      }
    } catch { /* The confirmation and return link remain usable without storage. */ }
  }, [locale, specialties])

  const specialtySlug = publicSpecialty || view?.specialtySlug
  const specialtyName = specialtySlug ? specialties[specialtySlug] : null
  const specialtyPath = specialtySlug ? `/${locale}/especialidades/${specialtySlug}/` : null

  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul focus-visible:ring-offset-4"

  return (
    <div className="flex min-h-screen min-h-[100svh] flex-col bg-creme text-charcoal">
      <header className="border-b border-cobre/10 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-6 sm:px-8">
          <Link href={`/${locale}/`} className={`shrink-0 rounded ${focus}`} aria-label={en ? "Hospital São Rafael — home" : "Hospital São Rafael — início"}>
            <Logo height={36} />
          </Link>
          <span className="text-right text-xs font-semibold leading-relaxed text-cobre">IMD<span className="hidden sm:block">Instituto Médico e Diagnóstico</span></span>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <section aria-labelledby="imd-thank-you-title" className="w-full max-w-[620px] rounded-3xl border border-cobre/10 bg-white px-6 py-10 text-center shadow-xl sm:px-14 sm:py-14">
          <span aria-hidden className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-cobre/15 bg-azul-fundo text-cobre ring-8 ring-creme/60"><Check size={36} strokeWidth={1.8} /></span>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-cobre">IMD · Hospital São Rafael</p>
          <Heading as="h1" id="imd-thank-you-title" align="center" className="!text-[32px] !leading-tight sm:!text-[42px]">
            {en ? "We've received your request!" : "Recebemos sua solicitação!"}
          </Heading>
          <p className="mx-auto mt-5 max-w-md text-sm leading-loose text-charcoal/75 sm:text-base">
            {en ? "Our team will contact you on the WhatsApp number provided to guide you through the next steps." : "Nossa equipe entrará em contato pelo WhatsApp informado para orientar os próximos passos."}
          </p>
          {specialtyName && <p className="mt-5 text-sm font-semibold text-cobre" data-specialty={specialtySlug}>{specialtyName}</p>}
          <div className="my-7 flex flex-col items-center gap-3 border-y border-cobre/15 py-6 text-xs leading-loose text-charcoal/70">
            <Heart size={23} strokeWidth={1.3} className="text-cobre" aria-hidden />
            <p>{en ? "One step at a time." : "Um cuidado de cada vez."}<br /><span className="font-medium text-charcoal">{en ? "We're here to guide you." : "Estamos aqui para orientar você."}</span></p>
          </div>
          <Link href={`/${locale}/`} className={`relative inline-flex min-h-12 w-full items-center justify-center rounded-full bg-azul-medio px-12 py-3 text-sm font-semibold text-white transition-colors hover:bg-charcoal motion-reduce:transition-none sm:w-auto sm:min-w-56 ${focus}`}>
            {en ? "Back to the website" : "Voltar ao site"}<ArrowUpRight size={18} aria-hidden className="absolute right-5 top-1/2 -translate-y-1/2" />
          </Link>
          {specialtyPath && <Link href={specialtyPath} className={`mx-auto mt-5 block w-fit rounded text-xs text-cobre underline underline-offset-4 ${focus}`}>
            {en ? `Back to ${specialtyName}` : `Voltar para ${specialtyName}`}
          </Link>}
        </section>
      </div>
      <footer className="mx-auto flex w-[calc(100%-40px)] max-w-6xl flex-wrap justify-between gap-4 border-t border-cobre/15 py-6 text-[11px] text-charcoal/70">
        <span>IMD · Hospital São Rafael</span><Link href={`/${locale}/privacidade/`} className={`rounded underline underline-offset-4 ${focus}`}>{en ? "Privacy policy" : "Política de Privacidade"}</Link>
      </footer>
    </div>
  )
}
