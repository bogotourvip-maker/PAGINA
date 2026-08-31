"use client"

import { useEffect, useState, useCallback } from "react"

interface ParallaxOptions {
  speed?: number
  direction?: "up" | "down"
  disabled?: boolean
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = "up", disabled = false } = options
  const [offset, setOffset] = useState(0)

  const handleScroll = useCallback(() => {
    if (disabled) return
    const scrollY = window.scrollY
    const multiplier = direction === "up" ? -1 : 1
    setOffset(scrollY * speed * multiplier)
  }, [speed, direction, disabled])

  useEffect(() => {
    if (disabled) return
    
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [handleScroll, disabled])

  return offset
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      setProgress(Math.min(scrolled / scrollHeight, 1))
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    updateProgress()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return progress
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let ticking = false
    
    const updatePosition = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setPosition({
            x: (e.clientX / window.innerWidth - 0.5) * 2,
            y: (e.clientY / window.innerHeight - 0.5) * 2,
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("mousemove", updatePosition, { passive: true })
    return () => window.removeEventListener("mousemove", updatePosition)
  }, [])

  return position
}
