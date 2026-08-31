"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, Plane, Calendar } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ServicesSectionProps {
  translations: any
  scrollToCotizacion: () => void
}

// Numero principal de WhatsApp del asesor de BogotourVIP
const WHATSAPP_NUMBER = "573108677635"

export function ServicesSection({ translations, scrollToCotizacion }: ServicesSectionProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  // Genera el enlace de WhatsApp hacia el asesor con el mensaje de cotizacion del servicio.
  const quoteLink = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  const services = [
    {
      icon: MapPin,
      title: translations.privateTours,
      description: translations.privateToursDesc,
      color: "from-amber-500 to-orange-600",
      image: "/images/plaza-bolivar-tours-family.jpg",
      quoteMessage: translations.quoteMsgPrivateTours,
    },
    {
      icon: Briefcase,
      title: translations.executiveService,
      description: translations.executiveServiceDesc,
      color: "from-blue-500 to-indigo-600",
      image: "/images/suv-hotel-w.jpg",
      quoteMessage: translations.quoteMsgExecutive,
    },
    {
      icon: Plane,
      title: translations.airportTransfer,
      description: translations.airportTransferDesc,
      color: "from-green-500 to-emerald-600",
      image: "/images/servicio-aeropuerto.jpg",
      quoteMessage: translations.quoteMsgAirport,
    },
    {
      icon: Calendar,
      title: translations.specialEvents,
      description: translations.specialEventsDesc,
      color: "from-purple-500 to-pink-600",
      image: "/images/equipo-vans.jpg",
      quoteMessage: translations.quoteMsgSpecialEvents,
    },
  ]

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`mb-12 sm:mb-16 md:mb-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "ease-out" }}
        >
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            SERVICIOS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Todo lo que necesitas<br />
            <span className="text-white/60">para explorar Colombia.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`bg-white/5 border-white/10 hover:border-white/20 overflow-hidden group relative rounded-2xl transition-all duration-500 hover:bg-white/10 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "0.7s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Service Image */}
              <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={`BogotourVIP - ${service.title}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={80}
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${service.color}`}>
                    <service.icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-4">
                  {service.description}
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full text-[#d4af37] hover:text-white hover:bg-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 text-sm h-10"
                >
                  <a href={quoteLink(service.quoteMessage)} target="_blank" rel="noopener noreferrer">
                    {translations.quoteButton}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
