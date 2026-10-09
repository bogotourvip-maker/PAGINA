"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Star, ChevronRight, Camera, Mountain, Landmark, Palette, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { tourHref } from "@/lib/tour-routes"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const destinations = [
  {
    id: 1,
    name: "La Candelaria",
    category: "Centro Histórico",
    photos: [
      "/images/la-candelaria-grafitis.jpg",
      "/images/candelaria-calle-colonial.jpg",
      "/images/calle-embudo-sombrillas.jpg",
      "/images/sitio-chorro-quevedo.png",
    ],
    review:
      "El corazón colonial de Bogotá. Caminamos por calles empedradas llenas de grafitis, casas coloniales y cafés escondidos. Visitamos la Calle del Embudo, el Chorro de Quevedo, donde se fundó la ciudad, y el Museo del Oro, con más de 30.000 piezas precolombinas.",
    highlights: ["Museo del Oro", "Chorro de Quevedo", "Grafitis", "Gastronomía local"],
    duration: "3-4 horas",
    rating: 4.9,
    distance: "Centro",
    icon: Palette,
    slug: "la-candelaria",
  },
  {
    id: 2,
    name: "Monserrate",
    category: "Mirador",
    photos: [
      "/images/monserrate-luna-atardecer.jpg",
      "/images/monserrate-iglesia-dia.jpg",
      "/images/monserrate-jardines.jpg",
      "/images/sitio-monserrate.png",
    ],
    review:
      "El santuario está a 3.152 metros de altura y desde arriba se ve toda la ciudad. Se sube en teleférico o funicular, y allá hay jardines, una iglesia del siglo XVII y restaurantes típicos. Vale la pena ir al atardecer para ver cómo se encienden las luces de Bogotá.",
    highlights: ["Teleférico", "Sendero ecológico", "Restaurantes típicos", "Santuario"],
    duration: "2-3 horas",
    rating: 4.8,
    distance: "5 km",
    icon: Mountain,
    slug: "monserrate",
  },
  {
    id: 3,
    name: "Laguna de Guatavita",
    category: "Naturaleza",
    photos: ["/images/guatavita.jpg", "/images/sitio-pueblo-guatavita.png"],
    review:
      "Una laguna sagrada para los muiscas y el origen de la leyenda de El Dorado. Se recorre por un sendero ecológico entre páramo andino, con guías que explican la historia del lugar. Después pasamos por el pueblo de Guatavita, de casas blancas junto al embalse.",
    highlights: ["Caminata ecológica", "Historia Muisca", "El Dorado", "Paisajes andinos"],
    duration: "4-5 horas",
    rating: 4.7,
    distance: "60 km",
    icon: Landmark,
    slug: "laguna-de-guatavita",
  },
  {
    id: 4,
    name: "Catedral de Sal",
    category: "Cultura",
    photos: [
      "/images/catedral-sal-nave-lampara.jpg",
      "/images/catedral-sal-cruz-dorada.jpg",
      "/images/catedral-sal-angel.jpg",
      "/images/sitio-zipaquira-centro.png",
    ],
    review:
      "Una catedral tallada dentro de una mina de sal, a 180 metros bajo tierra en Zipaquirá. Las naves, el Vía Crucis y las cúpulas iluminadas son impresionantes. Al terminar recorremos el centro colonial de Zipaquirá, con su plaza y su catedral.",
    highlights: ["Catedral subterránea", "Vía Crucis en sal", "Minería histórica", "Pueblo de Zipaquirá"],
    duration: "5-6 horas",
    rating: 4.8,
    distance: "49 km",
    icon: Landmark,
    slug: "catedral-de-sal-zipaquira",
  },
  {
    id: 5,
    name: "Villa de Leyva",
    category: "Pueblo Patrimonio",
    photos: [
      "/images/villa-leyva-plaza-mayor.jpg",
      "/images/casa-terracota-villa-leyva.jpg",
      "/images/pozos-azules-villa-leyva.jpg",
      "/images/villa-de-leyva.png",
    ],
    review:
      "Es uno de los pueblos más bonitos de Colombia y tiene una de las plazas empedradas más grandes de Latinoamérica. En el recorrido conocemos la Casa Terracota, hecha en barro cocido, y las lagunas turquesa de los Pozos Azules. El día termina con comida boyacense.",
    highlights: ["Plaza Mayor colonial", "Casa Terracota", "Pozos Azules", "Gastronomía boyacense"],
    duration: "Día completo",
    rating: 4.9,
    distance: "160 km",
    icon: Camera,
    slug: "villa-de-leyva",
  },
]

