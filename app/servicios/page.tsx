import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Star, Check, MessageCircle, ArrowRight, Building2, Mountain } from "lucide-react"
import { ToursNav } from "@/components/tours-nav"
import { tours, whatsappLinkFor, WHATSAPP_LINK } from "@/lib/tours"

export const metadata: Metadata = {
  title: "Servicios y Tours en Bogotá y alrededores | BogotourVip",
  description:
    "Conoce en detalle todos nuestros tours privados en Bogotá y sus alrededores: qué visitarás, qué incluye cada experiencia, duración y recorrido. City Tour, Monserrate, La Candelaria, Guatavita, Catedral de Sal, Villa de Leyva y traslados.",
  alternates: {
    canonical: "https://bogotourvip.com/servicios",
  },
  openGraph: {
    title: "Servicios y Tours en Bogotá y alrededores | BogotourVip",
    description:
      "Todos nuestros servicios turísticos detallados: tours en Bogotá, excursiones a los alrededores y transporte privado.",
    url: "https://bogotourvip.com/servicios",
    type: "website",
  },
}

// Agrupamos los tours por ubicacion para presentarlos de forma ordenada
const BOGOTA_SLUGS = ["city-tour-bogota", "la-candelaria", "monserrate", "traslado-aeropuerto"]

const toursBogota = BOGOTA_SLUGS.map((slug) => tours.find((t) => t.slug === slug)).filter(
  (t): t is (typeof tours)[number] => Boolean(t),
)
const toursAlrededores = tours.filter((t) => !BOGOTA_SLUGS.includes(t.slug))

function TourDetailCard({ tour, index }: { tour: (typeof tours)[number]; index: number }) {
  const whatsappLink = whatsappLinkFor(tour.name)
  const reversed = index % 2 === 1

  return (
    <article className="group grid lg:grid-cols-2 gap-6 lg:gap-10 items-center bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden p-4 sm:p-5 lg:p-6 hover:border-[#d4af37]/40 transition-colors duration-300">
      {/* Imagen */}
      <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${reversed ? "lg:order-2" : ""}`}>
        <Image
          src={tour.heroImage || "/placeholder.svg"}
          alt={tour.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={80}
          loading={index < 2 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full">{tour.category}</span>
          <span className="flex items-center gap-1 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full">
            <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
            <span className="text-white text-xs font-medium">
              {tour.rating} ({tour.reviews})
            </span>
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className={`${reversed ? "lg:order-1" : ""}`}>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 text-balance">{tour.name}</h3>
        <p className="text-[#d4af37] font-medium mb-4">{tour.tagline}</p>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5 text-pretty">{tour.shortDescription}</p>

        {/* Datos rápidos */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            {tour.duration}
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            {tour.distance}
          </div>
        </div>

        {/* Qué visitarás */}
        <div className="mb-5">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-2.5">Qué visitarás</p>
          <div className="flex flex-wrap gap-2">
            {tour.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Incluye */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-2.5">Incluye</p>
          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
            {tour.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <Check className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#d4af37] text-black hover:bg-[#c9a430] transition-colors font-semibold px-5 py-3 rounded-xl text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Cotizar por WhatsApp
          </a>
          <Link
            href={`/tours/${tour.slug}`}
            className="flex items-center justify-center gap-1.5 border border-white/20 text-white hover:bg-white/10 transition-colors font-medium px-5 py-3 rounded-xl text-sm"
          >
            Ver detalles completos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function ServiciosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios y tours en Bogotá y alrededores",
    itemListElement: tours.map((tour, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristTrip",
        name: tour.name,
        description: tour.metaDescription,
        image: `https://bogotourvip.com${tour.heroImage}`,
        url: `https://bogotourvip.com/tours/${tour.slug}`,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-black">
      <ToursNav />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            NUESTROS SERVICIOS
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 text-balance">
            Tours en Bogotá
            <br />
            <span className="text-white/60">y sus alrededores, en detalle.</span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl text-pretty">
            Cada experiencia está diseñada por expertos locales. Aquí encontrarás todo lo que incluye cada tour: qué
            visitarás, cuánto dura, el recorrido y cómo reservarlo. Transporte privado y guías bilingües en todos
            nuestros servicios.
          </p>
        </div>
      </section>

      {/* Tours en Bogotá */}
      <section className="pb-4 sm:pb-6 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">En Bogotá</h2>
              <p className="text-white/40 text-sm">Experiencias dentro de la capital</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 sm:gap-8">
            {toursBogota.map((tour, index) => (
              <TourDetailCard key={tour.slug} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Tours en los alrededores */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Alrededores de Bogotá</h2>
              <p className="text-white/40 text-sm">Excursiones de día a la sabana y Boyacá</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 sm:gap-8">
            {toursAlrededores.map((tour, index) => (
              <TourDetailCard key={tour.slug} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            ¿No encuentras el plan que buscas?
          </h2>
          <p className="text-white/50 text-base sm:text-lg mb-8 text-pretty">
            Diseñamos itinerarios a la medida según tus fechas, intereses y presupuesto. Escríbenos y armamos tu
            experiencia perfecta en Colombia.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#d4af37] text-black hover:bg-[#c9a430] transition-colors font-semibold px-8 py-4 rounded-xl"
          >
            <MessageCircle className="w-5 h-5" />
            Hablar con un asesor
          </a>
        </div>
      </section>
    </main>
  )
}
