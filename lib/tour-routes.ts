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
