"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Award, Clock, Users } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface MissionSectionProps {
  translations: any
  scrollToCotizacion: () => void
}

export function MissionSection({ translations: t, scrollToCotizacion }: MissionSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })

  const features = [
    { icon: Award, text: "Servicio Premium Certificado" },
    { icon: Clock, text: "Disponibilidad 24/7" },
    { icon: Users, text: "Conductores Bilingues" },
    { icon: CheckCircle, text: "Seguro Todo Riesgo" },
  ]

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-28 lg:py-36 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* Left: Text Content */}
          <div
            className={`${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <span className="inline-block text-[#d4af37] text-sm sm:text-base font-semibold tracking-wider uppercase mb-4">
              Nuestra Mision
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
              Transformamos tu viaje en una{" "}
              <span className="text-[#d4af37]">experiencia inolvidable</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              En BogotourVIP nos dedicamos a ofrecer servicios de transporte turistico de alta calidad, 
              combinando seguridad, confort y conocimiento local para que descubras lo mejor de Colombia.
            </p>

            {/* Feature list */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{
                    transitionProperty: "opacity, transform",
                    transitionDuration: "0.5s",
                    transitionDelay: `${300 + index * 100}ms`,
                    transitionTimingFunction: "ease-out",
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={scrollToCotizacion}
              size="lg"
              className="bg-[#d4af37] text-black hover:bg-[#f0c54a] transition-all duration-300 transform hover:scale-105 text-base sm:text-lg px-8 py-4 h-auto font-semibold shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)]"
            >
              Solicitar Cotizacion
            </Button>
          </div>

          {/* Right: Featured Image with floating card */}
          <div
            className={`relative ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionDelay: "200ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/img-0705.jpeg"
                alt="Turistas felices en Monserrate con letrero BOGOTA"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <div
              className={`absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-5 sm:p-6 border border-border ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "500ms", transitionTimingFunction: "ease-out" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#d4af37] flex items-center justify-center">
                  <Users className="w-7 h-7 text-black" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">+5,000</p>
                  <p className="text-sm text-muted-foreground">Clientes Satisfechos</p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
