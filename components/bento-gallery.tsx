"use client"

import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface BentoGalleryProps {
  translations: any
}

const galleryImages = [
  {
    src: "/images/la-candelaria-colorful.png",
    alt: "Calles coloridas de La Candelaria",
    span: "col-span-2 row-span-2",
    label: "La Candelaria",
  },
  {
    src: "/images/74e8e8e3-falcao.jpg",
    alt: "BogotourVIP con Radamel Falcao",
    span: "col-span-1 row-span-1",
    label: "Clientes VIP",
  },
  {
    src: "/images/guatavita.jpg",
    alt: "Laguna de Guatavita",
    span: "col-span-1 row-span-1",
    label: "Guatavita",
  },
  {
    src: "/images/villa-de-leyva.png",
    alt: "Villa de Leyva",
    span: "col-span-1 row-span-2",
    label: "Villa de Leyva",
  },
  {
    src: "/images/6f2a0d50-restaurante.jpg",
    alt: "Experiencia gastronomica",
    span: "col-span-1 row-span-1",
    label: "Gastronomia",
  },
  {
    src: "/images/img-3590.jpeg",
    alt: "Pareja en mirador de Bogota",
    span: "col-span-1 row-span-1",
    label: "Miradores",
  },
  {
    src: "/images/img-3038.jpeg",
    alt: "Flota de vehiculos BogotourVIP",
    span: "col-span-2 row-span-1",
    label: "Nuestra Flota",
  },
  {
    src: "/images/plaza-bolivar-tours-family.jpg",
    alt: "Familia en Plaza Bolivar",
    span: "col-span-1 row-span-1",
    label: "Tours Familiares",
  },
]

export function BentoGallery({ translations: t }: BentoGalleryProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="galeria" ref={ref} className="py-16 sm:py-20 md:py-28 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "ease-out" }}
        >
          <span className="inline-block text-[#d4af37] text-sm sm:text-base font-semibold tracking-wider uppercase mb-4">
            Galeria
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-[1.1]">
            {t.galleryTitle || "Momentos Inolvidables"}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.gallerySubtitle || "Descubre los destinos mas impresionantes de Colombia con BogotourVIP"}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`${image.span} relative group rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "0.6s",
                transitionDelay: `${index * 80}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes={image.span.includes("col-span-2") ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                quality={80}
                loading={index < 3 ? "eager" : "lazy"}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-[#d4af37] text-black text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                  {image.label}
                </span>
              </div>
              {/* Corner accent */}
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-[#d4af37] transition-colors duration-300 rounded-tr-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
