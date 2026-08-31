"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom" | "blur"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

const animations = {
  "fade-up": {
    hidden: { opacity: 0, transform: "translateY(40px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-down": {
    hidden: { opacity: 0, transform: "translateY(-40px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-left": {
    hidden: { opacity: 0, transform: "translateX(-40px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    hidden: { opacity: 0, transform: "translateX(40px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  zoom: {
    hidden: { opacity: 0, transform: "scale(0.9)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0)" },
  },
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasAnimated.current) return
          setIsVisible(true)
          hasAnimated.current = true
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once])

  const anim = animations[animation]
  const style = isVisible ? anim.visible : anim.hidden

  return (
    <div
      ref={ref}
      className={`gpu-accelerated ${className}`}
      style={{
        ...style,
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 100,
  threshold = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ["--stagger-delay" as string]: `${staggerDelay}ms`,
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              className="gpu-accelerated"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transitionProperty: "opacity, transform",
                transitionDuration: "600ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: isVisible ? `${i * staggerDelay}ms` : "0ms",
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
