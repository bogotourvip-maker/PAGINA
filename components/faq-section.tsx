"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

type Lang = "es" | "en" | "fr" | "de" | "pt" | "it" | "zh"

interface QA {
  q: string
  a: string
}

interface FaqCopy {
  kicker: string
  title: string
  subtitle: string
  items: QA[]
}

// Preguntas orientadas a busquedas de alta intencion ("cuanto cuesta", "como llegar",
// "es seguro"). Espanol e ingles son los idiomas con mas volumen de busqueda para Bogota.
const copy: Record<Lang, FaqCopy> = {
  es: {
    kicker: "Preguntas frecuentes",
    title: "Todo lo que necesitas saber antes de tu tour en Bogotá",
    subtitle: "Resolvemos las dudas más comunes de nuestros viajeros. ¿Tienes otra pregunta? Escríbenos por WhatsApp.",
    items: [
      {
        q: "¿Cuánto cuesta un city tour privado en Bogotá?",
        a: "Nuestros city tours privados en Bogotá inician desde 120.000 COP por persona e incluyen guía profesional, transporte privado y entradas a los sitios principales como el Museo del Oro y Monserrate. El precio final depende del número de pasajeros y de las paradas que elijas.",
      },
      {
        q: "¿Cómo llegar del Aeropuerto El Dorado al centro de Bogotá?",
        a: "Ofrecemos traslados privados desde el Aeropuerto Internacional El Dorado hasta tu hotel las 24 horas. Nuestro conductor te espera en la salida con un letrero con tu nombre. El trayecto al centro toma entre 30 y 50 minutos según el tráfico.",
      },
      {
        q: "¿Es seguro hacer turismo en Bogotá?",
        a: "Sí. Con BogotourVip viajas con conductores y guías profesionales que conocen la ciudad, en vehículos privados y por las rutas más seguras. Te acompañamos en todo momento para que disfrutes de Bogotá con total tranquilidad.",
      },
      {
        q: "¿Cuánto dura el tour a la Catedral de Sal de Zipaquirá?",
        a: "El tour a la Catedral de Sal de Zipaquirá dura aproximadamente 8 horas ida y vuelta desde Bogotá, incluyendo el transporte, la entrada a la catedral y tiempo libre en el centro histórico de Zipaquirá.",
      },
      {
        q: "¿Los tours están disponibles en inglés y otros idiomas?",
        a: "Sí. Contamos con guías que hablan español, inglés, francés y portugués. Al reservar por WhatsApp indícanos tu idioma preferido y asignaremos un guía acorde.",
      },
      {
        q: "¿Cómo reservo un tour o traslado?",
        a: "Reservar es muy fácil: escríbenos por WhatsApp o completa el formulario de cotización de esta página. Te respondemos en minutos con la disponibilidad, el itinerario y el precio final sin compromiso.",
      },
    ],
  },
  en: {
    kicker: "Frequently asked questions",
    title: "Everything you need to know before your Bogotá tour",
    subtitle: "We answer our travelers' most common questions. Have another one? Message us on WhatsApp.",
    items: [
      {
        q: "How much does a private city tour in Bogotá cost?",
        a: "Our private city tours in Bogotá start from 120,000 COP per person and include a professional guide, private transport and entrance to the main sites such as the Gold Museum and Monserrate. The final price depends on the number of passengers and the stops you choose.",
      },
      {
        q: "How do I get from El Dorado Airport to downtown Bogotá?",
        a: "We offer private transfers from El Dorado International Airport to your hotel 24/7. Your driver waits for you at the exit with a sign showing your name. The ride downtown takes 30 to 50 minutes depending on traffic.",
      },
      {
        q: "Is it safe to travel around Bogotá?",
        a: "Yes. With BogotourVip you travel with professional drivers and guides who know the city, in private vehicles and along the safest routes. We stay with you at all times so you can enjoy Bogotá with total peace of mind.",
      },
      {
        q: "How long is the Salt Cathedral of Zipaquirá tour?",
        a: "The Salt Cathedral of Zipaquirá tour lasts around 8 hours round trip from Bogotá, including transport, entrance to the cathedral and free time in Zipaquirá's historic center.",
      },
      {
        q: "Are tours available in English and other languages?",
        a: "Yes. We have guides who speak Spanish, English, French and Portuguese. When you book on WhatsApp, let us know your preferred language and we'll assign a matching guide.",
      },
      {
        q: "How do I book a tour or transfer?",
        a: "Booking is easy: message us on WhatsApp or fill out the quote form on this page. We reply within minutes with availability, itinerary and the final price with no obligation.",
      },
    ],
  },
  fr: {
    kicker: "Questions fréquentes",
    title: "Tout ce qu'il faut savoir avant votre tour à Bogotá",
    subtitle: "Nous répondons aux questions les plus courantes. Une autre question ? Écrivez-nous sur WhatsApp.",
    items: [
      {
        q: "Combien coûte un city tour privé à Bogotá ?",
        a: "Nos city tours privés à Bogotá débutent à 120 000 COP par personne et incluent un guide professionnel, le transport privé et les entrées aux principaux sites comme le Musée de l'Or et Monserrate. Le prix final dépend du nombre de passagers et des arrêts choisis.",
      },
      {
        q: "Comment aller de l'aéroport El Dorado au centre de Bogotá ?",
        a: "Nous proposons des transferts privés depuis l'aéroport international El Dorado jusqu'à votre hôtel, 24h/24. Votre chauffeur vous attend à la sortie avec une pancarte à votre nom. Le trajet vers le centre dure 30 à 50 minutes selon le trafic.",
      },
      {
        q: "Est-il sûr de visiter Bogotá ?",
        a: "Oui. Avec BogotourVip vous voyagez avec des chauffeurs et guides professionnels qui connaissent la ville, dans des véhicules privés et par les itinéraires les plus sûrs. Nous vous accompagnons à tout moment.",
      },
      {
        q: "Combien de temps dure le tour de la Cathédrale de Sel de Zipaquirá ?",
        a: "Le tour de la Cathédrale de Sel de Zipaquirá dure environ 8 heures aller-retour depuis Bogotá, transport, entrée à la cathédrale et temps libre dans le centre historique inclus.",
      },
      {
        q: "Les tours sont-ils disponibles en anglais et dans d'autres langues ?",
        a: "Oui. Nos guides parlent espagnol, anglais, français et portugais. Lors de votre réservation sur WhatsApp, indiquez votre langue préférée.",
      },
      {
        q: "Comment réserver un tour ou un transfert ?",
        a: "C'est simple : écrivez-nous sur WhatsApp ou remplissez le formulaire de devis de cette page. Nous répondons en quelques minutes avec la disponibilité, l'itinéraire et le prix final sans engagement.",
      },
    ],
  },
  de: {
    kicker: "Häufige Fragen",
    title: "Alles, was du vor deiner Bogotá-Tour wissen musst",
    subtitle: "Wir beantworten die häufigsten Fragen. Noch eine Frage? Schreib uns auf WhatsApp.",
    items: [
      {
        q: "Wie viel kostet eine private City-Tour in Bogotá?",
        a: "Unsere privaten City-Touren in Bogotá beginnen bei 120.000 COP pro Person und beinhalten einen professionellen Guide, privaten Transport und den Eintritt zu den wichtigsten Sehenswürdigkeiten wie dem Goldmuseum und Monserrate.",
      },
      {
        q: "Wie komme ich vom Flughafen El Dorado ins Zentrum von Bogotá?",
        a: "Wir bieten rund um die Uhr private Transfers vom internationalen Flughafen El Dorado zu deinem Hotel an. Dein Fahrer wartet am Ausgang mit einem Schild mit deinem Namen. Die Fahrt ins Zentrum dauert je nach Verkehr 30 bis 50 Minuten.",
      },
      {
        q: "Ist es sicher, in Bogotá zu reisen?",
        a: "Ja. Mit BogotourVip reist du mit professionellen Fahrern und Guides, die die Stadt kennen, in privaten Fahrzeugen und auf den sichersten Routen. Wir begleiten dich jederzeit.",
      },
      {
        q: "Wie lange dauert die Tour zur Salzkathedrale von Zipaquirá?",
        a: "Die Tour zur Salzkathedrale von Zipaquirá dauert etwa 8 Stunden hin und zurück ab Bogotá, inklusive Transport, Eintritt und Freizeit im historischen Zentrum von Zipaquirá.",
      },
      {
        q: "Sind die Touren auf Englisch und in anderen Sprachen verfügbar?",
        a: "Ja. Wir haben Guides, die Spanisch, Englisch, Französisch und Portugiesisch sprechen. Gib bei der Buchung auf WhatsApp deine bevorzugte Sprache an.",
      },
      {
        q: "Wie buche ich eine Tour oder einen Transfer?",
        a: "Ganz einfach: Schreib uns auf WhatsApp oder fülle das Angebotsformular auf dieser Seite aus. Wir antworten innerhalb von Minuten mit Verfügbarkeit, Route und Endpreis.",
      },
    ],
  },
  pt: {
    kicker: "Perguntas frequentes",
    title: "Tudo o que você precisa saber antes do seu tour em Bogotá",
    subtitle: "Respondemos às dúvidas mais comuns. Tem outra pergunta? Fale conosco no WhatsApp.",
    items: [
      {
        q: "Quanto custa um city tour privado em Bogotá?",
        a: "Nossos city tours privados em Bogotá começam a partir de 120.000 COP por pessoa e incluem guia profissional, transporte privado e entradas aos principais pontos como o Museu do Ouro e Monserrate.",
      },
      {
        q: "Como ir do Aeroporto El Dorado ao centro de Bogotá?",
        a: "Oferecemos traslados privados do Aeroporto Internacional El Dorado até o seu hotel 24 horas. O motorista espera você na saída com uma placa com seu nome. O trajeto ao centro leva de 30 a 50 minutos conforme o trânsito.",
      },
      {
        q: "É seguro fazer turismo em Bogotá?",
        a: "Sim. Com a BogotourVip você viaja com motoristas e guias profissionais que conhecem a cidade, em veículos privados e pelas rotas mais seguras. Acompanhamos você o tempo todo.",
      },
      {
        q: "Quanto dura o tour à Catedral de Sal de Zipaquirá?",
        a: "O tour à Catedral de Sal de Zipaquirá dura cerca de 8 horas ida e volta desde Bogotá, incluindo transporte, entrada à catedral e tempo livre no centro histórico de Zipaquirá.",
      },
      {
        q: "Os tours estão disponíveis em inglês e outros idiomas?",
        a: "Sim. Temos guias que falam espanhol, inglês, francês e português. Ao reservar no WhatsApp, informe seu idioma preferido.",
      },
      {
        q: "Como reservo um tour ou traslado?",
        a: "Reservar é fácil: fale conosco no WhatsApp ou preencha o formulário de cotação desta página. Respondemos em minutos com disponibilidade, itinerário e preço final sem compromisso.",
      },
    ],
  },
  it: {
    kicker: "Domande frequenti",
    title: "Tutto ciò che devi sapere prima del tuo tour a Bogotá",
    subtitle: "Rispondiamo alle domande più comuni. Hai un'altra domanda? Scrivici su WhatsApp.",
    items: [
      {
        q: "Quanto costa un city tour privato a Bogotá?",
        a: "I nostri city tour privati a Bogotá partono da 120.000 COP a persona e includono guida professionale, trasporto privato e ingressi ai siti principali come il Museo dell'Oro e Monserrate.",
      },
      {
        q: "Come arrivare dall'aeroporto El Dorado al centro di Bogotá?",
        a: "Offriamo transfer privati dall'aeroporto internazionale El Dorado al tuo hotel 24 ore su 24. L'autista ti aspetta all'uscita con un cartello con il tuo nome. Il tragitto verso il centro dura dai 30 ai 50 minuti a seconda del traffico.",
      },
      {
        q: "È sicuro fare turismo a Bogotá?",
        a: "Sì. Con BogotourVip viaggi con autisti e guide professionali che conoscono la città, in veicoli privati e lungo i percorsi più sicuri. Ti accompagniamo in ogni momento.",
      },
      {
        q: "Quanto dura il tour alla Cattedrale di Sale di Zipaquirá?",
        a: "Il tour alla Cattedrale di Sale di Zipaquirá dura circa 8 ore andata e ritorno da Bogotá, inclusi trasporto, ingresso alla cattedrale e tempo libero nel centro storico di Zipaquirá.",
      },
      {
        q: "I tour sono disponibili in inglese e altre lingue?",
        a: "Sì. Abbiamo guide che parlano spagnolo, inglese, francese e portoghese. Al momento della prenotazione su WhatsApp, indica la lingua preferita.",
      },
      {
        q: "Come prenoto un tour o un transfer?",
        a: "Prenotare è facile: scrivici su WhatsApp o compila il modulo di preventivo di questa pagina. Rispondiamo in pochi minuti con disponibilità, itinerario e prezzo finale senza impegno.",
      },
    ],
  },
  zh: {
    kicker: "常见问题",
    title: "波哥大之旅前你需要了解的一切",
    subtitle: "我们解答旅客最常见的问题。还有其他问题？通过 WhatsApp 联系我们。",
    items: [
      {
        q: "波哥大私人城市游多少钱？",
        a: "我们的波哥大私人城市游每人起价 120,000 哥伦比亚比索，包含专业导游、私人交通以及黄金博物馆和蒙塞拉特山等主要景点的门票。最终价格取决于人数和所选站点。",
      },
      {
        q: "如何从埃尔多拉多机场前往波哥大市中心？",
        a: "我们提供从埃尔多拉多国际机场到您酒店的 24 小时私人接送。司机会在出口举着写有您名字的牌子等候。到市中心的车程约为 30 至 50 分钟，视交通情况而定。",
      },
      {
        q: "在波哥大旅游安全吗？",
        a: "安全。使用 BogotourVip，您将与熟悉这座城市的专业司机和导游同行，乘坐私人车辆，走最安全的路线。我们全程陪同。",
      },
      {
        q: "锡帕基拉盐大教堂之旅需要多长时间？",
        a: "从波哥大出发的锡帕基拉盐大教堂往返之旅约需 8 小时，包含交通、大教堂门票以及在锡帕基拉历史中心的自由活动时间。",
      },
      {
        q: "旅游团是否提供英语和其他语言服务？",
        a: "是的。我们的导游会讲西班牙语、英语、法语和葡萄牙语。在 WhatsApp 预订时，请告知您偏好的语言。",
      },
      {
        q: "如何预订旅游或接送服务？",
        a: "预订很简单：通过 WhatsApp 联系我们，或填写本页的报价表。我们会在几分钟内回复空位、行程和最终价格，无需承诺。",
      },
    ],
  },
}

export function FaqSection({ language = "es" }: { language?: Lang }) {
  const t = copy[language] ?? copy.es
  const [open, setOpen] = useState<number | null>(0)

  // JSON-LD FAQPage: permite que Google muestre las preguntas desplegables en los resultados
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <section aria-labelledby="faq-title" className="bg-black py-16 sm:py-20 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="flex items-center gap-2 text-[#d4af37]">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-[0.2em]">{t.kicker}</span>
        </div>

        <h2
          id="faq-title"
          className="mt-3 text-pretty text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--playfair)" }}
        >
          {t.title}
        </h2>

        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-white/60">{t.subtitle}</p>

        <ul className="mt-9 flex flex-col gap-3">
          {t.items.map((item, i) => {
            const isOpen = open === i
            return (
              <li
                key={item.q}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#d4af37]/30"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-pretty text-base font-semibold text-white sm:text-lg">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#d4af37] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-relaxed text-white/70 sm:px-6 sm:pb-6">{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
