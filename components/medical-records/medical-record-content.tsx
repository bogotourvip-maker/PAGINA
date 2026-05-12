'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText, Plus } from 'lucide-react'
import type { Patient, MedicalRecord } from '@/lib/types'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CreateMedicalRecordDialog } from './create-medical-record-dialog'

interface MedicalRecordContentProps {
  patient: Patient
  medicalRecords: MedicalRecord[]
  user: SupabaseUser
}

export function MedicalRecordContent({ patient, medicalRecords, user }: MedicalRecordContentProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })
    } catch {
      return dateString
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link href={`/pacientes/${patient.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Paciente
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Historia Clínica</h1>
              <p className="text-muted-foreground">
                {patient.first_name} {patient.last_name} - ID: {patient.identification}
              </p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Entrada
            </Button>
          </div>
        </div>

        {medicalRecords.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay registros médicos</h3>
              <p className="text-muted-foreground mb-4">
                Comienza creando la primera entrada en la historia clínica
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Crear Primera Entrada
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {medicalRecords.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">
                          {record.chief_complaint || 'Registro Médico'}
                        </CardTitle>
                        <Badge variant="outline">
                          {record.created_by_user?.role || 'Personal médico'}
                        </Badge>
                      </div>
                      <CardDescription>
                        {formatDate(record.record_date)} • Por {record.created_by_user?.full_name}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRecord(selectedRecord?.id === record.id ? null : record)}
                    >
                      {selectedRecord?.id === record.id ? 'Ocultar' : 'Ver Detalles'}
                    </Button>
                  </div>
                </CardHeader>
                
                {selectedRecord?.id === record.id && (
                  <CardContent className="space-y-4">
                    {record.chief_complaint && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Motivo de Consulta</h4>
                        <p className="text-sm">{record.chief_complaint}</p>
                      </div>
                    )}

                    {record.history_present_illness && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Historia de la Enfermedad Actual</h4>
                        <p className="text-sm">{record.history_present_illness}</p>
                      </div>
                    )}

                    {record.past_medical_history && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Antecedentes Médicos</h4>
                        <p className="text-sm">{record.past_medical_history}</p>
                      </div>
                    )}

                    {record.medications && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Medicamentos</h4>
                        <p className="text-sm">{record.medications}</p>
                      </div>
                    )}

                    {record.allergies && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Alergias</h4>
                        <p className="text-sm text-destructive">{record.allergies}</p>
                      </div>
                    )}

                    {record.physical_examination && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Examen Físico</h4>
                        <p className="text-sm">{record.physical_examination}</p>
                      </div>
                    )}

                    {record.diagnosis && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Diagnóstico</h4>
                        <p className="text-sm font-medium">{record.diagnosis}</p>
                      </div>
                    )}

                    {record.treatment_plan && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Plan de Tratamiento</h4>
                        <p className="text-sm">{record.treatment_plan}</p>
                      </div>
                    )}

                    {record.notes && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Notas Adicionales</h4>
                        <p className="text-sm text-muted-foreground">{record.notes}</p>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      <CreateMedicalRecordDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        patientId={patient.id}
        userId={user.id}
      />
    </div>
  )
}
