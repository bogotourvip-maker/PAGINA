"use client"

import type React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface RevealProps {
  children: React.ReactNode
  /** Delay in ms before the entrance animation starts */
  delay?: number
  /** Direction the element eases in from */
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
  as?: "div" | "section"
  id?: string
}

const hiddenTransforms: Record<NonNullable<RevealProps["direction"]>, string> = {
  up: "translateY(32px)",
  down: "translateY(-32px)",
  left: "translateX(32px)",
  right: "translateX(-32px)",
  none: "none",
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as = "div",
  id,
}: RevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.12, rootMargin: "0px 0px -80px 0px" })
  const Tag = as

  return (
    <Tag
      // @ts-expect-error - ref typing differs between div/section but both are HTMLElement
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : hiddenTransforms[direction],
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  )
}