const WHATSAPP_LINK =
  "https://wa.me/573108677635?text=Hola%20BogotourVIP%2C%20quiero%20cotizar%20tu%20servicio.%20%C2%BFMe%20pueden%20ayudar%20con%20la%20informacion%20y%20el%20precio%3F"

interface InteractiveDestinationsProps {
  translations: any
}

export function InteractiveDestinations({ translations: t }: InteractiveDestinationsProps) {
  const [selected, setSelected] = useState(destinations[0])
  const [photoIndex, setPhotoIndex] = useState(0)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const selectDestination = (dest: (typeof destinations)[number]) => {
    setSelected(dest)
    setPhotoIndex(0)
  }

  const benefits = [
    { icon: Languages, title: t.destBenefit1Title, description: t.destBenefit1Desc },
    { icon: Star, title: t.destBenefit2Title, description: t.destBenefit2Desc },
    { icon: Camera, title: t.destBenefit3Title, description: t.destBenefit3Desc },
    { icon: Clock, title: t.destBenefit4Title, description: t.destBenefit4Desc },
  ]

  const reveal = (delay: number) => ({
    className: isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    style: {
      transitionProperty: "opacity, transform",
      transitionDuration: "0.6s",
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "ease-out",
    },
  })

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`mb-10 sm:mb-14 ${reveal(0).className}`} style={reveal(0).style}>
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            {t.destEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 text-balance">
            {t.destTitlePre}
            <br />
            <span className="text-white/60">{t.destTitlePost}</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl text-pretty">{t.destSubtitle}</p>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14 ${reveal(80).className}`}
          style={reveal(80).style}
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

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div
            role="tablist"
            aria-label="Destinos"
            className={`flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-80 lg:shrink-0 snap-x ${reveal(100).className}`}
            style={reveal(100).style}
          >
            {destinations.map((dest) => {
              const active = selected.id === dest.id
              return (
                <button
                  key={dest.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectDestination(dest)}
                  className={`group flex items-center gap-3 p-2 pr-4 rounded-xl border text-left shrink-0 snap-start transition-colors duration-300 min-w-64 lg:min-w-0 ${
                    active
                      ? "bg-[#d4af37]/10 border-[#d4af37]"
                      : "bg-white/5 border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image src={dest.photos[0]} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-semibold text-sm ${active ? "text-[#d4af37]" : "text-white"}`}>
                      {dest.name}
                    </span>
                    <span className="text-xs text-white/50">{dest.category}</span>
                    <span className="flex items-center gap-1 text-xs text-white/60 mt-1">
                      <Camera className="w-3 h-3" />
                      {dest.photos.length} fotos
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ml-auto shrink-0 transition-transform ${
                      active ? "text-[#d4af37] translate-x-0.5" : "text-white/30"
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            aria-label={selected.name}
            className={`flex-1 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col ${reveal(200).className}`}
            style={reveal(200).style}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
              <Image
                key={selected.photos[photoIndex]}
                src={selected.photos[photoIndex]}
                alt={`${selected.name}, foto ${photoIndex + 1} de ${selected.photos.length}`}
                fill
                className="object-cover animate-in fade-in duration-500"
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full">
                {selected.category}
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                <span className="text-white text-xs font-medium">{selected.rating}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{selected.name}</h3>
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selected.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selected.distance}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 p-3 sm:p-4 border-b border-white/10 overflow-x-auto">
              {selected.photos.map((photo, index) => (
                <button
                  key={photo}
                  onClick={() => setPhotoIndex(index)}
                  aria-label={`Ver foto ${index + 1} de ${selected.name}`}
                  aria-pressed={photoIndex === index}
                  className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    photoIndex === index ? "border-[#d4af37]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={photo} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-wider text-[#d4af37]">Reseña del lugar</p>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed text-pretty">{selected.review}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selected.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/80"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1 bg-[#d4af37] text-black hover:bg-[#c9a430] font-semibold">
                  <Link href={tourHref(selected.slug)}>
                    Ver Tour Completo
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    Reservar
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 font-semibold px-8 py-3 h-auto bg-transparent"
          >
            <Link href="/servicios">
              Ver todos los tours
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
