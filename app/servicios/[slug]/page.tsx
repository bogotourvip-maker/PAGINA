import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServicePage, servicePages } from "@/lib/service-pages"
import { whatsappLinkFor } from "@/lib/tours"
import { enTourForServicio } from "@/lib/tour-routes"
import { ServicePageView } from "@/components/service-page-view"

const SITE = "https://bogotourvip.com"

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = getServicePage(slug)
  if (!page) return {}
  const url = `${SITE}/servicios/${page.slug}`
  const enTour = enTourForServicio(page.slug)
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: url,
      ...(enTour && {
        languages: { es: url, en: `${SITE}/en/tours/${enTour}`, "x-default": url },
      }),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "BogotourVip",
      type: "website",
      locale: "es_CO",
      images: [{ url: `${SITE}${page.heroImage}`, width: 1200, height: 630, alt: page.title }],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getServicePage(slug)
  if (!page) notFound()

  const url = `${SITE}/servicios/${page.slug}`
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.metaDescription,
      image: `${SITE}${page.heroImage}`,
      url,
      areaServed: "Bogotá, Colombia",
      provider: { "@type": "TravelAgency", name: "BogotourVip", url: SITE },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
        { "@type": "ListItem", position: 2, name: "Servicios", item: `${SITE}/servicios` },
        { "@type": "ListItem", position: 3, name: page.title, item: url },
      ],
    },
    ...(page.faq.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServicePageView page={page} whatsappLink={whatsappLinkFor(page.bookingName)} />
    </>
  )
}
