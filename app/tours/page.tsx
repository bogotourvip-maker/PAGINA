import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Star, ArrowRight, ArrowUpRight } from "lucide-react"
import { ToursNav } from "@/components/tours-nav"
import { tours, type Tour, type GooglePlace } from "@/lib/tours"

// El traslado de aeropuerto es un servicio de transporte (vive en /servicios), no un tour
const tourList = tours.filter((t) => t.slug !== "traslado-aeropuerto")
const featured = tourList[0]
const rest = tourList.slice(1)

export const metadata: Metadata = {
  title: "Tours en Bogotá y alrededores | Catálogo de experiencias",
  description:
    "Explora todos nuestros tours privados en Bogotá y sus alrededores: City Tour, Monserrate, La Candelaria, Laguna de Guatavita, Catedral de Sal y Villa de Leyva.",
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

// Promedio de calificación de Google de los sitios que visita un tour
function googleAverage(places?: GooglePlace[]): { avg: string; total: number } | null {
  if (!places || places.length === 0) return null
  const avg = places.reduce((sum, p) => sum + p.rating, 0) / places.length
  const total = places.reduce((sum, p) => sum + p.reviews, 0)
  return { avg: avg.toFixed(1), total }
}

function formatReviews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : `${n}`
}

// Marca "G" con los colores de Google
function GoogleG({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 6.68 9.14 4.75 12 4.75z"
      />
    </svg>
  )
}

// Fila de sitios calificados por Google
function GooglePlaces({ places }: { places: GooglePlace[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {places.map((p) => (
        <li key={p.name} className="flex items-center justify-between gap-3 text-sm">
          <span className="text-white/70 truncate">{p.name}</span>
          <span className="flex shrink-0 items-center gap-1.5 text-white/90">
            <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
            <span className="font-semibold">{p.rating.toFixed(1)}</span>
            <span className="text-white/40 text-xs">({formatReviews(p.reviews)})</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function ToursPage() {
  const featuredGoogle = googleAverage(featured.googlePlaces)

  return (
    <main className="min-h-screen bg-black">
      <ToursNav />

      {/* Hero con imagen de fondo */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/bogota-skyline-panorama.webp"
            alt="Panorámica de Bogotá"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32">
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.25em] mb-4">
            Nuestros tours
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-5 text-balance max-w-3xl">
            Tours en Bogotá <span className="text-white/50">y sus alrededores</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl text-pretty leading-relaxed mb-8">
            Experiencias privadas diseñadas por expertos locales. Cada destino está calificado según las reseñas
            reales de Google, para que elijas con total confianza.
          </p>

          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
            <GoogleG className="w-5 h-5" />
            <span className="text-white/80 text-sm">
              Sitios verificados con reseñas de <span className="font-semibold text-white">Google Maps</span>
            </span>
          </div>
        </div>
      </section>

      {/* Tour destacado */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-16 relative z-10">
        <Link
          href={`/tours/${featured.slug}`}
          className="group grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] hover:border-[#d4af37]/50 transition-all duration-300 shadow-2xl"
        >
          <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[420px] overflow-hidden">
            <Image
              src={featured.heroImage || "/placeholder.svg"}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r" />
            <span className="absolute top-5 left-5 px-3 py-1 bg-[#d4af37] text-black text-xs font-bold rounded-full uppercase tracking-wide">
              Más popular
            </span>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <span className="text-[#d4af37] text-xs font-medium uppercase tracking-[0.2em] mb-3">
              {featured.category}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance group-hover:text-[#d4af37] transition-colors">
              {featured.name}
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 text-pretty">
              {featured.shortDescription}
            </p>

            {featured.googlePlaces && (
              <div className="mb-6 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <GoogleG className="w-4 h-4" />
                  <span className="text-white/50 text-xs uppercase tracking-wider">
                    Calificación de los sitios en Google
                  </span>
                </div>
                <GooglePlaces places={featured.googlePlaces} />
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-white/60 text-xs sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {featured.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {featured.distance}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[#d4af37] text-sm font-semibold whitespace-nowrap">
                Ver detalles
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Grilla de tours */}
      <section className="py-14 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {rest.map((tour) => {
              const g = googleAverage(tour.googlePlaces)
              return (
                <Link
                  key={tour.slug}
                  href={`/tours/${tour.slug}`}
                  className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={tour.heroImage || "/placeholder.svg"}
                      alt={tour.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full">
                      {tour.category}
                    </span>
                    {g && (
                      <span className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                        <GoogleG className="w-3.5 h-3.5" />
                        <span className="text-white text-xs font-semibold">{g.avg}</span>
                      </span>
                    )}
                    <h2 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white text-balance">
                      {tour.name}
                    </h2>
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-sm text-white/50 mb-4 text-pretty">{tour.shortDescription}</p>

                    {tour.googlePlaces && (
                      <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-3.5">
                        <div className="flex items-center gap-1.5 mb-2.5">
                          <GoogleG className="w-3.5 h-3.5" />
                          <span className="text-white/40 text-[11px] uppercase tracking-wider">
                            Sitios en Google
                          </span>
                        </div>
                        <GooglePlaces places={tour.googlePlaces} />
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-white/60 text-xs mb-4 mt-auto">
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
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="pb-20 sm:pb-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#d4af37]/15 to-transparent p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">
              ¿No encuentras el plan ideal?
            </h3>
            <p className="text-white/60 text-base max-w-xl mx-auto mb-6 text-pretty">
              Diseñamos itinerarios a medida combinando varios destinos. Cuéntanos qué te gustaría conocer y armamos
              tu experiencia perfecta en Colombia.
            </p>
            <Link
              href="/#cotizacion"
              className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-7 py-3.5 text-black font-semibold hover:bg-[#c9a332] transition-colors"
            >
              Cotizar mi tour personalizado
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
