import type { MetadataRoute } from "next"

const BASE_URL = "https://bogotourvip.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Evitamos que los buscadores gasten presupuesto de rastreo en rutas internas de API
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
