"use client"

import type React from "react"
import Link from "next/link"

const ONE_YEAR = 60 * 60 * 24 * 365

export function rememberLanguage(lang: string) {
  try {
    localStorage.setItem("preferredLanguage", lang)
  } catch {}
  document.cookie = `preferredLang=${lang}; path=/; max-age=${ONE_YEAR}; samesite=lax`
}

interface LangToggleProps {
  current: string
  esHref?: string
  enHref?: string
  onSelect?: (lang: "es" | "en") => void
}

const OPTIONS = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
] as const

export function LangToggle({ current, esHref = "/", enHref = "/en", onSelect }: LangToggleProps) {
  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="flex items-center rounded-full border border-white/25 bg-white/10 p-0.5 text-xs font-semibold tracking-wide"
    >
      {OPTIONS.map((option) => {
        const active = current === option.code
        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          rememberLanguage(option.code)
          if (onSelect) {
            e.preventDefault()
            onSelect(option.code)
          }
        }
        return (
          <Link
            key={option.code}
            href={option.code === "es" ? esHref : enHref}
            hrefLang={option.code}
            lang={option.code}
            onClick={handleClick}
            aria-current={active ? "true" : undefined}
            title={option.name}
            className={`rounded-full px-3 py-1.5 transition-colors duration-200 ${
              active ? "bg-white text-black" : "text-white/80 hover:text-white"
            }`}
          >
            <span aria-hidden="true">{option.label}</span>
            <span className="sr-only">{option.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
