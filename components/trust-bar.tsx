"use client"

import { Star, ShieldCheck, BadgeCheck, Headphones } from "lucide-react"

interface TrustBarProps {
  translations: any
}

export function TrustBar({ translations: t }: TrustBarProps) {
  const trustItems = [
    {
      icon: Star,
      title: t.trustGoogleTitle,
      subtitle: t.trustGoogleSub,
      highlight: true,
    },
    {
      icon: ShieldCheck,
      title: t.trustPaymentTitle,
      subtitle: t.trustPaymentSub,
    },
    {
      icon: BadgeCheck,
      title: t.certifiedDrivers,
      subtitle: t.trustDriversSub,
    },
    {
      icon: Headphones,
      title: t.trustSupportTitle,
      subtitle: t.trustSupportSub,
    },
  ]

  return (
    <section aria-label="Señales de confianza" className="bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center ${
                  item.highlight ? "bg-[#d4af37]/20" : "bg-white/5"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${item.highlight ? "text-[#d4af37]" : "text-white/70"}`}
                  fill={item.highlight ? "#d4af37" : "none"}
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-semibold text-white leading-tight">
                  {item.title}
                </div>
                <div className="text-xs sm:text-sm text-white/50 leading-tight">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
