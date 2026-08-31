import type { Metadata } from "next"
import { transportServices } from "@/lib/servicios"
import { ServiciosContent } from "@/components/servicios-content"

export const metadata: Metadata = {
  title: "Servicios de Transporte Privado en Bogotá | BogotourVip",
  description:
    "Transporte privado en Bogotá para cada ocasión: traslados al Aeropuerto El Dorado, transporte ejecutivo, logística para eventos y grupos, y traslados intermunicipales. Conductores profesionales 24/7.",
  alternates: {
    canonical: "https://bogotourvip.com/servicios",
  },
  openGraph: {
    title: "Servicios de Transporte Privado en Bogotá | BogotourVip",
    description:
      "Traslados al aeropuerto, transporte ejecutivo, eventos y viajes intermunicipales con conductores profesionales.",
    url: "https://bogotourvip.com/servicios",
    type: "website",
  },
}

export default function ServiciosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios de transporte privado en Bogotá",
    itemListElement: transportServices.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.i18n.es.name,
        description: service.i18n.es.description,
        image: `https://bogotourvip.com${service.image}`,
        areaServed: "Bogotá, Colombia",
        provider: {
          "@type": "TravelAgency",
          name: "BogotourVip",
        },
      },
    })),
  }

  return (
    <ServiciosContent>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </ServiciosContent>
  )
}
