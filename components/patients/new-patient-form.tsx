'use client'

import React from "react"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft } from 'lucide-react'
import type { Unit } from '@/lib/types'
import type { User } from '@supabase/supabase-js'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface NewPatientFormProps {
  units: Unit[]
  user: User
}

export function NewPatientForm({ units, user }: NewPatientFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    // Datos del paciente
    documentType: 'CC',
    documentNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'M',
    bloodType: '',
    phone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    address: '',
    city: '',
    insuranceProvider: '',
    insuranceNumber: '',
    allergies: '',
    chronicConditions: '',
    currentMedications: '',
    // Datos de la admisión
    admissionReason: '',
    admissionDiagnosis: '',
    // Datos de ubicación
    unitId: '',
    bedNumber: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Validaciones
      if (!formData.admissionReason) {
        throw new Error('El motivo de ingreso es obligatorio')
      }
      if (!formData.unitId) {
        throw new Error('Debe seleccionar una unidad para el paciente')
      }

      // 1. Insertar paciente
      const { data: patient, error: patientError } = await supabase
        .from('patients')
        .insert({
          document_type: formData.documentType,
          document_number: formData.documentNumber,
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          blood_type: formData.bloodType || null,
          phone: formData.phone || null,
          emergency_contact_name: formData.emergencyContactName || null,
          emergency_contact_phone: formData.emergencyContactPhone || null,
          address: formData.address || null,
          city: formData.city || null,
          insurance_provider: formData.insuranceProvider || null,
          insurance_number: formData.insuranceNumber || null,
          allergies: formData.allergies || null,
          chronic_conditions: formData.chronicConditions || null,
          current_medications: formData.currentMedications || null,
        })
        .select()
        .single()

      if (patientError) throw patientError

      // 2. Crear admisión
      const { data: admission, error: admissionError } = await supabase
        .from('admissions')
        .insert({
          patient_id: patient.id,
          admission_reason: formData.admissionReason,
          admission_diagnosis: formData.admissionDiagnosis || null,
          status: 'active',
        })
        .select()
        .single()

      if (admissionError) throw admissionError

      // 3. Crear estancia en unidad
      const { error: stayError } = await supabase
        .from('unit_stays')
        .insert({
          admission_id: admission.id,
          patient_id: patient.id,
          unit_id: formData.unitId,
          bed_number: formData.bedNumber || null,
          status: 'active',
        })

      if (stayError) throw stayError

      // 4. Crear registro de traslado inicial
      const { error: transferError } = await supabase
        .from('unit_transfers')
        .insert({
          admission_id: admission.id,
          patient_id: patient.id,
          to_unit_id: formData.unitId,
          transfer_reason: 'Ingreso inicial',
          bed_number: formData.bedNumber || null,
          notes: formData.admissionReason,
        })

      if (transferError) throw transferError

      // 5. Actualizar camas disponibles en la unidad (decrementar)
      const selectedUnit = units.find(u => u.id === formData.unitId)
      if (selectedUnit && selectedUnit.available_beds > 0) {
        await supabase
          .from('hospital_units')
          .update({ available_beds: selectedUnit.available_beds - 1 })
          .eq('id', formData.unitId)
      }

      router.push('/pacientes')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrar el paciente')
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/pacientes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Pacientes
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Registrar Nuevo Paciente</CardTitle>
            <CardDescription>
              Completa la información del paciente para registrarlo en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información Personal */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="documentType">Tipo de Documento *</Label>
                    <select
                      id="documentType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.documentType}
                      onChange={(e) => updateFormData('documentType', e.target.value)}
                      required
                    >
                      <option value="CC">Cédula de Ciudadanía</option>
                      <option value="TI">Tarjeta de Identidad</option>
                      <option value="CE">Cédula de Extranjería</option>
                      <option value="RC">Registro Civil</option>
                      <option value="PA">Pasaporte</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="documentNumber">Número de Documento *</Label>
                    <Input
                      id="documentNumber"
                      placeholder="Número de documento"
                      value={formData.documentNumber}
                      onChange={(e) => updateFormData('documentNumber', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="firstName">Nombres *</Label>
                    <Input
                      id="firstName"
                      placeholder="Nombres del paciente"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Apellidos *</Label>
                    <Input
                      id="lastName"
                      placeholder="Apellidos del paciente"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="dateOfBirth">Fecha de Nacimiento *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="gender">Género *</Label>
                    <select
                      id="gender"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.gender}
                      onChange={(e) => updateFormData('gender', e.target.value)}
                      required
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bloodType">Tipo de Sangre</Label>
                    <select
                      id="bloodType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.bloodType}
                      onChange={(e) => updateFormData('bloodType', e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Número de teléfono"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Contacto y Ubicación */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contacto y Ubicación</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="emergencyContactName">Contacto de Emergencia</Label>
                    <Input
                      id="emergencyContactName"
                      placeholder="Nombre completo"
                      value={formData.emergencyContactName}
                      onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="emergencyContactPhone">Teléfono de Emergencia</Label>
                    <Input
                      id="emergencyContactPhone"
                      type="tel"
                      placeholder="Número de teléfono"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => updateFormData('emergencyContactPhone', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      placeholder="Dirección de residencia"
                      value={formData.address}
                      onChange={(e) => updateFormData('address', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      placeholder="Ciudad"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Información de Seguro */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Información de Seguro</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="insuranceProvider">EPS / Aseguradora</Label>
                    <Input
                      id="insuranceProvider"
                      placeholder="Nombre de la EPS o aseguradora"
                      value={formData.insuranceProvider}
                      onChange={(e) => updateFormData('insuranceProvider', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="insuranceNumber">Número de Afiliación</Label>
                    <Input
                      id="insuranceNumber"
                      placeholder="Número de afiliación"
                      value={formData.insuranceNumber}
                      onChange={(e) => updateFormData('insuranceNumber', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Motivo de Ingreso */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Motivo de Ingreso *</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="admissionReason">Motivo de Ingreso *</Label>
                    <Textarea
                      id="admissionReason"
                      placeholder="Describa el motivo principal del ingreso hospitalario"
                      value={formData.admissionReason}
                      onChange={(e) => updateFormData('admissionReason', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="admissionDiagnosis">Diagnóstico de Ingreso</Label>
                    <Textarea
                      id="admissionDiagnosis"
                      placeholder="Diagnóstico presuntivo o confirmado al ingreso"
                      value={formData.admissionDiagnosis}
                      onChange={(e) => updateFormData('admissionDiagnosis', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Asignación Hospitalaria */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Asignación Hospitalaria *</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="unitId">Unidad *</Label>
                    <select
                      id="unitId"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.unitId}
                      onChange={(e) => updateFormData('unitId', e.target.value)}
                      required
                    >
                      <option value="">Seleccionar unidad...</option>
                      {units.map(unit => (
                        <option key={unit.id} value={unit.id} disabled={unit.available_beds === 0}>
                          {unit.name} ({unit.available_beds} camas disponibles)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bedNumber">Número de Cama</Label>
                    <Input
                      id="bedNumber"
                      placeholder="Ej: 101, A-5"
                      value={formData.bedNumber}
                      onChange={(e) => updateFormData('bedNumber', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Antecedentes Médicos */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Antecedentes Médicos</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="allergies">Alergias</Label>
                    <Textarea
                      id="allergies"
                      placeholder="Alergias conocidas del paciente (medicamentos, alimentos, etc.)"
                      value={formData.allergies}
                      onChange={(e) => updateFormData('allergies', e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="chronicConditions">Condiciones Crónicas</Label>
                    <Textarea
                      id="chronicConditions"
                      placeholder="Enfermedades crónicas o preexistentes (diabetes, hipertensión, etc.)"
                      value={formData.chronicConditions}
                      onChange={(e) => updateFormData('chronicConditions', e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="currentMedications">Medicamentos Actuales</Label>
                    <Textarea
                      id="currentMedications"
                      placeholder="Medicamentos que el paciente toma actualmente"
                      value={formData.currentMedications}
                      onChange={(e) => updateFormData('currentMedications', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex gap-4 justify-end pt-4">
                <Link href="/pacientes">
                  <Button type="button" variant="outline" disabled={isLoading}>
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Registrando...' : 'Registrar Paciente'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
