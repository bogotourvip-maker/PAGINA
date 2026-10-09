import type { MetadataRoute } from "next"
import { tours } from "@/lib/tours"
import { blogPosts } from "@/lib/blog"
import { servicePages } from "@/lib/service-pages"
import { tourHref, tourToServicio } from "@/lib/tour-routes"

const BASE_URL = "https://bogotourvip.com"

function bilingual(
  esPath: string,
  enPath: string,
  changeFrequency: "weekly" | "monthly",
  priority: number,
): MetadataRoute.Sitemap {
  const languages = { es: `${BASE_URL}${esPath}`, en: `${BASE_URL}${enPath}` }
  return [
    { url: languages.es, lastModified: new Date(), changeFrequency, priority, alternates: { languages } },
    { url: languages.en, lastModified: new Date(), changeFrequency, priority, alternates: { languages } },
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const tourUrls = tours.flatMap((tour) =>
    tourToServicio[tour.slug]
      ? bilingual(tourHref(tour.slug), `/en/tours/${tour.slug}`, "monthly", 0.85)
      : bilingual(`/tours/${tour.slug}`, `/en/tours/${tour.slug}`, "monthly", 0.8),
  )
  const pairedServicios = new Set(Object.values(tourToServicio))

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    ...bilingual("", "/en", "weekly", 1),
    ...bilingual("/tours", "/en/tours", "weekly", 0.9),
    {
      url: `${BASE_URL}/servicios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...servicePages.filter((page) => !pairedServicios.has(page.slug)).map((page) => ({
      url: `${BASE_URL}/servicios/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...tourUrls,
    ...blogUrls,
  ]
}
