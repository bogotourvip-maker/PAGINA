import { type Tour, WHATSAPP_NUMBERS, whatsappLinkTo } from "./tours"

export type ServiceLang = "es" | "en" | "fr" | "pt"

export const SERVICE_LANGS: ServiceLang[] = ["es", "en", "fr", "pt"]

// Campos de un tour que se muestran traducidos en la pagina de servicios
export interface LocalizedTourFields {
  name: string
  tagline: string
  category: string
  shortDescription: string
  highlights: string[]
  includes: string[]
  duration: string
  distance: string
}

// Traducciones del CONTENIDO de cada tour (es es la base en lib/tours.ts).
// Solo definimos en / fr / pt; para de / it / zh se usa el espanol como respaldo.
const tourTranslations: Record<string, Partial<Record<ServiceLang, LocalizedTourFields>>> = {
  "city-tour-bogota": {
    en: {
      name: "Bogotá City Tour",
      tagline: "The best of the capital in a single day",
      category: "City",
      shortDescription:
        "A complete tour of Bogotá's must-see sights: the historic center, Plaza de Bolívar, the Gold Museum and the best views of the city.",
      highlights: ["Plaza de Bolívar", "Gold Museum", "La Candelaria", "Monserrate Hill"],
      includes: ["Private transport", "Bilingual guide", "Museum tickets", "Bottle of water"],
      duration: "4-5 hours",
      distance: "Downtown Bogotá",
    },
    fr: {
      name: "City Tour de Bogotá",
      tagline: "Le meilleur de la capitale en une seule journée",
      category: "Ville",
      shortDescription:
        "Une visite complète des lieux incontournables de Bogotá : le centre historique, la Plaza de Bolívar, le Musée de l'Or et les plus belles vues de la ville.",
      highlights: ["Plaza de Bolívar", "Musée de l'Or", "La Candelaria", "Colline de Monserrate"],
      includes: ["Transport privé", "Guide bilingue", "Entrées aux musées", "Bouteille d'eau"],
      duration: "4-5 heures",
      distance: "Centre de Bogotá",
    },
    pt: {
      name: "City Tour Bogotá",
      tagline: "O melhor da capital em um único dia",
      category: "Cidade",
      shortDescription:
        "Um passeio completo pelos lugares imperdíveis de Bogotá: o centro histórico, a Plaza de Bolívar, o Museu do Ouro e as melhores vistas da cidade.",
      highlights: ["Plaza de Bolívar", "Museu do Ouro", "La Candelaria", "Morro de Monserrate"],
      includes: ["Transporte privado", "Guia bilíngue", "Entradas aos museus", "Garrafa de água"],
      duration: "4-5 horas",
      distance: "Centro de Bogotá",
    },
  },
  "la-candelaria": {
    en: {
      name: "La Candelaria & Graffiti Tour",
      tagline: "Art, history and color in the colonial heart",
      category: "Historic Center",
      shortDescription:
        "Walk through Bogotá's oldest neighborhood, discover its world-famous street art and learn the legends of Chorro de Quevedo.",
      highlights: ["Chorro de Quevedo", "Street art", "Plaza del Chorro", "Historic cafés"],
      includes: ["Street-art expert guide", "Walking tour", "Coffee tasting", "Photographs"],
      duration: "3 hours",
      distance: "Downtown Bogotá",
    },
    fr: {
      name: "Tour La Candelaria et Graffiti Tour",
      tagline: "Art, histoire et couleur au cœur colonial",
      category: "Centre historique",
      shortDescription:
        "Parcourez le plus vieux quartier de Bogotá, découvrez son art urbain de renommée mondiale et les légendes du Chorro de Quevedo.",
      highlights: ["Chorro de Quevedo", "Art de rue", "Plaza del Chorro", "Cafés historiques"],
      includes: ["Guide expert en art urbain", "Visite à pied", "Dégustation de café", "Photographies"],
      duration: "3 heures",
      distance: "Centre de Bogotá",
    },
    pt: {
      name: "Tour La Candelaria e Graffiti Tour",
      tagline: "Arte, história e cor no coração colonial",
      category: "Centro histórico",
      shortDescription:
        "Caminhe pelo bairro mais antigo de Bogotá, descubra sua arte urbana de fama mundial e conheça as lendas do Chorro de Quevedo.",
      highlights: ["Chorro de Quevedo", "Arte de rua", "Plaza del Chorro", "Cafés históricos"],
      includes: ["Guia especialista em arte urbana", "Passeio a pé", "Degustação de café", "Fotografias"],
      duration: "3 horas",
      distance: "Centro de Bogotá",
    },
  },
  monserrate: {
    en: {
      name: "Monserrate Tour",
      tagline: "The best panoramic view of Bogotá",
      category: "Viewpoint",
      shortDescription:
        "Climb to 3,152 meters up to the Monserrate sanctuary and take in all of Bogotá stretched out at your feet.",
      highlights: ["Cable car or funicular", "Señor Caído sanctuary", "Panoramic view", "Typical restaurants"],
      includes: ["Round-trip transport", "Accompanying guide", "Ascent ticket", "Dining recommendations"],
      duration: "2-3 hours",
      distance: "5 km from downtown",
    },
    fr: {
      name: "Tour de Monserrate",
      tagline: "La meilleure vue panoramique de Bogotá",
      category: "Belvédère",
      shortDescription:
        "Montez à 3 152 mètres d'altitude jusqu'au sanctuaire de Monserrate et contemplez tout Bogotá à vos pieds.",
      highlights: ["Téléphérique ou funiculaire", "Sanctuaire Señor Caído", "Vue panoramique", "Restaurants typiques"],
      includes: ["Transport aller-retour", "Guide accompagnateur", "Billet de montée", "Recommandations gastronomiques"],
      duration: "2-3 heures",
      distance: "à 5 km du centre",
    },
    pt: {
      name: "Tour Monserrate",
      tagline: "A melhor vista panorâmica de Bogotá",
      category: "Mirante",
      shortDescription:
        "Suba a 3.152 metros de altura até o santuário de Monserrate e contemple toda a Bogotá aos seus pés.",
      highlights: ["Teleférico ou funicular", "Santuário Señor Caído", "Vista panorâmica", "Restaurantes típicos"],
      includes: ["Transporte de ida e volta", "Guia acompanhante", "Ticket de subida", "Recomendações gastronômicas"],
      duration: "2-3 horas",
      distance: "5 km do centro",
    },
  },
  "laguna-de-guatavita": {
    en: {
      name: "Guatavita Lake Tour",
      tagline: "The origin of the El Dorado legend",
      category: "Nature",
      shortDescription:
        "Visit the sacred Muisca lake, birthplace of the El Dorado myth, surrounded by otherworldly Andean landscapes.",
      highlights: ["Sacred Muisca lake", "Eco-trail", "El Dorado legend", "Guatavita town"],
      includes: ["Transport from Bogotá", "Specialized guide", "Park entrance", "Stop in the town"],
      duration: "Full day (6-7 hours)",
      distance: "60 km from Bogotá",
    },
    fr: {
      name: "Tour du Lac de Guatavita",
      tagline: "L'origine de la légende de l'Eldorado",
      category: "Nature",
      shortDescription:
        "Visitez le lac sacré des Muiscas, berceau du mythe de l'Eldorado, entouré de paysages andins hors du commun.",
      highlights: ["Lac sacré Muisca", "Sentier écologique", "Légende de l'Eldorado", "Village de Guatavita"],
      includes: ["Transport depuis Bogotá", "Guide spécialisé", "Entrée du parc", "Arrêt au village"],
      duration: "Journée complète (6-7 heures)",
      distance: "à 60 km de Bogotá",
    },
    pt: {
      name: "Tour Lagoa de Guatavita",
      tagline: "A origem da lenda de El Dorado",
      category: "Natureza",
      shortDescription:
        "Visite a lagoa sagrada dos Muíscas, berço do mito de El Dorado, rodeada de paisagens andinas de outro mundo.",
      highlights: ["Lagoa sagrada Muísca", "Trilha ecológica", "Lenda de El Dorado", "Vila de Guatavita"],
      includes: ["Transporte desde Bogotá", "Guia especializado", "Entrada ao parque", "Parada na vila"],
      duration: "Dia inteiro (6-7 horas)",
      distance: "60 km de Bogotá",
    },
  },
  "catedral-de-sal-zipaquira": {
    en: {
      name: "Zipaquirá Salt Cathedral Tour",
      tagline: "A wonder built underground",
      category: "Culture",
      shortDescription:
        "Descend into a stunning cathedral carved inside a salt mine 180 meters underground, one of Colombia's foremost wonders.",
      highlights: ["Underground cathedral", "Salt-carved Stations of the Cross", "Historic mining", "Zipaquirá town"],
      includes: ["Transport from Bogotá", "Bilingual guide", "Cathedral entrance", "Free time in the town"],
      duration: "Half day (5-6 hours)",
      distance: "49 km from Bogotá",
    },
    fr: {
      name: "Tour de la Cathédrale de Sel de Zipaquirá",
      tagline: "Une merveille construite sous terre",
      category: "Culture",
      shortDescription:
        "Descendez dans une cathédrale impressionnante taillée dans une mine de sel à 180 mètres de profondeur, l'une des premières merveilles de Colombie.",
      highlights: ["Cathédrale souterraine", "Chemin de croix en sel", "Mine historique", "Village de Zipaquirá"],
      includes: ["Transport depuis Bogotá", "Guide bilingue", "Entrée de la cathédrale", "Temps libre dans le village"],
      duration: "Demi-journée (5-6 heures)",
      distance: "à 49 km de Bogotá",
    },
    pt: {
      name: "Tour Catedral de Sal de Zipaquirá",
      tagline: "Uma maravilha construída sob a terra",
      category: "Cultura",
      shortDescription:
        "Desça a uma impressionante catedral esculpida dentro de uma mina de sal a 180 metros de profundidade, uma das primeiras maravilhas da Colômbia.",
      highlights: ["Catedral subterrânea", "Via Crúcis em sal", "Mineração histórica", "Vila de Zipaquirá"],
      includes: ["Transporte desde Bogotá", "Guia bilíngue", "Entrada à catedral", "Tempo livre na vila"],
      duration: "Meio dia (5-6 horas)",
      distance: "49 km de Bogotá",
    },
  },
  "villa-de-leyva": {
    en: {
      name: "Villa de Leyva Tour",
      tagline: "A journey back in time to colonial Colombia",
      category: "Heritage Town",
      shortDescription:
        "Explore one of Colombia's most beautiful towns, with its huge cobblestone square and intact white colonial houses.",
      highlights: ["Colonial Plaza Mayor", "High-altitude vineyards", "Paleontology museums", "Boyacá cuisine"],
      includes: ["Private transport", "Accompanying guide", "Custom itinerary", "Local recommendations"],
      duration: "Full day",
      distance: "160 km from Bogotá",
    },
    fr: {
      name: "Tour de Villa de Leyva",
      tagline: "Un voyage dans le temps vers la Colombie coloniale",
      category: "Village patrimonial",
      shortDescription:
        "Parcourez l'un des plus beaux villages de Colombie, avec son immense place pavée et ses maisons coloniales blanches intactes.",
      highlights: ["Plaza Mayor coloniale", "Vignobles d'altitude", "Musées paléontologiques", "Gastronomie de Boyacá"],
      includes: ["Transport privé", "Guide accompagnateur", "Itinéraire personnalisé", "Recommandations locales"],
      duration: "Journée complète",
      distance: "à 160 km de Bogotá",
    },
    pt: {
      name: "Tour Villa de Leyva",
      tagline: "Uma viagem no tempo à Colômbia colonial",
      category: "Vila Patrimônio",
      shortDescription:
        "Percorra uma das vilas mais belas da Colômbia, com sua enorme praça de pedra e casas brancas coloniais intactas.",
      highlights: ["Plaza Mayor colonial", "Vinhedos de altitude", "Museus paleontológicos", "Gastronomia boyacense"],
      includes: ["Transporte privado", "Guia acompanhante", "Itinerário personalizado", "Recomendações locais"],
      duration: "Dia inteiro",
      distance: "160 km de Bogotá",
    },
  },
  "traslado-aeropuerto": {
    en: {
      name: "El Dorado Airport Transfer",
      tagline: "Arrive in and leave Bogotá worry-free",
      category: "Transport",
      shortDescription:
        "Door-to-door private transport service between El Dorado Airport and your hotel, with professional drivers and flight monitoring.",
      highlights: ["Personalized welcome", "Flight monitoring", "Fixed fare", "Available 24/7"],
      includes: ["Professional driver", "Private vehicle", "Luggage assistance", "Flight tracking"],
      duration: "Depends on destination",
      distance: "El Dorado Airport",
    },
    fr: {
      name: "Transfert Aéroport El Dorado",
      tagline: "Arrivez et repartez de Bogotá sans souci",
      category: "Transport",
      shortDescription:
        "Service de transport privé porte-à-porte entre l'aéroport El Dorado et votre hôtel, avec chauffeurs professionnels et suivi des vols.",
      highlights: ["Accueil personnalisé", "Suivi des vols", "Tarif fixe", "Disponible 24/7"],
      includes: ["Chauffeur professionnel", "Véhicule privé", "Aide aux bagages", "Suivi de vol"],
      duration: "Selon la destination",
      distance: "Aéroport El Dorado",
    },
    pt: {
      name: "Traslado Aeroporto El Dorado",
      tagline: "Chegue e saia de Bogotá sem preocupações",
      category: "Transporte",
      shortDescription:
        "Serviço de transporte privado porta a porta entre o Aeroporto El Dorado e o seu hotel, com motoristas profissionais e monitoramento de voos.",
      highlights: ["Recepção personalizada", "Monitoramento de voos", "Tarifa fixa", "Disponível 24/7"],
      includes: ["Motorista profissional", "Veículo privado", "Ajuda com bagagem", "Acompanhamento de voo"],
      duration: "Conforme o destino",
      distance: "Aeroporto El Dorado",
    },
  },
}

