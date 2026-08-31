"use client"

import Image from "next/image"
import { Users, Wifi, Wind, Shield } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface FleetSectionProps {
  translations: any
}

export function FleetSection({ translations: t }: FleetSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  const fleetFeatures = [
    { icon: Shield, text: t.fleetFeatInsurance },
    { icon: Users, text: t.fleetFeatDrivers },
    { icon: Wifi, text: t.fleetFeatWifi },
    { icon: Wind, text: t.fleetFeatAc },
  ]

  return (
    <section id="flota" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-900 to-black" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`mb-12 sm:mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionTimingFunction: "ease-out" }}
        >
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            {t.fleetEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            {t.fleetTitlePre}<br />
            <span className="text-white/60">{t.fleetTitlePost}</span>
          </h2>
        </div>

        {/* Main Fleet Image */}
        <div
          className={`relative rounded-2xl overflow-hidden mb-10 border border-white/10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "100ms", transitionTimingFunction: "ease-out" }}
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src="/images/img-3038.jpeg"
              alt="Flota completa de vehiculos BogotourVIP con conductores profesionales"
              fill
              className="object-cover"
              quality={80}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 1024px, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                {t.fleetTeamTitle}
              </h3>
              <p className="text-white/70 text-sm sm:text-base max-w-xl">
                {t.fleetTeamSub}
              </p>
            </div>
          </div>
        </div>

        {/* Fleet Features */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "200ms", transitionTimingFunction: "ease-out" }}
        >
          {fleetFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 sm:p-5 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#d4af37] mb-2" />
              <span className="text-xs sm:text-sm font-medium text-white/80">{feature.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
