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

const priceSubjects: Record<string, string> = {
  "catedral-de-sal": "el tour a la Catedral de Sal de Zipaquirá desde Bogotá",
  guatavita: "el tour a la Laguna de Guatavita desde Bogotá",
  "monserrate-y-la-candelaria": "el tour a Monserrate y La Candelaria",
  "villa-de-leyva": "el tour a Villa de Leyva desde Bogotá",
  "aeropuerto-y-eventos": "el transporte para eventos y grupos en Bogotá",
  "layover-tour-bogota": "el Layover Tour Bogotá Express",
}

function withPriceFaq(page: ServicePage): ServicePage {
  const subject = priceSubjects[page.slug]
  if (!subject || page.faq.some((f) => /precio|cuánto cuesta/i.test(f.q))) return page
  return {
    ...page,
    faq: [
      ...page.faq,
      {
        q: `¿Cuál es el precio de ${subject}?`,
        a: "El precio depende del número de personas, el tipo de vehículo y el punto de recogida. Escríbenos por WhatsApp con tu fecha y el número de viajeros y te enviamos una cotización con tarifa fija, sin sorpresas. El valor incluye el transporte privado; si tu plan lo requiere, las entradas y el guía bilingüe se cotizan aparte.",
      },
    ],
  }
}

const servicePageData: ServicePage[] = [
  {
    slug: "catedral-de-sal",
    eyebrow: "Servicio · Zipaquirá",
    title: "Tour Catedral de Sal de Zipaquirá",
    tagline: "La primera maravilla de Colombia, a 180 metros bajo tierra",
    heroImage: "/images/catedral-sal-nave-lampara.jpg",
    intro: tourIntro("catedral-de-sal-zipaquira"),
    facts: [
      { label: "Duración", value: "Medio día (5-6 h)" },
      { label: "Distancia", value: "49 km de Bogotá" },
      { label: "Recogida", value: "En tu hotel" },
    ],
    offerings: [offeringFromTour("catedral-de-sal-zipaquira", "/images/catedral-sal-cruz-dorada.jpg")],
    includes: getTourBySlug("catedral-de-sal-zipaquira")?.includes ?? [],
    gallery: [
      { src: "/images/catedral-sal-angel.jpg", alt: "Escultura de ángel con trompeta en el túnel azul de la Catedral de Sal" },
      { src: "/images/catedral-sal-cruz-azul.jpg", alt: "Cruz de sal iluminada en azul con dos bloques de sal" },
      { src: "/images/catedral-sal-cruz-morada.jpg", alt: "Cruz de sal con luz morada y túnel naranja al fondo" },
      { src: "/images/catedral-sal-pareja-cruz.jpg", alt: "Viajeros de BogotourVip frente a una cruz tallada en la Catedral de Sal" },
      { src: "/images/sitio-zipaquira-centro.png", alt: "Centro histórico de Zipaquirá" },
    ],
    faq: tourFaq("catedral-de-sal-zipaquira"),
    bookingName: "Tour Catedral de Sal de Zipaquirá",
    enHref: "/en/tours/catedral-de-sal-zipaquira",
    metaTitle: "Tour Catedral de Sal de Zipaquirá desde Bogotá | Precio y reserva",
    metaDescription:
      "Tour privado a la Catedral de Sal de Zipaquirá desde Bogotá: recogida en hotel, transporte privado y guía bilingüe opcional. Consulta el precio por WhatsApp.",
    keywords: [
      "tour catedral de sal zipaquirá precio",
      "tour catedral de sal",
      "catedral de sal zipaquirá desde bogotá",
      "zipaquirá tour privado",
    ],
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
    offerings: [offeringFromTour("laguna-de-guatavita", "/images/guatavita-casa-al-reves-guia.jpg")],
    includes: getTourBySlug("laguna-de-guatavita")?.includes ?? [],
    gallery: [
      { src: "/images/guatavita-amigos-laguna.jpg", alt: "Grupo de amigos sonriendo frente al embalse de Guatavita" },
      { src: "/images/sitio-pueblo-guatavita.png", alt: "Pueblo de Guatavita y su arquitectura blanca" },
      { src: "/images/img-4349.jpeg", alt: "Paisaje andino en el camino a Guatavita" },
    ],
    faq: tourFaq("laguna-de-guatavita"),
    bookingName: "Tour Laguna de Guatavita",
    enHref: "/en/tours/laguna-de-guatavita",
    metaTitle: "Tour Laguna de Guatavita desde Bogotá | Precio y reserva",
    metaDescription:
      "Visita la Laguna de Guatavita y el pueblo de Guatavita con transporte privado desde Bogotá. Guía bilingüe opcional. Consulta el precio por WhatsApp.",
    keywords: ["tour laguna de guatavita precio", "tour laguna de guatavita", "guatavita desde bogotá", "leyenda de el dorado tour"],
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
      "Puedes reservar las dos experiencias juntas o cada una por separado. Nosotros coordinamos el transporte privado entre los dos puntos y, si lo necesitas, un guía bilingüe como servicio adicional.",
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
    includes: ["Transporte privado", "Traslado entre Monserrate y La Candelaria", "Botella de agua"],
    gallery: [
      { src: "/images/monserrate-jardines.jpg", alt: "Jardines del Santuario de Monserrate" },
      { src: "/images/calle-embudo-sombrillas.jpg", alt: "Calle del Embudo con sombrillas de colores" },
      { src: "/images/candelaria-calle-colonial.jpg", alt: "Calle colonial de La Candelaria" },
      { src: "/images/img-0705.jpeg", alt: "Viajeros junto al letrero BOGOTA en la cima de Monserrate" },
      { src: "/images/bogota-casa-azul-ecomoda.jpg", alt: "Viajeras felices frente a una casa azul tradicional de Bogotá" },
    ],
    faq: [...tourFaq("monserrate", 2), ...tourFaq("la-candelaria", 2)],
    bookingName: "Monserrate y La Candelaria",
    enHref: "/en/tours/monserrate",
    metaTitle: "Tour Monserrate y La Candelaria en Bogotá | Servicio privado",
    metaDescription:
      "Sube a Monserrate y recorre La Candelaria con transporte privado y guía bilingüe opcional. Reserva las dos experiencias juntas o por separado por WhatsApp.",
    keywords: ["tour monserrate", "tour la candelaria", "monserrate y la candelaria", "graffiti tour bogotá"],
  },
  {
    slug: "villa-de-leyva",
    eyebrow: "Servicio · Boyacá",
    title: "Tour Villa de Leyva",
    tagline: "El pueblo colonial más bello de Colombia y su plaza empedrada gigante",
    heroImage: "/images/villa-de-leyva.png",
    intro: tourIntro("villa-de-leyva"),
    facts: [
      { label: "Duración", value: "Día completo (10-12 h)" },
      { label: "Distancia", value: "165 km de Bogotá" },
      { label: "Recogida", value: "En tu hotel" },
    ],
    offerings: [offeringFromTour("villa-de-leyva", "/images/villa-leyva-plaza-mayor.jpg")],
    includes: getTourBySlug("villa-de-leyva")?.includes ?? [],
    gallery: [
      { src: "/images/casa-terracota-villa-leyva.jpg", alt: "Casa Terracota en Villa de Leyva" },
      { src: "/images/pozos-azules-villa-leyva.jpg", alt: "Pozos Azules en Villa de Leyva" },
      { src: "/images/jaime-duque-taj-mahal.jpg", alt: "Viajera frente a la réplica del Taj Mahal en el Parque Jaime Duque, parada en la ruta" },
    ],
    faq: tourFaq("villa-de-leyva"),
    bookingName: "Tour Villa de Leyva",
    enHref: "/en/tours/villa-de-leyva",
    metaTitle: "Tour Villa de Leyva desde Bogotá | Precio y reserva",
    metaDescription:
      "Tour privado a Villa de Leyva desde Bogotá: Plaza Mayor, Casa Terracota y Pozos Azules con transporte privado y guía bilingüe opcional. Consulta el precio por WhatsApp.",
    keywords: ["tour villa de leyva precio", "tour villa de leyva", "villa de leyva desde bogotá", "casa terracota tour", "pozos azules villa de leyva"],
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
      { src: "/images/flota-mercedes-vans.jpg", alt: "Flota de vans Mercedes-Benz de BogotourVIP" },
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
    metaTitle: "Transporte para Eventos, Bodas y Grupos en Bogotá | BogotourVip",
    metaDescription:
      "Transporte privado para bodas, congresos y grupos en Bogotá con sedanes, SUVs y vans con conductor. También traslados al Aeropuerto El Dorado. Consulta el precio por WhatsApp.",
    keywords: [
      "transporte para eventos bogotá",
      "transporte para grupos bogotá",
      "transporte para bodas bogotá",
      "van con conductor bogotá",
    ],
  },
  {
    slug: "layover-tour-bogota",
    eyebrow: "Servicio · Escala en El Dorado",
    title: "Layover Tour Bogotá Express",
    tagline: "Convierte tu escala de 6 a 12 horas en El Dorado en un recorrido por Bogotá",
    heroImage: "/images/layover-tour-bogota.png",
    intro: [
      "¿Tienes una escala larga en el Aeropuerto El Dorado? En lugar de esperar horas en la sala, sal a conocer Bogotá. Te recogemos en la puerta de llegadas, te llevamos a los lugares más emblemáticos de la ciudad y te dejamos de vuelta en el aeropuerto con tiempo de sobra para tu siguiente vuelo.",
      "Armamos el recorrido según las horas que tengas libres. Con 6 horas alcanzas a subir a Monserrate y caminar por La Candelaria. Con 10 a 12 horas puedes sumar un almuerzo típico o una visita a la Catedral de Sal de Zipaquirá.",
      "Monitoreamos tu vuelo de llegada y tu vuelo de salida, y planeamos el regreso con un margen de seguridad: llegas al aeropuerto al menos 3 horas antes de un vuelo internacional y 2 horas antes de uno nacional. Si tienes equipaje facturado en conexión, no necesitas cargarlo.",
    ],
    facts: [
      { label: "Escala ideal", value: "6 a 12 horas" },
      { label: "Recogida", value: "Puerta de llegadas" },
      { label: "Retorno", value: "Garantizado a tiempo" },
    ],
    offerings: [
      {
        name: "Layover Express (6-8 h de escala)",
        description:
          "Recorrido de unas 4 horas por lo esencial de Bogotá: Cerro de Monserrate y el centro histórico de La Candelaria, con regreso directo a El Dorado.",
        image: "/images/img-0705.jpeg",
        duration: "Aprox. 4 h fuera del aeropuerto",
        features: ["Monserrate en teleférico o funicular", "Caminata por La Candelaria", "Plaza de Bolívar", "Regreso directo a El Dorado"],
        href: "/servicios/monserrate-y-la-candelaria",
      },
      {
        name: "Layover Plus (10-12 h de escala)",
        description:
          "Más tiempo para Bogotá: Monserrate, La Candelaria y un almuerzo típico, o el cambio por una visita a la Catedral de Sal de Zipaquirá.",
        image: "/images/catedral-sal-cruz-dorada.jpg",
        duration: "Aprox. 6-8 h fuera del aeropuerto",
        features: ["Ruta a tu medida", "Almuerzo típico colombiano (opcional)", "Catedral de Sal como alternativa", "Guía bilingüe opcional"],
        href: "/servicios/catedral-de-sal",
      },
    ],
    includes: [
      "Recogida y retorno al Aeropuerto El Dorado",
      "Monitoreo de tus vuelos de llegada y salida",
      "Conductor privado durante todo el recorrido",
      "Vehículo privado para guardar tu equipaje de mano",
      "Botella de agua",
    ],
    gallery: [
      { src: "/images/aeropuerto-nuevo.avif", alt: "Terminal del Aeropuerto El Dorado de Bogotá" },
      { src: "/images/monserrate-iglesia-dia.jpg", alt: "Santuario de Monserrate en un día despejado" },
      { src: "/images/candelaria-calle-colonial.jpg", alt: "Calle colonial de La Candelaria" },
      { src: "/images/calle-embudo-sombrillas.jpg", alt: "Calle del Embudo con sombrillas de colores" },
    ],
    faq: [
      {
        q: "¿Cuántas horas de escala necesito para el Layover Tour en Bogotá?",
        a: "Recomendamos un mínimo de 6 horas entre la llegada y la salida de tus vuelos. Así queda tiempo para migración, el recorrido y el regreso con margen. Con 10 a 12 horas puedes hacer un plan más completo.",
      },
      {
        q: "¿Puedo salir del aeropuerto durante una escala internacional en Bogotá?",
        a: "Sí, siempre que pases por migración de Colombia. Muchas nacionalidades no necesitan visa para estancias cortas, pero revisa los requisitos de tu país antes de viajar. Si tienes dudas, escríbenos y te orientamos.",
      },
      {
        q: "¿Qué pasa si mi vuelo de llegada se retrasa?",
        a: "Monitoreamos tu vuelo en tiempo real. Si llega tarde, el conductor te espera y ajustamos el recorrido a las horas reales disponibles. Nunca recortamos el margen de regreso al aeropuerto.",
      },
      {
        q: "¿Qué hago con mi equipaje durante el tour?",
        a: "El equipaje facturado en conexión sigue directo a tu destino. El equipaje de mano puede quedarse en el vehículo privado durante el recorrido.",
      },
    ],
    bookingName: "Layover Tour Bogotá Express",
    enHref: "/en",
    metaTitle: "Layover Tour Bogotá Express | Tour en tu escala en El Dorado",
    metaDescription:
      "¿Escala de 6 a 12 horas en el Aeropuerto El Dorado? Tour privado por Bogotá con recogida y retorno garantizado al aeropuerto. Monserrate, La Candelaria y más. Reserva por WhatsApp.",
    keywords: [
      "layover tour bogotá",
      "tour escala aeropuerto el dorado",
      "qué hacer en una escala en bogotá",
      "bogota layover tour",
      "tour desde el aeropuerto el dorado",
    ],
  },
]

export const servicePages: ServicePage[] = servicePageData.map(withPriceFaq)

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug)
}
