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
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { CodeSearchInput } from '@/components/medical/code-search-input'

interface CreateMedicalRecordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientId: string
  userId: string
}

export function CreateMedicalRecordDialog({
  open,
  onOpenChange,
  patientId,
  userId,
}: CreateMedicalRecordDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    chiefComplaint: '',
    historyPresentIllness: '',
    pastMedicalHistory: '',
    medicationsCodes: [] as { code: string; description: string }[],
    medicationsNotes: '',
    allergies: '',
    physicalExamination: '',
    diagnosisPrimary: null as { code: string; description: string } | null,
    diagnosisSecondary: [] as { code: string; description: string }[],
    treatmentPlan: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Preparar diagnóstico como texto
      const diagnosisText = formData.diagnosisPrimary 
        ? `${formData.diagnosisPrimary.code} - ${formData.diagnosisPrimary.description}` +
          (formData.diagnosisSecondary.length > 0 
            ? '\nSecundarios: ' + formData.diagnosisSecondary.map(d => `${d.code} - ${d.description}`).join(', ')
            : '')
        : null

      // Preparar medicamentos como texto
      const medicationsText = formData.medicationsCodes.length > 0
        ? formData.medicationsCodes.map(m => `${m.code} - ${m.description}`).join('\n') +
          (formData.medicationsNotes ? '\n\nNotas: ' + formData.medicationsNotes : '')
        : formData.medicationsNotes || null

      const { error: insertError } = await supabase.from('medical_records').insert({
        patient_id: patientId,
        created_by: userId,
        record_date: new Date().toISOString(),
        chief_complaint: formData.chiefComplaint || null,
        history_present_illness: formData.historyPresentIllness || null,
        past_medical_history: formData.pastMedicalHistory || null,
        medications: medicationsText,
        allergies: formData.allergies || null,
        physical_examination: formData.physicalExamination || null,
        diagnosis: diagnosisText,
        treatment_plan: formData.treatmentPlan || null,
        notes: JSON.stringify({
          text: formData.notes,
          diagnosisCodes: {
            primary: formData.diagnosisPrimary,
            secondary: formData.diagnosisSecondary,
          },
          medicationCodes: formData.medicationsCodes,
        }),
      })

      if (insertError) throw insertError

      // Resetear formulario
      setFormData({
        chiefComplaint: '',
        historyPresentIllness: '',
        pastMedicalHistory: '',
        medicationsCodes: [],
        medicationsNotes: '',
        allergies: '',
        physicalExamination: '',
        diagnosisPrimary: null,
        diagnosisSecondary: [],
        treatmentPlan: '',
        notes: '',
      })
      onOpenChange(false)
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear el registro médico')
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Entrada de Historia Clínica</DialogTitle>
          <DialogDescription>
            Registra información médica detallada del paciente
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="chiefComplaint">Motivo de Consulta</Label>
              <Input
                id="chiefComplaint"
                placeholder="Motivo principal de la consulta"
                value={formData.chiefComplaint}
                onChange={(e) => updateFormData('chiefComplaint', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="historyPresentIllness">Historia de la Enfermedad Actual</Label>
              <Textarea
                id="historyPresentIllness"
                placeholder="Describe la evolución de los síntomas actuales"
                value={formData.historyPresentIllness}
                onChange={(e) => updateFormData('historyPresentIllness', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="pastMedicalHistory">Antecedentes Médicos</Label>
              <Textarea
                id="pastMedicalHistory"
                placeholder="Enfermedades previas, cirugías, hospitalizaciones"
                value={formData.pastMedicalHistory}
                onChange={(e) => updateFormData('pastMedicalHistory', e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <CodeSearchInput
                type="CUMS"
                label="Medicamentos Actuales (CUMS)"
                placeholder="Buscar medicamentos por código o nombre..."
                multiple
                value={formData.medicationsCodes}
                onChange={(codes) => setFormData(prev => ({ ...prev, medicationsCodes: codes }))}
              />
              <Textarea
                id="medicationsNotes"
                placeholder="Notas adicionales sobre medicamentos (dosis, frecuencia, etc.)"
                value={formData.medicationsNotes}
                onChange={(e) => updateFormData('medicationsNotes', e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="allergies">Alergias</Label>
              <Textarea
                id="allergies"
                placeholder="Alergias a medicamentos, alimentos u otros"
                value={formData.allergies}
                onChange={(e) => updateFormData('allergies', e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="physicalExamination">Examen Físico</Label>
              <Textarea
                id="physicalExamination"
                placeholder="Hallazgos del examen físico"
                value={formData.physicalExamination}
                onChange={(e) => updateFormData('physicalExamination', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <CodeSearchInput
                type="CIE10"
                label="Diagnóstico Principal (CIE-10)"
                placeholder="Buscar diagnóstico por código o descripción..."
                singleValue={formData.diagnosisPrimary}
                onSingleChange={(code) => setFormData(prev => ({ ...prev, diagnosisPrimary: code }))}
              />
            </div>

            <div className="grid gap-2">
              <CodeSearchInput
                type="CIE10"
                label="Diagnósticos Secundarios (CIE-10)"
                placeholder="Buscar diagnósticos adicionales..."
                multiple
                value={formData.diagnosisSecondary}
                onChange={(codes) => setFormData(prev => ({ ...prev, diagnosisSecondary: codes }))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="treatmentPlan">Plan de Tratamiento</Label>
              <Textarea
                id="treatmentPlan"
                placeholder="Tratamientos, procedimientos y seguimiento"
                value={formData.treatmentPlan}
                onChange={(e) => updateFormData('treatmentPlan', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Cualquier información adicional relevante"
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                rows={2}
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
              {isLoading ? 'Guardando...' : 'Guardar Registro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
