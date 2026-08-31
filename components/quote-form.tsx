"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface QuoteFormProps {
  translations: any
  WHATSAPP_LINK: string
}

export function QuoteForm({ translations, WHATSAPP_LINK }: QuoteFormProps) {
  const [fecha, setFecha] = useState("")
  const [pasajeros, setPasajeros] = useState(1)
  const [maletas, setMaletas] = useState(0)
  const [origen, setOrigen] = useState("")
  const [destino, setDestino] = useState("")
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)
  const [vehicleType, setVehicleType] = useState("")

  const EXCHANGE_RATE = 3650

  const calculatePrice = () => {
    let basePrice = 0
    let service = ""
    const pax = Number.parseInt(pasajeros.toString()) || 1
    const vehicle = pax <= 3 ? "Sedan (1-3 PAX)" : "Van (4+ PAX)"

    const destLower = destino.toLowerCase()
    const origLower = origen.toLowerCase()

    if (
      destLower.includes("aeropuerto") ||
      destLower.includes("airport") ||
      destLower.includes("dorado") ||
      origLower.includes("aeropuerto") ||
      origLower.includes("airport")
    ) {
      if (origLower.includes("aeropuerto") || origLower.includes("airport")) {
        basePrice = pax <= 3 ? 110000 : 220000
        service = "Transfer In (1.5h espera incluida)"
      } else {
        basePrice = pax <= 3 ? 90000 : 180000
        service = "Transfer Out (15 min espera incluida)"
      }
    } else if (destLower.includes("villa") || destLower.includes("leyva")) {
      basePrice = pax <= 3 ? 1000000 : 2000000
      service = "Tour Villa de Leyva (Full día)"
    } else if (destLower.includes("zipaquirá") && destLower.includes("guatavita")) {
      basePrice = pax <= 3 ? 750000 : 1500000
      service = "Tour Zipaquirá - Guatavita (10h)"
    } else if (destLower.includes("zipaquirá") || destLower.includes("zipaquira")) {
      basePrice = pax <= 3 ? 350000 : 700000
      service = "Tour Zipaquirá (6h)"
    } else if (destLower.includes("guatavita")) {
      basePrice = pax <= 3 ? 420000 : 840000
      service = "Tour Guatavita (6h)"
    } else if (destLower.includes("monserrate")) {
      basePrice = pax <= 3 ? 250000 : 500000
      service = "City Tour con Monserrate (6h)"
    } else if (destLower.includes("coloma") || destLower.includes("hacienda")) {
      basePrice = pax <= 3 ? 600000 : 1200000
      service = "Tour Hacienda Coloma (10h)"
    } else {
      basePrice = pax <= 3 ? 160000 : 320000
      service = "City Tour Bogotá (4h)"
    }

    setEstimatedPrice(basePrice)
    setVehicleType(vehicle)

    return { price: basePrice, service, vehicle }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const fechaValue = (document.getElementById("fecha") as HTMLInputElement)?.value
    const pasajerosValue = (document.getElementById("pasajeros") as HTMLInputElement)?.value
    const maletasValue = (document.getElementById("maletas") as HTMLInputElement)?.value
    const origenValue = (document.getElementById("destino_inicial") as HTMLInputElement)?.value
    const destinoValue = (document.getElementById("destino_final") as HTMLInputElement)?.value
    const nombreValue = (document.getElementById("nombre") as HTMLInputElement)?.value
    const telefonoValue = (document.getElementById("telefono") as HTMLInputElement)?.value
    const observacionesValue = (document.getElementById("observaciones") as HTMLTextAreaElement)?.value

    if (!fechaValue || !pasajerosValue || !origenValue || !destinoValue || !nombreValue || !telefonoValue) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    const { price, service, vehicle } = calculatePrice()
    const priceUSD = (price / EXCHANGE_RATE).toFixed(2)

    const message = `🚗 *Nueva Solicitud de Cotización BogotourVIP*

📅 *Fecha:* ${fechaValue}
👥 *Pasajeros:* ${pasajerosValue}
🧳 *Maletas:* ${maletasValue}
📍 *Origen:* ${origenValue}
🎯 *Destino:* ${destinoValue}

💰 *Precio Estimado:* $${price.toLocaleString()} COP (≈ $${priceUSD} USD)
🚙 *Vehículo:* ${vehicle}
📋 *Servicio:* ${service}

👤 *Nombre:* ${nombreValue}
📱 *Teléfono:* ${telefonoValue}

💬 *Observaciones:* ${observacionesValue || "Ninguna"}`

    const whatsappUrl = `https://wa.me/573108677635?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="cotizacion" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
              {translations.calculatorTitle}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/70 text-pretty">
              {translations.calculatorSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="fecha" className="text-white text-sm sm:text-base">
                  {translations.date} *
                </Label>
                <Input
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="bg-white/10 border-white/20 text-white h-12 sm:h-14"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pasajeros" className="text-white text-sm sm:text-base">
                  {translations.passengers} *
                </Label>
                <Input
                  id="pasajeros"
                  type="number"
                  min="1"
                  value={pasajeros}
                  onChange={(e) => setPasajeros(Number.parseInt(e.target.value))}
                  className="bg-white/10 border-white/20 text-white h-12 sm:h-14"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maletas" className="text-white text-sm sm:text-base">
                  {translations.luggage}
                </Label>
                <Input
                  id="maletas"
                  type="number"
                  min="0"
                  value={maletas}
                  onChange={(e) => setMaletas(Number.parseInt(e.target.value))}
                  className="bg-white/10 border-white/20 text-white h-12 sm:h-14"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destino_inicial" className="text-white text-sm sm:text-base">
                  {translations.origin} *
                </Label>
                <Input
                  id="destino_inicial"
                  type="text"
                  value={origen}
                  onChange={(e) => setOrigen(e.target.value)}
                  placeholder={translations.originPlaceholder}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 sm:h-14"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="destino_final" className="text-white text-sm sm:text-base">
                  {translations.destination} *
                </Label>
                <Input
                  id="destino_final"
                  type="text"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  placeholder={translations.destinationPlaceholder}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 sm:h-14"
                  required
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={calculatePrice}
              className="w-full bg-[#d4af37] text-black hover:bg-[#f0c54a] transition-all duration-300 transform hover:scale-105 h-12 sm:h-14 text-base sm:text-lg font-semibold"
            >
              {translations.calculatePrice}
            </Button>

            {estimatedPrice && (
              <div className="bg-gradient-to-r from-[#d4af37]/20 to-[#f0c54a]/20 border-2 border-[#d4af37] rounded-lg p-6 sm:p-8 text-center animate-fade-in">
                <p className="text-white/70 text-sm sm:text-base mb-2">{translations.estimatedPrice}</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4af37] mb-2">
                  ${estimatedPrice.toLocaleString()} COP
                </p>
                <p className="text-xl sm:text-2xl text-white/90">
                  ≈ ${(estimatedPrice / EXCHANGE_RATE).toFixed(2)} USD
                </p>
                <p className="text-sm sm:text-base text-white/60 mt-4">{vehicleType}</p>
              </div>
            )}

            <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-white text-sm sm:text-base">
                    {translations.fullName} *
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="bg-white/10 border-white/20 text-white h-12 sm:h-14"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-white text-sm sm:text-base">
                    {translations.phone} *
                  </Label>
                  <Input
                    id="telefono"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="bg-white/10 border-white/20 text-white h-12 sm:h-14"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones" className="text-white text-sm sm:text-base">
                  {translations.additionalObservations}
                </Label>
                <Textarea
                  id="observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 h-14 sm:h-16 text-base sm:text-lg font-semibold"
            >
              <Send className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              {translations.sendQuote}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
