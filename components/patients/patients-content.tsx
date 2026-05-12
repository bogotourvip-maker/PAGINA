'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Users, Search, Plus, ArrowRightLeft, FileText, User } from 'lucide-react'
import type { Patient } from '@/lib/types'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import Link from 'next/link'

interface PatientsContentProps {
  patients: Patient[]
  user: SupabaseUser
}

const statusLabels: Record<string, string> = {
  activo: 'Activo',
  dado_de_alta: 'Dado de Alta',
  trasladado: 'Trasladado',
  fallecido: 'Fallecido',
}

const statusColors: Record<string, string> = {
  activo: 'default',
  dado_de_alta: 'secondary',
  trasladado: 'outline',
  fallecido: 'destructive',
}

export function PatientsContent({ patients, user }: PatientsContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.identification.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'todos' || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const activePatients = patients.filter(p => p.status === 'activo').length

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Pacientes</h1>
            <p className="text-muted-foreground mt-2">
              {activePatients} pacientes activos de {patients.length} totales
            </p>
          </div>
          <Link href="/pacientes/nuevo">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Registrar Paciente
            </Button>
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o identificación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="todos">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="dado_de_alta">Dados de Alta</option>
            <option value="trasladado">Trasladados</option>
            <option value="fallecido">Fallecidos</option>
          </select>
        </div>

        {/* Lista de pacientes */}
        <div className="grid gap-4">
          {filteredPatients.map(patient => (
            <Card key={patient.id} className="hover:bg-accent/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {patient.first_name} {patient.last_name}
                        </h3>
                        <Badge variant={statusColors[patient.status] as any}>
                          {statusLabels[patient.status]}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Identificación</p>
                          <p className="font-medium">{patient.identification}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Edad</p>
                          <p className="font-medium">{patient.age || 'N/A'} años</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Unidad Actual</p>
                          <p className="font-medium">
                            {patient.unit?.name || 'Sin asignar'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Cama</p>
                          <p className="font-medium">
                            {patient.current_bed_number || 'N/A'}
                          </p>
                        </div>
                      </div>

                      {patient.diagnosis && (
                        <div className="mt-3 text-sm">
                          <p className="text-muted-foreground">Diagnóstico</p>
                          <p className="line-clamp-1">{patient.diagnosis}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Link href={`/pacientes/${patient.id}`}>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </Button>
                    </Link>
                    {patient.status === 'activo' && (
                      <Link href={`/pacientes/${patient.id}/trasladar`}>
                        <Button variant="outline" size="sm">
                          <ArrowRightLeft className="mr-2 h-4 w-4" />
                          Trasladar
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron pacientes</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza registrando el primer paciente'}
              </p>
              {!searchTerm && (
                <Link href="/pacientes/nuevo">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Registrar Primer Paciente
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
