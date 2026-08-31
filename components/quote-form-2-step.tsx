"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft, Calculator, Send, CheckCircle2 } from "lucide-react"

// Numeros de WhatsApp de los asesores que reciben las cotizaciones
const WHATSAPP_NUMBERS = ["573108677635", "573106998224"]

interface QuoteForm2StepProps {
  translations: any
  WHATSAPP_LINK: string
}

export function QuoteForm2Step({ translations: t, WHATSAPP_LINK }: QuoteForm2StepProps) {
  const [step, setStep] = useState(1)
  const [fecha, setFecha] = useState("")
  const [pasajeros, setPasajeros] = useState(1)
  const [maletas, setMaletas] = useState(0)
  const [origen, setOrigen] = useState("")
  const [destino, setDestino] = useState("")
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [sent, setSent] = useState(false)
  const [sentViaApi, setSentViaApi] = useState(false)
  const [sending, setSending] = useState(false)
  const [quoteMessage, setQuoteMessage] = useState("")

  const validateStep1 = () => {
    if (!fecha || !pasajeros || !origen || !destino) {
      alert("Por favor completa todos los campos del paso 1")
      return false
    }
    return true
  }

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!nombre || !telefono) {
      alert("Por favor completa tu nombre y telefono")
      return
    }

    const message = `*Nueva Solicitud de Cotizacion BogotourVIP*\n\n` +
      `*Fecha:* ${fecha}\n` +
      `*Pasajeros:* ${pasajeros}\n` +
      `*Maletas:* ${maletas}\n` +
      `*Origen:* ${origen}\n` +
      `*Destino:* ${destino}\n\n` +
      `*Nombre:* ${nombre}\n` +
      `*Telefono:* ${telefono}\n\n` +
      `*Observaciones:* ${observaciones || "Ninguna"}`

    setQuoteMessage(message)
    setSending(true)

    // 1) Intentamos el envio AUTOMATICO por la API de WhatsApp (llega a los dos asesores solos).
    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha, pasajeros, maletas, origen, destino, nombre, telefono, observaciones }),
      })
      const data = await res.json()

      if (data?.ok && data?.configured) {
        // La API envio a los DOS asesores automaticamente. No hace falta abrir WhatsApp.
        setSentViaApi(true)
        setSent(true)
        setSending(false)
        return
      }
    } catch {
      // Si la API falla, caemos al metodo manual mas abajo.
    }

    // 2) Respaldo MANUAL: abrimos el chat del primer asesor de inmediato (gesto del usuario => no se bloquea)
    window.open(`https://wa.me/${WHATSAPP_NUMBERS[0]}?text=${encodeURIComponent(message)}`, "_blank")
    setSentViaApi(false)
    setSent(true)
    setSending(false)
  }

  const sendToSecond = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBERS[1]}?text=${encodeURIComponent(quoteMessage)}`, "_blank")
  }

  const resetForm = () => {
    setSent(false)
    setSentViaApi(false)
    setStep(1)
  }

  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl md:max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-balance leading-tight">
              {t.calculatorTitle}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 text-pretty px-2 sm:px-0">
              {t.calculatorSubtitle}
            </p>
          </div>

          <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full font-bold transition-all duration-300 text-sm sm:text-base ${
                  step >= 1 ? "bg-[#d4af37] text-black scale-105 sm:scale-110" : "bg-white/20 text-white/50"
                }`}
              >
                1
              </div>
              <div
                className={`w-12 sm:w-14 md:w-16 h-1 transition-all duration-300 ${step >= 2 ? "bg-[#d4af37]" : "bg-white/20"}`}
              />
              <div
                className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full font-bold transition-all duration-300 text-sm sm:text-base ${
                  step >= 2 ? "bg-[#d4af37] text-black scale-105 sm:scale-110" : "bg-white/20 text-white/50"
                }`}
              >
                2
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 md:space-y-8">
            {sent && (
              <div className="space-y-5 sm:space-y-6 animate-fade-in">
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-[#d4af37]/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-green-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                    ¡Tu cotizacion fue enviada!
                  </h3>
                  {sentViaApi ? (
                    <p className="text-sm sm:text-base text-white/70 mb-6">
                      Recibimos tu solicitud y ya les llego a <span className="text-[#d4af37] font-semibold">nuestros dos asesores</span>.
                      Te contactaran muy pronto por WhatsApp al numero que nos dejaste.
                    </p>
                  ) : (
                    <>
                      <p className="text-sm sm:text-base text-white/70 mb-6">
                        Abrimos WhatsApp con nuestro primer asesor. Para una respuesta aun mas rapida, envia la misma
                        solicitud tambien a nuestro segundo asesor:
                      </p>
                      <Button
                        type="button"
                        onClick={sendToSecond}
                        className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 h-12 sm:h-14 text-sm sm:text-base font-semibold"
                      >
                        <Send className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Enviar tambien al segundo asesor
                      </Button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-4 text-sm text-white/50 hover:text-white/80 transition-colors underline"
                  >
                    Hacer otra cotizacion
                  </button>
                </div>
              </div>
            )}

            {!sent && step === 1 && (
              <div className="space-y-5 sm:space-y-6 animate-fade-in">
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-[#d4af37]/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-5 sm:mb-6 flex items-center gap-2">
                    <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />
                    Detalles del Viaje
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fecha" className="text-white text-xs sm:text-sm md:text-base">
                        {t.date} *
                      </Label>
                      <Input
                        id="fecha"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="bg-white/10 border-white/20 text-white h-11 sm:h-12 md:h-14 text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pasajeros" className="text-white text-xs sm:text-sm md:text-base">
                        {t.passengers} *
                      </Label>
                      <Input
                        id="pasajeros"
                        type="number"
                        min="1"
                        value={pasajeros}
                        onChange={(e) => setPasajeros(Number.parseInt(e.target.value))}
                        className="bg-white/10 border-white/20 text-white h-11 sm:h-12 md:h-14 text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maletas" className="text-white text-xs sm:text-sm md:text-base">
                        {t.luggage}
                      </Label>
                      <Input
                        id="maletas"
                        type="number"
                        min="0"
                        value={maletas}
                        onChange={(e) => setMaletas(Number.parseInt(e.target.value))}
                        className="bg-white/10 border-white/20 text-white h-11 sm:h-12 md:h-14 text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="origen" className="text-white text-xs sm:text-sm md:text-base">
                        {t.origin} *
                      </Label>
                      <Input
                        id="origen"
                        type="text"
                        value={origen}
                        onChange={(e) => setOrigen(e.target.value)}
                        placeholder={t.originPlaceholder}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11 sm:h-12 md:h-14 text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="destino" className="text-white text-xs sm:text-sm md:text-base">
                        {t.destination} *
                      </Label>
                      <Input
                        id="destino"
                        type="text"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        placeholder={t.destinationPlaceholder}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11 sm:h-12 md:h-14 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-[#d4af37] text-black hover:bg-[#f0c54a] transition-all duration-300 transform hover:scale-105 h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg font-semibold"
                >
                  {t.sendQuote || "Continuar"}
                  <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            )}

            {!sent && step === 2 && (
              <div className="space-y-5 sm:space-y-6 animate-fade-in">
                <div className="bg-gradient-to-r from-[#d4af37]/20 to-[#f0c54a]/20 border-2 border-[#d4af37] rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center">
                  <p className="text-sm sm:text-base text-white/90">
                    {fecha} | {pasajeros} pax | {origen} → {destino}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-[#d4af37]/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-5 sm:mb-6">
                    Tus Datos de Contacto
                  </h3>

                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-white text-xs sm:text-sm md:text-base">
                        {t.fullName} *
                      </Label>
                      <Input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="bg-white/10 border-white/20 text-white h-11 sm:h-12 md:h-14 text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-white text-xs sm:text-sm md:text-base">
                        {t.phone} *
                      </Label>
                      <Input
                        id="telefono"
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        className="bg-white/10 border-white/20 text-white h-11 sm:h-12 md:h-14 text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="observaciones" className="text-white text-xs sm:text-sm md:text-base">
                        {t.additionalObservations}
                      </Label>
                      <Textarea
                        id="observaciones"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        rows={4}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none text-sm sm:text-base"
                        placeholder="¿Necesitas algo especial? Cuéntanos..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-2 border-white/20 text-white hover:bg-white/10 h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg"
                  >
                    <ChevronLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Volver
                  </Button>

                  <Button
                    type="submit"
                    disabled={sending}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Send className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    {sending ? "Enviando..." : t.sendQuote || "Enviar por WhatsApp"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
