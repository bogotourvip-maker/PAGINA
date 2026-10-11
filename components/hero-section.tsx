"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, ArrowUpRight, ArrowRight } from "lucide-react"
import { FullImage } from "@/components/full-image"
import { FEATURED_TOURS, toSiteLang, tourLink, type FeaturedTour } from "@/lib/featured-tours"

interface HeroSectionProps {
  translations: any
  scrollToCotizacion: () => void
  WHATSAPP_LINK: string
  language?: string
}

const SLIDES: FeaturedTour[] = [
  {
    id: "bogota",
    href: "/tours",
    enHref: "/en/tours",
    image: "/images/bogota-skyline-panorama.webp",
    name: { es: "City Tour Bogotá", en: "Bogotá City Tour" },
    tagline: { es: "La Candelaria, grafitis y el centro histórico", en: "La Candelaria, street art and the historic center" },
  },
  ...FEATURED_TOURS,
]

const SLIDE_MS = 6000

const COPY = {
  es: { eyebrow: "Tours privados · Guías bilingües", next: "Destino", view: "Ver tour", pick: "Elige tu destino" },
  en: { eyebrow: "Private tours · Bilingual guides", next: "Destination", view: "View tour", pick: "Pick your destination" },
}

export function HeroSection({ translations, scrollToCotizacion, WHATSAPP_LINK, language = "es" }: HeroSectionProps) {
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(0)
  const lang = toSiteLang(language)
  const copy = COPY[lang]
  const slide = SLIDES[active]

  const goTo = useCallback((index: number) => {
    setStarted(true)
    setActive((index + SLIDES.length) % SLIDES.length)
  }, [])

  // Delay autoplay so the first image (LCP) loads without competing for bandwidth.
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) goTo(active + (diff > 0 ? 1 : -1))
  }

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pb-6 pt-28 sm:pb-8"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        {SLIDES.map((item, index) => {
          const shouldRender =
            index === 0 || (started && (index === active || index === (active + 1) % SLIDES.length))
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            >
              {shouldRender && (
                <FullImage
                  src={item.image}
                  alt={item.name[lang]}
                  priority={index === 0}
                  quality={72}
                  sizes="100vw"
                  className="object-cover md:object-contain"
                />
              )}
            </div>
          )
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-8">
        <p className="sr-only">
          Tours en Bogotá y transporte turístico privado: City Tour, Monserrate, La Candelaria, Laguna de Guatavita,
          Catedral de Sal de Zipaquirá, tour de café, tour Villa de Leyva y traslado al aeropuerto El Dorado. Guías que
          hablan español e inglés. Bogota private tours, city tour and airport transfer with English speaking guides.
        </p>

        <div className="flex max-w-3xl flex-col items-start gap-6">
          <span className="animate-slide-in-up flex items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink-foreground/10 px-4 py-2 text-sm font-medium text-ink-foreground opacity-0 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
            </span>
            {copy.eyebrow}
          </span>

          <h1
            className="animate-slide-in-up font-playfair text-5xl font-bold leading-[1.02] text-balance text-ink-foreground opacity-0 sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ animationDelay: "80ms" }}
          >
            {translations.heroTitlePre} <span className="italic text-accent">Colombia</span> {translations.heroTitlePost}
          </h1>

          <p
            className="animate-slide-in-up max-w-xl text-lg leading-relaxed text-pretty text-ink-foreground/80 opacity-0 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            {translations.heroSubtitle}
          </p>

          <div
            className="animate-slide-in-up flex flex-wrap items-center gap-3 opacity-0"
            style={{ animationDelay: "240ms" }}
          >
            <button
              type="button"
              onClick={scrollToCotizacion}
              className="group flex h-14 items-center gap-2 rounded-full bg-accent pl-7 pr-6 text-base font-semibold text-accent-foreground shadow-2xl transition-all hover:gap-3"
            >
              {translations.reserveNow}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center gap-2 rounded-full border border-ink-foreground/30 bg-ink-foreground/10 px-6 text-base font-semibold text-ink-foreground backdrop-blur-md transition-colors hover:bg-ink-foreground/20"
            >
              <MessageCircle className="h-5 w-5 text-emerald" />
              WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-foreground/70">
            <span>
              <strong className="text-base font-bold text-ink-foreground">500+</strong> {translations.statTours}
            </span>
            <span>
              <strong className="text-base font-bold text-ink-foreground">98%</strong> {translations.statSatisfaction}
            </span>
            <span>
              <strong className="text-base font-bold text-ink-foreground">7</strong> {translations.statLanguages}
            </span>
          </div>
        </div>

        <div
          className="flex flex-col gap-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="flex items-end justify-between gap-4">
            <div key={slide.id} className="animate-word-in flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{copy.next}</span>
              <Link
                href={tourLink(slide, language)}
                className="group flex items-center gap-2 font-playfair text-2xl font-semibold text-ink-foreground sm:text-3xl"
              >
                {slide.name[lang]}
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <span className="text-sm text-ink-foreground/70 sm:text-base">{slide.tagline[lang]}</span>
            </div>
            <span className="hidden text-sm text-ink-foreground/60 sm:block">{copy.pick}</span>
          </div>

          <ul className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6">
            {SLIDES.map((item, index) => {
              const isActive = index === active
              return (
                <li key={item.id} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-pressed={isActive}
                    aria-label={item.name[lang]}
                    className={`group relative flex w-44 items-center gap-3 overflow-hidden rounded-2xl border p-2 pr-3 text-left backdrop-blur-md transition-all duration-300 sm:w-full ${
                      isActive
                        ? "border-accent bg-ink-foreground/15"
                        : "border-ink-foreground/15 bg-ink/40 hover:border-ink-foreground/40 hover:bg-ink-foreground/10"
                    }`}
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </span>
                    <span className="truncate text-sm font-semibold leading-tight text-ink-foreground">
                      {item.name[lang]}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ink-foreground/10">
                      {isActive && started && (
                        <span
                          key={`${item.id}-progress`}
                          className="block h-full bg-accent"
                          style={{
                            animation: `progressFill ${SLIDE_MS}ms linear forwards`,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                          onAnimationEnd={() => goTo(index + 1)}
                        />
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
