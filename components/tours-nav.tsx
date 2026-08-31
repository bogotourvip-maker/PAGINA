import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { WHATSAPP_LINK } from "@/lib/tours"

export function ToursNav() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Inicio
        </Link>

        <Link href="/" className="text-lg font-bold text-white tracking-tight">
          Bogotour<span className="text-[#d4af37]">VIP</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden sm:flex items-center gap-5 text-sm font-medium">
            <Link href="/tours" className="text-white/80 hover:text-white transition-colors">
              Tours
            </Link>
            <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
              Blog
            </Link>
          </nav>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#d4af37] text-black hover:bg-[#c9a430] transition-colors text-sm font-semibold px-4 py-2 rounded-full"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Reservar</span>
          </a>
        </div>
      </div>
    </header>
  )
}
