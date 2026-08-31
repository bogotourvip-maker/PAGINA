"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"

interface BogotaVideoSectionProps {
  translations: any
}

// Video oficial de Bogota (Visit Bogota) alojado localmente en /public
const VIDEO_SRC = "/bogota-video.mp4"
const VIDEO_POSTER = "/bogota-video-poster.png"

/**
 * Seccion de video con carga diferida tipo "facade":
 * de entrada SOLO se muestra el poster ligero + boton de play.
 * El archivo de video se descarga y reproduce unicamente cuando el
 * usuario hace clic, por lo que NO afecta la velocidad de carga inicial.
 */
export function BogotaVideoSection({ translations: t }: BogotaVideoSectionProps) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setPlaying(true)
    // Esperamos al render del <video> para dispararlo
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {})
    })
  }

  return (
    <section id="video" className="py-16 sm:py-20 md:py-24 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[#d4af37] text-xs sm:text-sm font-semibold tracking-[0.2em] mb-3">{t.videoEyebrow}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">{t.videoTitle}</h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-2xl mx-auto text-pretty">{t.videoSubtitle}</p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          {playing ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full bg-black"
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              controls
              playsInline
              preload="auto"
            />
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="group absolute inset-0 h-full w-full cursor-pointer"
              aria-label={t.videoCta}
            >
              {/* Poster ligero (no descarga el video hasta el clic) */}
              <img
                src={VIDEO_POSTER || "/placeholder.svg"}
                alt={t.videoTitle}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={1280}
                height={720}
              />
              <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 sm:h-20 sm:w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d4af37] text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
                <Play className="h-7 w-7 sm:h-9 sm:w-9 translate-x-0.5 fill-current" />
              </span>
              <span className="sr-only">{t.videoCta}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
