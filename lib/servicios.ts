import { type ServiceLang, SERVICE_LANGS, serviciosUI, type ServiciosUI } from "./tours-i18n"

export { type ServiceLang, SERVICE_LANGS }

// Campos traducibles de cada servicio de transporte
export interface ServiceContent {
  name: string
  tagline: string
  category: string
  description: string
  features: string[]
}

export interface TransportService {
  id: string
  image: string
  // Si el servicio tiene una pagina de detalle propia (ej. traslado aeropuerto en /tours)
  detailHref?: string
  i18n: Record<ServiceLang, ServiceContent>
}

export const transportServices: TransportService[] = [
  {
    id: "traslado-aeropuerto",
    image: "/images/servicio-aeropuerto.jpg",
    detailHref: "/tours/traslado-aeropuerto",
    i18n: {
      es: {
        name: "Traslado Aeropuerto El Dorado",
        tagline: "Llega y sal de Bogotá sin preocupaciones",
        category: "Aeropuerto",
        description:
          "Transporte privado puerta a puerta entre el Aeropuerto El Dorado y tu hotel, con monitoreo de vuelos en tiempo real y recepción personalizada.",
        features: [
          "Recepción con tu nombre en llegadas",
          "Monitoreo de vuelos en tiempo real",
          "Tarifa fija sin sorpresas",
          "Disponible 24/7 todo el año",
        ],
      },
      en: {
        name: "El Dorado Airport Transfer",
        tagline: "Arrive in and leave Bogotá worry-free",
        category: "Airport",
        description:
          "Door-to-door private transport between El Dorado Airport and your hotel, with real-time flight monitoring and a personalized welcome.",
        features: [
          "Welcome with your name at arrivals",
          "Real-time flight monitoring",
          "Fixed fare with no surprises",
          "Available 24/7 year-round",
        ],
      },
      fr: {
        name: "Transfert Aéroport El Dorado",
        tagline: "Arrivez et repartez de Bogotá sans souci",
        category: "Aéroport",
        description:
          "Transport privé porte-à-porte entre l'aéroport El Dorado et votre hôtel, avec suivi des vols en temps réel et accueil personnalisé.",
        features: [
          "Accueil à votre nom aux arrivées",
          "Suivi des vols en temps réel",
          "Tarif fixe sans surprise",
          "Disponible 24/7 toute l'année",
        ],
      },
      pt: {
        name: "Traslado Aeroporto El Dorado",
        tagline: "Chegue e saia de Bogotá sem preocupações",
        category: "Aeroporto",
        description:
          "Transporte privado porta a porta entre o Aeroporto El Dorado e o seu hotel, com monitoramento de voos em tempo real e recepção personalizada.",
        features: [
          "Recepção com o seu nome nas chegadas",
          "Monitoramento de voos em tempo real",
          "Tarifa fixa sem surpresas",
          "Disponível 24/7 o ano todo",
        ],
      },
    },
  },
  {
    id: "transporte-ejecutivo",
    image: "/images/transporte-ejecutivo.jpg",
    i18n: {
      es: {
        name: "Transporte Ejecutivo",
        tagline: "Movilidad de negocios con chofer privado",
        category: "Ejecutivo",
        description:
          "Vehículos de alta gama con conductor a tu disposición por horas o por día completo, ideales para reuniones, agendas corporativas y visitas de negocios.",
        features: [
          "Conductor profesional bilingüe",
          "Vehículos de alta gama",
          "Servicio por horas o día completo",
          "Wi-Fi y agua a bordo",
        ],
      },
      en: {
        name: "Executive Transport",
        tagline: "Business mobility with a private driver",
        category: "Executive",
        description:
          "High-end vehicles with a driver at your disposal by the hour or full day, ideal for meetings, corporate agendas and business visits.",
        features: [
          "Professional bilingual driver",
          "High-end vehicles",
          "Hourly or full-day service",
          "Wi-Fi and water on board",
        ],
      },
      fr: {
        name: "Transport Exécutif",
        tagline: "Mobilité d'affaires avec chauffeur privé",
        category: "Exécutif",
        description:
          "Véhicules haut de gamme avec chauffeur à votre disposition à l'heure ou à la journée, idéals pour réunions, agendas d'entreprise et visites d'affaires.",
        features: [
          "Chauffeur professionnel bilingue",
          "Véhicules haut de gamme",
          "Service à l'heure ou à la journée",
          "Wi-Fi et eau à bord",
        ],
      },
      pt: {
        name: "Transporte Executivo",
        tagline: "Mobilidade de negócios com motorista privado",
        category: "Executivo",
        description:
          "Veículos de alto padrão com motorista à sua disposição por horas ou por dia inteiro, ideais para reuniões, agendas corporativas e visitas de negócios.",
        features: [
          "Motorista profissional bilíngue",
          "Veículos de alto padrão",
          "Serviço por horas ou dia inteiro",
          "Wi-Fi e água a bordo",
        ],
      },
    },
  },
  {
    id: "eventos-grupos",
    image: "/images/equipo-vans.jpg",
    i18n: {
      es: {
        name: "Transporte para Eventos y Grupos",
        tagline: "Logística de transporte para cada ocasión",
        category: "Eventos",
        description:
          "Vans y flota para bodas, congresos, convenciones y grupos. Coordinamos horarios y rutas para que todos lleguen a tiempo y sin complicaciones.",
        features: [
          "Vans y buses para grupos",
          "Coordinación de horarios y rutas",
          "Conductores dedicados al evento",
          "Cobertura en toda la ciudad",
        ],
      },
      en: {
        name: "Event & Group Transport",
        tagline: "Transport logistics for every occasion",
        category: "Events",
        description:
          "Vans and a full fleet for weddings, congresses, conventions and groups. We coordinate schedules and routes so everyone arrives on time and hassle-free.",
        features: [
          "Vans and buses for groups",
          "Schedule and route coordination",
          "Drivers dedicated to your event",
          "Coverage across the whole city",
        ],
      },
      fr: {
        name: "Transport pour Événements et Groupes",
        tagline: "Logistique de transport pour chaque occasion",
        category: "Événements",
        description:
          "Vans et flotte pour mariages, congrès, conventions et groupes. Nous coordonnons horaires et itinéraires pour que tout le monde arrive à l'heure et sans souci.",
        features: [
          "Vans et bus pour groupes",
          "Coordination des horaires et itinéraires",
          "Chauffeurs dédiés à l'événement",
          "Couverture dans toute la ville",
        ],
      },
      pt: {
        name: "Transporte para Eventos e Grupos",
        tagline: "Logística de transporte para cada ocasião",
        category: "Eventos",
        description:
          "Vans e frota para casamentos, congressos, convenções e grupos. Coordenamos horários e rotas para que todos cheguem a tempo e sem complicações.",
        features: [
          "Vans e ônibus para grupos",
          "Coordenação de horários e rotas",
          "Motoristas dedicados ao evento",
          "Cobertura em toda a cidade",
        ],
      },
    },
  },
  {
    id: "intermunicipal",
    image: "/images/suv-hotel-w.jpg",
    i18n: {
      es: {
        name: "Traslados Intermunicipales",
        tagline: "Viaja cómodo a cualquier destino",
        category: "Intermunicipal",
        description:
          "Transporte privado desde Bogotá hacia otras ciudades y regiones de Colombia, con conductores expertos en carretera y precios cerrados por trayecto.",
        features: [
          "Rutas a cualquier ciudad del país",
          "Conductores expertos en carretera",
          "Vehículos cómodos y seguros",
          "Precios cerrados por trayecto",
        ],
      },
      en: {
        name: "Intercity Transfers",
        tagline: "Travel comfortably to any destination",
        category: "Intercity",
        description:
          "Private transport from Bogotá to other cities and regions of Colombia, with expert road drivers and fixed prices per trip.",
        features: [
          "Routes to any city in the country",
          "Expert road drivers",
          "Comfortable, safe vehicles",
          "Fixed prices per trip",
        ],
      },
      fr: {
        name: "Transferts Interurbains",
        tagline: "Voyagez confortablement vers n'importe quelle destination",
        category: "Interurbain",
        description:
          "Transport privé depuis Bogotá vers d'autres villes et régions de Colombie, avec des chauffeurs experts de la route et des prix fixes par trajet.",
        features: [
          "Itinéraires vers toutes les villes du pays",
          "Chauffeurs experts de la route",
          "Véhicules confortables et sûrs",
          "Prix fixes par trajet",
        ],
      },
      pt: {
        name: "Traslados Intermunicipais",
        tagline: "Viaje confortável para qualquer destino",
        category: "Intermunicipal",
        description:
          "Transporte privado desde Bogotá para outras cidades e regiões da Colômbia, com motoristas experientes na estrada e preços fechados por trajeto.",
        features: [
          "Rotas para qualquer cidade do país",
          "Motoristas experientes na estrada",
          "Veículos confortáveis e seguros",
          "Preços fechados por trajeto",
        ],
      },
    },
  },
]

