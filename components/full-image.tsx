import Image from "next/image"
import { cn } from "@/lib/utils"

interface FullImageProps {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  quality?: number
  className?: string
}

/**
 * Shows the whole photo (object-contain) and fills the leftover space with a
 * blurred copy of the same photo, so nothing is cropped and there are no empty bars.
 */
export function FullImage({ src, alt, sizes, priority, quality = 75, className }: FullImageProps) {
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="64px"
        quality={40}
        className="scale-125 object-cover blur-2xl"
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={cn("object-contain", className)}
      />
    </>
  )
}
