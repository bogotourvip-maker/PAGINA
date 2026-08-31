import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Star, ArrowRight } from "lucide-react"
import { ToursNav } from "@/components/tours-nav"
import { tours } from "@/lib/tours"

export const metadata: Metadata = {
  title: "Tours en Bogotá y alrededores | Catálogo de experiencias",
  description:
    "Explora todos nuestros tours privados en Bogotá y sus alrededores: City Tour, Monserrate, La Candelaria, Laguna de Guatavita, Catedral de Sal, Villa de Leyva y traslado aeropuerto.",
  alternates: {
    canonical: "https://bogotourvip.com/tours",
  },
  openGraph: {
    title: "Tours en Bogotá y alrededores | BogotourVip",
    description:
      "Catálogo completo de tours privados en Bogotá: City Tour, Monserrate, Guatavita, Catedral de Sal, Villa de Leyva y más.",
    url: "https://bogotourvip.com/tours",
    type: "website",
  },
}

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-black">
      <ToursNav />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            NUESTROS TOURS
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 text-balance">
            Tours en Bogotá<br />
            <span className="text-white/60">y sus alrededores.</span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl text-pretty">
            Experiencias privadas diseñadas por expertos locales. Elige tu destino y déjanos encargarnos de todo:
            transporte cómodo, guías bilingües y los mejores rincones de Colombia.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="pb-16 sm:pb-20 md:pb-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {tours.map((tour) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={tour.heroImage || "/placeholder.svg"}
                    alt={tour.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full">
                    {tour.category}
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                    <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                    <span className="text-white text-xs font-medium">{tour.rating}</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-lg font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors">
                    {tour.name}
                  </h2>
                  <p className="text-sm text-white/50 mb-4 flex-1 text-pretty">{tour.shortDescription}</p>

                  <div className="flex items-center gap-4 text-white/60 text-xs mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {tour.distance}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-[#d4af37] text-sm font-semibold">
                    Ver detalles
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
