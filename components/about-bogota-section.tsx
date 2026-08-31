"use client"

import Image from "next/image"

interface AboutBogotaSectionProps {
  translations: any
}

export function AboutBogotaSection({ translations: t }: AboutBogotaSectionProps) {
  return (
    <section className="bg-black py-16 sm:py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            {t.aboutEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] text-balance">
            {t.aboutTitle}
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-5 gap-8 sm:gap-10 lg:gap-14 items-start">
          {/* Text column */}
          <div className="md:col-span-3 space-y-5 text-white/70 text-base sm:text-lg leading-relaxed">
            <p>{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
            <p>{t.aboutP3}</p>
            <p>{t.aboutP4}</p>
          </div>

          {/* Image column */}
          <div className="md:col-span-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/plaza-bolivar-catedral.jpg"
                alt="Plaza de Bolívar con la Catedral Primada de Bogotá"
                fill
                loading="lazy"
                quality={75}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-semibold text-lg">{t.aboutImageCaption}</p>
                <p className="text-white/70 text-sm">{t.aboutImageSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
