"use client"

import { useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface BogotaVideoSectionProps {
  translations: any
}

// Video oficial de Bogota (Visit Bogota) alojado localmente en /public
const VIDEO_SRC = "/bogota-video.mp4"
const VIDEO_POSTER = "/bogota-video-poster.png"

/**
 * Seccion de video de fondo: se reproduce automaticamente en bucle
 * y silenciado (requisito de los navegadores para el autoplay).
 * El usuario puede activar/desactivar el sonido con el boton.
 */
export function BogotaVideoSection({ translations: t }: BogotaVideoSectionProps) {
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const next = !video.muted
    video.muted = next
    setMuted(next)
    if (!next) {
      video.play().catch(() => {})
    }
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
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full bg-black object-cover"
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <button
            type="button"
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
            aria-label={muted ? "Activar sonido" : "Silenciar"}
          >
            {muted ? (
              <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
