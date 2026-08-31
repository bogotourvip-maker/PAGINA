"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Hotel, Utensils, ShoppingBag, Camera, Star, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const recommendations = {
  centro: {
    hotels: [
      { name: "Hotel de la Opera", stars: 5, highlight: "En pleno centro historico, arquitectura colonial restaurada" },
      { name: "Casa Medina", stars: 5, highlight: "Elegancia clasica bogotana, servicio excepcional" },
      { name: "Selina La Candelaria", stars: 4, highlight: "Moderno y social, perfecto para viajeros jovenes" },
    ],
    restaurants: [
      { name: "Mini-Mal", highlight: "Alta cocina colombiana contemporanea, ingredientes locales" },
      { name: "La Puerta Falsa", highlight: "Tradicion desde 1816, el mejor chocolate santafereno" },
      { name: "Prudencia", highlight: "Cocina de autor con vista a la Plaza de Bolivar" },
    ],
    shopping: [
      { name: "Centro Comercial Gran Estacion", highlight: "El mas grande de Colombia, todas las marcas" },
      { name: "Mercado de las Pulgas", highlight: "Antiguedades y artesanias los domingos en Usaquen" },
      { name: "Pasaje Rivas", highlight: "Artesanias tradicionales colombianas" },
    ],
    attractions: [
      { name: "Cerro de Monserrate", highlight: "Vista panoramica de toda la ciudad, santuario religioso" },
      { name: "Museo del Oro", highlight: "La coleccion de oro prehispanico mas grande del mundo" },
      { name: "Plaza de Bolivar", highlight: "Corazon politico e historico de Colombia" },
    ],
  },
  norte: {
    hotels: [
      { name: "Four Seasons Bogota", stars: 5, highlight: "El hotel mas lujoso de Colombia, spa de clase mundial" },
      { name: "JW Marriott Bogota", stars: 5, highlight: "Elegancia moderna, ubicacion privilegiada" },
      { name: "Hilton Bogota", stars: 5, highlight: "Vista espectacular, centro de negocios premium" },
    ],
    restaurants: [
      { name: "Harry Sasson", highlight: "El chef mas famoso de Colombia, fusion internacional" },
      { name: "Criterion", highlight: "Cocina francesa de alta gama, ambiente sofisticado" },
      { name: "La Mar", highlight: "El mejor ceviche y cocina peruana de Bogota" },
    ],
    shopping: [
      { name: "Centro Comercial Andino", highlight: "Boutiques de lujo y marcas internacionales" },
      { name: "Centro Comercial El Retiro", highlight: "Tiendas exclusivas y gastronomia premium" },
      { name: "Atlantis Plaza", highlight: "Moda de disenador y arte contemporaneo" },
    ],
    attractions: [
      { name: "Parque de Usaquen", highlight: "Mercado de pulgas dominical, ambiente bohemio" },
      { name: "Hacienda Santa Barbara", highlight: "Centro comercial en hacienda colonial restaurada" },
      { name: "Parque de la 93", highlight: "El parque mas elegante, rodeado de restaurantes" },
    ],
  },
  zonag: {
    hotels: [
      { name: "W Bogota", stars: 5, highlight: "Diseno vanguardista, rooftop bar espectacular" },
      { name: "Hotel B.O.G.", stars: 5, highlight: "Boutique de lujo, arquitectura contemporanea" },
      { name: "Click Clack Hotel", stars: 4, highlight: "Diseno innovador, ambiente joven y moderno" },
    ],
    restaurants: [
      { name: "Leo Cocina y Cava", highlight: "2 Estrellas Michelin, la chef Leonor Espinosa" },
      { name: "El Cielo", highlight: "Experiencia gastronomica multisensorial unica" },
      { name: "Villanos en Bermudas", highlight: "Cocina de autor, ambiente desenfadado" },
    ],
    shopping: [
      { name: "Zona Rosa", highlight: "La T de la moda, boutiques y vida nocturna" },
      { name: "Centro Comercial El Virrey", highlight: "Tiendas de disenadores colombianos" },
      { name: "Galerias", highlight: "Centro comercial con mix de marcas y cine" },
    ],
    attractions: [
      { name: "Parque El Virrey", highlight: "Corredor verde ideal para caminar y ciclismo" },
      { name: "Teatro Nacional", highlight: "Los mejores shows y obras de teatro" },
      { name: "Calle del Sol", highlight: "Bares y restaurantes, vida nocturna premium" },
    ],
  },
}

