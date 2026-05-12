'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  ArrowRightLeft, 
  Calendar, 
  Heart, 
  MapPin, 
  Phone, 
  User,
  Activity,
  Droplet
} from 'lucide-react'
import type { Patient, Transfer, VitalSign } from '@/lib/types'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface PatientDetailsProps {
  patient: Patient
  transfers: Transfer[]
  vitalSigns: VitalSign[]
  user: SupabaseUser
}

export function PatientDetails({ patient, transfers, vitalSigns, user }: PatientDetailsProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })
    } catch {
      return dateString
    }
  }

  const formatShortDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'd/MM/yyyy', { locale: es })
    } catch {
      return dateString
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <Link href="/pacientes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Pacientes
            </Button>
          </Link>
        </div>

        {/* Header del Paciente */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {patient.first_name} {patient.last_name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>ID: {patient.identification}</span>
                      <span>•</span>
                      <span>{patient.age} años</span>
                      <span>•</span>
                      <span className="capitalize">{patient.gender}</span>
                      {patient.blood_type && (
                        <>
                          <span>•</span>
                          <span>Tipo de sangre: {patient.blood_type}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {patient.status === 'activo' && (
                  <Link href={`/pacientes/${patient.id}/trasladar`}>
                    <Button>
                      <ArrowRightLeft className="mr-2 h-4 w-4" />
                      Trasladar Paciente
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="vitales">Signos Vitales</TabsTrigger>
            <TabsTrigger value="traslados">Historial de Traslados</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Información Personal */}
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                    <p className="font-medium">{formatShortDate(patient.date_of_birth)}</p>
                  </div>
                  {patient.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="font-medium">{patient.phone}</p>
                    </div>
                  )}
                  {patient.emergency_contact_name && (
                    <div>
                      <p className="text-sm text-muted-foreground">Contacto de Emergencia</p>
                      <p className="font-medium">{patient.emergency_contact_name}</p>
                      {patient.emergency_contact_phone && (
                        <p className="text-sm text-muted-foreground">{patient.emergency_contact_phone}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ubicación Actual */}
              <Card>
                <CardHeader>
                  <CardTitle>Ubicación Actual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Unidad</p>
                    <p className="font-medium">{patient.unit?.name || 'Sin asignar'}</p>
                  </div>
                  {patient.current_bed_number && (
                    <div>
                      <p className="text-sm text-muted-foreground">Número de Cama</p>
                      <p className="font-medium">{patient.current_bed_number}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Ingreso</p>
                    <p className="font-medium">{formatShortDate(patient.admission_date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <Badge className="mt-1 capitalize">{patient.status.replace('_', ' ')}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Información Médica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Médica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {patient.diagnosis && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Diagnóstico</p>
                    <p className="text-sm">{patient.diagnosis}</p>
                  </div>
                )}
                {patient.allergies && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Alergias</p>
                    <p className="text-sm text-destructive">{patient.allergies}</p>
                  </div>
                )}
                {patient.current_medications && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Medicamentos Actuales</p>
                    <p className="text-sm">{patient.current_medications}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitales">
            <Card>
              <CardHeader>
                <CardTitle>Signos Vitales Recientes</CardTitle>
                <CardDescription>Últimos registros de signos vitales</CardDescription>
              </CardHeader>
              <CardContent>
                {vitalSigns.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay signos vitales registrados
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vitalSigns.map((vital) => (
                      <div key={vital.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-muted-foreground">
                            {formatDate(vital.recorded_at)}
                          </p>
                          <Badge variant="outline">
                            {vital.recorded_by_user?.full_name}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {vital.temperature && (
                            <div>
                              <p className="text-xs text-muted-foreground">Temperatura</p>
                              <p className="text-lg font-semibold">{vital.temperature}°C</p>
                            </div>
                          )}
                          {vital.heart_rate && (
                            <div>
                              <p className="text-xs text-muted-foreground">Frecuencia Cardíaca</p>
                              <p className="text-lg font-semibold">{vital.heart_rate} bpm</p>
                            </div>
                          )}
                          {vital.blood_pressure_systolic && vital.blood_pressure_diastolic && (
                            <div>
                              <p className="text-xs text-muted-foreground">Presión Arterial</p>
                              <p className="text-lg font-semibold">
                                {vital.blood_pressure_systolic}/{vital.blood_pressure_diastolic}
                              </p>
                            </div>
                          )}
                          {vital.oxygen_saturation && (
                            <div>
                              <p className="text-xs text-muted-foreground">Saturación O2</p>
                              <p className="text-lg font-semibold">{vital.oxygen_saturation}%</p>
                            </div>
                          )}
                        </div>
                        {vital.notes && (
                          <p className="text-sm text-muted-foreground mt-3">{vital.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traslados">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Traslados</CardTitle>
                <CardDescription>Registro de movimientos entre unidades</CardDescription>
              </CardHeader>
              <CardContent>
                {transfers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay traslados registrados
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transfers.map((transfer, index) => (
                      <div key={transfer.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <ArrowRightLeft className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {transfer.from_unit ? (
                                <p className="font-medium">
                                  {transfer.from_unit.name} → {transfer.to_unit.name}
                                </p>
                              ) : (
                                <p className="font-medium">
                                  Ingreso a {transfer.to_unit.name}
                                </p>
                              )}
                              {index === 0 && (
                                <Badge variant="secondary">Actual</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {formatDate(transfer.transfer_date)}
                            </p>
                            {transfer.reason && (
                              <p className="text-sm mb-1">
                                <span className="text-muted-foreground">Motivo:</span> {transfer.reason}
                              </p>
                            )}
                            {transfer.notes && (
                              <p className="text-sm text-muted-foreground">{transfer.notes}</p>
                            )}
                            {transfer.days_in_previous_unit !== null && transfer.days_in_previous_unit > 0 && (
                              <p className="text-sm text-muted-foreground mt-2">
                                Permaneció {transfer.days_in_previous_unit} días en la unidad anterior
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                              Autorizado por: {transfer.authorized_user?.full_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
