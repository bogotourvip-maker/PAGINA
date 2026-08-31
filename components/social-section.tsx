"use client"

import { Instagram, Star, MapPin } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface SocialSectionProps {
  translations: any
}

export function SocialSection({ translations: t }: SocialSectionProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 sm:mb-10 md:mb-12 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "ease-out" }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {t.followUs || "Siguenos en Redes Sociales"}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70">
            {t.followUsSubtitle || "Conecta con nosotros y descubre mas experiencias"}
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 ${isVisible ? "stagger-children" : ""}`}>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/bogotour_vip"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-6 sm:p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 min-w-[140px] sm:min-w-[160px]"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Instagram className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="text-white font-semibold text-sm sm:text-base">Instagram</span>
            <span className="text-white/60 text-xs sm:text-sm">@bogotour_vip</span>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@bogotourvip"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-6 sm:p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/20 min-w-[140px] sm:min-w-[160px]"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-sm sm:text-base">TikTok</span>
            <span className="text-white/60 text-xs sm:text-sm">@bogotourvip</span>
          </a>

          {/* Google Reviews */}
          <a
            href="https://share.google/0B4lPtihWvESo1pLa"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-6 sm:p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 min-w-[140px] sm:min-w-[160px]"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Star className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
            </div>
            <span className="text-white font-semibold text-sm sm:text-base">Google</span>
            <span className="text-white/60 text-xs sm:text-sm">Calificanos</span>
          </a>

          {/* TripAdvisor */}
          <a
            href="https://www.tripadvisor.co/Attraction_Review-g294074-d25572583-Reviews-BogotourVIP-Bogota.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-6 sm:p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 min-w-[140px] sm:min-w-[160px]"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="text-white font-semibold text-sm sm:text-base">TripAdvisor</span>
            <span className="text-white/60 text-xs sm:text-sm">Dejanos tu opinion</span>
          </a>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <a
            href="https://wa.me/573108677635?text=Hola%20BogotourVIP%2C%20quiero%20cotizar%20tu%20servicio.%20%C2%BFMe%20pueden%20ayudar%20con%20la%20informacion%20y%20el%20precio%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 text-sm sm:text-base"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.chatWithUs || "Chatea con Nosotros"}
          </a>
        </div>
      </div>
    </section>
  )
}
