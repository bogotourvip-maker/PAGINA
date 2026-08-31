import type { Metadata } from "next"
import { tours } from "@/lib/tours"
import { ServiciosContent } from "@/components/servicios-content"

export const metadata: Metadata = {
  title: "Servicios y Tours en Bogotá y alrededores | BogotourVip",
  description:
    "Conoce en detalle todos nuestros tours privados en Bogotá y sus alrededores: qué visitarás, qué incluye cada experiencia, duración y recorrido. City Tour, Monserrate, La Candelaria, Guatavita, Catedral de Sal, Villa de Leyva y traslados.",
  alternates: {
    canonical: "https://bogotourvip.com/servicios",
  },
  openGraph: {
    title: "Servicios y Tours en Bogotá y alrededores | BogotourVip",
    description:
      "Todos nuestros servicios turísticos detallados: tours en Bogotá, excursiones a los alrededores y transporte privado.",
    url: "https://bogotourvip.com/servicios",
    type: "website",
  },
}

export default function ServiciosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios y tours en Bogotá y alrededores",
    itemListElement: tours.map((tour, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristTrip",
        name: tour.name,
        description: tour.metaDescription,
        image: `https://bogotourvip.com${tour.heroImage}`,
        url: `https://bogotourvip.com/tours/${tour.slug}`,
      },
    })),
  }

  return (
    <ServiciosContent>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </ServiciosContent>
  )
}