const categoryIcons = {
  hotels: Hotel,
  restaurants: Utensils,
  shopping: ShoppingBag,
  attractions: Camera,
}

interface RecommendationsSectionProps {
  translations: any
}

export function RecommendationsSection({ translations: t }: RecommendationsSectionProps) {
  const [activeZone, setActiveZone] = useState("centro")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const zones = [
    { id: "centro", name: t.recZone1Name, description: t.recZone1Desc, color: "from-amber-600 to-amber-800" },
    { id: "norte", name: t.recZone2Name, description: t.recZone2Desc, color: "from-emerald-600 to-emerald-800" },
    { id: "zonag", name: t.recZone3Name, description: t.recZone3Desc, color: "from-rose-600 to-rose-800" },
  ]

  const categoryLabels = {
    hotels: t.recHotels,
    restaurants: t.recRestaurants,
    shopping: t.recShopping,
    attractions: t.recAttractions,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const currentZone = zones.find(z => z.id === activeZone)!
  const currentRecommendations = recommendations[activeZone as keyof typeof recommendations]

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`mb-12 sm:mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "ease-out" }}
        >
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            {t.recEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
            {t.recTitlePre}<br />
            <span className="text-white/60">{t.recTitlePost}</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl">
            {t.recSubtitle}
          </p>
        </div>

        {/* Zone Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionDelay: "100ms", transitionTimingFunction: "ease-out" }}
        >
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeZone === zone.id
                  ? "bg-[#d4af37] text-black"
                  : "bg-white/5 border border-white/10 hover:border-white/20 text-white"
              }`}
            >
              {zone.name}
            </button>
          ))}
        </div>

        {/* Zone Description */}
        <div
          className={`text-center mb-8 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionDelay: "150ms", transitionTimingFunction: "ease-out" }}
        >
          <p className="text-sm text-white/60">{currentZone.description}</p>
        </div>

        {/* Recommendations Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionDelay: "200ms", transitionTimingFunction: "ease-out" }}
        >
          {(Object.keys(currentRecommendations) as Array<keyof typeof currentRecommendations>).map((category, categoryIndex) => {
            const Icon = categoryIcons[category]
            const items = currentRecommendations[category]

            return (
              <Card
                key={category}
                className="bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-colors duration-300"
              >
                <CardContent className="p-0">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 p-4 border-b border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {categoryLabels[category]}
                    </h3>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-white/5">
                    {items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="p-3 hover:bg-white/5 transition-colors duration-200 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-sm font-medium text-white group-hover:text-[#d4af37] transition-colors">
                                {item.name}
                              </h4>
                              {"stars" in item && (
                                <div className="flex gap-0.5">
                                  {Array.from({ length: item.stars }).map((_, i) => (
                                    <Star key={i} className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />
                                  ))}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-white/50 line-clamp-1">
                              {item.highlight}
                            </p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#d4af37] transition-colors flex-shrink-0 mt-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionDelay: "300ms", transitionTimingFunction: "ease-out" }}
        >
          <Button
            asChild
            className="bg-[#d4af37] text-black hover:bg-[#c9a430] px-8 py-3 h-auto font-semibold"
          >
            <a
              href="https://wa.me/573108677635?text=Hola%20BogotourVIP%2C%20quiero%20cotizar%20tu%20servicio.%20%C2%BFMe%20pueden%20ayudar%20con%20la%20informacion%20y%20el%20precio%3F"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.recReserveTour}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
