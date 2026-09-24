import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { WHATSAPP_LINK } from "@/lib/tours"

type NavLang = "es" | "en"

const NAV_COPY: Record<
  NavLang,
  {
    home: string
    homeHref: string
    links: { label: string; href: string }[]
    book: string
    switchLabel: string
    switchHref: string
  }
> = {
  es: {
    home: "Inicio",
    homeHref: "/",
    links: [
      { label: "Servicios", href: "/servicios" },
      { label: "Tours", href: "/tours" },
      { label: "Blog", href: "/blog" },
    ],
    book: "Reservar",
    switchLabel: "EN",
    switchHref: "/en",
  },
  en: {
    home: "Home",
    homeHref: "/en",
    links: [
      { label: "Tours", href: "/en/tours" },
      { label: "Blog", href: "/blog" },
    ],
    book: "Book now",
    switchLabel: "ES",
    switchHref: "/",
  },
}

export function ToursNav({ lang = "es" }: { lang?: NavLang }) {
  const t = NAV_COPY[lang]

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href={t.homeHref}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.home}
        </Link>

        <Link href={t.homeHref} className="text-lg font-bold text-white tracking-tight">
          Bogotour<span className="text-[#d4af37]">VIP</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden sm:flex items-center gap-5 text-sm font-medium">
            {t.links.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/80 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href={t.switchHref}
            className="text-xs font-semibold text-white/70 hover:text-white border border-white/20 rounded-full px-2.5 py-1 transition-colors"
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {t.switchLabel}
          </Link>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#d4af37] text-black hover:bg-[#c9a430] transition-colors text-sm font-semibold px-4 py-2 rounded-full"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{t.book}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
