"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Briefcase, Plane, Calendar, ArrowUpRight } from "lucide-react"

interface ServicesSectionProps {
  translations: any
  scrollToCotizacion: () => void
}

const WHATSAPP_NUMBER = "573108677635"

export function ServicesSection({ translations }: ServicesSectionProps) {
  const [active, setActive] = useState(0)

  const quoteLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  const services = [
    {
      icon: MapPin,
      title: translations.privateTours,
      description: translations.privateToursDesc,
      image: "/images/plaza-bolivar-tours-family.jpg",
      quoteMessage: translations.quoteMsgPrivateTours,
    },
    {
      icon: Briefcase,
      title: translations.executiveService,
      description: translations.executiveServiceDesc,
      image: "/images/suv-hotel-w.jpg",
      quoteMessage: translations.quoteMsgExecutive,
    },
    {
      icon: Plane,
      title: translations.airportTransfer,
      description: translations.airportTransferDesc,
      image: "/images/servicio-aeropuerto.jpg",
      quoteMessage: translations.quoteMsgAirport,
    },
    {
      icon: Calendar,
      title: translations.specialEvents,
      description: translations.specialEventsDesc,
      image: "/images/equipo-vans.jpg",
      quoteMessage: translations.quoteMsgSpecialEvents,
    },
  ]

  return (
    <section id="servicios" className="overflow-hidden bg-ink py-16 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 lg:gap-14">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Servicios</p>
            <h2 className="font-playfair text-4xl font-bold leading-[1.05] text-balance text-ink-foreground sm:text-5xl lg:text-6xl">
              Todo lo que necesitas <span className="italic text-ink-foreground/50">para explorar Colombia.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink-foreground/60">
            {"Pasa el cursor o toca cada servicio para conocerlo y cotízalo directo por WhatsApp."}
          </p>
        </div>

        <ul className="flex flex-col gap-3 lg:h-[520px] lg:flex-row">
          {services.map((service, index) => {
            const isActive = index === active
            const Icon = service.icon
            return (
              <li
                key={service.title}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`group relative flex min-h-80 cursor-pointer flex-col justify-end overflow-hidden rounded-[2rem] p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 lg:min-h-0 ${
                  isActive ? "lg:flex-[3]" : "lg:flex-1"
                }`}
              >
                <Image
                  src={service.image}
                  alt={`BogotourVIP - ${service.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={80}
                  className={`object-cover transition-transform duration-1000 ${isActive ? "scale-105" : "scale-100"}`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10 transition-opacity duration-500 ${
                    isActive ? "opacity-90" : "opacity-100 lg:bg-ink/60"
                  }`}
                />

                <span
                  className={`absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-500 sm:left-8 sm:top-8 ${
                    isActive ? "bg-accent text-accent-foreground" : "bg-ink-foreground/15 text-ink-foreground backdrop-blur-md"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="relative flex flex-col gap-3">
                  <h3 className="font-playfair text-2xl font-semibold leading-tight text-ink-foreground sm:text-3xl">
                    {service.title}
                  </h3>
                  <div
                    className={`grid transition-all duration-500 ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                    }`}
                  >
                    <div className="flex flex-col items-start gap-5 overflow-hidden">
                      <p className="max-w-md text-base leading-relaxed text-ink-foreground/75">{service.description}</p>
                      <a
                        href={quoteLink(service.quoteMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 items-center gap-2 rounded-full bg-ink-foreground px-6 text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {translations.quoteButton}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
