"use client"

import { useScrollProgress } from "@/hooks/use-parallax"

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#d4af37] via-[#f5d76e] to-[#d4af37] origin-left gpu-accelerated"
        style={{
          transform: `scaleX(${progress})`,
          transition: "transform 0.1s ease-out",
        }}
      />
    </div>
  )
}
