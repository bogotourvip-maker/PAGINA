import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Clock, MapPin, Star, Check, MessageCircle, ArrowRight } from "lucide-react"
import { ToursNav } from "@/components/tours-nav"
import { tours, getTourBySlug, whatsappLinkFor } from "@/lib/tours"

interface TourPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }))
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params
  const tour = getTourBySlug(slug)

  if (!tour) {
    return { title: "Tour no encontrado" }
  }

  const url = `https://bogotourvip.com/tours/${tour.slug}`

  return {
    title: tour.metaTitle,
    description: tour.metaDescription,
    keywords: tour.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tour.metaTitle,
      description: tour.metaDescription,
      url,
      type: "article",
      images: [{ url: tour.heroImage, width: 1200, height: 630, alt: tour.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: tour.metaTitle,
      description: tour.metaDescription,
      images: [tour.heroImage],
    },
  }
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params
  const tour = getTourBySlug(slug)

  if (!tour) {
    notFound()
  }

  const whatsappLink = whatsappLinkFor(tour.name)
  const relatedTours = tours.filter((t) => t.slug !== tour.slug).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.metaDescription,
    image: `https://bogotourvip.com${tour.heroImage}`,
    touristType: "Leisure",
    provider: {
      "@type": "TravelAgency",
      name: "BogotourVip",
      url: "https://bogotourvip.com",
      telephone: "+573108677635",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviews,
      bestRating: 5,
    },
  }

  return (
    <main className="min-h-screen bg-black">
      <ToursNav />

      {/* JSON-LD structured data for this specific tour */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <Image
          src={tour.heroImage || "/placeholder.svg"}
          alt={tour.name}
          fill
          priority
          quality={72}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-8 sm:pb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full">
                {tour.category}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                <span className="text-white text-xs font-medium">
                  {tour.rating} ({tour.reviews})
                </span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-3 text-balance">
              {tour.name}
            </h1>
            <p className="text-lg sm:text-xl text-[#d4af37] font-medium">{tour.tagline}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Quick facts */}
              <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-sm">{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-sm">{tour.distance}</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none mb-10">
                {tour.longDescription.map((paragraph, index) => (
                  <p key={index} className="text-white/70 text-base sm:text-lg leading-relaxed mb-5 text-pretty">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Highlights */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-5">Qué visitarás</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                      </div>
                      <span className="text-white/80 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {tour.gallery.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-white mb-5">Galería</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tour.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${tour.name} - imagen ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-white/50 mb-1">Desde</p>
                <p className="text-2xl font-bold text-white mb-5">{tour.priceFrom}</p>

                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Incluye</p>
                  <ul className="space-y-2.5">
                    {tour.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-white/80">
                        <Check className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#d4af37] text-black hover:bg-[#c9a430] transition-colors font-semibold py-3.5 rounded-xl mb-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Reservar por WhatsApp
                </a>
                <Link
                  href="/#cotizacion"
                  className="flex items-center justify-center gap-2 w-full border border-white/20 text-white hover:bg-white/10 transition-colors font-medium py-3.5 rounded-xl"
                >
                  Solicitar cotización
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related tours */}
      <section className="py-12 sm:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Otros tours</h2>
            <Link
              href="/tours"
              className="flex items-center gap-1 text-[#d4af37] text-sm font-semibold hover:gap-2 transition-all"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedTours.map((related) => (
              <Link
                key={related.slug}
                href={`/tours/${related.slug}`}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={related.heroImage || "/placeholder.svg"}
                    alt={related.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-xs text-white/50 mt-1 line-clamp-2">{related.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
