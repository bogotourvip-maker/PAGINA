import Image from "next/image"

export function HeroMedia({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-black"
      style={{ height: "clamp(320px, 62svh, 640px)" }}
    >
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        quality={20}
        sizes="25vw"
        className="object-cover"
        style={{ filter: "blur(32px)", transform: "scale(1.15)", opacity: 0.5 }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={75}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain"
      />
    </div>
  )
}
