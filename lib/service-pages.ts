import { getTourBySlug, type TourFaq } from "./tours"
import { transportServices } from "./servicios"

export interface ServiceOffering {
  name: string
  description: string
  image: string
  duration: string
  features: string[]
  href?: string
}

export interface ServicePage {
  slug: string
  eyebrow: string
  title: string
  tagline: string
  heroImage: string
  intro: string[]
  facts: { label: string; value: string }[]
  offerings: ServiceOffering[]
  includes: string[]
  gallery: { src: string; alt: string }[]
  faq: TourFaq[]
  bookingName: string
  enHref: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
}

function offeringFromTour(slug: string, image?: string): ServiceOffering {
  const tour = getTourBySlug(slug)
  if (!tour) throw new Error(`Tour no encontrado: ${slug}`)
  return {
    name: tour.name,
    description: tour.shortDescription,
    image: image ?? tour.heroImage,
    duration: tour.duration,
    features: tour.highlights,
    href: `/tours/${tour.slug}`,
  }
}

function tourFaq(slug: string, count = 4): TourFaq[] {
  return getTourBySlug(slug)?.faq?.slice(0, count) ?? []
}

function tourIntro(slug: string): string[] {
  return getTourBySlug(slug)?.longDescription ?? []
}

const eventos = transportServices.find((s) => s.id === "eventos-grupos")!.i18n.es

