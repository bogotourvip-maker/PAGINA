'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, UserPlus } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { logAuditAction } from '@/lib/audit-log'

interface PatientRegistrationFormProps {
  user: User
}

// Función para calcular edad
function calculateAge(dateOfBirth: string): { years: number; months: number; days: number } | null {
  if (!dateOfBirth) return null
  
  const birth = new Date(dateOfBirth)
  const today = new Date()
  
  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()
  
  if (days < 0) {
    months--
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate()
  }
  
  if (months < 0) {
    years--
    months += 12
  }
  
  return { years, months, days }
}

export function PatientRegistrationForm({ user }: PatientRegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()
  
  // Estado del formulario - DEBE ir antes del useEffect que lo usa
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
    // Información de Seguro
    insuranceProvider: '',
    insuranceNumber: '',
    // Motivo de consulta (breve)
    chiefComplaint: '',
  })

  // Calcular edad cuando cambia la fecha de nacimiento
  const [calculatedAge, setCalculatedAge] = useState<{ years: number; months: number; days: number } | null>(null)

  useEffect(() => {
    if (formData.dateOfBirth) {
      setCalculatedAge(calculateAge(formData.dateOfBirth))
    } else {
      setCalculatedAge(null)
    }
  }, [formData.dateOfBirth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
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
        })
        .select()
        .single()

      if (patientError) {
        // Supabase no disponible, usar almacenamiento local
        // Guardar en localStorage para modo offline
        const newPatient = {
          id: 'local-' + Date.now(),
          document_type: formData.documentType,
          document_number: formData.documentNumber,
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          blood_type: formData.bloodType,
          phone: formData.phone,
          insurance_provider: formData.insuranceProvider,
          admission: {
            id: 'adm-local-' + Date.now(),
            admission_reason: formData.chiefComplaint,
            admission_date: new Date().toISOString(),
            status: 'triage'
          }
        }
        
        // Obtener pacientes existentes de localStorage
        const existingPatients = JSON.parse(localStorage.getItem('triagePatients') || '[]')
        existingPatients.push(newPatient)
        localStorage.setItem('triagePatients', JSON.stringify(existingPatients))
        
        // Registrar en auditoría
        logAuditAction('CREATE_PATIENT', `Paciente registrado: ${formData.firstName} ${formData.lastName}`, {
          userId: user.id,
          userName: user.email || 'Usuario',
          patientId: newPatient.id,
          patientName: `${formData.firstName} ${formData.lastName}`,
          success: true
        })
        
        router.push('/triage')
        router.refresh()
        return
      }

      // 2. Crear admisión en estado TRIAGE
      const { error: admissionError } = await supabase
        .from('admissions')
        .insert({
          patient_id: patient.id,
          admission_reason: formData.chiefComplaint,
          status: 'triage', // Queda en espera de valoración
        })

      if (admissionError) {
        // Error al crear admisión, continuar de todas formas
      }

      router.push('/triage')
      router.refresh()
    } catch (err: unknown) {
      // Error inesperado, usar almacenamiento local
      // Guardar en localStorage para modo offline
      const newPatient = {
        id: 'local-' + Date.now(),
        document_type: formData.documentType,
        document_number: formData.documentNumber,
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        blood_type: formData.bloodType,
        phone: formData.phone,
        insurance_provider: formData.insuranceProvider,
        admission: {
          id: 'adm-local-' + Date.now(),
          admission_reason: formData.chiefComplaint,
          admission_date: new Date().toISOString(),
          status: 'triage'
        }
      }
      
      const existingPatients = JSON.parse(localStorage.getItem('triagePatients') || '[]')
      existingPatients.push(newPatient)
      localStorage.setItem('triagePatients', JSON.stringify(existingPatients))
      
      router.push('/triage')
      router.refresh()
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
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Registro de Paciente</CardTitle>
                <CardDescription>
                  Registra los datos del paciente para enviarlo a Triage
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información Personal */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Información Personal</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="documentType">Tipo de Documento *</Label>
                    <select
                      id="documentType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                    <Label>Edad (calculada)</Label>
                    <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted/50 px-3 py-2 text-sm font-medium">
                      {calculatedAge ? (
                        <span>
                          {calculatedAge.years > 0 && `${calculatedAge.years} años`}
                          {calculatedAge.years > 0 && calculatedAge.months > 0 && ', '}
                          {calculatedAge.months > 0 && `${calculatedAge.months} meses`}
                          {calculatedAge.years === 0 && calculatedAge.months === 0 && `${calculatedAge.days} días`}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Ingrese fecha de nacimiento</span>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="gender">Género *</Label>
                    <select
                      id="gender"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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

              {/* Contacto de Emergencia */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Contacto de Emergencia</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="emergencyContactName">Nombre del Contacto</Label>
                    <Input
                      id="emergencyContactName"
                      placeholder="Nombre completo"
                      value={formData.emergencyContactName}
                      onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="emergencyContactPhone">Teléfono del Contacto</Label>
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
                <h3 className="text-lg font-semibold mb-4 text-primary">Información del Seguro</h3>
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

              {/* Motivo de Consulta */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Motivo de Consulta *</h3>
                <div className="grid gap-2">
                  <Label htmlFor="chiefComplaint">Motivo principal de la consulta *</Label>
                  <Textarea
                    id="chiefComplaint"
                    placeholder="Describa brevemente el motivo de la consulta (ej: dolor abdominal, fiebre, accidente, etc.)"
                    value={formData.chiefComplaint}
                    onChange={(e) => updateFormData('chiefComplaint', e.target.value)}
                    rows={3}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? 'Registrando...' : 'Registrar y Enviar a Triage'}
                </Button>
                <Link href="/dashboard">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
