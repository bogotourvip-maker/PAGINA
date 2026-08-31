"use client"

const items = [
  "Tours Privados",
  "Transfer Aeropuerto",
  "Servicio Ejecutivo",
  "Guias Bilingues",
  "Flota Premium",
  "24/7 Disponible",
  "Bogota",
  "Villa de Leyva",
  "Guatavita",
  "Monserrate",
  "La Candelaria",
  "Zona Cafetera",
]

export function MarqueeSection() {
  return (
    <div className="bg-black py-4 sm:py-5 border-y border-white/10 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="mx-4 sm:mx-6 md:mx-8 text-sm sm:text-base md:text-lg font-medium text-white/40"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
