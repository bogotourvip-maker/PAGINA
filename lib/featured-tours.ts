export type SiteLang = "es" | "en"

export interface FeaturedTour {
  id: string
  href: string
  enHref: string
  image: string
  name: Record<SiteLang, string>
  tagline: Record<SiteLang, string>
}

export const SITE_WHATSAPP_LINK =
  "https://wa.me/573108677635?text=Hola%20BogotourVIP%2C%20quiero%20cotizar%20tu%20servicio.%20%C2%BFMe%20pueden%20ayudar%20con%20la%20informacion%20y%20el%20precio%3F"

export const FEATURED_TOURS: FeaturedTour[] = [
  {
    id: "zipaquira",
    href: "/tours/catedral-de-sal-zipaquira",
    enHref: "/en/tours/catedral-de-sal-zipaquira",
    image: "/images/catedral-sal-cruz-iluminada.png",
    name: { es: "Tour Zipaquirá", en: "Salt Cathedral Tour" },
    tagline: { es: "Una catedral tallada a 180 m bajo tierra", en: "A cathedral carved 180 m underground" },
  },
  {
    id: "monserrate",
    href: "/tours/monserrate",
    enHref: "/en/tours/monserrate",
    image: "/images/monserrate-luna-atardecer.jpg",
    name: { es: "Tour Monserrate", en: "Monserrate Tour" },
    tagline: { es: "Bogotá a tus pies desde 3.152 m", en: "Bogotá at your feet from 3,152 m" },
  },
  {
    id: "guatavita",
    href: "/tours/laguna-de-guatavita",
    enHref: "/en/tours/laguna-de-guatavita",
    image: "/images/guatavita-amigos-laguna.jpg",
    name: { es: "Tour Guatavita", en: "Guatavita Tour" },
    tagline: { es: "La laguna de la leyenda de El Dorado", en: "The lake behind the El Dorado legend" },
  },
  {
    id: "villa-de-leyva",
    href: "/tours/villa-de-leyva",
    enHref: "/en/tours/villa-de-leyva",
    image: "/images/villa-de-leyva.png",
    name: { es: "Tour Villa de Leyva", en: "Villa de Leyva Tour" },
    tagline: { es: "Pueblo colonial y su gran plaza empedrada", en: "Colonial town with a huge cobbled square" },
  },
  {
    id: "jaime-duque",
    href: "/tours/parque-jaime-duque",
    enHref: "/en/tours/parque-jaime-duque",
    image: "/images/jaime-duque-taj-mahal.jpg",
    name: { es: "Tour Jaime Duque", en: "Jaime Duque Tour" },
    tagline: { es: "Diversión en familia con transporte incluido", en: "Family fun with round-trip transport" },
  },
]

export const EXTRA_SERVICES = [
  {
    href: "/servicios/traslado-aeropuerto-el-dorado",
    name: { es: "Traslado Aeropuerto El Dorado", en: "El Dorado Airport Transfer" },
  },
  {
    href: "/servicios/layover-tour-bogota",
    name: { es: "Layover Tour Bogotá Express", en: "Bogotá Layover Express Tour" },
  },
  { href: "/servicios", name: { es: "Todos los servicios", en: "All services" } },
]

export function toSiteLang(language: string): SiteLang {
  return language === "es" ? "es" : "en"
}

export function tourLink(tour: { href: string; enHref: string }, language: string) {
  return language === "en" ? tour.enHref : tour.href
}
