export interface Tour {
  slug: string
  name: string
  tagline: string
  category: string
  heroImage: string
  gallery: string[]
  shortDescription: string
  longDescription: string[]
  highlights: string[]
  includes: string[]
  duration: string
  distance: string
  priceFrom: string
  rating: number
  reviews: number
  metaTitle: string
  metaDescription: string
  keywords: string[]
  // Sitios que visita el tour, con su calificación real en Google Maps
  googlePlaces?: GooglePlace[]
}

// Calificación de un sitio turístico según Google Maps
export interface GooglePlace {
  name: string
  rating: number
  reviews: number
}

// Numeros de WhatsApp de los asesores de BogotourVIP (todos los mensajes salen hacia estos)
export const WHATSAPP_NUMBERS = ["573108677635", "573106998224"]
export const WHATSAPP_NUMBER = WHATSAPP_NUMBERS[0]

// Mensaje estandar de cotizacion que se envia a los asesores
export const QUOTE_MESSAGE =
  "Hola BogotourVIP, quiero cotizar tu servicio. ¿Me pueden ayudar con la informacion y el precio?"

// Construye un enlace de WhatsApp hacia un numero con un mensaje de cotizacion
export function whatsappLinkTo(number: string, message: string = QUOTE_MESSAGE): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_LINK = whatsappLinkTo(WHATSAPP_NUMBERS[0])
export const WHATSAPP_LINK_2 = whatsappLinkTo(WHATSAPP_NUMBERS[1])

export function whatsappLinkFor(tourName: string): string {
  return whatsappLinkTo(
    WHATSAPP_NUMBERS[0],
    `Hola BogotourVIP, quiero cotizar tu servicio de "${tourName}". ¿Me ayudan con la informacion y el precio?`,
  )
}

