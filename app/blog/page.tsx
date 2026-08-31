import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { ToursNav } from "@/components/tours-nav"
import { blogPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog de viajes | Consejos y destinos en Bogotá y alrededores",
  description:
    "Consejos de viaje, destinos y guías sobre Bogotá y sus alrededores. Descubre qué ver, cómo moverte y las mejores excursiones de la capital colombiana.",
  alternates: {
    canonical: "https://bogotourvip.com/blog",
  },
  openGraph: {
    title: "Blog de viajes Bogotá | BogotourVip",
    description:
      "Consejos de viaje, destinos y guías sobre Bogotá y sus alrededores. Todo lo que necesitas para planear tu visita.",
    url: "https://bogotourvip.com/blog",
    type: "website",
  },
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <main className="min-h-screen bg-black">
      <ToursNav />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            BLOG DE VIAJES
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 text-balance">
            Consejos y destinos<br />
            <span className="text-white/60">para tu viaje a Bogotá.</span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl text-pretty">
            Guías, recomendaciones y secretos locales para descubrir Bogotá y sus alrededores. Escrito por quienes
            conocen la ciudad a fondo.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-16 sm:pb-20 md:pb-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-6 lg:gap-8 mb-12 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all duration-300"
          >
            <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
              <Image
                src={featured.heroImage || "/placeholder.svg"}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full">
                {featured.category}
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="flex items-center gap-4 text-white/50 text-xs mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {featured.displayDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors text-balance">
                {featured.title}
              </h2>
              <p className="text-white/60 text-sm sm:text-base mb-5 text-pretty">{featured.excerpt}</p>
              <span className="flex items-center gap-1 text-[#d4af37] text-sm font-semibold">
                Leer artículo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Rest of posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.heroImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-3 text-white/50 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.displayDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors text-balance">
                    {post.title}
                  </h2>
                  <p className="text-sm text-white/50 mb-4 flex-1 text-pretty line-clamp-3">{post.excerpt}</p>
                  <span className="flex items-center gap-1 text-[#d4af37] text-sm font-semibold">
                    Leer más
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
