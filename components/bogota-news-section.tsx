"use client"

import { useEffect, useState } from "react"
import { Newspaper, ExternalLink, MapPin, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Article {
  title: string
  date: string
  category: string
  url: string
}

interface BogotaNewsSectionProps {
  translations: any
}

const categoryColors: Record<string, string> = {
  Gastronomia: "bg-orange-100 text-orange-700 border-orange-200",
  Cultura: "bg-blue-100 text-blue-700 border-blue-200",
  Eventos: "bg-green-100 text-green-700 border-green-200",
  Turismo: "bg-amber-100 text-amber-700 border-amber-200",
}

export function BogotaNewsSection({ translations: t }: BogotaNewsSectionProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchNews = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch("/api/bogota-news")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setArticles(data.articles || [])
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <p className="text-[#d4af37] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
            NOTICIAS
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-3">
            Turismo en Bogota
          </h2>
          <p className="text-sm sm:text-base text-white/50 max-w-xl">
            Lo ultimo en gastronomia, cultura y eventos de la ciudad
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/5 rounded-xl border border-white/10 p-4 animate-pulse"
              >
                <div className="h-4 bg-white/10 rounded w-20 mb-4" />
                <div className="h-5 bg-white/10 rounded w-full mb-2" />
                <div className="h-5 bg-white/10 rounded w-3/4 mb-4" />
                <div className="h-3 bg-white/10 rounded w-24" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-12">
            <Newspaper className="w-10 h-10 text-white/30 mx-auto mb-4" />
            <p className="text-white/50 mb-4">No se pudieron cargar las noticias</p>
            <Button onClick={fetchNews} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reintentar
            </Button>
          </div>
        )}

        {/* Articles grid */}
        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="h-full bg-white/5 border-white/10 hover:border-white/20 transition-colors duration-300">
                  <CardContent className="p-4 flex flex-col h-full">
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#d4af37]/20 text-[#d4af37]">
                        {article.category}
                      </span>
                      <ExternalLink className="w-3 h-3 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-medium text-white leading-snug mb-3 group-hover:text-[#d4af37] transition-colors line-clamp-3 flex-1">
                      {article.title}
                    </h3>

                    {/* Date */}
                    {article.date && (
                      <p className="text-[10px] text-white/40 mt-auto pt-2 border-t border-white/10">
                        {article.date}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}

        {/* Footer link */}
        <div className="text-center mt-8">
          <a
            href="https://visitbogota.co/es/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#d4af37] hover:text-[#f0c54a] transition-colors"
          >
            Ver mas en visitbogota.co
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
