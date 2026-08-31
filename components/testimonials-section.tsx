"use client"

import { Star, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface TestimonialsSectionProps {
  translations: any
}

export function TestimonialsSection({ translations: t }: TestimonialsSectionProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const testimonials = [
    {
      name: "Cliente VIP",
      location: "USA",
      image: "/images/b40cb6a4-ebad-4053-ae7c-3210440d4d62.jpg",
      initials: "CV",
      text: t.testimonial1,
      source: "google",
    },
    {
      name: "Grupo de Turistas",
      location: "Europa",
      image: "/images/8d733a9d-0c91-4e65-b62a-118412f8c3a3.jpg",
      initials: "GT",
      text: t.testimonial2,
      source: "tripadvisor",
    },
    {
      name: "Enzo Vito Bello",
      location: "Italia",
      image: "/images/63fd712b-4261-4496-8c09-111196a0ec78.jpg",
      initials: "EV",
      text: "Una esperienza magnifica, William e stato semplicemente fantastico! Gentile, disponibile e sempre col sorriso. Grazie!",
      source: "google",
    },
  ]

  const reviewBadges = [
    {
      logo: "/logos/google.svg",
      name: "Google Reviews",
      rating: "4.9",
      count: "120+",
      href: "https://www.google.com/search?q=BogotourVIP",
    },
    {
      logo: "/logos/tripadvisor.svg",
      name: "Tripadvisor",
      rating: "4.8",
      count: "85+",
      href: "https://www.tripadvisor.com",
    },
  ]

  return (
    <section id="testimonios" ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div
          className={`mb-12 sm:mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            TESTIMONIOS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Lo que dicen<br />
            <span className="text-white/60">nuestros clientes.</span>
          </h2>
        </div>

        {/* Third-party review badges - social proof */}
        <div
          className={`flex flex-col sm:flex-row items-stretch gap-4 mb-10 sm:mb-14 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "ease-out" }}
        >
          {reviewBadges.map((badge, index) => (
            <a
              key={index}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-[#d4af37]/40 transition-colors duration-300 flex-1"
            >
              <div className="bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0 w-12 h-12">
                <Image
                  src={badge.logo || "/placeholder.svg"}
                  alt={`${badge.name} logo`}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{badge.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-lg font-bold text-[#d4af37]">{badge.rating}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-0.5">{badge.count} reseñas verificadas</p>
              </div>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 hover:border-white/20 transition-colors duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "0.7s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-[#d4af37] text-[#d4af37]"
                      />
                    ))}
                  </div>
                  <div className="bg-white rounded-md p-1 flex items-center justify-center w-7 h-7 flex-shrink-0">
                    <Image
                      src={testimonial.source === "tripadvisor" ? "/logos/tripadvisor.svg" : "/logos/google.svg"}
                      alt={testimonial.source === "tripadvisor" ? "Reseña de Tripadvisor" : "Reseña de Google"}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                </div>
                <p className="text-sm sm:text-base text-white/80 mb-5 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  {testimonial.image ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0 border border-white/20">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                        quality={75}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#d4af37] font-semibold text-sm">{testimonial.initials}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-white/50">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
            <Shield className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
            <p className="text-lg sm:text-xl font-bold text-white">100%</p>
            <p className="text-xs text-white/50">Conductores certificados</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
            <Star className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
            <p className="text-lg sm:text-xl font-bold text-white">10+</p>
            <p className="text-xs text-white/50">Anos de experiencia</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
            <Shield className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
            <p className="text-lg sm:text-xl font-bold text-white">500+</p>
            <p className="text-xs text-white/50">Clientes satisfechos</p>
          </div>
        </div>
      </div>
    </section>
  )
}