// Devuelve los campos del tour en el idioma pedido (con respaldo al espanol de lib/tours.ts)
export function getLocalizedTour(tour: Tour, lang: ServiceLang): LocalizedTourFields {
  const base: LocalizedTourFields = {
    name: tour.name,
    tagline: tour.tagline,
    category: tour.category,
    shortDescription: tour.shortDescription,
    highlights: tour.highlights,
    includes: tour.includes,
    duration: tour.duration,
    distance: tour.distance,
  }
  if (lang === "es") return base
  return tourTranslations[tour.slug]?.[lang] ?? base
}

// Mensaje de cotizacion de WhatsApp localizado por idioma
const quoteMessages: Record<ServiceLang, (name: string) => string> = {
  es: (name) => `Hola BogotourVIP, quiero cotizar tu servicio de "${name}". ¿Me ayudan con la informacion y el precio?`,
  en: (name) => `Hi BogotourVIP, I'd like a quote for your "${name}" service. Can you help me with the details and price?`,
  fr: (name) =>
    `Bonjour BogotourVIP, je souhaite un devis pour votre service « ${name} ». Pouvez-vous m'aider avec les informations et le prix ?`,
  pt: (name) => `Olá BogotourVIP, quero cotar o seu serviço de "${name}". Podem me ajudar com as informações e o preço?`,
}

