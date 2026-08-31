import { NextResponse } from "next/server"

interface BlogArticle {
  title: string
  date: string
  category: string
  url: string
}

export async function GET() {
  try {
    const response = await fetch("https://visitbogota.co/es/blog", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; BogotourVIP/1.0; +https://bogotourvip.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()

    const articles: BlogArticle[] = []

    // Parse article links from the blog HTML
    // Look for patterns like: <a href="/es/blog/slug">...<h2>Title</h2>...Date...</a>
    const articleRegex =
      /<a[^>]*href=["']([^"']*\/es\/blog\/[^"']+)["'][^>]*>[\s\S]*?<(?:h2|h3|strong)[^>]*>([\s\S]*?)<\/(?:h2|h3|strong)>[\s\S]*?(?:(\w+\s+\d+\s+de\s+\d{4}))?[\s\S]*?<\/a>/gi
    let match

    while ((match = articleRegex.exec(html)) !== null && articles.length < 8) {
      const url = match[1]
      const title = match[2]
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim()
      const date = match[3] || ""

      if (title && title.length > 10) {
        const fullUrl = url.startsWith("http")
          ? url
          : `https://visitbogota.co${url}`
        articles.push({
          title,
          date,
          category: "Turismo",
          url: fullUrl,
        })
      }
    }

    // If regex didn't match the exact structure, try a simpler title-based extraction
    if (articles.length === 0) {
      const simpleTitleRegex =
        /<(?:h2|h3|h4)[^>]*class[^>]*>([^<]+)<\/(?:h2|h3|h4)>/gi
      const linkRegex =
        /href=["'](\/es\/blog\/[^"']+)["']/gi

      const links: string[] = []
      let linkMatch
      while (
        (linkMatch = linkRegex.exec(html)) !== null &&
        links.length < 12
      ) {
        links.push(linkMatch[1])
      }

      const titles: string[] = []
      let titleMatch
      while (
        (titleMatch = simpleTitleRegex.exec(html)) !== null &&
        titles.length < 12
      ) {
        const t = titleMatch[1].trim()
        if (t.length > 10) titles.push(t)
      }

      for (let i = 0; i < Math.min(links.length, titles.length, 8); i++) {
        articles.push({
          title: titles[i],
          date: "",
          category: "Turismo",
          url: `https://visitbogota.co${links[i]}`,
        })
      }
    }

    // Fallback: curated real articles from visitbogota.co blog
    if (articles.length === 0) {
      return NextResponse.json({
        articles: [
          {
            title: "Zona A de Bogota: un corredor gastronomico donde la tradicion colombiana sabe a asado",
            date: "Diciembre 2025",
            category: "Gastronomia",
            url: "https://visitbogota.co/es/blog",
          },
          {
            title: "Navidad en Colombia y Bogota: tradiciones, agueros y espiritu de hogar",
            date: "Diciembre 2025",
            category: "Cultura",
            url: "https://visitbogota.co/es/blog",
          },
          {
            title: "Ven a probar las delicias de El Chato en Bogota: el Mejor Restaurante de America Latina",
            date: "Diciembre 2025",
            category: "Gastronomia",
            url: "https://visitbogota.co/es/blog",
          },
          {
            title: "Luces del Mundo en Monserrate: Navidad iluminada en Bogota",
            date: "Noviembre 2025",
            category: "Eventos",
            url: "https://visitbogota.co/es/blog",
          },
          {
            title: "BOGOSHORTS: el festival que convierte a Bogota en la capital mundial del cortometraje",
            date: "Noviembre 2025",
            category: "Cultura",
            url: "https://visitbogota.co/es/blog",
          },
          {
            title: "En 2027 el World of Coffee se toma Bogota",
            date: "Diciembre 2025",
            category: "Gastronomia",
            url: "https://visitbogota.co/es/blog",
          },
        ],
        source: "visitbogota.co",
        cached: true,
      })
    }

    return NextResponse.json({
      articles,
      source: "visitbogota.co",
      cached: false,
    })
  } catch (error) {
    // Return fallback curated content on any error
    return NextResponse.json({
      articles: [
        {
          title: "Zona A de Bogota: un corredor gastronomico donde la tradicion colombiana sabe a asado",
          date: "Diciembre 2025",
          category: "Gastronomia",
          url: "https://visitbogota.co/es/blog",
        },
        {
          title: "Navidad en Colombia y Bogota: tradiciones, agueros y espiritu de hogar",
          date: "Diciembre 2025",
          category: "Cultura",
          url: "https://visitbogota.co/es/blog",
        },
        {
          title: "Ven a probar las delicias de El Chato en Bogota: el Mejor Restaurante de America Latina",
          date: "Diciembre 2025",
          category: "Gastronomia",
          url: "https://visitbogota.co/es/blog",
        },
        {
          title: "Luces del Mundo en Monserrate: Navidad iluminada en Bogota",
          date: "Noviembre 2025",
          category: "Eventos",
          url: "https://visitbogota.co/es/blog",
        },
        {
          title: "BOGOSHORTS: el festival que convierte a Bogota en la capital mundial del cortometraje",
          date: "Noviembre 2025",
          category: "Cultura",
          url: "https://visitbogota.co/es/blog",
        },
        {
          title: "En 2027 el World of Coffee se toma Bogota",
          date: "Diciembre 2025",
          category: "Gastronomia",
          url: "https://visitbogota.co/es/blog",
        },
      ],
      source: "visitbogota.co",
      cached: true,
    })
  }
}
