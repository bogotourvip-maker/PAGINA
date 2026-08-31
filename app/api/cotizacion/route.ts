import { type NextRequest, NextResponse } from "next/server"

// Numeros de WhatsApp que reciben las cotizaciones (formato internacional sin +)
const WHATSAPP_NUMBERS = ["573108677635", "573106998224"]

interface QuotePayload {
  fecha?: string
  pasajeros?: number
  maletas?: number
  origen?: string
  destino?: string
  nombre?: string
  telefono?: string
  observaciones?: string
}

function buildMessage(data: QuotePayload): string {
  return (
    `*Nueva Solicitud de Cotizacion BogotourVIP*\n\n` +
    `*Fecha:* ${data.fecha || "-"}\n` +
    `*Pasajeros:* ${data.pasajeros ?? "-"}\n` +
    `*Maletas:* ${data.maletas ?? "-"}\n` +
    `*Origen:* ${data.origen || "-"}\n` +
    `*Destino:* ${data.destino || "-"}\n\n` +
    `*Nombre:* ${data.nombre || "-"}\n` +
    `*Telefono:* ${data.telefono || "-"}\n\n` +
    `*Observaciones:* ${data.observaciones || "Ninguna"}`
  )
}

export async function POST(req: NextRequest) {
  let data: QuotePayload

  try {
    data = (await req.json()) as QuotePayload
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 })
  }

  const token = process.env.WHATSAPP_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME

  // Si faltan credenciales, respondemos que NO esta configurado para que el
  // frontend haga fallback al metodo manual (abrir wa.me).
  if (!token || !phoneNumberId) {
    return NextResponse.json({ ok: true, configured: false })
  }

  const message = buildMessage(data)
  const endpoint = `https://graph.facebook.com/v23.0/${phoneNumberId}/messages`

  const results = await Promise.allSettled(
    WHATSAPP_NUMBERS.map(async (to) => {
      // Si hay una plantilla aprobada, la usamos (permite enviar fuera de la ventana de 24h).
      // Si no, intentamos texto libre (solo funciona dentro de la ventana de 24h).
      const body = templateName
        ? {
            messaging_product: "whatsapp",
            to,
            type: "template",
            template: {
              name: templateName,
              language: { code: "es" },
              components: [
                {
                  type: "body",
                  parameters: [{ type: "text", text: message }],
                },
              ],
            },
          }
        : {
            messaging_product: "whatsapp",
            to,
            type: "text",
            text: { body: message },
          }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`WhatsApp API ${res.status}: ${errText}`)
      }

      return res.json()
    }),
  )

  const allSent = results.every((r) => r.status === "fulfilled")

  if (!allSent) {
    console.log("[v0] Error enviando cotizacion por WhatsApp:", results)
  }

  return NextResponse.json({ ok: allSent, configured: true })
}
