"use client"

import Image from "next/image"
import { Star, ExternalLink } from "lucide-react"

const GOOGLE_PLACE_CID = "10206797686157246925"
const GOOGLE_REVIEWS_URL = `https://www.google.com/maps?cid=${GOOGLE_PLACE_CID}`
const GOOGLE_EMBED_URL = `https://maps.google.com/maps?cid=${GOOGLE_PLACE_CID}&output=embed`

const copy = {
  es: {
    eyebrow: "Confianza verificada",
    title: "Hasta las estrellas del fútbol viajan con nosotros.",
    falcaoCaption: "Radamel Falcao García con el equipo de BogotourVIP",
    googleReviewsLabel: "Reseñas en Google",
    googleReviewsText:
      "Lee lo que dicen nuestros viajeros en Google y comparte tu experiencia con BogotourVIP.",
    writeReview: "Escribir una reseña",
    starsLabel: "5 de 5 estrellas",
    badgeAlt: "Guía de BogotourVIP recibiendo viajeros en Bogotá",
    googleLabel: "Nuestra ficha en Google",
    seeAll: "Ver todas las reseñas",
  },
  en: {
    eyebrow: "Verified trust",
    title: "Even football stars ride with us.",
    falcaoCaption: "Radamel Falcao García with the BogotourVIP team",
    googleReviewsLabel: "Google reviews",
    googleReviewsText: "Read what our travelers say on Google and share your own BogotourVIP experience.",
    writeReview: "Write a review",
    starsLabel: "5 out of 5 stars",
    badgeAlt: "BogotourVIP guide welcoming travelers in Bogotá",
    googleLabel: "Our Google listing",
    seeAll: "See all reviews",
  },
}

interface SocialProofSectionProps {
  translations: any
  language: string
}

export function SocialProofSection({ translations: t, language }: SocialProofSectionProps) {
  const c = language === "es" ? copy.es : copy.en

  const testimonials = [
    {
      name: "Enzo Vito Bello",
      location: "Italia",
      image: "/images/63fd712b-4261-4496-8c09-111196a0ec78.jpg",
      text: "Una esperienza magnifica, William è stato semplicemente fantastico! Gentile, disponibile e sempre col sorriso. Grazie!",
      source: "google" as const,
    },
    {
      name: "Grupo de Turistas",
      location: "Europa",
      image: "/images/8d733a9d-0c91-4e65-b62a-118412f8c3a3.jpg",
      text: t.testimonial2,
      source: "tripadvisor" as const,
    },
  ]

  return (
    <section id="testimonios" aria-labelledby="social-proof-title" className="bg-black py-14 sm:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 sm:px-6">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#d4af37] sm:text-sm">{c.eyebrow}</p>
          <h2 id="social-proof-title" className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {c.title}
          </h2>
        </header>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <figure
            className="relative overflow-hidden rounded-2xl border border-white/10"
            style={{ flex: "3 1 560px", minWidth: 0 }}
          >
            <Image
              src="/images/74e8e8e3-falcao.jpg"
              alt={c.falcaoCaption}
              width={1920}
              height={1440}
              sizes="(min-width: 1024px) 720px, 100vw"
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-black/70 px-5 py-3 text-sm text-white/90 backdrop-blur-sm">
              {c.falcaoCaption}
            </figcaption>
          </figure>

          <div className="flex flex-col gap-4" style={{ flex: "2 1 340px", minWidth: 0 }}>
            {testimonials.map((item) => (
              <blockquote
                key={item.name}
                className="flex flex-1 flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1" aria-label="5 de 5 estrellas">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white p-1">
                      <Image
                        src={item.source === "tripadvisor" ? "/logos/tripadvisor.svg" : "/logos/google.svg"}
                        alt={item.source === "tripadvisor" ? "Tripadvisor" : "Google"}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </span>
                  </div>
                  <p className="text-pretty text-base leading-relaxed text-white/85">{`"${item.text}"`}</p>
                </div>
                <footer className="flex items-center gap-3">
                  <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-white/20">
                    <Image src={item.image} alt={item.name} fill sizes="40px" className="object-cover" />
                  </span>
                  <span className="flex flex-col">
                    <cite className="text-sm font-semibold not-italic text-white">{item.name}</cite>
                    <span className="text-xs text-white/50">{item.location}</span>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <div
            className="flex flex-col gap-6 rounded-2xl bg-white p-6 text-neutral-900"
            style={{ flex: "1 1 320px", minWidth: 0 }}
          >
            <div className="flex items-center gap-4">
              <span className="relative h-20 w-20 flex-shrink-0">
                <span className="relative block h-20 w-20 overflow-hidden rounded-full ring-4 ring-[#d4af37]">
                  <Image
                    src="/images/google-reviews-badge.png"
                    alt={c.badgeAlt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </span>
                <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1.5 shadow-md">
                  <Image src="/logos/google.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                </span>
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">{c.googleReviewsLabel}</h3>
                <div className="flex gap-1" aria-label={c.starsLabel}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm text-neutral-600">BogotourVIP · Bogotá</p>
              </div>
            </div>

            <p className="text-pretty text-base leading-relaxed text-neutral-700">{c.googleReviewsText}</p>

            <div className="mt-auto flex flex-wrap gap-3">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
              >
                {c.seeAll}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900"
              >
                {c.writeReview}
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white p-5 text-neutral-900">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold">{c.googleLabel}</h3>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                {c.seeAll}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <iframe
              src={GOOGLE_EMBED_URL}
              title="BogotourVIP en Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full rounded-xl border-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
