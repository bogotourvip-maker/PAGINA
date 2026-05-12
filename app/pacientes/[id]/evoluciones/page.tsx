'use client'

import { useState, useEffect, use } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Stethoscope,
  Activity,
  Pill,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { ADMIN_USER } from '@/lib/mock-user'

interface Evolution {
  id: string
  patientId: string
  patientName: string
  documentNumber: string
  unit: string
  date: string
  performedBy: string
  chiefComplaint: string
  painLevel: string
  bloodPressure: string
  heartRate: string
  temperature: string
  oxygenSaturation: string
  physicalExam: string
  currentDiagnosis: { code: string; description: string } | null
  clinicalAnalysis: string
  medications: { code: string; description: string }[]
  medicationNotes: string
  procedures: { code: string; description: string }[]
  nursingOrders: string
  dietOrders: string
  prognosis: string
  additionalNotes: string
}

export default function PatientEvolutionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: patientId } = use(params)
  const [evolutions, setEvolutions] = useState<Evolution[]>([])
  const [patient, setPatient] = useState<{ name: string; documentNumber: string } | null>(null)

  useEffect(() => {
    // Cargar evoluciones del paciente
    const allEvolutions = JSON.parse(localStorage.getItem('patientEvolutions') || '[]')
    const patientEvolutions = allEvolutions.filter((e: Evolution) => e.patientId === patientId)
    setEvolutions(patientEvolutions)

    // Obtener info del paciente
    if (patientEvolutions.length > 0) {
      setPatient({
        name: patientEvolutions[0].patientName,
        documentNumber: patientEvolutions[0].documentNumber
      })
    } else {
      // Buscar en hospitalizados
      const hospitalizedPatients = JSON.parse(localStorage.getItem('hospitalizedPatients') || '[]')
      const found = hospitalizedPatients.find((p: { id: string }) => p.id === patientId)
      if (found) {
        setPatient({ name: found.name, documentNumber: found.documentNumber })
      }
    }
  }, [patientId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const prognosisColors: Record<string, string> = {
    favorable: 'bg-green-100 text-green-800',
    estable: 'bg-blue-100 text-blue-800',
    reservado: 'bg-yellow-100 text-yellow-800',
    grave: 'bg-red-100 text-red-800',
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={ADMIN_USER} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href={`/pacientes/${patientId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Evoluciones Médicas</h1>
              {patient && (
                <p className="text-muted-foreground">
                  {patient.name} - {patient.documentNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {evolutions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Stethoscope className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No hay evoluciones registradas para este paciente</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {evolutions.map((evolution) => (
              <Card key={evolution.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(evolution.date)}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{evolution.unit}</Badge>
                      <Badge className={prognosisColors[evolution.prognosis] || 'bg-gray-100'}>
                        {evolution.prognosis}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {evolution.performedBy}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Subjetivo */}
                  {evolution.chiefComplaint && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <FileText className="h-3 w-3" /> Subjetivo
                      </h4>
                      <p className="text-sm">{evolution.chiefComplaint}</p>
                      {evolution.painLevel && (
                        <p className="text-sm text-muted-foreground">Dolor: {evolution.painLevel}/10</p>
                      )}
                    </div>
                  )}

                  {/* Signos Vitales */}
                  {(evolution.bloodPressure || evolution.heartRate || evolution.temperature) && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <Activity className="h-3 w-3" /> Signos Vitales
                      </h4>
                      <div className="flex flex-wrap gap-3 text-sm">
                        {evolution.bloodPressure && <span>PA: {evolution.bloodPressure}</span>}
                        {evolution.heartRate && <span>FC: {evolution.heartRate}</span>}
                        {evolution.temperature && <span>T: {evolution.temperature}</span>}
                        {evolution.oxygenSaturation && <span>SpO2: {evolution.oxygenSaturation}</span>}
                      </div>
                    </div>
                  )}

                  {/* Examen Físico */}
                  {evolution.physicalExam && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Examen Físico</h4>
                      <p className="text-sm">{evolution.physicalExam}</p>
                    </div>
                  )}

                  {/* Diagnóstico */}
                  {evolution.currentDiagnosis && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Diagnóstico</h4>
                      <Badge variant="secondary">
                        {evolution.currentDiagnosis.code} - {evolution.currentDiagnosis.description}
                      </Badge>
                    </div>
                  )}

                  {/* Análisis */}
                  {evolution.clinicalAnalysis && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Análisis Clínico</h4>
                      <p className="text-sm">{evolution.clinicalAnalysis}</p>
                    </div>
                  )}

                  {/* Medicamentos */}
                  {evolution.medications && evolution.medications.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <Pill className="h-3 w-3" /> Medicamentos
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {evolution.medications.map((med, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {med.code} - {med.description}
                          </Badge>
                        ))}
                      </div>
                      {evolution.medicationNotes && (
                        <p className="text-sm text-muted-foreground mt-1">{evolution.medicationNotes}</p>
                      )}
                    </div>
                  )}

                  {/* Órdenes */}
                  {(evolution.nursingOrders || evolution.dietOrders) && (
                    <div className="grid grid-cols-2 gap-4">
                      {evolution.nursingOrders && (
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">Órdenes Enfermería</h4>
                          <p className="text-sm">{evolution.nursingOrders}</p>
                        </div>
                      )}
                      {evolution.dietOrders && (
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">Dieta</h4>
                          <p className="text-sm">{evolution.dietOrders}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Notas */}
                  {evolution.additionalNotes && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Notas</h4>
                      <p className="text-sm">{evolution.additionalNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
