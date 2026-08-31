import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, Clock, User, MessageCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { ToursNav } from "@/components/tours-nav"
import { blogPosts, getPostBySlug } from "@/lib/blog"
import { WHATSAPP_LINK } from "@/lib/tours"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Artículo no encontrado" }
  }

  const url = `https://bogotourvip.com/blog/${post.slug}`

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.heroImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const whatsappLink = WHATSAPP_LINK
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `https://bogotourvip.com${post.heroImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://bogotourvip.com",
    },
    publisher: {
      "@type": "Organization",
      name: "BogotourVip",
      url: "https://bogotourvip.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bogotourvip.com/blog/${post.slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-black">
      <ToursNav />

      {/* JSON-LD structured data for this article */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[360px] max-h-[520px] overflow-hidden">
        <Image
          src={post.heroImage || "/placeholder.svg"}
          alt={post.title}
          fill
          priority
          quality={72}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pb-8 sm:pb-12">
            <span className="inline-block px-3 py-1 bg-[#d4af37] text-black text-xs font-semibold rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.15] mb-4 text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#d4af37]" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                {post.displayDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                {post.readTime} de lectura
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article content */}
      <article className="py-12 sm:py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 text-pretty border-l-2 border-[#d4af37] pl-5">
            {post.excerpt}
          </p>

          {post.content.map((section, index) => (
            <div key={index} className="mb-8">
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-balance">{section.heading}</h2>
              )}
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-white/70 text-base sm:text-lg leading-relaxed mb-4 text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {/* Transport CTA */}
          <div className="mt-12 bg-gradient-to-br from-[#d4af37]/15 to-transparent border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 text-balance">
              Vive Bogotá con transporte privado
            </h3>
            <p className="text-white/70 text-sm sm:text-base mb-6 text-pretty">
              Olvídate del tráfico y las esperas. Con nuestro servicio de transporte especial y privado recorres la
              ciudad y sus alrededores con comodidad, seguridad y guías bilingües. Diseñamos tu itinerario a la medida.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#d4af37] text-black hover:bg-[#c9a430] transition-colors font-semibold px-6 py-3.5 rounded-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Reservar por WhatsApp
              </a>
              <Link
                href="/tours"
                className="flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 transition-colors font-medium px-6 py-3.5 rounded-xl"
              >
                Ver todos los tours
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="py-12 sm:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Sigue leyendo</h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-[#d4af37] text-sm font-semibold hover:gap-2 transition-all"
            >
              Ver todo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={related.heroImage || "/placeholder.svg"}
                    alt={related.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-4">
                  <span className="text-[#d4af37] text-xs font-medium">{related.category}</span>
                  <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#d4af37] transition-colors text-pretty">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
