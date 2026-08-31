"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, ChevronLeft, ChevronRight, Star, ShieldCheck, ChevronDown } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  translations: any
  scrollToCotizacion: () => void
  WHATSAPP_LINK: string
}

const heroImages = [
  {
    src: "/images/bogota-skyline-panorama.webp",
    alt: "Vista panoramica del skyline de Bogota",
  },
  {
    src: "/images/plaza-bolivar-catedral.jpg",
    alt: "Plaza Bolivar con la Catedral Primada de Bogota",
  },
  {
    src: "/images/img-0705.jpeg",
    alt: "Turistas en el mirador de Bogota con letrero",
  },
  {
    src: "/images/villa-de-leyva.png",
    alt: "Villa de Leyva - Pueblo patrimonio",
  },
]

export function HeroSection({ translations, scrollToCotizacion, WHATSAPP_LINK }: HeroSectionProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  // El carrusel arranca despues de que carga la imagen principal (LCP),
  // asi las demas imagenes no compiten por ancho de banda al inicio.
  const [carouselStarted, setCarouselStarted] = useState(false)
  const touchStartX = useRef(0)

  const nextImage = useCallback(() => {
    setCarouselStarted(true)
    setCurrentImage((prev) => (prev + 1) % heroImages.length)
  }, [])

  const prevImage = useCallback(() => {
    setCarouselStarted(true)
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }, [])

  // Difiere el inicio del autoplay ~2.5s para priorizar el render inicial y el LCP.
  useEffect(() => {
    const startDelay = setTimeout(() => setCarouselStarted(true), 2500)
    return () => clearTimeout(startDelay)
  }, [])

  // Autoplay solo tras el arranque diferido, y pausado cuando la pestana no esta visible
  // (ahorra CPU, bateria y datos).
  useEffect(() => {
    if (!carouselStarted) return
    let timer: ReturnType<typeof setInterval>
    const start = () => {
      timer = setInterval(nextImage, 6000)
    }
    const handleVisibility = () => {
      clearInterval(timer)
      if (!document.hidden) start()
    }
    start()
    document.addEventListener("visibilitychange", handleVisibility)
    return () => {
      clearInterval(timer)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [carouselStarted, nextImage])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? nextImage() : prevImage()
  }

  return (
    <section
      id="inicio"
      className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] lg:min-h-[100vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background images with Ken Burns zoom effect */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => {
          // Al inicio solo la imagen 0 (LCP). Las adyacentes se cargan recien cuando arranca
          // el carrusel, evitando que compitan por ancho de banda con el render inicial.
          const shouldRender =
            index === 0 ||
            (carouselStarted &&
              (index === currentImage || index === (currentImage + 1) % heroImages.length))
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              {shouldRender && (
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={index === 0 ? 72 : 70}
                  sizes="100vw"
                  className="object-cover object-center brightness-[0.65] saturate-[1.15]"
                />
              )}
            </div>
          )
        })}

        {/* Multi-layer gradient for depth - stronger on mobile for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 sm:from-black/70 sm:via-transparent sm:to-black/20 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.18),transparent_55%)] z-[1]" />
      </div>

      {/* Navigation arrows - hidden on small mobile, swipe is primary */}
      <button
        onClick={prevImage}
        className="hidden sm:block absolute left-3 sm:left-5 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 md:p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-300 backdrop-blur-lg border border-white/20 hover:border-white/40 hover:scale-110 active:scale-95"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
      </button>
      <button
        onClick={nextImage}
        className="hidden sm:block absolute right-3 sm:right-5 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 md:p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-300 backdrop-blur-lg border border-white/20 hover:border-white/40 hover:scale-110 active:scale-95"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
      </button>

      {/* Progress bar indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-2.5">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className="relative h-1.5 sm:h-2 rounded-full overflow-hidden transition-all duration-500"
            style={{ width: index === currentImage ? "2rem" : "0.625rem" }}
            aria-label={`Go to image ${index + 1}`}
          >
            <div className="absolute inset-0 bg-white/30" />
            {index === currentImage && (
              <div
                className="absolute inset-0 bg-[#d4af37] rounded-full"
                style={{ animation: "progressFill 6s linear" }}
              />
            )}
            {index !== currentImage && <div className="absolute inset-0 bg-white/50 hover:bg-white/70 rounded-full" />}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 lg:px-10 max-w-5xl mx-auto py-8 sm:py-12">
        {/* SEO: terminos mas buscados por turistas, accesible para buscadores y lectores de pantalla */}
        <p className="sr-only">
          Tours en Bogotá y transporte turístico privado: City Tour, Monserrate, La Candelaria, Laguna de Guatavita,
          Catedral de Sal de Zipaquirá, tour de café, tour Villa de Leyva y traslado al aeropuerto El Dorado. Guías que
          hablan español e inglés. Bogota private tours, city tour and airport transfer with English speaking guides.
        </p>
        {/* Stats row */}
        <div
          className={`flex justify-center gap-8 sm:gap-12 md:gap-16 mb-8 sm:mb-10 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionTimingFunction: "ease-out" }}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">500+</div>
            <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">{translations.statTours}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">98%</div>
            <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">{translations.statSatisfaction}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">7</div>
            <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">{translations.statLanguages}</div>
          </div>
        </div>

        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 text-balance leading-[1.1] text-white ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "100ms", transitionTimingFunction: "ease-out" }}
        >
          {translations.heroTitlePre}<br />
          <span className="text-[#d4af37]">Colombia</span><br />
          {translations.heroTitlePost}
        </h1>
        <p
          className={`text-base sm:text-lg md:text-xl text-white/80 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "150ms", transitionTimingFunction: "ease-out" }}
        >
          {translations.heroSubtitle}
        </p>

        {/* Single CTA Button */}
        <div
          className={`${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "200ms", transitionTimingFunction: "ease-out" }}
        >
          <Button
            size="lg"
            onClick={scrollToCotizacion}
            className="bg-white text-black hover:bg-white/90 text-sm sm:text-base font-medium px-8 sm:px-10 py-4 sm:py-5 h-auto rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            {translations.reserveNow}
          </Button>
        </div>
      </div>
    </section>
  )
}