export const servicePages: ServicePage[] = [
  {
    slug: "catedral-de-sal",
    eyebrow: "Servicio · Zipaquirá",
    title: "Tour Catedral de Sal de Zipaquirá",
    tagline: "La primera maravilla de Colombia, a 180 metros bajo tierra",
    heroImage: "/images/sitio-catedral-sal.png",
    intro: tourIntro("catedral-de-sal-zipaquira"),
    facts: [
      { label: "Duración", value: "Medio día (5-6 h)" },
      { label: "Distancia", value: "49 km de Bogotá" },
      { label: "Recogida", value: "En tu hotel" },
    ],
    offerings: [offeringFromTour("catedral-de-sal-zipaquira", "/images/sitio-catedral-sal.png")],
    includes: getTourBySlug("catedral-de-sal-zipaquira")?.includes ?? [],
    gallery: [
      { src: "/images/sitio-catedral-sal.png", alt: "Interior iluminado de la Catedral de Sal" },
      { src: "/images/sitio-zipaquira-centro.png", alt: "Centro histórico de Zipaquirá" },
      { src: "/images/flota-vans-blancas.jpg", alt: "Vans privadas de BogotourVip para el tour" },
    ],
    faq: tourFaq("catedral-de-sal-zipaquira"),
    bookingName: "Tour Catedral de Sal de Zipaquirá",
    enHref: "/en/tours/catedral-de-sal-zipaquira",
    metaTitle: "Tour Catedral de Sal de Zipaquirá desde Bogotá | Servicio privado",
    metaDescription:
      "Servicio privado a la Catedral de Sal de Zipaquirá desde Bogotá: recogida en hotel, guía bilingüe, entradas y transporte. Reserva por WhatsApp.",
    keywords: ["tour catedral de sal", "catedral de sal zipaquirá desde bogotá", "zipaquirá tour privado"],
  },
  {
    slug: "guatavita",
    eyebrow: "Servicio · Guatavita",
    title: "Tour Laguna de Guatavita",
    tagline: "La laguna sagrada donde nació la leyenda de El Dorado",
    heroImage: "/images/guatavita.jpg",
    intro: tourIntro("laguna-de-guatavita"),
    facts: [
      { label: "Duración", value: "Día completo (6-7 h)" },
      { label: "Distancia", value: "60 km de Bogotá" },
      { label: "Recogida", value: "En tu hotel" },
    ],
    offerings: [offeringFromTour("laguna-de-guatavita")],
    includes: getTourBySlug("laguna-de-guatavita")?.includes ?? [],
    gallery: [
      { src: "/images/guatavita.jpg", alt: "Laguna de Guatavita vista desde el sendero" },
      { src: "/images/sitio-pueblo-guatavita.png", alt: "Pueblo de Guatavita y su arquitectura blanca" },
      { src: "/images/img-4349.jpeg", alt: "Paisaje andino en el camino a Guatavita" },
    ],
    faq: tourFaq("laguna-de-guatavita"),
    bookingName: "Tour Laguna de Guatavita",
    enHref: "/en/tours/laguna-de-guatavita",
    metaTitle: "Tour Laguna de Guatavita desde Bogotá | Servicio privado",
    metaDescription:
      "Visita la Laguna de Guatavita y el pueblo de Guatavita con transporte privado y guía bilingüe desde Bogotá. Reserva por WhatsApp.",
    keywords: ["tour laguna de guatavita", "guatavita desde bogotá", "leyenda de el dorado tour"],
  },
  {
    slug: "monserrate-y-la-candelaria",
    eyebrow: "Servicio · Bogotá",
    title: "Monserrate y La Candelaria",
    tagline: "El mirador más alto y el barrio más colorido de Bogotá, en un mismo plan",
    heroImage: "/images/monserrate-luna-atardecer.jpg",
    intro: [
      "Este servicio une las dos experiencias más pedidas de Bogotá. Subes al Cerro de Monserrate, a 3.152 metros, para ver la ciudad completa desde lo alto, y luego bajas a recorrer las calles empedradas de La Candelaria, el barrio colonial donde nació la capital.",
      ...tourIntro("la-candelaria").slice(0, 1),
      "Puedes reservar las dos experiencias juntas o cada una por separado. Nosotros coordinamos el transporte privado entre los dos puntos, los tiquetes del teleférico o funicular y el guía bilingüe.",
    ],
    facts: [
      { label: "Duración", value: "5-6 h (ambos)" },
      { label: "Ubicación", value: "Centro de Bogotá" },
      { label: "Modalidad", value: "Juntos o por separado" },
    ],
    offerings: [
      offeringFromTour("monserrate", "/images/monserrate-iglesia-dia.jpg"),
      offeringFromTour("la-candelaria", "/images/la-candelaria-grafitis.jpg"),
    ],
    includes: ["Transporte privado", "Guía bilingüe", "Tiquetes de teleférico o funicular", "Botella de agua"],
    gallery: [
      { src: "/images/monserrate-jardines.jpg", alt: "Jardines del Santuario de Monserrate" },
      { src: "/images/calle-embudo-sombrillas.jpg", alt: "Calle del Embudo con sombrillas de colores" },
      { src: "/images/candelaria-calle-colonial.jpg", alt: "Calle colonial de La Candelaria" },
    ],
    faq: [...tourFaq("monserrate", 2), ...tourFaq("la-candelaria", 2)],
    bookingName: "Monserrate y La Candelaria",
    enHref: "/en/tours/monserrate",
    metaTitle: "Tour Monserrate y La Candelaria en Bogotá | Servicio privado",
    metaDescription:
      "Sube a Monserrate y recorre La Candelaria con transporte privado y guía bilingüe. Reserva las dos experiencias juntas o por separado por WhatsApp.",
    keywords: ["tour monserrate", "tour la candelaria", "monserrate y la candelaria", "graffiti tour bogotá"],
  },
  {
    slug: "aeropuerto-y-eventos",
    eyebrow: "Servicio · Transporte",
    title: "Traslados Aeropuerto y Eventos",
    tagline: "Transporte privado puerta a puerta, para una persona o para todo tu grupo",
    heroImage: "/images/servicio-aeropuerto.jpg",
    intro: [
      ...tourIntro("traslado-aeropuerto").slice(0, 1),
      eventos.description,
      "Ya sea que llegues solo a El Dorado o que necesites mover a cien invitados de una boda, coordinamos el vehículo correcto, el horario y la ruta para que nadie espere.",
    ],
    facts: [
      { label: "Disponibilidad", value: "24/7" },
      { label: "Cobertura", value: "Bogotá y alrededores" },
      { label: "Vehículos", value: "Sedán, SUV y vans" },
    ],
    offerings: [
      offeringFromTour("traslado-aeropuerto"),
      {
        name: eventos.name,
        description: eventos.description,
        image: "/images/flota-vans-blancas.jpg",
        duration: "Según el evento",
        features: eventos.features,
      },
    ],
    includes: [
      "Recepción con tu nombre en llegadas",
      "Monitoreo de vuelos en tiempo real",
      "Conductores dedicados al evento",
      "Tarifa fija acordada antes del viaje",
    ],
    gallery: [
      { src: "/images/suv-hotel-w.jpg", alt: "SUV privada frente al hotel" },
      { src: "/images/equipo-vans.jpg", alt: "Equipo de conductores con las vans" },
      { src: "/images/servicio-eventos.jpg", alt: "Transporte para eventos y grupos" },
    ],
    faq: [
      ...tourFaq("traslado-aeropuerto", 2),
      {
        q: "¿Cuántas personas pueden transportar para un evento?",
        a: "Desde un pasajero hasta grupos grandes. Combinamos sedanes, SUVs, vans y buses según el número de invitados, y coordinamos varios viajes si el evento lo necesita.",
      },
      {
        q: "¿Con cuánta anticipación debo reservar el transporte para un evento?",
        a: "Recomendamos reservar con al menos una semana de anticipación para bodas, congresos y grupos grandes. Para traslados al aeropuerto basta con unas horas.",
      },
    ],
    bookingName: "Traslado Aeropuerto y Eventos",
    enHref: "/en/tours/traslado-aeropuerto",
    metaTitle: "Traslado Aeropuerto El Dorado y Transporte para Eventos | BogotourVip",
    metaDescription:
      "Traslados privados al Aeropuerto El Dorado 24/7 y transporte para bodas, congresos y grupos en Bogotá. Conductores profesionales y tarifa fija.",
    keywords: [
      "traslado aeropuerto el dorado",
      "transporte para eventos bogotá",
      "transporte para bodas bogotá",
      "van con conductor bogotá",
    ],
  },
]

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug)
}
