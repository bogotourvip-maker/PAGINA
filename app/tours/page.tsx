import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Star, ArrowRight, ArrowUpRight, Check, Camera } from "lucide-react"
import { ToursNav } from "@/components/tours-nav"
import { tours, type Tour, type GooglePlace, whatsappLinkFor } from "@/lib/tours"

// El traslado de aeropuerto es un servicio de transporte (vive en /servicios), no un tour
const tourList = tours.filter((t) => t.slug !== "traslado-aeropuerto")

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
      <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z" />
      <path
        fill="#EA4335"
        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 6.68 9.14 4.75 12 4.75z"
      />
    </svg>
  )
}

// Sitios que visita el tour, con foto y calificación de Google (fila compacta)
function GooglePlacesStrip({ places }: { places: GooglePlace[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <GoogleG className="w-4 h-4" />
        <span className="text-white/50 text-xs uppercase tracking-wider">Sitios que visitas · calificación en Google</span>
      </div>
      <ul className="grid sm:grid-cols-2 gap-2.5">
        {places.map((p) => (
          <li key={p.name} className="flex gap-2.5 rounded-xl bg-white/[0.03] p-2">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
              <Image src={p.image || "/placeholder.svg"} alt={p.name} fill quality={80} className="object-cover" sizes="44px" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-white text-[13px] font-semibold truncate">{p.name}</span>
                <span className="flex shrink-0 items-center gap-1 text-[#d4af37] text-xs font-semibold">
                  <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                  {p.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-white/45 text-[11px] leading-snug line-clamp-1">{p.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Fila editorial de un tour, con imagen principal, galería y descripción detallada
function TourRow({ tour, index }: { tour: Tour; index: number }) {
  const g = googleAverage(tour.googlePlaces)
  const imageFirst = index % 2 === 0

  return (
    <article className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
      {/* Columna de imágenes */}
      <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl group">
          <Image
            src={tour.heroImage || "/placeholder.svg"}
            alt={tour.name}
            fill
            quality={80}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-[#d4af37] text-black text-xs font-bold rounded-full uppercase tracking-wide">
            {tour.category}
          </span>
          {index === 0 && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs font-semibold rounded-full backdrop-blur-sm border border-white/10">
              Más popular
            </span>
          )}
        </div>

        {/* Galería de fotos del tour */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          {tour.gallery.slice(0, 3).map((img, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={img || "/placeholder.svg"}
                alt={`${tour.name} — foto ${i + 1}`}
                fill
                quality={80}
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 1024px) 33vw, 16vw"
              />
              {i === 2 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Camera className="w-5 h-5 text-white/90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Columna de contenido */}
      <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
        <div className="flex items-center gap-3 mb-3">
          {g && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <GoogleG className="w-4 h-4" />
              <span className="text-white text-sm font-semibold">{g.avg}</span>
              <span className="text-white/40 text-xs">({formatReviews(g.total)})</span>
            </span>
          )}
          <span className="flex items-center gap-1.5 text-white/50 text-xs">
            <Clock className="w-3.5 h-3.5" />
            {tour.duration}
          </span>
          <span className="flex items-center gap-1.5 text-white/50 text-xs">
            <MapPin className="w-3.5 h-3.5" />
            {tour.distance}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 text-balance">{tour.name}</h2>
        <p className="text-[#d4af37] text-sm sm:text-base font-medium italic mb-4">{tour.tagline}</p>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5 text-pretty">{tour.shortDescription}</p>

        {/* Lo más destacado del tour */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tour.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/75 text-xs"
            >
              <Check className="w-3 h-3 text-[#d4af37]" />
              {h}
            </span>
          ))}
        </div>

        {tour.googlePlaces && (
          <div className="mb-6">
            <GooglePlacesStrip places={tour.googlePlaces} />
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Ver detalles
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={whatsappLinkFor(tour.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 text-[#d4af37] px-6 py-3 text-sm font-semibold hover:bg-[#d4af37] hover:text-black transition-colors"
          >
            Reservar por WhatsApp
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function ToursPage() {
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
            quality={80}
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
            Experiencias privadas diseñadas por expertos locales. Cada destino está calificado según las reseñas reales
            de Google, para que elijas con total confianza.
          </p>

          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
            <GoogleG className="w-5 h-5" />
            <span className="text-white/80 text-sm">
              Sitios verificados con reseñas de <span className="font-semibold text-white">Google Maps</span>
            </span>
          </div>
        </div>
      </section>

      {/* Filas editoriales de cada tour */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-16 sm:gap-24">
          {tourList.map((tour, i) => (
            <TourRow key={tour.slug} tour={tour} index={i} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#d4af37]/15 to-transparent p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">¿No encuentras el plan ideal?</h3>
            <p className="text-white/60 text-base max-w-xl mx-auto mb-6 text-pretty">
              Diseñamos itinerarios a medida combinando varios destinos. Cuéntanos qué te gustaría conocer y armamos tu
              experiencia perfecta en Colombia.
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