export const tours: Tour[] = [
  {
    slug: "city-tour-bogota",
    name: "City Tour Bogotá",
    tagline: "Lo mejor de la capital en un solo día",
    category: "Ciudad",
    heroImage: "/images/bogota-skyline-panorama.webp",
    gallery: [
      "/images/plaza-bolivar-catedral.jpg",
      "/images/la-candelaria-grafitis.jpg",
      "/images/img-0705.jpeg",
    ],
    shortDescription:
      "Un recorrido completo por los lugares imperdibles de Bogotá: el centro histórico, la Plaza de Bolívar, el Museo del Oro y las mejores vistas de la ciudad.",
    longDescription: [
      "El City Tour por Bogotá es la mejor forma de entender una ciudad que sorprende a cada esquina. En un solo día recorrerás más de cinco siglos de historia, desde las calles empedradas de La Candelaria hasta los rascacielos del centro financiero, con un guía local que conoce las historias que no salen en las guías.",
      "Comenzamos en la Plaza de Bolívar, rodeada por la Catedral Primada, el Capitolio Nacional y el Palacio de Justicia. Desde allí caminamos por el barrio colonial, admirando el arte callejero que ha hecho famosa a Bogotá en todo el mundo, y visitamos el Museo del Oro, hogar de la colección de orfebrería prehispánica más grande del planeta.",
      "Todo el recorrido se hace a tu ritmo, con transporte privado con aire acondicionado entre cada punto y paradas para probar la gastronomía local. Es el tour ideal para quienes llegan por primera vez a la ciudad y quieren llevarse una visión completa en pocas horas.",
    ],
    highlights: ["Plaza de Bolívar", "Museo del Oro", "La Candelaria", "Cerro de Monserrate"],
    includes: ["Transporte privado", "Guía bilingüe", "Entradas a museos", "Botella de agua"],
    duration: "4-5 horas",
    distance: "Centro de Bogotá",
    priceFrom: "Consultar",
    rating: 4.9,
    reviews: 214,
    metaTitle: "City Tour Bogotá | Tour privado por el centro histórico",
    metaDescription:
      "Descubre lo mejor de Bogotá en un City Tour privado: Plaza de Bolívar, Museo del Oro, La Candelaria y Monserrate con guía bilingüe. Reserva por WhatsApp.",
    keywords: ["city tour bogotá", "tour privado bogotá", "qué hacer en bogotá", "bogota city tour"],
    googlePlaces: [
      { name: "Plaza de Bolívar", rating: 4.6, reviews: 48210 },
      { name: "Museo del Oro", rating: 4.6, reviews: 43180 },
      { name: "La Candelaria", rating: 4.5, reviews: 21340 },
      { name: "Cerro de Monserrate", rating: 4.7, reviews: 61250 },
    ],
  },
  {
    slug: "la-candelaria",
    name: "Tour La Candelaria y Graffiti Tour",
    tagline: "Arte, historia y color en el corazón colonial",
    category: "Centro Histórico",
    heroImage: "/images/la-candelaria-grafitis.jpg",
    gallery: [
      "/images/la-candelaria-colorful.png",
      "/images/plaza-bolivar-catedral.jpg",
      "/images/img-0743.jpeg",
    ],
    shortDescription:
      "Camina por el barrio más antiguo de Bogotá, descubre su arte urbano de fama mundial y conoce las leyendas del Chorro de Quevedo.",
    longDescription: [
      "La Candelaria es el alma de Bogotá: un laberinto de calles coloniales, casas de colores, plazas escondidas y muros convertidos en galerías de arte al aire libre. Este tour combina la historia de la fundación de la ciudad con la energía creativa que hoy la define.",
      "Recorrerás el Chorro de Quevedo, el lugar donde según la tradición nació Bogotá en 1538, y escucharás las leyendas que aún se cuentan entre sus paredes. Nuestro guía te explicará el significado del arte callejero, una de las escenas de grafiti más respetadas de América Latina, y las historias de los artistas detrás de cada mural.",
      "Entre callejones, cafés bohemios y talleres de artesanos, entenderás por qué La Candelaria es Patrimonio y el punto de partida perfecto para enamorarse de la capital colombiana.",
    ],
    highlights: ["Chorro de Quevedo", "Arte callejero", "Plaza del Chorro", "Cafés históricos"],
    includes: ["Guía experto en arte urbano", "Recorrido a pie", "Degustación de café", "Fotografías"],
    duration: "3 horas",
    distance: "Centro de Bogotá",
    priceFrom: "Consultar",
    rating: 4.9,
    reviews: 168,
    metaTitle: "Tour La Candelaria y Graffiti Tour Bogotá",
    metaDescription:
      "Explora La Candelaria, el centro histórico de Bogotá, y su famoso arte callejero con un guía local. Graffiti tour, Chorro de Quevedo y cafés históricos.",
    keywords: ["tour la candelaria", "graffiti tour bogota", "centro historico bogotá", "arte callejero bogotá"],
    googlePlaces: [
      { name: "Chorro de Quevedo", rating: 4.3, reviews: 9820 },
      { name: "La Candelaria", rating: 4.5, reviews: 21340 },
      { name: "Plaza de Bolívar", rating: 4.6, reviews: 48210 },
    ],
  },
  {
    slug: "monserrate",
    name: "Tour Monserrate",
    tagline: "La mejor vista panorámica de Bogotá",
    category: "Mirador",
    heroImage: "/images/imagen-20jpeg-286-29.jpeg",
    gallery: [
      "/images/tour-mirador-selfie.jpg",
      "/images/img-3590.jpeg",
      "/images/bogota-skyline.jpg",
    ],
    shortDescription:
      "Sube a 3.152 metros de altura hasta el santuario de Monserrate y contempla toda Bogotá extendida a tus pies.",
    longDescription: [
      "Monserrate es el símbolo que corona Bogotá. A 3.152 metros sobre el nivel del mar, este cerro ofrece la vista más impresionante de la ciudad y es, al mismo tiempo, uno de los santuarios religiosos más visitados de Colombia.",
      "Puedes subir en teleférico, en funicular o, si buscas una experiencia más activa, por el sendero peatonal que durante siglos han recorrido los peregrinos. Una vez arriba, además de las vistas, encontrarás el santuario del Señor Caído, jardines, mercados de artesanías y restaurantes con cocina típica santafereña.",
      "Es un plan perfecto para el atardecer, cuando la ciudad comienza a encender sus luces y el horizonte de la sabana de Bogotá se tiñe de dorado. Nuestro servicio incluye el transporte desde tu hotel y la coordinación de los tiquetes para que solo te preocupes por disfrutar.",
    ],
    highlights: ["Teleférico o funicular", "Santuario Señor Caído", "Vista panorámica", "Restaurantes típicos"],
    includes: ["Transporte ida y vuelta", "Guía acompañante", "Tiquete de ascenso", "Recomendaciones gastronómicas"],
    duration: "2-3 horas",
    distance: "5 km del centro",
    priceFrom: "Consultar",
    rating: 4.8,
    reviews: 192,
    metaTitle: "Tour Monserrate Bogotá | Teleférico y vista panorámica",
    metaDescription:
      "Sube al Cerro de Monserrate y disfruta la mejor vista de Bogotá. Transporte, teleférico y guía incluidos. Reserva tu tour a Monserrate por WhatsApp.",
    keywords: ["tour monserrate", "monserrate tour", "cerro monserrate", "vista panoramica bogotá"],
    googlePlaces: [
      { name: "Santuario de Monserrate", rating: 4.7, reviews: 61250 },
      { name: "Mirador de Monserrate", rating: 4.7, reviews: 18730 },
    ],
  },
  {
    slug: "laguna-de-guatavita",
    name: "Tour Laguna de Guatavita",
    tagline: "El origen de la leyenda de El Dorado",
    category: "Naturaleza",
    heroImage: "/images/guatavita.jpg",
    gallery: [
      "/images/img-1156.jpeg",
      "/images/img-4349.jpeg",
      "/images/img-3590.jpeg",
    ],
    shortDescription:
      "Visita la laguna sagrada de los Muiscas, cuna del mito de El Dorado, rodeada de paisajes andinos de otro mundo.",
    longDescription: [
      "A poco más de una hora de Bogotá se esconde uno de los lugares más mágicos de Colombia: la Laguna de Guatavita. Para el pueblo Muisca era un espacio sagrado, y fue aquí donde nació la leyenda de El Dorado que durante siglos obsesionó a los conquistadores europeos.",
      "El recorrido incluye una caminata guiada por un sendero ecológico, entre bosques de niebla y miradores naturales, hasta llegar al borde de la laguna. Allí, nuestro guía te contará los rituales de los caciques Muiscas, que cubrían su cuerpo en polvo de oro antes de sumergirse en estas aguas, y la fascinante historia de los intentos por drenar la laguna en busca del tesoro.",
      "Es una escapada ideal para conectar con la naturaleza y la espiritualidad ancestral de los Andes, con transporte cómodo desde Bogotá y tiempo para disfrutar del pueblo colonial de Guatavita a la orilla del embalse.",
    ],
    highlights: ["Laguna sagrada Muisca", "Sendero ecológico", "Leyenda de El Dorado", "Pueblo de Guatavita"],
    includes: ["Transporte desde Bogotá", "Guía especializado", "Entrada al parque", "Parada en el pueblo"],
    duration: "Día completo (6-7 horas)",
    distance: "60 km de Bogotá",
    priceFrom: "Consultar",
    rating: 4.7,
    reviews: 143,
    metaTitle: "Tour Laguna de Guatavita | Excursión desde Bogotá",
    metaDescription:
      "Excursión a la Laguna de Guatavita desde Bogotá, cuna de la leyenda de El Dorado. Sendero ecológico, historia Muisca y transporte incluido.",
    keywords: ["tour laguna de guatavita", "guatavita lake tour", "el dorado colombia", "excursiones desde bogotá"],
    googlePlaces: [
      { name: "Laguna de Guatavita", rating: 4.6, reviews: 16040 },
      { name: "Pueblo de Guatavita", rating: 4.5, reviews: 12210 },
    ],
  },
  {
    slug: "catedral-de-sal-zipaquira",
    name: "Tour Catedral de Sal de Zipaquirá",
    tagline: "Una maravilla construida bajo tierra",
    category: "Cultura",
    heroImage: "/images/plaza-bolivar-monserrate.jpg",
    gallery: [
      "/images/villa-de-leyva.png",
      "/images/img-1156.jpeg",
      "/images/bogota-skyline.jpg",
    ],
    shortDescription:
      "Desciende a una impresionante catedral tallada dentro de una mina de sal a 180 metros de profundidad, una de las primeras maravillas de Colombia.",
    longDescription: [
      "La Catedral de Sal de Zipaquirá es considerada la primera maravilla de Colombia, y basta con entrar para entender por qué. Se trata de un templo católico completo, tallado a 180 metros bajo tierra dentro de las galerías de una antigua mina de sal, iluminado con juegos de luz que dejan sin aliento.",
      "El recorrido comienza en el Vía Crucis, catorce estaciones esculpidas en la roca de sal, y culmina en la nave central con su imponente cruz iluminada, una de las más grandes del mundo tallada en este material. Es una experiencia entre lo espiritual, lo artístico y lo geológico que no tiene comparación.",
      "Combinamos la visita con un paseo por el encantador pueblo de Zipaquirá, de arquitectura colonial y ambiente tranquilo. Salimos desde Bogotá con transporte privado, por lo que es una excursión de medio día perfecta para toda la familia.",
    ],
    highlights: ["Catedral subterránea", "Vía Crucis en sal", "Minería histórica", "Pueblo de Zipaquirá"],
    includes: ["Transporte desde Bogotá", "Guía bilingüe", "Entrada a la catedral", "Tiempo libre en el pueblo"],
    duration: "Medio día (5-6 horas)",
    distance: "49 km de Bogotá",
    priceFrom: "Consultar",
    rating: 4.8,
    reviews: 176,
    metaTitle: "Tour Catedral de Sal de Zipaquirá desde Bogotá",
    metaDescription:
      "Visita la Catedral de Sal de Zipaquirá, primera maravilla de Colombia, en una excursión desde Bogotá con transporte y guía. Reserva por WhatsApp.",
    keywords: [
      "tour catedral de sal zipaquirá",
      "salt cathedral zipaquira tour",
      "zipaquirá desde bogotá",
      "excursiones desde bogotá",
    ],
    googlePlaces: [
      { name: "Catedral de Sal de Zipaquirá", rating: 4.6, reviews: 92480 },
      { name: "Centro histórico de Zipaquirá", rating: 4.5, reviews: 8060 },
    ],
  },
  {
    slug: "villa-de-leyva",
    name: "Tour Villa de Leyva",
    tagline: "Viaje en el tiempo a la Colombia colonial",
    category: "Pueblo Patrimonio",
    heroImage: "/images/villa-de-leyva.png",
    gallery: [
      "/images/img-1156.jpeg",
      "/images/guatavita.jpg",
      "/images/img-4349.jpeg",
    ],
    shortDescription:
      "Recorre uno de los pueblos más bellos de Colombia, con su enorme plaza empedrada y casas blancas coloniales intactas.",
    longDescription: [
      "Villa de Leyva parece detenida en el siglo XVI. Declarada Monumento Nacional, este pueblo conserva una de las plazas más grandes de América, empedrada y rodeada de casas coloniales de fachadas blancas que le dan un encanto único en toda Colombia.",
      "Además de su belleza arquitectónica, la región sorprende por sus atractivos cercanos: fósiles de millones de años, viñedos que producen vino de altura, el desierto de La Candelaria y talleres de cerámica tradicional. Es un destino que combina historia, naturaleza y gastronomía en un mismo viaje.",
      "Por su distancia, lo ofrecemos como una excursión de día completo o con opción de alojamiento, siempre con transporte privado y cómodo desde Bogotá y un guía que te ayudará a aprovechar cada rincón de este tesoro boyacense.",
    ],
    highlights: ["Plaza Mayor colonial", "Viñedos de altura", "Museos paleontológicos", "Gastronomía boyacense"],
    includes: ["Transporte privado", "Guía acompañante", "Itinerario personalizado", "Recomendaciones locales"],
    duration: "Día completo",
    distance: "160 km de Bogotá",
    priceFrom: "Consultar",
    rating: 4.9,
    reviews: 121,
    metaTitle: "Tour Villa de Leyva | Excursión colonial desde Bogotá",
    metaDescription:
      "Descubre Villa de Leyva, uno de los pueblos más bonitos de Colombia, en una excursión desde Bogotá con transporte privado y guía. Plaza colonial y viñedos.",
    keywords: ["tour villa de leyva", "villa de leyva desde bogotá", "pueblos patrimonio colombia", "excursiones desde bogotá"],
    googlePlaces: [
      { name: "Plaza Mayor de Villa de Leyva", rating: 4.7, reviews: 33120 },
      { name: "Villa de Leyva", rating: 4.7, reviews: 19450 },
    ],
  },
  {
    slug: "traslado-aeropuerto",
    name: "Traslado Aeropuerto El Dorado",
    tagline: "Llega y sal de Bogotá sin preocupaciones",
    category: "Transporte",
    heroImage: "/images/servicio-aeropuerto.jpg",
    gallery: [
      "/images/suv-hotel-w.jpg",
      "/images/transporte-ejecutivo.jpg",
      "/images/img-3038.jpeg",
    ],
    shortDescription:
      "Servicio de transporte privado puerta a puerta entre el Aeropuerto El Dorado y tu hotel, con conductores profesionales y monitoreo de vuelos.",
    longDescription: [
      "Nada mejor que llegar a una ciudad nueva y encontrar a alguien esperándote con tu nombre. Nuestro servicio de traslado desde y hacia el Aeropuerto Internacional El Dorado te garantiza un inicio y un cierre de viaje sin estrés, con vehículos cómodos y conductores profesionales.",
      "Monitoreamos tu vuelo en tiempo real, así que si hay retrasos o adelantos, tu conductor estará allí de todas formas. Te recibimos en la zona de llegadas, te ayudamos con el equipaje y te llevamos directamente a tu hotel o destino, con la seguridad de un servicio privado y tarifas fijas sin sorpresas.",
      "Es la opción preferida por viajeros de negocios y familias que valoran su tiempo y su tranquilidad, disponible las 24 horas, todos los días del año.",
    ],
    highlights: ["Recepción personalizada", "Monitoreo de vuelos", "Tarifa fija", "Disponible 24/7"],
    includes: ["Conductor profesional", "Vehículo privado", "Ayuda con equipaje", "Seguimiento de vuelo"],
    duration: "Según destino",
    distance: "Aeropuerto El Dorado",
    priceFrom: "Consultar",
    rating: 4.9,
    reviews: 238,
    metaTitle: "Traslado Aeropuerto El Dorado Bogotá | Transporte privado",
    metaDescription:
      "Traslado privado desde y hacia el Aeropuerto El Dorado de Bogotá. Conductores profesionales, monitoreo de vuelos y tarifa fija. Reserva por WhatsApp.",
    keywords: ["traslado aeropuerto bogotá", "bogota airport transfer", "transporte aeropuerto el dorado", "transporte privado bogotá"],
  },
]

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug)
}
