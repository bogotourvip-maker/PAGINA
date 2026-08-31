"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface GallerySectionProps {
  translations: any
}

export function GallerySection({ translations: t }: GallerySectionProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.08 })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const images = [
    {
      src: "/images/74e8e8e3-falcao.jpg",
      alt: "BogotourVIP con Radamel Falcao Garcia",
      span: "col-span-2 row-span-2",
    },
    {
      src: "/images/img-3590.jpeg",
      alt: "Pareja disfrutando vista panoramica de Bogota",
      span: "",
    },
    {
      src: "/images/suv-hotel-w.jpg",
      alt: "Vehiculo SUV en Hotel W Bogota",
      span: "",
    },
    {
      src: "/images/img-0743.jpeg",
      alt: "Tour grupal en La Candelaria",
      span: "col-span-2",
    },
  ]

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
            className={`mb-12 sm:mb-16 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "ease-out" }}
          >
            <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
              GALERIA
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
              Momentos inolvidables<br />
              <span className="text-white/60">con nuestros clientes.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px]">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${image.span} relative overflow-hidden rounded-xl border border-white/10 group cursor-pointer hover:border-white/20 transition-colors duration-300`}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                aria-label={`Ver ${image.alt} en pantalla completa`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes={image.span.includes("col-span-2") ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 800px" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                  quality={80}
                  loading={index < 2 ? "eager" : "lazy"}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">{image.alt}</p>
                </div>
                {/* Zoom icon indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de imagenes"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Image */}
          <div
            className="relative w-[90vw] h-[75vh] sm:w-[85vw] sm:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src || "/placeholder.svg"}
              alt={images[lightboxIndex].alt}
              fill
              className="object-contain"
              quality={90}
              sizes="90vw"
              priority
            />
          </div>

          {/* Caption + counter */}
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
