"use client"

import Image from "next/image"
import { Users, Wifi, Wind, Shield } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface FleetSectionProps {
  translations: any
}

type FleetPhoto = {
  src: string
  width: number
  height: number
  alt: string
  label: string
  caption: string
}

function FleetPhotoCard({ photo, priority = false }: { photo: FleetPhoto; priority?: boolean }) {
  const ratio = photo.width / photo.height

  return (
    <figure
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black lg:basis-0"
      style={{ flexGrow: ratio }}
    >
      <Image
        src={photo.src || "/placeholder.svg"}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        quality={90}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 1024px) 100vw, 800px"
        className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-16">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#d4af37]">{photo.label}</span>
        <span className="text-pretty text-sm font-medium leading-relaxed text-white sm:text-base">{photo.caption}</span>
      </figcaption>
    </figure>
  )
}

export function FleetSection({ translations: t }: FleetSectionProps) {
  const { ref, isVisible } = useScrollAnimation()
  const isEn = t.fleetEyebrow?.toLowerCase().includes("fleet")

  const fleetFeatures = [
    { icon: Shield, text: t.fleetFeatInsurance },
    { icon: Users, text: t.fleetFeatDrivers },
    { icon: Wifi, text: t.fleetFeatWifi },
    { icon: Wind, text: t.fleetFeatAc },
  ]

  const hotelVan: FleetPhoto = {
    src: "/images/flota/starex-hotel-doubletree.jpg",
    width: 1600,
    height: 1066,
    alt: isEn
      ? "BogotourVIP chauffeur in a suit next to a white Hyundai Starex van at the DoubleTree hotel in Bogotá"
      : "Conductor de BogotourVIP de traje junto a la van Hyundai Starex blanca en el hotel DoubleTree de Bogotá",
    label: isEn ? "Hyundai Starex · up to 9 passengers" : "Hyundai Starex · hasta 9 pasajeros",
    caption: isEn ? "Hotel pickup with a uniformed chauffeur" : "Recogida en tu hotel con conductor uniformado",
  }

  const executiveSuv: FleetPhoto = {
    src: "/images/flota/tucson-conductor-ejecutivo.jpg",
    width: 1033,
    height: 1387,
    alt: isEn
      ? "BogotourVIP executive chauffeur next to a white Hyundai Tucson SUV"
      : "Conductor ejecutivo de BogotourVIP junto a la camioneta Hyundai Tucson blanca",
    label: isEn ? "Hyundai Tucson · up to 4 passengers" : "Hyundai Tucson · hasta 4 pasajeros",
    caption: isEn ? "Executive SUV for couples and business" : "SUV ejecutiva para parejas y negocios",
  }

  const tourVan: FleetPhoto = {
    src: "/images/flota/starex-guatavita-casa-al-reves.jpg",
    width: 1600,
    height: 1200,
    alt: isEn
      ? "White Hyundai Starex van parked by the Upside-Down House on the way to Guatavita"
      : "Van Hyundai Starex blanca estacionada frente a la Casa al Revés camino a Guatavita",
    label: isEn ? "On tour" : "En ruta",
    caption: isEn ? "Comfortable trips to Guatavita, Zipaquirá and beyond" : "Viajes cómodos a Guatavita, Zipaquirá y más",
  }

  const reveal = (delay: number) => ({
    className: isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    style: {
      transitionProperty: "opacity, transform",
      transitionDuration: "0.6s",
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "ease-out",
    },
  })

  const header = reveal(0)
  const rowOne = reveal(100)
  const rowTwo = reveal(200)
  const features = reveal(300)

  return (
    <section id="flota" className="bg-gradient-to-b from-gray-900 to-black py-16 sm:py-20 md:py-24" ref={ref}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <div className={header.className} style={header.style}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#d4af37] sm:text-sm">
            {t.fleetEyebrow}
          </p>
          <h2 className="text-balance text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {t.fleetTitlePre}
            <br />
            <span className="text-white/60">{t.fleetTitlePost}</span>
          </h2>
        </div>

        <div className={`flex flex-col gap-4 lg:flex-row lg:items-start ${rowOne.className}`} style={rowOne.style}>
          <FleetPhotoCard photo={hotelVan} />
          <FleetPhotoCard photo={executiveSuv} />
        </div>

        <div className={`flex flex-col gap-4 lg:flex-row lg:items-stretch ${rowTwo.className}`} style={rowTwo.style}>
          <FleetPhotoCard photo={tourVan} />
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:basis-0" style={{ flexGrow: 1.1 }}>
            <h3 className="text-balance text-2xl font-bold text-white sm:text-3xl">{t.fleetTeamTitle}</h3>
            <p className="text-pretty leading-relaxed text-white/70">{t.fleetTeamSub}</p>
            <ul className="flex flex-col gap-3 border-t border-white/10 pt-4 text-sm text-white/80">
              <li className="flex items-center justify-between gap-4">
                <span>Hyundai Starex</span>
                <span className="text-[#d4af37]">{isEn ? "1–9 passengers" : "1–9 pasajeros"}</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span>Hyundai Tucson</span>
                <span className="text-[#d4af37]">{isEn ? "1–4 passengers" : "1–4 pasajeros"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 ${features.className}`} style={features.style}>
          {fleetFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-colors duration-300 hover:border-white/20 sm:p-5"
            >
              <feature.icon className="h-7 w-7 text-[#d4af37] sm:h-8 sm:w-8" aria-hidden="true" />
              <span className="text-xs font-medium text-white/80 sm:text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