export function localizedWhatsappLink(name: string, lang: ServiceLang): string {
  return whatsappLinkTo(WHATSAPP_NUMBERS[0], quoteMessages[lang](name))
}

// Textos de la interfaz de la pagina de servicios
export interface ServiciosUI {
  navServices: string
  navTours: string
  navBlog: string
  eyebrow: string
  heroTitle1: string
  heroTitle2: string
  heroSubtitle: string
  inBogotaTitle: string
  inBogotaSubtitle: string
  aroundTitle: string
  aroundSubtitle: string
  whatYouVisit: string
  includes: string
  quoteWhatsapp: string
  viewDetails: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
}

export const serviciosUI: Record<ServiceLang, ServiciosUI> = {
  es: {
    navServices: "Servicios",
    navTours: "Tours",
    navBlog: "Blog",
    eyebrow: "NUESTROS SERVICIOS",
    heroTitle1: "Tours en Bogotá",
    heroTitle2: "y sus alrededores, en detalle.",
    heroSubtitle:
      "Cada experiencia está diseñada por expertos locales. Aquí encontrarás todo lo que incluye cada tour: qué visitarás, cuánto dura, el recorrido y cómo reservarlo. Transporte privado y guías bilingües en todos nuestros servicios.",
    inBogotaTitle: "En Bogotá",
    inBogotaSubtitle: "Experiencias dentro de la capital",
    aroundTitle: "Alrededores de Bogotá",
    aroundSubtitle: "Excursiones de día a la sabana y Boyacá",
    whatYouVisit: "Qué visitarás",
    includes: "Incluye",
    quoteWhatsapp: "Cotizar por WhatsApp",
    viewDetails: "Ver detalles completos",
    ctaTitle: "¿No encuentras el plan que buscas?",
    ctaSubtitle:
      "Diseñamos itinerarios a la medida según tus fechas, intereses y presupuesto. Escríbenos y armamos tu experiencia perfecta en Colombia.",
    ctaButton: "Hablar con un asesor",
  },
  en: {
    navServices: "Services",
    navTours: "Tours",
    navBlog: "Blog",
    eyebrow: "OUR SERVICES",
    heroTitle1: "Tours in Bogotá",
    heroTitle2: "and its surroundings, in detail.",
    heroSubtitle:
      "Every experience is designed by local experts. Here you'll find everything each tour includes: what you'll visit, how long it lasts, the route and how to book it. Private transport and bilingual guides on all our services.",
    inBogotaTitle: "In Bogotá",
    inBogotaSubtitle: "Experiences within the capital",
    aroundTitle: "Around Bogotá",
    aroundSubtitle: "Day trips to the savanna and Boyacá",
    whatYouVisit: "What you'll visit",
    includes: "Includes",
    quoteWhatsapp: "Get a quote on WhatsApp",
    viewDetails: "View full details",
    ctaTitle: "Can't find the plan you're looking for?",
    ctaSubtitle:
      "We design tailor-made itineraries based on your dates, interests and budget. Message us and we'll build your perfect experience in Colombia.",
    ctaButton: "Talk to an advisor",
  },
  fr: {
    navServices: "Services",
    navTours: "Tours",
    navBlog: "Blog",
    eyebrow: "NOS SERVICES",
    heroTitle1: "Tours à Bogotá",
    heroTitle2: "et ses environs, en détail.",
    heroSubtitle:
      "Chaque expérience est conçue par des experts locaux. Vous trouverez ici tout ce que comprend chaque tour : ce que vous visiterez, sa durée, l'itinéraire et comment le réserver. Transport privé et guides bilingues sur tous nos services.",
    inBogotaTitle: "À Bogotá",
    inBogotaSubtitle: "Expériences au cœur de la capitale",
    aroundTitle: "Les environs de Bogotá",
    aroundSubtitle: "Excursions d'une journée vers la savane et Boyacá",
    whatYouVisit: "Ce que vous visiterez",
    includes: "Comprend",
    quoteWhatsapp: "Demander un devis sur WhatsApp",
    viewDetails: "Voir tous les détails",
    ctaTitle: "Vous ne trouvez pas le programme que vous cherchez ?",
    ctaSubtitle:
      "Nous concevons des itinéraires sur mesure selon vos dates, vos intérêts et votre budget. Écrivez-nous et nous créerons votre expérience parfaite en Colombie.",
    ctaButton: "Parler à un conseiller",
  },
  pt: {
    navServices: "Serviços",
    navTours: "Tours",
    navBlog: "Blog",
    eyebrow: "NOSSOS SERVIÇOS",
    heroTitle1: "Tours em Bogotá",
    heroTitle2: "e seus arredores, em detalhe.",
    heroSubtitle:
      "Cada experiência é desenhada por especialistas locais. Aqui você encontrará tudo o que cada tour inclui: o que vai visitar, quanto dura, o percurso e como reservá-lo. Transporte privado e guias bilíngues em todos os nossos serviços.",
    inBogotaTitle: "Em Bogotá",
    inBogotaSubtitle: "Experiências dentro da capital",
    aroundTitle: "Arredores de Bogotá",
    aroundSubtitle: "Excursões de um dia à savana e a Boyacá",
    whatYouVisit: "O que você vai visitar",
    includes: "Inclui",
    quoteWhatsapp: "Cotar pelo WhatsApp",
    viewDetails: "Ver detalhes completos",
    ctaTitle: "Não encontra o plano que procura?",
    ctaSubtitle:
      "Desenhamos itinerários sob medida de acordo com suas datas, interesses e orçamento. Escreva para nós e montamos a sua experiência perfeita na Colômbia.",
    ctaButton: "Falar com um assessor",
  },
}
