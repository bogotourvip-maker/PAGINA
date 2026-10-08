import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Clock } from "lucide-react"
import type { ServicePage } from "@/lib/service-pages"
import { ToursNav } from "@/components/tours-nav"
import { TourHeroCta, TourFinalCta, TourMobileBookingBar } from "@/components/tour-booking"

function ServiceHero({ page, whatsappLink }: { page: ServicePage; whatsappLink: string }) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden">
      <Image src={page.heroImage} alt={page.title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 sm:pb-16">
        <nav aria-label="Ruta de navegación" className="mb-5 flex items-center gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/servicios" className="hover:text-white">Servicios</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white/90">{page.title}</span>
        </nav>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">{page.eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white text-balance sm:text-5xl md:text-6xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75 text-pretty">{page.tagline}</p>
        <TourHeroCta whatsappLink={whatsappLink} />
      </div>
    </section>
  )
}

function ServiceFacts({ facts }: { facts: ServicePage["facts"] }) {
  return (
    <section className="border-y border-white/10 bg-black">
      <dl className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-wider text-white/40">{fact.label}</dt>
            <dd className="text-lg font-semibold text-white">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function ServiceIntro({ page }: { page: ServicePage }) {
  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <h2 className="text-2xl font-bold text-white text-balance sm:text-3xl">Sobre este servicio</h2>
          {page.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="leading-relaxed text-white/65 text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
        <aside className="flex h-fit flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold text-white">Qué incluye</h2>
          <ul className="flex flex-col gap-3">
            {page.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

function ServiceOfferings({ page }: { page: ServicePage }) {
  const single = page.offerings.length === 1
  return (
    <section className="bg-gray-900 py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-white text-balance sm:text-3xl">
          {single ? "La experiencia" : "Lo que puedes reservar"}
        </h2>
        <div className={`grid gap-6 ${single ? "" : "md:grid-cols-2"}`}>
          {page.offerings.map((offer) => (
            <article
              key={offer.name}
              className={`flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black ${
                single ? "md:flex-row" : ""
              }`}
            >
              <div className={`relative h-56 ${single ? "md:h-auto md:w-1/2" : ""}`}>
                <Image
                  src={offer.image}
                  alt={offer.name}
                  fill
                  sizes={single ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 50vw"}
                  className="object-cover"
                />
              </div>
              <div className={`flex flex-1 flex-col gap-4 p-6 sm:p-8 ${single ? "md:w-1/2" : ""}`}>
                <h3 className="text-xl font-bold text-white text-balance">{offer.name}</h3>
                <p className="flex items-center gap-2 text-sm text-[#d4af37]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {offer.duration}
                </p>
                <p className="leading-relaxed text-white/65 text-pretty">{offer.description}</p>
                <ul className="flex flex-wrap gap-2">
                  {offer.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                {offer.href && (
                  <Link
                    href={offer.href}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-[#d4af37]"
                  >
                    Ver itinerario completo
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceGallery({ gallery }: { gallery: ServicePage["gallery"] }) {
  return (
    <section className="bg-gray-900 pb-16 sm:pb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6">
        {gallery.map((photo) => (
          <div key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}

function ServiceFaq({ faq }: { faq: ServicePage["faq"] }) {
  if (faq.length === 0) return null
  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-white text-balance sm:text-3xl">Preguntas frecuentes</h2>
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white">
                {item.q}
                <span className="text-[#d4af37] transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-white/65">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicePageView({ page, whatsappLink }: { page: ServicePage; whatsappLink: string }) {
  return (
    <main className="min-h-screen bg-black pb-20 lg:pb-0">
      <ToursNav lang="es" esHref={`/servicios/${page.slug}`} enHref={page.enHref} />
      <ServiceHero page={page} whatsappLink={whatsappLink} />
      <ServiceFacts facts={page.facts} />
      <ServiceIntro page={page} />
      <ServiceOfferings page={page} />
      <ServiceGallery gallery={page.gallery} />
      <ServiceFaq faq={page.faq} />
      <TourFinalCta whatsappLink={whatsappLink} tourName={page.title} />
      <div className="bg-gray-900 pb-16" />
      <TourMobileBookingBar whatsappLink={whatsappLink} price="Consultar" />
    </main>
  )
}
