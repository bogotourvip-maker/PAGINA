// /tours/<slug> is the main URL for these destinations; the matching /servicios page
// stays online but points its canonical to the tour so both don't compete in Google.
export const servicioToTour: Record<string, string> = {
  "catedral-de-sal": "catedral-de-sal-zipaquira",
  guatavita: "laguna-de-guatavita",
  "villa-de-leyva": "villa-de-leyva",
}

// The airport transfer is the opposite case: /servicios is the main URL.
export const tourToServicio: Record<string, string> = {
  "traslado-aeropuerto": "traslado-aeropuerto-el-dorado",
}

// English keyword slugs for /en/tours/<slug>, keyed by the Spanish tour slug.
export const enTourSlugs: Record<string, string> = {
  "bogota-city-tour-vip": "bogota-private-city-tour",
  "la-candelaria": "la-candelaria-walking-tour",
  monserrate: "monserrate-tour",
  "laguna-de-guatavita": "guatavita-lagoon-tour",
  "catedral-de-sal-zipaquira": "zipaquira-salt-cathedral-tour",
  "villa-de-leyva": "villa-de-leyva-tour",
  "parque-jaime-duque": "jaime-duque-park-tour",
  "traslado-aeropuerto": "el-dorado-airport-transfer",
}

export function enTourHref(slug: string): string {
  return `/en/tours/${enTourSlugs[slug] ?? slug}`
}

export function tourSlugFromEn(enSlug: string): string {
  return Object.keys(enTourSlugs).find((slug) => enTourSlugs[slug] === enSlug) ?? enSlug
}

export function tourHref(slug: string): string {
  const servicio = tourToServicio[slug]
  return servicio ? `/servicios/${servicio}` : `/tours/${slug}`
}

export function servicioCanonicalPath(servicioSlug: string): string {
  const tour = servicioToTour[servicioSlug]
  return tour ? `/tours/${tour}` : `/servicios/${servicioSlug}`
}

export function enTourForServicio(servicioSlug: string): string | undefined {
  return (
    servicioToTour[servicioSlug] ??
    Object.keys(tourToServicio).find((tour) => tourToServicio[tour] === servicioSlug)
  )
}

export const nonCanonicalServicios = new Set([
  ...Object.keys(servicioToTour),
  ...Object.values(tourToServicio),
])
