'use client'

import React from "react"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface CreateSpecialtyNoteDialogProps {
  isOpen: boolean
  onClose: () => void
  patientId: string
  onSuccess: () => void
}

export function CreateSpecialtyNoteDialog({
  isOpen,
  onClose,
  patientId,
  onSuccess,
}: CreateSpecialtyNoteDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    specialtyType: 'medico',
    title: '',
    description: '',
    findings: '',
    treatment: '',
    recommendations: '',
  })

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error('No autenticado')

      const { error: insertError } = await supabase.from('specialty_notes').insert({
        patient_id: patientId,
        specialty_type: formData.specialtyType,
        title: formData.title,
        description: formData.description,
        findings: formData.findings || null,
        treatment: formData.treatment || null,
        recommendations: formData.recommendations || null,
        created_by: user.id,
      })

      if (insertError) throw insertError

      onSuccess()
      setFormData({
        specialtyType: 'medico',
        title: '',
        description: '',
        findings: '',
        treatment: '',
        recommendations: '',
      })
    } catch (err) {
      console.error('Error creating note:', err)
      setError(err instanceof Error ? err.message : 'Error al crear la nota')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Nota de Especialidad</DialogTitle>
          <DialogDescription>
            Registra una nueva nota médica o de especialidad para el paciente
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="specialtyType">Tipo de Especialidad</Label>
              <select
                id="specialtyType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.specialtyType}
                onChange={(e) =>
                  setFormData({ ...formData, specialtyType: e.target.value })
                }
                required
              >
                <option value="medico">Médico</option>
                <option value="medicina_general">Medicina General</option>
                <option value="enfermeria">Enfermería</option>
                <option value="auxiliar_enfermeria">Auxiliar de Enfermería</option>
                <option value="terapia_fisica">Terapia Física</option>
                <option value="terapia_ocupacional">Terapia Ocupacional</option>
                <option value="terapia_respiratoria">Terapia Respiratoria</option>
                <option value="cardiologia">Cardiología</option>
                <option value="neurologia">Neurología</option>
                <option value="cirugia">Cirugía</option>
                <option value="pediatria">Pediatría</option>
                <option value="psiquiatria">Psiquiatría</option>
                <option value="nutricion">Nutrición</option>
                <option value="otra">Otra</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Título de la Nota</Label>
              <Input
                id="title"
                placeholder="Ej: Evolución médica, Valoración inicial..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción / Nota Principal</Label>
            <Textarea
              id="description"
              placeholder="Descripción detallada de la valoración, evolución o intervención..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="findings">Hallazgos (Opcional)</Label>
            <Textarea
              id="findings"
              placeholder="Hallazgos relevantes encontrados durante la valoración..."
              value={formData.findings}
              onChange={(e) =>
                setFormData({ ...formData, findings: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="treatment">Tratamiento / Plan (Opcional)</Label>
            <Textarea
              id="treatment"
              placeholder="Plan de tratamiento, intervenciones realizadas o planeadas..."
              value={formData.treatment}
              onChange={(e) =>
                setFormData({ ...formData, treatment: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendations">Recomendaciones (Opcional)</Label>
            <Textarea
              id="recommendations"
              placeholder="Recomendaciones para el paciente, familiares o equipo médico..."
              value={formData.recommendations}
              onChange={(e) =>
                setFormData({ ...formData, recommendations: e.target.value })
              }
              rows={3}
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar Nota'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
