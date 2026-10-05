import { NextResponse, type NextRequest } from "next/server"

// Search engines and link-preview bots must always get the Spanish URL they asked for,
// otherwise Google would only ever index one version of the home page.
const BOT_PATTERN = /bot|crawl|spider|slurp|lighthouse|facebookexternalhit|whatsapp|telegram|preview/i

// Languages the Spanish home already translates on the client; everything else gets /en.
const STAY_ON_ROOT = new Set(["es", "fr", "de", "pt", "it", "zh"])

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? ""
  if (BOT_PATTERN.test(userAgent)) return NextResponse.next()

  const preferred = request.cookies.get("preferredLang")?.value
  if (preferred) {
    return preferred === "en" ? redirectToEnglish(request) : NextResponse.next()
  }

  const acceptLanguage = request.headers.get("accept-language")
  if (!acceptLanguage) return NextResponse.next()

  const primary = acceptLanguage.split(",")[0].trim().slice(0, 2).toLowerCase()
  if (STAY_ON_ROOT.has(primary)) return NextResponse.next()

  return redirectToEnglish(request)
}

function redirectToEnglish(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = "/en"
  const response = NextResponse.redirect(url, 307)
  response.headers.set("Vary", "Accept-Language, Cookie")
  return response
}

export const config = {
  matcher: ["/"],
}
