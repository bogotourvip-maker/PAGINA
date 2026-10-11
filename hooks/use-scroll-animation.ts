"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", triggerOnce = true } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    // IntersectionObserver can miss elements after instant jumps (anchor links,
    // restored scroll), leaving content hidden. Fall back to a rect check.
    const isInViewport = () => {
      const rect = element.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const reveal = () => {
      setIsVisible(true)
      if (triggerOnce) cleanup()
    }

    const onScroll = () => {
      if (isInViewport()) reveal()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    function cleanup() {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }

    observer.observe(element)
    if (triggerOnce) {
      window.addEventListener("scroll", onScroll, { passive: true })
      if (isInViewport()) reveal()
    }
    return cleanup
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

// Returns the real value immediately (SSR, mobile and desktop) so counters never show 0.
export function useCountUp(target: number, _duration?: number, _isVisible?: boolean) {
  return target
}

export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  const handleScroll = useCallback(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const scrolled = window.innerHeight - rect.top
    setOffset(scrolled * speed)
  }, [speed])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return { ref, offset }
}
