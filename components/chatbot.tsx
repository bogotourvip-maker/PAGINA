"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Sparkles, MapPin, Car, DollarSign, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
  typing?: boolean
}

// Numeros de WhatsApp de los asesores (todos los mensajes del chatbot salen hacia estos)
const WHATSAPP_NUMBERS = ["573108677635", "573106998224"]
// El chatbot usa siempre el formato de "cotizar tu servicio"
const QUOTE_MESSAGE =
  "Hola BogotourVIP, quiero cotizar tu servicio. ¿Me pueden ayudar con la informacion y el precio?"
const quoteLink = (number: string) => `https://wa.me/${number}?text=${encodeURIComponent(QUOTE_MESSAGE)}`

// Saludo de bienvenida + breve resena de servicios que acompana cada respuesta del bot.
const WELCOME_INTRO = `Bienvenido a BogotourVIP! Tu experiencia de viaje premium en Colombia: transporte privado, tours exclusivos, transfer al aeropuerto y conductores bilingues disponibles 24/7.`

// Base de conocimiento expandida con IA contextual
const knowledgeBase = {
  tours: {
    keywords: ["tour", "tours", "paseo", "paseos", "recorrido", "visita", "conocer", "destino", "lugar"],
    response: `Ofrecemos tours exclusivos a los mejores destinos de Colombia:

**Tours en Bogota:**
- La Candelaria y Centro Historico (4-5 horas)
- Monserrate + Zona G (6 horas)
- Zipaquira y Catedral de Sal (8 horas)

**Tours fuera de Bogota:**
- Villa de Leyva (dia completo)
- Laguna de Guatavita (medio dia)
- Zona Cafetera (2-3 dias)

Todos incluyen transporte privado, guia bilingue opcional y seguro. Deseas que te envie cotizacion personalizada?`,
  },
  precios: {
    keywords: ["precio", "precios", "costo", "costos", "tarifa", "tarifas", "cuanto", "valor", "cotizacion", "cotizar"],
    response: `Nuestras tarifas dependen del servicio y destino:

**Transporte en Bogota:**
- Servicio por hora: desde $80.000 COP/hora
- Aeropuerto (ida o vuelta): desde $120.000 COP

**Tours con guia:**
- Tour La Candelaria: desde $350.000 COP (grupo hasta 4)
- Tour Zipaquira: desde $550.000 COP (grupo hasta 4)
- Tour Villa de Leyva: desde $900.000 COP

Los precios son aproximados y varian segun numero de personas y temporada. Deseas una cotizacion exacta? Puedo conectarte con un asesor por WhatsApp.`,
  },
  vehiculos: {
    keywords: ["vehiculo", "vehiculos", "carro", "carros", "van", "vans", "camioneta", "transporte", "flota"],
    response: `Nuestra flota premium incluye:

**Hyundai H1 Van (hasta 8 pasajeros)**
- Ideal para familias y grupos
- Aire acondicionado
- WiFi disponible
- Amplio espacio para equipaje

**SUV Ejecutivo (hasta 4 pasajeros)**
- Perfecto para parejas o viajes de negocios
- Asientos en cuero
- Maxima comodidad

Todos nuestros vehiculos tienen seguro todo riesgo y conductores profesionales bilingues.`,
  },
  horarios: {
    keywords: ["horario", "horarios", "hora", "horas", "disponible", "disponibilidad", "abierto", "servicio"],
    response: `Estamos disponibles **24 horas, 7 dias a la semana**.

- Reservas con anticipacion recomendada de 24-48 horas
- Servicios de emergencia y ultimo minuto disponibles
- Recogidas en aeropuerto a cualquier hora

Para garantizar disponibilidad en temporada alta (diciembre, Semana Santa, vacaciones), te recomendamos reservar con al menos 1 semana de anticipacion.`,
  },
  pagos: {
    keywords: ["pago", "pagos", "pagar", "efectivo", "tarjeta", "transferencia", "nequi", "daviplata", "anticipo"],
    response: `Aceptamos multiples formas de pago:

**Metodos disponibles:**
- Efectivo (COP o USD)
- Tarjeta de credito/debito
- Transferencia bancaria
- Nequi / Daviplata
- PayPal (para clientes internacionales)

**Politica de pago:**
- Tours: 50% anticipo para confirmar
- Transporte: pago completo al finalizar
- Cancelacion gratis hasta 24h antes`,
  },
  idiomas: {
    keywords: ["ingles", "english", "idioma", "idiomas", "bilingue", "hablan", "speak", "language"],
    response: `Our team speaks multiple languages!

**Available languages:**
- Spanish (native)
- English (fluent)
- Portuguese (basic)

All our tour guides are certified and can provide services in English. Just let us know your preference when booking.

Would you like me to switch to English for our conversation?`,
  },
  aeropuerto: {
    keywords: ["aeropuerto", "eldorado", "vuelo", "avion", "recogida", "traslado", "transfer"],
    response: `Servicio de transfer aeropuerto El Dorado:

**Incluye:**
- Recogida/entrega en terminal
- Conductor esperando con letrero
- Monitoreo de vuelo en tiempo real
- Asistencia con equipaje

**Tarifas aproximadas:**
- Zona Norte: desde $120.000 COP
- Centro/Candelaria: desde $100.000 COP
- Zona Sur: desde $140.000 COP

Servicio disponible 24/7. Necesitas reservar un transfer?`,
  },
  seguridad: {
    keywords: ["seguro", "seguridad", "confiable", "segura", "peligro", "robo"],
    response: `Tu seguridad es nuestra prioridad:

**Garantias:**
- Todos los vehiculos con seguro todo riesgo
- Conductores verificados y certificados
- GPS en tiempo real en todos los vehiculos
- Protocolo de emergencias 24/7

**Bogota es segura para turistas** cuando se toman las precauciones basicas. Nuestros guias te orientaran sobre las mejores practicas durante tu visita.`,
  },
  contacto: {
    keywords: ["contacto", "telefono", "whatsapp", "llamar", "escribir", "hablar", "asesor", "humano"],
    response: `Puedes contactarnos de varias formas:

**WhatsApp (recomendado):** usa los botones de "Cotizar tu servicio" que aparecen abajo para escribir directo a cualquiera de nuestros dos asesores.
Respuesta inmediata de un asesor real.

**Tambien puedes:**
- Llenar el formulario de cotizacion en esta pagina
- Escribirnos a nuestras redes sociales

Usa los botones "Cotizar con Asesor 1" o "Cotizar con Asesor 2" aqui abajo para empezar.`,
  },
}

