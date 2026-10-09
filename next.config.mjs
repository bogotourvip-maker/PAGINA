/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // AVIF ofrece mejor compresion que WebP; WebP queda como respaldo para navegadores antiguos.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Calidades permitidas (Next.js 16). Cubre los valores usados en todo el sitio.
    qualities: [70, 72, 75, 80, 85, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  redirects: async () => [
    { source: "/tours", destination: "/servicios", permanent: true },
    { source: "/en/tours", destination: "/en", permanent: true },
    { source: "/zipaquira", destination: "/tours/catedral-de-sal-zipaquira", permanent: true },
    { source: "/monserrate", destination: "/tours/monserrate", permanent: true },
    { source: "/candelaria", destination: "/tours/la-candelaria", permanent: true },
    { source: "/la-candelaria", destination: "/tours/la-candelaria", permanent: true },
    { source: "/guatavita", destination: "/tours/laguna-de-guatavita", permanent: true },
    { source: "/villa-de-leyva", destination: "/tours/villa-de-leyva", permanent: true },
    { source: "/traslados-aeropuerto", destination: "/tours/traslado-aeropuerto", permanent: true },
    { source: "/aeropuerto", destination: "/tours/traslado-aeropuerto", permanent: true },
  ],
  headers: async () => [
    {
      source: "/:all*(svg|jpg|jpeg|png|webp|gif|ico)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/:all*(js|css)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],
}

export default nextConfig
