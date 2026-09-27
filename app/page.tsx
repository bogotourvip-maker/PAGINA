import type { Metadata } from "next"
import { HomePage } from "@/components/home-page"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bogotourvip.com",
    languages: {
      es: "https://bogotourvip.com",
      en: "https://bogotourvip.com/en",
      "x-default": "https://bogotourvip.com",
    },
  },
}

export default function Page() {
  return <HomePage initialLanguage="es" />
}
