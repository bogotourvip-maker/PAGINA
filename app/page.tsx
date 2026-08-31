"use client"

import type React from "react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { MessageCircle } from "lucide-react"
import { translations } from "@/lib/translations"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MarqueeSection } from "@/components/marquee-section"
import { ServicesSection } from "@/components/services-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { TrustBar } from "@/components/trust-bar"
import { PopularSearches } from "@/components/popular-searches"
import { FaqSection } from "@/components/faq-section"
import { Reveal } from "@/components/reveal"

// SSR habilitado: el HTML de estas secciones se renderiza en el servidor
// (mejor SEO y sin parpadeo). Se aplica code-splitting para aligerar el bundle inicial.
const FleetSection = dynamic(() => import("@/components/fleet-section").then(m => ({ default: m.FleetSection })))
const InteractiveDestinations = dynamic(() => import("@/components/interactive-destinations").then(m => ({ default: m.InteractiveDestinations })))
const AboutBogotaSection = dynamic(() => import("@/components/about-bogota-section").then(m => ({ default: m.AboutBogotaSection })))
const BogotaVideoSection = dynamic(() => import("@/components/bogota-video-section").then(m => ({ default: m.BogotaVideoSection })))
const GallerySection = dynamic(() => import("@/components/gallery-section").then(m => ({ default: m.GallerySection })))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(m => ({ default: m.TestimonialsSection })))
const GoogleReviewsWidget = dynamic(() => import("@/components/google-reviews-widget").then(m => ({ default: m.GoogleReviewsWidget })))
const QuoteForm2Step = dynamic(() => import("@/components/quote-form-2-step").then(m => ({ default: m.QuoteForm2Step })))
const RecommendationsSection = dynamic(() => import("@/components/recommendations-section").then(m => ({ default: m.RecommendationsSection })))
const SocialSection = dynamic(() => import("@/components/social-section").then(m => ({ default: m.SocialSection })))
const Chatbot = dynamic(() => import("@/components/chatbot"), { ssr: false })
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))

const WHATSAPP_LINK =
  "https://wa.me/573108677635?text=Hola%20BogotourVIP%2C%20quiero%20cotizar%20tu%20servicio.%20%C2%BFMe%20pueden%20ayudar%20con%20la%20informacion%20y%20el%20precio%3F"

export default function Page() {
  const [language, setLanguage] = useState<keyof typeof translations>("es")
  const t = translations[language]
  const [showChatbot, setShowChatbot] = useState(false)

  // Detecta el idioma del navegador la primera vez que un visitante entra
  // (un extranjero con el navegador en ingles vera la pagina en ingles automaticamente).
  // Si ya eligio un idioma manualmente antes, se respeta esa eleccion.
  useEffect(() => {
    const supported: (keyof typeof translations)[] = ["es", "en", "fr", "de", "pt", "it", "zh"]
    const saved = localStorage.getItem("preferredLanguage") as keyof typeof translations | null
    if (saved && supported.includes(saved)) {
      setLanguage(saved)
      return
    }
    const browserLang = navigator.language.slice(0, 2).toLowerCase() as keyof typeof translations
    if (supported.includes(browserLang)) {
      setLanguage(browserLang)
    }
  }, [])

  // Guarda la eleccion de idioma para las proximas visitas.
  const handleSetLanguage = (lang: keyof typeof translations) => {
    setLanguage(lang)
    try {
      localStorage.setItem("preferredLanguage", lang)
    } catch {}
  }

  const scrollToCotizacion = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault()
    const cotizacionSection = document.getElementById("cotizacion")
    if (cotizacionSection) {
      cotizacionSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Carga el chatbot solo cuando el navegador esta libre o tras la primera interaccion,
  // para no bloquear el render inicial.
  useEffect(() => {
    let triggered = false
    const load = () => {
      if (triggered) return
      triggered = true
      setShowChatbot(true)
    }

    const idle = "requestIdleCallback" in window
      ? (window as any).requestIdleCallback(load, { timeout: 4000 })
      : setTimeout(load, 3000)

    const events = ["scroll", "pointerdown", "keydown", "touchstart"]
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }))

    return () => {
      events.forEach((e) => window.removeEventListener(e, load))
      if ("cancelIdleCallback" in window) (window as any).cancelIdleCallback(idle)
      else clearTimeout(idle as ReturnType<typeof setTimeout>)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      {/* Removed duplicate banner, it's now in Header */}
      <Header
        translations={t}
        language={language}
        setLanguage={handleSetLanguage}
        scrollToCotizacion={scrollToCotizacion}
        // Pass other props if Header needs them, e.g., mobileMenuOpen, setMobileMenuOpen
      />

      {/* Use HeroSection component */}
      <HeroSection translations={t} scrollToCotizacion={scrollToCotizacion} WHATSAPP_LINK={WHATSAPP_LINK} />

      {/* Trust signals right below the hero */}
      <TrustBar translations={t} />

      {/* Marquee */}
      <MarqueeSection />

      {/* Use ServicesSection component */}
      <Reveal>
        <ServicesSection translations={t} scrollToCotizacion={scrollToCotizacion} />
      </Reveal>

      {/* Fleet Section */}
      <Reveal>
        <FleetSection translations={t} />
      </Reveal>

      {/* Interactive Destinations Map (incluye guias + destinos) */}
      <Reveal>
        <InteractiveDestinations translations={t} />
      </Reveal>

      {/* Editorial content about Bogota tourism */}
      <Reveal>
        <AboutBogotaSection translations={t} />
      </Reveal>

      {/* Video aereo de Bogota con carga diferida (facade) */}
      <Reveal>
        <BogotaVideoSection translations={t} />
      </Reveal>

      {/* Use GallerySection component */}
      <Reveal>
        <GallerySection translations={t} />
      </Reveal>

      {/* Use TestimonialsSection component */}
      <Reveal>
        <TestimonialsSection translations={t} />
      </Reveal>

      {/* Add GoogleReviewsWidget */}
      <Reveal>
        <GoogleReviewsWidget translations={t} />
      </Reveal>

      {/* Recommendations Section */}
      <Reveal>
        <RecommendationsSection translations={t} />
      </Reveal>

      {/* SEO: busquedas populares con enlaces internos y texto ancla optimizado */}
      <Reveal>
        <PopularSearches language={language} />
      </Reveal>

      <Reveal
        as="section"
        id="cotizacion"
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black"
      >
        <QuoteForm2Step translations={t} WHATSAPP_LINK={WHATSAPP_LINK} />
      </Reveal>

      {/* SEO: FAQ con schema FAQPage para resultados enriquecidos en Google */}
      <Reveal>
        <FaqSection language={language} />
      </Reveal>

      <Reveal>
        <SocialSection translations={t} />
      </Reveal>

      <Footer />

      {showChatbot && <Chatbot />}

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-3.5 md:p-4 rounded-full shadow-2xl transition-colors duration-300 transform hover:scale-110 active:scale-95 animate-whatsapp-pulse"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </a>
    </div>
  )
}