// Textos de la interfaz de la pagina de servicios (transporte)
export interface ServiciosPageUI {
  eyebrow: string
  heroTitle1: string
  heroTitle2: string
  heroSubtitle: string
  includesLabel: string
  quoteWhatsapp: string
  viewDetails: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  // Reutilizados de serviciosUI
  navServices: string
  navTours: string
  navBlog: string
}

export const serviciosPageUI: Record<ServiceLang, ServiciosPageUI> = {
  es: {
    eyebrow: "NUESTROS SERVICIOS",
    heroTitle1: "Transporte privado",
    heroTitle2: "para cada ocasión.",
    heroSubtitle:
      "Más allá de nuestros tours, movemos a nuestros clientes con la misma calidad: traslados al aeropuerto, transporte ejecutivo, logística para eventos y viajes intermunicipales. Conductores profesionales y vehículos impecables.",
    includesLabel: "Qué incluye",
    quoteWhatsapp: "Cotizar por WhatsApp",
    viewDetails: "Ver detalles",
    ctaTitle: "¿Necesitas un servicio a la medida?",
    ctaSubtitle:
      "Cuéntanos qué necesitas —fechas, número de pasajeros y destino— y te armamos una propuesta de transporte perfecta para tu plan.",
    ctaButton: "Hablar con un asesor",
    navServices: serviciosUI.es.navServices,
    navTours: serviciosUI.es.navTours,
    navBlog: serviciosUI.es.navBlog,
  },
  en: {
    eyebrow: "OUR SERVICES",
    heroTitle1: "Private transport",
    heroTitle2: "for every occasion.",
    heroSubtitle:
      "Beyond our tours, we move our clients with the same quality: airport transfers, executive transport, event logistics and intercity trips. Professional drivers and impeccable vehicles.",
    includesLabel: "What's included",
    quoteWhatsapp: "Get a quote on WhatsApp",
    viewDetails: "View details",
    ctaTitle: "Need a tailor-made service?",
    ctaSubtitle:
      "Tell us what you need —dates, number of passengers and destination— and we'll build the perfect transport proposal for your plan.",
    ctaButton: "Talk to an advisor",
    navServices: serviciosUI.en.navServices,
    navTours: serviciosUI.en.navTours,
    navBlog: serviciosUI.en.navBlog,
  },
  fr: {
    eyebrow: "NOS SERVICES",
    heroTitle1: "Transport privé",
    heroTitle2: "pour chaque occasion.",
    heroSubtitle:
      "Au-delà de nos tours, nous déplaçons nos clients avec la même qualité : transferts aéroport, transport exécutif, logistique d'événements et voyages interurbains. Chauffeurs professionnels et véhicules impeccables.",
    includesLabel: "Ce qui est inclus",
    quoteWhatsapp: "Demander un devis sur WhatsApp",
    viewDetails: "Voir les détails",
    ctaTitle: "Besoin d'un service sur mesure ?",
    ctaSubtitle:
      "Dites-nous ce dont vous avez besoin —dates, nombre de passagers et destination— et nous créerons la proposition de transport parfaite pour votre projet.",
    ctaButton: "Parler à un conseiller",
    navServices: serviciosUI.fr.navServices,
    navTours: serviciosUI.fr.navTours,
    navBlog: serviciosUI.fr.navBlog,
  },
  pt: {
    eyebrow: "NOSSOS SERVIÇOS",
    heroTitle1: "Transporte privado",
    heroTitle2: "para cada ocasião.",
    heroSubtitle:
      "Além dos nossos tours, movemos nossos clientes com a mesma qualidade: traslados ao aeroporto, transporte executivo, logística para eventos e viagens intermunicipais. Motoristas profissionais e veículos impecáveis.",
    includesLabel: "O que inclui",
    quoteWhatsapp: "Cotar pelo WhatsApp",
    viewDetails: "Ver detalhes",
    ctaTitle: "Precisa de um serviço sob medida?",
    ctaSubtitle:
      "Conte para nós o que você precisa —datas, número de passageiros e destino— e montamos a proposta de transporte perfeita para o seu plano.",
    ctaButton: "Falar com um assessor",
    navServices: serviciosUI.pt.navServices,
    navTours: serviciosUI.pt.navTours,
    navBlog: serviciosUI.pt.navBlog,
  },
}

// Mensaje de cotizacion de WhatsApp localizado por servicio
const serviceQuoteMessages: Record<ServiceLang, (name: string) => string> = {
  es: (name) => `Hola BogotourVIP, quiero cotizar el servicio de "${name}". ¿Me ayudan con la informacion y el precio?`,
  en: (name) => `Hi BogotourVIP, I'd like a quote for the "${name}" service. Can you help me with the details and price?`,
  fr: (name) =>
    `Bonjour BogotourVIP, je souhaite un devis pour le service « ${name} ». Pouvez-vous m'aider avec les informations et le prix ?`,
  pt: (name) => `Olá BogotourVIP, quero cotar o serviço de "${name}". Podem me ajudar com as informações e o preço?`,
}

export function serviceQuoteMessage(name: string, lang: ServiceLang): string {
  return serviceQuoteMessages[lang](name)
}
