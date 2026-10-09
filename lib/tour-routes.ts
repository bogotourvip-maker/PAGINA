// Tours whose Spanish landing page lives under /servicios. The /tours/<slug> copy
// points its canonical here so both URLs don't compete for the same search.
export const tourToServicio: Record<string, string> = {
  "catedral-de-sal-zipaquira": "catedral-de-sal",
  "laguna-de-guatavita": "guatavita",
  "villa-de-leyva": "villa-de-leyva",
}

export function tourHref(slug: string): string {
  const servicio = tourToServicio[slug]
  return servicio ? `/servicios/${servicio}` : `/tours/${slug}`
}

export function enTourForServicio(servicioSlug: string): string | undefined {
  return Object.keys(tourToServicio).find((tour) => tourToServicio[tour] === servicioSlug)
}
