"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Star, ChevronRight, Navigation, Camera, Coffee, Mountain, Landmark, Palette, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const destinations = [
  {
    id: 1,
    name: "La Candelaria",
    category: "Centro Historico",
    image: "/images/la-candelaria-grafitis.jpg",
    description: "Corazon colonial de Bogota con calles empedradas, arte callejero vibrante y arquitectura historica.",
    highlights: ["Museo del Oro", "Chorro de Quevedo", "Grafitis", "Gastronomia local"],
    duration: "3-4 horas",
    rating: 4.9,
    distance: "Centro",
    icon: Palette,
    position: { top: "45%", left: "48%" },
    slug: "la-candelaria",
  },
  {
    id: 2,
    name: "Monserrate",
    category: "Mirador",
    image: "/images/imagen-20jpeg-286-29.jpeg",
    description: "Santuario a 3,152m de altura con vistas panoramicas espectaculares de toda la ciudad.",
    highlights: ["Teleferico", "Sendero ecologico", "Restaurantes tipicos", "Santuario"],
    duration: "2-3 horas",
    rating: 4.8,
    distance: "5 km",
    icon: Mountain,
    position: { top: "35%", left: "55%" },
    slug: "monserrate",
  },
  {
    id: 3,
    name: "Laguna de Guatavita",
    category: "Naturaleza",
    image: "/images/guatavita.jpg",
    description: "Laguna sagrada Muisca, origen de la leyenda de El Dorado, rodeada de paisajes andinos unicos.",
    highlights: ["Caminata ecologica", "Historia Muisca", "El Dorado", "Paisajes andinos"],
    duration: "4-5 horas",
    rating: 4.7,
    distance: "60 km",
    icon: Landmark,
    position: { top: "48%", left: "45%" },
    slug: "laguna-de-guatavita",
  },
  {
    id: 4,
    name: "Catedral de Sal",
    category: "Cultura",
    image: "/images/plaza-bolivar-monserrate.jpg",
    description: "Impresionante catedral tallada dentro de una mina de sal a 180 metros de profundidad en Zipaquira.",
    highlights: ["Catedral subterranea", "Via Crucis en sal", "Mineria historica", "Pueblo de Zipaquira"],
    duration: "5-6 horas",
    rating: 4.8,
    distance: "49 km",
    icon: Landmark,
    position: { top: "20%", left: "52%" },
    slug: "catedral-de-sal-zipaquira",
  },
  {
    id: 5,
    name: "Villa de Leyva",
    category: "Pueblo Patrimonio",
    image: "/images/villa-de-leyva.png",
    description: "Uno de los pueblos mas bellos de Colombia, con su enorme plaza empedrada y casas coloniales blancas.",
    highlights: ["Plaza Mayor colonial", "Vinedos de altura", "Museos paleontologicos", "Gastronomia boyacense"],
    duration: "Dia completo",
    rating: 4.9,
    distance: "160 km",
    icon: Camera,
    position: { top: "30%", left: "42%" },
    slug: "villa-de-leyva",
  },
]

const WHATSAPP_LINK =
  "https://wa.me/573108677635?text=Hola%20BogotourVIP%2C%20quiero%20cotizar%20tu%20servicio.%20%C2%BFMe%20pueden%20ayudar%20con%20la%20informacion%20y%20el%20precio%3F"

interface InteractiveDestinationsProps {
  translations: any
}

export function InteractiveDestinations({ translations: t }: InteractiveDestinationsProps) {
  const [selectedDestination, setSelectedDestination] = useState(destinations[0])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const benefits = [
    { icon: Languages, title: t.destBenefit1Title, description: t.destBenefit1Desc },
    { icon: Star, title: t.destBenefit2Title, description: t.destBenefit2Desc },
    { icon: Camera, title: t.destBenefit3Title, description: t.destBenefit3Desc },
    { icon: Clock, title: t.destBenefit4Title, description: t.destBenefit4Desc },
  ]

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`mb-10 sm:mb-14 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionTimingFunction: "ease-out" }}
        >
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            {t.destEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
            {t.destTitlePre}<br />
            <span className="text-white/60">{t.destTitlePost}</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl">
            {t.destSubtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "80ms", transitionTimingFunction: "ease-out" }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 text-center hover:border-white/20 transition-colors duration-300"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-[#d4af37]/20 flex items-center justify-center">
                <benefit.icon className="w-5 h-5 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{benefit.title}</h3>
              <p className="text-xs text-white/50">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Interactive Map */}
          <div
            className={`relative ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "100ms", transitionTimingFunction: "ease-out" }}
          >
            {/* Map Background */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-white/10 overflow-hidden">
              {/* Stylized Map Grid */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="text-white/30">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* City Silhouette */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#d4af37]/10 to-transparent" />

              {/* Map Title */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                <p className="text-xs text-white/60 uppercase tracking-wider">{t.destMapOf}</p>
                <p className="text-sm font-semibold text-white">Bogota, Colombia</p>
              </div>

              {/* Destination Markers */}
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestination(dest)}
                  onMouseEnter={() => setHoveredId(dest.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
                    selectedDestination.id === dest.id ? "z-20 scale-125" : "z-10 hover:scale-110"
                  }`}
                  style={{ top: dest.position.top, left: dest.position.left }}
                >
                  {/* Pulse Effect */}
                  {selectedDestination.id === dest.id && (
                    <span className="absolute inset-0 rounded-full bg-[#d4af37] animate-ping opacity-30" />
                  )}
                  
                  {/* Marker */}
                  <div
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      selectedDestination.id === dest.id
                        ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/40"
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <dest.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Tooltip */}
                  {(hoveredId === dest.id || selectedDestination.id === dest.id) && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10">
                      {dest.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-white/10" />
                    </div>
                  )}
                </button>
              ))}

              {/* Decorative Elements */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/40 text-xs">
                <Navigation className="w-3 h-3" />
                <span>{t.destInteractive}</span>
              </div>
            </div>

            {/* Destination Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedDestination.id === dest.id
                      ? "bg-[#d4af37] text-black"
                      : "bg-white/5 text-white/70 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Details */}
          <div
            className={`${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "200ms", transitionTimingFunction: "ease-out" }}
          >
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col">
              {/* Image */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full">
                  {selectedDestination.category}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                  <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                  <span className="text-white text-xs font-medium">{selectedDestination.rating}</span>
                </div>

                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {selectedDestination.name}
                  </h3>
                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedDestination.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedDestination.distance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <p className="text-white/70 text-sm sm:text-base mb-5 leading-relaxed">
                  {selectedDestination.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Destacados</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestination.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/80"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="flex-1 bg-[#d4af37] text-black hover:bg-[#c9a430] font-semibold"
                  >
                    <Link href={`/tours/${selectedDestination.slug}`}>
                      Ver Tour Completo
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      Reservar
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className={`mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.6s", transitionDelay: "300ms", transitionTimingFunction: "ease-out" }}
        >
          {[
            { value: "500+", label: "Tours realizados" },
            { value: "5", label: "Idiomas" },
            { value: "98%", label: "Satisfaccion" },
            { value: "10+", label: "Anos de experiencia" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#d4af37] mb-1">{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Ver todos los tours */}
        <div className="mt-8 sm:mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 font-semibold px-8 py-3 h-auto"
          >
            <Link href="/tours">
              Ver todos los tours
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
