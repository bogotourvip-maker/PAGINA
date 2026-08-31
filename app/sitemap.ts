import type { MetadataRoute } from "next"
import { tours } from "@/lib/tours"
import { blogPosts } from "@/lib/blog"

const BASE_URL = "https://bogotourvip.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const tourUrls: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${BASE_URL}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
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
