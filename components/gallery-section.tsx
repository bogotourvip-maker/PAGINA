"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface GallerySectionProps {
  translations: any
}

const INITIAL_COUNT = 12

const SPAN_PATTERN = ["col-span-2 row-span-2", "", "", "col-span-2", "", "", "", "row-span-2", "", "col-span-2", "", ""]

const galleryImages = [
  { src: "/images/74e8e8e3-falcao.jpg", alt: "BogotourVIP con Radamel Falcao Garcia" },
  { src: "/images/img-3590.jpeg", alt: "Pareja disfrutando la vista panoramica de Bogota" },
  { src: "/images/suv-hotel-w.jpg", alt: "Vehiculo SUV en el Hotel W Bogota" },
  { src: "/images/img-0743.jpeg", alt: "Tour grupal en La Candelaria" },
  { src: "/images/img-0705.jpeg", alt: "Turistas felices en Monserrate con el letrero BOGOTA" },
  { src: "/images/monserrate-luna-atardecer.jpg", alt: "Luna sobre la basilica de Monserrate al atardecer" },
  { src: "/images/bogota-skyline-panorama.webp", alt: "Panoramica del skyline de Bogota" },
  { src: "/images/villa-de-leyva.png", alt: "Villa de Leyva, pueblo colonial de Boyaca" },
  { src: "/images/plaza-bolivar-catedral.jpg", alt: "Catedral Primada en la Plaza de Bolivar" },
  { src: "/images/la-candelaria-grafitis.jpg", alt: "Grafitis en las calles de La Candelaria" },
  { src: "/images/guatavita.jpg", alt: "Laguna de Guatavita, cuna de la leyenda de El Dorado" },
  { src: "/images/img-3038.jpeg", alt: "Flota de vehiculos BogotourVIP" },
  { src: "/images/casa-terracota-villa-leyva.jpg", alt: "Casa Terracota en Villa de Leyva" },
  { src: "/images/pozos-azules-villa-leyva.jpg", alt: "Pozos Azules de Villa de Leyva" },
  { src: "/images/villa-leyva-plaza-mayor.jpg", alt: "Plaza Mayor de Villa de Leyva" },
  { src: "/images/monserrate-iglesia-dia.jpg", alt: "Iglesia de Monserrate de dia" },
  { src: "/images/monserrate-jardines.jpg", alt: "Jardines del santuario de Monserrate" },
  { src: "/images/candelaria-calle-colonial.jpg", alt: "Calle colonial de La Candelaria" },
  { src: "/images/calle-embudo-sombrillas.jpg", alt: "Sombrillas de colores en la Calle del Embudo" },
  { src: "/images/plaza-bolivar-tours-family.jpg", alt: "Familia de tour en la Plaza de Bolivar" },
  { src: "/images/plaza-bolivar-monserrate.jpg", alt: "Plaza de Bolivar con Monserrate al fondo" },
  { src: "/images/imagen-20jpeg-286-29.jpeg", alt: "Vista panoramica de Bogota" },
  { src: "/images/servicio-aeropuerto.jpg", alt: "Traslado al aeropuerto El Dorado" },
  { src: "/images/transporte-ejecutivo.jpg", alt: "Transporte ejecutivo en Bogota" },
  { src: "/images/equipo-vans.jpg", alt: "Vans para eventos y grupos" },
  { src: "/images/8d733a9d-0c91-4e65-b62a-118412f8c3a3.jpg", alt: "Tour en hacienda cafetera" },
  { src: "/images/6f2a0d50-restaurante.jpg", alt: "Experiencia gastronomica" },
  { src: "/images/img-1156.jpeg", alt: "Clientes de BogotourVIP en tour" },
  { src: "/images/img-4349.jpeg", alt: "Recorrido turistico con BogotourVIP" },
  { src: "/images/tour-mirador-selfie.jpg", alt: "Selfie en el mirador durante el tour" },
  { src: "/images/b40cb6a4-ebad-4053-ae7c-3210440d4d62.jpg", alt: "Viajeros disfrutando su experiencia en Colombia" },
  { src: "/images/63fd712b-4261-4496-8c09-111196a0ec78.jpg", alt: "Momentos del tour con BogotourVIP" },
  { src: "/images/sitio-monserrate.png", alt: "Cerro de Monserrate" },
  { src: "/images/sitio-catedral-sal.png", alt: "Catedral de Sal de Zipaquira" },
  { src: "/images/sitio-zipaquira-centro.png", alt: "Centro historico de Zipaquira" },
  { src: "/images/sitio-pueblo-guatavita.png", alt: "Pueblo de Guatavita" },
  { src: "/images/sitio-museo-del-oro.png", alt: "Museo del Oro de Bogota" },
  { src: "/images/sitio-chorro-quevedo.png", alt: "Chorro de Quevedo en La Candelaria" },
  { src: "/images/la-candelaria-colorful.png", alt: "Casas coloridas de La Candelaria" },
  { src: "/images/bogota-skyline.jpg", alt: "Skyline de Bogota" },
]

export function GallerySection({ translations: t }: GallerySectionProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.08 })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const images = galleryImages
  const visibleImages = showAll ? images : images.slice(0, INITIAL_COUNT)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
  }, [images.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  return (
    <>
      <section id="galeria" ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            className={`mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "ease-out" }}
          >
            <div>
              <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
                GALERIA
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] text-balance">
                Momentos inolvidables<br />
                <span className="text-white/60">con nuestros clientes.</span>
              </h2>
            </div>
            <p className="text-white/60 text-sm">{images.length} fotos</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[220px] grid-flow-dense">
            {visibleImages.map((image, index) => {
              const span = SPAN_PATTERN[index % SPAN_PATTERN.length]
              const isLarge = span.includes("col-span-2")
              return (
                <button
                  type="button"
                  key={image.src}
                  className={`${span} relative overflow-hidden rounded-xl border border-white/10 group cursor-pointer hover:border-white/20 transition-colors duration-300 text-left`}
                  onClick={() => openLightbox(index)}
                  aria-label={`Ver ${image.alt} en pantalla completa`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={isLarge ? "(max-width: 768px) 100vw, 600px" : "(max-width: 768px) 50vw, 300px"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                    quality={75}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">{image.alt}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {images.length > INITIAL_COUNT && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="px-6 py-3 rounded-full border border-[#d4af37] text-[#d4af37] text-sm font-medium hover:bg-[#d4af37] hover:text-black transition-colors"
                aria-expanded={showAll}
              >
                {showAll ? "Ver menos" : `Ver todas las fotos (${images.length})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de imagenes"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          <div
            className="relative w-[90vw] h-[75vh] sm:w-[85vw] sm:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              className="object-contain"
              quality={90}
              sizes="90vw"
              priority
            />
          </div>

          <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center px-4">
            <p className="text-white text-sm sm:text-base font-medium mb-1 drop-shadow-lg">
              {images[lightboxIndex].alt}
            </p>
            <p className="text-white/60 text-xs sm:text-sm">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
