'use client'

import { useState } from 'react'
import { ChevronUp } from 'lucide-react'

type Language = 'es' | 'en' | 'fr' | 'pt'

interface LanguageOption {
  code: Language
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: 'es', name: 'Español', flag: '🇨🇴' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
]

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('es')

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang)
    setIsOpen(false)
    // Guardar en localStorage
    localStorage.setItem('selectedLanguage', lang)
    // Aquí iría la lógica de cambio de idioma
    // dispatch(setLanguage(lang)) - si usas Redux
    window.location.reload() // Recarga la página
  }

  const currentLanguage = languages.find(l => l.code === selectedLanguage)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white transition-colors"
        title="Cambiar idioma"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
        <ChevronUp 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-white shadow-lg rounded-lg overflow-hidden border border-border z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedLanguage === lang.code
                  ? 'bg-primary text-white'
                  : 'text-foreground hover:bg-muted/50'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
