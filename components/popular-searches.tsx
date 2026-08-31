import Link from "next/link"
import { Search } from "lucide-react"

type Lang = "es" | "en" | "fr" | "de" | "pt" | "it" | "zh"

// Encabezados localizados (patron i18n propio, igual que el resto de paginas del sitio)
const copy: Record<Lang, { kicker: string; title: string; subtitle: string }> = {
  es: {
    kicker: "Lo más buscado",
    title: "Tours y servicios más buscados en Bogotá",
    subtitle:
      "Explora las experiencias que más reservan nuestros viajeros. Toca cualquier búsqueda para ver detalles, fotos y precios.",
  },
  en: {
    kicker: "Most searched",
    title: "Most popular tours and services in Bogotá",
    subtitle:
      "Explore the experiences our travelers book the most. Tap any search to see details, photos and prices.",
  },
  fr: {
    kicker: "Les plus recherchés",
    title: "Tours et services les plus demandés à Bogotá",
    subtitle:
      "Découvrez les expériences les plus réservées par nos voyageurs. Touchez une recherche pour voir détails, photos et prix.",
  },
  de: {
    kicker: "Am meisten gesucht",
    title: "Beliebteste Touren und Services in Bogotá",
    subtitle:
      "Entdecke die von unseren Reisenden meistgebuchten Erlebnisse. Tippe auf eine Suche für Details, Fotos und Preise.",
  },
  pt: {
    kicker: "Mais procurados",
    title: "Tours e serviços mais procurados em Bogotá",
    subtitle:
      "Explore as experiências mais reservadas pelos nossos viajantes. Toque em qualquer busca para ver detalhes, fotos e preços.",
  },
  it: {
    kicker: "Più cercati",
    title: "Tour e servizi più richiesti a Bogotá",
    subtitle:
      "Scopri le esperienze più prenotate dai nostri viaggiatori. Tocca una ricerca per vedere dettagli, foto e prezzi.",
  },
  zh: {
    kicker: "热门搜索",
    title: "波哥大最受欢迎的旅游与服务",
    subtitle: "探索旅客预订最多的体验。点击任意搜索即可查看详情、照片和价格。",
  },
}

// Texto ancla optimizado para SEO: cada enlace apunta a una pagina real con
// palabras clave de alta intencion de busqueda.
const searches: { label: string; href: string; hot?: boolean }[] = [
  { label: "City Tour Bogotá", href: "/tours/city-tour-bogota", hot: true },
  { label: "Tour Monserrate", href: "/tours/monserrate" },
  { label: "Tour La Candelaria y Graffiti Tour", href: "/tours/la-candelaria" },
  { label: "Laguna de Guatavita", href: "/tours/laguna-de-guatavita" },
  { label: "Catedral de Sal de Zipaquirá", href: "/tours/catedral-de-sal-zipaquira", hot: true },
  { label: "Tour Villa de Leyva", href: "/tours/villa-de-leyva" },
  { label: "Traslado Aeropuerto El Dorado", href: "/servicios", hot: true },
  { label: "Transporte ejecutivo en Bogotá", href: "/servicios" },
  { label: "Transporte para eventos y grupos", href: "/servicios" },
  { label: "Tours privados en Bogotá", href: "/tours" },
  { label: "Excursiones desde Bogotá", href: "/tours" },
  { label: "Qué hacer en Bogotá", href: "/blog" },
]

export function PopularSearches({ language = "es" }: { language?: Lang }) {
  const t = copy[language] ?? copy.es

  return (
    <section aria-labelledby="popular-searches-title" className="bg-black py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center gap-2 text-[#d4af37]">
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-[0.2em]">{t.kicker}</span>
        </div>

        <h2
          id="popular-searches-title"
          className="mt-3 max-w-3xl text-pretty text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--playfair)" }}
        >
          {t.title}
        </h2>

        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-white/60">{t.subtitle}</p>

        <ul className="mt-9 flex flex-wrap gap-3">
          {searches.map((s) => (
            <li key={s.label}>
              <Link
                href={s.href}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                  s.hot
                    ? "border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20"
                    : "border-white/15 bg-white/[0.03] text-white/80 hover:border-[#d4af37]/40 hover:text-white"
                }`}
              >
                {s.label}
                <span
                  aria-hidden="true"
                  className="translate-x-0 text-xs opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
