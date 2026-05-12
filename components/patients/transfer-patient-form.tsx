'use client'

import React from "react"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ArrowRightLeft } from 'lucide-react'
import type { Patient, Unit } from '@/lib/types'
import type { User } from '@supabase/supabase-js'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface TransferPatientFormProps {
  patient: Patient
  units: Unit[]
  user: User
}

export function TransferPatientForm({ patient, units, user }: TransferPatientFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    toUnitId: '',
    bedNumber: '',
    reason: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!formData.toUnitId) {
        throw new Error('Debe seleccionar una unidad de destino')
      }

      if (!formData.reason) {
        throw new Error('Debe indicar el motivo del traslado')
      }

      const currentStay = patient.current_stay
      const currentAdmission = patient.current_admission

      if (!currentAdmission) {
        throw new Error('El paciente no tiene una admisión activa')
      }

      // 1. Cerrar la estancia actual si existe
      if (currentStay) {
        const { error: closeStayError } = await supabase
          .from('unit_stays')
          .update({
            exit_date: new Date().toISOString(),
            status: 'completed',
          })
          .eq('id', currentStay.id)

        if (closeStayError) throw closeStayError

        // Incrementar camas disponibles en la unidad anterior
        const previousUnit = units.find(u => u.id === currentStay.unit_id)
        if (previousUnit) {
          await supabase
            .from('hospital_units')
            .update({ available_beds: previousUnit.available_beds + 1 })
            .eq('id', currentStay.unit_id)
        }
      }

      // 2. Crear nueva estancia en la unidad destino
      const { error: newStayError } = await supabase
        .from('unit_stays')
        .insert({
          admission_id: currentAdmission.id,
          patient_id: patient.id,
          unit_id: formData.toUnitId,
          bed_number: formData.bedNumber || null,
          status: 'active',
        })

      if (newStayError) throw newStayError

      // 3. Crear el registro de traslado
      const { error: transferError } = await supabase.from('unit_transfers').insert({
        admission_id: currentAdmission.id,
        patient_id: patient.id,
        from_unit_id: currentStay?.unit_id || null,
        to_unit_id: formData.toUnitId,
        transfer_reason: formData.reason,
        bed_number: formData.bedNumber || null,
        notes: formData.notes || null,
      })

      if (transferError) throw transferError

      // 4. Decrementar camas disponibles en la nueva unidad
      const newUnit = units.find(u => u.id === formData.toUnitId)
      if (newUnit && newUnit.available_beds > 0) {
        await supabase
          .from('hospital_units')
          .update({ available_beds: newUnit.available_beds - 1 })
          .eq('id', formData.toUnitId)
      }

      router.push(`/pacientes/${patient.id}`)
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al trasladar el paciente')
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const selectedUnit = units.find(u => u.id === formData.toUnitId)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link href={`/pacientes/${patient.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Paciente
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-2xl">Trasladar Paciente</CardTitle>
                <CardDescription>
                  {patient.first_name} {patient.last_name} - ID: {patient.identification}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Ubicación Actual */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Ubicación Actual</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Unidad</p>
                  <p className="font-medium">{patient.current_stay?.unit?.name || patient.unit?.name || 'Sin asignar'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cama</p>
                  <p className="font-medium">{patient.current_stay?.bed_number || patient.current_bed_number || 'N/A'}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="toUnitId">Unidad de Destino *</Label>
                  <select
                    id="toUnitId"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.toUnitId}
                    onChange={(e) => updateFormData('toUnitId', e.target.value)}
                    required
                  >
                    <option value="">Seleccionar unidad...</option>
                    {units
                      .filter(u => u.id !== patient.current_unit_id)
                      .map(unit => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name} - {unit.available_beds} camas disponibles
                        </option>
                      ))}
                  </select>
                  {selectedUnit && selectedUnit.available_beds === 0 && (
                    <p className="text-sm text-destructive">
                      Advertencia: Esta unidad no tiene camas disponibles
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bedNumber">Número de Cama en la Nueva Unidad</Label>
                  <Input
                    id="bedNumber"
                    placeholder="Ej: 201, B-10"
                    value={formData.bedNumber}
                    onChange={(e) => updateFormData('bedNumber', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="reason">Motivo del Traslado</Label>
                  <Textarea
                    id="reason"
                    placeholder="Describa el motivo del traslado"
                    value={formData.reason}
                    onChange={(e) => updateFormData('reason', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notas Adicionales</Label>
                  <Textarea
                    id="notes"
                    placeholder="Información adicional relevante para el traslado"
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Información del Traslado</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Se actualizará la ubicación del paciente automáticamente</li>
                  <li>• Se registrará el tiempo de permanencia en la unidad actual</li>
                  <li>• Se ajustará la disponibilidad de camas en ambas unidades</li>
                  <li>• El traslado será autorizado por: {user.user_metadata?.full_name}</li>
                </ul>
              </div>

              <div className="flex gap-4 justify-end pt-4">
                <Link href={`/pacientes/${patient.id}`}>
                  <Button type="button" variant="outline" disabled={isLoading}>
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Trasladando...' : 'Confirmar Traslado'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
