import Link from "next/link"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { WHATSAPP_LINK } from "@/lib/tours"
import { LangToggle } from "@/components/lang-toggle"

type NavLang = "es" | "en"

const NAV_COPY: Record<
  NavLang,
  {
    homeHref: string
    links: { label: string; href: string }[]
    book: string
  }
> = {
  es: {
    homeHref: "/",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Servicios", href: "/servicios" },
      { label: "Tours", href: "/tours" },
      { label: "Tour Zipaquirá", href: "/tours/catedral-de-sal-zipaquira" },
      { label: "Catedral de Sal", href: "/servicios/catedral-de-sal" },
      { label: "Monserrate", href: "/servicios/monserrate-y-la-candelaria" },
      { label: "Tour Guatavita", href: "/tours/laguna-de-guatavita" },
      { label: "Guatavita", href: "/servicios/guatavita" },
      { label: "Tour Villa de Leyva", href: "/tours/villa-de-leyva" },
      { label: "Villa de Leyva", href: "/servicios/villa-de-leyva" },
      { label: "Jaime Duque", href: "/tours/parque-jaime-duque" },
      { label: "Blog", href: "/blog" },
    ],
    book: "Reservar",
  },
  en: {
    homeHref: "/en",
    links: [
      { label: "Home", href: "/en" },
      { label: "Tours", href: "/en/tours" },
      { label: "Salt Cathedral", href: "/en/tours/catedral-de-sal-zipaquira" },
      { label: "Monserrate", href: "/en/tours/monserrate" },
      { label: "Guatavita", href: "/en/tours/laguna-de-guatavita" },
      { label: "Villa de Leyva", href: "/en/tours/villa-de-leyva" },
      { label: "Jaime Duque", href: "/en/tours/parque-jaime-duque" },
      { label: "Blog", href: "/blog" },
    ],
    book: "Book now",
  },
}

export function ToursNav({
  lang = "es",
  esHref = "/",
  enHref = "/en",
}: {
  lang?: NavLang
  esHref?: string
  enHref?: string
}) {
  const t = NAV_COPY[lang]

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link href={t.homeHref} className="shrink-0" aria-label="BogotourVip - Inicio">
          <Image
            src="/logo-bogotourvip.jpg"
            alt="BogotourVip"
            width={300}
            height={100}
            className="h-12 md:h-16 w-auto object-contain"
            priority
            sizes="200px"
          />
        </Link>

        <nav aria-label="Principal" className="hidden xl:flex items-center gap-5 text-sm font-medium whitespace-nowrap">
          {t.links.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/75 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle current={lang} esHref={esHref} enHref={enHref} />
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#d4af37] text-black hover:bg-[#c9a430] transition-colors text-sm font-semibold px-4 py-2.5 rounded-full"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">{t.book}</span>
          </a>
        </div>
      </div>

      <nav
        aria-label="Tours"
        className="xl:hidden border-t border-white/10 overflow-x-auto [scrollbar-width:none]"
      >
        <ul className="flex items-center gap-2 px-4 py-2 w-max">
          {t.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-xs font-medium text-white/80 hover:text-white border border-white/15 rounded-full px-3 py-1.5 whitespace-nowrap"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
