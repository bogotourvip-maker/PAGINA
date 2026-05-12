'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Search, X, Plus } from 'lucide-react'
import { 
  searchCIE10, 
  searchCUPS, 
  searchCUMS, 
  type CIE10Code, 
  type CUPSCode, 
  type CUMSCode 
} from '@/lib/medical-codes'

type CodeType = 'CIE10' | 'CUPS' | 'CUMS'

interface SelectedCode {
  code: string
  description: string
}

interface CodeSearchInputProps {
  type: CodeType
  label: string
  placeholder?: string
  multiple?: boolean
  value?: SelectedCode[]
  onChange?: (codes: SelectedCode[]) => void
  singleValue?: SelectedCode | null
  onSingleChange?: (code: SelectedCode | null) => void
}

export function CodeSearchInput({
  type,
  label,
  placeholder,
  multiple = false,
  value = [],
  onChange,
  singleValue,
  onSingleChange,
}: CodeSearchInputProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<(CIE10Code | CUPSCode | CUMSCode)[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCodes, setSelectedCodes] = useState<SelectedCode[]>(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle search
  useEffect(() => {
    if (query.length >= 2) {
      let searchResults: (CIE10Code | CUPSCode | CUMSCode)[] = []
      
      switch (type) {
        case 'CIE10':
          searchResults = searchCIE10(query)
          break
        case 'CUPS':
          searchResults = searchCUPS(query)
          break
        case 'CUMS':
          searchResults = searchCUMS(query)
          break
      }
      
      setResults(searchResults)
      setIsOpen(searchResults.length > 0)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, type])

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sync with external value
  useEffect(() => {
    if (multiple) {
      setSelectedCodes(value)
    }
  }, [value, multiple])

  const handleSelect = (code: CIE10Code | CUPSCode | CUMSCode) => {
    const newCode: SelectedCode = {
      code: code.code,
      description: code.description,
    }

    if (multiple) {
      // Check if already selected
      if (!selectedCodes.find(c => c.code === newCode.code)) {
        const newCodes = [...selectedCodes, newCode]
        setSelectedCodes(newCodes)
        onChange?.(newCodes)
      }
    } else {
      onSingleChange?.(newCode)
    }
    
    setQuery('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleRemove = (codeToRemove: string) => {
    if (multiple) {
      const newCodes = selectedCodes.filter(c => c.code !== codeToRemove)
      setSelectedCodes(newCodes)
      onChange?.(newCodes)
    } else {
      onSingleChange?.(null)
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case 'CIE10':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'CUPS':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'CUMS':
        return 'bg-purple-100 text-purple-800 border-purple-200'
    }
  }

  const getTypeLabel = () => {
    switch (type) {
      case 'CIE10':
        return 'Diagnóstico'
      case 'CUPS':
        return 'Procedimiento'
      case 'CUMS':
        return 'Medicamento'
    }
  }

  return (
    <div className="grid gap-2" ref={containerRef}>
      <Label>{label}</Label>
      
      {/* Selected codes display */}
      {multiple && selectedCodes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedCodes.map((code) => (
            <Badge 
              key={code.code} 
              variant="outline" 
              className={`${getTypeColor()} pr-1 flex items-center gap-1`}
            >
              <span className="font-mono text-xs">{code.code}</span>
              <span className="mx-1">-</span>
              <span className="text-xs truncate max-w-[200px]">{code.description}</span>
              <button
                type="button"
                onClick={() => handleRemove(code.code)}
                className="ml-1 hover:bg-black/10 rounded p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Single value display */}
      {!multiple && singleValue && (
        <div className="flex items-center gap-2 mb-2">
          <Badge 
            variant="outline" 
            className={`${getTypeColor()} pr-1 flex items-center gap-1`}
          >
            <span className="font-mono text-xs">{singleValue.code}</span>
            <span className="mx-1">-</span>
            <span className="text-xs">{singleValue.description}</span>
            <button
              type="button"
              onClick={() => handleRemove(singleValue.code)}
              className="ml-1 hover:bg-black/10 rounded p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder || `Buscar ${getTypeLabel().toLowerCase()} por código o descripción...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true)
          }}
          className="pl-10"
        />
        
        {/* Results dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-64 overflow-y-auto">
            {results.map((result) => (
              <button
                key={result.code}
                type="button"
                onClick={() => handleSelect(result)}
                className="w-full px-3 py-2 text-left hover:bg-accent flex items-start gap-2 border-b last:border-b-0"
              >
                <Plus className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-primary">
                      {result.code}
                    </span>
                    {'category' in result && result.category && (
                      <Badge variant="secondary" className="text-xs">
                        {result.category}
                      </Badge>
                    )}
                    {'presentation' in result && result.presentation && (
                      <Badge variant="secondary" className="text-xs">
                        {result.presentation}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {result.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground">
        {type === 'CIE10' && 'Clasificación Internacional de Enfermedades - 10a revisión'}
        {type === 'CUPS' && 'Clasificación Única de Procedimientos en Salud'}
        {type === 'CUMS' && 'Código Único de Medicamentos'}
      </p>
    </div>
  )
}
