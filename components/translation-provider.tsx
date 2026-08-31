'use client'

import { useEffect, useState } from 'react'

type Language = 'es' | 'en' | 'fr' | 'pt'

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('selectedLanguage') as Language
    if (saved) {
      setLanguage(saved)
    }
    setMounted(true)
  }, [])

  if (!mounted) return <>{children}</>

  return <>{children}</>
}
