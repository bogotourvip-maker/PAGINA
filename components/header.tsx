"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Globe } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LangToggle, rememberLanguage } from "@/components/lang-toggle"

interface HeaderProps {
  translations: any
  language: string
  setLanguage: (lang: any) => void
  scrollToCotizacion: () => void
}

const languages = [
  { code: "es", flag: "🇨🇴", name: "Español" },
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "pt", flag: "🇧🇷", name: "Português" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "zh", flag: "🇨🇳", name: "中文" },
]

const otherLanguages = languages.filter((l) => l.code !== "es" && l.code !== "en")

const tourPages = [
  { href: "/servicios/catedral-de-sal", label: "Catedral de Sal de Zipaquirá", short: "Zipaquirá" },
  { href: "/servicios/monserrate-y-la-candelaria", label: "Monserrate y La Candelaria", short: "Monserrate" },
  { href: "/servicios/guatavita", label: "Laguna de Guatavita", short: "Guatavita" },
  { href: "/servicios/villa-de-leyva", label: "Villa de Leyva", short: "Villa de Leyva" },
]

export function Header({ translations: t, language, setLanguage, scrollToCotizacion }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const otherLanguageActive = language !== "es" && language !== "en"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLanguageMenu(false)
      }
    }
    if (showLanguageMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showLanguageMenu])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl"
            : "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-12 py-2.5 sm:py-3 md:py-4 lg:py-5 flex items-center justify-between">
          <a
            href="#inicio"
            className="flex items-center gap-2 sm:gap-3 transform hover:scale-105 sm:hover:scale-110 transition-transform duration-300"
          >
            <Image
              src="/logo-bogotourvip.jpg"
              alt="BogotourVip"
              width={300}
              height={100}
              className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
              priority
              quality={90}
              sizes="(max-width: 640px) 200px, 300px"
            />
          </a>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6 whitespace-nowrap">
            <a
              href="/servicios"
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled ? "text-white/70 hover:text-white" : "text-white/80 hover:text-white"
              }`}
            >
              {t.services}
            </a>
            {[
              { href: "/tours", label: "Tours" },
              ...tourPages.map((tour) => ({ href: tour.href, label: tour.short })),
              { href: "/blog", label: "Blog" },
              { href: "#contacto", label: t.contact },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? "text-white/70 hover:text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <LangToggle current={language} onSelect={setLanguage} />

            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={`flex items-center gap-1 px-2.5 py-2 rounded-full border transition-all duration-300 ${
                  otherLanguageActive ? "bg-white text-black border-white" : "bg-white/10 hover:bg-white/20 border-white/20 text-white/90"
                }`}
                aria-label="Más idiomas / More languages"
                aria-expanded={showLanguageMenu}
              >
                <Globe className="w-4 h-4" />
                {otherLanguageActive && <span className="text-xs font-semibold uppercase">{language}</span>}
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden animate-fade-in z-50">
                  {otherLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        rememberLanguage(lang.code)
                        setLanguage(lang.code)
                        setShowLanguageMenu(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-all duration-300 ${
                        language === lang.code ? "bg-white/15" : ""
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm text-white/90">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#cotizacion" onClick={scrollToCotizacion} className="hidden sm:block">
              <Button className="bg-[#d4af37] text-black hover:bg-[#c9a430] px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 h-auto">
                {t.reserve}
              </Button>
            </a>

            <button
              className="lg:hidden text-foreground hover:text-accent transition-all duration-300 transform hover:scale-110 p-1 sm:p-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
            </button>
          </div>
        </nav>

        <nav aria-label="Tours" className="lg:hidden overflow-x-auto [scrollbar-width:none]">
          <ul className="flex items-center gap-2 px-3 sm:px-4 pb-2.5 w-max">
            {tourPages.map((tour) => (
              <li key={tour.href}>
                <a
                  href={tour.href}
                  className="block text-xs font-medium text-white/85 hover:text-white bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 whitespace-nowrap"
                >
                  {tour.short}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-accent/20 px-6 sm:px-8 py-6 sm:py-8 flex flex-col gap-5 sm:gap-6 animate-slide-in-up max-h-[calc(100vh-100px)] overflow-y-auto">
            {[
              { href: "/servicios", label: t.services },
              { href: "/tours", label: "Tours" },
              ...tourPages.map((tour) => ({ href: tour.href, label: tour.label })),
              { href: "/blog", label: "Blog" },
              { href: "#experiencia", label: t.experience },
              { href: "#galeria", label: t.gallery },
              { href: "#cotizacion", label: t.quote },
              { href: "#contacto", label: t.contact },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base sm:text-[16px] text-foreground hover:text-accent transition-all duration-300 hover:translate-x-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#cotizacion"
              onClick={(e) => {
                setMobileMenuOpen(false)
                scrollToCotizacion()
              }}
            >
              <Button className="bg-primary hover:bg-accent text-white px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-[14px] font-medium w-full">
                {t.reserve}
              </Button>
            </a>
          </div>
        )}
      </header>
    </>
  )
}
