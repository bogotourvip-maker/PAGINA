"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown, Globe, MessageCircle, ArrowUpRight } from "lucide-react"
import { LangToggle, rememberLanguage } from "@/components/lang-toggle"
import {
  EXTRA_SERVICES,
  FEATURED_TOURS,
  SITE_WHATSAPP_LINK,
  toSiteLang,
  tourLink,
} from "@/lib/featured-tours"

interface HeaderProps {
  translations: any
  language: string
  setLanguage: (lang: any) => void
  scrollToCotizacion: () => void
}

const otherLanguages = [
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "pt", name: "Português" },
  { code: "it", name: "Italiano" },
  { code: "zh", name: "中文" },
]

const COPY = {
  es: { home: "Inicio", tours: "Tours", allTours: "Ver todos los tours", more: "Más servicios", menu: "Menú", talk: "Escríbenos" },
  en: { home: "Home", tours: "Tours", allTours: "See all tours", more: "More services", menu: "Menu", talk: "Message us" },
}

export function Header({ translations: t, language, setLanguage, scrollToCotizacion }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toursOpen, setToursOpen] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lang = toSiteLang(language)
  const copy = COPY[lang]
  const otherLanguageActive = language !== "es" && language !== "en"
  const toursIndexHref = language === "en" ? "/en/tours" : "/tours"

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setToursOpen(false)
      setShowLanguageMenu(false)
      setMobileMenuOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  useEffect(() => {
    if (!showLanguageMenu) return
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) setShowLanguageMenu(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showLanguageMenu])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const openTours = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setToursOpen(true)
  }
  const scheduleCloseTours = () => {
    closeTimer.current = setTimeout(() => setToursOpen(false), 150)
  }

  const handleQuote = () => {
    setMobileMenuOpen(false)
    scrollToCotizacion()
  }

  const linkClass =
    "relative rounded-full px-4 py-2 text-[15px] font-medium text-ink-foreground/85 transition-colors hover:bg-ink-foreground/10 hover:text-ink-foreground"

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4" onMouseLeave={scheduleCloseTours}>
      <nav
        aria-label={copy.menu}
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border py-1.5 pl-2 pr-2 transition-all duration-500 sm:pl-3 ${
          isScrolled || toursOpen
            ? "border-ink-foreground/10 bg-ink/90 shadow-2xl backdrop-blur-xl"
            : "border-ink-foreground/15 bg-ink/35 backdrop-blur-md"
        }`}
      >
        <a href="#inicio" className="flex shrink-0 items-center rounded-full" aria-label="BogotourVip - Inicio">
          <Image
            src="/logo-bogotourvip.jpg"
            alt="BogotourVip"
            width={300}
            height={100}
            className="h-11 w-auto rounded-full object-contain sm:h-12"
            priority
            quality={90}
            sizes="160px"
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          <li>
            <a href="#inicio" aria-current="page" className={`${linkClass} text-ink-foreground`}>
              {copy.home}
            </a>
          </li>
          <li onMouseEnter={openTours}>
            <button
              type="button"
              className={`${linkClass} flex items-center gap-1.5 ${toursOpen ? "bg-ink-foreground/10 text-ink-foreground" : ""}`}
              aria-expanded={toursOpen}
              aria-controls="tours-mega-menu"
              onClick={() => setToursOpen((open) => !open)}
            >
              {copy.tours}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${toursOpen ? "rotate-180" : ""}`} />
            </button>
          </li>
          <li onMouseEnter={scheduleCloseTours}>
            <a href="/servicios" className={linkClass}>
              {t.services}
            </a>
          </li>
          <li onMouseEnter={scheduleCloseTours}>
            <a href="/blog" className={linkClass}>
              Blog
            </a>
          </li>
          <li onMouseEnter={scheduleCloseTours}>
            <a href="#contacto" className={linkClass}>
              {t.contact}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:block">
            <LangToggle current={language} onSelect={setLanguage} />
          </div>

          <div className="relative hidden sm:block" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className={`flex h-9 items-center gap-1 rounded-full border px-2.5 transition-colors ${
                otherLanguageActive
                  ? "border-ink-foreground bg-ink-foreground text-ink"
                  : "border-ink-foreground/20 bg-ink-foreground/10 text-ink-foreground/90 hover:bg-ink-foreground/20"
              }`}
              aria-label="Más idiomas / More languages"
              aria-expanded={showLanguageMenu}
            >
              <Globe className="h-4 w-4" />
              {otherLanguageActive && <span className="text-xs font-semibold uppercase">{language}</span>}
            </button>
            {showLanguageMenu && (
              <div className="animate-fade-in absolute right-0 mt-3 w-44 overflow-hidden rounded-2xl border border-ink-foreground/10 bg-ink/95 p-1 backdrop-blur-xl">
                {otherLanguages.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => {
                      rememberLanguage(option.code)
                      setLanguage(option.code)
                      setShowLanguageMenu(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-ink-foreground/90 transition-colors hover:bg-ink-foreground/10 ${
                      language === option.code ? "bg-ink-foreground/15" : ""
                    }`}
                  >
                    {option.name}
                    <span className="text-xs font-semibold uppercase text-ink-foreground/50">{option.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={SITE_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-emerald text-emerald-foreground transition-transform hover:scale-105 md:flex"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>

          <a
            href="#cotizacion"
            onClick={(e) => {
              e.preventDefault()
              handleQuote()
            }}
            className="group hidden h-10 items-center gap-1.5 rounded-full bg-accent pl-5 pr-4 text-sm font-semibold text-accent-foreground transition-all hover:gap-2.5 sm:flex"
          >
            {t.reserve}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>

          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-full bg-ink-foreground px-4 text-sm font-semibold text-ink lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={copy.menu}
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-5 w-5" />
            <span>{copy.menu}</span>
          </button>
        </div>
      </nav>

      {/* Always in the DOM so crawlers find the tour links; only its visibility toggles. */}
      <div
        id="tours-mega-menu"
        onMouseEnter={openTours}
        className={`mx-auto mt-3 hidden max-w-7xl transition-all duration-300 lg:block ${
          toursOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex gap-4 rounded-[2rem] border border-ink-foreground/10 bg-ink/95 p-4 shadow-2xl backdrop-blur-xl">
          <ul className="grid flex-1 grid-cols-5 gap-3">
            {FEATURED_TOURS.map((tour, index) => (
              <li key={tour.id}>
                <Link
                  href={tourLink(tour, language)}
                  onClick={() => setToursOpen(false)}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl p-4"
                  style={{ transitionDelay: toursOpen ? `${index * 40}ms` : "0ms" }}
                >
                  <Image
                    src={tour.image}
                    alt=""
                    fill
                    sizes="220px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-foreground/90 text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <span className="relative font-playfair text-lg font-semibold leading-tight text-ink-foreground">
                    {tour.name[lang]}
                  </span>
                  <span className="relative mt-1 text-sm leading-snug text-ink-foreground/70">{tour.tagline[lang]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex w-64 flex-col justify-between gap-4 rounded-3xl bg-ink-foreground/5 p-5">
            <div className="flex flex-col gap-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{copy.more}</p>
              {EXTRA_SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex items-center justify-between rounded-xl py-2 text-[15px] text-ink-foreground/85 transition-colors hover:text-ink-foreground"
                >
                  {service.name[lang]}
                  <ArrowUpRight className="h-4 w-4 opacity-40 transition-all group-hover:opacity-100" />
                </Link>
              ))}
            </div>
            <Link
              href={toursIndexHref}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              {copy.allTours}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={copy.menu}
          className="animate-fade-in fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-ink-foreground lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <Image src="/logo-bogotourvip.jpg" alt="BogotourVip" width={300} height={100} className="h-11 w-auto rounded-full" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-foreground/10"
              aria-label="Cerrar menú / Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-8 px-5 pb-8 pt-2">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{copy.tours}</p>
                <Link href={toursIndexHref} className="text-sm text-ink-foreground/70 underline underline-offset-4">
                  {copy.allTours}
                </Link>
              </div>
              <ul className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
                {FEATURED_TOURS.map((tour, index) => (
                  <li key={tour.id} className="animate-slide-in-up snap-start opacity-0" style={{ animationDelay: `${index * 60}ms` }}>
                    <Link
                      href={tourLink(tour, language)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="relative flex h-48 w-40 flex-col justify-end overflow-hidden rounded-3xl p-3"
                    >
                      <Image src={tour.image} alt="" fill sizes="160px" className="object-cover" />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                      <span className="relative font-playfair text-base font-semibold leading-tight">{tour.name[lang]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="flex flex-col">
              {[
                { href: "#inicio", label: copy.home },
                { href: "/servicios", label: t.services },
                ...EXTRA_SERVICES.slice(0, 2).map((s) => ({ href: s.href, label: s.name[lang] })),
                { href: "/blog", label: "Blog" },
                { href: "#contacto", label: t.contact },
              ].map((item) => (
                <li key={item.href} className="border-b border-ink-foreground/10">
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-4 font-playfair text-2xl font-semibold"
                  >
                    {item.label}
                    <ArrowUpRight className="h-5 w-5 text-ink-foreground/40" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2">
              <LangToggle current={language} onSelect={setLanguage} />
              {otherLanguages.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    rememberLanguage(option.code)
                    setLanguage(option.code)
                  }}
                  className={`h-8 rounded-full border px-3 text-xs font-semibold uppercase ${
                    language === option.code
                      ? "border-ink-foreground bg-ink-foreground text-ink"
                      : "border-ink-foreground/20 text-ink-foreground/80"
                  }`}
                  aria-label={option.name}
                >
                  {option.code}
                </button>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3">
              <a
                href={SITE_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center gap-2 rounded-full bg-emerald text-base font-semibold text-emerald-foreground"
              >
                <MessageCircle className="h-5 w-5" />
                {copy.talk}
              </a>
              <button
                type="button"
                onClick={handleQuote}
                className="flex h-14 items-center justify-center rounded-full bg-accent text-base font-semibold text-accent-foreground"
              >
                {t.reserve}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
