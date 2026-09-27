import type { Metadata } from "next"
import { HomePage } from "@/components/home-page"

export const metadata: Metadata = {
  title: "Bogotá Private Tours & Airport Transfer | Bilingual Guides",
  description:
    "Private tours in Bogotá with bilingual guides: City Tour, Monserrate, La Candelaria, Guatavita Lake, Zipaquirá Salt Cathedral, Villa de Leyva and El Dorado airport transfers.",
  keywords: [
    "bogota private tours",
    "bogota city tour",
    "monserrate tour",
    "salt cathedral tour",
    "guatavita tour",
    "bogota airport transfer",
    "things to do in bogota",
    "english speaking guide bogota",
  ],
  alternates: {
    canonical: "https://bogotourvip.com/en",
    languages: {
      es: "https://bogotourvip.com",
      en: "https://bogotourvip.com/en",
      "x-default": "https://bogotourvip.com",
    },
  },
  openGraph: {
    title: "Bogotá Private Tours & Airport Transfer | BogotourVip",
    description:
      "Private tours in Bogotá with bilingual guides and private transport: City Tour, Monserrate, Guatavita, Salt Cathedral and airport transfers.",
    url: "https://bogotourvip.com/en",
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_CO"],
  },
}

export default function EnglishHomePage() {
  return <HomePage initialLanguage="en" />
}
