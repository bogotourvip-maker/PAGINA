import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})
const _playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://bogotourvip.com"),
  title: {
    default: "Tours en Bogotá | City Tour, Monserrate, Guatavita y Traslado Aeropuerto - BogotourVip",
    template: "%s | BogotourVip",
  },
  description:
    "Tours privados en Bogotá con guías que hablan español e inglés. City tour, Monserrate, La Candelaria, Laguna de Guatavita, Catedral de Sal de Zipaquirá, tour de café y traslado aeropuerto. Reserva por WhatsApp. Bogota private tours & airport transfer.",
  keywords: [
    // Español - alta intención
    "tours en bogotá",
    "city tour bogotá",
    "tour privado bogotá",
    "qué hacer en bogotá",
    "traslado aeropuerto bogotá",
    "tour monserrate",
    "tour la candelaria",
    "tour laguna de guatavita",
    "tour catedral de sal zipaquirá",
    "tour de café bogotá",
    "guía turístico bogotá",
    "transporte turístico bogotá",
    "tour villa de leyva",
    "excursiones desde bogotá",
    // English - turistas extranjeros
    "bogota tours",
    "bogota city tour",
    "private tour bogota",
    "things to do in bogota",
    "bogota airport transfer",
    "monserrate tour",
    "graffiti tour bogota",
    "guatavita lake tour",
    "salt cathedral zipaquira tour",
    "bogota coffee tour",
    "english speaking guide bogota",
  ],
  alternates: {
    canonical: "https://bogotourvip.com",
  },
  openGraph: {
    title: "Tours en Bogotá | City Tour, Monserrate, Guatavita y Traslado Aeropuerto",
    description:
      "Tours privados en Bogotá con guías bilingües. City tour, Monserrate, La Candelaria, Guatavita, Catedral de Sal y traslado aeropuerto. Bogota private tours & airport transfer.",
    url: "https://bogotourvip.com",
    siteName: "BogotourVip",
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/images/bogota-skyline-panorama.webp",
        width: 1200,
        height: 630,
        alt: "Tours turísticos en Bogotá - BogotourVip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tours en Bogotá | BogotourVip",
    description:
      "Tours privados, City tour, Monserrate, Guatavita, Catedral de Sal y traslado aeropuerto en Bogotá. Guías bilingües.",
    images: ["/images/bogota-skyline-panorama.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark bg-black">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://maps.app.goo.gl" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="8UM4HZNjjBdtQRWYrVUabA" async></script>
        <link
          rel="preload"
          as="image"
          href="/images/bogota-skyline-panorama.webp"
          type="image/webp"
          fetchPriority="high"
        />

        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristInformationCenter",
              name: "BogotourVip",
              image: "https://bogotourvip.com/logo.png",
              "@id": "https://bogotourvip.com",
              url: "https://bogotourvip.com",
              telephone: "+573108677635",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bogotá",
                addressLocality: "Bogotá",
                postalCode: "110111",
                addressCountry: "CO",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 4.711,
                longitude: -74.0721,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              sameAs: [
                "https://www.instagram.com/bogotour_vip",
                "https://www.tiktok.com/@bogotourvip",
                "https://www.tripadvisor.co/Attraction_Review-g294074-d25572583-Reviews-BogotourVIP-Bogota.html",
                "https://maps.app.goo.gl/5FJWqr7cSnTa4UGG6",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Tours y Transporte Turistico en Bogota",
                itemListElement: [
                  { "@type": "Offer", name: "City Tour Bogota" },
                  { "@type": "Offer", name: "Tour Monserrate" },
                  { "@type": "Offer", name: "Tour La Candelaria y Graffiti Tour" },
                  { "@type": "Offer", name: "Tour Laguna de Guatavita" },
                  { "@type": "Offer", name: "Tour Catedral de Sal de Zipaquira" },
                  { "@type": "Offer", name: "Tour de Cafe" },
                  { "@type": "Offer", name: "Tour Villa de Leyva" },
                  { "@type": "Offer", name: "Traslado Aeropuerto El Dorado" },
                ],
              },
            }),
          }}
        />

        {/* Google Analytics - replace G-XXXXXXXXXX with your real ID */}
        {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
            window.trackEvent = function(eventName, params) {
              gtag('event', eventName, params);
            };
          `}
        </Script> */}

        {/* Facebook Pixel - replace YOUR_PIXEL_ID_HERE with your real ID */}
        {/* <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID_HERE');
            fbq('track', 'PageView');
            window.trackFBEvent = function(eventName, params) {
              fbq('track', eventName, params);
            };
          `}
        </Script> */}
      </head>
      <body
        className={`font-sans antialiased`}
        style={{ "--playfair": _playfair.style.fontFamily } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  )
}
