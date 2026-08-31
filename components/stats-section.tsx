"use client"

import { useEffect, useState, useRef } from "react"
import { Car, MapPin, Star, Users } from "lucide-react"

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!start) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start])
  
  return count
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  
  const stats = [
    { icon: Users, value: 5000, suffix: "+", label: "Clientes Satisfechos" },
    { icon: MapPin, value: 50, suffix: "+", label: "Destinos en Colombia" },
    { icon: Car, value: 15, suffix: "", label: "Vehiculos Premium" },
    { icon: Star, value: 12, suffix: "", label: "Anos de Experiencia" },
  ]
  
  const counts = stats.map(stat => useCountUp(stat.value, 2000, isVisible))

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>
      
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "0.6s",
                transitionDelay: `${index * 150}ms`,
                transitionTimingFunction: "ease-out",
              }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#d4af37]/10 mb-4 group-hover:bg-[#d4af37]/20 transition-colors">
                <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#d4af37]" />
              </div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                {counts[index]}{stat.suffix}
              </p>
              <p className="text-sm sm:text-base text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