// Funcion de analisis contextual mejorada
function analyzeQuery(input: string): string {
  const lowerInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  // Buscar coincidencias en la base de conocimiento
  for (const [, data] of Object.entries(knowledgeBase)) {
    if (data.keywords.some(keyword => lowerInput.includes(keyword))) {
      return data.response
    }
  }

  // Saludos
  if (/^(hola|hey|hi|buenos|buenas|saludos|ola)/i.test(lowerInput)) {
    return "Hola! Soy el asistente virtual de BogotourVIP. Puedo ayudarte con informacion sobre tours, precios, vehiculos, horarios y mas. En que puedo asistirte hoy?"
  }

  // Agradecimientos
  if (/(gracias|thanks|thank you|agradec)/i.test(lowerInput)) {
    return "Con mucho gusto! Si tienes mas preguntas, aqui estoy para ayudarte. Tambien puedes contactar a un asesor por WhatsApp para atencion personalizada."
  }

  // Despedidas
  if (/(adios|bye|chao|hasta luego|nos vemos)/i.test(lowerInput)) {
    return "Hasta pronto! Fue un placer ayudarte. Si necesitas algo mas, no dudes en escribirme. Buen viaje!"
  }

  // Respuesta por defecto mejorada
  return `No encontre informacion especifica sobre eso, pero puedo ayudarte con:

- **Tours y destinos** en Bogota y Colombia
- **Precios y cotizaciones** personalizadas
- **Vehiculos y flota** disponible
- **Transfer aeropuerto** y traslados
- **Formas de pago** aceptadas

O si prefieres, puedo conectarte con un asesor humano por WhatsApp para atencion personalizada. Que te gustaria saber?`
}

const quickActions = [
  { icon: MapPin, label: "Tours", query: "Que tours ofrecen?" },
  { icon: DollarSign, label: "Precios", query: "Cuales son los precios?" },
  { icon: Car, label: "Vehiculos", query: "Que vehiculos tienen?" },
  { icon: Clock, label: "Horarios", query: "Cual es su horario?" },
  { icon: Globe, label: "English", query: "Do you speak English?" },
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hola! Soy tu asistente virtual de BogotourVIP. Estoy aqui para ayudarte a planificar tu viaje perfecto por Colombia. Que te gustaria saber?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simular tiempo de "pensamiento" del bot
    const thinkTime = Math.random() * 800 + 400
    setTimeout(() => {
      // Cada respuesta inicia con el saludo de bienvenida y una breve resena de servicios
      const response = `${WELCOME_INTRO}\n\n${analyzeQuery(messageText)}`
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, thinkTime)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-[#d4af37] to-[#f5d76e] hover:from-[#f5d76e] hover:to-[#d4af37] text-black p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Abrir chat"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse" />
        </div>
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-6 z-40 w-[360px] sm:w-[400px] bg-gray-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col max-h-[550px] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-black p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Asistente BogotourVIP</h3>
            <p className="text-xs opacity-80 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-600 rounded-full" />
              En linea - IA Activa
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-black/10 p-2 rounded-full transition-colors"
          aria-label="Cerrar chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/95">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "bot" && (
              <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#d4af37]" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-[#d4af37] text-black rounded-br-none"
                  : "bg-white/10 text-white rounded-bl-none border border-white/10"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-black/50" : "text-white/40"}`}>
                {msg.timestamp.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="bg-white/10 rounded-2xl rounded-bl-none px-4 py-3 border border-white/10">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-3 py-2 bg-gray-800/50 border-t border-white/10 flex gap-2 overflow-x-auto scrollbar-hide">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => handleSend(action.query)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/80 whitespace-nowrap transition-colors"
          >
            <action.icon className="w-3 h-3 text-[#d4af37]" />
            {action.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-gray-800 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]/50 text-sm text-white placeholder:text-white/40"
          />
          <Button
            onClick={() => handleSend()}
            size="icon"
            className="bg-[#d4af37] hover:bg-[#f5d76e] text-black rounded-full w-10 h-10"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-2">
          <p className="text-[10px] text-center text-white/40 mb-1.5">Cotizar tu servicio directo por WhatsApp</p>
          <div className="flex gap-2">
            <a
              href={quoteLink(WHATSAPP_NUMBERS[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-[11px] font-semibold bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-full transition-colors"
            >
              Cotizar con Asesor 1
            </a>
            <a
              href={quoteLink(WHATSAPP_NUMBERS[1])}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-[11px] font-semibold bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-full transition-colors"
            >
              Cotizar con Asesor 2
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
