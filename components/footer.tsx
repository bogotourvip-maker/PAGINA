"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react"

const WHATSAPP_LINK =
  "https://wa.me/573108677635?text=Hola%20BogotourVIP%2C%20quiero%20cotizar%20tu%20servicio.%20%C2%BFMe%20pueden%20ayudar%20con%20la%20informacion%20y%20el%20precio%3F"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { label: "Tours Privados", href: "#servicios" },
    { label: "Transfer Aeropuerto", href: "#servicios" },
    { label: "Servicio Ejecutivo", href: "#servicios" },
    { label: "Eventos Especiales", href: "#servicios" },
    { label: "Tour Villa de Leyva", href: "#servicios" },
    { label: "Tour Guatavita", href: "#servicios" },
  ]

  const quickLinks = [
    { label: "Inicio", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Blog", href: "/blog" },
    { label: "Galeria", href: "/#galeria" },
    { label: "Cotizacion", href: "/#cotizacion" },
  ]

  return (
    <footer className="bg-black text-gray-300">
      {/* Big CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
            Comienza a explorar<br />
            <span className="text-white/50">Colombia hoy.</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Unete a cientos de viajeros que descubren Colombia con guias expertos y servicio premium.
          </p>
          <a
            href="#cotizacion"
            className="inline-flex items-center justify-center bg-white text-black font-medium px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            SOLICITAR COTIZACION
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-bogotourvip.jpg"
                alt="BogotourVIP"
                width={48}
                height={48}
                className="rounded-lg"
                quality={80}
                loading="lazy"
              />
              <div>
                <p className="text-white font-bold text-lg leading-tight">BogotourVIP</p>
                <p className="text-xs text-[#d4af37]">Transporte Turistico Premium</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Servicio de transporte turistico premium en Bogota. Comodidad, seguridad y experiencias inolvidables en cada viaje.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/bogotour_vip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#d4af37] flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/bogotourvip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#d4af37] flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Servicios</h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-[#d4af37] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navegacion</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-[#d4af37] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-[#d4af37] transition-colors"
                  >
                    Escríbenos por WhatsApp
                  </a>
                  <p className="text-xs text-gray-500">WhatsApp disponible 24/7</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@bogotourvip.com" className="text-sm hover:text-[#d4af37] transition-colors">
                  info@bogotourvip.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <span className="text-sm">Bogota, Colombia</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">24 horas / 7 dias</p>
                  <p className="text-xs text-gray-500">Los 365 dias del ano</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            {currentYear} BogotourVIP. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500">
            Bogota, Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
