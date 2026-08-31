"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface DidYouKnowSectionProps {
  scrollToCotizacion: () => void
}

export function DidYouKnowSection({ scrollToCotizacion }: DidYouKnowSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/imagen-20jpeg-286-29.jpeg"
          alt="Vista panoramica de Bogota"
          fill
          className="object-cover opacity-20"
          quality={60}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <div
            className={`relative order-2 lg:order-1 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main circular image */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-[#d4af37]/30 shadow-2xl shadow-[#d4af37]/20">
                <Image
                  src="/images/8d733a9d-0c91-4e65-b62a-118412f8c3a3.jpg"
                  alt="Tour en hacienda cafetera"
                  fill
                  className="object-cover"
                  sizes="400px"
                  quality={80}
                  loading="lazy"
                />
              </div>
              {/* Decorative rings */}
              <div className="absolute inset-4 rounded-full border border-[#d4af37]/20 animate-spin-slow" />
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/10" />
              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-[#d4af37] text-black px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                +400 anos de historia
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`order-1 lg:order-2 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionDelay: "200ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] text-sm sm:text-base font-semibold tracking-wider uppercase">
                Sabias Que
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1]">
              Bogota fue fundada en{" "}
              <span className="text-[#d4af37]">1538</span>
            </h2>

            <p className="text-lg sm:text-xl text-white/80 mb-6 leading-relaxed">
              La capital de Colombia es una de las ciudades mas antiguas de America del Sur, 
              con una rica mezcla de historia precolombina y colonial que se refleja en cada rincon de La Candelaria.
            </p>

            <p className="text-base sm:text-lg text-white/60 mb-8 leading-relaxed">
              Con nuestros tours guiados, descubriras los secretos de una ciudad que ha sido testigo de mas de 
              cuatro siglos de historia, desde los muiscas hasta la vibrante metropolis moderna de hoy.
            </p>

            <Button
              onClick={scrollToCotizacion}
              size="lg"
              className="bg-[#d4af37] text-black hover:bg-[#f0c54a] transition-all duration-300 transform hover:scale-105 text-base sm:text-lg px-8 py-4 h-auto font-semibold shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)]"
            >
              Explorar Tours Historicos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
