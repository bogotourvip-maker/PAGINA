"use client"

import { Star, MessageSquare, Shield, Clock, Users, Car } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation, useCountUp } from "@/hooks/use-scroll-animation"

const WHATSAPP_LINK =
  "https://wa.me/573108677635?text=Hola%20BogotourVIP%2C%20quiero%20cotizar%20tu%20servicio.%20%C2%BFMe%20pueden%20ayudar%20con%20la%20informacion%20y%20el%20precio%3F"

interface GoogleReviewsWidgetProps {
  translations: any
}

export function GoogleReviewsWidget({ translations: t }: GoogleReviewsWidgetProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 })
  const yearsCount = useCountUp(5, 1200, isVisible)
  const hoursCount = useCountUp(24, 1000, isVisible)
  const languagesCount = useCountUp(7, 800, isVisible)

  const strengths = [
    {
      icon: Shield,
      title: t.why1Title,
      description: t.why1Desc,
    },
    {
      icon: Clock,
      title: t.why2Title,
      description: t.why2Desc,
    },
    {
      icon: Users,
      title: t.why3Title,
      description: t.why3Desc,
    },
    {
      icon: Car,
      title: t.why4Title,
      description: t.why4Desc,
    },
  ]

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-10 sm:mb-14 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "ease-out" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t.whyTitle}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.whySubtitle}
          </p>
        </div>

        {/* Counter stats */}
        <div
          className={`grid grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-14 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionDelay: "200ms", transitionTimingFunction: "ease-out" }}
        >
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4af37]">{yearsCount}+</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{t.whyYears}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4af37]">{hoursCount}/7</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{t.whyAvailability}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4af37]">{languagesCount}</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{t.whyLanguages}</p>
          </div>
        </div>

        {/* Strength cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14 ${isVisible ? "stagger-children" : ""}`}>
          {strengths.map((item, index) => (
            <Card
              key={index}
              className={`bg-card border border-border/50 hover:border-[#d4af37]/40 hover-lift ${
                isVisible ? "" : "opacity-0"
              }`}
            >
              <CardContent className="p-5 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#d4af37]" />
                </div>
                <p className="font-semibold text-foreground text-sm sm:text-base mb-1">{item.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to leave a review */}
        <div
          className={`text-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionDelay: "500ms", transitionTimingFunction: "ease-out" }}
        >
          <div className="inline-flex flex-col items-center gap-3 bg-gradient-to-br from-gray-900 to-black rounded-2xl px-8 sm:px-12 py-6 sm:py-8">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 sm:w-6 sm:h-6 fill-[#d4af37] text-[#d4af37]" />
              ))}
            </div>
            <p className="text-white text-sm sm:text-base font-medium">{t.whyGoal}</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#f0c54a] transition-colors duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              {t.whyLeaveReview}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
