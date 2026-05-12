'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  AlertTriangle, 
  User, 
  FileText,
  ArrowRight,
  Stethoscope
} from 'lucide-react'
import type { Patient, Admission, Unit } from '@/lib/types'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { TriageEvaluationDialog } from './triage-evaluation-dialog'

interface PatientWithAdmission extends Patient {
  admission?: Admission
}

interface TriageContentProps {
  patients: PatientWithAdmission[]
  units: Unit[]
  user: SupabaseUser
}

const triageLevelColors: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: 'bg-red-500', text: 'text-white', label: 'Resucitación' },
  2: { bg: 'bg-orange-500', text: 'text-white', label: 'Emergencia' },
  3: { bg: 'bg-yellow-500', text: 'text-black', label: 'Urgencia' },
  4: { bg: 'bg-green-500', text: 'text-white', label: 'Menos Urgente' },
  5: { bg: 'bg-blue-500', text: 'text-white', label: 'No Urgente' },
}

function calculateAge(dateOfBirth: string): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

function getWaitTime(admissionDate: string): string {
  const now = new Date()
  const admission = new Date(admissionDate)
  const diffMs = now.getTime() - admission.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 60) return `${diffMins} min`
  const hours = Math.floor(diffMins / 60)
  const mins = diffMins % 60
  return `${hours}h ${mins}m`
}

export function TriageContent({ patients: initialPatients, units, user }: TriageContentProps) {
  const [selectedPatient, setSelectedPatient] = useState<PatientWithAdmission | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [localPatients, setLocalPatients] = useState<PatientWithAdmission[]>([])

  // Cargar pacientes de localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem('triagePatients')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setLocalPatients(parsed)
      } catch (e) {
        console.error('Error parsing localStorage patients:', e)
      }
    }
  }, [])

  // Combinar pacientes de la base de datos con los de localStorage
  const patients = [...initialPatients, ...localPatients]

  // Separar pacientes por estado
  const pendingTriage = patients.filter(p => p.admission?.status === 'triage' && !p.admission?.triage_level)
  const evaluatedTriage = patients.filter(p => p.admission?.status === 'triage' && p.admission?.triage_level)

  const handleEvaluate = (patient: PatientWithAdmission) => {
    setSelectedPatient(patient)
    setDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Triage - Valoración de Urgencias</h1>
          <p className="text-muted-foreground mt-1">
            Evalúe y clasifique los pacientes según su nivel de urgencia
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingTriage.length}</p>
                  <p className="text-sm text-muted-foreground">En espera</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Stethoscope className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{evaluatedTriage.length}</p>
                  <p className="text-sm text-muted-foreground">Evaluados</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {evaluatedTriage.filter(p => (p.admission?.triage_level || 5) <= 2).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Alta prioridad</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{patients.length}</p>
                  <p className="text-sm text-muted-foreground">Total hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pacientes en espera de valoración */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                En Espera de Valoración
              </CardTitle>
              <CardDescription>
                Pacientes pendientes de clasificación de triage
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingTriage.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No hay pacientes en espera
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingTriage.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-full">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {patient.first_name} {patient.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {patient.document_type}: {patient.document_number} | {calculateAge(patient.date_of_birth)} años
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <FileText className="h-3 w-3 inline mr-1" />
                            {patient.admission?.admission_reason?.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-yellow-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {patient.admission?.admission_date ? getWaitTime(patient.admission.admission_date) : 'N/A'}
                        </Badge>
                        <Button size="sm" onClick={() => handleEvaluate(patient)}>
                          Evaluar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pacientes evaluados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-green-500" />
                Evaluados - Pendientes de Destino
              </CardTitle>
              <CardDescription>
                Pacientes clasificados listos para asignar unidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              {evaluatedTriage.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No hay pacientes evaluados pendientes
                </div>
              ) : (
                <div className="space-y-3">
                  {evaluatedTriage
                    .sort((a, b) => (a.admission?.triage_level || 5) - (b.admission?.triage_level || 5))
                    .map((patient) => {
                      const level = patient.admission?.triage_level || 5
                      const levelInfo = triageLevelColors[level]
                      return (
                        <div
                          key={patient.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${levelInfo.bg}`}>
                              <span className={`text-sm font-bold ${levelInfo.text}`}>{level}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">
                                  {patient.first_name} {patient.last_name}
                                </p>
                                <Badge className={`${levelInfo.bg} ${levelInfo.text}`}>
                                  {levelInfo.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {patient.admission?.triage_notes?.substring(0, 60)}...
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleEvaluate(patient)}>
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Asignar
                          </Button>
                        </div>
                      )
                    })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Leyenda de niveles de triage */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Niveles de Triage (ESI)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {Object.entries(triageLevelColors).map(([level, info]) => (
                <div key={level} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${info.bg} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${info.text}`}>{level}</span>
                  </div>
                  <span className="text-sm">{info.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {selectedPatient && (
        <TriageEvaluationDialog
          patient={selectedPatient}
          units={units}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          user={{ name: user.email || 'Usuario', email: user.email || '' }}
        />
      )}
    </div>
  )
}
