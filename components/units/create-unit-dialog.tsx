'use client'

import React from "react"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

interface CreateUnitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateUnitDialog({ open, onOpenChange }: CreateUnitDialogProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('urgencias')
  const [totalBeds, setTotalBeds] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const beds = Number.parseInt(totalBeds)
      if (Number.isNaN(beds) || beds <= 0) {
        throw new Error('El número de camas debe ser mayor a 0')
      }

      const { error: insertError } = await supabase.from('units').insert({
        name,
        type,
        total_beds: beds,
        available_beds: beds, // Todas las camas están disponibles inicialmente
      })

      if (insertError) throw insertError

      // Resetear formulario
      setName('')
      setType('urgencias')
      setTotalBeds('')
      onOpenChange(false)
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear la unidad')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Unidad</DialogTitle>
          <DialogDescription>
            Registra una nueva unidad hospitalaria en el sistema
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre de la Unidad</Label>
              <Input
                id="name"
                placeholder="Ej: Urgencias Adultos"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Unidad</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="urgencias">Urgencias</option>
                <option value="observacion">Observación</option>
                <option value="hospitalizacion">Hospitalización</option>
                <option value="intermedios">Cuidados Intermedios</option>
                <option value="uci">Cuidados Intensivos (UCI)</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="totalBeds">Número de Camas</Label>
              <Input
                id="totalBeds"
                type="number"
                min="1"
                placeholder="Ej: 20"
                value={totalBeds}
                onChange={(e) => setTotalBeds(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creando...' : 'Crear Unidad'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
