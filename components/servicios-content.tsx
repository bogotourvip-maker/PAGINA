"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Clock,
  MapPin,
  Star,
  Check,
  MessageCircle,
  ArrowRight,
  Building2,
  Mountain,
  Globe,
  ChevronDown,
} from "lucide-react"
import { tours, WHATSAPP_LINK } from "@/lib/tours"
import {
  type ServiceLang,
  SERVICE_LANGS,
  getLocalizedTour,
  localizedWhatsappLink,
  serviciosUI,
} from "@/lib/tours-i18n"

const BOGOTA_SLUGS = ["city-tour-bogota", "la-candelaria", "monserrate", "traslado-aeropuerto"]

const toursBogota = BOGOTA_SLUGS.map((slug) => tours.find((t) => t.slug === slug)).filter(
  (t): t is (typeof tours)[number] => Boolean(t),
)
const toursAlrededores = tours.filter((t) => !BOGOTA_SLUGS.includes(t.slug))

const languageOptions: { code: ServiceLang; flag: string; name: string }[] = [
  { code: "es", flag: "🇨🇴", name: "Español" },
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "pt", flag: "🇧🇷", name: "Português" },
]

function TourDetailCard({
  tour,
  index,
  lang,
}: {
  tour: (typeof tours)[number]
  index: number
  lang: ServiceLang
}) {
  const ui = serviciosUI[lang]
  const local = getLocalizedTour(tour, lang)
  const whatsappLink = localizedWhatsappLink(local.name, lang)
  const reversed = index % 2 === 1

  return (
    <article className="group grid lg:grid-cols-2 gap-6 lg:gap-10 items-center bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden p-4 sm:p-5 lg:p-6 hover:border-[#d4af37]/40 transition-colors duration-300">
      <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${reversed ? "lg:order-2" : ""}`}>
        <Image
          src={tour.heroImage || "/placeholder.svg"}
          alt={local.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={80}
          loading={index < 2 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full">{local.category}</span>
          <span className="flex items-center gap-1 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full">
            <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
            <span className="text-white text-xs font-medium">
              {tour.rating} ({tour.reviews})
            </span>
          </span>
        </div>
      </div>

      <div className={`${reversed ? "lg:order-1" : ""}`}>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 text-balance">{local.name}</h3>
        <p className="text-[#d4af37] font-medium mb-4">{local.tagline}</p>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5 text-pretty">{local.shortDescription}</p>

        <div className="flex flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            {local.duration}
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            {local.distance}
          </div>
        </div>

        <div className="mb-5">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-2.5">{ui.whatYouVisit}</p>
          <div className="flex flex-wrap gap-2">
            {local.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-2.5">{ui.includes}</p>
          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
            {local.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <Check className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#d4af37] text-black hover:bg-[#c9a430] transition-colors font-semibold px-5 py-3 rounded-xl text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {ui.quoteWhatsapp}
          </a>
          <Link
            href={`/tours/${tour.slug}`}
            className="flex items-center justify-center gap-1.5 border border-white/20 text-white hover:bg-white/10 transition-colors font-medium px-5 py-3 rounded-xl text-sm"
          >
            {ui.viewDetails}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function ServiciosContent({ children }: { children?: React.ReactNode }) {
  const [lang, setLang] = useState<ServiceLang>("es")
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const ui = serviciosUI[lang]

  // Detecta el idioma guardado (compartido con la home) o el del navegador
  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as ServiceLang | null
    if (saved && SERVICE_LANGS.includes(saved)) {
      setLang(saved)
      return
    }
    const browserLang = navigator.language.slice(0, 2).toLowerCase() as ServiceLang
    if (SERVICE_LANGS.includes(browserLang)) {
      setLang(browserLang)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  const changeLang = (next: ServiceLang) => {
    setLang(next)
    setMenuOpen(false)
    try {
      localStorage.setItem("preferredLanguage", next)
    } catch {}
  }

  const current = languageOptions.find((l) => l.code === lang)

  return (
    <main className="min-h-screen bg-black">
      {children}
      {/* Navegación */}
      <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-bogotourvip.jpg"
              alt="BogotourVip"
              width={160}
              height={53}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="hidden sm:flex items-center gap-5 text-sm font-medium">
              <Link href="/servicios" className="text-white transition-colors">
                {ui.navServices}
              </Link>
              <Link href="/tours" className="text-white/80 hover:text-white transition-colors">
                {ui.navTours}
              </Link>
              <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
                {ui.navBlog}
              </Link>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4 text-white/90" />
                <span className="text-sm font-medium text-white/90 hidden sm:inline">{current?.name}</span>
                <span className="text-sm font-medium text-white/90 sm:hidden uppercase">{lang}</span>
                <ChevronDown className="w-3 h-3 text-white/70" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden z-50">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => changeLang(option.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-all ${
                        lang === option.code ? "bg-white/15" : ""
                      }`}
                    >
                      <span className="text-xl">{option.flag}</span>
                      <span className="text-sm text-white/90">{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">{ui.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 text-balance">
            {ui.heroTitle1}
            <br />
            <span className="text-white/60">{ui.heroTitle2}</span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl text-pretty">{ui.heroSubtitle}</p>
        </div>
      </section>

      {/* Tours en Bogotá */}
      <section className="pb-4 sm:pb-6 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{ui.inBogotaTitle}</h2>
              <p className="text-white/40 text-sm">{ui.inBogotaSubtitle}</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 sm:gap-8">
            {toursBogota.map((tour, index) => (
              <TourDetailCard key={tour.slug} tour={tour} index={index} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Tours en los alrededores */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{ui.aroundTitle}</h2>
              <p className="text-white/40 text-sm">{ui.aroundSubtitle}</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 sm:gap-8">
            {toursAlrededores.map((tour, index) => (
              <TourDetailCard key={tour.slug} tour={tour} index={index} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 text-balance">{ui.ctaTitle}</h2>
          <p className="text-white/50 text-base sm:text-lg mb-8 text-pretty">{ui.ctaSubtitle}</p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#d4af37] text-black hover:bg-[#c9a430] transition-colors font-semibold px-8 py-4 rounded-xl"
          >
            <MessageCircle className="w-5 h-5" />
            {ui.ctaButton}
          </a>
        </div>
      </section>
    </main>
  )
}
