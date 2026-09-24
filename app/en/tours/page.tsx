import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { ToursNav } from "@/components/tours-nav"
import { tours } from "@/lib/tours"
import { getLocalizedTour, localizedWhatsappLink } from "@/lib/tours-i18n"

// The airport transfer is a transport service, not a sightseeing tour
const tourList = tours.filter((t) => t.slug !== "traslado-aeropuerto")

export const metadata: Metadata = {
  title: "Bogotá Tours & Day Trips | Private Experiences",
  description:
    "Explore all our private tours in Bogotá and its surroundings: City Tour, Monserrate, La Candelaria, Guatavita Lake, Salt Cathedral and Villa de Leyva.",
  keywords: ["bogota tours", "bogota day trips", "private tours bogota", "things to do in bogota"],
  alternates: {
    canonical: "https://bogotourvip.com/en/tours",
    languages: {
      es: "https://bogotourvip.com/tours",
      en: "https://bogotourvip.com/en/tours",
      "x-default": "https://bogotourvip.com/tours",
    },
  },
  openGraph: {
    title: "Bogotá Tours & Day Trips | BogotourVip",
    description:
      "Complete catalog of private tours in Bogotá: City Tour, Monserrate, Guatavita, Salt Cathedral, Villa de Leyva and more.",
    url: "https://bogotourvip.com/en/tours",
    type: "website",
    locale: "en_US",
  },
}

export default function ToursPageEn() {
  return (
    <main className="min-h-screen bg-black">
      <ToursNav lang="en" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/bogota-skyline-panorama.webp"
            alt="Panoramic view of Bogotá"
            fill
            priority
            quality={80}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32">
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.25em] mb-4">Our tours</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-5 text-balance max-w-3xl">
            Tours in Bogotá <span className="text-white/50">and its surroundings</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl text-pretty leading-relaxed mb-8">
            Private experiences designed by local experts. Every service includes private transport and a bilingual
            (Spanish/English) guide, so you can explore Colombia with total confidence.
          </p>
        </div>
      </section>

      {/* Tour rows */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-16 sm:gap-24">
          {tourList.map((tour, index) => {
            const t = getLocalizedTour(tour, "en")
            const imageFirst = index % 2 === 0
            return (
              <article key={tour.slug} className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl group">
                    <Image
                      src={tour.heroImage || "/placeholder.svg"}
                      alt={t.name}
                      fill
                      quality={80}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#d4af37] text-black text-xs font-bold rounded-full uppercase tracking-wide">
                      {t.category}
                    </span>
                    {index === 0 && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs font-semibold rounded-full backdrop-blur-sm border border-white/10">
                        Most popular
                      </span>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {tour.gallery.slice(0, 3).map((img, i) => (
                      <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`${t.name} — photo ${i + 1}`}
                          fill
                          quality={80}
                          className="object-cover transition-transform duration-500 hover:scale-110"
                          sizes="(max-width: 1024px) 33vw, 16vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-white/50 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {t.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/50 text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      {t.distance}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 text-balance">{t.name}</h2>
                  <p className="text-[#d4af37] text-sm sm:text-base font-medium italic mb-4">{t.tagline}</p>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5 text-pretty">
                    {t.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {t.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/75 text-xs"
                      >
                        <Check className="w-3 h-3 text-[#d4af37]" />
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/en/tours/${tour.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
                    >
                      View details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={localizedWhatsappLink(t.name, "en")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 text-[#d4af37] px-6 py-3 text-sm font-semibold hover:bg-[#d4af37] hover:text-black transition-colors"
                    >
                      Book on WhatsApp
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#d4af37]/15 to-transparent p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">
              Can&apos;t find the perfect plan?
            </h3>
            <p className="text-white/60 text-base max-w-xl mx-auto mb-6 text-pretty">
              We design tailor-made itineraries combining several destinations. Tell us what you&apos;d like to see and
              we&apos;ll build your perfect experience in Colombia.
            </p>
            <a
              href={localizedWhatsappLink("custom tour", "en")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-7 py-3.5 text-black font-semibold hover:bg-[#c9a332] transition-colors"
            >
              Quote my custom tour
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
