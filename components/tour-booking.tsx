import Link from "next/link"
import { MessageCircle, CalendarCheck, ShieldCheck } from "lucide-react"

type Lang = "es" | "en"

const copy = {
  es: {
    book: "Reservar ahora",
    quote: "Solicitar cotización",
    from: "Desde",
    ctaTitle: "¿Listo para vivir esta experiencia?",
    ctaText: "Escríbenos por WhatsApp y confirma tu fecha en minutos. Respondemos en español e inglés.",
    trust: "Sin pagos anticipados para cotizar · Confirmación inmediata",
  },
  en: {
    book: "Book now",
    quote: "Request a quote",
    from: "From",
    ctaTitle: "Ready for this experience?",
    ctaText: "Message us on WhatsApp and confirm your date in minutes. We reply in English and Spanish.",
    trust: "No upfront payment to get a quote · Instant confirmation",
  },
} as const

interface BookingProps {
  whatsappLink: string
  lang?: Lang
}

export function TourHeroCta({ whatsappLink, lang = "es" }: BookingProps) {
  const t = copy[lang]
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3.5 font-semibold text-black transition-colors hover:bg-[#c9a430]"
      >
        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        {t.book}
      </a>
      <Link
        href={lang === "en" ? "/en#cotizacion" : "/#cotizacion"}
        className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-black/30 px-6 py-3.5 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
      >
        {t.quote}
      </Link>
    </div>
  )
}

export function TourFinalCta({ whatsappLink, lang = "es", tourName }: BookingProps & { tourName: string }) {
  const t = copy[lang]
  return (
    <section className="bg-gray-900 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-[#d4af37]/40 bg-black p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">{tourName}</p>
            <h2 className="text-2xl font-bold text-white text-balance sm:text-3xl">{t.ctaTitle}</h2>
            <p className="max-w-xl leading-relaxed text-white/60 text-pretty">{t.ctaText}</p>
            <p className="flex items-center gap-2 text-sm text-white/50">
              <ShieldCheck className="h-4 w-4 text-[#d4af37]" aria-hidden="true" />
              {t.trust}
            </p>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#d4af37] px-7 py-4 font-semibold text-black transition-colors hover:bg-[#c9a430]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {t.book}
          </a>
        </div>
      </div>
    </section>
  )
}

export function TourMobileBookingBar({ whatsappLink, lang = "es", price }: BookingProps & { price: string }) {
  const t = copy[lang]
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex flex-col">
          <span className="text-xs text-white/50">{t.from}</span>
          <span className="font-bold text-white">{price}</span>
        </div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 font-semibold text-black transition-colors hover:bg-[#c9a430]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {t.book}
        </a>
      </div>
    </div>
  )
}
